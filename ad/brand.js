/**
 * Created by dingpengwei on 9/26/16.
 */
function brand1() {
    let canvas = document.getElementById("XY1");
    var context = canvas.getContext('2d');
    drawBrandBackground(context,"gold");
    drawBrandForeground(context,"red");
    drawLogoToBrand("logo1",context);
    drawProductName(context);
    drawRawMaterial(context);
    drawComponent(context);
}

function brand2() {
    let canvas = document.getElementById("XY2");
    var context = canvas.getContext('2d');
    drawBrandBackground(context,"red");
    drawBrandForeground(context,"gold");
    drawBrandForeground2(context,"red");
    drawLogoToBrand("logo2",context);
    drawProductName(context);
    drawRawMaterial(context);
    drawComponent(context);
}

function drawBrandBackground(context, color) {
    context.fillStyle = color;
    context.fillRect(0, 0, brandWidth, brandHeight);
}

function drawBrandForeground(context, color) {
    context.fillStyle = color;
    context.fillRect(3, 3, brandWidth - 6, brandHeight - 6);
}

function drawBrandForeground2(context, color) {
    context.fillStyle = color;
    context.fillRect(7, 7, brandWidth - 14, brandHeight - 14);
}

function drawLogoToBrand(id,context) {
    var logoCanvas = document.getElementById(id);
    var img = logoCanvas.toDataURL("image/png");
    context.scale(0.3,0.3);
    var brandImage = new Image();
    brandImage.onload = function () {
        context.drawImage(brandImage, 600, 30);
    };
    brandImage.src = img;
    var shiImage = new Image();
    shiImage.onload = function () {
        context.drawImage(shiImage, 615, 65);
    };
    shiImage.src = "shi.png";
    var fangImage = new Image();
    fangImage.onload = function () {
        context.drawImage(fangImage, 700, 70);
    };
    fangImage.src = "fang.png";
}

function drawProductName(context) {
    context.font = "120px Arial";
    context.fillStyle = "black";
    context.fillText("小磨香油", 850, 170);
    context.font = "50px Arial";
    context.fillText(company, 750, 970);
}

function drawRawMaterial(context) {
    context.font = "50px Arial";
    context.fillStyle = "black";
    context.fillText("食品名称: 小磨香油", 50, 100);
    context.fillText("原       料: 白芝麻", 50, 180);
    context.fillText("原料产地: 中国", 50, 260);
    context.fillText("加工工艺: 水代法", 50, 340);
    context.fillText("质量等级: 一级", 50, 420);
    context.fillText("保 质 期: 18个月", 50, 500);
    context.fillText("贮存方式: 常温存放于", 50, 580);
    context.fillText("阴凉,干燥,避光处", 50, 660);
    context.fillText("产品标准代号:GB8233", 50, 740);

    var fangImage = new Image();
    fangImage.onload = function () {
        context.drawImage(fangImage, 50, 780);
    };
    fangImage.src = "tiaoma.jpg";
}

function drawComponent(context) {
    context.font = "50px Arial";
    context.fillStyle = "black";
    context.fillText("营养成分表", 1580, 100);
    context.fillText("项目  每100毫升 参考值%", 1420, 180);
    context.fillText("能量  3398千焦    40%", 1420, 260);
    context.fillText("蛋白质 0克         0%", 1420, 340);
    context.fillText("脂肪  91克       153%", 1420, 420);
    context.fillText("碳水化合物  0克   0%", 1420, 500);
    context.fillText("钠  0毫克        0%", 1420, 580);

    context.fillText("产地: 河南省周口太康县", 1420, 700);
    context.fillText("地址: 龙曲镇丁庄村19号", 1420, 780);
    context.fillText("电话: 12345678900", 1420, 860);
}