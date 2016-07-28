/**
 * Created by dingpengwei on 7/19/16.
 */

function getRecommend() {
    var recommend = new Array();
    recommend.push(new Recommend("managerId1", "小磨香油", "一"));
    recommend.push(new Recommend("managerId2", "小磨香油", "二"));
    recommend.push(new Recommend("managerId3", "压榨香油", "三"));
    recommend.push(new Recommend("managerId4", "压榨香油", "四"));
    recommend.push(new Recommend("managerId5", "芝麻酱", "五"));
    recommend.push(new Recommend("managerId6", "芝麻酱", "刘"));
    return recommend;
}


function getManagers() {
    var manager = new Array();
    manager.push(new Manager("managerId", "管理员一", "0", "0", "0", "0"));
    manager.push(new Manager("managerId", "管理员二", "0", "0", "0", "0"));
    manager.push(new Manager("managerId", "管理员三", "0", "0", "0", "0"));
    manager.push(new Manager("managerId", "管理员四", "0", "0", "0", "0"));
    manager.push(new Manager("managerId", "管理员五", "0", "0", "0", "0"));
    manager.push(new Manager("managerId", "管理员刘", "0", "0", "0", "0"));
    return manager;
}

function getHorizontalIndexTabItems() {
    var horizontalIndexTabItems = new Array();
    horizontalIndexTabItems.push(new TabItem("1", "流量报表", "horizontalIndexNormal", "horizontalIndexSelect", "horizontalIndexSelect"));
    horizontalIndexTabItems.push(new TabItem("2", "销售报表", "horizontalIndexNormal", "horizontalIndexSelect", "horizontalIndexNormal"));
    return horizontalIndexTabItems;
}

function getHorizontalTabItems() {
    var horizontalTabItems = new Array();
    horizontalTabItems.push(new TabItem("1", "逐月", "horizontalNormal", "horizontalSelected", "horizontalSelected"));
    horizontalTabItems.push(new TabItem("2", "逐年", "horizontalNormal", "horizontalSelected", "horizontalNormal"));
    horizontalTabItems.push(new TabItem("3", "逐日", "horizontalNormal", "horizontalSelected", "horizontalNormal"));
    horizontalTabItems.push(new TabItem("4", "逐时", "horizontalNormal", "horizontalSelected", "horizontalNormal"));
    horizontalTabItems.push(new TabItem("5", "逐分", "horizontalNormal", "horizontalSelected", "horizontalNormal"));
    return horizontalTabItems;
}

function getVerticalTabItems() {
    var VerticalTabItems = new Array();
    VerticalTabItems.push(new TabItem("1", "系统管理", "verticalNormal", "verticalSelected", "verticalNormal", "verticalNormalArrow", "verticalSelectedArrow", "verticalNormalArrow"));
    VerticalTabItems.push(new TabItem("2", "活动管理", "verticalNormal", "verticalSelected", "verticalNormal", "verticalNormalArrow", "verticalSelectedArrow", "verticalNormalArrow"));
    VerticalTabItems.push(new TabItem("3", "产品管理", "verticalNormal", "verticalSelected", "verticalNormal", "verticalNormalArrow", "verticalSelectedArrow", "verticalNormalArrow"));
    VerticalTabItems.push(new TabItem("4", "推荐管理", "verticalNormal", "verticalSelected", "verticalNormal", "verticalNormalArrow", "verticalSelectedArrow", "verticalNormalArrow"));
    VerticalTabItems.push(new TabItem("5", "消息管理", "verticalNormal", "verticalSelected", "verticalNormal", "verticalNormalArrow", "verticalSelectedArrow", "verticalNormalArrow"));
    VerticalTabItems.push(new TabItem("6", "皮肤管理", "verticalNormal", "verticalSelected", "verticalNormal", "verticalNormalArrow", "verticalSelectedArrow", "verticalNormalArrow"));
    VerticalTabItems.push(new TabItem("7", "链接管理", "verticalNormal", "verticalSelected", "verticalNormal", "verticalNormalArrow", "verticalSelectedArrow", "verticalNormalArrow"));
    VerticalTabItems.push(new TabItem("8", "用户管理", "verticalNormal", "verticalSelected", "verticalNormal", "verticalNormalArrow", "verticalSelectedArrow", "verticalNormalArrow"));
    VerticalTabItems.push(new TabItem("9", "订单管理", "verticalNormal", "verticalSelected", "verticalNormal", "verticalNormalArrow", "verticalSelectedArrow", "verticalNormalArrow"));
    VerticalTabItems.push(new TabItem("10", "预约管理", "verticalNormal", "verticalSelected", "verticalNormal", "verticalNormalArrow", "verticalSelectedArrow", "verticalNormalArrow"));
    return VerticalTabItems;
}