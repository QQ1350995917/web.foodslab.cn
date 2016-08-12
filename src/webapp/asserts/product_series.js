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
        seriesEntity.children.push(JSON.parse("{\"typeId\":\"" + APP_CONST_ADD_NEW + "\",\"label\":\"添加新类型\"}"));
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
    seriesItemLabelView.innerHTML = seriesEntity.label;
    seriesItemLabelView.ondblclick = function () {
        backToProduct();
    };
    seriesItemViewContainer.appendChild(seriesItemLabelView);
    containerView.appendChild(seriesItemViewContainer);

    //判断是否是有类型
    let typeEntitiesSize = seriesEntity.children.length;
    for (let i = 0; i < typeEntitiesSize; i++) {
        let typeEntity = seriesEntity.children[i];
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
        typeItemLabelView.ondblclick = function () {
            onTypeNameClick(typeEntity.typeId);
        };

        if (typeEntity.typeId == APP_CONST_ADD_NEW) {
            // 添加新类型
            typeItemLabelView.className = "managerItem_save"
            typeItemLabelView.seriesId = seriesEntity.seriesId;
            typeItemLabelView.typeId = typeEntity.typeId;
            containerView.appendChild(typeItemLabelView);
        } else {
            containerView.appendChild(typeFormatViewContainer);
            //类型连接线纵线
            let formatItemViewConnectorLine_V = document.createElement("hr");
            formatItemViewConnectorLine_V.className = "SS_IC_VL";
            typeFormatViewContainer.appendChild(formatItemViewConnectorLine_V);
            typeItemLabelView.style.borderLeftWidth = "0px";
            typeFormatViewContainer.appendChild(typeItemLabelView);

            let formatViewContainer = document.createElement("div");
            formatViewContainer.className = "SS_IC_SUB";
            //规格连接线纵线
            let formatItemViewConnectorLine_V1 = document.createElement("hr");
            formatItemViewConnectorLine_V1.className = "SS_IC_VL";
            formatItemViewConnectorLine_V1.style.marginLeft = "20px";
            formatViewContainer.appendChild(formatItemViewConnectorLine_V1);

            let formatItemViewConnectorLine_V2 = document.createElement("hr");
            formatItemViewConnectorLine_V2.className = "SS_IC_VL";
            formatItemViewConnectorLine_V2.style.marginLeft = "20px";
            formatViewContainer.appendChild(formatItemViewConnectorLine_V2);

            //规格连接线横线
            let formatItemViewConnectorLine_H = document.createElement("hr");
            formatItemViewConnectorLine_H.className = "SS_IC_HL";
            formatItemViewConnectorLine_H.style.marginLeft = "0px";
            formatViewContainer.appendChild(formatItemViewConnectorLine_H);

            //规格框
            let formatContainer = document.createElement("div");
            formatContainer.className = "SS_IC_R";
            formatContainer.style.borderLeftWidth = "1px";
            formatViewContainer.appendChild(formatContainer);
            formatViewContainer.ondblclick = function () {

            };
            formatViewContainer.typeId = typeEntity.typeId;
            formatViewContainer.seriesId = seriesEntity.seriesId;
            let formatEntitiesSize = (typeEntity.children == undefined ? 0 : typeEntity.children.length);

            if (formatEntitiesSize > 0) {
                formatContainer.style.width = 50 * formatEntitiesSize + "px";
                for (let j = 0; j < formatEntitiesSize; j++) {
                    let formatLabel = document.createElement("label");
                    formatLabel.style.width = "50px";
                    formatLabel.style.display = "inline-block";
                    let formatEntity = typeEntity.children[j];
                    formatLabel.innerHTML = formatEntity.label + formatEntity.meta;
                    formatLabel.seriesId = seriesEntity.seriesId;
                    formatLabel.ondblclick = function () {
                        onTypeItemClick(typeEntity);
                    };
                    formatContainer.appendChild(formatLabel);
                }
            } else {
                formatContainer.innerHTML = "编辑规格";
                formatContainer.className = "managerItem_save";
                formatContainer.onclick = function () {

                };
            }
            containerView.appendChild(formatViewContainer);

            //系列分割匡
            let seriesItemSpaceView1 = document.createElement("div");
            seriesItemSpaceView1.className = "SS_IC_SUB";
            seriesItemSpaceView1.style.height = "20px";
            //类型连接线纵线
            let formatItemViewConnectorLine_V5 = document.createElement("hr");
            formatItemViewConnectorLine_V5.className = "SS_IC_VL";
            formatItemViewConnectorLine_V5.style.marginLeft = "20px";
            seriesItemSpaceView1.appendChild(formatItemViewConnectorLine_V5);
            containerView.appendChild(seriesItemSpaceView1);
        }
    }
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