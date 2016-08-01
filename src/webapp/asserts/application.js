/**
 * Created by dingpengwei on 7/20/16.
 */
const BASE_PATH = "http://localhost:8080";
const MAIN_TITLE_ID = "main_title";
const MAIN_CONTENT_ID = "main_content_container";
const TOAST_CONTAINER_ID = "body";

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

function asyncRequestByPost(url, onDataCallback, onErrorCallback, onTimeoutCallback) {
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
    xmlHttp.send(encodeURI("firstName=firstName&birthday=birthday"));
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