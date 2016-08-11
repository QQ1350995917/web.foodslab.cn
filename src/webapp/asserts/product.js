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
class FormatBaseViewInfo {
    constructor(title, labelId, label, unitId, unitLabel, isSelector) {
        this.title = title;
        this.labelId = labelId;
        this.label = label;
        this.unitId = unitId;
        this.unitLabel = unitLabel;
        this.isSelector = isSelector;
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
    var indexUrl = BASE_PATH + "/product/retrieveType?typeId=aba4d190-6874-426a-883f-a1e561a6f879&managerId=xxx";
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
                if (this.typeId == currentSeriesEntity.children[i].typeId) {
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

function onTypeDataCallBack(data) {
    var result = checkResponsDataFormat(data);
    var parseData = JSON.parse(data);
    var dataJson = parseData.data;

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

    initTypeEditorView(dataJson);
}


function initTypeEditorView(typeEntity) {
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
    descriptionTextArea.className = "descriptionTextArea";
    textContainer.appendChild(descriptionTextArea);

    let formatArea = document.createElement("div")
    formatArea.className = "formatArea";
    textContainer.appendChild(formatArea);
    descriptionContainer.appendChild(textContainer);

    initFormatView(formatArea, typeEntity.children);
    document.getElementById(MAIN_CONTENT_ID).appendChild(descriptionContainer);

    let detailDescriptionContainer = document.createElement("div")
    detailDescriptionContainer.className = "detailDescriptionContainer";
    initDetailEditor(detailDescriptionContainer, typeEntity);
    document.getElementById(MAIN_CONTENT_ID).appendChild(detailDescriptionContainer);

    let submitContainer = document.createElement("div")
    submitContainer.className = "submitContainer";
    submitContainer.innerHTML = "提交";
    submitContainer.onclick = function () {
        let text = document.createTextNode(document.getElementById("hyperEditor").innerHTML);
    };
    document.getElementById(MAIN_CONTENT_ID).appendChild(submitContainer);
}

/**
 * 规格显示区域
 * @param containerView
 * @param formatEntities
 */
function initFormatView(containerView, formatEntities) {
    let formatTitleBar = document.createElement("div");
    formatTitleBar.className = "formatSubItemBar";
    formatTitleBar.style.height = "45px";
    let formatMainBar = document.createElement("div");
    formatMainBar.id = "formatMainBar";
    formatMainBar.className = "formatSubItemBar";
    let formatDiscountBar = document.createElement("div");
    formatDiscountBar.id = "formatDiscountBar";
    formatDiscountBar.className = "formatSubItemBar";
    let formatPostBar = document.createElement("div");
    formatPostBar.id = "formatPostBar";
    formatPostBar.className = "formatSubItemBar";
    let formatGiftBar = document.createElement("div");
    formatGiftBar.id = "formatGiftBar";
    formatGiftBar.className = "formatSubItemBar";
    let formatDisplayBar = document.createElement("div");
    formatDisplayBar.className = "formatSubItemBar";
    formatDisplayBar.style.height = "97px";
    let formatDisplayLeftBar = document.createElement("div");
    formatDisplayLeftBar.className = "formatDisplayLeftBar";
    let formatDisplayRightBar = document.createElement("div");
    formatDisplayRightBar.className = "formatDisplayRightBar";
    formatDisplayRightBar.innerHTML = "保存";
    formatDisplayRightBar.onclick = function () {
        saveFormat();
    }
    formatDisplayBar.appendChild(formatDisplayLeftBar);
    formatDisplayBar.appendChild(formatDisplayRightBar);

    let formatDisplayDiscountBar = document.createElement("div");
    let formatDisplayPostBar = document.createElement("div");
    let formatDisplayGiftBar = document.createElement("div");

    formatDisplayLeftBar.appendChild(formatDisplayDiscountBar);
    formatDisplayLeftBar.appendChild(formatDisplayPostBar);
    formatDisplayLeftBar.appendChild(formatDisplayGiftBar);

    containerView.appendChild(formatTitleBar);
    containerView.appendChild(formatMainBar);
    containerView.appendChild(formatDiscountBar);
    containerView.appendChild(formatPostBar);
    containerView.appendChild(formatGiftBar);
    containerView.appendChild(formatDisplayBar);


    var horizontalTabItems = new Array();
    for (let index = 0; index < formatEntities.length; index++) {
        let formatEntity = formatEntities[index];
        if (index == 0) {
            let tabItem = new TabItem(formatEntity.formatId, formatEntity.label + formatEntity.meta, APP_CONST_ADD_NEW, "horizontalNormal", "horizontalSelected", "horizontalSelected");
            tabItem.formatEntity = formatEntity;
            horizontalTabItems.push(tabItem);
        } else {
            let tabItem = new TabItem(formatEntity.formatId, formatEntity.label + formatEntity.meta, APP_CONST_ADD_NEW, "horizontalNormal", "horizontalSelected", "horizontalNormal");
            tabItem.formatEntity = formatEntity;
            horizontalTabItems.push(tabItem);
        }
    }

    horizontalTabItems.push(new TabItem(APP_CONST_ADD_NEW, "+", APP_CONST_ADD_NEW, "horizontalNormal", "horizontalSelected", "horizontalNormal"));

    initFormatSubView_title(formatTitleBar, horizontalTabItems);
    initFormatSubView_main(formatMainBar, formatEntities[0]);
    initFormatSubView_discount(formatDiscountBar, formatEntities[0]);
    initFormatSubView_post(formatPostBar, formatEntities[0]);
    initFormatSubView_gift(formatGiftBar, formatEntities[0]);
}

/**
 * 规格标题
 * @param container
 * @param tabItems
 */
function initFormatSubView_title(container, tabItems) {
    container.innerHTML = null;
    initHorizontalTabHostView(container, tabItems, (780 - tabItems.length * 2) / tabItems.length, false, function () {
        let id = this.dataId;
        let currentFormatEntity;
        if (id == APP_CONST_ADD_NEW) {
            let isHasAddNew = false;
            for (let index = 0; index < tabItems.length; index++) {
                if (tabItems[index].id == APP_CONST_CLIENT_ID) {
                    isHasAddNew = true;
                    tabItems[index].currentClassName = tabItems[index].selectedClassName;
                    new Toast().show("请先保存新规格");
                } else {
                    tabItems[index].currentClassName = tabItems[index].normalClassName;
                }
            }
            if (!isHasAddNew) {
                tabItems.splice(tabItems.length - 1, 0, new TabItem(APP_CONST_CLIENT_ID, "新规格", APP_CONST_ADD_NEW, "horizontalNormal", "horizontalSelected", "horizontalSelected"));
            }
        } else {
            for (let index = 0; index < tabItems.length; index++) {
                if (tabItems[index].id == id) {
                    tabItems[index].currentClassName = tabItems[index].selectedClassName;
                    currentFormatEntity = tabItems[index].formatEntity;
                } else {
                    tabItems[index].currentClassName = tabItems[index].normalClassName;
                }
            }
        }

        initFormatSubView_title(container, tabItems);

        initFormatSubView_main(document.getElementById("formatMainBar"), currentFormatEntity);
        initFormatSubView_discount(document.getElementById("formatDiscountBar"), currentFormatEntity);
        initFormatSubView_post(document.getElementById("formatPostBar"), currentFormatEntity);
        initFormatSubView_gift(document.getElementById("formatGiftBar"), currentFormatEntity);

    });
}

/**
 * 规格主要信息
 * @param container
 */
function initFormatSubView_main(container, formatEntity) {
    container.innerHTML = null;
    let display = document.createElement("input");
    display.setAttribute("type", "checkbox");
    display.className = "formatDisplayCheckBox";
    display.id = "vid_format_status";
    if (formatEntity == undefined) {
        display.checked = false;
    } else {
        if (formatEntity.status == 0) {
            display.checked = false;
        } else if (formatEntity.status == 1) {
            display.checked = true;
        }
    }
    container.appendChild(display);
    let formatBaseViewInfo1 = new FormatBaseViewInfo("规格", "vid_format_label", formatEntity == undefined ? "" : formatEntity.label, "vid_format_label_unit", formatEntity == undefined ? "" : formatEntity.meta, true);
    let formatBaseViewInfo2 = new FormatBaseViewInfo("数量", "vid_format_mount", formatEntity == undefined ? "" : formatEntity.amount, "vid_format_mount_unit", formatEntity == undefined ? "" : formatEntity.amountMeta, true);
    let formatBaseViewInfo3 = new FormatBaseViewInfo("定价", "vid_format_pricing", formatEntity == undefined ? "" : formatEntity.pricing, "vid_format_pricing_unit", formatEntity == undefined ? "" : formatEntity.pricingMeta, true);
    let formatBaseViewInfo4 = new FormatBaseViewInfo("邮费", "vid_format_postage", formatEntity == undefined ? "" : formatEntity.postage, "vid_format_postage_unit", formatEntity == undefined ? "" : formatEntity.postageMeta, true);
    let baseInfo = new Array();
    baseInfo.push(formatBaseViewInfo1);
    baseInfo.push(formatBaseViewInfo2);
    baseInfo.push(formatBaseViewInfo3);
    baseInfo.push(formatBaseViewInfo4);
    let unitIndex = new Array();
    unitIndex.push(formatEntity == undefined ? undefined : formatEntity.meta);
    unitIndex.push(formatEntity == undefined ? undefined : formatEntity.amountMeta);
    unitIndex.push(formatEntity == undefined ? undefined : formatEntity.pricingMeta);
    unitIndex.push(formatEntity == undefined ? undefined : formatEntity.postageMeta);

    for (let index = 0; index < 4; index++) {
        createInputSelectWidget(container, baseInfo[index], unitIndex[index]);
    }
    let formatDelete = document.createElement("div");
    formatDelete.className = "formatDisplayDelete";
    formatDelete.innerHTML = "X";
    container.appendChild(formatDelete);
}

/**
 * 折扣信息
 * @param container
 */
function initFormatSubView_discount(container, formatEntity) {
    container.innerHTML = null;
    let display = document.createElement("input");
    display.setAttribute("type", "checkbox");
    display.className = "formatDisplayCheckBox";
    display.id = "vid_format_priceStatus";
    if (formatEntity == undefined) {
        display.checked = false;
    } else {
        if (formatEntity.priceStatus == 0) {
            display.checked = false;
        } else if (formatEntity.priceStatus == 1) {
            display.checked = true;
        }
    }
    container.appendChild(display);
    let formatBaseViewInfo1 = new FormatBaseViewInfo("折扣", "vid_format_priceDiscount", formatEntity == undefined ? "" : formatEntity.priceDiscount, "vid_spaceholder", formatEntity == undefined ? "" : formatEntity.meta, false);
    let formatBaseViewInfo2 = new FormatBaseViewInfo("现价", "vid_format_price", formatEntity == undefined ? "" : formatEntity.price, "vid_spaceholder", formatEntity == undefined ? "" : formatEntity.meta, false);
    let baseInfo = new Array();
    baseInfo.push(formatBaseViewInfo1);
    baseInfo.push(formatBaseViewInfo2);
    for (let index = 0; index < 2; index++) {
        createInputSelectWidget(container, baseInfo[index]);
    }
    createFormatDatePickerWidget(container, "vid_format_discount_startTime",formatEntity.priceStart);
    createFormatDatePickerWidget(container, "vid_format_discount_endTime",formatEntity.priceEnd);
}


/**
 * 邮寄信息
 * @param container
 */
function initFormatSubView_post(container, formatEntity) {
    container.innerHTML = null;
    let display = document.createElement("input");
    display.setAttribute("type", "checkbox");
    display.className = "formatDisplayCheckBox";
    display.id = "vid_format_expressStatus";
    if (formatEntity == undefined) {
        display.checked = false;
    } else {
        if (formatEntity.expressStatus == 0) {
            display.checked = false;
        } else if (formatEntity.expressStatus == 1) {
            display.checked = true;
        }
    }
    container.appendChild(display);
    let formatBaseViewInfo1 = new FormatBaseViewInfo("包邮", "vid_format_expressCount", formatEntity == undefined ? "" : formatEntity.expressCount, "vid_spaceholder", formatEntity == undefined ? "" : formatEntity.meta, false);
    createInputSelectWidget(container, formatBaseViewInfo1);
    createFormatSelectWidget(container, "vid_format_express", EXPRESS, formatEntity == undefined ? undefined : formatEntity.expressName, "请选择快递公司");
    createFormatDatePickerWidget(container, "vid_format_express_startTime",formatEntity.expressStart);
    createFormatDatePickerWidget(container, "vid_format_express_endTime",formatEntity.expressEnd);
}

/**
 * 满赠信息
 * @param container
 */
function initFormatSubView_gift(container, formatEntity) {
    container.innerHTML = null;
    let display = document.createElement("input");
    display.setAttribute("type", "checkbox");
    display.className = "formatDisplayCheckBox";
    display.id = "vid_format_giftStatus";
    if (formatEntity == undefined) {
        display.checked = false;
    } else {
        if (formatEntity.giftStatus == 0) {
            display.checked = false;
        } else if (formatEntity.giftStatus == 1) {
            display.checked = true;
        }
    }
    container.appendChild(display);
    let formatBaseViewInfo1 = new FormatBaseViewInfo("满赠", "vid_format_giftCount", formatEntity == undefined ? "" : formatEntity.giftCount, "vid_spaceholder", formatEntity == undefined ? "" : formatEntity.meta, false);
    createInputSelectWidget(container, formatBaseViewInfo1);
    createFormatSelectWidget(container, "vid_format_gift", ["gift_product1", "gift_product2"], formatEntity == undefined ? "" : formatEntity.giftLabel, "请选择赠送产品");
    createFormatDatePickerWidget(container, "vid_format_gift_startTime",formatEntity.giftStart);
    createFormatDatePickerWidget(container, "vid_format_gift_endTime",formatEntity.giftEnd);
}


function createInputSelectWidget(container, formatBaseViewInfo, defaultUnit) {
    let labelView = document.createElement("div");
    labelView.innerHTML = formatBaseViewInfo.title;
    labelView.className = "formatSubItemBar_main_widget_label";
    labelView.style.marginLeft = "5px";
    container.appendChild(labelView);
    let inputView = document.createElement("input");
    inputView.className = "formatSubItemBar_main_widget_number";
    inputView.value = formatBaseViewInfo.label;
    inputView.id = formatBaseViewInfo.labelId;
    container.appendChild(inputView);
    if (formatBaseViewInfo.isSelector) {
        let metaView = document.createElement("select");
        metaView.value = formatBaseViewInfo.unit;
        metaView.id = formatBaseViewInfo.unitId;
        metaView.className = "formatSubItemBar_main_widget_meta";
        if (defaultUnit == undefined) {
            metaView.options.add(new Option("单位", "单位"));
        } else {
            metaView.options.add(new Option(defaultUnit, "current"));
        }

        for (let index = 0; index < UNITS.length; index++) {
            metaView.options.add(new Option(UNITS[index].label, UNITS[index].unitId));
        }

        container.appendChild(metaView);
    }
}


function createFormatSelectWidget(container, id, options, defaultOption, tip) {
    let metaView = document.createElement("select");
    metaView.id = id;
    metaView.className = "formatSubItemBar_main_widget_meta";
    metaView.style.width = "200px";
    metaView.style.marginLeft = "10px";

    if (options != undefined) {
        if (defaultOption == undefined) {
            metaView.options.add(new Option(tip, tip));
        } else {
            metaView.options.add(new Option(defaultOption, "current"));
        }
        for (let index = 0; index < options.length; index++) {
            metaView.options.add(new Option(options[index], options[index]));
        }
    }

    container.appendChild(metaView);
}

function createFormatDatePickerWidget(container, id, defaultValue) {
    let inputView = document.createElement("input");
    inputView.type = "text";
    if (defaultValue == undefined) {
        inputView.value = "请选择时间";
    } else {
        inputView.value = defaultValue;
    }
    inputView.readOnly = true;
    inputView.className = "formatSubItemBar_main_widget_number";
    inputView.style.width = "200px";
    inputView.style.marginLeft = "10px";
    inputView.id = id;
    container.appendChild(inputView);

    new Pikaday({
        field: inputView,
        firstDay: 1,
        minDate: new Date('2015-01-01'),
        maxDate: new Date('2020-12-31'),
        yearRange: [2015, 2020]
    });
}

function saveFormat() {

    let formatStatus = document.getElementById("vid_format_status");
    let formatLabel = document.getElementById("vid_format_label");
    let formatLabel_unit = document.getElementById("vid_format_label_unit");
    let formatMount = document.getElementById("vid_format_mount");
    let formatMount_unit = document.getElementById("vid_format_mount_unit");
    let formatPricing = document.getElementById("vid_format_pricing");
    let formatPricing_unit = document.getElementById("vid_format_pricing_unit");
    let formatPostage = document.getElementById("vid_format_postage");
    let formatPostage_unit = document.getElementById("vid_format_postage_unit");

    let formatPriceStatus = document.getElementById("vid_format_priceStatus");
    let formatPriceDiscount = document.getElementById("vid_format_priceDiscount");
    let formatPrice = document.getElementById("vid_format_price");
    let formatDiscountStart = document.getElementById("vid_format_discount_startTime");
    let formatDiscountEnd = document.getElementById("vid_format_discount_endTime");

    let formatExpressStatus = document.getElementById("vid_format_expressStatus");
    let formatExpressCount = document.getElementById("vid_format_expressCount");
    let formatExpress = document.getElementById("vid_format_express");
    let formatExpressStart = document.getElementById("vid_format_express_startTime");
    let formatExpressEnd = document.getElementById("vid_format_express_endTime");

    let formatGiftStatus = document.getElementById("vid_format_giftStatus");
    let formatGiftCount = document.getElementById("vid_format_giftCount");
    let formatGift = document.getElementById("vid_format_gift");
    let formatGiftStart = document.getElementById("vid_format_gift_startTime");
    let formatGiftEnd = document.getElementById("vid_format_gift_endTime");


    let indexUrl = "http://localhost:8080/foodslab/product/createFormat?typeId=aba4d190-6874-426a-883f-a1e561a6f879"
    indexUrl = indexUrl + "&status=" + (formatStatus.checked == true ? 1 : 0);
    indexUrl = indexUrl + "&label=" + formatLabel.value;
    indexUrl = indexUrl + "&meta=" + formatLabel_unit.options[formatLabel_unit.selectedIndex].text;
    indexUrl = indexUrl + "&amount=" + formatMount.value;
    indexUrl = indexUrl + "&amountMeta=" + formatMount_unit.options[formatMount_unit.selectedIndex].text;
    indexUrl = indexUrl + "&pricing=" + formatPricing.value;
    indexUrl = indexUrl + "&pricingMeta=" + formatPricing_unit.options[formatPricing_unit.selectedIndex].text;
    indexUrl = indexUrl + "&postage=" + formatPostage.value;
    indexUrl = indexUrl + "&postageMeta=" + formatPostage_unit.options[formatPostage_unit.selectedIndex].text;

    indexUrl = indexUrl + "&priceStatus=" + (formatPriceStatus.checked == true ? 1 : 0);
    indexUrl = indexUrl + "&priceDiscount=" + formatPriceDiscount.value;
    indexUrl = indexUrl + "&price=" + formatPrice.value;
    indexUrl = indexUrl + "&priceStart=" + formatDiscountStart.value;
    indexUrl = indexUrl + "&priceEnd=" + formatDiscountEnd.value;

    indexUrl = indexUrl + "&expressStatus=" + (formatExpressStatus.checked == true ? 1 : 0);
    indexUrl = indexUrl + "&expressCount=" + formatExpressCount.value;
    indexUrl = indexUrl + "&expressName=" + formatExpress.options[formatExpress.selectedIndex].text;
    indexUrl = indexUrl + "&expressStart=" + formatExpressStart.value;
    indexUrl = indexUrl + "&expressEnd=" + formatExpressEnd.value;

    indexUrl = indexUrl + "&giftStatus=" + (formatGiftStatus.checked == true ? 1 : 0);
    indexUrl = indexUrl + "&giftCount=" + formatGiftCount.value;
    indexUrl = indexUrl + "&giftLabel=" + formatGift.options[formatGift.selectedIndex].text;
    ;
    indexUrl = indexUrl + "&giftStart=" + formatGiftStart.value;
    indexUrl = indexUrl + "&giftEnd=" + formatGiftEnd.value;

    asyncRequestByGet(indexUrl, saveFormatCallback, onRequestError(), onRequestTimeout());
}

function saveFormatCallback(data) {
    console.log(data);
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
function initDetailEditor(container, typeEntity) {
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

function insertImage() {

}
