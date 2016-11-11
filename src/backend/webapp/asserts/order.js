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
    getTitleContainer().appendChild(createHorizontalTabHostDiv("orderMenus", ORDER_TABS, "defaultTabSelected", "defaultTabNormal", function (tab) {
        getMainContainer().innerHTML = null;
        if (tab.index == 0) {
            let orderEntity = new Object();
            orderEntity.cs = getCookie(KEY_CS);
            orderEntity.status = 1;
            orderEntity.currentPageIndex = 0;
            orderEntity.sizeInPage = 12;
            onUnExpressTabCallback(orderEntity);
        } else if (tab.index == 1) {
            let orderEntity = new Object();
            orderEntity.cs = getCookie(KEY_CS);
            orderEntity.status = 2;
            orderEntity.currentPageIndex = 0;
            orderEntity.sizeInPage = 12;
            onExpressingTabCallback(orderEntity);
        } else if (tab.index == 2) {
            let orderEntity = new Object();
            orderEntity.cs = getCookie(KEY_CS);
            orderEntity.status = 3;
            orderEntity.currentPageIndex = 0;
            orderEntity.sizeInPage = 12;
            onExpressedTabCallback(orderEntity);
        } else if (tab.index == 3) {
            let orderEntity = new Object();
            orderEntity.cs = getCookie(KEY_CS);
            orderEntity.status = 0;
            orderEntity.currentPageIndex = 0;
            orderEntity.sizeInPage = 12;
            onOrderAllTabCallback(orderEntity);
        }
    }, 0));
}

function onUnExpressTabCallback(orderEntity) {
    const url = BASE_PATH + "/order/mRetrieves?p=" + JSON.stringify(orderEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            let orderEntities = jsonData.data.dataInPage;
            let length = orderEntities == undefined ? 0 : orderEntities.length;
            if (length > 0) {
                getMainContainer().style.height = "0px";
            }
            for (let i = 0; i < length; i++) {
                let unExpressParamView = document.createElement("div");
                unExpressParamView.className = "orderUnExpressParam";
                unExpressParamView.style.width = "100%";
                let expressInfoDiv = document.createElement("div");
                expressInfoDiv.style.width = "50%";
                expressInfoDiv.style.backgroundColor = "#FFFFFF";
                expressInfoDiv.className = "orderUnExpressParam";
                expressInfoDiv.innerHTML = "圆通快递  1234567890";
                let expressActionDiv = document.createElement("div");
                expressActionDiv.className = "orderUnExpressParam";
                expressActionDiv.innerHTML = "确认发货";
                let genExpressActionDiv = document.createElement("div");
                genExpressActionDiv.className = "orderUnExpressParam";
                genExpressActionDiv.innerHTML = "生成面单";
                let orderCancel = document.createElement("div");
                orderCancel.className = "orderUnExpressParam";
                orderCancel.innerHTML = "取消订单";
                unExpressParamView.appendChild(orderCancel);
                if (i % 2 == 0) {
                    unExpressParamView.appendChild(expressActionDiv);
                    unExpressParamView.appendChild(expressInfoDiv);
                } else {
                    unExpressParamView.appendChild(genExpressActionDiv);
                }

                attachOrderContainer(getMainContainer(), orderEntities[i], unExpressParamView);
            }
            if (length > 0) {
                attachPaginationBar(getMainContainer(), jsonData.data.totalPageNumber, jsonData.data.currentPageIndex, function (pageIndex) {
                    orderEntity.currentPageIndex = pageIndex;
                    resetMainContainer();
                    onUnExpressTabCallback(orderEntity);
                });
            }
        }
    }, onErrorCallback, onTimeoutCallback);
}

function onExpressingTabCallback(orderEntity) {
    const url = BASE_PATH + "/order/mRetrieves?p=" + JSON.stringify(orderEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            if (jsonData.data.length > 0) {
                getMainContainer().style.height = "0px";
            }
            createOrderExpressingView(jsonData.data.dataInPage);
            if (jsonData.data.totalPageNumber > 0) {
                attachPaginationBar(getMainContainer(), jsonData.data.totalPageNumber, jsonData.data.currentPageIndex, function (pageIndex) {
                    orderEntity.currentPageIndex = pageIndex;
                    resetMainContainer();
                    onExpressingTabCallback(orderEntity);
                });
            }
        }
    }, onErrorCallback, onTimeoutCallback);
}

