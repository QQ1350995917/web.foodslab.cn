/**
 * Created by dingpengwei on 7/19/16.
 */
const BASE_PATH = "http://localhost:8080/foodslab";
const ID_TOAST_CONTAINER = "body";
const ID_FRAME_HEADER_ICON = "headerIcon";
const ID_FRAME_HEADER_MANAGER = "manager";
const ID_FRAME_HEADER_EXIT = "exit";
const ID_FRAME_HEADER_MENU = "headerMenu";
const ID_FRAME_LEFT_MENU = "leftMenu";
const ID_MAIN_TITLE = "mainTitle";
const ID_MAIN_CONTAINER = "mainContainer";
const KEY_CS = "mcs";

const APP_CONST_CLIENT_ID = "clientId";
//标记元素是添加按钮
const APP_CONST_ADD_NEW = "addNew";
let CURRENT_MANAGER = new Object();

function onFrameLoad() {
    let iconDiv = document.getElementById(ID_FRAME_HEADER_ICON);
    iconDiv.style.cursor = "pointer";
    iconDiv.onclick = function () {
        location.reload();
    };

    let object = new Object();
    object.cs = getCookie(KEY_CS);
    asyncRequestByGet(BASE_PATH + "/manager/mRetrieve?p=" + JSON.stringify(object), function (data) {
        var json = JSON.parse(data);
        if (json.code == RC_SUCCESS) {
            CURRENT_MANAGER = json.data;
            document.getElementById(ID_FRAME_HEADER_MANAGER).innerHTML = CURRENT_MANAGER.username;
        } else if (json.code == RC_ACCESS_TIMEOUT) {
            delCookie(KEY_CS);
            window.open(BASE_PATH + "/ml", "_self");
        }
    }, onErrorCallback, onTimeoutCallback);

    let managerDiv = document.getElementById(ID_FRAME_HEADER_MANAGER);
    managerDiv.onclick = function () {
        resetFrameVerticalTabHost("mLeft");
        resetTabHost("mTop", "horizontalIndexNormal");
        resetMainContainer();
        loadManagerSelfEditorView();
    };

    let exitDiv = document.getElementById(ID_FRAME_HEADER_EXIT);
    exitDiv.onclick = function () {
        let object = new Object();
        object.cs = getCookie(KEY_CS);
        asyncRequestByGet(BASE_PATH + "/manager/mExit?p=" + JSON.stringify(object), function (data) {
            var json = JSON.parse(data);
            if (json.code == RC_SUCCESS) {
                delCookie(KEY_CS);
                window.open(BASE_PATH + "/ml", "_self");
            }
        }, onErrorCallback, onTimeoutCallback);
    };

    console.log(getCookie(KEY_CS));

    let topMenuEntity = new Object();
    topMenuEntity.cs = getCookie(KEY_CS);
    requestMenus(topMenuEntity, function (menuEntities, topMenuEntities, leftMenuEntities) {
        document.getElementById(ID_FRAME_HEADER_MENU).appendChild(createHorizontalTabHostDiv("mTop", topMenuEntities, "horizontalIndexSelect", "horizontalIndexNormal", function (menuEntity) {
            onFrameMenuItemClick(menuEntity.flag);
            resetFrameVerticalTabHost("mLeft");
        }, -1));
        document.getElementById(ID_FRAME_LEFT_MENU).appendChild(createFrameVerticalTabHostDiv("mLeft", leftMenuEntities, function (menuEntity) {
            onFrameMenuItemClick(menuEntity.flag);
            resetTabHost("mTop", "horizontalIndexNormal");
        }, -1));
    });

    requestMeta();
}

