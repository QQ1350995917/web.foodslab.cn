/**
 * Created by dingpengwei on 8/19/16.
 */
const BASE_PATH = "http://localhost:8080/foodslab/";
const HEADER_MENU_TOP = "header_menu_top";
const HEADER_MENU_DOWN = "header_menu_down";
const MAIN = "main";

const COLORS = new Array("#715595","#006AA8","#3EAF5C","#F0DB4F","#715595","#006AA8","#3EAF5C","#F0DB4F","#715595","#006AA8","#3EAF5C","#F0DB4F");

function asyncRequestByGet(url, onDataCallback, onErrorCallback, onTimeoutCallback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.timeout = 5000;
    xmlHttp.ontimeout = onTimeoutCallback;
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            onDataCallback(xmlHttp.responseText);
        } else {
            onErrorCallback;
        }
    }
}

function asyncRequestByPost(url,params,onDataCallback, onErrorCallback, onTimeoutCallback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.timeout = 5000;
    xmlHttp.ontimeout = onTimeoutCallback;
    xmlHttp.open("POST", url, true);
    xmlHttp.setRequestHeader("cache-control","no-cache");
    xmlHttp.setRequestHeader("contentType","text/html;charset=uft-8");
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(encodeURI(params));
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            onDataCallback(xmlHttp.responseText);
        } else {
            onErrorCallback();
        }
    }
}

/**
 * 通用函数,检测服务器返回的数据格式是否正确
 * @param data 服务器返回的数据
 * @returns {boolean} 检测结果
 */
function checkResponseDataFormat(data) {
    return true;
}

function onErrorCallback() {

}

function onTimeoutCallback() {

}


function initTitleView() {
    let header = document.getElementById("header");
    header.innerHTML = "<div id='header_icon' class='header_icon'>foodslab.cn</div> <div id='header_menu' class='header_menu'> <div id='header_menu_top' class='header_menu_top'></div> <div id='header_menu_down' class='header_menu_down'></div> </div>";
}

function requestLinker() {
    let url = BASE_PATH + "link";
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            createLinkView(jsonData.data);
        }
    }, onErrorCallback, onTimeoutCallback);
}

function createLinkView(linkEntities) {
    let footer = document.getElementById("footer");
    let counter = 0;
    for (let i = 0; i < linkEntities.length; i++) {
        let linkEntity = linkEntities[i];
        if (linkEntity.children != undefined && linkEntity.children.length > 0) {
            counter++;
            let linkItemView = document.createElement("div");
            linkItemView.className = "footer_link";
            footer.appendChild(linkItemView);
            if (i < linkEntities.length - 1) {
                let linkerTitleView = document.createElement("div");
                linkerTitleView.className = "footer_link_linker";
                linkerTitleView.style.textAlign = "left";
                linkerTitleView.innerHTML = linkEntity.label + ":";
                linkItemView.appendChild(linkerTitleView);
                for (let j = 0; j < linkEntity.children.length; j++) {
                    let subLinkEntity = linkEntity.children[j];
                    let linkerView = document.createElement("div");
                    linkerView.className = "footer_link_linker";
                    let linker = document.createElement("a");
                    linker.innerText = subLinkEntity.label;
                    linker.setAttribute("href",subLinkEntity.href);
                    linker.target = "_blank";
                    linkerView.appendChild(linker);
                    linkItemView.appendChild(linkerView);
                }
            } else {
                let hr = document.createElement("hr");
                hr.className = "footer_link_line";
                linkItemView.appendChild(hr);
                let linkRegister = document.createElement("div");
                linkRegister.className = "footer_link";
                linkRegister.style.width = linkEntity.children.length * 70 + "px";
                linkRegister.style.margin = "auto";
                linkItemView.appendChild(linkRegister);

                for (let j = 0; j < linkEntity.children.length; j++) {
                    let subLinkEntity = linkEntity.children[j];
                    let linkerView = document.createElement("div");
                    linkerView.className = "footer_link_linker";
                    let linker = document.createElement("a");
                    linker.innerText = subLinkEntity.label;
                    linker.setAttribute("href",subLinkEntity.href);
                    linker.target = "_blank";
                    linkerView.appendChild(linker);
                    linkRegister.appendChild(linkerView);
                }
            }
        }
    }
    footer.style.height = counter * 30 + "px";
}

function getScrollTop() {
    var scrollPos;
    if (window.pageYOffset) {
        scrollPos = window.pageYOffset;
    }
    else if (document.compatMode && document.compatMode != 'BackCompat') {
        scrollPos = document.documentElement.scrollTop;
    }
    else if (document.body) {
        scrollPos = document.body.scrollTop;
    }
    return scrollPos;
}

function isNullValue(value) {
    if (value == undefined || value == null || value == ""){
        return true;
    }
    return false;
}