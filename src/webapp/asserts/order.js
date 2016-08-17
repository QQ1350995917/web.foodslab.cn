/**
 * Created by dingpengwei on 8/16/16.
 */

function onExpressingTabCallback() {
    console.log("onExpressingTabCallback");
    createExpressingView();
}

function onExpressedTabCallback() {
    console.log("onExpressedTabCallback");
    createExpressedView();
}

function onFinishedTabCallback() {
    console.log("onFinishTabCallback");
    createFinishedView();
}

function onAllTabCallback() {
    console.log("onAllTabCallback");
    createAllView();
}

function showOrderView() {
    // 重置界面
    resetView();
    // 获取根元素对象
    let titleViewContainer = document.getElementById(MAIN_TITLE_ID);

    let tabItems = new Array();
    tabItems.push(new Tab("expressing", "未发货", "horizontalSelected", onExpressingTabCallback));
    tabItems.push(new Tab("expressed", "已发货", "horizontalNormal", onExpressedTabCallback));
    tabItems.push(new Tab("finished", "已完成", "horizontalNormal", onFinishedTabCallback));
    tabItems.push(new Tab("all", "全部", "horizontalNormal", onAllTabCallback));
    createOrderTitleTab(titleViewContainer, tabItems);

    createExpressingView();
}

function createOrderTitleTab(containerView, tabItems) {
    containerView.innerHTML = null;
    for (let index = 0; index < tabItems.length; index++) {
        let tabItem = tabItems[index];
        let tabView = document.createElement("div");
        tabView.className = tabItem.className;
        tabView.style.width = "270px";
        tabView.style.height = "100%";
        tabView.innerHTML = tabItem.label;
        tabView.onclick = function () {
            for (let i = 0; i < tabItems.length; i++) {
                tabItems[i].className = "horizontalNormal";
            }
            tabItem.className = "horizontalSelected";
            createOrderTitleTab(containerView, tabItems);
            tabItem.onTabClick();
        };
        containerView.appendChild(tabView);
    }
}

function createExpressingView() {
    let contentViewContainer = document.getElementById(MAIN_CONTENT_ID);
    contentViewContainer.innerHTML = null;

    let exportView = document.createElement("div");
    exportView.className = "SS_IC";
    exportView.style.width = "200px";
    exportView.style.height = "30px";
    exportView.style.lineHeight = "30px";
    exportView.style.borderWidth = "1px";
    exportView.style.marginTop = "10px";
    exportView.style.textAlign = "center";
    exportView.innerHTML = "导出发货信息";
    contentViewContainer.appendChild(exportView);

    let importView = document.createElement("div");
    importView.className = "SS_IC";
    importView.style.width = "200px";
    importView.style.height = "30px";
    importView.style.lineHeight = "30px";
    importView.style.borderWidth = "1px";
    importView.style.margin = "10px";
    importView.style.textAlign = "center";
    importView.innerHTML = "导入发货信息";
    contentViewContainer.appendChild(importView);

    let size = 3;
    for (let index =0;index<size;index++){
        let expressInfoView = document.createElement("div");
        expressInfoView.className = "SS_IC";
        expressInfoView.style.width = "250px";
        expressInfoView.style.height = "100%";
        expressInfoView.style.textAlign = "center";
        onExpressButtonClick(expressInfoView, false);
        contentViewContainer.appendChild(createOrderCommonView(index,expressInfoView));
    }
}

function onExpressButtonClick(container, status) {
    container.innerHTML = null;
    if (status) {
        let expressCompany = document.createElement("select");
        expressCompany.className = "SS_IC_LABEL";
        expressCompany.style.marginTop = "5px";
        expressCompany.style.width = "100%";
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
            onExpressButtonClick(container, false);
        };
        container.appendChild(expressCancel);

        let expressGoing = document.createElement("div");
        expressGoing.className = "B_B_D";
        expressGoing.style.width = "110px";
        expressGoing.style.marginTop = "5px";
        expressGoing.innerHTML = "确定发货";
        container.appendChild(expressGoing);
    } else {
        let expressButton = document.createElement("div");
        expressButton.className = "B_B_D";
        expressButton.style.width = "90%";
        expressButton.style.height = "30%";
        expressButton.style.marginTop = "2px";
        expressButton.innerHTML = "去发货";
        expressButton.onclick = function () {
            onExpressButtonClick(container, true);
        };
        container.appendChild(expressButton);
    }
}

