/**
 * Created by dingpengwei on 8/23/16.
 */
window.onload = function () {
    initTitleView();
    createBillingView();
    requestLinker();
    let formatIds = document.getElementById("formatIds") == undefined ? null : document.getElementById("formatIds").content;
    requestFormat(formatIds);
};

function requestFormat(formatIds) {
    let url = "http://localhost:8080/foodslab/product/format?formatIds=" + formatIds;
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            createBillingList(jsonData.data);
        }
    }, onErrorCallback, onTimeoutCallback);
}

function createBillingList(data) {
    let billingList = document.getElementById("billingListContainer");
    let size = data.length;
    for (let i = 0; i < size; i++) {
        let formatEntity = data[i];
        let listMessage = document.createElement("div");
        listMessage.className = "productListItem";
        if (i == 0) {
            listMessage.style.borderTopWidth = "0px";
            listMessage.style.borderBottomWidth = "0px";
        } else {
            listMessage.style.borderBottomWidth = "0px";
        }

        let snap = document.createElement("img");
        snap.style.width = "99px";
        snap.style.height = "119px";
        snap.style.float = "left";
        let label = document.createElement("div");
        label.className = "messageLabelInline";
        label.style.width = "500px";
        label.innerHTML = formatEntity.parent.parent.label + " " + formatEntity.parent.label  + " " + formatEntity.label + formatEntity.meta;
        let price = document.createElement("div");
        price.className = "messageLabelInline";
        price.style.width = "170px";
        price.innerHTML = formatEntity.pricing + "" + formatEntity.priceMeta;
        let counter = document.createElement("div");
        counter.className = "messageLabelInline";
        counter.style.width = "170px";
        counter.innerHTML = " X" + formatEntity.amount;

        listMessage.appendChild(snap);
        listMessage.appendChild(label);
        listMessage.appendChild(price);
        listMessage.appendChild(counter);
        billingList.appendChild(listMessage);
    }

    billingList.style.height = 120 * size + 30 + "px";
    let mainView = document.getElementById(MAIN);
    mainView.style.height = mainView.clientHeight + 120 * (size - 1) + 30 + "px";
}

function createBillingView() {
    let mainView = document.getElementById(MAIN);

    let tip = document.createElement("div");
    tip.className = "messageLabel";
    tip.innerHTML = "填写并核对订单信息";
    mainView.appendChild(tip);

    let expressView = createExpressView()
    mainView.appendChild(expressView);
    let payStyleView = createPayStyleView();
    mainView.appendChild(payStyleView);
    let productView = createProductView();
    mainView.appendChild(productView);
    let paymentBar = createPaymentBarView();
    mainView.appendChild(paymentBar);

    mainView.style.height = 80 + expressView.clientHeight + payStyleView.clientHeight + productView.clientHeight + paymentBar.clientHeight + "px";

}

