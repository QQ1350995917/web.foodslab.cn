/**
 * Created by dingpengwei on 8/30/16.
 */
window.onload = function () {
    initTitleView();
    createMenuDownView();
    requestRecommend();
    requestLinker();
    diversifyMainView();
    let orderId = document.getElementById("orderId") == undefined ? null : document.getElementById("orderId").content;
    if (orderId != null) {
        requestOrderByLean(orderId);
    }
};

function requestOrderByLean(orderId) {

}

function requestOrderByKey(key) {
    onRequestOrderByKeyCallback(key,undefined);
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

function onRequestOrderByKeyCallback(key,data) {
    let searchResultView = document.getElementById("searchResultView");
    searchResultView.innerHTML = null;
    if (searchResultView.clientHeight == 0){
        let mainView = document.getElementById(MAIN);
        mainView.style.height = mainView.clientHeight + 100 + "px";
    }
    if (data == undefined) {
        searchResultView.style.height = "100px";
        searchResultView.innerHTML = "没有查询到关于<span style='color: #FF0000'>" + key + "</span>的订单";
    } else {
        
    }


}

function createMenuDownView() {
    let searchContainer = document.createElement("div")
    searchContainer.className = "searchContainer";
    let searchInput = document.createElement("input")
    searchInput.className = "searchInput";
    searchInput.type = "text";
    let searchButton = document.createElement("div")
    searchButton.className = "searchButton";
    searchButton.innerHTML = "查询订单";
    searchButton.onclick = function () {
        requestOrderByKey(searchInput.value);
    };
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchButton);
    document.getElementById(HEADER_MENU_DOWN).appendChild(searchContainer);
    searchInput.focus();
}

function diversifyMainView() {
    let mainView = document.getElementById(MAIN);
    let searchResultView = document.createElement("div")
    searchResultView.id = "searchResultView";
    searchResultView.className = "searchResultView";
    mainView.appendChild(searchResultView);

    let recommendView = document.createElement("div")
    recommendView.className = "recommendView";
    recommendView.style.height = "430px";
    let recommendTitleView = document.createElement("div")
    recommendTitleView.innerHTML = "为您推荐";
    recommendTitleView.style.color = "black";
    recommendTitleView.style.height = "26px";
    let recommendContentView = document.createElement("div")
    recommendContentView.id = "recommendContentView";
    recommendView.appendChild(recommendTitleView);
    recommendView.appendChild(recommendContentView);
    mainView.appendChild(recommendView);
    mainView.style.height = searchResultView.clientHeight + recommendView.clientHeight + "px";
}

function createRecommendView(formatEntities) {
    let columns = 6;
    let height = 200;
    let formatEntitiesView = document.createElement("div")
    for (let i = 0; i < formatEntities.length; i++) {
        if (i % columns == 0) {
            let clearFloat = document.createElement("div")
            clearFloat.className = "clearFloat";
            formatEntitiesView.appendChild(clearFloat);
        }
        /**
         * 产品的图片
         */
        let formatEntityImageView = document.createElement("img")
        formatEntityImageView.className = "productItem_img";
        formatEntityImageView.style.width = "164.6px";
        formatEntityImageView.style.height = "200px";
        // formatEntityImageView.src = "http://www.foodslab.cn";
        formatEntityImageView.onclick = function () {
            let url = BASE_PATH + "pd?typeId=" + formatEntities[i].typeId + "&formatId=" + formatEntities[i].formatId;
            window.open(url,"_self");
        };
        formatEntitiesView.appendChild(formatEntityImageView);
    }
    let recommendContentView = document.getElementById("recommendContentView");
    let rowNum = Math.floor(formatEntities.length / columns) + (formatEntities.length % columns == 0 ? 0 : 1);
    recommendContentView.style.height = rowNum * height + rowNum * 2 + "px";
    recommendContentView.appendChild(formatEntitiesView);
}


