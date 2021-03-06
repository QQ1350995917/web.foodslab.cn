/**
 * Created by dingpengwei on 8/12/16.
 */

function loadProductTypeView(seriesEntity) {
    let titleView = document.createElement("div");
    titleView.innerHTML = "系列总览 >> " + seriesEntity.label;
    titleView.style.cursor = "pointer";
    getTitleContainer().appendChild(titleView);
    titleView.onclick = function () {
        resetMainContainer();
        loadProductView();
    };
    requestTypeListData(seriesEntity);
}

function requestTypeListData(seriesEntity) {
    getMainContainer().innerHTML = null;
    seriesEntity.cs = getCookie(KEY_CS);
    var url = BASE_PATH + "/type/mRetrieves?p=" + JSON.stringify(seriesEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RC_SUCCESS) {
                onRequestTypeListDataCallback(seriesEntity, parseData.data);
            } else if (parseData.code == RC_SUCCESS_EMPTY) {
                onRequestTypeListDataCallback(seriesEntity, parseData.data);
            } else {
                new Toast().show("请求数据失败");
            }

        }
    }, onErrorCallback(), onTimeoutCallback());
}

function onRequestTypeListDataCallback(seriesEntity, typeEntities) {
    let addNewTypeContainer = document.createElement("div");
    addNewTypeContainer.className = "productItemContainer";
    let addTypeSubContainer = document.createElement("div");
    addTypeSubContainer.className = "productItemSubContainer";
    addNewTypeToContainer(addTypeSubContainer, seriesEntity);
    addNewTypeContainer.appendChild(addTypeSubContainer);
    getMainContainer().appendChild(addNewTypeContainer);

    let length = typeEntities == undefined ? 0 : typeEntities.length;
    for (let i = 0; i < length; i++) {
        if (i + 1 % 4 == 0) {
            let clearFloat = document.createElement("div");
            clearFloat.className = "clearFloat";
            getMainContainer().appendChild(clearFloat);
        }
        getMainContainer().appendChild(createTypeContainer(seriesEntity, typeEntities[i]));
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
        resetMainContainer();
        loadProductFormatView(seriesEntity, typeEntity);
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
                requestTypeEntity.seriesId = seriesEntity.seriesId;
                requestTypeEntity.label = label;
                requestCreateType(seriesEntity, requestTypeEntity);
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
            requestRenameType(seriesEntity, requestTypeEntity);
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
            requestMarkType(seriesEntity, requestTypeEntity);
        }
        deleteAction.onclick = function () {
            let requestTypeEntity = new Object();
            requestTypeEntity.sessionId = "admin";
            requestTypeEntity.seriesId = seriesEntity.seriesId;
            requestTypeEntity.typeId = typeEntity.typeId;
            requestTypeEntity.status = -1;
            requestMarkType(seriesEntity, requestTypeEntity);
        }
    }
}

function createMixContainer(typeEntity) {
    getMainContainer().appendChild(createTopContainer(typeEntity));
    getMainContainer().appendChild(createBottomContainer(typeEntity));
}

function createTopContainer(typeEntity) {
    let topContainer = document.createElement("div")
    topContainer.className = "fillWidthContainer";
    topContainer.appendChild(createTopLeftContainer(typeEntity));
    topContainer.appendChild(createTopRightContainer(typeEntity));
    return topContainer;
}

