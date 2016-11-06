/**
 * Created by dingpengwei on 11/5/16.
 */
/**
 * 封装表格属性
 * @param id canvas的ID
 * @param xNumber 在X轴上要显示的个数
 * @param yNumber 在Y轴上要显示的个数
 * @param xStart 在X轴上的起始偏差
 * @param yStart 在Y轴上的起始偏差,由于没有计算Y轴的偏差,故此参数无效
 * @param xEnd 在X轴上的结束偏差
 * @param yEnd 在Y轴上的结束偏差,由于没有计算Y轴的偏差,故此参数无效
 * @param xName 在X轴上的名称
 * @param yName 在Y轴上的名称
 * @constructor
 */
function PolylineChartTable(id, xNumber, yNumber, xStart, yStart, xEnd, yEnd, xName, yName,pointClick, clickCallback) {
    this.id = id;
    this.width = 0;
    this.height = 0;
    this.xNumber = xNumber;
    this.yNumber = yNumber;
    this.xStart = xStart > 0 ? xStart : 1;
    this.yStart = yStart;
    this.xEnd = xEnd > xNumber ? xNumber : xEnd;
    this.yEnd = yEnd;
    this.xName = xName;
    this.yName = yName;
    //X轴上的边距
    this.xPaddingLeft = 5;
    this.xPaddingRight = 5;
    //Y轴上的边距
    this.yPaddingTop = 10;
    this.yPaddingBottom = 5;
    //X轴上线条的间隔
    this.xOffset = 0;
    //Y轴上线条的间隔
    this.yOffset = 0;

    this.textXOffset = 5;
    this.textYOffset = 7;

    this.marginTop = 0;
    this.marginLeft = 0;

    this.pointClick = pointClick;
    this.clickCallback = clickCallback;
};

/**
 * 封装数据对象
 * @param id
 * @param width
 * @param color
 * @param data
 * @constructor
 */
function PolylineChart(id, width, color, data) {
    this.id = id;
    this.width = width;
    this.color = color;
    this.data = data;
}

/**
 * 绘制
 * @param polylineChartTable
 * @param polylineCharts
 */
function drawPolylineChart(polylineChartTable, polylineCharts) {
    var chartCanvas = document.getElementById(polylineChartTable.id);
    chartCanvas.eventElements = new Array();
    chartCanvas.polylineChartTable = polylineChartTable;
    chartCanvas.polylineCharts = polylineCharts;
    chartCanvas.addEventListener("mousemove", onMouseMove);
    chartCanvas.addEventListener("click", onMouseClick);
    var context = chartCanvas.getContext("2d");
    polylineChartTable.width = chartCanvas.width;
    polylineChartTable.height = chartCanvas.height;
    polylineChartTable.marginTop = chartCanvas.offsetTop;
    polylineChartTable.marginLeft = chartCanvas.offsetLeft;
    context.save();
    context.clearRect(0, 0, polylineChartTable.width, polylineChartTable.height);
    context.translate(0.5, 0.5);
    drawPolylineTable(context, polylineChartTable);
    var length = polylineCharts.length;
    for (var index = 0; index < length; index++) {
        drawPolylineChartItem(context, polylineChartTable, polylineCharts[index]);
    }
    context.restore();

}

/**
 * 可点击点对象
 * @param x 可点击点的x坐标
 * @param y 可点击点的y坐标
 * @param radius 可点击点的半径
 * @param X 可点击点X轴的业务数据
 * @param Y 可点击点Y轴的业务数据
 * @constructor
 */
function ClickPoint(x, y, radius,X,Y) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.X = X;
    this.Y = Y;
}

/**
 * 绘制数据对象
 * @param context 上下文
 * @param polylineChartTable 表格对象
 * @param polylineChart 数据对象
 */
function drawPolylineChartItem(context, polylineChartTable, polylineChart) {
    context.save();
    context.beginPath();
    context.lineCap = "round";
    context.lineWidth = polylineChart.width;
    context.strokeStyle = polylineChart.color;
    context.moveTo(polylineChartTable.xPaddingLeft, polylineChartTable.height - polylineChartTable.yPaddingBottom);
    for (var i = polylineChartTable.xStart - 1, j = i; i < polylineChartTable.xEnd; i++, j++) {
        var x = polylineChartTable.xOffset * (i + 1) + polylineChartTable.xPaddingLeft;
        var y = polylineChartTable.height - polylineChart.data[j] * polylineChartTable.yOffset - polylineChartTable.yPaddingBottom;
        context.lineTo(x, y);
        context.moveTo(x, y);
    }
    context.stroke();
    context.closePath();
    context.restore();

    if (polylineChartTable.pointClick) {
        context.save();
        let eventElements = document.getElementById(polylineChartTable.id).eventElements;
        for (var i = polylineChartTable.xStart - 1, j = i; i < polylineChartTable.xEnd; i++, j++) {
            var x = polylineChartTable.xOffset * (i + 1) + polylineChartTable.xPaddingLeft;
            var y = polylineChartTable.height - polylineChart.data[j] * polylineChartTable.yOffset - polylineChartTable.yPaddingBottom;
            var radius = Math.min(polylineChartTable.xOffset, polylineChartTable.yOffset) / 3;
            if (polylineChart.data[j] == 0) {
                drawCircle(context, x, y, radius, polylineChart.color);
            } else {
                drawPoint(context, x, y, radius, polylineChart.color);
            }
            var note = new ClickPoint(x, y, radius,(i + 1),polylineChart.data[j]);
            eventElements.push(note);
        }
        context.restore();
    }
}

