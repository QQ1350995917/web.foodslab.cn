/**
 * Created by dingpengwei on 8/12/16.
 */
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

/**
 * 规格显示区域
 * @param containerView
 * @param formatEntities
 */
function initFormatView(containerView,typeEntity) {
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
        saveFormat(typeEntity);
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
    for (let index = 0; index < typeEntity.children.length; index++) {
        let formatEntity = typeEntity.children[index];
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
    initFormatSubView_main(formatMainBar, typeEntity.children[0]);
    initFormatSubView_discount(formatDiscountBar, typeEntity.children[0]);
    initFormatSubView_post(formatPostBar, typeEntity.children[0]);
    initFormatSubView_gift(formatGiftBar, typeEntity.children[0]);
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
    createFormatDatePickerWidget(container, "vid_format_discount_startTime", formatEntity == undefined ? "请选择时间" :formatEntity.priceStart);
    createFormatDatePickerWidget(container, "vid_format_discount_endTime", formatEntity == undefined ? "请选择时间" :formatEntity.priceEnd);
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
    createFormatDatePickerWidget(container, "vid_format_express_startTime", formatEntity == undefined ? "请选择时间" :formatEntity.expressStart);
    createFormatDatePickerWidget(container, "vid_format_express_endTime", formatEntity == undefined ? "请选择时间" :formatEntity.expressEnd);
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
    createFormatDatePickerWidget(container, "vid_format_gift_startTime", formatEntity == undefined ? "请选择时间" :formatEntity.giftStart);
    createFormatDatePickerWidget(container, "vid_format_gift_endTime", formatEntity == undefined ? "请选择时间" :formatEntity.giftEnd);
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

function saveFormat(typeEntity) {
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


    let indexUrl = "http://localhost:8080/foodslab/product/createFormat?typeId=" + typeEntity.typeId;
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

    console.log(indexUrl);

    asyncRequestByGet(indexUrl, saveFormatCallback, onRequestError(), onRequestTimeout());
}

function saveFormatCallback(data) {
    console.log(data);
}
