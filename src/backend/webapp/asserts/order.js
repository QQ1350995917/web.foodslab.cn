/**
 * Created by dingpengwei on 8/16/16.
 */
const ORDER_TABS = new Array();
const ORDER_tab0 = new Object();
ORDER_tab0.index = 0;
ORDER_tab0.label = "未发货";
const ORDER_tab1 = new Object();
ORDER_tab1.index = 1;
ORDER_tab1.label = "已发货";
const ORDER_tab2 = new Object();
ORDER_tab2.index = 2;
ORDER_tab2.label = "已完成";
const ORDER_tab3 = new Object();
ORDER_tab3.index = 3;
ORDER_tab3.label = "全部";
ORDER_TABS.push(ORDER_tab0);
ORDER_TABS.push(ORDER_tab1);
ORDER_TABS.push(ORDER_tab2);
ORDER_TABS.push(ORDER_tab3);

function loadOrderView() {
    getTitleContainer().appendChild(createHorizontalTabHostDiv("orderMenus",ORDER_TABS,"defaultTabSelected","defaultTabNormal",function (tab) {
        getMainContainer().innerHTML = null;
        if (tab.index == 0) {
            onUnExpressTabCallback();
        } else if (tab.index == 1) {
            onExpressingTabCallback();
        } else if (tab.index == 2) {
            onExpressedTabCallback();
        } else if (tab.index == 3) {
            onOrderAllTabCallback();
        }
    },0));
}

function onUnExpressTabCallback() {
    let orderEntity = new Object();
    orderEntity.cs = getCookie(KEY_CS);
    orderEntity.status = 1;
    const url = BASE_PATH + "/order/mRetrieves?p=" + JSON.stringify(orderEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            createUnExpressView(jsonData.data);
        }
    }, onErrorCallback, onTimeoutCallback);
}

function onExpressingTabCallback() {
    let orderEntity = new Object();
    orderEntity.cs = getCookie(KEY_CS);
    orderEntity.status = 2;
    const url = BASE_PATH + "/order/mRetrieves?p=" + JSON.stringify(orderEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            createOrderExpressingView(jsonData.data);
        }
    }, onErrorCallback, onTimeoutCallback);
}

function onExpressedTabCallback() {
    let orderEntity = new Object();
    orderEntity.cs = getCookie(KEY_CS);
    orderEntity.status = 3;
    const url = BASE_PATH + "/order/mRetrieves?p=" + JSON.stringify(orderEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            createExpressedView(jsonData.data);
        }
    }, onErrorCallback, onTimeoutCallback);
}

function onOrderAllTabCallback() {
    let searchView = createSearchWidget("100%", function (data) {
        console.log(data);
    });
    getMainContainer().appendChild(searchView);

    let orderEntity = new Object();
    orderEntity.cs = getCookie(KEY_CS);
    orderEntity.status = 0;
    const url = BASE_PATH + "/order/mRetrieves?p=" + JSON.stringify(orderEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            createOrderAllView(jsonData.data);
        }
    }, onErrorCallback, onTimeoutCallback);
}

function createUnExpressView(orderEntities) {
    let length = orderEntities == undefined ? 0 : orderEntities.length;
    for (let i = 0; i < length; i++) {
        let paramView = document.createElement("div");
        paramView.className = "orderItemMainBlock";
        paramView.style.borderRightWidth = "0px";
        attachUnExpressView(orderEntities[i], paramView, false);
        let orderItemContainer = createOrderContainer(orderEntities[i], "40%", "30%", "29%", paramView);
        getMainContainer().appendChild(orderItemContainer);
    }
}


function attachUnExpressView(orderEntity, container, status) {
    container.innerHTML = null;
    if (status) {
        let expressCompany = document.createElement("select");
        expressCompany.className = "SS_IC_LABEL";
        expressCompany.style.marginTop = "5px";
        expressCompany.style.width = "100%";
        expressCompany.style.textAlign = "center";
        container.appendChild(expressCompany);

        let expressNumber = document.createElement("input");
        expressNumber.className = "SS_IC_LABEL";
        expressNumber.style.marginTop = "5px";
        expressNumber.style.width = "99%";
        container.appendChild(expressNumber);

        let expressCancel = document.createElement("div");
        expressCancel.className = "B_B_D";
        expressCancel.style.width = "110px";
        expressCancel.style.marginTop = "5px";
        expressCancel.innerHTML = "取消发货";
        expressCancel.onclick = function () {
            attachUnExpressView(orderEntity, container, false);
        };
        container.appendChild(expressCancel);

        let expressGoing = document.createElement("div");
        expressGoing.className = "B_B_D";
        expressGoing.style.width = "110px";
        expressGoing.style.marginTop = "5px";
        expressGoing.innerHTML = "确定发货";
        container.appendChild(expressGoing);
        expressGoing.onclick = function () {
            let requestOrderEntity = new Object();
            requestOrderEntity.orderId = orderEntity.orderId;
            requestOrderEntity.expressLabel = "顺丰快递";
            requestOrderEntity.expressNumber = expressNumber.value;
            requestOrderEntity.status = 2;
            requestExpress(requestOrderEntity);
        }
    } else {
        let expressButton = document.createElement("div");
        expressButton.className = "actionButton";
        expressButton.style.width = "90%";
        expressButton.style.height = "30%";
        expressButton.style.marginTop = "2px";
        expressButton.innerHTML = "去发货";
        expressButton.onclick = function () {
            attachUnExpressView(orderEntity, container, true);
        };
        container.appendChild(expressButton);
    }
}

