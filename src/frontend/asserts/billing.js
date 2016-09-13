/**
 * Created by dingpengwei on 8/23/16.
 */
window.onload = function () {
    initTitleView();
    requestLinker();
    requestBilling();
};

function requestBilling() {
    let accountId = document.getElementById("accountId") == undefined ? null : document.getElementById("accountId").content;
    let params = undefined;
    if (accountId == undefined || accountId == null || accountId == "") {
        let formatIds = document.getElementById("productIds") == undefined ? null : document.getElementById("productIds").content;
        params = "billing?productIds=" + formatIds;
    } else {
        let mappingIds = document.getElementById("productIds") == undefined ? null : document.getElementById("productIds").content;
        params = "billing?accountId=test&productIds=" + mappingIds;
    }

    let url = BASE_PATH + params;
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            onRequestBillingCallback(jsonData.data);
        }
    }, onErrorCallback, onTimeoutCallback);
}

function onRequestBillingCallback(data) {
    let accountId = document.getElementById("accountId") == undefined ? null : document.getElementById("accountId").content;
    if (accountId == undefined) {
        createBillingByAnonymous(data);
    } else {
        createBillingByUser(data);
    }
}

function requestCreateOrder(accountId,formatId, senderName, senderPhone, name, phone0, phone1, province, city, county, town, village, append) {
    let url = BASE_PATH + "order/create?senderName=" + senderName
        + "&senderPhone=" + senderPhone
        + "&cost=1234&postage=123"
        + "&formatId=" + formatId
        + "&name=" + name
        + "&phone0=" + phone0
        + "&phone1=" + phone1
        + "&province=" + province
        + "&city=" + city
        + "&county=" + county
        + "&town=" + town
        + "&village=" + village
        + "&append=" + append;
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            onRequestCreateOrderCallback(jsonData.data);
        }
    }, onErrorCallback, onTimeoutCallback);
}

let orderId = undefined;
function onRequestCreateOrderCallback(data) {
    console.log(data);
    orderId = data.orderId;
    showPaymentView(function () {
        let url = BASE_PATH + "pq?orderId=" + data.orderId;
        window.open(url, "_self");
    });
}

/**
 * 创建匿名支付信息
 * @param data
 */
function createBillingByAnonymous(data) {
    let mainView = document.getElementById(MAIN);
    mainView.innerHTML = null;

    let receiverView = createAnonymousReceiverContainer();
    mainView.appendChild(receiverView);

    let payStyleView = createPayStyleContainer();
    mainView.appendChild(payStyleView);

    let productView = createProductContainer(data.products);
    mainView.appendChild(productView);

    let payBarView = createPayBarContainer(data);
    mainView.appendChild(payBarView);

    mainView.style.height = receiverView.clientHeight + payStyleView.clientHeight + productView.clientHeight + payBarView.clientHeight + "px";
}

/**
 * 创建用户支付信息
 * @param data
 */
function createBillingByUser(data) {

    let mainView = document.getElementById(MAIN);
    mainView.innerHTML = null;

    let receiverView = createUserReceiverContainer(data);
    mainView.appendChild(receiverView);

    let payStyleView = createPayStyleContainer();
    mainView.appendChild(payStyleView);

    let productView = createProductContainer(data.products);
    mainView.appendChild(productView);

    let payBarView = createPayBarContainer(data);
    mainView.appendChild(payBarView);

    mainView.style.height = receiverView.clientHeight + payStyleView.clientHeight + productView.clientHeight + payBarView.clientHeight + "px";
}

