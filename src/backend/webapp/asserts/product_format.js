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
    var url = BASE_PATH + "/format/mRetrieves?p=" + JSON.stringify(typeEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            let formatContainer = document.getElementById("formatContainer");
            formatContainer.innerHTML = null;
            if (parseData.code == RC_SUCCESS) {
                onAttachFormatTitleToContainer(formatContainer, typeEntity, parseData.data);
            } else if (parseData.code == RC_SUCCESS_EMPTY) {
                onAttachFormatTitleToContainer(formatContainer, typeEntity, parseData.data);
            } else{
                new Toast().show("请求数据失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function onAttachFormatTitleToContainer(container, typeEntity, formatEntities) {
    container.innerHTML = null;
    let titleContainer = document.createElement("div");
    titleContainer.className = "formatItemContainer";
    titleContainer.style.height = "45px";
    titleContainer.style.marginTop = "0px";
    container.appendChild(titleContainer);

    let contentContainer = document.createElement("div");
    contentContainer.className = "formatItemContainer";
    contentContainer.style.height = "45px";
    contentContainer.style.marginTop = "0px";
    container.appendChild(contentContainer);

    let newObject = new Object();
    newObject.label = "+";
    formatEntities.push(newObject);

    titleContainer.appendChild(createHorizontalTabHostDiv("formatViewId", formatEntities, "defaultTabSelected", "defaultTabNormal",
        function (formatEntity) {
            if (formatEntity == null || formatEntity.formatId == undefined) {
                formatEntity = undefined;
            }
            onAttachFormatContentToContainer(contentContainer, typeEntity, formatEntity);
        }, 0));
}

function onAttachFormatContentToContainer(container, typeEntity, formatEntity) {
    container.innerHTML = null;
    let formatBaseInfoDiv = document.createElement("div");
    formatBaseInfoDiv.className = "formatItemContainer";

    let formatStatusInput = document.createElement("input");
    formatStatusInput.setAttribute("type", "checkbox");
    formatStatusInput.className = "formatDisplayCheckBox";
    formatStatusInput.id = "formatStatus";
    formatBaseInfoDiv.appendChild(formatStatusInput);

    let labelDiv = document.createElement("div");
    labelDiv.innerHTML = "规格:";
    labelDiv.className = "formatLabel";
    labelDiv.style.marginLeft = "5px";
    formatBaseInfoDiv.appendChild(labelDiv);

    let labelInput = document.createElement("input");
    labelInput.className = "formatInput";

    formatBaseInfoDiv.appendChild(labelInput);

    let labelMateSelector = createSelector();
    formatBaseInfoDiv.appendChild(labelMateSelector);

    let amountLabelDiv = document.createElement("div");
    amountLabelDiv.innerHTML = "数量:";
    amountLabelDiv.className = "formatLabel";
    amountLabelDiv.style.marginLeft = "5px";
    formatBaseInfoDiv.appendChild(amountLabelDiv);

    let amountInput = document.createElement("input");
    amountInput.className = "formatInput";

    formatBaseInfoDiv.appendChild(amountInput);
    let amountMateSelector = createSelector();
    formatBaseInfoDiv.appendChild(amountMateSelector);

    let priceLabelDiv = document.createElement("div");
    priceLabelDiv.innerHTML = "价格:";
    priceLabelDiv.className = "formatLabel";
    priceLabelDiv.style.marginLeft = "5px";
    formatBaseInfoDiv.appendChild(priceLabelDiv);

    let priceInput = document.createElement("input");
    priceInput.className = "formatInput";
    formatBaseInfoDiv.appendChild(priceInput);

    let priceMateDiv = document.createElement("div");
    priceMateDiv.innerHTML = "￥";
    priceMateDiv.className = "formatLabel";
    priceMateDiv.style.width = "20px";
    priceMateDiv.style.marginLeft = "0px";
    formatBaseInfoDiv.appendChild(priceMateDiv);

    let postageLabelDiv = document.createElement("div");
    postageLabelDiv.innerHTML = "邮费:";
    postageLabelDiv.className = "formatLabel";
    postageLabelDiv.style.marginLeft = "5px";
    formatBaseInfoDiv.appendChild(postageLabelDiv);

    let postageInput = document.createElement("input");
    postageInput.className = "formatInput";
    formatBaseInfoDiv.appendChild(postageInput);

    let postageMateDiv = document.createElement("div");
    postageMateDiv.innerHTML = "￥";
    postageMateDiv.className = "formatLabel";
    postageMateDiv.style.width = "20px";
    postageMateDiv.style.marginLeft = "0px";
    formatBaseInfoDiv.appendChild(postageMateDiv);

    container.appendChild(formatBaseInfoDiv);

    let formatPricingInfoDiv = document.createElement("div");
    formatPricingInfoDiv.className = "formatItemContainer";

    let pricingStatusInput = document.createElement("input");
    pricingStatusInput.setAttribute("type", "checkbox");
    pricingStatusInput.className = "formatDisplayCheckBox";
    pricingStatusInput.id = "formatPricingStatus";
    formatPricingInfoDiv.appendChild(pricingStatusInput);

    let pricingDiscountLabelDiv = document.createElement("div");
    pricingDiscountLabelDiv.innerHTML = "折扣:";
    pricingDiscountLabelDiv.className = "formatLabel";
    pricingDiscountLabelDiv.style.marginLeft = "5px";
    formatPricingInfoDiv.appendChild(pricingDiscountLabelDiv);

    let pricingDiscountInput = document.createElement("input");
    pricingDiscountInput.className = "formatInput";
    formatPricingInfoDiv.appendChild(pricingDiscountInput);

    let pricingLabelDiv = document.createElement("div");
    pricingLabelDiv.innerHTML = "现价:";
    pricingLabelDiv.className = "formatLabel";
    pricingLabelDiv.style.marginLeft = "5px";
    formatPricingInfoDiv.appendChild(pricingLabelDiv);

    let pricingInput = document.createElement("input");
    pricingInput.className = "formatInput";
    formatPricingInfoDiv.appendChild(pricingInput);

    let pricingMateDiv = document.createElement("div");
    pricingMateDiv.innerHTML = "￥";
    pricingMateDiv.className = "formatLabel";
    pricingMateDiv.style.width = "20px";
    pricingMateDiv.style.marginLeft = "0px";
    formatPricingInfoDiv.appendChild(pricingMateDiv);

    let pricingStartInput = createDatePicker(formatEntity == undefined ? undefined : formatEntity.pricingStart);
    formatPricingInfoDiv.appendChild(pricingStartInput);

    let pricingEndInput = createDatePicker(formatEntity == undefined ? undefined : formatEntity.pricingEnd);
    formatPricingInfoDiv.appendChild(pricingEndInput);

    container.appendChild(formatPricingInfoDiv);

    let formatExpressInfoDiv = document.createElement("div");
    formatExpressInfoDiv.className = "formatItemContainer";

    let expressStatusInput = document.createElement("input");
    expressStatusInput.setAttribute("type", "checkbox");
    expressStatusInput.className = "formatDisplayCheckBox";
    expressStatusInput.id = "formatPricingStatus";
    formatExpressInfoDiv.appendChild(expressStatusInput);

    let expressLabelDiv = document.createElement("div");
    expressLabelDiv.innerHTML = "包邮:";
    expressLabelDiv.className = "formatLabel";
    expressLabelDiv.style.marginLeft = "5px";
    formatExpressInfoDiv.appendChild(expressLabelDiv);

    let expressInput = document.createElement("input");
    expressInput.className = "formatInput";
    formatExpressInfoDiv.appendChild(expressInput);

    let expressSelector = document.createElement("select");
    expressSelector.className = "formatSelect";
    expressSelector.style.width = "100px";
    expressSelector.options.add(new Option("圆通快递", "圆通快递"));
    expressSelector.options.add(new Option("中通快递", "中通快递"));
    expressSelector.options.add(new Option("申通快递", "申通快递"));
    expressSelector.options.add(new Option("顺丰快递", "顺丰快递"));
    formatExpressInfoDiv.appendChild(expressSelector);

    let expressStartInput = createDatePicker(formatEntity == undefined ? undefined : formatEntity.expressStart);
    formatExpressInfoDiv.appendChild(expressStartInput);
    let expressEndInput = createDatePicker(formatEntity == undefined ? undefined : formatEntity.expressEnd);
    formatExpressInfoDiv.appendChild(expressEndInput);
    container.appendChild(formatExpressInfoDiv);

    let formatDisplayBarDiv = document.createElement("div");
    formatDisplayBarDiv.className = "formatItemContainer";
    let saveFormatAction = document.createElement("div");
    saveFormatAction.className = "formatAction";
    saveFormatAction.innerHTML = "保存";
    formatDisplayBarDiv.appendChild(saveFormatAction);
    container.appendChild(formatDisplayBarDiv);

    if (formatEntity == undefined) {
        formatStatusInput.checked = false;
        expressStatusInput.checked = false;
    } else {
        if (formatEntity.status == 1) {
            formatStatusInput.checked = false;
            container.style.color = "red";
        } else if (formatEntity.status == 2) {
            formatStatusInput.checked = true;
            container.style.color = "black";
        }

        if (formatEntity.pricingStatus == 1) {
            pricingStatusInput.checked = false;
        } else if (formatEntity.pricingStatus == 2) {
            pricingStatusInput.checked = true;
        }

        if (formatEntity.expressStatus == 1) {
            expressStatusInput.checked = false;
        } else if (formatEntity.expressStatus == 2) {
            expressStatusInput.checked = true;
        }

        labelInput.value = formatEntity.label;
        amountInput.value = formatEntity.amount;
        priceInput.value = formatEntity.label;
        postageInput.value = formatEntity.label;
        pricingDiscountInput.value = formatEntity.label;
        pricingInput.value = formatEntity.label;
        expressInput.value = formatEntity.label;

        let formatDelete = document.createElement("div");
        formatDelete.className = "formatDeleteView";
        formatDelete.innerHTML = "删除";
        formatDelete.style.width = "75px";
        formatBaseInfoDiv.appendChild(formatDelete);
        formatDelete.onclick = function () {
            let requestFormatEntity = new Object();
            requestFormatEntity.formatId = formatEntity.formatId;
            requestFormatEntity.status = -1;
            requestMarkFormat(requestFormatEntity);
        }
    }

    saveFormatAction.onclick = function () {
        let requestFormatEntity = new Object();
        requestFormatEntity.typeId = typeEntity.typeId;
        requestFormatEntity.status = (formatStatusInput.checked == true ? 2 : 1);
        requestFormatEntity.label = labelInput.value;
        requestFormatEntity.meta = labelMateSelector.options[labelMateSelector.selectedIndex].text;
        requestFormatEntity.amount = amountInput.value;
        requestFormatEntity.amountMeta = amountMateSelector.options[amountMateSelector.selectedIndex].text;
        requestFormatEntity.price = pricingInput.value;
        requestFormatEntity.postage = postageInput.value;

        requestFormatEntity.pricingStatus = (pricingStatusInput.checked == true ? 2 : 1);
        requestFormatEntity.pricingDiscount = pricingDiscountInput.value;
        requestFormatEntity.pricing = pricingInput.value;
        requestFormatEntity.pricingStart = new Date(pricingStartInput.value).getTime();
        requestFormatEntity.pricingEnd = new Date(pricingEndInput.value).getTime();

        requestFormatEntity.expressStatus = (expressStatusInput.checked == true ? 2 : 1);
        requestFormatEntity.expressCount = expressInput.value;
        requestFormatEntity.expressName = expressSelector.options[expressSelector.selectedIndex].text;
        requestFormatEntity.expressStart = new Date(expressStartInput.value).getTime();
        requestFormatEntity.expressEnd = new Date(expressEndInput.value).getTime();

        if (formatEntity == undefined || isNullValue(formatEntity.formatId)) {
            requestCreateFormat(typeEntity, requestFormatEntity);
        } else {
            requestFormatEntity.formatId = formatEntity.formatId;
            requestUpdateFormat(typeEntity, requestFormatEntity);
        }
    }
}

function createSelector(defaultOptions) {
    let metaView = document.createElement("select");
    metaView.className = "formatSelect";
    if (isNullValue(defaultOptions)) {
        for (let index = 0; index < UNITS.length; index++) {
            metaView.options.add(new Option(UNITS[index].label, UNITS[index].unitId));
        }
    } else {
        for (let index = 0; index < defaultOptions.length; index++) {
            metaView.options.add(new Option(defaultOptions[index], defaultOptions[index]));
        }
    }

    return metaView;
}

function createDatePicker(defaultValue) {
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
    new Pikaday({
        field: inputView,
        firstDay: 1,
        minDate: new Date('2015-01-01'),
        maxDate: new Date('2020-12-31'),
        yearRange: [2015, 2020]
    });
    return inputView;
}

function requestCreateFormat(typeEntity, formatEntity) {
    formatEntity.cs = getCookie(KEY_CS);
    let url = BASE_PATH + "/format/mCreate?p=" + JSON.stringify(formatEntity);
    console.log(url);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        console.log(data);
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
    let url = BASE_PATH + "/format/mUpdate?p=" + JSON.stringify(formatEntity);
    asyncRequestByGet(url, function (data) {
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

function requestMarkFormat(formatEntity) {
    formatEntity.cs = getCookie(KEY_CS);
    let url = BASE_PATH + "/format/mMark?p=" + JSON.stringify(formatEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RC_SUCCESS) {
                new Toast().show("保存成功");
                let typeEntity = new Object();
                typeEntity.typeId = formatEntity.typeId;
                requestFormatListData(typeEntity);
            } else {
                new Toast().show("保存失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}