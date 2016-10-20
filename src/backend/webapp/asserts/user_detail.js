/**
 * Created by dingpengwei on 8/16/16.
 */
const USER_TABS = new Array();
const USER_tab0 = new Object();
USER_tab0.index = 0;
USER_tab0.label = "购物车";
const USER_tab1 = new Object();
USER_tab1.index = 1;
USER_tab1.label = "订单";
const USER_tab2 = new Object();
USER_tab2.index = 2;
USER_tab2.label = "账户";
const USER_tab3 = new Object();
USER_tab3.index = 3;
USER_tab3.label = "收货地址";
USER_TABS.push(USER_tab0);
USER_TABS.push(USER_tab1);
USER_TABS.push(USER_tab2);
USER_TABS.push(USER_tab3);

function loadUserDetailView(userEntity) {
    let titleView = document.createElement("div");
    let accountEntity = userEntity.children[0];
    let displayName = accountEntity.nickName == undefined ? accountEntity.identity : accountEntity.nickName;
    titleView.innerHTML = "用户列表 >> " + displayName;
    titleView.className = "defaultTabNormal";
    getTitleContainer().appendChild(titleView);
    titleView.onclick = function () {
        resetMainContainer();
        loadUserView();
    }

    let userTabHost = document.createElement("div");
    let userDetailMainView = document.createElement("div");

    userTabHost.appendChild(createHorizontalTabHostDiv("userTabHost", USER_TABS, "defaultTabSelected", "defaultTabNormal", function (tab) {
        let object = new Object();
        let requestUserEntity = new Object();
        object.userId = userEntity.userId;
        requestUserEntity.userId = userEntity.userId;
        object.user = requestUserEntity;
        userDetailMainView.innerHTML = null;
        if (tab.index == 0) {
            onUserCartTabCallback(object,userDetailMainView);
        } else if (tab.index == 1) {
            onUserOrderTabCallback(object,userDetailMainView);
        } else if (tab.index == 2) {
            onUserAccountTabCallback(object,userDetailMainView);
        } else if (tab.index == 3) {
            onUserRequestReceiverCallback(object,userDetailMainView);
        }
    }, 0));

    getMainContainer().appendChild(userTabHost);
    userDetailMainView.style.width = "100%";
    userDetailMainView.style.height = "400px";
    userDetailMainView.style.marginTop = "45px";
    getMainContainer().appendChild(userDetailMainView);
}

function onUserCartTabCallback(userEntity,mainContainer) {
    let url = BASE_PATH + "/cart/mRetrieve?p=" + JSON.stringify(userEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            attachCartViewToUserDetailMainContainer(mainContainer,jsonData.data);
        }
    }, onErrorCallback, onTimeoutCallback);
}

function onUserOrderTabCallback(userEntity,mainContainer) {
    let url = BASE_PATH + "/order/mRetrievesByUser?p=" + JSON.stringify(userEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            attachOrderViewToUserDetailMainContainer(mainContainer,jsonData.data);
        }
    }, onErrorCallback, onTimeoutCallback);
}


function onUserAccountTabCallback(userEntity,mainContainer) {
    attachAccountViewToUserDetailMainContainer(mainContainer);
}

function onUserRequestReceiverCallback(userEntity,mainContainer) {
    let url = BASE_PATH + "/receiver/mRetrieveByUser?p=" + JSON.stringify(userEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            attachReceiverViewToUserDetailMainContainer(mainContainer,jsonData.data);
        }
    }, onErrorCallback, onTimeoutCallback);
}

