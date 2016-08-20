/**
 * Created by dingpengwei on 8/16/16.
 */

function onOrderTabCallback() {
    console.log("onOrderTabCallback");
    createOrderView();
}

function onCartTabCallback() {
    console.log("onCartTabCallback");
    createCartView();
}

function onMessageTabCallback() {
    console.log("onMessageTabCallback");
    createMessageView();
}

function onAccountTabCallback() {
    console.log("onAccountTabCallback");
    createAccountView();
}

function showUserDetail(userEntity) {
    // 重置界面
    resetView();
    // 获取根元素对象
    let titleViewContainer = document.getElementById(MAIN_TITLE_ID);
    let backView = document.createElement("div");
    backView.innerHTML = "返回列表";
    backView.className = "horizontalNormal";
    backView.style.float = "left";
    backView.style.width = "82px";
    backView.onclick = function () {
        showUsers();
    };
    titleViewContainer.appendChild(backView);

    let titleView = document.createElement("div");
    titleView.style.float = "left";
    titleView.style.width = "1004px";
    titleView.style.height = "40px";
    titleView.style.backgroundColor = "red";

    let tabItems = new Array();
    tabItems.push(new Tab("order", "订单", "horizontalSelected", onOrderTabCallback));
    tabItems.push(new Tab("cart", "购物车", "horizontalNormal", onCartTabCallback));
    tabItems.push(new Tab("message", "消息", "horizontalNormal", onMessageTabCallback));
    tabItems.push(new Tab("account", "账户", "horizontalNormal", onAccountTabCallback));
    createUserTitleTab(titleView, tabItems);

    titleViewContainer.appendChild(titleView);

    createOrderView();
}

function createUserTitleTab(container, tabItems) {
    container.innerHTML = null;
    for (let index = 0; index < tabItems.length; index++) {
        let tabItem = tabItems[index];
        let tabView = document.createElement("div");
        tabView.className = tabItem.className;
        tabView.style.width = "249px";
        tabView.style.height = "100%";
        tabView.innerHTML = tabItem.label;
        tabView.onclick = function () {
            for (let i = 0; i < tabItems.length; i++) {
                tabItems[i].className = "horizontalNormal";
            }
            tabItem.className = "horizontalSelected";
            createUserTitleTab(container, tabItems);
            tabItem.onTabClick();
        };
        container.appendChild(tabView);
    }
}

function createOrderView() {
    let contentViewContainer = document.getElementById(MAIN_CONTENT_ID);
    contentViewContainer.innerHTML = null;

    /**
     * 一个容器总体分为上下两个部分,上部分title,下部分内容,内容部分左右分为产品+数量\收货人\总金额\订单状态四个区域
     */
    for (let index = 0; index < 1; index++) {
        /**
         * 最外层的容器根对象
         */
        let orderView = document.createElement("div");
        orderView.className = "SS_IC";
        orderView.style.width = "1065px";
        orderView.style.height = "150px"; // 高度动态设定 其值=title部分+订单产品数量*单个产品高度
        orderView.style.borderWidth = "1px";
        if (index > 0) {
            orderView.style.borderTopWidth = "0px";
        }

        /**
         * 上部分title容器
         */
        let orderTitleView = document.createElement("div");
        orderTitleView.className = "SS_IC";
        orderTitleView.style.width = "1055px";
        orderTitleView.style.height = "40px";
        orderTitleView.style.borderWidth = "0px";
        orderTitleView.style.borderBottomWidth = "1px";
        orderTitleView.style.backgroundColor = "#F2F2F2";
        orderTitleView.style.lineHeight = "40px";
        orderTitleView.style.paddingLeft = "10px";
        orderTitleView.innerHTML = "2016-06-30 14:22:42  订单号：20103205392";
        orderView.appendChild(orderTitleView);

        /**
         * 下部分内容容器
         */
        let orderContentView = document.createElement("div");
        orderContentView.className = "SS_IC";
        orderContentView.style.width = "1066px";
        orderContentView.style.height = "110px"; // 高度根据产品数量动态设定
        orderContentView.style.borderWidth = "0px";

        let orderProductView = document.createElement("div");
        orderProductView.className = "SS_IC";
        orderProductView.style.width = "550px";
        orderProductView.style.height = "100%";
        orderProductView.style.borderWidth = "0px";

        /**
         * 动态添加产品数量
         */
        let size = 3;
        for (let i = 0; i < size; i++) {
            /**
             * 左右分为两个部分,做部分显示产品信息,右部分显示数量
             * @type {Element}
             */
            let productView = document.createElement("div");
            productView.className = "SS_IC";
            productView.style.width = "550px";
            productView.style.height = "30px";
            productView.style.borderWidth = "0px";
            if (i != 0){
                productView.style.borderTopWidth = "1px";
            }
            /**
             * 添加左边产品名称区域
             */
            let productNameView = document.createElement("div");
            productNameView.className = "SS_IC";
            productNameView.style.width = "490px";
            productNameView.style.height = "30px";
            productNameView.style.marginLeft = "10px";
            productNameView.style.borderWidth = "0px";
            productNameView.style.lineHeight = "30px";
            productNameView.innerHTML = "产品系列 + 产品型号 + 产品规格";
            productView.appendChild(productNameView);

            /**
             * 添加右边产品数量区域
             */
            let productNumView = document.createElement("div");
            productNumView.className = "SS_IC";
            productNumView.style.width = "50px";
            productNumView.style.height = "30px";
            productNumView.style.borderWidth = "0px";
            productNumView.style.lineHeight = "30px";
            productNumView.innerHTML = "x 5";
            productView.appendChild(productNumView);


            orderProductView.appendChild(productView);
        }
        orderContentView.style.height = size * 31 + "px";// 高度根据产品数量动态设定
        orderView.style.height = 40 + size * 31 + "px"; // 高度动态设定 其值=title部分+订单产品数量*单个产品高度
        orderContentView.appendChild(orderProductView);

        let orderReceiverView = document.createElement("div");
        orderReceiverView.className = "SS_IC";
        orderReceiverView.style.width = "213px";
        orderReceiverView.style.height = "100%";
        orderReceiverView.style.textAlign = "center";
        orderReceiverView.innerHTML = "收货人";
        orderContentView.appendChild(orderReceiverView);

        let orderMoneyView = document.createElement("div");
        orderMoneyView.className = "SS_IC";
        orderMoneyView.style.width = "150px";
        orderMoneyView.style.height = "100%";
        orderMoneyView.style.textAlign = "center";
        orderMoneyView.innerHTML = "总额:8888";
        orderContentView.appendChild(orderMoneyView);

        let orderStatusView = document.createElement("div");
        orderStatusView.className = "SS_IC";
        orderStatusView.style.width = "150px";
        orderStatusView.style.height = "100%";
        orderStatusView.style.textAlign = "center";
        orderStatusView.innerHTML = "待支付|已支付待发货|已发货|已收货";
        orderContentView.appendChild(orderStatusView);

        /**
         * 想最外层的容器根对象添加内容容器
         */
        orderView.appendChild(orderContentView);

        /**
         * 添加最外层容器根对象
         */
        contentViewContainer.appendChild(orderView);
    }

}

