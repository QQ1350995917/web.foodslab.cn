/**
 * Created by dingpengwei on 8/22/16.
 */
window.onload = function () {
    initTitleView();
    let typeId = document.getElementById("typeId") == undefined ? null : document.getElementById("typeId").content;
    let formatId = document.getElementById("formatId") == undefined ? null : document.getElementById("formatId").content;
    requestType(typeId,formatId);
    requestLinker();
};

function requestType(typeId,formatId) {
    let url = BASE_PATH + "product/type?";
    if (typeId != undefined){
        url = url + "typeId=" + typeId;
    }
    if (formatId != undefined){
        url = url + "&formatId=" + formatId;
    }
    
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            createTypeView(jsonData.data);
        }
    }, onErrorCallback, onTimeoutCallback);
}

function createTypeView(data) {
    createTypeTitle(data);
    createTypeMainView(data);
}

function createTypeTitle(data) {
    let typeEntityView = document.getElementById(HEADER_MENU_DOWN);
    typeEntityView.innerHTML = null;

    let arrow1 = document.createElement("div");
    arrow1.className = "tabItem_normal";
    arrow1.style.cursor = "default";
    arrow1.innerHTML = ">>";
    typeEntityView.appendChild(arrow1);

    let seriesEntityView = document.createElement("div");
    seriesEntityView.className = "tabItem_normal";
    seriesEntityView.innerHTML = data.label;
    seriesEntityView.onclick = function () {
        let url = BASE_PATH + "ps?seriesId=" + data.seriesId;
        window.open(url, "_self");
    };
    typeEntityView.appendChild(seriesEntityView);

    let arrow2 = document.createElement("div");
    arrow2.className = "tabItem_normal";
    arrow2.style.cursor = "default";
    arrow2.innerHTML = ">>";
    typeEntityView.appendChild(arrow2);

    let typeLabelView = document.createElement("div");
    typeLabelView.className = "tabItem_normal";
    typeLabelView.style.cursor = "default";
    typeLabelView.style.fontSize = "1.2rem";
    typeLabelView.innerHTML = data.child.label;
    typeEntityView.appendChild(typeLabelView);
}

function createTypeMainView(data) {
    let typeMainTopView = document.createElement("div");
    typeMainTopView.className = "typeMainTopView";

    let typeMainTopLeft = document.createElement("div");
    typeMainTopLeft.className = "typeMainTopLeft";
    typeMainTopView.appendChild(typeMainTopLeft);

    let typeMainTopRight = document.createElement("div");
    typeMainTopRight.className = "typeMainTopRight";
    let countdownView = document.createElement("div");
    countdownView.innerHTML = "优惠剩余时间09天09时09分09秒";
    countdownView.style.height = "25px";
    countdownView.style.backgroundColor = "red";
    typeMainTopRight.appendChild(countdownView);

    let descriptionView = document.createElement("div");
    descriptionView.innerHTML = data.child.description;
    descriptionView.style.color = "black";
    descriptionView.style.height = "120px";
    typeMainTopRight.appendChild(descriptionView);

    let formatEntitiesView = document.createElement("div");
    formatEntitiesView.style.height = "251px";
    createFormatView(formatEntitiesView, data.child.children, document.getElementById("formatId") == undefined ? null : document.getElementById("formatId").content);
    typeMainTopRight.appendChild(formatEntitiesView);

    typeMainTopView.appendChild(typeMainTopRight);

    let typeMainLine = document.createElement("hr");
    typeMainLine.className = "typeMainLine";
    let typeMainDownView = document.createElement("div");
    typeMainDownView.className = "typeMainDownView";
    typeMainDownView.innerHTML = data.child.detail + data.child.detail + data.child.detail + data.child.detail + data.child.detail + data.child.detail + data.child.detail + data.child.detail + data.child.detail + data.child.detail + data.child.detail + data.child.detail;

    let mainView = document.getElementById(MAIN);
    mainView.appendChild(typeMainTopView);
    mainView.appendChild(typeMainLine);
    mainView.appendChild(typeMainDownView);
    mainView.style.height = typeMainTopView.clientHeight + typeMainLine.clientHeight + typeMainDownView.clientHeight + "px";
}


function createImageView() {

}

function createFormatView(containerView, formatEntity, selectedFormatId) {
    containerView.innerHTML = null;
    let formatLabelView = document.createElement("div");
    formatLabelView.className = "formatItem";
    let currentFormat = undefined;
    for (let i = 0; i < formatEntity.length; i++) {
        let formatLabel = document.createElement("div");
        formatLabel.className = "formatLabel";
        formatLabel.innerHTML = formatEntity[i].label + formatEntity[i].meta;
        formatLabel.onclick = function () {
            createFormatView(containerView, formatEntity, formatEntity[i].formatId);
        };
        if (selectedFormatId == formatEntity[i].formatId) {
            currentFormat = formatEntity[i];
            formatLabel.className = "formatLabelSelected";
        }
        formatLabelView.appendChild(formatLabel);
    }

    if (currentFormat == undefined) {
        currentFormat = formatEntity[0];
        formatLabelView.childNodes[0].className = "formatLabelSelected";
    }
    containerView.appendChild(formatLabelView);
    containerView.appendChild(createFormatGiftItemView(currentFormat));
    containerView.appendChild(createFormatExpressItemView(currentFormat));
    containerView.appendChild(createFormatDiscountItemView(currentFormat));
}

