/**
 * Created by dingpengwei on 7/19/16.
 */
const BASE_PATH = "http://localhost:8080/foodslab";
const ID_TOAST_CONTAINER = "body";
const ID_FRAME_HEADER_MENU = "headerMenu";
const ID_FRAME_LEFT_MENU = "leftMenu";
const ID_MAIN_TITLE = "mainTitle";
const ID_MAIN_CONTAINER = "mainContainer";

const RESPONSE_SUCCESS = 3050;
const APP_CONST_CLIENT_ID = "clientId";
//标记元素是添加按钮
const APP_CONST_ADD_NEW = "addNew";


function onFrameLoad() {
    let topMenuEntity = new Object();
    topMenuEntity.category = 1;
    requestMenus(topMenuEntity);
    let leftMenuEntity = new Object();
    leftMenuEntity.category = 2;
    requestMenus(leftMenuEntity);

    requestMeta();
}

function requestMenus(menuEntity) {
    const url = BASE_PATH + "/menu/mRetrieves?p=" + JSON.stringify(menuEntity);
    asyncRequestByGet(url, function (data) {
        let result = checkResponseDataFormat(data);
        if (result){
            var jsonData = JSON.parse(data);
            if (jsonData.code == RESPONSE_SUCCESS){
                var menuEntities = jsonData.data;
                if (menuEntity.category == 1){
                    document.getElementById(ID_FRAME_HEADER_MENU).appendChild(createHorizontalTabHostDiv("mTop",menuEntities,"horizontalIndexSelect","horizontalIndexNormal",function (menuEntity) {
                        onFrameMenuItemClick(menuEntity.flag);
                        resetFrameVerticalTabHost("mLeft");
                    },-1));
                } else if (menuEntity.category == 2){
                    document.getElementById(ID_FRAME_LEFT_MENU).appendChild(createFrameVerticalTabHostDiv("mLeft",menuEntities,function (menuEntity) {
                        onFrameMenuItemClick(menuEntity.flag);
                        resetTabHost("mTop","horizontalIndexNormal");
                    },-1));
                }
            }
        }
    }, onErrorCallback, onTimeoutCallback);
}

function createFrameVerticalTabHostDiv(viewId, tabItems, onItemClickCallback, defaultSelectIndex) {
    let horizontalTabHost = document.createElement("div");
    horizontalTabHost.id = viewId;
    horizontalTabHost.style.width = "100%";
    horizontalTabHost.style.height = "100%";
    let length = tabItems == undefined ? 0 : tabItems.length;
    for (let i = 0; i < length; i++) {
        let tabEntity = tabItems[i];
        let horizontalTabItemContainer = document.createElement("div");
        horizontalTabItemContainer.style.width = "100%";
        horizontalTabItemContainer.style.height = "40px";
        let tabItemDiv = document.createElement("div")
        tabItemDiv.innerHTML = tabEntity.label;
        tabItemDiv.className = "verticalNormal";
        let arrowDiv = document.createElement("div")
        arrowDiv.className = "frameVTabNormalArrow";
        if (i == defaultSelectIndex) {
            tabItemDiv.className = "verticalSelected";
            arrowDiv.className = "frameVTabSelectedArrow";
            onItemClickCallback(tabEntity);
        }
        tabItemDiv.onclick = function () {
            let size = horizontalTabHost.childElementCount;
            for (let j = 0; j < size; j++) {
                if (i == j) {
                    horizontalTabHost.childNodes[j].childNodes[0].className = "verticalSelected";
                    horizontalTabHost.childNodes[j].childNodes[0].childNodes[1].className = "frameVTabSelectedArrow";
                } else {
                    horizontalTabHost.childNodes[j].childNodes[0].className = "verticalNormal";
                    horizontalTabHost.childNodes[j].childNodes[0].childNodes[1].className = "frameVTabNormalArrow";
                }
            }
            onItemClickCallback(tabEntity);
        }
        tabItemDiv.appendChild(arrowDiv);
        horizontalTabItemContainer.appendChild(tabItemDiv);
        horizontalTabHost.appendChild(horizontalTabItemContainer);
    }
    return horizontalTabHost;
}

function resetFrameVerticalTabHost(viewId) {
    let container = document.getElementById(viewId);
    if (container){
        let size = container.childElementCount;
        for (let i = 0; i < size; i++) {
            container.childNodes[i].childNodes[0].className = "verticalNormal";
            container.childNodes[i].childNodes[0].childNodes[1].className = "frameVTabNormalArrow";
        }
    }
}

function resetMainContainer() {
    document.getElementById(ID_MAIN_TITLE).innerHTML = null;
    document.getElementById(ID_MAIN_CONTAINER).innerHTML = null;
}

function getTitleContainer() {
    return document.getElementById(ID_MAIN_TITLE);
}

function getMainContainer() {
    return document.getElementById(ID_MAIN_CONTAINER);
}

let UNITS;
let EXPRESS = ["顺丰快递", "圆通快递", "中通快递", "邮政快递"];
function requestMeta() {
    asyncRequestByGet(BASE_PATH + "/meta/units", function (data) {
        var json = JSON.parse(data);
        UNITS = json.data;
    }, onErrorCallback, onTimeoutCallback);
}

function onFrameMenuItemClick(flag) {
    if (flag == "manager") {
        resetMainContainer();
        loadManagerView();
    } else if (flag == "skin") {
        resetMainContainer();
        loadSkinView();
    } else if (flag == "poster") {
        resetMainContainer();
        loadPosterView();
    } else if (flag == "recommend") {
        resetMainContainer();
        loadRecommendView();
    } else if (flag == "link") {
        resetMainContainer();
        loadLinkView();
    } else if (flag == "product") {
        resetMainContainer();
        loadProductView();
    } else if (flag == "user") {
        resetMainContainer();
        loadUserView();
    } else if (flag == "order") {
        resetMainContainer();
        loadOrderView();
    } else if (flag == "sys_status") {
        resetMainContainer();
    } else if (flag == "sys_log") {
        resetMainContainer();
    } else if (flag == "sys_flow") {
        resetMainContainer();
    } else if (flag == "sale_chart") {
        resetMainContainer();
    } else {
        console.log("点击判断值超出范围");
    }
}

/**
 * 创建搜索框
 * @param callback
 * @returns {Element}
 */
function createSearchWidget(width,callback) {
    let searchContainer = document.createElement("div");
    searchContainer.className = "searchWidgetContainer";
    searchContainer.style.width = width;

    let searchEditor = document.createElement("input");
    searchEditor.className = "searchInput";
    searchEditor.style.width = "89%";
    searchContainer.appendChild(searchEditor);

    let searchActionView = document.createElement("div");
    searchActionView.className = "actionButton";
    searchActionView.style.width = "10%";
    searchActionView.innerHTML = "搜索";
    searchActionView.onclick = function () {
        callback(searchEditor.value);
    };
    searchContainer.appendChild(searchActionView);

    return searchContainer;
}

