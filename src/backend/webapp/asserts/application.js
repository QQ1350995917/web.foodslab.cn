/**
 * Created by dingpengwei on 7/20/16.
 */
const RC_SUCCESS = 200;//执行成功
const RC_SUCCESS_EMPTY = 204;//执行成功,符合请求条件的参数是空
const RC_PARAMS_BAD = 400;//提交参数不符合要求
const RC_ACCESS_BAD = 401;//权限限制的无法访问
const RC_PARAMS_REPEAT = 406;//登录名重复
const RC_ACCESS_TIMEOUT = 408;//权限超时造成的无法访问
const RC_TO_MANY = 429;//访问频率造成的拒绝服务
const RC_SEVER_ERROR = 500;//服务器内部异常导致的失败


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

function asyncRequestByPost(url, onDataCallback, onErrorCallback, onTimeoutCallback, params) {
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

function onErrorCallback() {

}

function onTimeoutCallback() {

}


/**
 * 通用函数,检测服务器返回的数据格式是否正确
 * @param data 服务器返回的数据
 * @returns {boolean} 检测结果
 */
function checkResponseDataFormat(data) {
    return true;
}


/**
 * 数据层工具方法
 * 判定字符串是否是泛义上的空
 * @param value
 * @returns {boolean}
 */
function isNullValue(value) {
    if (value == undefined || value == null || value == "") {
        return true;
    }
    return false;
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

