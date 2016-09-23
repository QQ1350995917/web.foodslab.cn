/**
 * Created by dingpengwei on 8/12/16.
 */

/**
 * 创建类型名称
 * @param containerView 容器对象
 * @param seriesId 类型的ID
 * @param label 类型的名称
 */
function createType(containerView, typeEntity) {
    var indexUrl = BASE_PATH + "/type/mCreate?p=" + JSON.stringify(typeEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponsDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                new Toast().show("创建成功");
                containerView.removeChild(containerView.lastChild);
                containerView.removeChild(containerView.lastChild);
                initTypeView(containerView, parseData.data);
                addNewType(containerView);
            } else {
                new Toast().show("创建失败");
            }
        }
    }, onRequestError(), onRequestTimeout());
}

/**
 * 重命名类型名称
 * @param typeEntity
 */
function renameType(typeEntity) {
    var indexUrl = BASE_PATH + "/type/mUpdate?p=" + JSON.stringify(typeEntity);
    asyncRequestByGet(indexUrl, function (data) {
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

function blockType() {

}

function deleteType(typeEntitiesViewContainer, typeEntityView, typeEntity) {
    var indexUrl = BASE_PATH + "/type/mMark?p=" + JSON.stringify(typeEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponsDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                typeEntitiesViewContainer.removeChild(typeEntityView);
                new Toast().show("删除成功");
            } else {
                new Toast().show("删除失败");
            }
        }
    }, onRequestError(), onRequestTimeout());

}

/**
 * 当前的系列数据
 */
let CURRENT_SERIES_ENTITY;
/**
 * 产品列表导向到系列列表
 * 通常由产品列表调用
 * @param seriesEntity 数据对象
 */
function showSeries(seriesEntity) {
    CURRENT_SERIES_ENTITY = seriesEntity;
    // 重置界面
    resetView();
    // 获取根元素对象
    let titleViewContainer = document.getElementById(MAIN_TITLE_ID);
    let contentViewContainer = document.getElementById(MAIN_CONTENT_ID);
    let seriesTitleView = document.createElement("div");
    seriesTitleView.innerHTML = "产品系列";
    seriesTitleView.className = "horizontalSelected";
    seriesTitleView.style.width = "100%";
    seriesTitleView.style.cursor = "pointer";
    seriesTitleView.ondblclick = function () {
        backToProduct();
    };
    titleViewContainer.appendChild(seriesTitleView);
    initSeriesView(contentViewContainer, seriesEntity)
}

/**
 * 返回事件
 */
function backToProduct() {
    CURRENT_SERIES_ENTITY = null;
    initProduct();
}


/**
 * 显示系列数据到界面
 * @param containerView
 * @param seriesEntity
 */
function initSeriesView(containerView, seriesEntity) {
    // 显示系列容器的根对象
    let seriesRootView = document.createElement("div");
    seriesRootView.className = "SS_IC";
    seriesRootView.style.height = "150px";
    //系列连接线横线
    let line_H_level1 = document.createElement("hr");
    line_H_level1.className = "SS_IC_HL";
    seriesRootView.appendChild(line_H_level1);

    // 系类显示容器(二级根容器对象)
    let typeEntitiesViewContainer = document.createElement("div");
    typeEntitiesViewContainer.className = "SS_IC";
    typeEntitiesViewContainer.style.height = "90%";
    // 显示和编辑转化容器对象
    let converterViewContainer = document.createElement("div");
    // 显示系列名称的容器对象
    let seriesLabel = document.createElement("div");
    seriesLabel.className = "SS_IC_LABEL";
    seriesLabel.innerHTML = seriesEntity.label;
    seriesLabel.onclick = function () {
        backToProduct();
    };
    converterViewContainer.appendChild(seriesLabel);
    typeEntitiesViewContainer.appendChild(converterViewContainer);
    let clearFloat = document.createElement("div");
    clearFloat.className = "clearFloat";
    typeEntitiesViewContainer.appendChild(clearFloat);

    //判断是否是有类型
    let typeEntitiesSize = (seriesEntity == undefined || seriesEntity.children == undefined) ? 0 : seriesEntity.children.length;
    if (typeEntitiesSize > 0) {
        for (let i = 0; i < typeEntitiesSize; i++) {
            initTypeView(typeEntitiesViewContainer, seriesEntity.children[i]);
        }
    }
    seriesRootView.style.height = (typeEntitiesSize + 2) * 80 + "px";
    addNewType(typeEntitiesViewContainer);
    seriesRootView.appendChild(typeEntitiesViewContainer);
    containerView.appendChild(seriesRootView);
}

