/**
 * Created by dingpengwei on 9/6/16.
 */
window.onload = function () {
    initTitleView();
    requestCart(document.getElementById("accountId") == undefined ? null : document.getElementById("accountId").content);
    requestLinker();
};

function requestCart(accountId) {
    let url = BASE_PATH + "cart/retrieve?accountId=" + accountId;
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            onRequestCartCallback(jsonData.data);
        }
    }, onErrorCallback, onTimeoutCallback);
}

function onRequestCartCallback(data) {
    if (data == undefined || data.length == 0) {
        createEmptyCartView();
    } else {
        createMainTitleView();
        createMainContentView(data);
        createMainFloatView();
    }
}

function createEmptyCartView() {

}

function createMainTitleView() {
    let titleView = document.createElement("div");
    titleView.className = "titleView";
    let selectAll = document.createElement("input");
    selectAll.type = "checkbox";
    selectAll.className = "selector";
    titleView.appendChild(selectAll);
    let selectorText = document.createElement("div");
    selectorText.className = "label";
    selectorText.style.width = "84px";
    selectorText.style.textAlign = "left";
    selectorText.innerHTML = "全选";
    titleView.appendChild(selectorText);

    let productName = document.createElement("div");
    productName.className = "label";
    productName.style.width = "450px";
    productName.style.textAlign = "left";
    productName.innerHTML = "商品";
    titleView.appendChild(productName);

    let price = document.createElement("div");
    price.className = "label";
    price.innerHTML = "单价";
    titleView.appendChild(price);

    let totalNumber = document.createElement("div");
    totalNumber.className = "label";
    totalNumber.innerHTML = "数量";
    titleView.appendChild(totalNumber);

    let totalPrice = document.createElement("div");
    totalPrice.className = "label";
    totalPrice.innerHTML = "小计";
    titleView.appendChild(totalPrice);

    let action = document.createElement("div");
    action.className = "label";
    action.innerHTML = "操作";
    titleView.appendChild(action);

    let mainView = document.getElementById(MAIN);
    mainView.appendChild(titleView);
}

function createMainContentView(data) {
    let mainView = document.getElementById(MAIN);
    let itemEntity;
    for (let i = 0; i < data.length; i++) {
        itemEntity = data[i];
        let itemView = document.createElement("div");
        itemView.className = "itemView";
        let selector = document.createElement("input");
        selector.type = "checkbox";
        selector.className = "selector";
        itemView.appendChild(selector);

        let itemIcon = document.createElement("img");
        itemIcon.className = "itemIcon";
        itemIcon.onclick = function () {
            let url = BASE_PATH + "pd?typeId=" + itemEntity.product.parent.typeId + "&formatId=" + itemEntity.product.formatId;
            window.open(url);
        }
        itemView.appendChild(itemIcon);


        let productName = document.createElement("div");
        productName.className = "label";
        productName.style.width = "450px";
        productName.style.textAlign = "left";
        productName.innerHTML = " " + itemEntity.product.parent.label + " " + itemEntity.product.label + itemEntity.product.meta;
        productName.style.cursor = "pointer";
        productName.onclick = function () {
            let url = BASE_PATH + "pd?typeId=" + itemEntity.product.parent.typeId + "&formatId=" + itemEntity.product.formatId;
            window.open(url);
        };
        itemView.appendChild(productName);

        let price = document.createElement("div");
        price.className = "label";
        price.innerHTML = itemEntity.product.pricing + itemEntity.product.priceMeta;
        itemView.appendChild(price);

        let totalNumber = document.createElement("div");
        totalNumber.className = "label";
        totalNumber.innerHTML = itemEntity.amount;
        itemView.appendChild(totalNumber);

        let totalPrice = document.createElement("div");
        totalPrice.className = "label";
        totalPrice.innerHTML = (itemEntity.amount * itemEntity.product.pricing) + itemEntity.product.priceMeta;
        itemView.appendChild(totalPrice);

        let deleteAction = document.createElement("div");
        deleteAction.className = "label";
        deleteAction.style.color = "#666666";
        deleteAction.style.cursor = "pointer";
        deleteAction.innerHTML = "删除";
        deleteAction.onclick = function () {

        };
        itemView.appendChild(deleteAction);

        mainView.appendChild(itemView);

    }

    mainView.style.height = 50 + data.length * 100 + "px";
}

function createMainFloatView() {
    console.log(margintop);
    let mainView = document.getElementById(MAIN);

    let titleView = document.createElement("div");
    titleView.className = "billingBar";
    let selectAll = document.createElement("input");
    selectAll.type = "checkbox";
    selectAll.className = "selector";
    titleView.appendChild(selectAll);

    let selectorText = document.createElement("div");
    selectorText.className = "label";
    selectorText.style.width = "40px";
    selectorText.style.textAlign = "left";
    selectorText.innerHTML = "全选";
    titleView.appendChild(selectorText);


    let deleteSelect = document.createElement("div");
    deleteSelect.className = "label";
    deleteSelect.style.width = "100px";
    deleteSelect.style.textAlign = "left";
    deleteSelect.innerHTML = "删除选中商品";
    titleView.appendChild(deleteSelect);

    let productName = document.createElement("div");
    productName.className = "label";
    productName.style.width = "414px";
    productName.innerHTML = "已经选择N件商品";
    titleView.appendChild(productName);

    let price = document.createElement("div");
    price.className = "label";
    price.style.width = "200px";
    price.innerHTML = "总价(不含运费):8888元";
    titleView.appendChild(price);

    let totalNumber = document.createElement("div");
    totalNumber.className = "label";
    totalNumber.innerHTML = "运费:123元";
    titleView.appendChild(totalNumber);

    let action = document.createElement("div");
    action.className = "label";
    action.style.backgroundColor = "red";
    action.style.color = "#FFFFFF";
    action.innerHTML = "结算";
    titleView.appendChild(action);

    mainView.appendChild(titleView);
    mainView.style.height = mainView.clientHeight + 40 + "px";

    document.getElementById("header_icon").innerHTML = "clientHeight = " + document.body.clientHeight + " ; scrollHeight = " + document.body.scrollTop + " ; availHeight = " + window.screen.availHeight;
    window.onscroll = function () {
        document.getElementById("header_icon").innerHTML = "clientHeight = " + document.body.clientHeight + " ; scrollHeight = " + document.body.scrollTop + " ; availHeight = " + window.screen.availHeight;
        // document.getElementById("header_icon").innerHTML = "height = " + (mainView.clientHeight - document.body.scrollTop - window.screen.availHeight + 207);
        if (mainView.clientHeight - document.body.scrollTop < window.screen.availHeight) {
        } else {
        }
    };

    window.onresize = function () {
        document.getElementById("header_icon").innerHTML = "clientHeight = " + document.body.clientHeight + " ; scrollHeight = " + document.body.scrollTop + " ; availHeight = " + window.screen.availHeight;
        // console.log(document.body.offsetHeight  + "clientHeight = " + document.body.clientHeight + " ; scrollHeight = " + document.body.scrollTop + " ; availHeight = " + window.screen.availHeight);
        console.log(window.screen.availHeight + " = " + window.screen.height);
        // document.getElementById("header_icon").innerHTML = "clientHeight = " + document.body.clientHeight + " ; scrollHeight = " + document.body.scrollTop + " ; availHeight = " + window.screen.availHeight;
    };

}

