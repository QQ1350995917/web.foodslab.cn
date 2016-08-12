/**
 * Created by dingpengwei on 8/3/16.
 */

/**
 * 全局变量,产品树数据
 */
let GLOBAL_PRODUCT_ENTITIES;

/**
 * 请求产品列表
 */
function productSeries() {
    var indexUrl = BASE_PATH + "/product";
    asyncRequestByGet(indexUrl, onProductDataCallBack, onRequestError(), onRequestTimeout());
}

/**
 * 创建系列名称
 * @param containerView 所在的容器对象
 * @param seriesName 名称
 */
function createSeries(containerView, seriesName) {
    var indexUrl = BASE_PATH + "/product/createSeries?label=" + seriesName;
    asyncRequestByGet(indexUrl, function (data) {
        onSeriesCreateDataCallback(containerView, data);
    }, onRequestError(), onRequestTimeout());
}

/**
 * 更新系列名称
 * @param seriesId 系列的ID
 * @param label 系列的名称
 */
function renameSeries(seriesId,label) {
    var indexUrl = BASE_PATH + "/product/updateSeries?label=" + label + "&seriesId=" + seriesId + "&status=1";
    asyncRequestByGet(indexUrl, onSeriesRenameDataCallback, onRequestError(), onRequestTimeout());
}


function blockSeries() {

}

/**
 * 删除系列
 * @param rootView 根对象
 * @param seriesRootView 系列根对象
 * @param seriesId 数据ID
 */
function deleteSeries(rootView,seriesRootView,seriesId,label) {
    var indexUrl = BASE_PATH + "/product/updateSeries?label=" + label + "&seriesId=" + seriesId + "&status=-1";
    asyncRequestByGet(indexUrl, function (data) {
        onSeriesDeleteDataCallback(rootView,seriesRootView,data);
    }, onRequestError(), onRequestTimeout());
}

/**
 * 处理服务器返回的产品数据
 * @param data 服务器返回的数据
 */
function onProductDataCallBack(data) {
    var result = checkResponsDataFormat(data);
    if (result) {
        var parseData = JSON.parse(data);
        GLOBAL_PRODUCT_ENTITIES = parseData.data;
        initProductView(GLOBAL_PRODUCT_ENTITIES);
    }
}

/**
 * 处理服务器返回的创建系列数据
 * @param containerView 容器对象
 * @param data 数据
 */
function onSeriesCreateDataCallback(containerView, data) {
    var result = checkResponsDataFormat(data);
    if (result) {
        var parseData = JSON.parse(data);
        containerView.removeChild(containerView.childNodes[containerView.childNodes.length - 1]);
        containerView.removeChild(containerView.childNodes[containerView.childNodes.length - 1]);
        initProductItemView(containerView, parseData.data);
        addNewSeries(containerView);
    }
}

/**
 * 处理服务器返回的系列更新系列名称的数据
 * @param data
 */
function onSeriesRenameDataCallback(data) {
    var result = checkResponsDataFormat(data);
    if (result) {
        var parseData = JSON.parse(data);
        if (parseData.code == 200){
            new Toast().show("更新成功");
        }
    }
}

/**
 * 处理服务器返回的系列删除的数据
 * @param rootView 根对象
 * @param seriesRootView 系列根对象
 * @param data 数据
 */
function onSeriesDeleteDataCallback(rootView,seriesRootView,data) {
    var result = checkResponsDataFormat(data);
    if (result) {
        var parseData = JSON.parse(data);
        if (parseData.code == 200){
            rootView.removeChild(seriesRootView);
            new Toast().show("删除成功");
        }
    }
}

/**
 * 显示产品数据到界面
 * @param productEntities
 */
function initProductView(productEntities) {
    // 重置界面
    resetView();
    // 获取根元素对象
    let titleViewContainer = document.getElementById(MAIN_TITLE_ID);
    let contentViewContainer = document.getElementById(MAIN_CONTENT_ID);
    // 添加标题
    let titleView = document.createElement("div");
    titleView.innerHTML = "产品总览";
    titleView.className = "horizontalSelected";
    titleView.style.width = "100%";
    titleViewContainer.appendChild(titleView);
    // 构建系列组合
    let seriesEntitiesSize = productEntities == undefined ? 0 : productEntities.length;
    for (let index = 0; index < seriesEntitiesSize; index++) {
        initProductItemView(contentViewContainer, productEntities[index]);
    }
    addNewSeries(contentViewContainer);
}


/**
 * 显示单个的产品数据到界面
 * @param containerView 容器对象
 * @param productEntity 产品数据
 */
