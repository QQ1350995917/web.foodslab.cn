/**
 * Created by dingpengwei on 11/5/16.
 */
let saleColors = new Array("#FF00FF", "#FF0000", "#FFBB00", "#00FF00");
var polylineChartsOfYearSale = new Array(
    new PolylineChart(saleColors[0], "2", saleColors[0], new Array(0, 0, 0, 3, 4, 5, 2, 3, 7, 2, 4, 9)),
    new PolylineChart(saleColors[1], "2", saleColors[1], new Array(1, 4, 1, 5, 2, 3, 9, 2, 4, 5, 2, 3)),
    new PolylineChart(saleColors[2], "2", saleColors[2], new Array(5, 2, 1, 7, 5, 2, 3, 9, 2, 4, 4, 5)),
    new PolylineChart(saleColors[3], "2", saleColors[3], new Array(5, 2, 3, 9, 2, 4, 5, 2, 3, 7, 9, 2))
);
let polylineChartTableOfYearSale = new PolylineChartTable("polylineChartOfSaleYear", 12, 10, 0, 0, 12, 5, "月", "500ml", true, function (x, y) {
    resetMainContainer();
    loadSaleChartOfMonth();
});

var polylineChartsOfMonthSale = new Array(
    new PolylineChart(saleColors[0], "2", saleColors[0], new Array(0, 0, 0, 0, 0, 0, 3, 4, 5, 2, 3, 7, 2, 4, 5, 2, 10, 7, 10, 10, 5, 2, 3, 9, 2, 4, 5, 2, 3, 7, 9)),
    new PolylineChart(saleColors[1], "2", saleColors[1], new Array(1, 4, 5, 2, 3, 7, 2, 4, 5, 2, 10, 7, 10, 10, 5, 2, 3, 9, 2, 4, 5, 2, 3, 7, 9, 2, 4, 5, 2, 3, 7)),
    new PolylineChart(saleColors[2], "2", saleColors[2], new Array(5, 2, 10, 7, 10, 10, 5, 2, 3, 9, 2, 4, 4, 5, 2, 3, 7, 2, 4, 9, 2, 4, 5, 2, 3, 7, 5, 2, 3, 7, 3)),
    new PolylineChart(saleColors[3], "2", saleColors[3], new Array(3, 7, 2, 4, 5, 2, 10, 7, 10, 3, 4, 5, 2, 10, 5, 2, 3, 9, 2, 4, 5, 2, 3, 7, 9, 2, 4, 5, 2, 3, 7))
);

let polylineChartTableOfMonthSale = new PolylineChartTable("polylineChartOfSaleYear", 31, 10, 0, 0, 31, 5, "号", "100ml", false);

function loadSaleView() {
    loadSaleChartOfYear();
}

function loadSaleChartOfYear() {
    let toolsBar = document.createElement("div");
    toolsBar.style.width = "100%";
    toolsBar.style.height = "40px";
    let tool = document.createElement("div");
    tool.className = "actionButton";
    tool.innerHTML = "复原";
    toolsBar.appendChild(tool);
    tool.onclick = function () {
        resetDrawYearSaleAll();
    }

    for (let i = 0; i < saleColors.length; i++) {
        let tool = document.createElement("div");
        tool.className = "actionButton";
        tool.style.backgroundColor = saleColors[i];
        tool.innerHTML = "排他显示";
        toolsBar.appendChild(tool);
        tool.onclick = function () {
            drawYearSaleItem(saleColors[i]);
        }
    }

    for (let i = 0; i < saleColors.length; i++) {
        let tool = document.createElement("div");
        tool.className = "actionButton";
        tool.style.backgroundColor = saleColors[i];
        tool.innerHTML = "加粗显示";
        toolsBar.appendChild(tool);
        tool.onclick = function () {
            drawYearSaleItemBold(saleColors[i]);
        }
    }
    getMainContainer().appendChild(toolsBar);

    let canvas = document.createElement("canvas");
    canvas.id = "polylineChartOfSaleYear";
    canvas.width = getMainContainer().clientWidth - 10;
    canvas.height = 500;
    getMainContainer().appendChild(canvas);

    drawPolylineChart(polylineChartTableOfYearSale, polylineChartsOfYearSale);
}

