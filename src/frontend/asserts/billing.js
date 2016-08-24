/**
 * Created by dingpengwei on 8/23/16.
 */
window.onload = function () {
    initTitleView();
    createBillingView();
    requestLinker();
};

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
        showReceiverEditorView();        
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
    productContainer.className = "blockView";
    let listMessage = document.createElement("div");
    listMessage.className = "messageLabel";
    listMessage.innerHTML = "送货清单";
    productContainer.appendChild(listMessage);
    let size = 1;
    for (let i = 0; i < size; i++) {
        let listMessage = document.createElement("div");
        listMessage.className = "productListItem";
        if (i == 0) {
            listMessage.style.borderTopWidth = "0px";
            listMessage.style.borderBottomWidth = "0px";
        } else {
            listMessage.style.borderBottomWidth = "0px";
        }
        productContainer.appendChild(listMessage);
    }

    productContainer.style.height = 120 * size + 30 + "px";

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

