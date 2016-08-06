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
let G_SERIES_ENTITIES;
/**
 * 请求产品列表
 */
function productSeries() {
    var indexUrl = BASE_PATH + "/product";
    asyncRequestByGet(indexUrl, onSeriesDataCallBack, onRequestError(), onRequestTimeout());
}

/**
 * 请求系列列表
 */
function productType() {
    var indexUrl = BASE_PATH + "/product/retrieveSeries?seriesId=40b67c21-edf2-417a-b82b-b63ca22273a9&managerId=xxx";
    asyncRequestByGet(indexUrl, onTypeDataCallBack, onRequestError(), onRequestTimeout());
}

/**
 * 处理产品数据
 * @param data 服务器返回的数据
 */
function onSeriesDataCallBack(data) {
    var result = checkResponsDataFormat(data);
    if (result) {
        var parseData = JSON.parse(data);
        G_SERIES_ENTITIES = parseData.data;
        initSeriesListView(document.getElementById(MAIN_CONTENT_ID), G_SERIES_ENTITIES);
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
        initSeriesItemView(containerView, seriesEntities[index], false);
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
 * @param isSeries 标示是不是产品总览列表
 */
function initSeriesItemView(containerView, seriesEntity, isSeries) {
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
    seriesItemLabelView.seriesId = seriesEntity.seriesId;
    if (!isSeries) {
        // 如果不是单个系列的展示则给元素添加点击事件
        seriesItemLabelView.ondblclick = onSeriesTypeFormatBoxDoubleClick;
    }
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
        typeItemLabelView.seriesId = seriesEntity.seriesId;

        if (!isSeries) {
            typeFormatViewContainer.appendChild(typeItemLabelView);
            // 如果不是单个系列的展示则给元素添加点击事件
            typeItemLabelView.ondblclick = onSeriesTypeFormatBoxDoubleClick;
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
                    formatLabel.seriesId = seriesEntity.seriesId;
                    formatLabel.ondblclick = onSeriesTypeFormatBoxDoubleClick;
                    formatContainer.appendChild(formatLabel);
                }
            }
            containerView.appendChild(typeFormatViewContainer);
        } else {
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
                formatViewContainer.ondblclick = initSeriesEditor;
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
                        if (!isSeries) {
                            formatLabel.ondblclick = onSeriesTypeFormatBoxDoubleClick;
                        }
                        formatContainer.appendChild(formatLabel);
                    }
                } else {
                    formatContainer.innerHTML = "编辑规格";
                    formatContainer.className = "managerItem_save";
                    formatContainer.onclick = initSeriesEditor;
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

    //系列分割匡
    let seriesItemSpaceView = document.createElement("div");
    seriesItemSpaceView.className = "SS_IC_SUB";
    seriesItemSpaceView.style.height = "20px";
    containerView.appendChild(seriesItemSpaceView);
}

/**
 * 产品列表文本显示区域的双击事件
 */
function onSeriesTypeFormatBoxDoubleClick() {
    resetView();
    let backView = document.createElement("div");
    backView.innerHTML = "返回";
    backView.className = "horizontalNormal";
    backView.style.width = "4%";
    backView.onclick = function () {
        productSeries();
    };
    document.getElementById(MAIN_TITLE_ID).appendChild(backView);
    let titleView = document.createElement("div");
    titleView.innerHTML = "产品系列";
    titleView.className = "horizontalSelected";
    titleView.style.width = "95.6%";
    document.getElementById(MAIN_TITLE_ID).appendChild(titleView);
    let currentSeriesEntity;
    for (let index = 0; index < G_SERIES_ENTITIES.length; index++) {
        if (this.seriesId == G_SERIES_ENTITIES[index].seriesId) {
            currentSeriesEntity = G_SERIES_ENTITIES[index]
            break;
        }
    }
    currentSeriesEntity.children.push(JSON.parse("{\"typeId\":\"" + APP_CONST_ADD_NEW + "\",\"label\":\"添加新类型\"}"));
    initSeriesItemView(document.getElementById(MAIN_CONTENT_ID), currentSeriesEntity, true);
}

function initSeriesEditor() {
    let currentSeriesEntity;
    let currentTypeEntity;
    for (let index = 0; index < G_SERIES_ENTITIES.length; index++) {
        if (this.seriesId == G_SERIES_ENTITIES[index].seriesId) {
            currentSeriesEntity = G_SERIES_ENTITIES[index];
            let size = currentSeriesEntity.children == undefined ? 0 : currentSeriesEntity.children.length;
            for (let i = 0; i < size; i++) {
                if (this.typeId == currentSeriesEntity.children[i].typeId){
                    currentTypeEntity = currentSeriesEntity.children[i];
                    break;
                }
            }
            break;
        }
    }

    resetView();
    let backView = document.createElement("div");
    backView.innerHTML = "返回";
    backView.className = "horizontalNormal";
    backView.style.width = "4%";
    backView.onclick = function () {

    };
    document.getElementById(MAIN_TITLE_ID).appendChild(backView);
    let titleView = document.createElement("div");
    titleView.innerHTML = currentSeriesEntity.label + " >> " + currentTypeEntity.label;
    titleView.className = "horizontalSelected";
    titleView.style.width = "95.6%";
    document.getElementById(MAIN_TITLE_ID).appendChild(titleView);

    initTypeEditorView();
}