function createCartView() {
    let contentViewContainer = document.getElementById(MAIN_CONTENT_ID);
    contentViewContainer.innerHTML = null;

    /**
     * 容器左右分为加入购物车的日期|产品名称|产品单价|产品数量|总金额五个区域
     */
    for (let index = 0; index < 10; index++) {
        /**
         * 最外层的容器根对象
         */
        let cartView = document.createElement("div");
        cartView.className = "SS_IC";
        cartView.style.width = "1065px";
        cartView.style.height = "30px";
        cartView.style.borderWidth = "1px";
        if (index > 0) {
            cartView.style.borderTopWidth = "0px";
        }

        let dataTimeView = document.createElement("div");
        dataTimeView.className = "SS_IC";
        dataTimeView.style.width = "150px";
        dataTimeView.style.height = "100%";
        dataTimeView.style.borderWidth = "0px";
        dataTimeView.style.textAlign = "center";
        dataTimeView.innerHTML = "2016-08-08 12:34";
        cartView.appendChild(dataTimeView);

        let productView = document.createElement("div");
        productView.className = "SS_IC";
        productView.style.width = "600px";
        productView.style.height = "100%";
        productView.style.paddingLeft = "10px";
        productView.innerHTML = "产品系列 + 产品型号 + 产品规格";
        cartView.appendChild(productView);

        let priceView = document.createElement("div");
        priceView.className = "SS_IC";
        priceView.style.width = "100px";
        priceView.style.height = "100%";
        priceView.style.textAlign = "center";
        priceView.innerHTML = "单价:100";
        cartView.appendChild(priceView);

        let counterView = document.createElement("div");
        counterView.className = "SS_IC";
        counterView.style.width = "100px";
        counterView.style.height = "100%";
        counterView.style.textAlign = "center";
        counterView.innerHTML = "数量:5";
        cartView.appendChild(counterView);

        let moneyView = document.createElement("div");
        moneyView.className = "SS_IC";
        moneyView.style.width = "100px";
        moneyView.style.height = "100%";
        moneyView.style.textAlign = "center";
        moneyView.innerHTML = "总金额:500";
        cartView.appendChild(moneyView);

        contentViewContainer.appendChild(cartView);
    }
}

function createMessageView() {
    let contentViewContainer = document.getElementById(MAIN_CONTENT_ID);
    contentViewContainer.innerHTML = null;

}

function createAccountView() {
    let contentViewContainer = document.getElementById(MAIN_CONTENT_ID);
    contentViewContainer.innerHTML = null;
}