function createExpressView() {
    let expressContainer = document.createElement("div");
    expressContainer.className = "blockView";

    let buyerTipMessageLine = document.createElement("div");
    buyerTipMessageLine.className = "messageLabel";
    buyerTipMessageLine.innerHTML = "购买人信息<span style='color: #FF0000;'>（为了能和您取得联系请填写真实信息，如不填写则认为购买和收货是同一人）</span>";
    expressContainer.appendChild(buyerTipMessageLine);

    let buyerInfoMessageLine = document.createElement("div");
    buyerInfoMessageLine.className = "messageLabel";
    let buyerNameLabel = document.createElement("div");
    buyerNameLabel.className = "messageLabelInline";
    buyerNameLabel.style.marginLeft = "0px";
    buyerNameLabel.innerHTML = "姓名:";
    buyerInfoMessageLine.appendChild(buyerNameLabel);
    let buyerNameEditor = document.createElement("input");
    buyerNameEditor.className = "editor";
    buyerNameEditor.style.float = "left";
    buyerNameEditor.style.marginRight = "20px";
    buyerInfoMessageLine.appendChild(buyerNameEditor);
    let buyerPhoneLabel = document.createElement("div");
    buyerPhoneLabel.className = "messageLabelInline";
    buyerPhoneLabel.innerHTML = "电话:";
    buyerInfoMessageLine.appendChild(buyerPhoneLabel);
    let buyerPhoneEditor = document.createElement("input");
    buyerPhoneEditor.className = "editor";
    buyerPhoneEditor.style.float = "left";
    buyerInfoMessageLine.appendChild(buyerPhoneEditor);
    expressContainer.appendChild(buyerInfoMessageLine);

    let receiverTipMessageLine = document.createElement("div");
    receiverTipMessageLine.className = "messageLabel";
    receiverTipMessageLine.innerHTML = "收货人信息";
    expressContainer.appendChild(receiverTipMessageLine);

    let receiverInfoMessageLine = document.createElement("div");
    receiverInfoMessageLine.className = "messageLabel";
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
                nameLabel.className = "messageLabelInline";
                nameLabel.style.borderWidth = "1px";
                nameLabel.innerHTML = name;
                let provinceLabel = document.createElement("div");
                provinceLabel.id = "RProvince";
                provinceLabel.className = "messageLabelInline";
                provinceLabel.innerHTML = province;
                let cityLabel = document.createElement("div");
                cityLabel.id = "RCity";
                cityLabel.className = "messageLabelInline";
                cityLabel.innerHTML = city;
                let countyLabel = document.createElement("div");
                countyLabel.id = "RCounty";
                countyLabel.className = "messageLabelInline";
                countyLabel.innerHTML = county;
                let townLabel = document.createElement("div");
                townLabel.id = "RTown";
                townLabel.className = "messageLabelInline";
                townLabel.innerHTML = town;
                let villageLabel = document.createElement("div");
                villageLabel.id = "RVillage";
                villageLabel.className = "messageLabelInline";
                villageLabel.innerHTML = village;
                let appendLabel = document.createElement("div");
                appendLabel.id = "RAppend";
                appendLabel.className = "messageLabelInline";
                appendLabel.innerHTML = append;
                let phoneLabel = document.createElement("div");
                phoneLabel.id = "RPhone";
                phoneLabel.className = "messageLabelInline";
                phoneLabel.innerHTML = phone;
                let phoneBakLabel = document.createElement("div");
                phoneBakLabel.id = "RPhoneBak";
                phoneBakLabel.className = "messageLabelInline";
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
    expressContainer.appendChild(receiverInfoMessageLine);

    expressContainer.style.height = "130px";

    return expressContainer;
}
//
function createPayStyleView() {
    let payStyleContainer = document.createElement("div");
    payStyleContainer.className = "blockView";
    payStyleContainer.style.height = "160px";
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

    payWei.onclick = function () {
        payWei.className = "payStyleSelect";
        payZhi.className = "payStyleNormal";
    };
    payZhi.onclick = function () {
        payZhi.className = "payStyleSelect";
        payWei.className = "payStyleNormal";
    };

    payStyleContainer.appendChild(payStyleView);
    return payStyleContainer;
}

function createProductView() {
    let productContainer = document.createElement("div");
    productContainer.id = "billingListContainer";
    productContainer.className = "blockView";
    let listMessage = document.createElement("div");
    listMessage.className = "messageLabel";
    listMessage.innerHTML = "送货清单";
    productContainer.appendChild(listMessage);

    return productContainer;
}

function createPaymentBarView() {
    let payingContainer = document.createElement("div");
    payingContainer.className = "blockView";
    payingContainer.style.width = "998px";
    payingContainer.style.height = "40px";
    payingContainer.style.borderWidth = "1px";

    let payActionView = document.createElement("div");
    payActionView.className = "payBarItem";
    payActionView.style.backgroundColor = "#FF0000";
    payActionView.style.color = "#FFFFFF";
    payActionView.style.textAlign = "center";
    payActionView.style.cursor = "pointer";
    payActionView.innerHTML = "结算";
    payingContainer.appendChild(payActionView);

    let payPostageView = document.createElement("div");
    payPostageView.className = "payBarItem";
    payPostageView.innerHTML = "运费:";
    payingContainer.appendChild(payPostageView);

    let payPricingView = document.createElement("div");
    payPricingView.className = "payBarItem";
    payPricingView.innerHTML = "商品总价:";
    payingContainer.appendChild(payPricingView);

    let payCounterView = document.createElement("div");
    payCounterView.className = "payBarItem";
    payCounterView.innerHTML = "选购商品?件";
    payingContainer.appendChild(payCounterView);

    return payingContainer;
}

// let ADDRESS_LEVEL1 = undefined;
// function requestAddress() {
//     let url = BASE_PATH + "meta/address";
//     asyncRequestByGet(url, function (data) {
//         var result = checkResponseDataFormat(data);
//         if (result) {
//             var jsonData = JSON.parse(data);
//             ADDRESS_LEVEL1 = jsonData.data;
//             console.log(ADDRESS_LEVEL1);
//         }
//     }, onErrorCallback, onTimeoutCallback);
// }