function createTopLeftContainer(typeEntity) {
    let imageContainer = document.createElement("div");
    imageContainer.className = "typeTopLeftContainer";
    let imageCuter = document.createElement("img");
    imageCuter.id = "imageCuter";
    if (!isNullValue(typeEntity) && !isNullValue(typeEntity.covers) && !isNullValue(typeEntity.covers[0])) {
        imageCuter.src = BASE_PATH + typeEntity.covers[0].path;
    }
    imageCuter.className = "imageCuter";
    imageContainer.appendChild(imageCuter);

    let imageUploadBar = document.createElement("div");
    imageUploadBar.className = "fillWidthContainer";
    imageUploadBar.style.height = "105px";
    var form1 = document.createElement("form");
    form1.style.height = "0px";
    form1.enctype = "multipart/form-data";
    form1.method = "post";
    form1.id = "fileForm1";

    var form2 = document.createElement("form");
    form2.style.height = "0px";
    form2.enctype = "multipart/form-data";
    form2.method = "post";
    form2.id = "fileForm2";

    var form3 = document.createElement("form");
    form3.style.height = "0px";
    form3.enctype = "multipart/form-data";
    form3.method = "post";
    form3.id = "fileForm3";

    let fileInput1 = document.createElement("input");
    fileInput1.type = "file";
    fileInput1.id = "file1";
    fileInput1.name = "file";

    let fileInput2 = document.createElement("input");
    fileInput2.type = "file";
    fileInput2.id = "file2";
    fileInput2.name = "file";

    let fileInput3 = document.createElement("input");
    fileInput3.type = "file";
    fileInput3.id = "file3";
    fileInput3.name = "file";

    form1.appendChild(fileInput1);
    form2.appendChild(fileInput2);
    form3.appendChild(fileInput3);

    fileInput1.style.visibility = "hidden";
    fileInput2.style.visibility = "hidden";
    fileInput3.style.visibility = "hidden";

    let fileButton1 = document.createElement("img");
    fileButton1.className = "fileInput";
    if (!isNullValue(typeEntity) && !isNullValue(typeEntity.covers) && !isNullValue(typeEntity.covers[0])) {
        fileButton1.src = BASE_PATH + typeEntity.covers[0].path;
    }
    fileButton1.innerHTML = "添加图片";
    let fileButton2 = document.createElement("img");
    fileButton2.className = "fileInput";
    if (!isNullValue(typeEntity) && !isNullValue(typeEntity.covers) && !isNullValue(typeEntity.covers[1])) {
        fileButton2.src = BASE_PATH + typeEntity.covers[1].path;
    }
    fileButton2.innerHTML = "添加图片";
    let fileButton3 = document.createElement("img");
    fileButton3.className = "fileInput";
    if (!isNullValue(typeEntity) && !isNullValue(typeEntity.covers) && !isNullValue(typeEntity.covers[2])) {
        fileButton3.src = BASE_PATH + typeEntity.covers[2].path;
    }
    fileButton3.style.width = "34%";
    fileButton3.innerHTML = "添加图片";

    imageUploadBar.appendChild(form1);
    imageUploadBar.appendChild(form2);
    imageUploadBar.appendChild(form3);

    imageUploadBar.appendChild(fileButton1);
    imageUploadBar.appendChild(fileButton2);
    imageUploadBar.appendChild(fileButton3);
    imageContainer.appendChild(imageUploadBar);
    fileInput1.onchange = function () {
        requestUploadTypeCover(this.parentNode, typeEntity, typeEntity.covers[0]);
    }
    fileInput2.onchange = function () {
        requestUploadTypeCover(this.parentNode, typeEntity, typeEntity.covers[1]);
    }
    fileInput3.onchange = function () {
        requestUploadTypeCover(this.parentNode, typeEntity, typeEntity.covers[2]);
    }
    fileButton1.onclick = function () {
        fileInput1.click();
    }
    fileButton2.onclick = function () {
        fileInput2.click();
    }
    fileButton3.onclick = function () {
        fileInput3.click();
    }


    return imageContainer;
}

function requestUploadTypeCover(form, typeEntity, fileEntity) {
    let requestObject = new Object();
    requestObject.cs = getCookie(KEY_CS);
    if (!isNullValue(fileEntity) && !isNullValue(fileEntity.fileId)) {
        requestObject.fileId = fileEntity.fileId;
    }
    requestObject.trunkId = typeEntity.typeId;
    var formData = new FormData(form);
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
            var parseData = JSON.parse(xmlHttpRequest.responseText);
            if (parseData.code == RC_SUCCESS) {
                document.getElementById("imageCuter").src = BASE_PATH + parseData.data.path;
            } else {
                new Toast().show("更新失败");
            }
        }
    }
    xmlHttpRequest.open("POST", BASE_PATH + "/file/mTypeCover?p=" + JSON.stringify(requestObject), true);
    xmlHttpRequest.onloadstart = function () {}
    xmlHttpRequest.send(formData);
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

class HyperEditorTool {
    constructor(label, invoke, param, viewType, id) {
        this.label = label;
        this.invoke = invoke;
        this.param = param;
        this.viewType = viewType;
        this.id = id;
    }
}

