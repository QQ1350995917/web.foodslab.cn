/**
 * Created by dingpengwei on 8/12/16.
 */

function showType(typeEntity) {
    // 重置界面
    resetView();
    // 获取根元素对象
    let titleViewContainer = document.getElementById(MAIN_TITLE_ID);
    titleViewContainer.style.cursor = "pointer";
    titleViewContainer.onclick = function () {
        backToSeries();
    };
    let contentViewContainer = document.getElementById(MAIN_CONTENT_ID);
    let titleView = document.createElement("div");
    titleView.innerHTML = "当前系列 >> 当前类型";
    titleView.className = "horizontalSelected";
    titleView.style.width = "100%";
    titleView.style.cursor = "pointer";
    titleViewContainer.appendChild(titleView);
    initTypeDetailView(contentViewContainer, typeEntity);
}

/**
 * 返回事件
 */
function backToSeries() {
    document.getElementById(MAIN_TITLE_ID).ondblclick = null;
    showSeries(CURRENT_SERIES_ENTITY);
}

/**
 * 显示类型数据到界面
 * @param containerView 容器对象
 * @param typeEntity 类型数据
 */
function initTypeDetailView(containerView, typeEntity) {
    let descriptionContainer = document.createElement("div")
    descriptionContainer.className = "descriptionContainer";
    let imageContainer = document.createElement("div")
    imageContainer.className = "imageContainer";
    let imageCuter = document.createElement("canvas")
    imageCuter.className = "imageCuter";
    imageContainer.appendChild(imageCuter);

    let imageCuterSubmit = document.createElement("div");
    imageCuterSubmit.className = "imageCuterSubmit";
    imageCuterSubmit.innerHTML = "保存修改";
    imageContainer.appendChild(imageCuterSubmit);

    let imageChoseContainer = document.createElement("div");
    imageChoseContainer.className = "imageChoseContainer";
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

    imageChoseContainer.appendChild(fileButton1);
    imageChoseContainer.appendChild(fileButton2);
    imageChoseContainer.appendChild(fileButton3);
    imageContainer.appendChild(imageChoseContainer);
    descriptionContainer.appendChild(imageContainer);
    let textContainer = document.createElement("div")
    textContainer.className = "textContainer";
    let descriptionTextArea = document.createElement("textarea")
    descriptionTextArea.id = "descriptionTextArea";
    descriptionTextArea.value = typeEntity.summary == undefined ? "" : typeEntity.summary;
    descriptionTextArea.className = "descriptionTextArea";
    descriptionTextArea.onblur = function () {
        let description = document.getElementById("descriptionTextArea").value;
        let requestTypeEntity = new Object();
        requestTypeEntity.sessionId = "admin";
        requestTypeEntity.typeId = typeEntity.typeId;
        requestTypeEntity.summary = description;
        asyncRequestByGet(BASE_PATH + "/type/mSummary?p=" + JSON.stringify(requestTypeEntity), function (data) {
            var result = checkResponsDataFormat(data);
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
    textContainer.appendChild(descriptionTextArea);

    let formatArea = document.createElement("div")
    formatArea.className = "formatArea";
    textContainer.appendChild(formatArea);
    descriptionContainer.appendChild(textContainer);

    initFormatView(formatArea, typeEntity);
    containerView.appendChild(descriptionContainer);

    let detailDescriptionContainer = document.createElement("div")
    detailDescriptionContainer.className = "detailDescriptionContainer";
    initDetailEditorView(detailDescriptionContainer, typeEntity);
    containerView.appendChild(detailDescriptionContainer);

    let submitContainer = document.createElement("div")
    submitContainer.className = "submitContainer";
    submitContainer.innerHTML = "提交";
    submitContainer.onclick = function () {
        let detail = document.getElementById("hyperEditor").innerHTML;
        let requestTypeEntity = new Object();
        requestTypeEntity.sessionId = "admin";
        requestTypeEntity.typeId = typeEntity.typeId;
        requestTypeEntity.directions = detail;
        asyncRequestByGet(BASE_PATH + "/type/mDirections?p=" + JSON.stringify(requestTypeEntity), function (data) {
            var result = checkResponsDataFormat(data);
            if (result) {
                var parseData = JSON.parse(data);
                if (parseData.code == RESPONSE_SUCCESS) {
                    new Toast().show("更新成功");
                } else {
                    new Toast().show("更新失败");
                }
            }
        }, onRequestError(), onRequestTimeout());
    };
    containerView.appendChild(submitContainer);
}


class HyperEditorTool {
    constructor(label, invoke, param, viewType) {
        this.label = label;
        this.invoke = invoke;
        this.param = param;
        this.viewType = viewType;
    }
}
/**
 * 产品详情,富文本编辑框
 * @param container
 * @param typeEntity
 */
function initDetailEditorView(container, typeEntity) {
    let toolsBar = document.createElement("div");

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
        createHyperToolWidget(toolsBar, tools[index]);
    }

    let hyperEditor = document.createElement("div");
    hyperEditor.className = "hyperEditor";
    hyperEditor.id = "hyperEditor";
    hyperEditor.contentEditable = true;
    hyperEditor.innerHTML = typeEntity.directions == undefined ? "" : typeEntity.directions;
    container.appendChild(toolsBar);
    container.appendChild(hyperEditor);
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