/**
 * Created by dingpengwei on 8/19/16.
 */
window.onload = function () {
    initTitleView();
    requestSeries();
    requestPoster();
    requestRecommend();
    requestLinker();
};

function requestSeries() {
    let url = BASE_PATH + "product/series";
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            createSeriesView(jsonData.data);
        }
    }, onErrorCallback, onTimeoutCallback);
}

function requestPoster() {
    let url = BASE_PATH + "poster";
}

function requestRecommend() {
    let url = BASE_PATH + "product/recommend";
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            createRecommendView(jsonData.data);
        }
    }, onErrorCallback, onTimeoutCallback);
}

function createSeriesView(seriesEntities) {
    let seriesEntitiesView = document.getElementById(HEADER_MENU_DOWN);
    for (let i = 0; i < seriesEntities.length; i++) {
        let seriesEntityView = document.createElement("div")
        seriesEntityView.className = "tabItem_normal";
        seriesEntityView.innerHTML = seriesEntities[i].label;
        seriesEntityView.onclick = function () {
            let url = BASE_PATH + "ps?seriesId=" + seriesEntities[i].seriesId;
            window.open(url);
        };
        seriesEntitiesView.appendChild(seriesEntityView);
    }
}

function createPosterView(posterEntities) {

}

function createRecommendView(formatEntities) {
    let formatEntitiesView = document.createElement("div")
    for (let i = 0; i < formatEntities.length; i++) {
        if (i % 4 == 0) {
            let clearFloat = document.createElement("div")
            clearFloat.className = "clearFloat";
            formatEntitiesView.appendChild(clearFloat);
        }
        let formatEntityView = document.createElement("div")
        formatEntityView.className = "productItem";
        let formatEntityTitleView = document.createElement("div")
        formatEntityTitleView.className = "productItem_title";
        formatEntityTitleView.style.backgroundColor = COLORS[Math.floor(Math.random()*10)];
        formatEntityTitleView.innerHTML = formatEntities[i].parent.parent.label;
        formatEntityTitleView.onclick = function () {
            let url = BASE_PATH + "ps?seriesId=" + formatEntities[i].parent.parent.seriesId;
            window.open(url);
        };
        formatEntityView.appendChild(formatEntityTitleView);
        let formatEntityImageView = document.createElement("img")
        formatEntityImageView.className = "productItem_img";
        formatEntityImageView.onclick = function () {
            let url = BASE_PATH + "pd?formatId=" + formatEntities[i].formatId;
            window.open(url);
        };
        formatEntityView.appendChild(formatEntityImageView);
        let formatEntityLinkView = document.createElement("div")
        formatEntityLinkView.className = "productItem_link";
        let formatEntityTypeLabel = document.createElement("div")
        formatEntityTypeLabel.className = "productItem_link_label";
        formatEntityTypeLabel.innerHTML = formatEntities[i].parent.label;
        formatEntityLinkView.appendChild(formatEntityTypeLabel);
        let formatEntityFormatLabel = document.createElement("div")
        formatEntityFormatLabel.className = "productItem_link_label";
        formatEntityFormatLabel.innerHTML = formatEntities[i].label + formatEntities[i].meta;
        formatEntityLinkView.appendChild(formatEntityFormatLabel);
        let formatEntityPriceLabel = document.createElement("div")
        formatEntityPriceLabel.className = "productItem_link_label";
        formatEntityPriceLabel.innerHTML = formatEntities[i].price + formatEntities[i].pricingMeta;
        formatEntityLinkView.appendChild(formatEntityPriceLabel);
        formatEntityView.appendChild(formatEntityLinkView);
        formatEntityLinkView.onclick = function () {
            let url = BASE_PATH + "pd?formatId=" + formatEntities[i].formatId;
            window.open(url);
        };
        let formatEntityBuyView = document.createElement("div")
        formatEntityBuyView.className = "productItem_buy";
        formatEntityBuyView.innerHTML = "立即购买";
        formatEntityBuyView.onclick = function () {
            let url = BASE_PATH + "pb?formatId=" + formatEntities[i].formatId;
            window.open(url);
        };
        formatEntityView.appendChild(formatEntityBuyView);
        formatEntitiesView.appendChild(formatEntityView);
    }
    let mainView = document.getElementById(MAIN);
    let rowNum = (formatEntities.length / 4) + (formatEntities.length % 4 == 0 ? 0 : 1);
    mainView.style.height = rowNum * 400 + rowNum * 2 + "px";
    document.getElementById(MAIN).appendChild(formatEntitiesView);
}