function loadSaleChartOfMonth() {
    let toolsBar = document.createElement("div");
    toolsBar.style.width = "100%";
    toolsBar.style.height = "40px";
    let back = document.createElement("div");
    back.className = "actionButton";
    back.innerHTML = "返回";
    toolsBar.appendChild(back);
    back.onclick = function () {
        resetMainContainer();
        loadSaleChartOfYear();
    }

    let tool = document.createElement("div");
    tool.className = "actionButton";
    tool.innerHTML = "复原";
    toolsBar.appendChild(tool);
    tool.onclick = function () {
        resetDrawMonthSaleAll();
    }

    for (let i = 0; i < saleColors.length; i++) {
        let tool = document.createElement("div");
        tool.className = "actionButton";
        tool.style.backgroundColor = saleColors[i];
        tool.innerHTML = "排他显示";
        toolsBar.appendChild(tool);
        tool.onclick = function () {
            drawMonthSaleItem(saleColors[i]);
        }
    }

    for (let i = 0; i < saleColors.length; i++) {
        let tool = document.createElement("div");
        tool.className = "actionButton";
        tool.style.backgroundColor = saleColors[i];
        tool.innerHTML = "加粗显示";
        toolsBar.appendChild(tool);
        tool.onclick = function () {
            drawMonthSaleItemBold(saleColors[i]);
        }
    }
    getMainContainer().appendChild(toolsBar);

    let canvas = document.createElement("canvas");
    canvas.id = "polylineChartOfSaleYear";
    canvas.width = getMainContainer().clientWidth - 10;
    canvas.height = 300;
    getMainContainer().appendChild(canvas);

    drawPolylineChart(polylineChartTableOfMonthSale, polylineChartsOfMonthSale);
}

function resetDrawYearSaleAll() {
    for (let i = 0; i < polylineChartsOfYearSale.length; i++) {
        polylineChartsOfYearSale[i].width = 2;
    }
    drawPolylineChart(polylineChartTableOfYearSale, polylineChartsOfYearSale);
}

function drawYearSaleItem(id) {
    let tempPolylineChartsOfYearSale = new Array();
    for (let i = 0; i < polylineChartsOfYearSale.length; i++) {
        if (polylineChartsOfYearSale[i].id == id) {
            polylineChartsOfYearSale[i].width = 2;
            tempPolylineChartsOfYearSale.push(polylineChartsOfYearSale[i]);
            break;
        }
    }
    drawPolylineChart(polylineChartTableOfYearSale, tempPolylineChartsOfYearSale);
}

function drawYearSaleItemBold(id) {
    for (let i = 0; i < polylineChartsOfYearSale.length; i++) {
        if (polylineChartsOfYearSale[i].id == id) {
            polylineChartsOfYearSale[i].width = 5;
        } else {
            polylineChartsOfYearSale[i].width = 1;
        }
    }
    drawPolylineChart(polylineChartTableOfYearSale, polylineChartsOfYearSale);
}

function resetDrawMonthSaleAll(){
    for (let i = 0; i < polylineChartsOfMonthSale.length; i++) {
        polylineChartsOfMonthSale[i].width = 2;
    }
    drawPolylineChart(polylineChartTableOfMonthSale, polylineChartsOfMonthSale);
}
function drawMonthSaleItem(id) {
    let tempPolylineChartsOfMonthSale = new Array();
    for (let i = 0; i < polylineChartsOfMonthSale.length; i++) {
        if (polylineChartsOfMonthSale[i].id == id) {
            polylineChartsOfMonthSale[i].width = 2;
            tempPolylineChartsOfMonthSale.push(polylineChartsOfMonthSale[i]);
            break;
        }
    }
    drawPolylineChart(polylineChartTableOfMonthSale, tempPolylineChartsOfMonthSale);
}

function drawMonthSaleItemBold(id) {
    for (let i = 0; i < polylineChartsOfMonthSale.length; i++) {
        if (polylineChartsOfMonthSale[i].id == id) {
            polylineChartsOfMonthSale[i].width = 5;
        } else {
            polylineChartsOfMonthSale[i].width = 1;
        }
    }
    drawPolylineChart(polylineChartTableOfMonthSale, polylineChartsOfMonthSale);
}