function createAnonymousReceiverContainer() {
    let receiverContainer = document.createElement("div");
    receiverContainer.className = "receiverContainer containerStyle";
    let receiverMessage = document.createElement("div");
    receiverMessage.className = "messageLabel";
    receiverMessage.innerHTML = "购买人信息<span style='color: #FF0000;'>（为了能和您取得联系请填写真实信息，如不填写则认为购买和收货是同一人）</span>";
    receiverContainer.appendChild(receiverMessage);

    let buyerInfoMessageLine = document.createElement("div");
    buyerInfoMessageLine.className = "messageLabel";
    buyerInfoMessageLine.style.height = "35px";
    buyerInfoMessageLine.style.marginTop = "5px";
    let buyerNameLabel = document.createElement("div");
    buyerNameLabel.className = "messageLabelInItem";
    buyerNameLabel.style.marginTop = "0px";
    buyerNameLabel.style.marginLeft = "0px";
    buyerNameLabel.innerHTML = "姓名:";
    buyerInfoMessageLine.appendChild(buyerNameLabel);
    let buyerNameEditor = document.createElement("input");
    buyerNameEditor.id = "senderName";
    buyerNameEditor.className = "editor";
    buyerNameEditor.style.float = "left";
    buyerNameEditor.style.marginRight = "20px";
    buyerInfoMessageLine.appendChild(buyerNameEditor);
    let buyerPhoneLabel = document.createElement("div");
    buyerPhoneLabel.className = "messageLabelInItem";
    buyerPhoneLabel.style.marginTop = "0px";
    buyerPhoneLabel.innerHTML = "电话:";
    buyerInfoMessageLine.appendChild(buyerPhoneLabel);
    let buyerPhoneEditor = document.createElement("input");
    buyerPhoneEditor.id = "senderPhone";
    buyerPhoneEditor.className = "editor";
    buyerPhoneEditor.style.float = "left";
    buyerInfoMessageLine.appendChild(buyerPhoneEditor);
    receiverContainer.appendChild(buyerInfoMessageLine);

    let receiverInfoMessageLine = document.createElement("div");
    receiverInfoMessageLine.className = "messageLabel";
    receiverInfoMessageLine.style.height = "40px";
    receiverInfoMessageLine.style.lineHeight = "40px";
    receiverInfoMessageLine.style.borderWidth = "1px";
    receiverInfoMessageLine.style.fontSize = "0.8rem";
    receiverInfoMessageLine.style.cursor = "pointer";
    receiverInfoMessageLine.style.borderColor = "#FF0000";
    receiverInfoMessageLine.innerHTML = "点击编辑收货人信息";
    receiverInfoMessageLine.onclick = function () {
        showReceiverEditorView(
            document.getElementById("RName") == undefined ? undefined : document.getElementById("RName").innerHTML,
            document.getElementById("RProvince") == undefined ? undefined : document.getElementById("RProvince").innerHTML,
            document.getElementById("RCity") == undefined ? undefined : document.getElementById("RCity").innerHTML,
            document.getElementById("RCounty") == undefined ? undefined : document.getElementById("RCounty").innerHTML,
            document.getElementById("RTown") == undefined ? undefined : document.getElementById("RTown").innerHTML,
            document.getElementById("RVillage") == undefined ? undefined : document.getElementById("RVillage").innerHTML,
            document.getElementById("RAppend") == undefined ? undefined : document.getElementById("RAppend").innerHTML,
            document.getElementById("RPhone") == undefined ? undefined : document.getElementById("RPhone").innerHTML,
            document.getElementById("RPhoneBak") == undefined ? undefined : document.getElementById("RPhoneBak").innerHTML,
            function (name, province, city, county, town, village, append, phone, phoneBak) {
                console.log(name + " ; " + province + " ; " + city + " ; " + county + " ; " + town + " ; " + village + " ; " + append + " ; " + phone + " ; " + phoneBak);
                receiverInfoMessageLine.innerHTML = null;
                receiverInfoMessageLine.style.fontSize = "1rem";
                let nameLabel = document.createElement("div");
                nameLabel.id = "RName";
                nameLabel.className = "messageLabelInItem";
                nameLabel.style.borderWidth = "1px";
                nameLabel.innerHTML = name;
                let provinceLabel = document.createElement("div");
                provinceLabel.id = "RProvince";
                provinceLabel.className = "messageLabelInItem";
                provinceLabel.innerHTML = province;
                let cityLabel = document.createElement("div");
                cityLabel.id = "RCity";
                cityLabel.className = "messageLabelInItem";
                cityLabel.innerHTML = city;
                let countyLabel = document.createElement("div");
                countyLabel.id = "RCounty";
                countyLabel.className = "messageLabelInItem";
                countyLabel.innerHTML = county;
                let townLabel = document.createElement("div");
                townLabel.id = "RTown";
                townLabel.className = "messageLabelInItem";
                townLabel.innerHTML = town;
                let villageLabel = document.createElement("div");
                villageLabel.id = "RVillage";
                villageLabel.className = "messageLabelInItem";
                villageLabel.innerHTML = village;
                let appendLabel = document.createElement("div");
                appendLabel.id = "RAppend";
                appendLabel.className = "messageLabelInItem";
                appendLabel.innerHTML = append;
                let phoneLabel = document.createElement("div");
                phoneLabel.id = "RPhone";
                phoneLabel.className = "messageLabelInItem";
                phoneLabel.innerHTML = phone;
                let phoneBakLabel = document.createElement("div");
                phoneBakLabel.id = "RPhoneBak";
                phoneBakLabel.className = "messageLabelInItem";
                phoneBakLabel.innerHTML = phoneBak;
                receiverInfoMessageLine.appendChild(nameLabel);
                receiverInfoMessageLine.appendChild(phoneLabel);
                receiverInfoMessageLine.appendChild(phoneBakLabel);
                receiverInfoMessageLine.appendChild(provinceLabel);
                receiverInfoMessageLine.appendChild(cityLabel);
                receiverInfoMessageLine.appendChild(countyLabel);
                receiverInfoMessageLine.appendChild(townLabel);
                receiverInfoMessageLine.appendChild(villageLabel);
                receiverInfoMessageLine.appendChild(appendLabel);

            });
    };
    receiverContainer.appendChild(receiverInfoMessageLine);

    return receiverContainer;
}

