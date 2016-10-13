/**
 * Created by dingpengwei on 8/12/16.
 */

function initProductType(seriesEntity) {
    resetView();
    let titleContainer = document.getElementById(MAIN_TITLE_ID);
    let titleView = document.createElement("div");
    titleView.innerHTML = "系列总览 >> " + seriesEntity.label;
    titleView.className = "horizontalSelected";
    titleView.style.width = "100%";
    titleView.style.cursor = "cursor";
    titleContainer.appendChild(titleView);
    titleContainer.onclick = function () {
        initProductSeries(undefined);
    };
    requestTypeListData(seriesEntity);
}

function requestTypeListData(seriesEntity) {
    var indexUrl = BASE_PATH + "/type/mRetrieves?p=" + JSON.stringify(seriesEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                onRequestTypeListDataCallback(seriesEntity, parseData.data);
            } else {
                new Toast().show("请求数据失败");
            }
        }
    }, onRequestError(), onRequestTimeout());
}

function onRequestTypeListDataCallback(seriesEntity, typeEntities) {
    let mainContainer = document.getElementById(MAIN_CONTENT_ID);
    mainContainer.innerHTML = null;
    let addNewTypeContainer = document.createElement("div");
    addNewTypeContainer.className = "productItemContainer";
    let addTypeSubContainer = document.createElement("div");
    addTypeSubContainer.className = "productItemSubContainer";
    addNewTypeToContainer(addTypeSubContainer, seriesEntity);
    addNewTypeContainer.appendChild(addTypeSubContainer);
    mainContainer.appendChild(addNewTypeContainer);

    let length = typeEntities == undefined ? 0 : typeEntities.length;
    for (let i = 0; i < length; i++) {
        if (i + 1 % 4 == 0) {
            let clearFloat = document.createElement("div");
            clearFloat.className = "clearFloat";
            mainContainer.appendChild(clearFloat);
        }
        mainContainer.appendChild(createTypeContainer(seriesEntity, typeEntities[i]));
    }
}

function addNewTypeToContainer(container, seriesEntity) {
    container.innerHTML = null;
    let addLabel = document.createElement("div");
    addLabel.innerHTML = "+";
    addLabel.style.fontSize = "150px";
    addLabel.style.cursor = "pointer";
    container.appendChild(addLabel);
    addLabel.onclick = function () {
        convertTypeContainerToEditor(container, seriesEntity, undefined);
    }
}

function createTypeContainer(seriesEntity, typeEntity) {
    let typeEntityContainer = document.createElement("div");
    typeEntityContainer.className = "productItemContainer";
    let typeEntitySubContainer = document.createElement("div");
    typeEntitySubContainer.className = "productItemSubContainer";
    if (typeEntity.status == 1) {
        typeEntitySubContainer.style.borderColor = "#FF0000";
    }
    addTypeToContainer(typeEntitySubContainer, seriesEntity, typeEntity);
    typeEntityContainer.appendChild(typeEntitySubContainer);
    return typeEntityContainer;
}


function addTypeToContainer(container, seriesEntity, typeEntity) {
    container.innerHTML = null;
    container.style.cursor = "pointer";
    let typeLabelInput = document.createElement("input");
    typeLabelInput.className = "labelNameEditor";
    typeLabelInput.readOnly = true;
    typeLabelInput.value = typeEntity.label;
    container.appendChild(typeLabelInput);
    typeLabelInput.onclick = function () {
        convertTypeContainerToEditor(container, seriesEntity, typeEntity);
    }
    container.onclick = function () {
        initProductFormat(seriesEntity, typeEntity);
    }
}