function initTypeView(typeEntitiesViewContainer, typeEntity) {
    // 显示类型和规格的根对象
    let typeEntityView = document.createElement("div");
    typeEntityView.className = "SS_IC";
    typeEntityView.style.height = "80px";
    typeEntityView.style.borderLeftWidth = "0px";
    typeEntityView.style.marginTop = "10px";
    //类型连接线横线
    let line_H_level2 = document.createElement("hr");
    line_H_level2.className = "SS_IC_HL";
    typeEntityView.appendChild(line_H_level2);

    let formatRootViewContainer = document.createElement("div");
    formatRootViewContainer.className = "SS_IC";
    formatRootViewContainer.style.height = "80px";

    // 类型-规格容器对象
    let typeLabelConvertView = document.createElement("div");
    let typeLabelView = document.createElement("div");
    typeLabelView.className = "SS_IC_LABEL";
    typeLabelView.innerHTML = typeEntity.label;
    typeLabelView.ondblclick = function () {
        onTypeNameClick(typeEntitiesViewContainer, typeEntityView, typeLabelConvertView, typeEntity);
    };
    typeLabelConvertView.appendChild(typeLabelView);
    formatRootViewContainer.appendChild(typeLabelConvertView);
    typeEntityView.appendChild(formatRootViewContainer);
    typeEntitiesViewContainer.appendChild(typeEntityView);

    let clearFloat = document.createElement("div");
    clearFloat.className = "clearFloat";
    formatRootViewContainer.appendChild(clearFloat);

    //类型连接线横线
    let line_H_level3 = document.createElement("hr");
    line_H_level3.className = "SS_IC_HL";
    line_H_level3.style.marginTop = "25px";
    formatRootViewContainer.appendChild(line_H_level3);
    let formatLabelView = document.createElement("div");
    formatLabelView.style.borderLeftWidth = "1px";
    formatLabelView.style.marginTop = "10px";
    formatRootViewContainer.appendChild(formatLabelView);
    let formatEntitiesSize = (typeEntity.children == undefined ? 0 : typeEntity.children.length);
    if (formatEntitiesSize > 0) {
        formatLabelView.className = "SS_IC_LABEL";
        formatLabelView.style.width = 50 * formatEntitiesSize + "px";
        for (let j = 0; j < formatEntitiesSize; j++) {
            let formatLabel = document.createElement("label");
            formatLabel.style.width = "50px";
            formatLabel.style.margin = "10px";
            let formatEntity = typeEntity.children[j];
            formatLabel.innerHTML = formatEntity.label + formatEntity.meta;
            formatLabelView.appendChild(formatLabel);
        }
    } else {
        formatLabelView.className = "B_B_D";
        formatLabelView.style.marginLeft = "0px";
        formatLabelView.style.width = "80px";
        formatLabelView.innerHTML = "编辑规格";

    }
    formatLabelView.onclick = function () {
        showType(typeEntity);
    };
}


function addNewType(containerView) {
    // 显示类型和规格的根对象
    let typeRootViewContainer = document.createElement("div");
    typeRootViewContainer.className = "SS_IC";
    typeRootViewContainer.style.height = "30px";
    typeRootViewContainer.style.borderLeftWidth = "0px";
    typeRootViewContainer.style.marginTop = "10px";
    //类型连接线横线
    let line_H_level2 = document.createElement("hr");
    line_H_level2.className = "SS_IC_HL";
    typeRootViewContainer.appendChild(line_H_level2);
    // 添加型号显示框
    let typeItemLabelView = document.createElement("div");
    typeItemLabelView.className = "B_B_D";
    typeItemLabelView.style.width = "100px";
    typeItemLabelView.style.marginLeft = "0px";
    typeItemLabelView.innerHTML = "添加类型";
    typeItemLabelView.onclick = function () {
        containerView.removeChild(typeRootViewContainer);
        let childId = containerView.lastChild == undefined ? undefined : containerView.lastChild.childId;
        if (childId != APP_CONST_CLIENT_ID) {
            containerView.style.height = containerView.clientHeight + 50 + "px";
            // 添加新类型的容器
            let itemViewContainerSub = document.createElement("div");
            itemViewContainerSub.childId = APP_CONST_CLIENT_ID;
            itemViewContainerSub.className = "SS_IC";
            itemViewContainerSub.style.height = "40px";
            itemViewContainerSub.style.borderLeftWidth = "0px";
            itemViewContainerSub.style.marginTop = "15px";
            // 添加新类型连接线横线
            let line_H_level1 = document.createElement("hr");
            line_H_level1.className = "SS_IC_HL";
            itemViewContainerSub.appendChild(line_H_level1);

            // 添加新类型的容器
            let typeItemLabelContainerView = document.createElement("div");
            typeItemLabelContainerView.className = "SS_IC_LABEL";
            typeItemLabelContainerView.style.borderWidth = "0px";
            typeItemLabelContainerView.style.width = "300px";
            // 添加新类型的按钮
            let addNewTypeViewSub = document.createElement("input");
            addNewTypeViewSub.className = "SS_IC_LABEL";
            addNewTypeViewSub.style.height = "28px";
            addNewTypeViewSub.style.borderLeftWidth = "1px";
            typeItemLabelContainerView.appendChild(addNewTypeViewSub);
            addNewTypeViewSub.focus();
            let typeNameSaveView = document.createElement("div");
            typeNameSaveView.innerHTML = "保存";
            typeNameSaveView.className = "B_B_D";
            typeNameSaveView.onclick = function () {
                if (addNewTypeViewSub.value == "" || addNewTypeViewSub.value == undefined || addNewTypeViewSub.value == null) {
                    new Toast().show("请输入类型名称");
                } else {
                    let requestTypeEntity = new Object();
                    requestTypeEntity.seriesId = CURRENT_SERIES_ENTITY.seriesId;
                    requestTypeEntity.label = addNewTypeViewSub.value;
                    createType(containerView, requestTypeEntity);
                }
            };
            typeItemLabelContainerView.appendChild(typeNameSaveView);
            let typeNameDeleteView = document.createElement("div");
            typeNameDeleteView.innerHTML = "删除";
            typeNameDeleteView.className = "B_B_D";
            typeNameDeleteView.onclick = function () {
                containerView.style.height = (containerView.clientHeight - 50) + "px";
                if (itemViewContainerSub.childId == APP_CONST_CLIENT_ID) {
                    containerView.removeChild(itemViewContainerSub);
                }
            };
            typeItemLabelContainerView.appendChild(typeNameDeleteView);
            itemViewContainerSub.appendChild(typeItemLabelContainerView);
            containerView.appendChild(itemViewContainerSub);
        }
        addNewType(containerView);
    };
    typeRootViewContainer.appendChild(typeItemLabelView);
    containerView.appendChild(typeRootViewContainer);
}

