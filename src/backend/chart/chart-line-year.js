/**
 * Created by dingpengwei on 7/15/16.
 */

function ChartYearItem(name, lineColor, lineWidth, data) {
    this.name = name;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.data = data;
}

function ChartYear(id, year, start, end, line, unit, borderColor, borderWidth, color, width, chartItems) {
    this.id = id;
    this.year = year; // 年份
    this.start = start;// 开始月份
    this.end = end;// 结束月份
    this.line = line;// X轴标示线条的个数
    this.unit = unit;// 每个X轴标示线条所表示的单位
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;
    this.color = color;
    this.width = width;
    this.chartItems = chartItems;
};

function NoteYearPoint(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
}

var eventElements = [];

function onMouseMove(event) {
    for (var index = 0; index < eventElements.length; index++) {
        var notePoint = eventElements[index];
        var xSpace = Math.abs(notePoint.x - (event.x - marginLeft));
        var ySpace = Math.abs(notePoint.y - (event.y - marginTop));
        var powSpace = Math.pow(xSpace, 2) + Math.pow(ySpace, 2);
        var space = Math.sqrt(powSpace);
        if (space <= notePoint.radius) {
            document.getElementById("chart").style.cursor = "pointer";
            break;
        } else {
            document.getElementById("chart").style.cursor = "default";
        }
    }
}

function onMouseClick(event) {
    for (var index = 0; index < eventElements.length; index++) {
        var notePoint = eventElements[index];
        var xSpace = Math.abs(notePoint.x - (event.x - marginLeft));
        var ySpace = Math.abs(notePoint.y - (event.y - marginTop));
        var powSpace = Math.pow(xSpace, 2) + Math.pow(ySpace, 2);
        var space = Math.sqrt(powSpace);
        if (space <= notePoint.radius) {
            alert("ok");
        }
    }
}

//X轴上的边距
var xPaddingLeft = 5;
var xPaddingRight = 5;
//Y轴上的边距
var yPaddingTop = 10;
var yPaddingBottom = 5;
//X轴上线条的间隔
var xOffset;
//Y轴上线条的间隔
var yOffset;

var textXOffset = 5;
var textYOffset = 7;

var marginTop;
var marginLeft;

function drawYear(chart) {
    var chartCanvas = document.getElementById("chart");
    marginTop = chartCanvas.offsetTop;
    marginLeft = chartCanvas.offsetLeft;
    console.log(chartCanvas.offsetTop + " " + chartCanvas.offsetLeft);
    chartCanvas.addEventListener("mousemove", onMouseMove);
    chartCanvas.addEventListener("click", onMouseClick);
    var context = chartCanvas.getContext("2d");
    context.save();
    context.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
    context.translate(0.5, 0.5);
    drawYearTable(context, chartCanvas.width, chartCanvas.height, chart);
    var length = chart.chartItems.length;
    for (var index = 0; index < length; index++) {
        drawYearChart(context, chartCanvas.width, chartCanvas.height, chart.start, chart.end, chart.chartItems[index]);
    }
    context.restore();
}

/**
 * 仅仅显示某条线条
 * @param itemName 显示的线条名称
 */
function drawYearItem(chart, itemName) {
    var chartCanvas = document.getElementById("chart");
    marginTop = chartCanvas.offsetTop;
    marginLeft = chartCanvas.offsetLeft;
    chartCanvas.addEventListener("mousemove", onMouseMove);
    chartCanvas.addEventListener("click", onMouseClick);
    var context = chartCanvas.getContext("2d");
    context.save();
    context.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
    context.translate(0.5, 0.5);
    drawYearTable(context, chartCanvas.width, chartCanvas.height, chart);
    var length = chart.chartItems.length;
    for (var index = 0; index < length; index++) {
        if (itemName == chart.chartItems[index].name) {
            drawYearChart(context, chartCanvas.width, chartCanvas.height, chart.start, chart.end, chart.chartItems[index]);
            break;
        }
    }
    context.restore();
}

/**
 * 修改某条线的线条宽度
 * @param itemName 线条名称
 * @param lineWidth 线条宽度
 */
