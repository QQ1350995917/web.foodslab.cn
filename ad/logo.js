/**
 * Created by dingpengwei on 9/26/16.
 */

const radius = 100;
const outerRadius = 100;
const innerRadius = 95;

function loadLogo1() {
    let canvas = document.getElementById("logo1");
    var context = canvas.getContext('2d');
    drawLogoBackground(context, "gold");
    drawLogoForeground(context, "red");
    drawLogoCompany(context, "black", company);
    drawLogoTrademark(context,"black", trademark);
    drawLogoImage(context);
}

function loadLogo2() {
    let canvas = document.getElementById("logo2");
    var context = canvas.getContext('2d');
    drawLogoBackground(context, "red");
    drawLogoForeground(context, "gold");
    drawLogoCompany(context, "black", company);
    drawLogoTrademark(context,"black", trademark);
    drawLogoImage(context);
}

function drawLogoBackground(context, color) {
    context.beginPath();
    context.arc(radius, radius, outerRadius, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStyle = color;
    context.fill();
}

function drawLogoForeground(context, color) {
    context.beginPath();
    context.arc(radius, radius, innerRadius, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStyle = color;
    context.fill();
}

function drawLogoCompany(context, color, texts) {
    context.font = "10px Arial";
    let rotate = 79;
    for (let i = 0; i < texts.length; i++) {
        context.save();
        context.translate(radius, radius);
        context.fillStyle = color;
        context.rotate(rotate * Math.PI / 180);
        context.fillText(texts[i], 0, 92);
        context.restore();
        rotate -= 15;
    }
}

function drawLogoTrademark(context, color, texts) {
    context.font = "10px Arial";
    context.fillStyle = color;
    context.fillText(texts, 80, 20);
}

function drawLogoImage(context) {
    var shiImage = new Image();
    shiImage.onload = function () {
        context.drawImage(shiImage, 20, 30);
    };
    shiImage.src = "shi.png";


    var fangImage = new Image();
    fangImage.onload = function () {
        context.drawImage(fangImage, 100, 35);
    };
    fangImage.src = "fang.png";
}