function onExpressedTabCallback(orderEntity) {
    const url = BASE_PATH + "/order/mRetrieves?p=" + JSON.stringify(orderEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            if (jsonData.data.length > 0) {
                getMainContainer().style.height = "0px";
            }
            createExpressedView(jsonData.data.dataInPage);
            if (jsonData.data.totalPageNumber > 0) {
                attachPaginationBar(getMainContainer(), jsonData.data.totalPageNumber, jsonData.data.currentPageIndex, function (pageIndex) {
                    orderEntity.currentPageIndex = pageIndex;
                    resetMainContainer();
                    onExpressedTabCallback(orderEntity);
                });
            }
        }
    }, onErrorCallback, onTimeoutCallback);
}

function onOrderAllTabCallback(orderEntity) {
    createSearchWidget(getMainContainer(), function (data) {
        console.log(data);
    });
    const url = BASE_PATH + "/order/mRetrieves?p=" + JSON.stringify(orderEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            if (jsonData.data.length > 0) {
                getMainContainer().style.height = "0px";
            }
            createOrderAllView(jsonData.data.dataInPage);
            if (jsonData.data.totalPageNumber > 0) {
                attachPaginationBar(getMainContainer(), jsonData.data.totalPageNumber, jsonData.data.currentPageIndex, function (pageIndex) {
                    orderEntity.currentPageIndex = pageIndex;
                    resetMainContainer();
                    onOrderAllTabCallback(orderEntity);
                });
            }
        }
    }, onErrorCallback, onTimeoutCallback);
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
        let expressingParamView = document.createElement("div");
        expressingParamView.className = "orderUnExpressParam";
        expressingParamView.style.width = "100%";
        let expressInfoDiv = document.createElement("div");
        expressInfoDiv.style.width = "50%";
        expressInfoDiv.style.backgroundColor = "#FFFFFF";
        expressInfoDiv.style.float = "left";
        expressInfoDiv.className = "orderUnExpressParam";
        expressInfoDiv.innerHTML = "圆通快递  1234567890";
        let expressStatus = document.createElement("div");
        expressStatus.className = "orderUnExpressParam";
        expressStatus.innerHTML = "查看流转";
        expressingParamView.appendChild(expressStatus);
        expressingParamView.appendChild(expressInfoDiv);
        attachOrderContainer(getMainContainer(), orderEntities[i], expressingParamView);
    }
}

function attachExpressingStatusView(orderEntity, container) {
    container.innerHTML = orderEntity.expressLabel + " " + orderEntity.expressNumber;
}

function createExpressedView(orderEntities) {
    let length = orderEntities == undefined ? 0 : orderEntities.length;
    for (let i = 0; i < length; i++) {
        let expressedParamView = document.createElement("div");
        expressedParamView.className = "orderUnExpressParam";
        expressedParamView.style.width = "100%";
        let expressInfoDiv = document.createElement("div");
        expressInfoDiv.style.width = "100%";
        expressInfoDiv.style.backgroundColor = "#FFFFFF";
        expressInfoDiv.style.float = "left";
        expressInfoDiv.className = "orderUnExpressParam";
        expressInfoDiv.innerHTML = "圆通快递  1234567890";
        let orderReissue = document.createElement("div");
        orderReissue.className = "orderUnExpressParam";
        orderReissue.style.width = "16%";
        orderReissue.style.float = "left";
        orderReissue.innerHTML = "补发";
        let orderExchange = document.createElement("div");
        orderExchange.className = "orderUnExpressParam";
        orderExchange.style.width = "17%";
        orderExchange.style.float = "left";
        orderExchange.innerHTML = "换货";
        let orderPayback = document.createElement("div");
        orderPayback.className = "orderUnExpressParam";
        orderPayback.style.float = "left";
        orderPayback.style.width = "17%";
        orderPayback.innerHTML = "退货";
        expressedParamView.appendChild(expressInfoDiv);
        // expressedParamView.appendChild(orderReissue);
        // expressedParamView.appendChild(orderExchange);
        // expressedParamView.appendChild(orderPayback);
        attachOrderContainer(getMainContainer(), orderEntities[i], expressedParamView);
    }
}

function createOrderAllView(orderEntities) {
    let length = orderEntities == undefined ? 0 : orderEntities.length;
    for (let i = 0; i < length; i++) {
        let orderEntity = orderEntities[i];
        let paramView = document.createElement("div");
        paramView.className = "orderEntityContentBlock";
        paramView.style.borderRightWidth = "0px";
        if (orderEntity.status == 1) {

        } else {
            attachExpressingStatusView(orderEntities[i], paramView, false);
        }
        attachOrderContainer(getMainContainer(), orderEntities[i], paramView);
    }

}