function drawPoint(context, x, y, radius, color) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, radius, 0 * Math.PI, 2 * Math.PI);
    context.fill();
    context.closePath();
}

function drawCircle(context, x, y, radius, color) {
    context.beginPath();
    context.strokeStyle = color;
    context.arc(x, y, radius, 0 * Math.PI, 2 * Math.PI);
    context.stroke();
    context.closePath();
}

/**
 * 绘制表格
 * @param context
 * @param width
 * @param height
 * @param polylineChartTable
 */
function drawPolylineTable(context, polylineChartTable) {
    context.save();
    context.beginPath();
    //边框样式
    context.lineWidth = "2";
    context.strokeStyle = "#000000";
    //绘制底边框
    context.moveTo(polylineChartTable.xPaddingLeft, polylineChartTable.height - polylineChartTable.yPaddingBottom);
    context.lineTo(polylineChartTable.width - polylineChartTable.xPaddingRight, polylineChartTable.height - polylineChartTable.yPaddingBottom);
    //绘制左边框
    context.moveTo(polylineChartTable.xPaddingLeft, polylineChartTable.height - polylineChartTable.yPaddingBottom);
    context.lineTo(polylineChartTable.xPaddingLeft, polylineChartTable.yPaddingTop);
    //绘制坐标原点文字
    context.fillText("0", polylineChartTable.textXOffset, polylineChartTable.height - polylineChartTable.textYOffset);
    context.stroke();
    context.save();
    //数据标示线样式
    context.beginPath();
    context.lineWidth = "1";
    context.strokeStyle = "#CCCCCC";

    var xCounter = polylineChartTable.xNumber + 1; // 实际绘制的线条数量加上Y轴
    polylineChartTable.xOffset = (polylineChartTable.width - polylineChartTable.xPaddingLeft - polylineChartTable.xPaddingRight) / xCounter;
    for (var index = polylineChartTable.xStart; index < polylineChartTable.xEnd + 1; index++) {
        var startX = polylineChartTable.xPaddingLeft + index * polylineChartTable.xOffset;
        context.moveTo(startX, polylineChartTable.yPaddingTop);
        context.lineTo(startX, polylineChartTable.height - polylineChartTable.yPaddingBottom);
        context.fillText(append(index, 2), startX - polylineChartTable.textXOffset, polylineChartTable.height - polylineChartTable.textYOffset);
    }

    // 绘制横向的数据标示线条
    var yCounter = polylineChartTable.yNumber;

    polylineChartTable.yOffset = (polylineChartTable.height - polylineChartTable.yPaddingTop - polylineChartTable.yPaddingBottom) / (yCounter + 1);
    for (var index = 1; index < yCounter + 1; index++) {
        var startY = polylineChartTable.height - polylineChartTable.yPaddingBottom - polylineChartTable.yOffset * index;
        context.moveTo(polylineChartTable.xPaddingLeft, startY);
        context.lineTo(polylineChartTable.width - polylineChartTable.xPaddingLeft, startY);
        context.fillText(append(index, 2), polylineChartTable.xPaddingLeft, startY);
    }
    context.stroke();
    context.restore();

    context.beginPath();
    //绘制底部边框的单位
    context.fillText(polylineChartTable.xName, polylineChartTable.width - polylineChartTable.xPaddingRight - polylineChartTable.xOffset + 2 * polylineChartTable.textXOffset, polylineChartTable.height - polylineChartTable.textYOffset);
    context.stroke();
    context.restore();

    context.save();
    context.beginPath();
    context.fillStyle = 'red';
    //绘制左边边框的单位
    context.fillText(polylineChartTable.yName, polylineChartTable.xPaddingLeft, polylineChartTable.yPaddingTop);
    context.stroke();
    context.restore();
}

function append(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

function onMouseMove(event) {
    for (var index = 0; index < this.eventElements.length; index++) {
        var clickPoint = this.eventElements[index];
        var xSpace = Math.abs(clickPoint.x - (event.x - this.offsetLeft));
        var ySpace = Math.abs(clickPoint.y - (event.y - this.offsetTop));
        var powSpace = Math.pow(xSpace, 2) + Math.pow(ySpace, 2);
        var space = Math.sqrt(powSpace);
        if (space <= clickPoint.radius) {
            this.style.cursor = "pointer";
            break;
        } else {
            this.style.cursor = "default";
        }
    }
}

function onMouseClick(event) {
    for (var index = 0; index < this.eventElements.length; index++) {
        var clickPoint = this.eventElements[index];
        var xSpace = Math.abs(clickPoint.x - (event.x - this.offsetLeft));
        var ySpace = Math.abs(clickPoint.y - (event.y - this.offsetTop));
        var powSpace = Math.pow(xSpace, 2) + Math.pow(ySpace, 2);
        var space = Math.sqrt(powSpace);
        if (space <= clickPoint.radius) {
            this.polylineChartTable.clickCallback(clickPoint.X,clickPoint.Y);
            break;
        }
    }
}