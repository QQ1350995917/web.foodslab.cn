/**
 * Created by dingpengwei on 7/30/16.
 */

function httpGetAsync(url,callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            console.log(xmlHttp.responseText);
            callback.onResult("adfdf");
        } else {
            // callback.onError("unKnow error");
        }
    }
    xmlHttp.timeout = 5000;
    xmlHttp.ontimeout = function () {
        callback.onTimeOut;
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}
function OnCallBack(){
    this.onTimeOut = function () {
        console.log("time out");
    }
    this.onError = function (message) {
        console.log("error message " + message);
    }
}

OnCallBack.prototype.onResult = function (result) {
    console.log(result);
};


window.onload = httpGetAsync("http://localhost:8080/manager",OnCallBack);