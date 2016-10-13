/**
 * Created by dingpengwei on 8/12/16.
 */

function initProductSeries(sessionEntity) {
    resetView();
    let titleContainer = document.getElementById(MAIN_TITLE_ID);
    let titleView = document.createElement("div");
    titleView.innerHTML = "系列总览";
    titleView.className = "horizontalSelected";
    titleView.style.width = "100%";
    titleContainer.appendChild(titleView);
    requestSeriesListData(sessionEntity);
}

function requestSeriesListData(sessionEntity) {
    let tempSessionEntity = new Object();
    tempSessionEntity.sessionId = "admin";
    var indexUrl = BASE_PATH + "/series/mRetrieves?p=" + JSON.stringify(tempSessionEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                onRequestSeriesListDataCallback(parseData.data);
            } else {
                new Toast().show("请求数据失败");
            }
        }
    }, onRequestError(), onRequestTimeout());
}

function onRequestSeriesListDataCallback(seriesEntities) {
    let mainContainer = document.getElementById(MAIN_CONTENT_ID);
    let addNewSeriesContainer = document.createElement("div");
    addNewSeriesContainer.className = "productItemContainer";
    let addSeriesSubContainer = document.createElement("div");
    addSeriesSubContainer.className = "productItemSubContainer";
    addNewSeriesToContainer(addSeriesSubContainer);
    addNewSeriesContainer.appendChild(addSeriesSubContainer);
    mainContainer.appendChild(addNewSeriesContainer);

    let length = seriesEntities == undefined ? 0 : seriesEntities.length;
    for (let i = 0; i < length; i++) {
        if (i + 1 % 4 == 0) {
            let clearFloat = document.createElement("div");
            clearFloat.className = "clearFloat";
            mainContainer.appendChild(clearFloat);
        }
        mainContainer.appendChild(createSeriesContainer(seriesEntities[i]));
    }
}


function addNewSeriesToContainer(container) {
    container.innerHTML = null;
    let addLabel = document.createElement("div");
    addLabel.innerHTML = "+";
    addLabel.style.fontSize = "150px";
    addLabel.style.cursor = "pointer";
    container.appendChild(addLabel);
    addLabel.onclick = function () {
        convertSeriesContainerToEditor(container, undefined);
    }
}

function createSeriesContainer(seriesEntity) {
    let seriesEntityContainer = document.createElement("div");
    seriesEntityContainer.className = "productItemContainer";
    let seriesEntitySubContainer = document.createElement("div");
    seriesEntitySubContainer.className = "productItemSubContainer";
    if (seriesEntity.status == 1) {
        seriesEntitySubContainer.style.borderColor = "#FF0000";
    }
    addSeriesToContainer(seriesEntitySubContainer, seriesEntity);
    seriesEntityContainer.appendChild(seriesEntitySubContainer);
    return seriesEntityContainer;
}


function addSeriesToContainer(container, seriesEntity) {
    container.innerHTML = null;
    container.style.cursor = "pointer";
    let seriesLabelInput = document.createElement("input");
    seriesLabelInput.className = "labelNameEditor";
    seriesLabelInput.readOnly = true;
    seriesLabelInput.value = seriesEntity.label;
    container.appendChild(seriesLabelInput);
    seriesLabelInput.onclick = function () {
        convertSeriesContainerToEditor(container, seriesEntity);
    }
    container.onclick = function () {
        initProductType(seriesEntity);
    }
}

