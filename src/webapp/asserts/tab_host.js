/**
 * Created by dingpengwei on 7/17/16.
 */
// class TabItem2 {
//     /**
//      *
//      * @param id
//      * @param label
//      * @param normalClassName
//      * @param selectedClassName
//      * @param currentClassName
//      */
//     constructor(id, label,normalClassName,selectedClassName,currentClassName) {
//         this.id = id;
//         this.label = label;
//         this.normalClassName = normalClassName;
//         this.selectedClassName = selectedClassName;
//         this.currentClassName = currentClassName;
//         this.width = undefined;
//         this.height = undefined;
//     }
//
//     setWidth(width){
//         this.width = width;
//     }
//
//     setHeight(height){
//         this.height = height;
//     }
//
//     setVerticalTabHostArrowNormalClasssName(verticalNormalArrowClassName){
//         this.verticalNormalArrowClassName = verticalNormalArrowClassName;
//     }
//
//     setVerticalSelectedArrowClassName(verticalSelectedArrowClassName){
//         this.verticalSelectedArrowClassName = verticalSelectedArrowClassName;
//     }
//
//     setVerticalCurrentArrowClassName(verticalCurrentArrowClassName){
//         this.verticalCurrentArrowClassName = verticalCurrentArrowClassName;
//     }
//
// }

/**
 * TabItem的基本数据对象
 * @param id 数据ID
 * @param displayName 显示名称
 * @param normalClassName 非选中状态下的样式名称
 * @param selectedClassName 选中状态下的样式名称
 * @param currentClassName 当前状态下的样式名称
 * @constructor
 */
function TabItem(id, displayName, method, normalClassName, selectedClassName, currentClassName, verticalNormalArrowClassName, verticalSelectedArrowClassName, verticalCurrentArrowClassName, width, height) {
    this.id = id;
    this.displayName = displayName;
    this.method = method;
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
 * @param container 容器
 * @param tabItems 数据集合
 * @param width 设定宽度
 * @param isExclusive 是否和其他的容器有互斥性
 */
function initHorizontalTabHostView(container, tabItems, width, isExclusive, callback) {
    var tabWidth = parseInt(container.clientWidth);
    var tabHeight = parseInt(container.clientHeight);
    var tabSize = tabItems.length;
    var tabItemWidth = (tabWidth - ((tabSize - 1) * 3)) / tabSize;
    if (width != null) {
        tabItemWidth = width;
    }

    for (var index = 0; index < tabSize; index++) {
        var tabItem = tabItems[index];
        tabItem.width = tabItemWidth;
        tabItem.height = tabHeight;
        createTabItem(container, tabItem, false, callback);
    }

    if (isExclusive) {
        addExclusiveId(container.id);
    }

}


/**
 * 初始化纵向的TabHost
 * @param id 容器ID
 * @param tabItems 数据源集合
 */
function initVerticalTabHostView(container, tabItems, isExclusive) {
    var tabWidth = parseInt(container.clientWidth);
    var tabHeight = parseInt(container.clientHeight);
    var tabSize = tabItems.length;
    var tabItemHeight = tabHeight / tabSize;

    for (var index = 0; index < tabSize; index++) {
        var tabItem = tabItems[index];
        tabItem.width = tabWidth;
        tabItem.height = tabItemHeight;
        createTabItem(container, tabItem, true);
    }


    if (isExclusive) {
        addExclusiveId(container.id);
    }

}

/**
 * 创建一个TabHost item并添加到dom
 * @param parent 容器
 * @param tabItemData 数据源
 */
function createTabItem(container, tabItemData, isVertical, callback) {
    var tabItemView = document.createElement('div');
    tabItemView.innerHTML = tabItemData.displayName;
    tabItemView.style.width = tabItemData.width + "px";
    tabItemView.className = tabItemData.currentClassName;
    tabItemView.normalClassName = tabItemData.normalClassName;
    tabItemView.selectedClassName = tabItemData.selectedClassName;
    tabItemView.method = tabItemData.method;
    tabItemView.dataId = tabItemData.id;
    if (callback != undefined && (tabItemView.method == APP_CONST_ADD_NEW || tabItemView.id == APP_CONST_ADD_NEW )) {
        tabItemView.addEventListener("click", callback);
    } else {
        tabItemView.addEventListener("click", onTabItemClick);
    }

    if (isVertical) {
        var tabItemViewArrow = document.createElement('div');
        tabItemViewArrow.className = tabItemData.verticalCurrentArrowClassName;
        tabItemViewArrow.normalClassName = tabItemData.verticalNormalArrowClassName;
        tabItemViewArrow.selectedClassName = tabItemData.verticalSelectedArrowClassName;
        tabItemView.appendChild(tabItemViewArrow)
    }
    container.appendChild(tabItemView);
}


/**
 * 点击事件
 */
function resetTabHost(container) {
    var tabLength = container.childElementCount;
    for (var index = 0; index < tabLength; index++) {
        container.childNodes[index].className = container.childNodes[index].normalClassName;
        if (container.childNodes[index].childNodes.length > 1) {
            container.childNodes[index].childNodes[1].className = container.childNodes[index].childNodes[1].normalClassName;
            container.childNodes[1].className = container.childNodes[1].normalClassName;
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

    if (exclusiveIds.indexOf(this.parentNode.id) >= 0) {
        for (var index = 0; index < exclusiveIds.length; index++) {
            if (this.parentNode.id !== exclusiveIds[index]) {
                resetTabHost(document.getElementById(exclusiveIds[index]));
            }
        }
    }

    onFrameMenuItemClick(this.method);

    new Toast(TOAST_CONTAINER_ID, null, null, 200, 30).show(this.childNodes[0].data);
}