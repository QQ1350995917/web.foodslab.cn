/**
 * Created by dingpengwei on 7/19/16.
 */
const menuUrl = BASE_PATH + "/menus";

function requestMenus(managerId) {
    asyncRequestByGet(menuUrl, onMenuDataCallback, onMenuErrorCallback, onMenuTimeoutCallback);
}

function onMenuErrorCallback() {
}

function onMenuTimeoutCallback() {
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
        if (menu.positionId == "51bf4162-5270-11e6-8311-1cae145b8cab") {
            horizontalTabItems.push(new TabItem(menu.menuId, menu.label, "horizontalIndexNormal", "horizontalIndexSelect", "horizontalIndexNormal"));
        } else if (menu.positionId == "8e2e3fc7-1968-4f1b-bd4c-07794c5855b5") {
            verticalTabItems.push(new TabItem(menu.menuId, menu.label, "verticalNormal", "verticalSelected", "verticalNormal", "verticalNormalArrow", "verticalSelectedArrow", "verticalNormalArrow"));
        }
    }

    initHorizontalTabHostView("header_menu", horizontalTabItems, 100, true);
    initVerticalTabHostView("leftMenu", verticalTabItems, true);
}

function onFrameMenuItemClick(dataId) {
    resetView();
    if (dataId == "0f12bdb8-85e2-4fa5-a5aa-25ea1c88b40b") {
        managerIndex();
    } else if (dataId == "") {

    }

}

