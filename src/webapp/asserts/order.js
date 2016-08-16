/**
 * Created by dingpengwei on 8/16/16.
 */

function onExpressingTabCallback() {
    console.log("onExpressingTabCallback");
}

function onExpressedTabCallback() {
    console.log("onExpressedTabCallback");
}

function onFinishTabCallback() {
    console.log("onFinishTabCallback");
}

function onAllTabCallback() {
    console.log("onAllTabCallback");
}

function showOrderView() {
    // 重置界面
    resetView();
    // 获取根元素对象
    let titleViewContainer = document.getElementById(MAIN_TITLE_ID);

    let tabItems = new Array();
    tabItems.push(new Tab("expressing", "未发货", "horizontalSelected", onExpressingTabCallback));
    tabItems.push(new Tab("expressed", "已发货", "horizontalNormal", onExpressedTabCallback));
    tabItems.push(new Tab("finished", "已完成", "horizontalNormal", onFinishTabCallback));
    tabItems.push(new Tab("all", "全部", "horizontalNormal", onAllTabCallback));
    createOrderTitleTab(titleViewContainer, tabItems);
}

function createOrderTitleTab(containerView ,tabItems) {
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