function attachOrderContainer(orderEntitiesContainer, orderEntity, paramView) {
    /**
     * 最外层的容器根对象
     * 一个容器总体分为上下两个部分,上部分title,下部分内容,内容部分左右分为产品+数量\收货人\总金额\订单状态四个区域
     */
    let orderEntityContainerDiv = document.createElement("div");
    orderEntityContainerDiv.className = "orderEntityContainer";
    /**
     * 上部分:标题容器
     */
    let orderEntityTitleDiv = document.createElement("div");
    orderEntityTitleDiv.className = "orderEntityTitle";
    orderEntityTitleDiv.innerHTML = new Date(orderEntity.createTime).format("yyyy-MM-dd hh:mm") + " " + " 订单号: "
        + orderEntity.code + " 总价:" + orderEntity.cost + " 邮费:" + orderEntity.postage;
    orderEntityContainerDiv.appendChild(orderEntityTitleDiv);

    /**
     * 下部分:内容容器
     */
    let orderEntityContentDiv = document.createElement("div");
    orderEntityContentDiv.className = "orderEntityContent";

    let orderEntityProductContainer = document.createElement("div");
    orderEntityProductContainer.className = "orderEntityContentBlock";
    orderEntityProductContainer.style.width = "40%";

    /**
     * 动态添加产品数量
     */
    let length = orderEntity == undefined ? 0 : orderEntity.cartEntities == undefined ? 0 : orderEntity.cartEntities.length;
    for (let i = 0; i < length; i++) {
        let cartEntity = orderEntity.cartEntities[i];
        /**
         * 左右分为两个部分,做部分显示产品信息,右部分显示数量
         * @type {Element}
         */
        let productItemView = document.createElement("div");
        productItemView.className = "orderProductEntity";
        if (i == 0) {
            productItemView.style.borderTopWidth = "0px";
        }
        /**
         * 添加左边产品名称区域
         */
        let productNameView = document.createElement("div");
        productNameView.className = "orderProductEntityLabel";
        productNameView.innerHTML = cartEntity.formatEntity.parent.parent.label + " "
            + cartEntity.formatEntity.parent.label + " " + cartEntity.formatEntity.label + cartEntity.formatEntity.meta;
        productItemView.appendChild(productNameView);

        /**
         * 添加右边产品数量区域
         */
        let productNumView = document.createElement("div");
        productNumView.className = "orderProductEntityLabel";
        productNumView.style.width = "30%";
        productNumView.innerHTML = "数量:" + cartEntity.amount + " 总价:" + cartEntity.pricing;
        productItemView.appendChild(productNumView);
        orderEntityProductContainer.appendChild(productItemView);
    }
    orderEntityProductContainer.style.height = length * 45;//每个产品条目的高度定义为45px
    orderEntityContentDiv.appendChild(orderEntityProductContainer);
    orderEntityContentDiv.style.height = length * 45 + "px";// 高度根据产品数量动态设定

    let orderEntityReceiverDiv = document.createElement("div");
    orderEntityReceiverDiv.className = "orderEntityContentBlock";
    orderEntityReceiverDiv.style.textAlign = "center";
    orderEntityReceiverDiv.innerHTML = "收货人：" + orderEntity.receiver.name + "电话：" + orderEntity.receiver.phone0 + "<br>" + orderEntity.receiver.province + " " + orderEntity.receiver.city + " "
        + orderEntity.receiver.county + " " + orderEntity.receiver.town + " " + orderEntity.receiver.village + " "
        + orderEntity.receiver.append;
    orderEntityContentDiv.appendChild(orderEntityReceiverDiv);

    let orderEntityParamDiv = document.createElement("div");
    orderEntityParamDiv.className = "orderEntityContentBlock";
    orderEntityContentDiv.appendChild(orderEntityParamDiv);
    orderEntityParamDiv.style.width = (orderEntitiesContainer.clientWidth * 30 / 100 - 7) + "px";
    /**
     * 状态区域
     */
    if (paramView != undefined) {
        orderEntityParamDiv.appendChild(paramView);
    }

    /**
     * 想最外层的容器根对象添加内容容器
     */
    orderEntityContainerDiv.appendChild(orderEntityContentDiv);
    orderEntityContainerDiv.style.height = 30 + length * 45 + "px"; // 高度动态设定 其值=title部分的高度+内容区域的高度
    orderEntitiesContainer.appendChild(orderEntityContainerDiv);
    orderEntitiesContainer.style.height = orderEntitiesContainer.clientHeight + orderEntityContainerDiv.clientHeight + "px";
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