function createExpressedView() {
    let contentViewContainer = document.getElementById(MAIN_CONTENT_ID);
    contentViewContainer.innerHTML = null;

    let size = 3;
    for (let index =0;index<size;index++){
        let expressInfoView = document.createElement("div");
        expressInfoView.className = "SS_IC";
        expressInfoView.style.width = "250px";
        expressInfoView.style.height = "100%";
        expressInfoView.style.textAlign = "center";

        let expressNameNumber = document.createElement("div");
        expressNameNumber.className = "SS_IC";
        expressNameNumber.style.width = "100%";
        expressNameNumber.style.height = "20px";
        expressNameNumber.style.borderWidth = "0px";
        expressNameNumber.innerHTML = "圆通快递 单号:12345678980";
        expressInfoView.appendChild(expressNameNumber);

        let expressDetail = document.createElement("div");
        expressDetail.className = "SS_IC";
        expressDetail.style.width = "100%";
        expressDetail.style.borderWidth = "0px";
        expressDetail.style.overflow = "scroll";
        expressDetail.innerHTML = "2016-08-08 12:23:34 <br> 北京市昌平区<br>2016-08-08 12:23:34 <br> 北京市昌平区<br>2016-08-08 12:23:34 <br> 北京市昌平区<br>2016-08-08 12:23:34 <br> 北京市昌平区<br>2016-08-08 12:23:34 <br> 北京市昌平区<br>2016-08-08 12:23:34 <br> 北京市昌平区<br>";
        expressInfoView.appendChild(expressDetail);

        contentViewContainer.appendChild(createOrderCommonView(index,expressInfoView));
    }

}

function createFinishedView() {
    let contentViewContainer = document.getElementById(MAIN_CONTENT_ID);
    contentViewContainer.innerHTML = null;

    let size = 3;
    for (let index =0;index<size;index++){
        let expressInfoView = document.createElement("div");
        expressInfoView.className = "SS_IC";
        expressInfoView.style.width = "250px";
        expressInfoView.style.height = "100%";
        expressInfoView.style.textAlign = "center";

        let expressNameNumber = document.createElement("div");
        expressNameNumber.className = "SS_IC";
        expressNameNumber.style.width = "100%";
        expressNameNumber.style.height = "20px";
        expressNameNumber.style.borderWidth = "0px";
        expressNameNumber.innerHTML = "圆通快递 单号:12345678980";
        expressInfoView.appendChild(expressNameNumber);

        let expressDetail = document.createElement("div");
        expressDetail.className = "SS_IC";
        expressDetail.style.width = "100%";
        expressDetail.style.borderWidth = "0px";
        expressDetail.style.overflow = "scroll";
        expressDetail.innerHTML = "2016-07-08 17:05:32 <br> 用户确认完成";
        expressInfoView.appendChild(expressDetail);

        // let expressReturn = document.createElement("div");
        // expressReturn.className = "B_B_D";
        // expressReturn.style.width = "110px";
        // expressReturn.style.marginTop = "5px";
        // expressReturn.innerHTML = "退货";
        // expressInfoView.appendChild(expressReturn);
        //
        // let expressAdd = document.createElement("div");
        // expressAdd.className = "B_B_D";
        // expressAdd.style.width = "110px";
        // expressAdd.style.marginTop = "5px";
        // expressAdd.innerHTML = "补发";
        // expressInfoView.appendChild(expressAdd);

        contentViewContainer.appendChild(createOrderCommonView(index,expressInfoView));
    }

}