function initProductItemView(containerView, productEntity) {
    // 显示系列容器的根对象
    let seriesRootView = document.createElement("div");
    seriesRootView.className = "SS_IC";
    //系列连接线横线
    let line_H_level1 = document.createElement("hr");
    line_H_level1.className = "SS_IC_HL";
    seriesRootView.appendChild(line_H_level1);

    // 系类显示容器(二级根容器对象)
    let seriesSubRootViewContainer = document.createElement("div");
    seriesSubRootViewContainer.className = "SS_IC";
    seriesSubRootViewContainer.style.height = "90%";

    // 显示和编辑转化容器对象
    let converterViewContainer = document.createElement("div");
    // 显示系列名称的容器对象
    let seriesLabel = document.createElement("div");
    seriesLabel.className = "SS_IC_LABEL";
    seriesLabel.innerHTML = productEntity.label;
    seriesLabel.ondblclick = function () {
        onSeriesNameClick(containerView,seriesRootView,converterViewContainer, productEntity);
    };
    converterViewContainer.appendChild(seriesLabel);
    seriesSubRootViewContainer.appendChild(converterViewContainer);
    let clearFloat = document.createElement("div");
    clearFloat.className = "clearFloat";
    seriesSubRootViewContainer.appendChild(clearFloat);

    //判断是否是有类型
    let typeEntitiesSize = (productEntity == undefined || productEntity.children == undefined) ? 0 : productEntity.children.length;
    if (typeEntitiesSize < 1) {
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
        typeItemLabelView.innerHTML = "编辑类型";
        typeItemLabelView.onclick = function () {
            showSeries(productEntity);
        };
        typeRootViewContainer.appendChild(typeItemLabelView);
        seriesSubRootViewContainer.appendChild(typeRootViewContainer);
    } else {
        for (let i = 0; i < typeEntitiesSize; i++) {
            let typeEntity = productEntity.children[i];
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
            // 类型-规格容器对象
            let typeLabelView = document.createElement("div");
            typeLabelView.className = "SS_IC_LABEL";
            typeLabelView.style.borderLeftWidth = "1px";
            typeLabelView.innerHTML = typeEntity.label;
            typeLabelView.ondblclick = function () {
                onSeriesItemClick(productEntity.seriesId);
            };
            typeRootViewContainer.appendChild(typeLabelView);
            let formatEntitiesSize = (typeEntity.children == undefined ? 0 : typeEntity.children.length);
            if (formatEntitiesSize > 0) {
                //规格显示框的横向连接线
                let line_H_level3 = document.createElement("hr");
                line_H_level3.className = "SS_IC_HL";
                typeRootViewContainer.appendChild(line_H_level3);

                //类型规格框
                let formatContainer = document.createElement("div");
                formatContainer.className = "SS_IC_LABEL";
                formatContainer.style.width = 50 * formatEntitiesSize + "px";
                formatContainer.style.textAlign = "left";
                formatContainer.style.borderLeftWidth = "1px";
                typeRootViewContainer.appendChild(formatContainer);
                for (let j = 0; j < formatEntitiesSize; j++) {
                    let formatLabel = document.createElement("label");
                    formatLabel.style.width = "50px";
                    formatLabel.style.display = "inline-block";
                    let formatEntity = typeEntity.children[j];
                    formatLabel.innerHTML = formatEntity.label + formatEntity.meta;
                    formatLabel.ondblclick = function () {
                        onSeriesItemClick(productEntity.seriesId);
                    };
                    formatContainer.appendChild(formatLabel);
                }
            }
            seriesSubRootViewContainer.appendChild(typeRootViewContainer);
        }
        seriesRootView.style.height = typeEntitiesSize * 60 + "px";
    }
    seriesRootView.appendChild(seriesSubRootViewContainer);
    containerView.appendChild(seriesRootView);
}

/**
 * 创建添加新系列的按钮以及点击逻辑
 * @param containerView
 */