function onTypeDataCallBack(data){
    resetView();
    let backView = document.createElement("div");
    backView.innerHTML = "返回";
    backView.className = "horizontalNormal";
    backView.style.width = "4%";
    backView.onclick = function () {

    };
    document.getElementById(MAIN_TITLE_ID).appendChild(backView);
    let titleView = document.createElement("div");
    titleView.innerHTML = "当前系列 >> 当前类型";
    titleView.className = "horizontalSelected";
    titleView.style.width = "95.6%";
    document.getElementById(MAIN_TITLE_ID).appendChild(titleView);
    console.log(data);

    initTypeEditorView();
}


function initTypeEditorView() {
    let topContainer = document.createElement("div")
    topContainer.style.width = "100%";
    topContainer.style.height = "450px";
    let imageViewContainer = document.createElement("div")
    imageViewContainer.style.float = "left";
    imageViewContainer.style.width = "25%";
    imageViewContainer.style.height = "100%";
    let imageCanvas = document.createElement("canvas")
    imageCanvas.style.cursor = "move";
    imageCanvas.style.width = "100%";
    imageCanvas.style.height = "300px";
    imageCanvas.style.backgroundColor = "#CCCCCC";
    imageViewContainer.appendChild(imageCanvas);
    let imageCanvasOperator = document.createElement("button");
    imageCanvasOperator.style.cursor = "pointer";
    imageCanvasOperator.style.width = "100%";
    imageCanvasOperator.style.height = "40px";
    imageCanvasOperator.innerHTML = "保存修改";
    imageCanvasOperator.style.backgroundColor = "#169BD5";
    imageCanvasOperator.style.color = "#FFFFFF";
    imageCanvasOperator.style.borderWidth = "0px";
    imageCanvasOperator.style.fontSize = "1rem";
    imageViewContainer.appendChild(imageCanvasOperator);
    let imageCanvasFileContainer = document.createElement("div");
    imageCanvasFileContainer.style.width = "100%";
    imageCanvasFileContainer.style.height = "105px";
    imageCanvasFileContainer.style.backgroundColor = "red";

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

    imageCanvasFileContainer.appendChild(fileButton1);
    imageCanvasFileContainer.appendChild(fileButton2);
    imageCanvasFileContainer.appendChild(fileButton3);
    imageViewContainer.appendChild(imageCanvasFileContainer);
    topContainer.appendChild(imageViewContainer);

    let editorContainer = document.createElement("div")
    editorContainer.style.float = "left";
    editorContainer.style.width = "75%";
    editorContainer.style.height = "100%";
    let editorContainerTop = document.createElement("textarea")
    editorContainerTop.style.width = "100%";
    editorContainerTop.style.fontSize = "1rem";
    editorContainerTop.style.color = "#666666";
    editorContainerTop.style.resize = "none";
    editorContainerTop.style.margin = "0px";
    editorContainerTop.style.borderWidth = "1px";
    editorContainerTop.style.height = "150px";
    editorContainer.appendChild(editorContainerTop);
    let editorContainerBottom = document.createElement("div")
    editorContainerBottom.style.width = "100%";
    editorContainerBottom.style.height = "290px";
    editorContainerBottom.style.backgroundColor = "yellow";
    editorContainer.appendChild(editorContainerBottom);

    topContainer.appendChild(editorContainer);
    document.getElementById(MAIN_CONTENT_ID).appendChild(topContainer);

    let bottomContainer = document.createElement("div")
    bottomContainer.style.width = "100%";
    bottomContainer.style.height = "400px";
    bottomContainer.style.marginTop = "20px";
    bottomContainer.style.backgroundColor = "blue";
    document.getElementById(MAIN_CONTENT_ID).appendChild(bottomContainer);

    let linkContainer = document.createElement("div")
    linkContainer.style.width = "100%";
    linkContainer.style.height = "50px";
    linkContainer.style.marginTop = "20px";
    linkContainer.style.backgroundColor = "green";
    document.getElementById(MAIN_CONTENT_ID).appendChild(linkContainer);

    let submitContainer = document.createElement("div")
    submitContainer.style.width = "100%";
    submitContainer.style.height = "50px";
    submitContainer.style.marginTop = "20px";
    submitContainer.style.marginBottom = "20px";
    submitContainer.style.backgroundColor = "red";
    document.getElementById(MAIN_CONTENT_ID).appendChild(submitContainer);


}