function convertTypeContainerToEditor(typeContainer, seriesEntity, typeEntity) {
    typeContainer.innerHTML = null;
    typeContainer.onclick = null;
    typeContainer.ondblclick = null;
    typeContainer.style.cursor = "default";
    let typeLabelInput = document.createElement("input");
    typeLabelInput.className = "labelNameEditor";
    typeLabelInput.style.cursor = "text";
    typeContainer.appendChild(typeLabelInput);
    let typeEditorActionBar = document.createElement("div");
    typeEditorActionBar.className = "actionBar";
    typeContainer.appendChild(typeEditorActionBar);
    if (typeEntity == undefined) {
        //添加新系列
        typeLabelInput.placeholder = "请输入产品类型名称";
        typeLabelInput.focus();

        let cancelAction = document.createElement("div");
        cancelAction.className = "actionButton";
        cancelAction.style.width = "48%";
        cancelAction.innerHTML = "取消";
        typeEditorActionBar.appendChild(cancelAction);

        let saveAction = document.createElement("div");
        saveAction.className = "actionButton";
        saveAction.style.width = "48%";
        saveAction.innerHTML = "保存";
        typeEditorActionBar.appendChild(saveAction);

        cancelAction.onclick = function () {
            addNewTypeToContainer(typeContainer, seriesEntity);
        }

        saveAction.onclick = function () {
            let label = typeLabelInput.value;
            if (label == undefined || label == null || label == "") {
                new Toast().show("类型名称不能为空");
            } else {
                let requestTypeEntity = new Object();
                requestTypeEntity.sessionId = "admin";
                requestTypeEntity.seriesId = seriesEntity.seriesId;
                requestTypeEntity.label = label;
                requestCreateType(seriesEntity,requestTypeEntity);
            }
        }

    } else {
        //编辑旧系列
        typeLabelInput.value = typeEntity.label;
        typeLabelInput.focus();
        let backAction = document.createElement("div");
        backAction.className = "actionButton";
        backAction.innerHTML = "返回";
        typeEditorActionBar.appendChild(backAction);

        let saveAction = document.createElement("div");
        saveAction.className = "actionButton";
        saveAction.innerHTML = "保存";
        typeEditorActionBar.appendChild(saveAction);

        let blockAction = document.createElement("div");
        blockAction.className = "actionButton";
        if (typeEntity.status == 1) {
            blockAction.innerHTML = "启用";
        } else if (typeEntity.status == 2) {
            blockAction.innerHTML = "禁用";
        }
        typeEditorActionBar.appendChild(blockAction);

        let deleteAction = document.createElement("div");
        deleteAction.className = "actionButton";
        deleteAction.innerHTML = "删除";
        typeEditorActionBar.appendChild(deleteAction);

        backAction.onclick = function (event) {
            event.cancelBubble = true;
            addTypeToContainer(typeContainer, seriesEntity, typeEntity);
        }
        saveAction.onclick = function () {
            let requestTypeEntity = new Object();
            requestTypeEntity.sessionId = "admin";
            requestTypeEntity.seriesId = seriesEntity.seriesId;
            requestTypeEntity.typeId = typeEntity.typeId;
            requestTypeEntity.label = typeLabelInput.value;
            requestRenameType(seriesEntity,requestTypeEntity);
        }
        blockAction.onclick = function () {
            let requestTypeEntity = new Object();
            requestTypeEntity.sessionId = "admin";
            requestTypeEntity.seriesId = seriesEntity.seriesId;
            requestTypeEntity.typeId = typeEntity.typeId;
            if (typeEntity.status == 1) {
                requestTypeEntity.status = 2;
            } else if (typeEntity.status == 2) {
                requestTypeEntity.status = 1;
            }
            requestMarkType(seriesEntity,requestTypeEntity);
        }
        deleteAction.onclick = function () {
            let requestTypeEntity = new Object();
            requestTypeEntity.sessionId = "admin";
            requestTypeEntity.seriesId = seriesEntity.seriesId;
            requestTypeEntity.typeId = typeEntity.typeId;
            requestTypeEntity.status = -1;
            requestMarkType(seriesEntity,requestTypeEntity);
        }
    }
}

function createMixContainer(typeEntity) {
    let mainContainer = document.getElementById(MAIN_CONTENT_ID);
    mainContainer.innerHTML = null;
    mainContainer.appendChild(createTopContainer(typeEntity));
    mainContainer.appendChild(createBottomContainer(typeEntity));
}

function createTopContainer(typeEntity) {
    let topContainer = document.createElement("div")
    topContainer.className = "fillWidthContainer";
    topContainer.appendChild(createTopLeftContainer(typeEntity));
    topContainer.appendChild(createTopRightContainer(typeEntity));
    return topContainer;
}

