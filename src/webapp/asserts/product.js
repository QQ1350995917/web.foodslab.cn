/**
 * Created by dingpengwei on 8/3/16.
 */
class SeriesEntity {
    constructor(seriesId, label, description, queue, status, typeEntities) {
        this.seriesId = seriesId;
        this.label = label;
        this.description = description;
        this.queue = queue;
        this.status = status;
        this.typeEntities = typeEntities;
    }
}

/**
 * 请求产品列表
 */
function productSeries() {
    var indexUrl = BASE_PATH + "/product";
    asyncRequestByGet(indexUrl, onSeriesDataCallBack, onRequestError(), onRequestTimeout());
}

/**
 * 处理产品数据
 * @param data 服务器返回的数据
 */
function onSeriesDataCallBack(data) {
    var result = checkResponsDataFormat(data);
    if (result) {
        var parseData = JSON.parse(data);
        var seriesEntities = parseData.data;
        initSeriesListView(document.getElementById(MAIN_CONTENT_ID), seriesEntities);
    }
}

/**
 * 根据系列数据集合构建数据列表图形界面
 * @param containerView 容器对象
 * @param seriesEntities 数据对象
 */
function initSeriesListView(containerView, seriesEntities) {
    resetView();
    let titleView = document.createElement("div");
    titleView.innerHTML = "产品总览";
    titleView.className = "horizontalSelected";
    titleView.style.width = "100%";
    document.getElementById(MAIN_TITLE_ID).appendChild(titleView);
    let seriesEntitiesSize = seriesEntities.length;
    for (let index = 0; index < seriesEntitiesSize; index++) {
        initSeriesItemView(containerView, seriesEntities[index]);
    }

    let element = document.createElement("button");
    element.className = "managerItem_save";
    element.innerHTML = "添加新系列";
    containerView.appendChild(element);
    element.onclick = function () {
        // seriesEntities.push(new SeriesEntity(APP_CONST_CLIENT_ID, "default", 1,1,"", new Array()));
        // initManagerList(containerView, seriesEntities);
    };
}

/**
 * 根据系列数据构建数据图形界面
 * @param containerView 系列对象父容器
 * @param seriesEntity 系列数据对象
 */
function initSeriesItemView(containerView, seriesEntity) {
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
    seriesItemViewContainer.appendChild(seriesItemLabelView);
    containerView.appendChild(seriesItemViewContainer);


    //判断是否是有类型
    let typeEntitiesSize = seriesEntity.typeEntities.length;
    for (let i = 0; i < typeEntitiesSize; i++) {
        //类型容器对象
        let typeItemViewContainer = document.createElement("div");
        typeItemViewContainer.className = "SS_IC_SUB";
        //类型连接线纵线
        let typeItemViewConnectorLine_V = document.createElement("hr");
        typeItemViewConnectorLine_V.className = "SS_IC_VL";
        typeItemViewConnectorLine_V.style.marginLeft = "20px";
        typeItemViewContainer.appendChild(typeItemViewConnectorLine_V);
        //类型连接线横线
        let typeItemViewConnectorLine_H = document.createElement("hr");
        typeItemViewConnectorLine_H.className = "SS_IC_HL";
        typeItemViewContainer.appendChild(typeItemViewConnectorLine_H);
        //类型连接线纵线
        let typeItemViewConnectorLine_V2 = document.createElement("hr");
        typeItemViewConnectorLine_V2.className = "SS_IC_VL";
        typeItemViewConnectorLine_V2.style.height = "32px";
        typeItemViewContainer.appendChild(typeItemViewConnectorLine_V2);

        //类型显示框
        let typeItemLabelView = document.createElement("div");
        typeItemLabelView.className = "SS_IC_R";
        typeItemLabelView.innerHTML = seriesEntity.typeEntities[i].label;
        typeItemViewContainer.appendChild(typeItemLabelView);
        containerView.appendChild(typeItemViewContainer);
    }

    //系列分割匡
    let seriesItemSpaceView = document.createElement("div");
    seriesItemSpaceView.className = "SS_IC_SUB";
    seriesItemSpaceView.style.height = "20px";
    containerView.appendChild(seriesItemSpaceView);
}