function createOrderExpressingView(orderEntities) {
    let length = orderEntities == undefined ? 0 : orderEntities.length;
    for (let i = 0; i < length; i++) {
        let paramView = document.createElement("div");
        paramView.className = "orderItemMainBlock";
        paramView.style.borderRightWidth = "0px";
        attachExpressingStatusView(orderEntities[i], paramView, false);
        let orderItemContainer = createOrderContainer(orderEntities[i], "40%", "30%", "29%", paramView);
        getMainContainer().appendChild(orderItemContainer);
    }
}

function attachExpressingStatusView(orderEntity, container) {
    container.innerHTML = orderEntity.expressLabel + " " + orderEntity.expressNumber;
}

function createExpressedView(orderEntities) {
    let length = orderEntities == undefined ? 0 : orderEntities.length;
    for (let i = 0; i < length; i++) {
        let paramView = document.createElement("div");
        paramView.className = "orderItemMainBlock";
        paramView.style.borderRightWidth = "0px";
        attachExpressingStatusView(orderEntities[i], paramView, false);
        let orderItemContainer = createOrderContainer(orderEntities[i], "40%", "30%", "29%", paramView);
        getMainContainer.appendChild(orderItemContainer);
    }
}

function createOrderAllView(orderEntities) {
    let length = orderEntities == undefined ? 0 : orderEntities.length;
    for (let i = 0; i < length; i++) {
        let orderEntity = orderEntities[i];
        let paramView = document.createElement("div");
        paramView.className = "orderItemMainBlock";
        paramView.style.borderRightWidth = "0px";
        if (orderEntity.status == 1) {

        } else {
            attachExpressingStatusView(orderEntities[i], paramView, false);
        }
        let orderItemContainer = createOrderContainer(orderEntities[i], "40%", "30%", "29%", paramView);
        getMainContainer().appendChild(orderItemContainer);
    }
}

function createOrderContainer(orderEntity, productViewWidth, receiverViewWidth, statusViewWidth, paramView) {
    /**
     * 最外层的容器根对象
     * 一个容器总体分为上下两个部分,上部分title,下部分内容,内容部分左右分为产品+数量\收货人\总金额\订单状态四个区域
     */
    let orderEntityView = document.createElement("div");
    orderEntityView.className = "orderItemContainer";
    /**
     * 上部分title容器
     */
    let orderEntityTitleView = document.createElement("div");
    orderEntityTitleView.className = "orderItemTitle";
    orderEntityTitleView.innerHTML = new Date(orderEntity.createTime).format("yyyy-MM-dd hh:mm") + " " + " 订单号: " + orderEntity.orderId + "  收货人：" + (orderEntity.senderName == undefined ? orderEntity.receiverId: orderEntity.senderName) + "    电话：123 4567 78900";
    orderEntityView.appendChild(orderEntityTitleView);

    /**
     * 下部分内容容器
     */
    let orderEntityContentView = document.createElement("div");
    orderEntityContentView.className = "orderItemMain";

    let orderEntityProductContainer = document.createElement("div");
    orderEntityProductContainer.className = "orderItemMainBlock";
    orderEntityProductContainer.style.width = productViewWidth;

    /**
     * 动态添加产品数量
     */
    let length = orderEntity == undefined ? 0 : orderEntity.formatEntities == undefined ? 0 : orderEntity.formatEntities.length;
    for (let i = 0; i < length; i++) {
        let formatEntity = orderEntity.formatEntities[i];
        /**
         * 左右分为两个部分,做部分显示产品信息,右部分显示数量
         * @type {Element}
         */
        let productItemView = document.createElement("div");
        productItemView.className = "orderItemMainProductItem";
        /**
         * 添加左边产品名称区域
         */
        let productNameView = document.createElement("div");
        productNameView.className = "orderItemMainProductItemLabel";
        productNameView.style.width = "85%";
        productNameView.innerHTML = formatEntity.parent.parent.label + " " + formatEntity.parent.label + " " + formatEntity.label + formatEntity.meta;
        productItemView.appendChild(productNameView);

        /**
         * 添加右边产品数量区域
         */
        let productNumView = document.createElement("div");
        productNumView.className = "orderItemMainProductItemLabel";
        productNumView.style.width = "15%";
        productNumView.innerHTML = "x 5";
        productItemView.appendChild(productNumView);
        orderEntityProductContainer.appendChild(productItemView);
    }
    orderEntityContentView.style.height = length * 31 + "px";// 高度根据产品数量动态设定
    orderEntityView.style.height = 40 + length * 31 + "px"; // 高度动态设定 其值=title部分+订单产品数量*单个产品高度
    orderEntityContentView.appendChild(orderEntityProductContainer);

    let orderEntityReceiverView = document.createElement("div");
    orderEntityReceiverView.className = "orderItemMainBlock";
    orderEntityReceiverView.style.width = receiverViewWidth;
    orderEntityReceiverView.style.textAlign = "center";
    orderEntityReceiverView.innerHTML = "北京 北京市 昌平区 回龙观 新龙城小区二期380号院 36A 8单元 9008";
    orderEntityContentView.appendChild(orderEntityReceiverView);

    /**
     * 状态区域
     */
    if (paramView != undefined) {
        paramView.style.width = statusViewWidth;
        orderEntityContentView.appendChild(paramView);
    }

    /**
     * 想最外层的容器根对象添加内容容器
     */
    orderEntityView.appendChild(orderEntityContentView);

    return orderEntityView;
}

function requestExpress(orderEntity) {
    orderEntity.cs = getCookie(KEY_CS);
    const url = BASE_PATH + "/order/mExpressing?p=" + JSON.stringify(orderEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            console.log(data);
            var jsonData = JSON.parse(data);
            if (jsonData.code == RC_SUCCESS) {
                resetMainContainer();
                loadOrderView();
                new Toast().show("发货成功");
            } else {
                new Toast().show("发货失败");
            }
        }
    }, onErrorCallback, onTimeoutCallback);
}