function addNewSeries(containerView) {
    // 添加新系列的容器
    let newSeriesViewContainer = document.createElement("div");
    newSeriesViewContainer.className = "SS_IC";
    newSeriesViewContainer.style.height = "50px";
    //系列连接线横线
    let line_H_level1 = document.createElement("hr");
    line_H_level1.className = "SS_IC_HL";
    newSeriesViewContainer.appendChild(line_H_level1);
    // 添加新系列的按钮
    let addNewSeriesView = document.createElement("button");
    addNewSeriesView.className = "managerItem_save";
    addNewSeriesView.innerHTML = "添加新系列";
    newSeriesViewContainer.appendChild(addNewSeriesView);
    addNewSeriesView.onclick = function () {
        containerView.removeChild(newSeriesViewContainer);
        let childId = containerView.lastChild == undefined ? undefined : containerView.lastChild.childId;
        if (childId != APP_CONST_CLIENT_ID) {
            // 添加新系列的容器
            let itemViewContainerSub = document.createElement("div");
            itemViewContainerSub.childId = APP_CONST_CLIENT_ID;
            itemViewContainerSub.className = "SS_IC";
            itemViewContainerSub.style.height = "50px";
            // 添加新系列连接线横线
            let line_H_level1 = document.createElement("hr");
            line_H_level1.className = "SS_IC_HL";
            itemViewContainerSub.appendChild(line_H_level1);

            // 添加新系列的容器
            let seriesItemLabelContainerView = document.createElement("div");
            seriesItemLabelContainerView.className = "SS_IC_LABEL";
            seriesItemLabelContainerView.style.borderWidth = "0px";
            seriesItemLabelContainerView.style.width = "300px";
            // 添加新系列的按钮
            let addNewSeriesViewSub = document.createElement("input");
            addNewSeriesViewSub.className = "SS_IC_LABEL";
            addNewSeriesViewSub.style.height = "28px";
            addNewSeriesViewSub.style.borderLeftWidth = "1px";
            seriesItemLabelContainerView.appendChild(addNewSeriesViewSub);
            let seriesNameSaveView = document.createElement("div");
            seriesNameSaveView.innerHTML = "保存";
            seriesNameSaveView.className = "B_B_D";
            seriesNameSaveView.onclick = function () {
                if (addNewSeriesViewSub.value == "" || addNewSeriesViewSub.value == undefined || addNewSeriesViewSub.value == null) {
                    new Toast().show("请输入系列名称");
                } else {
                    createSeries(containerView, addNewSeriesViewSub.value);
                }
            };
            seriesItemLabelContainerView.appendChild(seriesNameSaveView);
            let seriesNameDeleteView = document.createElement("div");
            seriesNameDeleteView.innerHTML = "删除";
            seriesNameDeleteView.className = "B_B_D";
            seriesNameDeleteView.onclick = function () {
                if (itemViewContainerSub.childId == APP_CONST_CLIENT_ID) {
                    containerView.removeChild(itemViewContainerSub);
                }
            };
            seriesItemLabelContainerView.appendChild(seriesNameDeleteView);
            itemViewContainerSub.appendChild(seriesItemLabelContainerView);
            containerView.appendChild(itemViewContainerSub);
        }
        addNewSeries(containerView);
    };
    containerView.appendChild(newSeriesViewContainer);
}

/**
 * 产品列表,文本域的点击事件
 * @param seriesId 系列的ID
 */
function onSeriesItemClick(seriesId) {
    if (seriesId == undefined || seriesId == null || seriesId.trim() == "") {
        alert("error");
    } else {
        let seriesEntity;
        for (let index = 0; index < GLOBAL_PRODUCT_ENTITIES.length; index++) {
            if (seriesId == GLOBAL_PRODUCT_ENTITIES[index].seriesId) {
                seriesEntity = GLOBAL_PRODUCT_ENTITIES[index]
                break;
            }
        }
        showSeries(seriesEntity);
    }
}

/**
 * 修改系列名称状态
 * @param rootView 跟对象
 * @param seriesRootView 系列跟对象
 * @param containerView 编辑框跟对象
 * @param seriesEntity 数据体
 */
function onSeriesNameClick(rootView,seriesRootView,containerView, seriesEntity) {
    containerView.innerHTML = null;
    let seriesNameInputView = document.createElement("input");
    seriesNameInputView.value = seriesEntity.label;
    seriesNameInputView.className = "SS_IC_LABEL";
    seriesNameInputView.style.height = "28px";
    seriesNameInputView.onblur = function () {
        onSeriesNameBlur(containerView, seriesEntity,seriesNameInputView.value);
    };
    containerView.appendChild(seriesNameInputView);

    let seriesNameBlockView = document.createElement("div");
    seriesNameBlockView.innerHTML = "禁用";
    seriesNameBlockView.className = "B_B_D";
    seriesNameBlockView.onclick = function () {
        onSeriesNameBlur(containerView, seriesEntity);
    };
    containerView.appendChild(seriesNameBlockView);

    let seriesNameDeleteView = document.createElement("div");
    seriesNameDeleteView.innerHTML = "删除";
    seriesNameDeleteView.className = "B_B_D";
    seriesNameDeleteView.onclick = function () {
        deleteSeries(rootView,seriesRootView,seriesEntity.seriesId);
    };
    containerView.appendChild(seriesNameDeleteView);
}

function onSeriesNameBlur(containerView, seriesEntity,newValue) {
    containerView.innerHTML = null;
    //系列显示框
    let seriesItemLabelView = document.createElement("div");
    seriesItemLabelView.className = "SS_IC_LABEL";
    seriesItemLabelView.innerHTML = newValue;
    seriesItemLabelView.ondblclick = function () {
        onSeriesNameClick(containerView, seriesEntity);
    };
    containerView.appendChild(seriesItemLabelView);

    if (newValue != undefined && newValue != null && newValue.trim() != "" && seriesEntity.label != newValue){
        renameSeries(seriesEntity.seriesId,newValue);
    }
}