function createBottomContainer(typeEntity) {
    let bottomContainer = document.createElement("div")
    bottomContainer.className = "fillWidthContainer";
    let directionsToolsBar = document.createElement("div");
    directionsToolsBar.style.width = "100%";
    let tool01 = document.createElement("div");
    tool01.type = "button";
    tool01.value = "H1";
    tool01.cmd = "formatblock";
    tool01.param = "H1";
    directionsToolsBar.appendChild(tool01);

    let tool02 = document.createElement("input");
    tool02.className = "hyperEditorToolButton";
    tool02.type = "button";
    tool02.value = "H2";
    tool02.cmd = "formatblock";
    tool02.param = "H2";
    directionsToolsBar.appendChild(tool02);

    let tool03 = document.createElement("input");
    tool03.className = "hyperEditorToolButton";
    tool03.type = "button";
    tool03.value = "H3";
    tool03.cmd = "formatblock";
    tool03.param = "H3";
    directionsToolsBar.appendChild(tool03);

    let tool04 = document.createElement("input");
    tool04.className = "hyperEditorToolButton";
    tool04.type = "button";
    tool04.value = "H4";
    tool04.cmd = "formatblock";
    tool04.param = "H4";
    directionsToolsBar.appendChild(tool04);

    let tool05 = document.createElement("input");
    tool05.className = "hyperEditorToolButton";
    tool05.type = "button";
    tool05.value = "H5";
    tool05.cmd = "formatblock";
    tool05.param = "H5";
    directionsToolsBar.appendChild(tool05);

    let tool06 = document.createElement("input");
    tool06.className = "hyperEditorToolButton";
    tool06.type = "button";
    tool06.value = "居左";
    tool06.cmd = "justifyleft";
    directionsToolsBar.appendChild(tool06);

    let tool07 = document.createElement("input");
    tool07.className = "hyperEditorToolButton";
    tool07.type = "button";
    tool07.value = "居中";
    tool07.cmd = "justifycenter";
    directionsToolsBar.appendChild(tool07);

    let tool08 = document.createElement("input");
    tool08.className = "hyperEditorToolButton";
    tool08.type = "button";
    tool08.value = "居右";
    tool08.cmd = "justifyright";
    directionsToolsBar.appendChild(tool08);

    let tool09 = document.createElement("input");
    tool09.className = "hyperEditorToolButton";
    tool09.type = "button";
    tool09.value = "左缩进";
    tool09.cmd = "outdent";
    directionsToolsBar.appendChild(tool09);

    let tool10 = document.createElement("input");
    tool10.className = "hyperEditorToolButton";
    tool10.type = "button";
    tool10.value = "右缩进";
    tool10.cmd = "indent";
    directionsToolsBar.appendChild(tool10);

    let tool11 = document.createElement("input");
    tool11.className = "hyperEditorToolButton";
    tool11.type = "button";
    tool11.value = "有序列";
    tool11.cmd = "insertorderedlist";
    directionsToolsBar.appendChild(tool11);

    let tool12 = document.createElement("input");
    tool12.className = "hyperEditorToolButton";
    tool12.type = "button";
    tool12.value = "无序列";
    tool12.cmd = "insertunorderedlist";
    directionsToolsBar.appendChild(tool12);

    let tool13 = document.createElement("input");
    tool13.className = "hyperEditorToolButton";
    tool13.type = "button";
    tool13.value = "连接";
    tool13.cmd = "createlink";
    directionsToolsBar.appendChild(tool13);

    let tool141 = document.createElement("input");
    tool141.className = "hyperEditorToolButton";
    tool141.type = "button";
    tool141.value = "图片";
    directionsToolsBar.appendChild(tool141);

    var directionImageForm = document.createElement("form");
    directionImageForm.id = "directionImageForm";
    directionImageForm.enctype = "multipart/form-data";
    directionImageForm.method = "post";
    directionImageForm.style.width = "0px";
    directionImageForm.style.height = "0px";
    let tool14 = document.createElement("input");
    tool14.type = "file";
    tool14.name = "file";
    tool14.style.display = "none";
    tool14.style.visibility = "hidden";
    tool14.cmd = "formatblock";
    directionImageForm.appendChild(tool14);
    directionsToolsBar.appendChild(directionImageForm);
    bottomContainer.appendChild(directionsToolsBar);

    tool01.onclick = function () {
        format(this.cmd, this.param);
    };
    tool02.onclick = function () {
        format(this.cmd, this.param);
    };
    tool03.onclick = function () {
        format(this.cmd, this.param);
    };
    tool04.onclick = function () {
        format(this.cmd, this.param);
    };
    tool05.onclick = function () {
        format(this.cmd, this.param);
    };
    tool06.onclick = function () {
        format(this.cmd, this.param);
    };
    tool07.onclick = function () {
        format(this.cmd, this.param);
    };
    tool08.onclick = function () {
        format(this.cmd, this.param);
    };
    tool09.onclick = function () {
        format(this.cmd, this.param);
    };
    tool10.onclick = function () {
        format(this.cmd, this.param);
    };
    tool11.onclick = function () {
        format(this.cmd, this.param);
    };
    tool12.onclick = function () {
        format(this.cmd, this.param);
    };
    tool13.onclick = function () {
        format(this.cmd, this.param);
    };
    tool14.onchange = function () {
        let requestObject = new Object();
        requestObject.cs = getCookie(KEY_CS);
        var formData = new FormData(this.parentNode);
        let xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function () {
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
                var parseData = JSON.parse(xmlHttpRequest.responseText);
                if (parseData.code == RC_SUCCESS) {
                    let imageUrl = BASE_PATH + parseData.data.path;
                    let imgElement = "<img src='" + imageUrl + "'/>";
                    document.execCommand('insertHTML', false, imgElement);
                    document.getElementById("hyperEditor").focus();   
                } else {
                    new Toast().show("上传失败");
                }
            }
        }
        xmlHttpRequest.open("POST", BASE_PATH + "/file/mTypeDirectionImage?p=" + JSON.stringify(requestObject), true);
        xmlHttpRequest.onloadstart = function () {}
        xmlHttpRequest.send(formData);
//            var file = window.URL.createObjectURL(tool14.files.item(0));
//            document.execCommand('insertImage', false, file);
//            let urlbase = "http://localhost:8080/foodslab/upload/bird1.png";
//            document.execCommand('insertHTML', false, url);
//            document.getElementById("hyperEditor").focus();
//            format(this.cmd,this.param);
    };
    tool141.onclick = function () {
        tool14.click();
    }

    let hyperEditor = document.createElement("div");
    hyperEditor.id = "hyperEditor";
    hyperEditor.className = "hyperEditor";
    hyperEditor.innerHTML = typeEntity.directions == undefined ? "" : typeEntity.directions;
    hyperEditor.contentEditable = true;
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

