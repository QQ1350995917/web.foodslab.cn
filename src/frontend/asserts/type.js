/**
 * Created by dingpengwei on 8/22/16.
 */
window.onload = function () {
    initTitleView();
    requestType(document.getElementById("seriesId") == undefined ? null : document.getElementById("seriesId").content);
    requestLinker();
};

function requestType(seriesId) {
    let url = BASE_PATH + "product/type?typeId=113df3d5-bfbe-4350-aa6f-d20064bc25af";
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
    createFormatView(formatEntitiesView, data.child.children, undefined);
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

    let formatGiftView = document.createElement("div");
    formatGiftView.className = "formatItem";
    formatGiftView.innerHTML = "满 " + currentFormat.giftCount + " 赠送 " + currentFormat.giftLabel;
    let formatExpressView = document.createElement("div");
    formatExpressView.className = "formatItem";
    formatExpressView.innerHTML = "满 " + currentFormat.expressCount + " 包邮 " + currentFormat.expressName;
    let formatDiscountView = document.createElement("div");
    formatDiscountView.className = "formatItem";

    containerView.appendChild(formatLabelView);
    containerView.appendChild(formatGiftView);
    containerView.appendChild(formatExpressView);
    containerView.appendChild(formatDiscountView);
}