function createFormatGiftItemView(formatEntity) {
    let formatGiftView = document.createElement("div");
    formatGiftView.className = "formatItem";
    let formatGiftLabel = document.createElement("div");
    formatGiftLabel.className = "formatLabel formatExpendLabel";
    formatGiftLabel.innerHTML = "满 " + formatEntity.giftCount + " 赠送 " + formatEntity.giftLabel;
    formatGiftView.appendChild(formatGiftLabel);
    return formatGiftView;
}

function createFormatExpressItemView(formatEntity) {
    let formatExpressView = document.createElement("div");
    formatExpressView.className = "formatItem";
    let formatExpressLabel = document.createElement("div");
    formatExpressLabel.className = "formatLabel formatExpendLabel";
    formatExpressLabel.innerHTML = "满 " + formatEntity.expressCount + " 包邮 " + formatEntity.expressName;
    formatExpressView.appendChild(formatExpressLabel);
    return formatExpressView;
}

function createFormatDiscountItemView(formatEntity) {
    let formatDiscountView = document.createElement("div");
    formatDiscountView.className = "formatItem";

    if (formatEntity.price != formatEntity.pricing){
        /**
         * 定价
         */
        let formatPriceLabel = document.createElement("div");
        formatPriceLabel.className = "formatLabel";
        formatPriceLabel.style.cursor = "default";
        let formatPriceContent = document.createElement("div");
        formatPriceContent.className = "formatLabel";
        formatPriceContent.style.cursor = "default";
        formatPriceContent.innerHTML = formatEntity.price + formatEntity.priceMeta;
        formatPriceLabel.appendChild(formatPriceContent);
        formatPriceContent.style.borderWidth = "0px";
        let formatPriceLine = document.createElement("hr");
        formatPriceLine.className = "diagonal";
        formatPriceLabel.appendChild(formatPriceLine);
        formatDiscountView.appendChild(formatPriceLabel);
    }
    /**
     * 现价
     */
    let formatPricingLabel = document.createElement("div");
    formatPricingLabel.className = "formatLabel";
    formatPricingLabel.style.cursor = "default";
    formatPricingLabel.innerHTML = formatEntity.pricing + formatEntity.priceMeta;
    formatDiscountView.appendChild(formatPricingLabel);

    /**
     * 计数器
     */
    let formatCounterView = document.createElement("div");
    formatCounterView.className = "formatLabel";
    /**
     * 数值区
     */
    let formatCounterEdit = document.createElement("input");
    formatCounterEdit.style.width = "48px";
    formatCounterEdit.style.height = "26px";
    formatCounterEdit.style.borderWidth = "0px";
    formatCounterEdit.style.marginRight = "0px";
    formatCounterEdit.style.textAlign = "center";
    formatCounterEdit.style.fontSize = "1rem";
    formatCounterEdit.readOnly = "true";
    formatCounterEdit.value = 1;
    formatCounterView.appendChild(formatCounterEdit);
    /**
     * 操作区
     */
    let formatCounterOperator = document.createElement("div");
    formatCounterOperator.className = "formatLabel";
    formatCounterOperator.style.width = "30px";
    formatCounterOperator.style.borderWidth = "0px";
    formatCounterOperator.style.marginRight = "0px";
    formatCounterOperator.style.float = "right";
    let formatCounterAdd = document.createElement("div");
    formatCounterAdd.className = "counter";
    formatCounterAdd.style.borderTopWidth = "0px";
    formatCounterAdd.style.borderRightWidth = "0px";
    formatCounterAdd.innerHTML = "+";
    formatCounterAdd.onclick = function () {
        formatCounterEdit.value = parseInt(formatCounterEdit.value) + 1;
    };
    formatCounterOperator.appendChild(formatCounterAdd);
    let formatCounterMinus = document.createElement("div");
    formatCounterMinus.className = "counter";
    formatCounterMinus.style.borderRightWidth = "0px";
    formatCounterMinus.style.borderBottomWidth = "0px";
    formatCounterMinus.innerHTML = "-";
    formatCounterMinus.onclick = function () {
        if (parseInt(formatCounterEdit.value) > 1){
            formatCounterEdit.value = parseInt(formatCounterEdit.value) - 1;
        }
    };
    formatCounterOperator.appendChild(formatCounterMinus);
    formatCounterView.appendChild(formatCounterOperator);
    formatDiscountView.appendChild(formatCounterView);

    let buyNow = document.createElement("div");
    buyNow.className = "formatLabel button";
    buyNow.innerHTML = "立即购买";
    formatDiscountView.appendChild(buyNow);

    let putInCart = document.createElement("div");
    putInCart.className = "formatLabel button";
    putInCart.innerHTML = "加入购物车";

    formatDiscountView.appendChild(putInCart);

    return formatDiscountView;
}