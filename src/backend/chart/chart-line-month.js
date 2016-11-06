/**
 * Created by dingpengwei on 7/15/16.
 */

function ChartMonthItem(name, lineColor, lineWidth, data) {
    this.name = name;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.data = data;
}

function ChartMonth(id, year, month, start, end, line, unit, borderColor, borderWidth, color, width, chartItems) {
    this.id = id;
    this.year = year; // 年份
    this.month = month; // 月份
    this.start = start;// 开始日期
    this.end = end;// 结束日期
    this.line = line;// X轴标示线条的个数
    this.unit = unit;// 每个X轴标示线条所表示的单位
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;
    this.color = color;
    this.width = width;
    this.chartItems = chartItems;
};

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

function drawMonth(chart) {
    var chartCanvas = document.getElementById("chart");
    var context = chartCanvas.getContext("2d");

    context.save();
    context.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
    context.translate(0.5, 0.5);
    drawMonthTable(context, chartCanvas.width, chartCanvas.height, chart);
    var length = chart.chartItems.length;
    for (var index = 0; index < length; index++) {
        drawMonthChart(context, chartCanvas.width, chartCanvas.height,chart.start,chart.end, chart.chartItems[index]);
    }
    context.restore();
}

/**
 * 仅仅显示某条线条
 * @param itemName 显示的线条名称
 */
function drawMonthItem(chart, itemName) {
    var chartCanvas = document.getElementById("chart");
    var context = chartCanvas.getContext("2d");
    context.save();
    context.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
    context.translate(0.5, 0.5);
    drawMonthTable(context, chartCanvas.width, chartCanvas.height, chart);
    var length = chart.chartItems.length;
    for (var index = 0; index < length; index++) {
        if (itemName == chart.chartItems[index].name) {
            drawMonthChart(context, chartCanvas.width, chartCanvas.height,chart.start,chart.end, chart.chartItems[index]);
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
function drawMonthItemByWidth(chart, itemName, lineWidth) {
    var chartCanvas = document.getElementById("chart");
    var context = chartCanvas.getContext("2d");
    context.save();
    context.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
    context.translate(0.5, 0.5);
    drawMonthTable(context, chartCanvas.width, chartCanvas.height, chart);
    var length = chart.chartItems.length;
    for (var index = 0; index < length; index++) {
        if (itemName == chart.chartItems[index].name) {
            chart.chartItems[index].lineWidth = lineWidth;
        }
        drawMonthChart(context, chartCanvas.width, chartCanvas.height,chart.start,chart.end, chart.chartItems[index]);
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
function drawMonthChart(context, width, height, start, end, chartItem) {
    context.save();
    context.beginPath();
    context.lineCap = "round";
    context.lineWidth = chartItem.lineWidth;
    context.strokeStyle = chartItem.lineColor;
    context.moveTo(xPaddingLeft, height - yPaddingBottom);
    for (var i = start -1,j=0; i < end; i++,j++) {
        context.lineTo(xOffset * (i + 1) + xPaddingLeft, height - chartItem.data[j] * yOffset - yPaddingBottom);
        context.moveTo(xOffset * (i + 1) + xPaddingLeft, height - chartItem.data[j] * yOffset - yPaddingBottom);
    }
    context.stroke();
    context.restore();
}
/**
 * 绘制数据表格
 * @param context 上下文
 * @param width 表格宽度
 * @param height 表格高度
 * @param chart 数据源
 */
function drawMonthTable(context, width, height, chart) {
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
    // 假设每个月都是31天
    // 实际绘制按照参数进行
    var xCounter = 31 + 1; //31条线分割出32个空间
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
    context.fillText("号", width - xPaddingRight - xOffset + 2 * textXOffset, height - textYOffset);
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

