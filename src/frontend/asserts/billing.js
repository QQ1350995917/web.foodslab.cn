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

    let buyerMessage = document.createElement("div");
    buyerMessage.className = "messageLabel";
    buyerMessage.style.marginTop = "10px";
    buyerMessage.innerHTML = "购买人信息<span style='color: #FF0000;'>（为了能和您取得联系请填写真实信息，如不填写则认为购买和收货是同一人）</span>";
    mainView.appendChild(buyerMessage);

    let buyerInfoView = document.createElement("div");
    buyerInfoView.className = "messageLabel";
    let buyerNameLabel = document.createElement("div");
    buyerNameLabel.className = "messageLabelInline";
    buyerNameLabel.innerHTML = "姓名:";
    buyerInfoView.appendChild(buyerNameLabel);
    let buyerNameEditor = document.createElement("input");
    buyerNameEditor.style.float = "left";
    buyerNameEditor.style.marginRight = "20px";
    buyerInfoView.appendChild(buyerNameEditor);

    let buyerPhoneLabel = document.createElement("div");
    buyerPhoneLabel.className = "messageLabelInline";
    buyerPhoneLabel.innerHTML = "电话:";
    buyerInfoView.appendChild(buyerPhoneLabel);
    let buyerPhoneEditor = document.createElement("input");
    buyerPhoneEditor.style.float = "left";
    buyerInfoView.appendChild(buyerPhoneEditor);
    mainView.appendChild(buyerInfoView);

    let receiverMessage = document.createElement("div");
    receiverMessage.className = "messageLabel";
    receiverMessage.innerHTML = "收货人信息";
    mainView.appendChild(receiverMessage);

    let receiverInfoEditor = document.createElement("div");
    receiverInfoEditor.className = "messageLabel";
    receiverInfoEditor.style.borderWidth = "1px";
    receiverInfoEditor.style.fontSize = "0.8rem";
    receiverInfoEditor.style.cursor = "pointer";
    receiverInfoEditor.innerHTML = "点击编辑收货人信息";
    mainView.appendChild(receiverInfoEditor);
    
    let payStyleMessage = document.createElement("div");
    payStyleMessage.className = "messageLabel";
    payStyleMessage.style.marginTop = "20px";
    payStyleMessage.innerHTML = "请选择支付方式";
    mainView.appendChild(payStyleMessage);

    let payStyleView = document.createElement("div");
    payStyleView.className = "messageLabel";
    payStyleView.style.height = "120px";
    mainView.appendChild(payStyleView);

    let listMessage = document.createElement("div");
    listMessage.className = "messageLabel";
    listMessage.style.marginTop = "20px";
    listMessage.innerHTML = "送货清单";
    mainView.appendChild(listMessage);

    let productView = document.createElement("div");

    let payingView = document.createElement("div");


}