function createAllView() {
    let contentViewContainer = document.getElementById(MAIN_CONTENT_ID);
    contentViewContainer.innerHTML = null;

    let searchEditor = document.createElement("input");
    searchEditor.className = "SS_IC_LABEL";
    searchEditor.style.width = "952px";
    searchEditor.style.height = "30px";
    searchEditor.style.lineHeight = "30px";
    searchEditor.style.borderWidth = "1px";
    searchEditor.style.marginTop = "10px";
    searchEditor.style.marginBottom = "10px";
    contentViewContainer.appendChild(searchEditor);

    let searchActionView = document.createElement("div");
    searchActionView.className = "B_B_D";
    searchActionView.style.width = "100px";
    searchActionView.style.height = "34px";
    searchActionView.style.lineHeight = "30px";
    searchActionView.style.marginTop = "10px";
    searchActionView.style.marginBottom = "10px";
    searchActionView.innerHTML = "搜索";
    contentViewContainer.appendChild(searchActionView);

    let size = 3;
    for (let index =0;index<size;index++){
        let expressInfoView = document.createElement("div");
        expressInfoView.className = "SS_IC";
        expressInfoView.style.width = "250px";
        expressInfoView.style.height = "100%";
        expressInfoView.style.textAlign = "center";
        expressInfoView.innerHTML = "动态内容";

        contentViewContainer.appendChild(createOrderCommonView(index,expressInfoView));
    }

}

function createOrderCommonView(index,paramView) {
    /**
     * 最外层的容器根对象
     * 一个容器总体分为上下两个部分,上部分title,下部分内容,内容部分左右分为产品+数量\收货人\总金额\订单状态四个区域
     */
    let orderEntityView = document.createElement("div");
    orderEntityView.className = "SS_IC";
    orderEntityView.style.width = "1065px";
    orderEntityView.style.height = "150px"; // 高度动态设定 其值=title部分+订单产品数量*单个产品高度
    orderEntityView.style.minHeight = "160px";
    orderEntityView.style.borderWidth = "1px";
    if (index > 0) {
        orderEntityView.style.borderTopWidth = "0px";
    }

    /**
     * 上部分title容器
     */
    let orderEntityTitleView = document.createElement("div");
    orderEntityTitleView.className = "SS_IC";
    orderEntityTitleView.style.width = "1055px";
    orderEntityTitleView.style.height = "40px";
    orderEntityTitleView.style.borderWidth = "0px";
    orderEntityTitleView.style.borderBottomWidth = "1px";
    orderEntityTitleView.style.backgroundColor = "#F2F2F2";
    orderEntityTitleView.style.lineHeight = "40px";
    orderEntityTitleView.style.paddingLeft = "10px";
    orderEntityTitleView.innerHTML = "2016-06-30 14:22:42  订单号：20103205392  收货人：地球往事    电话：123 4567 78900";
    orderEntityView.appendChild(orderEntityTitleView);

    /**
     * 下部分内容容器
     */
    let orderEntityContentView = document.createElement("div");
    orderEntityContentView.className = "SS_IC";
    orderEntityContentView.style.width = "1066px";
    orderEntityContentView.style.minHeight = "120px";
    orderEntityContentView.style.height = "110px"; // 高度根据产品数量动态设定
    orderEntityContentView.style.borderWidth = "0px";

    let orderEntityProductView = document.createElement("div");
    orderEntityProductView.className = "SS_IC";
    orderEntityProductView.style.width = "550px";
    orderEntityProductView.style.height = "100%";
    orderEntityProductView.style.borderWidth = "0px";

    /**
     * 动态添加产品数量
     */
    let size = 1;
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
        orderEntityProductView.appendChild(productView);
    }
    orderEntityContentView.style.height = size * 31 + "px";// 高度根据产品数量动态设定
    orderEntityView.style.height = 40 + size * 31 + "px"; // 高度动态设定 其值=title部分+订单产品数量*单个产品高度
    orderEntityContentView.appendChild(orderEntityProductView);

    let orderEntityReceiverView = document.createElement("div");
    orderEntityReceiverView.className = "SS_IC";
    orderEntityReceiverView.style.width = "263px";
    orderEntityReceiverView.style.height = "100%";
    orderEntityReceiverView.style.textAlign = "center";
    orderEntityReceiverView.innerHTML = "北京 北京市 昌平区 回龙观 新龙城小区二期380号院 36A 8单元 9008";
    orderEntityContentView.appendChild(orderEntityReceiverView);
    /**
     * 添加参数view
     */
    orderEntityContentView.appendChild(paramView);

    /**
     * 想最外层的容器根对象添加内容容器
     */
    orderEntityView.appendChild(orderEntityContentView);

    return orderEntityView;
}