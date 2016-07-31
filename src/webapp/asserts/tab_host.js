/**
 * Created by dingpengwei on 7/17/16.
 */
/**
 * TabItem的基本数据对象
 * @param id 数据ID
 * @param displayName 显示名称
 * @param normalClassName 非选中状态下的样式名称
 * @param selectedClassName 选中状态下的样式名称
 * @param currentClassName 当前状态下的样式名称
 * @constructor
 */
function TabItem(id, displayName, normalClassName, selectedClassName, currentClassName, verticalNormalArrowClassName, verticalSelectedArrowClassName, verticalCurrentArrowClassName, width, height) {
    this.id = id;
    this.displayName = displayName;
    this.normalClassName = normalClassName;
    this.selectedClassName = selectedClassName;
    this.currentClassName = currentClassName;
    this.verticalNormalArrowClassName = verticalNormalArrowClassName;
    this.verticalSelectedArrowClassName = verticalSelectedArrowClassName;
    this.verticalCurrentArrowClassName = verticalCurrentArrowClassName;
    this.width = width;
    this.height = height;
}

/**
 * 添加一个互斥的ID
 * @param exclusiveId
 */
var exclusiveIds = new Array();
function addExclusiveId(exclusiveId) {
    if (exclusiveId !== null && exclusiveId !== undefined && exclusiveId !== '') {
        if (exclusiveIds.indexOf(exclusiveId) < 0) {
            exclusiveIds.push(exclusiveId);
        }
    }
}
/**
 * 初始化横向的TabHost
 * @param id 容器ID
 * @param tabItems 数据集合
 * @param width 设定宽度
 * @param isExclusive 是否和其他的容器有互斥性
 */
function initHorizontalTabHostView(id, tabItems, width,isExclusive) {
    var tabHost = document.getElementById(id);
    var tabWidth = parseInt(tabHost.clientWidth);
    var tabHeight = parseInt(tabHost.clientHeight);
    var tabSize = tabItems.length;
    var tabItemWidth = (tabWidth - ((tabSize - 1) * 3)) / tabSize;
    if (width != null) {
        tabItemWidth = width;
    }

    for (var index = 0; index < tabSize; index++) {
        var tabItem = tabItems[index];
        tabItem.width = tabItemWidth;
        tabItem.height = tabHeight;
        createTabItem(tabHost, tabItem, false);
    }

    if (isExclusive){
        addExclusiveId(id);
    }

}


/**
 * 初始化纵向的TabHost
 * @param id 容器ID
 * @param tabItems 数据源集合
 */
function initVerticalTabHostView(id, tabItems,isExclusive) {
    var tabHost = document.getElementById(id);
    var tabWidth = parseInt(tabHost.clientWidth);
    var tabHeight = parseInt(tabHost.clientHeight);
    var tabSize = tabItems.length;
    var tabItemHeight = tabHeight / tabSize;

    for (var index = 0; index < tabSize; index++) {
        var tabItem = tabItems[index];
        tabItem.width = tabWidth;
        tabItem.height = tabItemHeight;
        createTabItem(tabHost, tabItem, true);
    }


    if (isExclusive){
        addExclusiveId(id);
    }

}

/**
 * 创建一个TabHost item并添加到dom
 * @param parent 容器
 * @param tabItemData 数据源
 */
function createTabItem(parent, tabItemData, isVertical) {
    var tabItemView = document.createElement('div');
    tabItemView.innerHTML = tabItemData.displayName;
    tabItemView.style.width = tabItemData.width + "px";
    tabItemView.className = tabItemData.currentClassName;
    tabItemView.normalClassName = tabItemData.normalClassName;
    tabItemView.selectedClassName = tabItemData.selectedClassName;
    tabItemView.addEventListener("click", onTabItemClick);
    if (isVertical) {
        var tabItemViewArrow = document.createElement('div');
        tabItemViewArrow.tagName =
            tabItemViewArrow.className = tabItemData.verticalCurrentArrowClassName;
        tabItemViewArrow.normalClassName = tabItemData.verticalNormalArrowClassName;
        tabItemViewArrow.selectedClassName = tabItemData.verticalSelectedArrowClassName;
        tabItemView.appendChild(tabItemViewArrow)
    }
    parent.appendChild(tabItemView);
}


/**
 * 点击事件
 */
function resetTabHost(id) {
    var tabHost = document.getElementById(id);
    var tabLength = tabHost.childElementCount;
    for (var index = 0; index < tabLength; index++) {
        tabHost.childNodes[index].className = tabHost.childNodes[index].normalClassName;
        if (tabHost.childNodes[index].childNodes.length > 1) {
            tabHost.childNodes[index].childNodes[1].className = tabHost.childNodes[index].childNodes[1].normalClassName;
            tabHost.childNodes[1].className = tabHost.childNodes[1].normalClassName;
        }
    }
}

/**
 * 点击事件
 */
function onTabItemClick() {
    var tabLength = this.parentNode.childElementCount;
    for (var index = 0; index < tabLength; index++) {
        this.parentNode.childNodes[index].className = this.normalClassName;
        if (this.childNodes.length > 1) {
            this.parentNode.childNodes[index].childNodes[1].className = this.parentNode.childNodes[index].childNodes[1].normalClassName;
            this.childNodes[1].className = this.childNodes[1].normalClassName;
        }
    }

    this.className = this.selectedClassName;
    if (this.childNodes.length > 1) {
        this.childNodes[1].className = this.childNodes[1].selectedClassName;
    }

    if (exclusiveIds.indexOf(this.parentNode.id) >= 0){
        for (var index = 0; index < exclusiveIds.length; index++) {
            if (this.parentNode.id !== exclusiveIds[index]){
                resetTabHost(exclusiveIds[index]);
            }
        }
    }

    new Toast('body', null, null, 200, 30).show(this.childNodes[0].data);
}