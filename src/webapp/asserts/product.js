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
 * 处理产品数据
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
    let seriesEntitiesSize = productEntities.length;
    for (let index = 0; index < seriesEntitiesSize; index++) {
        initProductItemView(contentViewContainer, productEntities[index]);
    }

    //添加新系列的按钮
    let addNewSeriesView = document.createElement("button");
    addNewSeriesView.className = "managerItem_save";
    addNewSeriesView.innerHTML = "添加新系列";
    contentViewContainer.appendChild(addNewSeriesView);
    addNewSeriesView.onclick = function () {

    };
}

/**
 * 显示单个的产品数据到界面
 * @param containerView 容器对象
 * @param productEntity 产品数据
 */
function initProductItemView(containerView, productEntity) {
    //系列容器对象
    let seriesItemViewContainer = document.createElement("div");
    seriesItemViewContainer.className = "SS_IC_SUB";
    //系列连接线横线
    let seriesItemViewConnectorLine_H = document.createElement("hr");
    seriesItemViewConnectorLine_H.className = "SS_IC_HL";
    seriesItemViewContainer.appendChild(seriesItemViewConnectorLine_H);
    //系列连接线纵线
    let seriesItemViewConnectorLine_V = document.createElement("hr");
    seriesItemViewConnectorLine_V.className = "SS_IC_VL";
    seriesItemViewContainer.appendChild(seriesItemViewConnectorLine_V);

    //系列显示框
    let seriesItemLabelView = document.createElement("div");
    seriesItemLabelView.className = "SS_IC_R";
    seriesItemLabelView.innerHTML = productEntity.label;
    seriesItemLabelView.ondblclick = function () {
        onSeriesNameClick();
    };
    seriesItemViewContainer.appendChild(seriesItemLabelView);
    containerView.appendChild(seriesItemViewContainer);

    //判断是否是有类型
    let typeEntitiesSize = productEntity.children.length;
    for (let i = 0; i < typeEntitiesSize; i++) {
        let typeEntity = productEntity.children[i];
        //类型-规格容器对象
        let typeFormatViewContainer = document.createElement("div");
        typeFormatViewContainer.className = "SS_IC_SUB";
        //类型连接线纵线
        let typeItemViewConnectorLine_V = document.createElement("hr");
        typeItemViewConnectorLine_V.className = "SS_IC_VL";
        typeItemViewConnectorLine_V.style.marginLeft = "20px";
        typeFormatViewContainer.appendChild(typeItemViewConnectorLine_V);
        //类型连接线横线
        let typeItemViewConnectorLine_H = document.createElement("hr");
        typeItemViewConnectorLine_H.className = "SS_IC_HL";
        typeFormatViewContainer.appendChild(typeItemViewConnectorLine_H);

        //类型显示框
        let typeItemLabelView = document.createElement("div");
        typeItemLabelView.className = "SS_IC_R";
        typeItemLabelView.style.borderLeftWidth = "1px";
        typeItemLabelView.innerHTML = typeEntity.label;
        typeFormatViewContainer.appendChild(typeItemLabelView);
        typeItemLabelView.ondblclick = function () {
            onSeriesItemClick(productEntity.seriesId);
        };
        let formatEntitiesSize = (typeEntity.children == undefined ? 0 : typeEntity.children.length);
        if (formatEntitiesSize > 0) {
            //规格显示框的横向连接线
            let formatItemViewConnectorLine_H = document.createElement("hr");
            formatItemViewConnectorLine_H.className = "SS_IC_HL";
            typeFormatViewContainer.appendChild(formatItemViewConnectorLine_H);

            //类型规格框
            let formatContainer = document.createElement("div");
            formatContainer.className = "SS_IC_R";
            formatContainer.style.width = 50 * formatEntitiesSize + "px";
            formatContainer.style.textAlign = "left";
            formatContainer.style.borderLeftWidth = "1px";
            typeFormatViewContainer.appendChild(formatContainer);
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
        containerView.appendChild(typeFormatViewContainer);
    }

    //系列分割匡
    let seriesItemSpaceView = document.createElement("div");
    seriesItemSpaceView.className = "SS_IC_SUB";
    seriesItemSpaceView.style.height = "20px";
    containerView.appendChild(seriesItemSpaceView);
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
 */
function onSeriesNameClick() {
    alert("此处的双击事件修改系列名称/状态");
}