function drawYearItemByWidth(chart, itemName, lineWidth) {
    var chartCanvas = document.getElementById("chart");
    marginTop = chartCanvas.offsetTop;
    marginLeft = chartCanvas.offsetLeft;
    chartCanvas.addEventListener("mousemove", onMouseMove);
    chartCanvas.addEventListener("click", onMouseClick);
    var context = chartCanvas.getContext("2d");
    context.save();
    context.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
    context.translate(0.5, 0.5);
    drawYearTable(context, chartCanvas.width, chartCanvas.height, chart);
    var length = chart.chartItems.length;
    for (var index = 0; index < length; index++) {
        if (itemName == chart.chartItems[index].name) {
            chart.chartItems[index].lineWidth = lineWidth;
        }
        drawYearChart(context, chartCanvas.width, chartCanvas.height, chart.start, chart.end, chart.chartItems[index]);
    }
    context.restore();
}

/**
 * 绘制单条数据
 * @param context 上下文
 * @param width 表格宽度
 * @param height 表格高度
 * @param chartItem 数据源
 */
function drawYearChart(context, width, height, start, end, chartItem) {
    context.save();
    context.beginPath();
    context.lineCap = "round";
    context.lineWidth = chartItem.lineWidth;
    context.strokeStyle = chartItem.lineColor;
    context.moveTo(xPaddingLeft, height - yPaddingBottom);
    for (var i = start - 1, j = 0; i < end; i++, j++) {
        var x = xOffset * (i + 1) + xPaddingLeft;
        var y = height - chartItem.data[j] * yOffset - yPaddingBottom;
        context.lineTo(x, y);
        //drawPoint(context,x,y,5);
        context.moveTo(x, y);
    }
    context.stroke();
    context.closePath();
    context.restore();

    context.save();
    for (var i = start - 1, j = 0; i < end; i++, j++) {
        var x = xOffset * (i + 1) + xPaddingLeft;
        var y = height - chartItem.data[j] * yOffset - yPaddingBottom;
        var radius = Math.min(xOffset, yOffset) / 3;
        if (chartItem.data[j] == 0) {
            drawCircle(context, x, y, radius, chartItem.lineColor);
        } else {
            drawPoint(context, x, y, radius, chartItem.lineColor);
        }
        var note = new NoteYearPoint(x, y, radius);
        eventElements.push(note);
    }
    context.restore();
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
 * 绘制数据表格
 * @param context 上下文
 * @param width 表格宽度
 * @param height 表格高度
 * @param chart 数据源
 */
function drawYearTable(context, width, height, chart) {
    context.save();
    context.beginPath();
    //边框样式
    context.lineWidth = chart.borderWidth;
    context.strokeStyle = chart.borderColor;
    //绘制底边框
    context.moveTo(xPaddingLeft, height - yPaddingBottom);
    context.lineTo(width - xPaddingRight, height - yPaddingBottom);
    //绘制左边框
    context.moveTo(xPaddingLeft, height - yPaddingBottom);
    context.lineTo(xPaddingLeft, yPaddingTop);
    //绘制坐标原点文字
    context.fillText("0", textXOffset, height - textYOffset);
    context.stroke();
    context.save();
    //数据标示线样式
    context.beginPath();
    context.lineWidth = chart.width;
    context.strokeStyle = chart.color;

    // 绘制纵向的数据标示线条
    // 这里标示每月的天数
    // 每个年都是12天
    // 实际绘制按照参数进行
    var xCounter = 12 + 1; //12条线分割出13个空间
    xOffset = (width - xPaddingLeft - xPaddingRight) / xCounter;
    for (var index = chart.start; index < chart.end + 1; index++) {
        var startX = xPaddingLeft + index * xOffset;
        context.moveTo(startX, yPaddingTop);
        context.lineTo(startX, height - yPaddingBottom);
        context.fillText(append(index, 2), startX - textXOffset, height - textYOffset);
    }

    // 绘制横向的数据标示线条
    var yCounter = chart.line;
    yOffset = (height - yPaddingTop - yPaddingBottom) / (yCounter + 1);
    for (var index = 1; index < yCounter + 1; index++) {
        var startY = height - yPaddingBottom - yOffset * index;
        context.moveTo(xPaddingLeft, startY);
        context.lineTo(width - xPaddingLeft, startY);
        context.fillText(append(index, 2), xPaddingLeft, startY);
    }
    context.stroke();
    context.restore();

    context.beginPath();
    //绘制底部边框的单位
    context.fillText("月", width - xPaddingRight - xOffset + 2 * textXOffset, height - textYOffset);
    context.stroke();
    context.restore();

    context.save();
    context.beginPath();
    context.fillStyle = 'red';
    //绘制左边边框的单位
    context.fillText(chart.unit, xPaddingLeft, yPaddingTop);
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