/**
 * 修改类型名称状态
 */
function onTypeNameClick(typeEntitiesViewContainer, typeEntityView, convertViewContainer, typeEntity) {
    convertViewContainer.innerHTML = null;
    let typeNameInputView = document.createElement("input");
    typeNameInputView.value = typeEntity.label;
    typeNameInputView.className = "SS_IC_LABEL";
    typeNameInputView.style.height = "28px";
    typeNameInputView.onblur = function () {

    };
    convertViewContainer.appendChild(typeNameInputView);
    typeNameInputView.focus();

    let typeNameBackView = document.createElement("div");
    typeNameBackView.innerHTML = "取消";
    typeNameBackView.className = "B_B_D";
    convertViewContainer.appendChild(typeNameBackView);
    typeNameBackView.onclick = function () {
        onTypeNameBlur(typeEntitiesViewContainer, typeEntityView, convertViewContainer, typeEntity, typeEntity.label);
    };
    let typeNameSaveView = document.createElement("div");
    typeNameSaveView.innerHTML = "保存";
    typeNameSaveView.className = "B_B_D";
    convertViewContainer.appendChild(typeNameSaveView);
    typeNameSaveView.onclick = function () {
        onTypeNameBlur(typeEntitiesViewContainer, typeEntityView, convertViewContainer, typeEntity, typeNameInputView.value);
    };
    let typeNameBlockView = document.createElement("div");
    typeNameBlockView.innerHTML = "禁用";
    typeNameBlockView.className = "B_B_D";
    convertViewContainer.appendChild(typeNameBlockView);
    typeNameBlockView.onclick = function () {
        onTypeNameBlur(typeEntitiesViewContainer, typeEntityView, convertViewContainer, typeEntity, typeEntity.label);
    };
    let typeNameDeleteView = document.createElement("div");
    typeNameDeleteView.innerHTML = "删除";
    typeNameDeleteView.className = "B_B_D";
    convertViewContainer.appendChild(typeNameDeleteView);
    typeNameDeleteView.onclick = function () {
        onTypeNameBlur(typeEntitiesViewContainer, typeEntityView, convertViewContainer, typeEntity, typeEntity.label);
        let requestTypeEntity = new Object();
        requestTypeEntity.seriesId = typeEntity.seriesId;
        requestTypeEntity.typeId = typeEntity.typeId;
        requestTypeEntity.status = -1;
        deleteType(typeEntitiesViewContainer, typeEntityView, requestTypeEntity);
    };
}

function onTypeNameBlur(typeEntitiesViewContainer, typeEntityView, convertViewContainer, typeEntity, newValue) {
    convertViewContainer.innerHTML = null;
    //系列显示框
    let seriesItemLabelView = document.createElement("div");
    seriesItemLabelView.className = "SS_IC_LABEL";
    seriesItemLabelView.innerHTML = newValue;
    seriesItemLabelView.ondblclick = function () {
        onTypeNameClick(typeEntitiesViewContainer, typeEntityView, convertViewContainer, typeEntity);
    };
    convertViewContainer.appendChild(seriesItemLabelView);

    if (newValue != undefined && newValue != null && newValue.trim() != "" && typeEntity.label != newValue) {
        let requestTypeEntity = new Object();
        requestTypeEntity.seriesId = typeEntity.seriesId;
        requestTypeEntity.typeId = typeEntity.typeId;
        requestTypeEntity.label = newValue;
        renameType(requestTypeEntity);
    }
}
