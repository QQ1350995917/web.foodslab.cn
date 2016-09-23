/**
 * Created by dingpengwei on 7/19/16.
 */
const menuUrl = BASE_PATH + "/menus";


/**
 * 发生请求错误
 */
function onRequestError() {
}

/**
 * 接口发生请求超时
 */
function onRequestTimeout() {
}


function requestMenus(managerId) {
    requestMeta();
    asyncRequestByGet(menuUrl, onMenuDataCallback, onRequestError, onRequestTimeout);
}


function requestMeta() {
    asyncRequestByGet(BASE_PATH + "/meta", onMetaCallback, onRequestError, onRequestTimeout);
}
let UNITS;
let EXPRESS = ["顺丰快递", "圆通快递", "中通快递", "邮政快递"];

function onMetaCallback(data) {
    var json = JSON.parse(data);
    UNITS = json.data;
}


function onMenuDataCallback(data) {
    var json = JSON.parse(data);
    var code = json.code;
    var message = json.message;
    var menus = json.data;
    var horizontalTabItems = new Array();
    var verticalTabItems = new Array();

    for (var index = 0; index < menus.length; index++) {
        var menu = menus[index];
        if (menu.status == 1) {
            menu.menuLabel = menu.label;
            APP_CONST_MENU.push(menu);
        }
        if (menu.position == "top") {
            horizontalTabItems.push(new TabItem(menu.menuId, menu.label, menu.method, "horizontalIndexNormal", "horizontalIndexSelect", "horizontalIndexNormal"));
        } else if (menu.position == "left") {
            verticalTabItems.push(new TabItem(menu.menuId, menu.label, menu.method, "verticalNormal", "verticalSelected", "verticalNormal", "verticalNormalArrow", "verticalSelectedArrow", "verticalNormalArrow"));
        }
    }

    initHorizontalTabHostView(document.getElementById("header_menu"), horizontalTabItems, 100, true);
    initVerticalTabHostView(document.getElementById("leftMenu"), verticalTabItems, true);
}

function onFrameMenuItemClick(dataId) {
    if (dataId == "manager") {
        resetView();
        managerIndex();
    } else if (dataId == "product") {
        resetView();
        initProduct();
    } else if (dataId == "recommend") {
        resetView();
        recommend();
    } else if (dataId == "link") {
        resetView();
        link();
    } else if (dataId == "poster") {
        resetView();
        posterInit();
    } else if (dataId == "skin") {
        resetView();
        initSkinView();
    } else if (dataId == "user") {
        resetView();
        showUsers();
    } else if (dataId == "order"){
        resetView();
        showOrderView();
    } else if (dataId == "message"){
        resetView();
        showMessageView();
    } else {
        console.log(dataId);
        console.log("点击判断值超出范围");
    }
}

/**
 * 创建搜索框
 * @param callback
 * @returns {Element}
 */
function createSearchWidget(callback) {
    let searchContainer = document.createElement("div");
    searchContainer.className = "SS_IC";
    searchContainer.style.width = "100%";
    searchContainer.style.height = "30px";
    searchContainer.style.marginTop = "5px";
    searchContainer.style.marginBottom = "10px";
    searchContainer.style.borderWidth = "0px";

    let searchEditor = document.createElement("input");
    searchEditor.className = "SS_IC_LABEL";
    searchEditor.style.width = "952px";
    searchEditor.style.height = "30px";
    searchEditor.style.lineHeight = "30px";
    searchEditor.style.borderWidth = "1px";
    searchContainer.appendChild(searchEditor);

    let searchActionView = document.createElement("div");
    searchActionView.className = "B_B_D";
    searchActionView.style.width = "100px";
    searchActionView.style.height = "34px";
    searchActionView.style.lineHeight = "30px";
    searchActionView.innerHTML = "搜索";
    searchActionView.onclick = function () {
      callback(searchEditor.value);
    };
    searchContainer.appendChild(searchActionView);
    
    return searchContainer;
}

