/**
 * Created by dingpengwei on 8/21/16.
 */
window.onload = function () {
    initTitleView();
    requestSeries(document.getElementById("seriesId") == undefined ? null : document.getElementById("seriesId").content);
    requestLinker();
};

function requestSeries(seriesId) {
    let url = BASE_PATH + "product/series?seriesId=" + seriesId;
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            createSeriesView(jsonData.data);
        }
    }, onErrorCallback, onTimeoutCallback);
}

function createSeriesView(seriesEntities) {
    let seriesEntitiesView = document.getElementById(HEADER_MENU_DOWN);
    seriesEntitiesView.innerHTML = null;
    for (let i = 0; i < seriesEntities.length; i++) {
        let seriesEntityView = document.createElement("div")
        if (seriesEntities[i].children != undefined && seriesEntities[i].children.length > 0) {
            seriesEntityView.className = "tabItem_selected";
            createProductView(seriesEntities[i].children);
        } else {
            seriesEntityView.className = "tabItem_normal";
        }
        seriesEntityView.onclick = function () {
            // for (let j = 0; j < seriesEntitiesView.childNodes.length; j++) {
            //     seriesEntitiesView.childNodes[j].className = "tabItem_normal";
            //     if (i == j) {
            //         seriesEntitiesView.childNodes[j].className = "tabItem_selected";
            //     }
            // }
            requestSeries(seriesEntities[i].seriesId);
        };
        seriesEntityView.innerHTML = seriesEntities[i].label;
        seriesEntitiesView.appendChild(seriesEntityView);
    }


}


function createProductView(typeEntities) {
    let formatEntitiesView = document.createElement("div")
    let counter = 0;
    for (let i = 0; i < typeEntities.length; i++) {
        for (let j = 0; j < typeEntities[i].children.length; j++) {
            if (counter % 4 == 0) {
                let clearFloat = document.createElement("div")
                clearFloat.className = "clearFloat";
                formatEntitiesView.appendChild(clearFloat);
            }
            counter ++;

            let formatEntity = typeEntities[i].children[j];
            let formatEntityView = document.createElement("div")
            formatEntityView.className = "productItem";
            let formatEntityTitleView = document.createElement("div")
            formatEntityTitleView.className = "productItem_title";
            formatEntityTitleView.style.backgroundColor = COLORS[Math.floor(Math.random() * 10)];
            formatEntityTitleView.innerHTML = typeEntities[i].label;
            formatEntityTitleView.onclick = function () {

            };
            formatEntityView.appendChild(formatEntityTitleView);
            let formatEntityImageView = document.createElement("img")
            formatEntityImageView.className = "productItem_img";
            formatEntityImageView.onclick = function () {

            };
            formatEntityView.appendChild(formatEntityImageView);
            let formatEntityLinkView = document.createElement("div")
            formatEntityLinkView.className = "productItem_link";
            // let formatEntityTypeLabel = document.createElement("div")
            // formatEntityTypeLabel.className = "productItem_link_label";
            // formatEntityTypeLabel.innerHTML = formatEntity.label;
            //formatEntityLinkView.appendChild(formatEntityTypeLabel);
            let formatEntityFormatLabel = document.createElement("div")
            formatEntityFormatLabel.className = "productItem_link_label";
            formatEntityFormatLabel.innerHTML = formatEntity.label + formatEntity.meta;
            formatEntityLinkView.appendChild(formatEntityFormatLabel);
            let formatEntityPriceLabel = document.createElement("div")
            formatEntityPriceLabel.className = "productItem_link_label";
            formatEntityPriceLabel.innerHTML = formatEntity.price + formatEntity.pricingMeta;
            formatEntityLinkView.appendChild(formatEntityPriceLabel);
            formatEntityView.appendChild(formatEntityLinkView);
            formatEntityLinkView.onclick = function () {

            };
            let formatEntityBuyView = document.createElement("div")
            formatEntityBuyView.className = "productItem_buy";
            formatEntityBuyView.innerHTML = "立即购买";
            formatEntityBuyView.onclick = function () {
                let url = BASE_PATH + "pb?formatId=" + formatEntity.formatId;
                window.open(url);
            };
            formatEntityView.appendChild(formatEntityBuyView);
            formatEntitiesView.appendChild(formatEntityView);
        }
    }
    let mainView = document.getElementById(MAIN);
    mainView.innerHTML = null;
    let rowNum = Math.floor(counter / 4) + (counter % 4 == 0 ? 0 : 1);
    console.log(rowNum);
    mainView.style.height = rowNum * 400 + rowNum * 2 + "px";
    mainView.appendChild(formatEntitiesView);
}