function convertSeriesContainerToEditor(seriesContainer, seriesEntity) {
    seriesContainer.innerHTML = null;
    seriesContainer.onclick = null;
    seriesContainer.ondblclick = null;
    seriesContainer.style.cursor = "default";
    let seriesLabelInput = document.createElement("input");
    seriesLabelInput.className = "labelNameEditor";
    seriesLabelInput.style.cursor = "text";
    seriesContainer.appendChild(seriesLabelInput);
    let seriesEditorActionBar = document.createElement("div");
    seriesEditorActionBar.className = "actionBar";
    seriesContainer.appendChild(seriesEditorActionBar);
    if (seriesEntity == undefined) {
        //添加新系列
        seriesLabelInput.placeholder = "请输入产品系列名称";
        seriesLabelInput.focus();

        let cancelAction = document.createElement("div");
        cancelAction.className = "actionButton";
        cancelAction.style.width = "48%";
        cancelAction.innerHTML = "取消";
        seriesEditorActionBar.appendChild(cancelAction);

        let saveAction = document.createElement("div");
        saveAction.className = "actionButton";
        saveAction.style.width = "48%";
        saveAction.innerHTML = "保存";
        seriesEditorActionBar.appendChild(saveAction);

        cancelAction.onclick = function () {
            window.event.cancelBubble = true;
            addNewSeriesToContainer(seriesContainer);
        }

        saveAction.onclick = function () {
            window.event.cancelBubble = true;
            let label = seriesLabelInput.value;
            if (label == undefined || label == null || label == "") {
                new Toast().show("系列名称不能为空");
            } else {
                let requestSeriesEntity = new Object();
                requestSeriesEntity.sessionId = "admin";
                requestSeriesEntity.label = label;
                requestCreateSeries(requestSeriesEntity);
            }
        }

    } else {
        //编辑旧系列
        seriesLabelInput.value = seriesEntity.label;
        seriesLabelInput.focus();
        let backAction = document.createElement("div");
        backAction.className = "actionButton";
        backAction.innerHTML = "返回";
        seriesEditorActionBar.appendChild(backAction);

        let saveAction = document.createElement("div");
        saveAction.className = "actionButton";
        saveAction.innerHTML = "保存";
        seriesEditorActionBar.appendChild(saveAction);

        let blockAction = document.createElement("div");
        blockAction.className = "actionButton";
        if (seriesEntity.status == 1) {
            blockAction.innerHTML = "启用";
        } else if (seriesEntity.status == 2){
            blockAction.innerHTML = "禁用";
        }
        seriesEditorActionBar.appendChild(blockAction);
        let deleteAction = document.createElement("div");
        deleteAction.className = "actionButton";
        deleteAction.innerHTML = "删除";
        seriesEditorActionBar.appendChild(deleteAction);

        backAction.onclick = function () {
            window.event.cancelBubble = true;
            addSeriesToContainer(seriesContainer, seriesEntity);
        }

        saveAction.onclick = function () {
            window.event.cancelBubble = true;
            let label = seriesLabelInput.value;
            if (label == undefined || label == null || label == "") {
                new Toast().show("系列名称不能为空");
            } else if (label == seriesEntity.label) {
                new Toast().show("系列名称没有变化,无需更改");
            } else {
                let requestSeriesEntity = new Object();
                requestSeriesEntity.sessionId = "admin";
                requestSeriesEntity.seriesId = seriesEntity.seriesId;
                requestSeriesEntity.label = label;
                requestRenameSeries(requestSeriesEntity);
            }
        }

        blockAction.onclick = function () {
            window.event.cancelBubble = true;
            let requestSeriesEntity = new Object();
            requestSeriesEntity.sessionId = "admin";
            requestSeriesEntity.seriesId = seriesEntity.seriesId;
            if (seriesEntity.status == 1) {
                requestSeriesEntity.status = 2;
            } else if (seriesEntity.status == 2) {
                requestSeriesEntity.status = 1;
            }
            requestMarkSeries(requestSeriesEntity);
        }

        deleteAction.onclick = function () {
            window.event.cancelBubble = true;
            let requestSeriesEntity = new Object();
            requestSeriesEntity.sessionId = "admin";
            requestSeriesEntity.seriesId = seriesEntity.seriesId;
            requestSeriesEntity.status = -1;
            requestMarkSeries(requestSeriesEntity);
        }
    }
}

function requestCreateSeries(seriesEntity) {
    var indexUrl = BASE_PATH + "/series/mCreate?p=" + JSON.stringify(seriesEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                new Toast().show("创建成功");
                initProductSeries(undefined);
            } else {
                new Toast().show("更新失败");
            }
        }
    }, onRequestError(), onRequestTimeout());
}

function requestRenameSeries(seriesEntity) {
    var indexUrl = BASE_PATH + "/series/mUpdate?p=" + JSON.stringify(seriesEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                new Toast().show("更新成功");
                initProductSeries(undefined);
            } else {
                new Toast().show("更新失败");
            }
        }
    }, onRequestError(), onRequestTimeout());
}

function requestMarkSeries(seriesEntity) {
    console.log(seriesEntity);
    var indexUrl = BASE_PATH + "/series/mMark?p=" + JSON.stringify(seriesEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                new Toast().show("操作成功");
                initProductSeries(undefined);
            } else {
                new Toast().show("操作失败");
            }
        }
    }, onRequestError(), onRequestTimeout());
}