function createTopLeftContainer(typeEntity) {
    let imageContainer = document.createElement("div")
    imageContainer.className = "typeTopLeftContainer";
    let imageCuter = document.createElement("canvas")
    imageCuter.className = "imageCuter";
    imageContainer.appendChild(imageCuter);

    let imageCuterSubmit = document.createElement("div");
    imageCuterSubmit.className = "imageCuterSubmit";
    imageCuterSubmit.innerHTML = "保存修改";
    imageContainer.appendChild(imageCuterSubmit);

    let imageUploadBar = document.createElement("div");
    imageUploadBar.className = "fillWidthContainer";
    imageUploadBar.style.height = "105px";
    let fileButton1 = document.createElement("button");
    fileButton1.className = "fileInput";
    fileButton1.innerHTML = "添加图片";
    let fileButton2 = document.createElement("button");
    fileButton2.className = "fileInput";
    fileButton2.innerHTML = "添加图片";
    let fileButton3 = document.createElement("button");
    fileButton3.className = "fileInput";
    fileButton3.style.width = "34%";
    fileButton3.innerHTML = "添加图片";

    imageUploadBar.appendChild(fileButton1);
    imageUploadBar.appendChild(fileButton2);
    imageUploadBar.appendChild(fileButton3);
    imageContainer.appendChild(imageUploadBar);

    return imageContainer;
}

function createTopRightContainer(typeEntity) {
    let topRightContainer = document.createElement("div")
    topRightContainer.className = "typeTopRightContainer";
    topRightContainer.appendChild(createTypeSummaryContainer(typeEntity));
    topRightContainer.appendChild(createFormatContainer(typeEntity));
    return topRightContainer;
}

function createTypeSummaryContainer(typeEntity) {
    let textContainer = document.createElement("div")
    textContainer.className = "typeSummaryContainer";
    let descriptionTextArea = document.createElement("textarea")
    descriptionTextArea.id = "typeSummary";
    descriptionTextArea.value = typeEntity.summary == undefined ? "" : typeEntity.summary;
    descriptionTextArea.className = "typeSummary";
    textContainer.appendChild(descriptionTextArea);
    let summarySave = document.createElement("div");
    summarySave.className = "typeSummarySave";
    summarySave.innerHTML = "保存";
    summarySave.onclick = function () {
        let requestTypeEntity = new Object();
        requestTypeEntity.sessionId = "admin";
        requestTypeEntity.typeId = typeEntity.typeId;
        requestTypeEntity.summary = descriptionTextArea.value;
        requestUpdateSummary(requestTypeEntity);
    }
    textContainer.appendChild(summarySave);
    return textContainer;
}

function createFormatContainer() {
    let formatContainer = document.createElement("div")
    formatContainer.className = "formatContainer";
    formatContainer.id = "formatContainer";
    return formatContainer;
}

function createBottomContainer(typeEntity) {
    let bottomContainer = document.createElement("div")
    bottomContainer.className = "fillWidthContainer";
    let directionsToolsBar = document.createElement("div");
    let hyperEditorTool1 = new HyperEditorTool("H1", "formatblock", "H1", "button");
    let hyperEditorTool2 = new HyperEditorTool("H2", "formatblock", "H2", "button");
    let hyperEditorTool3 = new HyperEditorTool("H3", "formatblock", "H3", "button");
    let hyperEditorTool4 = new HyperEditorTool("H4", "formatblock", "H4", "button");
    let hyperEditorTool5 = new HyperEditorTool("H5", "formatblock", "H5", "button");
    let hyperEditorTool6 = new HyperEditorTool("H6", "formatblock", "H6", "button");
    let hyperEditorTool7 = new HyperEditorTool("居左", "justifyleft", null, "button");
    let hyperEditorTool8 = new HyperEditorTool("居中", "justifycenter", null, "button");
    let hyperEditorTool9 = new HyperEditorTool("居右", "justifyright", null, "button");
    let hyperEditorTool10 = new HyperEditorTool("左缩进", "outdent", null, "button");
    let hyperEditorTool11 = new HyperEditorTool("右缩进", "indent", null, "button");
    let hyperEditorTool12 = new HyperEditorTool("有序列", "insertorderedlist", null, "button");
    let hyperEditorTool13 = new HyperEditorTool("无序列", "insertunorderedlist", null, "button");
    let hyperEditorTool14 = new HyperEditorTool("链接", "createlink", null, "button");
    let hyperEditorTool15 = new HyperEditorTool("图片", null, null, "button");
    let hyperEditorTool16 = new HyperEditorTool("图片", "formatblock", null, "file");
    let tools = new Array();

    tools.push(hyperEditorTool1);
    tools.push(hyperEditorTool2);
    tools.push(hyperEditorTool3);
    tools.push(hyperEditorTool4);
    tools.push(hyperEditorTool5);
    tools.push(hyperEditorTool6);
    tools.push(hyperEditorTool7);
    tools.push(hyperEditorTool8);
    tools.push(hyperEditorTool9);
    tools.push(hyperEditorTool10);
    tools.push(hyperEditorTool11);
    tools.push(hyperEditorTool12);
    tools.push(hyperEditorTool13);
    tools.push(hyperEditorTool14);
    tools.push(hyperEditorTool15);
    tools.push(hyperEditorTool16);
    for (let index = 0; index < tools.length; index++) {
        createHyperToolWidget(directionsToolsBar, tools[index]);
    }
    let hyperEditor = document.createElement("div");
    hyperEditor.className = "hyperEditor";
    hyperEditor.id = "hyperEditor";
    hyperEditor.contentEditable = true;
    hyperEditor.innerHTML = typeEntity.directions == undefined ? "" : typeEntity.directions;
    bottomContainer.appendChild(directionsToolsBar);
    bottomContainer.appendChild(hyperEditor);

    let submitContainer = document.createElement("div")
    submitContainer.className = "submitContainer";
    submitContainer.innerHTML = "保存";
    submitContainer.onclick = function () {
        let requestTypeEntity = new Object();
        requestTypeEntity.sessionId = "admin";
        requestTypeEntity.typeId = typeEntity.typeId;
        requestTypeEntity.directions = hyperEditor.innerHTML;
        requestUpdateDirections(requestTypeEntity);
    };
    bottomContainer.appendChild(submitContainer);
    return bottomContainer;
}

