/**
 * Created by dingpengwei on 7/19/16.
 */
const menuUrl = BASE_PATH + "/menus";
function requestMenus(managerId) {
    asyncRequestByGet(menuUrl, onDataCallback,onErrorCallback,onTimeoutCallback);
}

function onErrorCallback() {
}

function onTimeoutCallback() {
}

function onDataCallback(data) {
    var json = JSON.parse(data);
    var code = json.code;
    var message = json.message;
    var menus = JSON.parse(json.data);
    console.log(code);
    console.log(message);
    console.log(menus.length);

    var horizontalTabItems = new Array();
    var verticalTabItems = new Array();

    for (var index =0;index<menus.length;index++){
        var menu = menus[index].columns;
        // console.log(menu);
        if (menu.positionId == "51bf4162-5270-11e6-8311-1cae145b8cab"){
            horizontalTabItems.push(new TabItem(menu.menuId, menu.label, "horizontalIndexNormal","horizontalIndexSelect","horizontalIndexNormal"));
        }else if(menu.positionId == "8e2e3fc7-1968-4f1b-bd4c-07794c5855b5"){
            verticalTabItems.push(new TabItem(menu.menuId, menu.label, "verticalNormal", "verticalSelected", "verticalNormal", "verticalNormalArrow", "verticalSelectedArrow", "verticalNormalArrow"));
        }
    }

    initHorizontalTabHostView("header_menu",horizontalTabItems,100,true);
    initVerticalTabHostView("leftMenu",verticalTabItems,true);
}