function createUserReceiverContainer(data) {
    let receiverContainer = document.createElement("div");
    receiverContainer.className = "receiverContainer containerStyle";
    let receiverMessage = document.createElement("div");
    receiverMessage.className = "messageLabel";
    receiverMessage.innerHTML = "收货人信息";
    receiverContainer.appendChild(receiverMessage);

    let currentReceiverContainer = document.createElement("div");
    currentReceiverContainer.className = "payBarContainer";
    currentReceiverContainer.style.width = "998px";
    currentReceiverContainer.style.cursor = "pointer";
    currentReceiverContainer.style.borderColor = "red";
    receiverContainer.appendChild(currentReceiverContainer);

    let moreReceiverContainer = document.createElement("div");
    moreReceiverContainer.className = "messageLabel";
    moreReceiverContainer.style.width = "120px";
    moreReceiverContainer.style.height = "40px";
    moreReceiverContainer.style.lineHeight = "40px";
    moreReceiverContainer.innerHTML = "更多收货地址 ︾ ";
    moreReceiverContainer.style.cursor = "pointer";
    moreReceiverContainer.status = "less";
    receiverContainer.appendChild(moreReceiverContainer);
    moreReceiverContainer.onclick = function () {
        if (this.status == "less") {
            moreReceiverContainer.innerHTML = "更多收货地址 ︾ ";
            this.status = "more";
            receiverContainer.style.height = "210px";
            let mainView = document.getElementById(MAIN);
            mainView.style.height = mainView.clientHeight + 90 + "px";
        } else if (this.status == "more") {
            moreReceiverContainer.innerHTML = "更多收货地址 ︽ ";
            this.status = "less";
            receiverContainer.style.height = "120px";
            let mainView = document.getElementById(MAIN);
            mainView.style.height = mainView.clientHeight - 90 + "px";
        }
    };
    receiverContainer.style.height = "120px";
    return receiverContainer;
}

/**
 * 创建支付类型
 * @returns {Element}
 */
function createPayStyleContainer() {
    let payStyleContainer = document.createElement("div");
    payStyleContainer.className = "payStyleContainer containerStyle";

    let payStyleMessage = document.createElement("div");
    payStyleMessage.className = "messageLabel";
    payStyleMessage.innerHTML = "请选择支付方式";
    payStyleContainer.appendChild(payStyleMessage);

    let payStyleView = document.createElement("div");
    payStyleView.className = "messageLabel";
    payStyleView.style.height = "120px";

    let payWei = document.createElement("img");
    payWei.className = "payStyleSelect";
    payWei.src = "http://localhost:8080/foodslab/webapp/asserts/images/paywei.png";
    payWei.style.marginRight = "20px";

    let payZhi = document.createElement("img");
    payZhi.className = "payStyleNormal";
    payZhi.src = "http://localhost:8080/foodslab/webapp/asserts/images/payzhi.png";
    payStyleView.appendChild(payWei);
    payStyleView.appendChild(payZhi);
    payStyleContainer.appendChild(payStyleView);

    payWei.onclick = function () {
        payWei.className = "payStyleSelect";
        payZhi.className = "payStyleNormal";
    };
    payZhi.onclick = function () {
        payZhi.className = "payStyleSelect";
        payWei.className = "payStyleNormal";
    };

    return payStyleContainer;
}

