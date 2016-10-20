/**
 * Created by dingpengwei on 8/12/16.
 */

function loadProductView(sessionEntity) {
    let titleView = document.createElement("div");
    titleView.innerHTML = "系列总览";
    getTitleContainer().appendChild(titleView);
    requestSeriesListData(sessionEntity);
}

function requestSeriesListData(sessionEntity) {
    getMainContainer().innerHTML = null;
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
    }, onErrorCallback(), onTimeoutCallback());
}

function onRequestSeriesListDataCallback(seriesEntities) {
    let length = seriesEntities == undefined ? 0 : seriesEntities.length;
    for (let i = 0; i < length + 1; i++) {
        let seriesEntityContainer = document.createElement("div");
        seriesEntityContainer.className = "listItemWidthBottom";
        if (i < length) {
            attachSeriesLabelToSeriesItem(seriesEntityContainer, seriesEntities[i], false)
        } else {
            //添加新系列
            attachSeriesLabelToSeriesItem(seriesEntityContainer, undefined, false)
        }
        getMainContainer().appendChild(seriesEntityContainer);
    }
}

function attachSeriesLabelToSeriesItem(seriesEntityContainer, seriesEntity, editorStatus) {
    seriesEntityContainer.innerHTML = null;
    if (seriesEntity == undefined) {
        seriesEntityContainer.className = "actionButton";
        seriesEntityContainer.style.width = "100%";
        seriesEntityContainer.innerHTML = "添加新系列";
        seriesEntityContainer.onclick = function () {
            attachSeriesLabelToSeriesItem(seriesEntityContainer, seriesEntity, true)
        }
        if (editorStatus) {
            convertSeriesContainerToEditor(seriesEntityContainer, seriesEntity);
        }
    } else {
        let seriesNameDiv = document.createElement("div");
        seriesNameDiv.className = "listItemLabel";
        seriesNameDiv.innerHTML = seriesEntity.label;
        let seriesEditorDiv = document.createElement("div");
        seriesEditorDiv.className = "listAction";
        seriesEditorDiv.innerHTML = "编辑";
        let seriesBlockDiv = document.createElement("div");
        seriesBlockDiv.className = "listAction";
        seriesBlockDiv.innerHTML = "禁用";
        let seriesDeleteDiv = document.createElement("div");
        seriesDeleteDiv.className = "listAction";
        seriesDeleteDiv.innerHTML = "删除";
        let typeOfSeriesDiv = document.createElement("div");
        typeOfSeriesDiv.className = "listAction";
        typeOfSeriesDiv.innerHTML = "系列";
        seriesEntityContainer.appendChild(seriesNameDiv);
        seriesEntityContainer.appendChild(typeOfSeriesDiv);
        seriesEntityContainer.appendChild(seriesDeleteDiv);
        seriesEntityContainer.appendChild(seriesBlockDiv);
        seriesEntityContainer.appendChild(seriesEditorDiv);

        if (seriesEntity.status == 1) {
            seriesNameDiv.className = "listItemLabel listItemBlock";
            seriesBlockDiv.innerHTML = "启用";
        }else if (seriesEntity.status == 2) {
            seriesBlockDiv.innerHTML = "禁用";
        }
        if (editorStatus) {
            convertSeriesContainerToEditor(seriesEntityContainer, seriesEntity);
        }

        seriesEditorDiv.onclick = function () {
            attachSeriesLabelToSeriesItem(seriesEntityContainer, seriesEntity, true)
        };
        seriesBlockDiv.onclick = function () {
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
        };
        seriesDeleteDiv.onclick = function () {
            window.event.cancelBubble = true;
            let requestSeriesEntity = new Object();
            requestSeriesEntity.sessionId = "admin";
            requestSeriesEntity.seriesId = seriesEntity.seriesId;
            requestSeriesEntity.status = -1;
            requestMarkSeries(requestSeriesEntity);
        };
        typeOfSeriesDiv.onclick = function () {
            resetMainContainer();
            loadProductTypeView(seriesEntity);
        };
    }
}

function convertSeriesContainerToEditor(seriesEntityContainer, seriesEntity) {
    seriesEntityContainer.innerHTML = null;
    let seriesLabelInput = document.createElement("input");
    seriesLabelInput.className = "withoutBorder";
    let seriesCancelDiv = document.createElement("div");
    seriesCancelDiv.className = "listAction listActionWidthDouble";
    seriesCancelDiv.innerHTML = "返回";
    let seriesSaveDiv = document.createElement("div");
    seriesSaveDiv.className = "listAction listActionWidthDouble";
    seriesSaveDiv.innerHTML = "保存";

    seriesEntityContainer.appendChild(seriesLabelInput);
    seriesEntityContainer.appendChild(seriesSaveDiv);
    seriesEntityContainer.appendChild(seriesCancelDiv);

    seriesLabelInput.focus();
    if (seriesEntity == undefined) {
        seriesLabelInput.placeholder = "请输入产品系列名称";
    } else {
        seriesLabelInput.value = seriesEntity.label;
    }

    seriesCancelDiv.onclick = function () {
        window.event.cancelBubble = true;
        attachSeriesLabelToSeriesItem(seriesEntityContainer, seriesEntity, false)
    }
    seriesSaveDiv.onclick = function () {
        window.event.cancelBubble = true;
        let label = seriesLabelInput.value;
        if (label == undefined || label == null || label == "") {
            new Toast().show("系列名称不能为空");
        } else {
            if (seriesEntity == undefined) {
                let requestSeriesEntity = new Object();
                requestSeriesEntity.sessionId = "admin";
                requestSeriesEntity.label = label;
                requestCreateSeries(requestSeriesEntity);
            } else {
                let requestSeriesEntity = new Object();
                requestSeriesEntity.sessionId = "admin";
                requestSeriesEntity.seriesId = seriesEntity.seriesId;
                requestSeriesEntity.label = label;
                requestRenameSeries(requestSeriesEntity);
            }
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
                requestSeriesListData(undefined);
            } else {
                new Toast().show("更新失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function requestRenameSeries(seriesEntity) {
    var indexUrl = BASE_PATH + "/series/mUpdate?p=" + JSON.stringify(seriesEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                new Toast().show("更新成功");
                requestSeriesListData(undefined);
            } else {
                new Toast().show("更新失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function requestMarkSeries(seriesEntity) {
    var indexUrl = BASE_PATH + "/series/mMark?p=" + JSON.stringify(seriesEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                new Toast().show("操作成功");
                requestSeriesListData(undefined);
            } else {
                new Toast().show("操作失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}