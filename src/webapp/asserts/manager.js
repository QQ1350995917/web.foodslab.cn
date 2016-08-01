/**
 * Created by dingpengwei on 7/31/16.
 */

/**
 * 管理员接口发生请求错误
 */
function onManagerRequestError() {

}

/**
 * 管理员接口发生请求超时
 */
function onManagerRequestTimeout() {

}

/**
 * 读取管理员列表
 */
function managerIndex() {
    const indexUrl = BASE_PATH + "/manager";
    asyncRequestByGet(indexUrl,onIndexDataCallback,onManagerRequestError(),onManagerRequestTimeout());
}

/**
 * 读取管理员列表
 */
function onIndexDataCallback(data) {
    var result = checkResponsDataFormat(data);
    if (result){
        var mainTitles = new Array(new TabItem("1","管理员信息","horizontalNormal","horizontalSelected","horizontalSelected"));
        initHorizontalTabHostView(MAIN_TITLE_ID,mainTitles);
        var parseData = JSON.parse(data);
        var dataJson = parseData.data;
        for (var index =0;index < dataJson.length;index++){
            var manager = dataJson[index];
            var element = document.createElement("div");
            element.innerHTML = manager.username;
            document.getElementById(MAIN_CONTENT_ID).appendChild(element);
        }
    }
}

/**
 * 管理员用户名是否可用
 */
function check(username){
    const checkUrl = BASE_PATH + "/manager/check";
}

/**
 * 创建管理员
 */
function create(){
    const checkUrl = BASE_PATH + "/manager/create";
}

/**
 * 更新管理员
 */
function update(){
    const checkUrl = BASE_PATH + "/manager/update";
}