function attachOrderViewToUserDetailMainContainer(mainContainer,orderEntities) {
    /**
     * 一个容器总体分为上下两个部分,上部分title,下部分内容,内容部分左右分为产品+数量\收货人\总金额\订单状态四个区域
     */
    let length = orderEntities == undefined ? 0 : orderEntities.length;
    for (let i = 0; i < length; i++) {
        let orderEntity = orderEntities[i];

        /**
         * 最外层的容器根对象
         */
        let orderView = document.createElement("div");
        orderView.className = "SS_IC";
        orderView.style.width = "1065px";
        orderView.style.height = "150px"; // 高度动态设定 其值=title部分+订单产品数量*单个产品高度
        orderView.style.borderWidth = "1px";
        if (i > 0) {
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
        orderTitleView.innerHTML = new Date(orderEntity.createTime).format("yyyy-MM-dd hh:mm") + " " + " 订单号: " + orderEntity.orderId;
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
        let formatEntities = orderEntity.formatEntities
        let length = formatEntities == undefined ? 0 : formatEntities.length;
        for (let i = 0; i < length; i++) {
            let formatEntity = formatEntities[i];
            /**
             * 左右分为两个部分,做部分显示产品信息,右部分显示数量
             * @type {Element}
             */
            let productView = document.createElement("div");
            productView.className = "SS_IC";
            productView.style.width = "550px";
            productView.style.height = "30px";
            productView.style.borderWidth = "0px";
            if (i != 0) {
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
            productNameView.innerHTML = formatEntity.parent.parent.label + " " + formatEntity.parent.label + " " + formatEntity.label + formatEntity.meta;
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
        orderContentView.style.height = length * 31 + "px";// 高度根据产品数量动态设定
        orderView.style.height = 40 + length * 31 + "px"; // 高度动态设定 其值=title部分+订单产品数量*单个产品高度
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
        if (orderEntity.status == 1) {
            orderStatusView.innerHTML = "已付款,待发货";
        } else if (orderEntity.status == 2) {
            orderStatusView.innerHTML = "已发货,待收货";
        } else if (orderEntity.status == 3) {
            orderStatusView.innerHTML = "已收货,已完成";
        } else {
            orderStatusView.innerHTML = "未知状态";
        }

        orderContentView.appendChild(orderStatusView);

        /**
         * 想最外层的容器根对象添加内容容器
         */
        orderView.appendChild(orderContentView);

        /**
         * 添加最外层容器根对象
         */
        mainContainer.appendChild(orderView);
    }
}

function attachCartViewToUserDetailMainContainer(mainContainer, cartEntities) {
    /**
     * 容器左右分为加入购物车的日期|产品名称|产品单价|产品数量|总金额五个区域
     */
    let length = cartEntities == undefined ? 0 : cartEntities.length;
    for (let i = 0; i < length; i++) {
        let cartEntity = cartEntities[i];
        /**
         * 最外层的容器根对象
         */
        let cartView = document.createElement("div");
        cartView.className = "SS_IC";
        cartView.style.width = "1065px";
        cartView.style.height = "30px";
        cartView.style.borderWidth = "1px";
        if (i > 0) {
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
        productView.innerHTML = " " + cartEntity.formatEntity.parent.parent.label + " " + cartEntity.formatEntity.parent.label + " " + cartEntity.formatEntity.label + cartEntity.formatEntity.meta;
        cartView.appendChild(productView);

        let priceView = document.createElement("div");
        priceView.className = "SS_IC";
        priceView.style.width = "100px";
        priceView.style.height = "100%";
        priceView.style.textAlign = "center";
        priceView.innerHTML = cartEntity.formatEntity.pricing + cartEntity.formatEntity.priceMeta;
        cartView.appendChild(priceView);

        let counterView = document.createElement("div");
        counterView.className = "SS_IC";
        counterView.style.width = "100px";
        counterView.style.height = "100%";
        counterView.style.textAlign = "center";
        counterView.innerHTML = "数量:" + cartEntity.amount;
        cartView.appendChild(counterView);

        let moneyView = document.createElement("div");
        moneyView.className = "SS_IC";
        moneyView.style.width = "100px";
        moneyView.style.height = "100%";
        moneyView.style.textAlign = "center";
        moneyView.innerHTML = (cartEntity.amount * cartEntity.formatEntity.pricing) + cartEntity.formatEntity.priceMeta;
        cartView.appendChild(moneyView);
        mainContainer.appendChild(cartView);
    }
}

function attachAccountViewToUserDetailMainContainer(mainContainer) {
    mainContainer.appendChild(createPhoneAccountContainer());
    mainContainer.appendChild(createAuthAccountContainer(0, "微信账号", "", "http://localhost:8080/foodslab/webapp/asserts/images/login_wx.png"));
    mainContainer.appendChild(createAuthAccountContainer(1, "QQ账号", undefined, "http://localhost:8080/foodslab/webapp/asserts/images/login_qq.png"));
}

function createPhoneAccountContainer(data) {
    let phoneAccountContainer = document.createElement("div");
    phoneAccountContainer.className = "accountItemContainer";
    let accountTitleView = document.createElement("div");
    accountTitleView.className = "accountItem";
    accountTitleView.innerHTML = "电话账号";
    accountTitleView.style.height = "40px";
    accountTitleView.style.lineHeight = "40px";
    accountTitleView.style.textAlign = "center";
    phoneAccountContainer.appendChild(accountTitleView);

    /**
     * 显示账号行
     * @type {Element}
     */
    let accountContainer = document.createElement("div");
    accountContainer.className = "accountItem";
    let accountLabelLeft = document.createElement("div");
    accountLabelLeft.className = "labelLeft";
    accountLabelLeft.innerHTML = "账号:";
    accountContainer.appendChild(accountLabelLeft);
    let accountLabelContainer = document.createElement("div");
    accountLabelContainer.className = "labelRight";
    accountLabelContainer.style.borderWidth = "0px";
    accountLabelContainer.innerHTML = "暂无";
    accountContainer.appendChild(accountLabelContainer);
    phoneAccountContainer.appendChild(accountContainer);

    /**
     * 显示昵称行
     * @type {Element}
     */
    let nickNameContainer = document.createElement("div");
    nickNameContainer.className = "accountItem";
    let nickNameLabelLeft = document.createElement("div");
    nickNameLabelLeft.className = "labelLeft";
    nickNameLabelLeft.innerHTML = "昵称:";
    nickNameContainer.appendChild(nickNameLabelLeft);
    let accountNickNameView = document.createElement("div");
    accountNickNameView.className = "labelRight";
    accountNickNameView.style.borderWidth = "0px";
    accountNickNameView.innerHTML = "暂无";
    nickNameContainer.appendChild(accountNickNameView);
    phoneAccountContainer.appendChild(nickNameContainer);
    /**
     * 显示性别行
     * @type {Element}
     */
    let genderContainer = document.createElement("div");
    genderContainer.className = "accountItem";
    let genderLabelLeft = document.createElement("div");
    genderLabelLeft.className = "labelLeft";
    genderLabelLeft.innerHTML = "性别:";
    genderContainer.appendChild(genderLabelLeft);

    let maleLabelInput = document.createElement("div");
    maleLabelInput.className = "labelRight";
    maleLabelInput.innerHTML = "暂无";
    maleLabelInput.style.borderWidth = "0px";
    genderContainer.appendChild(maleLabelInput);

    phoneAccountContainer.appendChild(genderContainer);
    /**
     * 创建头像行
     * @type {Element}
     */
    let imageContainer = document.createElement("div");
    imageContainer.className = "accountItem";
    imageContainer.style.height = "120px";
    let imageLabelLeft = document.createElement("div");
    imageLabelLeft.className = "labelLeft";
    imageLabelLeft.innerHTML = "头像:";
    imageContainer.appendChild(imageLabelLeft);
    let imageLabelInput = document.createElement("img");
    imageLabelInput.className = "headerImage";
    imageContainer.appendChild(imageLabelInput);
    phoneAccountContainer.appendChild(imageContainer);
    /**
     * 创建地址行
     * @type {Element}
     */
    let addressContainer = document.createElement("div");
    addressContainer.className = "accountItem";
    let addressLabelLeft = document.createElement("div");
    addressLabelLeft.className = "labelLeft";
    addressLabelLeft.innerHTML = "地址:";
    addressContainer.appendChild(addressLabelLeft);
    let addressLabelView = document.createElement("div");
    addressLabelView.className = "labelRight";
    addressLabelView.innerHTML = "暂无";
    addressLabelView.style.borderWidth = "0px";
    addressContainer.appendChild(addressLabelView);
    phoneAccountContainer.appendChild(addressContainer);

    return phoneAccountContainer;
}

function createAuthAccountContainer(index, title, data, link) {
    let authAccountContainer = document.createElement("div");
    authAccountContainer.className = "accountItemContainer";
    if (index == 0) {
        authAccountContainer.style.marginLeft = "5px";
        authAccountContainer.style.marginRight = "5px";
    }
    let accountTitleView = document.createElement("div");
    accountTitleView.className = "accountItem";
    accountTitleView.style.height = "40px";
    accountTitleView.style.lineHeight = "40px";
    accountTitleView.style.textAlign = "center";
    authAccountContainer.appendChild(accountTitleView);
    if (data == undefined) {
        accountTitleView.innerHTML = "扫码绑定" + title;
        let scanner = document.createElement("img");
        scanner.className = "scanner";
        scanner.src = link;
        authAccountContainer.appendChild(scanner);
    } else {
        accountTitleView.innerHTML = title;
        /**
         * 创建昵称行
         * @type {Element}
         */
        let nickNameContainer = document.createElement("div");
        nickNameContainer.className = "accountItem";
        let nickNameLabelLeft = document.createElement("div");
        nickNameLabelLeft.className = "labelLeft";
        nickNameLabelLeft.innerHTML = "昵称:";
        nickNameContainer.appendChild(nickNameLabelLeft);
        let nickNameLabelInput = document.createElement("div");
        nickNameLabelInput.className = "labelRight";
        nickNameLabelInput.innerHTML = "微信绑定账号";
        nickNameLabelInput.style.borderWidth = "0px";
        nickNameContainer.appendChild(nickNameLabelInput);
        authAccountContainer.appendChild(nickNameContainer);
        /**
         * 创建性别行
         * @type {Element}
         */
        let genderContainer = document.createElement("div");
        genderContainer.className = "accountItem";
        let genderLabelLeft = document.createElement("div");
        genderLabelLeft.className = "labelLeft";
        genderLabelLeft.innerHTML = "性别:";
        genderContainer.appendChild(genderLabelLeft);
        let genderLabelInput = document.createElement("div");
        genderLabelInput.className = "labelRight";
        genderLabelInput.innerHTML = "男";
        genderLabelInput.style.borderWidth = "0px";
        genderContainer.appendChild(genderLabelInput);
        authAccountContainer.appendChild(genderContainer);
        /**
         * 创建头像行
         * @type {Element}
         */
        let imageContainer = document.createElement("div");
        imageContainer.className = "accountItem";
        imageContainer.style.height = "120px";
        let imageLabelLeft = document.createElement("div");
        imageLabelLeft.className = "labelLeft";
        imageLabelLeft.innerHTML = "头像:";
        imageContainer.appendChild(imageLabelLeft);
        let imageLabelInput = document.createElement("img");
        imageLabelInput.className = "headerImage";
        imageLabelInput.src = "http://localhost:8080/foodslab/webapp/asserts/images/paywei.png";
        imageContainer.appendChild(imageLabelInput);
        authAccountContainer.appendChild(imageContainer);
        /**
         * 创建地址行
         * @type {Element}
         */
        let addressContainer = document.createElement("div");
        addressContainer.className = "accountItem";
        let addressLabelLeft = document.createElement("div");
        addressLabelLeft.className = "labelLeft";
        addressLabelLeft.innerHTML = "地址:";
        addressContainer.appendChild(addressLabelLeft);
        let addressLabelInput = document.createElement("div");
        addressLabelInput.className = "labelRight";
        addressLabelInput.style.borderWidth = "0px";
        addressLabelInput.innerHTML = "北京市 昌平区";
        addressContainer.appendChild(addressLabelInput);
        authAccountContainer.appendChild(addressContainer);
    }
    return authAccountContainer;
}

function attachReceiverViewToUserDetailMainContainer(mainContainer, receiverEntities) {
    let length = receiverEntities == undefined ? 0 : receiverEntities.length;
    for (let i = 0; i < length; i++) {
        let receiverEntity = receiverEntities[i];
        let receiverItemContainer = document.createElement("div");
        receiverItemContainer.className = "receiverItemContainer";
        let connectLine1 = document.createElement("hr");
        connectLine1.className = "connectLineH";
        receiverItemContainer.appendChild(connectLine1);
        let nameView = document.createElement("div");
        nameView.className = "receiverLabel";
        nameView.style.width = "151px";
        nameView.innerHTML = receiverEntity.name;
        receiverItemContainer.appendChild(nameView);
        let connectLine2 = document.createElement("hr");
        connectLine2.className = "connectLineH";
        receiverItemContainer.appendChild(connectLine2);

        let addressView = document.createElement("div");
        addressView.className = "receiverLabel";
        addressView.style.width = "780px";
        addressView.style.textAlign = "left";
        addressView.style.paddingLeft = "10px";
        addressView.style.paddingRight = "10px";
        addressView.innerHTML = receiverEntity.province + " " + receiverEntity.city + " " + receiverEntity.county + " " + receiverEntity.town + " " + receiverEntity.village
            + " " + (receiverEntity.append == undefined ? "" : receiverEntity.append ) + " " + receiverEntity.phone0;
        if (receiverEntity.status == 1) {
            nameView.style.borderColor = "red";
            addressView.style.borderColor = "red";
            addressView.style.width = "784px";
        }
        receiverItemContainer.appendChild(addressView);
        mainContainer.appendChild(receiverItemContainer);
    }
}