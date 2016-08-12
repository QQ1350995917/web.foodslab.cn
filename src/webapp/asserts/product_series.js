/**
 * Created by dingpengwei on 8/12/16.
 */

/**
 * 请求系列列表
 */

function productType() {
    var indexUrl = BASE_PATH + "/product/retrieveType?typeId=aba4d190-6874-426a-883f-a1e561a6f879&managerId=xxx";
    asyncRequestByGet(indexUrl, onTypeDataCallBack, onRequestError(), onRequestTimeout());
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

    let lastTypeEntities = seriesEntity.children;
    if (lastTypeEntities == undefined || lastTypeEntities.length == 0) {
        // seriesEntity.children.push(JSON.parse("{\"typeId\":\"" + APP_CONST_ADD_NEW + "\",\"label\":\"添加新类型\"}"));
    } else {
        if (lastTypeEntities[lastTypeEntities.length - 1].typeId != APP_CONST_ADD_NEW) {
            seriesEntity.children.push(JSON.parse("{\"typeId\":\"" + APP_CONST_ADD_NEW + "\",\"label\":\"添加新类型\"}"));
        }
    }

    initSeriesView(contentViewContainer, seriesEntity)
}

/**
 * 返回事件
 */
function backToProduct() {
    CURRENT_SERIES_ENTITY = null;
    productSeries();
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
    seriesLabel.innerHTML = seriesEntity.label;
    seriesLabel.onclick = function () {
        backToProduct();
    };
    converterViewContainer.appendChild(seriesLabel);
    seriesSubRootViewContainer.appendChild(converterViewContainer);
    let clearFloat = document.createElement("div");
    clearFloat.className = "clearFloat";
    seriesSubRootViewContainer.appendChild(clearFloat);

    //判断是否是有类型
    let typeEntitiesSize = (seriesEntity == undefined || seriesEntity.children == undefined) ? 0 : seriesEntity.children.length;
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
        typeItemLabelView.innerHTML = "添加类型";
        typeItemLabelView.onclick = function () {
            
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
 * 修改类型名称状态
 */
function onTypeNameClick(typeId) {
    alert("此处的双击事件修改型号名称/状态");
}

/**
 * 规格的点击事件
 */
function onTypeItemClick(typeEntity) {
    showType(typeEntity);
}