/**
 * Created by dingpengwei on 9/8/16.
 */
function requestOrder(accountId) {
    let url = BASE_PATH + "order/retrieve?accountId=" + accountId;
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            onRequestOrderCallback(jsonData.data);
        }
    }, onErrorCallback, onTimeoutCallback);
}


function onRequestOrderCallback(data) {
    let mainView = document.getElementById(MAIN);
    mainView.innerText = null;
    mainView.style.height = 0;
    for (let i = 0; i < data.length; i++) {
        let orderItemView = createOrderItemView(data[i]);
        mainView.appendChild(orderItemView);
        mainView.style.height = mainView.clientHeight + orderItemView.clientHeight + "px";
    }
}

function createOrderItemView(orderEntity) {
    let itemContainer = document.createElement("div");
    itemContainer.className = "itemContainer";
    itemContainer.customerHeight = 0;
    let orderItemTitleView = createOrderItemTitleView(orderEntity)
    itemContainer.appendChild(orderItemTitleView);
    itemContainer.customerHeight = orderItemTitleView.customerHeight;

    let orderProductsContainer = createOrderProductItem(orderEntity.products);
    itemContainer.customerHeight = itemContainer.customerHeight + orderProductsContainer.customerHeight;
    itemContainer.appendChild(orderProductsContainer);

    let orderReceiverView = createOrderReceiverView();
    orderReceiverView.style.height = itemContainer.customerHeight - 41 + "px";
    itemContainer.appendChild(orderReceiverView);

    let orderMoneyView = createOrderMoneyView();
    orderMoneyView.style.height = itemContainer.customerHeight - 41 + "px";
    itemContainer.appendChild(orderMoneyView);

    let orderStatusView = createOrderStatusView();
    orderStatusView.style.height = itemContainer.customerHeight - 41 + "px";
    itemContainer.appendChild(orderStatusView);

    itemContainer.style.height = itemContainer.customerHeight + "px";

    return itemContainer;
}

function createOrderItemTitleView(orderEntity) {
    let itemTitleContainer = document.createElement("div");
    itemTitleContainer.className = "itemTitleContainer";
    itemTitleContainer.customerHeight = 40;
    itemTitleContainer.innerHTML = orderEntity.createTime + " 订单号: " + orderEntity.orderId;
    return itemTitleContainer;
}

function createOrderProductItem(orderProducts) {
    let productContainer = document.createElement("div");
    productContainer.className = "productContainer";
    productContainer.customerHeight = 0;
    for (let i = 0; i < orderProducts.length; i++) {
        let orderProduct = orderProducts[i];
        let productItemView = document.createElement("div");
        productItemView.className = "productItemView";
        productItemView.customerHeight = 101;

        let icon = document.createElement("div");
        icon.className = "icon";
        productItemView.appendChild(icon);

        let name = document.createElement("div");
        name.className = "label";
        name.style.width = "350px";
        name.style.textAlign = "left";
        name.style.marginLeft = "10px";
        name.innerHTML = orderProduct.parent.parent.label + " " + orderProduct.parent.label + " " + orderProduct.label + orderProduct.meta;
        productItemView.appendChild(name);

        let num = document.createElement("div");
        num.className = "label";
        num.style.width = "60px";
        num.innerHTML = "X3";
        productItemView.appendChild(num);

        productContainer.appendChild(productItemView);
        productContainer.customerHeight = productContainer.customerHeight + productItemView.customerHeight;
    }
    productContainer.style.height = productContainer.customerHeight + "px";
    return productContainer;
}

function createOrderReceiverView() {
    let receiverContainer = document.createElement("div");
    receiverContainer.className = "orderReceiverView";
    receiverContainer.style.width = "149px";
    let receiverView = document.createElement("div");
    receiverView.style.height = "40px";
    receiverView.style.lineHeight = "40px";
    receiverView.innerHTML = "收货人";
    receiverContainer.appendChild(receiverView);
    return receiverContainer;
}

function createOrderMoneyView() {
    let orderMoneyContainer = document.createElement("div");
    orderMoneyContainer.className = "orderReceiverView";
    let moneyView = document.createElement("div");
    moneyView.style.height = "40px";
    moneyView.style.lineHeight = "40px";
    moneyView.innerHTML = "$1000";
    orderMoneyContainer.appendChild(moneyView);
    return orderMoneyContainer;
}

function createOrderStatusView() {
    let orderStatusContainer = document.createElement("div");
    orderStatusContainer.className = "orderReceiverView";
    orderStatusContainer.style.width = "227px";
    let statusView = document.createElement("div");
    statusView.style.height = "40px";
    statusView.style.lineHeight = "40px";
    statusView.innerHTML = "$1000";
    orderStatusContainer.appendChild(statusView);
    return orderStatusContainer;
}