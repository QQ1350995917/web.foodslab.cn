/**
 * Created by dingpengwei on 8/12/16.
 */

function loadProductFormatView(seriesEntity, typeEntity) {
    let titleView = document.createElement("div");
    titleView.innerHTML = "系列总览 >> " + seriesEntity.label + " >> " + typeEntity.label;
    titleView.style.cursor = "pointer";
    getTitleContainer().appendChild(titleView);
    titleView.onclick = function () {
        resetMainContainer();
        loadProductTypeView(seriesEntity);
    };

    typeEntity.cs = getCookie(KEY_CS);
    var url = BASE_PATH + "/type/mRetrieve?p=" + JSON.stringify(typeEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RC_SUCCESS) {
                createMixContainer(parseData.data);
                requestFormatListData(typeEntity);
            } else {
                new Toast().show("请求数据失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function requestFormatListData(typeEntity) {
    typeEntity.cs = getCookie(KEY_CS);
    var indexUrl = BASE_PATH + "/format/mRetrieves?p=" + JSON.stringify(typeEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            console.log(parseData);
            if (parseData.code == RC_SUCCESS) {
                onRequestFormatListDataCallback(typeEntity, parseData.data);
            } else {
                new Toast().show("请求数据失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function onRequestFormatListDataCallback(typeEntity, formatEntities) {
    let formatContainer = document.getElementById("formatContainer");
    formatContainer.innerHTML = null;

    let titleContainer = document.createElement("div");
    titleContainer.className = "formatItemContainer";
    titleContainer.style.height = "45px";
    titleContainer.style.marginTop = "0px";
    formatContainer.appendChild(titleContainer);

    let baseInfoContainer = document.createElement("div");
    baseInfoContainer.className = "formatItemContainer";
    formatContainer.appendChild(baseInfoContainer);

    let discountContainer = document.createElement("div");
    discountContainer.className = "formatItemContainer";
    formatContainer.appendChild(discountContainer);

    let postageContainer = document.createElement("div");
    postageContainer.className = "formatItemContainer";
    formatContainer.appendChild(postageContainer);

    let giftContainer = document.createElement("div");
    giftContainer.className = "formatItemContainer";
    formatContainer.appendChild(giftContainer);

    let functionContainer = document.createElement("div");
    functionContainer.className = "formatItemContainer";
    functionContainer.style.height = "96px";
    formatContainer.appendChild(functionContainer);
    let newObject = new Object();
    newObject.label = "+";
    newObject.tag = APP_CONST_CLIENT_ID;
    formatEntities.push(newObject);
    titleContainer.appendChild(createHorizontalTabHostDiv("formatViewId", formatEntities, "defaultTabSelected", "defaultTabNormal", function (formatEntity) {
        if (formatEntity != null && formatEntity.tag == APP_CONST_CLIENT_ID) {
            formatEntity = undefined;
        }
        attachFormatBaseInfoContainer(baseInfoContainer, typeEntity, formatEntity);
        attachFormatDiscountContainer(discountContainer, formatEntity);
        attachFormatPostageContainer(postageContainer, formatEntity)
        attachFormatFunctionContainer(functionContainer, typeEntity, formatEntity);
    }, 0));
}

function attachFormatBaseInfoContainer(baseInfoContainer, typeEntity, formatEntity) {
    baseInfoContainer.innerHTML = null;
    let baseInfoLeftLeftContainer = document.createElement("div");
    baseInfoLeftLeftContainer.className = "formatFunctionLeftContainer";
    let displayStatus = document.createElement("input");
    displayStatus.setAttribute("type", "checkbox");
    displayStatus.className = "formatDisplayCheckBox";
    displayStatus.id = "formatStatus";
    if (formatEntity == undefined) {
        displayStatus.checked = false;
    } else {
        if (formatEntity.status == 1) {
            displayStatus.checked = false;
        } else if (formatEntity.status == 2) {
            displayStatus.checked = true;
        }
    }
    baseInfoLeftLeftContainer.appendChild(displayStatus);
    let formatBaseViewInfo1 = new FormatBaseViewInfo("规格", "formatLabel", formatEntity == undefined ? "" : formatEntity.label, "formatLabelUnit", formatEntity == undefined ? "" : formatEntity.meta, true);
    let formatBaseViewInfo2 = new FormatBaseViewInfo("数量", "formatMount", formatEntity == undefined ? "" : formatEntity.amount, "formatMountUnit", formatEntity == undefined ? "" : formatEntity.amountMeta, true);
    let formatBaseViewInfo3 = new FormatBaseViewInfo("定价", "formatPrice", formatEntity == undefined ? "" : formatEntity.price, "formatPriceUnit", formatEntity == undefined ? "" : formatEntity.priceMeta, true);
    let formatBaseViewInfo4 = new FormatBaseViewInfo("邮费", "formatPostage", formatEntity == undefined ? "" : formatEntity.postage, "formatPostageUnit", formatEntity == undefined ? "" : formatEntity.postageMeta, true);
    let baseInfo = new Array();
    baseInfo.push(formatBaseViewInfo1);
    baseInfo.push(formatBaseViewInfo2);
    baseInfo.push(formatBaseViewInfo3);
    baseInfo.push(formatBaseViewInfo4);
    let unitIndex = new Array();
    unitIndex.push(formatEntity == undefined ? undefined : formatEntity.meta);
    unitIndex.push(formatEntity == undefined ? undefined : formatEntity.amountMeta);
    unitIndex.push(formatEntity == undefined ? undefined : formatEntity.priceMeta);
    unitIndex.push(formatEntity == undefined ? undefined : formatEntity.postageMeta);

    for (let index = 0; index < 4; index++) {
        createInputSelectWidget(baseInfoLeftLeftContainer, baseInfo[index], unitIndex[index]);
    }

    baseInfoContainer.appendChild(baseInfoLeftLeftContainer);
    let baseInfoRightContainer = document.createElement("div");
    baseInfoRightContainer.className = "formatFunctionRightContainer";
    if (!isNullValue(formatEntity)) {
        let formatDelete = document.createElement("div");
        formatDelete.className = "formatDeleteView";
        formatDelete.innerHTML = "删除";
        baseInfoRightContainer.appendChild(formatDelete);
        formatDelete.onclick = function () {
            let requestFormatEntity = new Object();
            requestFormatEntity.typeId = typeEntity.typeId;
            requestFormatEntity.formatId = formatEntity.formatId;
            requestFormatEntity.status = -1;
            requestMarkFormat(typeEntity, requestFormatEntity);
        }
    }
    baseInfoContainer.appendChild(baseInfoRightContainer);
}

function attachFormatDiscountContainer(discountContainer, formatEntity) {
    discountContainer.innerHTML = null;
    let display = document.createElement("input");
    display.setAttribute("type", "checkbox");
    display.className = "formatDisplayCheckBox";
    display.id = "formatPricingStatus";
    if (formatEntity == undefined) {
        display.checked = false;
    } else {
        if (formatEntity.pricingStatus == 1) {
            display.checked = false;
        } else if (formatEntity.pricingStatus == 2) {
            display.checked = true;
        }
    }
    discountContainer.appendChild(display);
    let formatBaseViewInfo1 = new FormatBaseViewInfo("折扣", "formatPricingDiscount", formatEntity == undefined ? "" : formatEntity.pricingDiscount, "spaceholder", formatEntity == undefined ? "" : formatEntity.meta, false);
    let formatBaseViewInfo2 = new FormatBaseViewInfo("现价", "formatPricing", formatEntity == undefined ? "" : formatEntity.pricing, "spaceholder", formatEntity == undefined ? "" : formatEntity.meta, false);
    let baseInfo = new Array();
    baseInfo.push(formatBaseViewInfo1);
    baseInfo.push(formatBaseViewInfo2);
    for (let index = 0; index < 2; index++) {
        createInputSelectWidget(discountContainer, baseInfo[index]);
    }
    createFormatDatePickerWidget(discountContainer, "formatDiscountStartTime", formatEntity == undefined ? undefined : formatEntity.pricingStart);
    createFormatDatePickerWidget(discountContainer, "formatDiscountEndTime", formatEntity == undefined ? undefined : formatEntity.pricingEnd);

}

function attachFormatPostageContainer(postageContainer, formatEntity) {
    postageContainer.innerHTML = null;
    let display = document.createElement("input");
    display.setAttribute("type", "checkbox");
    display.className = "formatDisplayCheckBox";
    display.id = "formatExpressStatus";
    if (formatEntity == undefined) {
        display.checked = false;
    } else {
        if (formatEntity.expressStatus == 1) {
            display.checked = false;
        } else if (formatEntity.expressStatus == 2) {
            display.checked = true;
        }
    }
    postageContainer.appendChild(display);
    let formatBaseViewInfo1 = new FormatBaseViewInfo("包邮", "formatExpressCount", formatEntity == undefined ? "" : formatEntity.expressCount, "spaceholder", formatEntity == undefined ? "" : formatEntity.meta, false);
    createInputSelectWidget(postageContainer, formatBaseViewInfo1);
    createFormatSelectWidget(postageContainer, "formatExpress", EXPRESS, formatEntity == undefined ? undefined : formatEntity.expressName, "请选择快递公司");
    createFormatDatePickerWidget(postageContainer, "formatExpressStartTime", formatEntity == undefined ? undefined : formatEntity.expressStart);
    createFormatDatePickerWidget(postageContainer, "formatExpressEndTime", formatEntity == undefined ? undefined : formatEntity.expressEnd);

}

function attachFormatFunctionContainer(functionContainer, typeEntity, formatEntity) {
    functionContainer.innerHTML = null;
    let functionLeftContainer = document.createElement("div");
    functionLeftContainer.className = "formatFunctionLeftContainer";
    functionContainer.appendChild(functionLeftContainer);
    let functionRightContainer = document.createElement("div");
    functionRightContainer.className = "formatFunctionRightContainer";
    let saveFormatAction = document.createElement("div");
    saveFormatAction.className = "formatAction";
    saveFormatAction.innerHTML = "保存";
    functionRightContainer.appendChild(saveFormatAction);
    functionContainer.appendChild(functionRightContainer);

    saveFormatAction.onclick = function () {
        saveFormat(typeEntity, formatEntity);
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

function createInputSelectWidget(container, formatBaseViewInfo, defaultUnit) {
    let labelView = document.createElement("div");
    labelView.innerHTML = formatBaseViewInfo.title;
    labelView.className = "formatLabel";
    labelView.style.marginLeft = "5px";
    container.appendChild(labelView);
    let inputView = document.createElement("input");
    inputView.className = "formatInput";
    inputView.value = formatBaseViewInfo.label;
    inputView.id = formatBaseViewInfo.labelId;
    container.appendChild(inputView);
    if (formatBaseViewInfo.isSelector) {
        let metaView = document.createElement("select");
        metaView.value = formatBaseViewInfo.unit;
        metaView.id = formatBaseViewInfo.unitId;
        metaView.className = "formatSelect";
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
    metaView.className = "formatSelect";
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
        inputView.value = new Date(defaultValue).format("yyyy-MM-dd");
    }
    inputView.readOnly = true;
    inputView.className = "formatInput";
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

function saveFormat(typeEntity, formatEntity) {
    let formatStatus = document.getElementById("formatStatus");
    let formatLabel = document.getElementById("formatLabel");
    let formatLabelUnit = document.getElementById("formatLabelUnit");
    let formatMount = document.getElementById("formatMount");
    let formatMountUnit = document.getElementById("formatMountUnit");
    let formatPrice = document.getElementById("formatPrice");
    let formatPriceUnit = document.getElementById("formatPriceUnit");
    let formatPostage = document.getElementById("formatPostage");
    let formatPostageUnit = document.getElementById("formatPostageUnit");

    let formatPricingStatus = document.getElementById("formatPricingStatus");
    let formatPricingDiscount = document.getElementById("formatPricingDiscount");
    let formatPricing = document.getElementById("formatPricing");
    let formatPricingDiscountStart = document.getElementById("formatDiscountStartTime");
    let formatPricingDiscountEnd = document.getElementById("formatDiscountEndTime");

    let formatExpressStatus = document.getElementById("formatExpressStatus");
    let formatExpressCount = document.getElementById("formatExpressCount");
    let formatExpress = document.getElementById("formatExpress");
    let formatExpressStart = document.getElementById("formatExpressStartTime");
    let formatExpressEnd = document.getElementById("formatExpressEndTime");

    let formatGiftStatus = document.getElementById("formatGiftStatus");
    let formatGiftCount = document.getElementById("formatGiftCount");
    let formatGift = document.getElementById("formatGift");
    let formatGiftStart = document.getElementById("formatGiftStartTime");
    let formatGiftEnd = document.getElementById("formatGiftEndTime");


    let requestFormatEntity = new Object();
    requestFormatEntity.typeId = typeEntity.typeId;

    requestFormatEntity.status = (formatStatus.checked == true ? 2 : 1);
    requestFormatEntity.label = formatLabel.value;
    requestFormatEntity.meta = formatLabelUnit.options[formatLabelUnit.selectedIndex].text;
    requestFormatEntity.amount = formatMount.value;
    requestFormatEntity.amountMeta = formatMountUnit.options[formatMountUnit.selectedIndex].text;
    requestFormatEntity.price = formatPrice.value;
    requestFormatEntity.priceMeta = formatPriceUnit.options[formatPriceUnit.selectedIndex].text;
    requestFormatEntity.postage = formatPostage.value;
    requestFormatEntity.postageMeta = formatPostageUnit.options[formatPostageUnit.selectedIndex].text;

    requestFormatEntity.pricingStatus = (formatPricingStatus.checked == true ? 2 : 1);
    requestFormatEntity.pricingDiscount = formatPricingDiscount.value;
    requestFormatEntity.pricing = formatPricing.value;
    requestFormatEntity.pricingStart = new Date(formatPricingDiscountStart.value).getTime();
    requestFormatEntity.pricingEnd = new Date(formatPricingDiscountEnd.value).getTime();

    requestFormatEntity.expressStatus = (formatExpressStatus.checked == true ? 1 : 0);
    requestFormatEntity.expressCount = formatExpressCount.value;
    requestFormatEntity.expressName = formatExpress.options[formatExpress.selectedIndex].text;
    requestFormatEntity.expressStart = new Date(formatExpressStart.value).getTime();
    requestFormatEntity.expressEnd = new Date(formatExpressEnd.value).getTime();

    requestFormatEntity.giftStatus = (formatGiftStatus.checked == true ? 1 : 0);
    requestFormatEntity.giftCount = formatGiftCount.value;
    requestFormatEntity.giftLabel = formatGift.options[formatGift.selectedIndex].text;
    requestFormatEntity.giftStart = new Date(formatGiftStart.value).getTime();
    requestFormatEntity.giftEnd = new Date(formatGiftEnd.value).getTime();

    if (formatEntity == undefined || formatEntity.formatId == undefined || formatEntity.formatId == null || formatEntity.formatId == APP_CONST_CLIENT_ID) {
        requestCreateFormat(typeEntity, requestFormatEntity);
    } else {
        requestFormatEntity.formatId = formatEntity.formatId;
        requestUpdateFormat(typeEntity, requestFormatEntity);
    }
}

function requestCreateFormat(typeEntity, formatEntity) {
    formatEntity.cs = getCookie(KEY_CS);
    let indexUrl = BASE_PATH + "/format/mCreate?p=" + JSON.stringify(formatEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RC_SUCCESS) {
                new Toast().show("保存成功");
                requestFormatListData(typeEntity);
            } else {
                new Toast().show("保存失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function requestUpdateFormat(typeEntity, formatEntity) {
    formatEntity.cs = getCookie(KEY_CS);
    let indexUrl = BASE_PATH + "/format/mUpdate?p=" + JSON.stringify(formatEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RC_SUCCESS) {
                new Toast().show("保存成功");
                requestFormatListData(typeEntity);
            } else {
                new Toast().show("保存失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function requestMarkFormat(typeEntity, formatEntity) {
    formatEntity.cs = getCookie(KEY_CS);
    let indexUrl = BASE_PATH + "/format/mMark?p=" + JSON.stringify(formatEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RC_SUCCESS) {
                new Toast().show("保存成功");
                requestFormatListData(typeEntity);
            } else {
                new Toast().show("保存失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}