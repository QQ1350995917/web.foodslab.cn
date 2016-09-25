/**
 * Created by dingpengwei on 7/20/16.
 */
const BASE_PATH = "http://localhost:8080/foodslab";
const MAIN_TITLE_ID = "main_title";
const MAIN_CONTENT_ID = "main_content_container";
const TOAST_CONTAINER_ID = "body";

const RESPONSE_SUCCESS = 3050;

const APP_CONST_MENU = new Array();//全局变量,保存所有的菜单引用
const APP_CONST_CLIENT_ID = "clientId";

//标记元素是添加按钮
const APP_CONST_ADD_NEW = "addNew";

function resetView() {
    var main_title_view = document.getElementById(MAIN_TITLE_ID);
    main_title_view.innerHTML = null;
    var main_content_view = document.getElementById(MAIN_CONTENT_ID);
    main_content_view.innerHTML = null;
}

function asyncRequestByGet(url, onDataCallback, onErrorCallback, onTimeoutCallback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            onDataCallback(xmlHttp.responseText);
        } else {
            onErrorCallback;
        }
    }
    xmlHttp.timeout = 5000;
    xmlHttp.ontimeout = onTimeoutCallback;
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

function asyncRequestByPost(url,onDataCallback, onErrorCallback, onTimeoutCallback,params) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            onDataCallback(xmlHttp.responseText);
        } else {
            onErrorCallback();
        }
    }
    xmlHttp.timeout = 5000;
    xmlHttp.ontimeout = onTimeoutCallback;
    xmlHttp.open("POST", url, true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(encodeURI(params));
}

/**
 * 通用函数,检测服务器返回的数据格式是否正确
 * @param data 服务器返回的数据
 * @returns {boolean} 检测结果
 */
function checkResponsDataFormat(data) {
    return true;
}

function applicationOnload() {
    requestMenus("");
}

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}      