function createProductContainer(data) {
    let productContainer = document.createElement("div");
    productContainer.className = "productContainer containerStyle";
    let listMessage = document.createElement("div");
    listMessage.className = "messageLabel";
    listMessage.innerHTML = "发货清单";
    productContainer.appendChild(listMessage);

    for (let i = 0; i < data.length; i++) {
        let product = data[i];
        console.log(product);
        let productItemContainer = document.createElement("div");
        productItemContainer.className = "productItemView";

        let productImg = document.createElement("div");
        productImg.className = "productImg";
        productItemContainer.appendChild(productImg);

        let productName = document.createElement("div");
        productName.className = "messageLabelInItem";
        productName.style.width = "470px";
        productName.innerHTML = product.seriesName + " " + product.typeName + " " + product.formatName + product.formatMeta;
        productItemContainer.appendChild(productName);

        let productPricing = document.createElement("div");
        productPricing.className = "messageLabelInItem";
        productPricing.style.width = "190px";
        productPricing.style.textAlign = "center";
        productPricing.innerHTML = product.pricing + product.priceMeta;
        productItemContainer.appendChild(productPricing);

        let productAmount = document.createElement("div");
        productAmount.className = "messageLabelInItem";
        productAmount.style.width = "190px";
        productAmount.style.textAlign = "center";
        productAmount.innerHTML = product.amount;
        productItemContainer.appendChild(productAmount);

        productContainer.appendChild(productItemContainer);
    }

    productContainer.style.height = 120 * data.length + 40 + "px";
    return productContainer;
}

function createPayBarContainer(data) {
    let payBarContainer = document.createElement("div");
    payBarContainer.className = "payBarContainer";
    payBarContainer.style.borderWidth = "0px";

    let payAction = document.createElement("div");
    payAction.className = "payBarItem";
    payAction.style.backgroundColor = "red";
    payAction.style.color = "#FFFFFF";
    payAction.style.textAlign = "center";
    payAction.style.cursor = "pointer";
    payAction.innerHTML = "结算";
    payAction.onclick = function () {
        onPayActionClick();
    };
    payBarContainer.appendChild(payAction);

    let buyInfoView = document.createElement("div");
    buyInfoView.className = "payBarContainer";
    buyInfoView.style.width = "798px";
    let postage = document.createElement("div");
    postage.className = "payBarItem";
    postage.innerHTML = "运费:";
    buyInfoView.appendChild(postage);

    let price = document.createElement("div");
    price.className = "payBarItem";
    price.innerHTML = "商品总价:";
    buyInfoView.appendChild(price);

    let amount = document.createElement("div");
    amount.className = "payBarItem";
    amount.innerHTML = "共选购" + "N" + "件商品";
    buyInfoView.appendChild(amount);

    payBarContainer.appendChild(buyInfoView);

    return payBarContainer;
}

function onPayActionClick() {
    let name = document.getElementById("RName") == undefined ? undefined : document.getElementById("RName").innerHTML;
    let province = document.getElementById("RProvince") == undefined ? undefined : document.getElementById("RProvince").innerHTML;
    let city = document.getElementById("RCity") == undefined ? undefined : document.getElementById("RCity").innerHTML;
    let county = document.getElementById("RCounty") == undefined ? undefined : document.getElementById("RCounty").innerHTML;
    let town = document.getElementById("RTown") == undefined ? undefined : document.getElementById("RTown").innerHTML;
    let village = document.getElementById("RVillage") == undefined ? undefined : document.getElementById("RVillage").innerHTML;
    let append = document.getElementById("RAppend") == undefined ? undefined : document.getElementById("RAppend").innerHTML;
    let phone0 = document.getElementById("RPhone") == undefined ? undefined : document.getElementById("RPhone").innerHTML;
    let phone1 = document.getElementById("RPhoneBak") == undefined ? undefined : document.getElementById("RPhoneBak").innerHTML;

    if (isNullValue(name)) {
        new Toast().show("请输入收货人姓名");
        return;
    }

    if (isNullValue(phone0)) {
        new Toast().show("请输入收货人电话");
        return;
    }

    if (isNullValue(province)) {
        new Toast().show("请完善收货人地址");
        return;
    }

    if (isNullValue(city)) {
        new Toast().show("请完善收货人地址");
        return;
    }

    if (isNullValue(county)) {
        new Toast().show("请完善收货人地址");
        return;
    }

    if (isNullValue(town)) {
        new Toast().show("请完善收货人地址");
        return;
    }

    if (isNullValue(village)) {
        new Toast().show("请完善收货人地址");
        return;
    }

    let senderName = document.getElementById("senderName").value;
    let senderPhone = document.getElementById("senderPhone").value;
    let formatId = document.getElementById("formatId").value;
    
    requestCreateOrder(formatId, senderName, senderPhone, name, phone0, phone1, province, city, county, town, village, append);

}