/**
 * Created by dingpengwei on 7/19/16.
 */
/**
 * 定义Toast对象基本属性
 * @param id
 * @param startX
 * @param startY
 * @param width
 * @param height
 * @param className
 * @constructor
 */
function Toast(id, startX, startY, width, height, className) {
    if (id == undefined || id == "" || id == null){
        id = "body";
    }
    if (width == 0 || width == undefined || width == "" || width == null){
        width = 200;
    }
    if (height == 0 || height == undefined || height == "" || height == null){
        height = 30;
    }
    this.view = document.getElementById(id);
    this.startX = startX;
    this.startY = startY;
    this.width = width;
    this.height = height;
    this.className = className;
    this.opacity = 1;
    this.step = 0.01;
    this.duration = 10;
}

/**
 * 显示出Toast对象
 * @param message
 */
Toast.prototype.show = function (message) {
    var startX = this.view.offsetLeft + this.view.clientWidth / 4;
    var startY = this.view.offsetTop;
    var width = this.view.clientWidth / 2;
    var height = this.view.clientHeight / 2;

    var toastView = document.createElement('div');
    toastView.id = "toastView";
    toastView.style.styleFloat = "left";
    toastView.style.position = "fixed";
    toastView.style.zIndex = "10";

    if (!isNullValue(this.startX)) {
        startX = this.startX;
    }
    if (!isNullValue(this.startY)) {
        startY = this.startY;
    }
    if (!isNullValue(this.width)) {
        width = this.width;
        if (isNullValue(this.startX)){
            startX = this.view.clientWidth / 2 - width / 2;
        }
    }
    if (!isNullValue(this.height)) {
        height = this.height;
    }
    if (!isNullValue(this.className)) {
        toastView.className = this.className;
    } else {
        toastView.style.left = startX + "px";
        toastView.style.top = startY + "px";
        toastView.style.width = width + "px";
        toastView.style.height = height + "px";
        toastView.style.lineHeight = height + "px";
        toastView.style.textAlign = "center";
        toastView.style.color = "#FFFFFF";
        toastView.style.backgroundColor = '#CCCCCC';
        toastView.style.opacity = this.opacity;
        toastView.style.borderRight = "1px solid #999999"
        toastView.style.borderBottom = "1px solid #999999"
        toastView.style.borderLeft = "1px solid #999999"
        toastView.style.borderBottomRightRadius = "5px"
        toastView.style.borderBottomLeftRadius = "5px"
    }
    if (!isNullValue(message)) {
        toastView.innerHTML = message;
    } else {
        toastView.innerHTML = "you can set message here";
    }
    document.body.appendChild(toastView);

    var opacity = this.opacity;
    var step = this.step;
    var timer = setTimeout(function () {
        var task = setInterval(function () {
            if (opacity < 0) {
                clearInterval(task);
                dismiss();
            } else {
                toastView.style.opacity = opacity;
            }
            opacity -= step;
        }, this.duration);
        clearTimeout(timer);
    },1000);

}

/**
 * 移出Toast对象
 */
function dismiss() {
    document.body.removeChild(document.getElementById("toastView"));
}