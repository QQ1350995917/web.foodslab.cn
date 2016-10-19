/**
 * Created by dingpengwei on 7/19/16.
 */
const BASE_PATH = "http://localhost:8080/foodslab";
const ID_FRAME_LEFT_MENU = "leftMenu";
const MAIN_TITLE_ID = "main_title";
const MAIN_CONTENT_ID = "main_content";
const TOAST_CONTAINER_ID = "body";

function requestMenus() {
    requestMeta();
    const url = BASE_PATH + "/menu/mRetrieves";
    asyncRequestByGet(url, function (data) {
        let result = checkResponseDataFormat(data);
        if (result){
            var jsonData = JSON.parse(data);
            if (jsonData.code == RESPONSE_SUCCESS){
                var menuEntities = jsonData.data;
                var horizontalTabItems = new Array();
                var verticalTabItems = new Array();

                for (var index = 0; index < menuEntities.length; index++) {
                    var menuEntity = menuEntities[index];
                    if (menuEntity.category == 0) {
                        horizontalTabItems.push(menuEntity);
                    } else if (menuEntity.category == 1) {
                        verticalTabItems.push(menuEntity);
                    }
                }
                console.log(verticalTabItems);
                document.getElementById(ID_FRAME_LEFT_MENU).appendChild(createFrameVerticalTabHostDiv("left",verticalTabItems,function () {

                },-1));
            }
        }
    }, onErrorCallback, onTimeoutCallback);
}

let UNITS;
let EXPRESS = ["顺丰快递", "圆通快递", "中通快递", "邮政快递"];
function requestMeta() {
    // asyncRequestByGet(BASE_PATH + "/meta", function (data) {
    //     var json = JSON.parse(data);
    //     UNITS = json.data;
    // }, onErrorCallback, onTimeoutCallback);
}

function createFrameVerticalTabHostDiv(viewId, tabItems, onItemClickCallback, defaultSelectIndex) {
    let horizontalTabHost = document.createElement("div");
    horizontalTabHost.id = viewId;
    horizontalTabHost.style.width = "100%";
    horizontalTabHost.style.height = "100%";
    let length = tabItems == undefined ? 0 : tabItems.length;
    let itemWidth = 100;
    let itemHeight = 100;
    if (length > 0){
        itemHeight = 100 / length;
    }
    for (let i = 0; i < length; i++) {
        let tabEntity = tabItems[i];
        let horizontalTabItemContainer = document.createElement("div");
        horizontalTabItemContainer.style.width = itemWidth + "%";
        horizontalTabItemContainer.style.height = itemHeight + "%";
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
    } else if (dataId == "order") {
        resetView();
        showOrderView();
    } else if (dataId == "sys_status") {
        resetView();
    } else if (dataId == "sys_log") {
        resetView();
    } else if (dataId == "sys_flow") {
        resetView();
    } else if (dataId == "sale_chart") {
        resetView();
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