function format(cmd, param) {
    if (cmd == "createlink") {
        var sLnk = prompt('请输入网络地址', 'http:\/\/');
        if (sLnk && sLnk != '' && sLnk != 'http://') {
            document.execCommand(cmd, false, sLnk);
        }
    } else {
        console.log(cmd + " " + param);
        document.execCommand(cmd, false, param);
        document.getElementById("hyperEditor").focus();
    }
}

function requestCreateType(seriesEntity, typeEntity) {
    typeEntity.cs = getCookie(KEY_CS);
    let url = BASE_PATH + "/type/mCreate?p=" + JSON.stringify(typeEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RC_SUCCESS) {
                new Toast().show("更新成功");
                requestTypeListData(seriesEntity);
            } else {
                new Toast().show("更新失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function requestRenameType(seriesEntity, typeEntity) {
    typeEntity.cs = getCookie(KEY_CS);
    asyncRequestByGet(BASE_PATH + "/type/mUpdate?p=" + JSON.stringify(typeEntity), function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RC_SUCCESS) {
                new Toast().show("更新成功");
                requestTypeListData(seriesEntity);
            } else {
                new Toast().show("更新失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function requestMarkType(seriesEntity, typeEntity) {
    typeEntity.cs = getCookie(KEY_CS);
    asyncRequestByGet(BASE_PATH + "/type/mMark?p=" + JSON.stringify(typeEntity), function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RC_SUCCESS) {
                new Toast().show("更新成功");
                requestTypeListData(seriesEntity);
            } else {
                new Toast().show("更新失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function requestUpdateSummary(typeEntity) {
    typeEntity.cs = getCookie(KEY_CS);
    asyncRequestByGet(BASE_PATH + "/type/mSummary?p=" + JSON.stringify(typeEntity), function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RC_SUCCESS) {
                new Toast().show("更新成功");
            } else {
                new Toast().show("更新失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function requestUpdateDirections(typeEntity) {
    typeEntity.cs = getCookie(KEY_CS);
    asyncRequestByGet(BASE_PATH + "/type/mDirections?p=" + JSON.stringify(typeEntity), function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RC_SUCCESS) {
                new Toast().show("更新成功");
            } else {
                new Toast().show("更新失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}