function createHyperToolWidget(container, hyperEditorTool) {
    let tool = document.createElement("input");
    tool.type = hyperEditorTool.viewType;
    tool.className = "hyperEditorToolButton";
    if (tool.type == "file") {
        tool.accept = "image/*"
        tool.onchange = function () {
            var file = window.URL.createObjectURL(tool.files.item(0));
            document.execCommand('insertImage', false, file);
            // document.execCommand('insertHTML', false, "<img src='" + file + "'/>");
            document.getElementById("hyperEditor").focus();
        }
    } else {
        tool.value = hyperEditorTool.label;
        tool.onclick = format;
        tool.cmd = hyperEditorTool.invoke;
        tool.param = hyperEditorTool.param;
    }
    container.appendChild(tool);
}

class HyperEditorTool {
    constructor(label, invoke, param, viewType) {
        this.label = label;
        this.invoke = invoke;
        this.param = param;
        this.viewType = viewType;
    }
}

function format() {
    if (this.cmd == "createlink") {
        var sLnk = prompt('请输入网络地址', 'http:\/\/');
        if (sLnk && sLnk != '' && sLnk != 'http://') {
            document.execCommand(this.cmd, false, sLnk);
        }
    } else {
        document.execCommand(this.cmd, false, this.param);
        document.getElementById("hyperEditor").focus();
    }
}

function requestCreateType(seriesEntity,typeEntity) {
    asyncRequestByGet(BASE_PATH + "/type/mCreate?p=" + JSON.stringify(typeEntity), function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                new Toast().show("更新成功");
                requestTypeListData(seriesEntity);
            } else {
                new Toast().show("更新失败");
            }
        }
    }, onRequestError(), onRequestTimeout());
}

function requestRenameType(seriesEntity,typeEntity) {
    console.log(typeEntity);
    asyncRequestByGet(BASE_PATH + "/type/mUpdate?p=" + JSON.stringify(typeEntity), function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                new Toast().show("更新成功");
                requestTypeListData(seriesEntity);
            } else {
                new Toast().show("更新失败");
            }
        }
    }, onRequestError(), onRequestTimeout());
}

function requestMarkType(seriesEntity,typeEntity) {
    asyncRequestByGet(BASE_PATH + "/type/mMark?p=" + JSON.stringify(typeEntity), function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                new Toast().show("更新成功");
                requestTypeListData(seriesEntity);
            } else {
                new Toast().show("更新失败");
            }
        }
    }, onRequestError(), onRequestTimeout());
}

function requestUpdateSummary(typeEntity) {
    asyncRequestByGet(BASE_PATH + "/type/mSummary?p=" + JSON.stringify(typeEntity), function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                new Toast().show("更新成功");
            } else {
                new Toast().show("更新失败");
            }
        }
    }, onRequestError(), onRequestTimeout());
}

function requestUpdateDirections(typeEntity) {
    asyncRequestByGet(BASE_PATH + "/type/mDirections?p=" + JSON.stringify(typeEntity), function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                new Toast().show("更新成功");
            } else {
                new Toast().show("更新失败");
            }
        }
    }, onRequestError(), onRequestTimeout());
}