function requestMenus(menuEntity, callback) {
    const url = BASE_PATH + "/menu/mRetrieves?p=" + JSON.stringify(menuEntity);
    asyncRequestByGet(url, function (data) {
        let result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            if (jsonData.code == RC_SUCCESS) {
                var menuEntities = jsonData.data;
                let length = menuEntities == undefined ? 0 : menuEntities.length;
                let topMenuEntities = new Array();
                let leftMenuEntities = new Array();
                for (let i = 0; i < length; i++) {
                    let menuEntity = menuEntities[i];
                    if (menuEntity.category == 1) {
                        topMenuEntities.push(menuEntity);
                    } else if (menuEntity.category == 2) {
                        leftMenuEntities.push(menuEntity);
                    }
                }
                callback(menuEntities, topMenuEntities, leftMenuEntities);
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
    if (container) {
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
        loadFlowView();
    } else if (flag == "sale_chart") {
        resetMainContainer();
        loadSaleView();
    } else {
        console.log("点击判断值超出范围");
    }
}

/**
 * 创建搜索框
 * @param callback
 * @returns {Element}
 */
function createSearchWidget(container, callback, defaultKey) {
    let searchContainer = document.createElement("div");
    searchContainer.className = "searchWidgetContainer";

    let searchEditor = document.createElement("input");
    searchEditor.className = "searchInput";
    searchEditor.value = defaultKey == undefined ? "" : defaultKey;
    searchEditor.style.width = ((container.clientWidth * 0.9) - 15) + "px";
    searchContainer.appendChild(searchEditor);

    let searchActionView = document.createElement("div");
    searchActionView.className = "actionButton";
    searchActionView.style.width = (container.clientWidth * 0.1) + "px";
    searchActionView.innerHTML = "搜索";
    searchActionView.onclick = function () {
        callback(searchEditor.value);
    };
    searchContainer.appendChild(searchActionView);
    container.appendChild(searchContainer);
}

function attachPaginationBar(container, allPageNumber, currentPageIndex, callback) {
    if (allPageNumber < 0) {
        allPageNumber = 0;
    }
    if (currentPageIndex > allPageNumber - 1 || currentPageIndex < 0) {
        currentPageIndex = 0;
    }
    let paginationBar = document.createElement("div");
    paginationBar.className = "paginationBar";
    let previousPage = document.createElement("div");
    previousPage.className = "SS_IC_LABEL";
    previousPage.style.borderLeftWidth = "1px";
    previousPage.innerHTML = "<<上一页";
    if (currentPageIndex == 0) {
        previousPage.style.cursor = "default";
    } else {
        previousPage.onclick = function () {
            callback(currentPageIndex - 1);
        }
    }
    paginationBar.appendChild(previousPage);

    if (currentPageIndex - 4 > 1) {
        for (let i = 0; i < currentPageIndex; i++) {
            let pageIndex = document.createElement("div");
            pageIndex.className = "SS_IC_LABEL";
            pageIndex.style.width = "40px";
            if (i == 2) {
                pageIndex.innerHTML = "...";
                pageIndex.style.borderWidth = "0px";
                pageIndex.style.cursor = "default";
                i = currentPageIndex - 3;
            } else {
                pageIndex.innerHTML = i;
            }
            if (i == currentPageIndex - 2) {
                pageIndex.style.borderLeftWidth = "1px";
            }
            if (i != currentPageIndex - 3) {
                pageIndex.onclick = function () {
                    callback(i);
                }
            }
            paginationBar.appendChild(pageIndex);

        }
    } else {
        for (let i = 0; i < currentPageIndex; i++) {
            let pageIndex = document.createElement("div");
            pageIndex.className = "SS_IC_LABEL";
            pageIndex.style.width = "40px";
            pageIndex.innerHTML = i;
            paginationBar.appendChild(pageIndex);
            pageIndex.onclick = function () {
                callback(i);
            }
        }
    }
    let pageIndex = document.createElement("div");
    pageIndex.className = "SS_IC_LABEL";
    pageIndex.style.width = "40px";
    pageIndex.innerHTML = (currentPageIndex);
    pageIndex.style.borderWidth = "0px";
    paginationBar.appendChild(pageIndex);
    if (currentPageIndex + 5 < allPageNumber - 1) {
        for (let i = currentPageIndex + 1; i < allPageNumber; i++) {
            let pageIndex = document.createElement("div");
            pageIndex.className = "SS_IC_LABEL";
            pageIndex.style.width = "40px";
            pageIndex.innerHTML = i;
            if (i == currentPageIndex + 1) {
                pageIndex.style.borderLeftWidth = "1px";
            } else if (i == currentPageIndex + 3) {
                pageIndex.innerHTML = "...";
                pageIndex.style.borderWidth = "0px";
                pageIndex.style.cursor = "default";
                i = allPageNumber - 3;
            }
            if (i == allPageNumber - 2) {
                pageIndex.style.borderLeftWidth = "1px";
            }
            if (i != allPageNumber - 3) {
                pageIndex.onclick = function () {
                    callback(i);
                }
            }
            paginationBar.appendChild(pageIndex);

        }
    } else {
        for (let i = currentPageIndex + 1; i < allPageNumber; i++) {
            let pageIndex = document.createElement("div");
            pageIndex.className = "SS_IC_LABEL";
            pageIndex.style.width = "40px";
            pageIndex.innerHTML = i;
            if (i == currentPageIndex + 1) {
                pageIndex.style.borderLeftWidth = "1px";
            }
            paginationBar.appendChild(pageIndex);
            pageIndex.onclick = function () {
                callback(i);
            }
        }
    }
    let nextPage = document.createElement("div");
    nextPage.className = "SS_IC_LABEL";
    nextPage.innerHTML = "下一页>>";
    if (currentPageIndex + 1 == allPageNumber) {
        nextPage.style.cursor = "default";
        nextPage.style.borderLeftWidth = "1px";
    } else {
        nextPage.onclick = function () {
            callback(currentPageIndex + 1);
        }
    }
    paginationBar.appendChild(nextPage);
    container.appendChild(paginationBar);
}

/**
 * 数据层工具方法
 * 设置本地cookie存储
 * @param key
 * @param value
 * @param expireDays
 */
function setCookie(key, value, expireDays) {
    if (isNullValue(expireDays)) {
        expireDays = 30;
    }
    var expireDate = new Date()
    expireDate.setDate(expireDate.getDate() + expireDays)
    document.cookie = key + "=" + encodeURI(value) + ((expireDays == null) ? "" : ";expires=" + expireDate.toGMTString())
}

/**
 * 数据层工具方法
 * 获取本地cookie存储
 * @param key
 * @returns {*}
 */
function getCookie(key) {
    if (document.cookie.length > 0) {
        let indexStart = document.cookie.indexOf(key + "=")
        if (indexStart != -1) {
            indexStart = indexStart + key.length + 1
            let indexEnd = document.cookie.indexOf(";", indexStart)
            if (indexEnd == -1) indexEnd = document.cookie.length
            return decodeURI(document.cookie.substring(indexStart, indexEnd))
        }
    }
    return ""
}

/**
 * 数据层工具方法
 * 删除本地cookie存储
 * @param key
 */
function delCookie(key) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var del = getCookie(key);
    if (del != null) {
        document.cookie = key + "=" + del + ";expires=" + exp.toGMTString();
    }
}

