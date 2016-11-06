/**
 * Created by dingpengwei on 11/5/16.
 */
let flowColors = new Array("#FF00FF", "#FF0000", "#FFBB00", "#00FF00");
var polylineChartsOfYearFlow = new Array(
    new PolylineChart(flowColors[0], "2", flowColors[0], new Array(0, 0, 0, 3, 4, 5, 2, 3, 7, 2, 4, 9)),
    new PolylineChart(flowColors[1], "2", flowColors[1], new Array(1, 4, 1, 5, 2, 3, 9, 2, 4, 5, 2, 3)),
    new PolylineChart(flowColors[2], "2", flowColors[2], new Array(5, 2, 1, 7, 5, 2, 3, 9, 2, 4, 4, 5)),
    new PolylineChart(flowColors[3], "2", flowColors[3], new Array(5, 2, 3, 9, 2, 4, 5, 2, 3, 7, 9, 2))
);
let polylineChartTableOfYearFlow = new PolylineChartTable("polylineChartOfSaleYear", 12, 10, 0, 0, 12, 5, "月", "500ml", true, function (x, y) {
    resetMainContainer();
    loadFlowChartOfMonth();
});

var polylineChartsOfMonthFlow = new Array(
    new PolylineChart(flowColors[0], "2", flowColors[0], new Array(0, 0, 0, 0, 0, 0, 3, 4, 5, 2, 3, 7, 2, 4, 5, 2, 10, 7, 10, 10, 5, 2, 3, 9, 2, 4, 5, 2, 3, 7, 9)),
    new PolylineChart(flowColors[1], "2", flowColors[1], new Array(1, 4, 5, 2, 3, 7, 2, 4, 5, 2, 10, 7, 10, 10, 5, 2, 3, 9, 2, 4, 5, 2, 3, 7, 9, 2, 4, 5, 2, 3, 7)),
    new PolylineChart(flowColors[2], "2", flowColors[2], new Array(5, 2, 10, 7, 10, 10, 5, 2, 3, 9, 2, 4, 4, 5, 2, 3, 7, 2, 4, 9, 2, 4, 5, 2, 3, 7, 5, 2, 3, 7, 3)),
    new PolylineChart(flowColors[3], "2", flowColors[3], new Array(3, 7, 2, 4, 5, 2, 10, 7, 10, 3, 4, 5, 2, 10, 5, 2, 3, 9, 2, 4, 5, 2, 3, 7, 9, 2, 4, 5, 2, 3, 7))
);

let polylineChartTableOfMonthFlow = new PolylineChartTable("polylineChartOfSaleYear", 31, 10, 0, 0, 31, 5, "号", "100ml", false);

function loadFlowView() {
    loadFlowChartOfYear();
}

function loadFlowChartOfYear() {
    let toolsBar = document.createElement("div");
    toolsBar.style.width = "100%";
    toolsBar.style.height = "40px";
    let tool = document.createElement("div");
    tool.className = "actionButton";
    tool.innerHTML = "复原";
    toolsBar.appendChild(tool);
    tool.onclick = function () {
        resetDrawYearFlowAll();
    }

    for (let i = 0; i < flowColors.length; i++) {
        let tool = document.createElement("div");
        tool.className = "actionButton";
        tool.style.backgroundColor = flowColors[i];
        tool.innerHTML = "排他显示";
        toolsBar.appendChild(tool);
        tool.onclick = function () {
            drawYearFlowItem(flowColors[i]);
        }
    }

    for (let i = 0; i < flowColors.length; i++) {
        let tool = document.createElement("div");
        tool.className = "actionButton";
        tool.style.backgroundColor = flowColors[i];
        tool.innerHTML = "加粗显示";
        toolsBar.appendChild(tool);
        tool.onclick = function () {
            drawYearFlowItemBold(flowColors[i]);
        }
    }
    getMainContainer().appendChild(toolsBar);

    let canvas = document.createElement("canvas");
    canvas.id = "polylineChartOfSaleYear";
    canvas.width = getMainContainer().clientWidth - 10;
    canvas.height = 300;
    getMainContainer().appendChild(canvas);

    drawPolylineChart(polylineChartTableOfYearFlow, polylineChartsOfYearFlow);
}

function loadFlowChartOfMonth() {
    let toolsBar = document.createElement("div");
    toolsBar.style.width = "100%";
    toolsBar.style.height = "40px";
    let back = document.createElement("div");
    back.className = "actionButton";
    back.innerHTML = "返回";
    toolsBar.appendChild(back);
    back.onclick = function () {
        resetMainContainer();
        loadFlowChartOfYear();
    }

    let tool = document.createElement("div");
    tool.className = "actionButton";
    tool.innerHTML = "复原";
    toolsBar.appendChild(tool);
    tool.onclick = function () {
        resetDrawMonthFlowAll();
    }

    for (let i = 0; i < flowColors.length; i++) {
        let tool = document.createElement("div");
        tool.className = "actionButton";
        tool.style.backgroundColor = flowColors[i];
        tool.innerHTML = "排他显示";
        toolsBar.appendChild(tool);
        tool.onclick = function () {
            drawMonthFlowItem(flowColors[i]);
        }
    }

    for (let i = 0; i < flowColors.length; i++) {
        let tool = document.createElement("div");
        tool.className = "actionButton";
        tool.style.backgroundColor = flowColors[i];
        tool.innerHTML = "加粗显示";
        toolsBar.appendChild(tool);
        tool.onclick = function () {
            drawMonthFlowItemBold(flowColors[i]);
        }
    }
    getMainContainer().appendChild(toolsBar);

    let canvas = document.createElement("canvas");
    canvas.id = "polylineChartOfSaleYear";
    canvas.width = getMainContainer().clientWidth - 10;
    canvas.height = 300;
    getMainContainer().appendChild(canvas);

    drawPolylineChart(polylineChartTableOfMonthFlow, polylineChartsOfMonthFlow);
}

function resetDrawYearFlowAll() {
    for (let i = 0; i < polylineChartsOfYearFlow.length; i++) {
        polylineChartsOfYearFlow[i].width = 2;
    }
    drawPolylineChart(polylineChartTableOfYearFlow, polylineChartsOfYearFlow);
}

function drawYearFlowItem(id) {
    let tempPolylineChartsOfYearSale = new Array();
    for (let i = 0; i < polylineChartsOfYearFlow.length; i++) {
        if (polylineChartsOfYearFlow[i].id == id) {
            polylineChartsOfYearFlow[i].width = 2;
            tempPolylineChartsOfYearSale.push(polylineChartsOfYearFlow[i]);
            break;
        }
    }
    drawPolylineChart(polylineChartTableOfYearFlow, tempPolylineChartsOfYearSale);
}

function drawYearFlowItemBold(id) {
    for (let i = 0; i < polylineChartsOfYearFlow.length; i++) {
        if (polylineChartsOfYearFlow[i].id == id) {
            polylineChartsOfYearFlow[i].width = 5;
        } else {
            polylineChartsOfYearFlow[i].width = 1;
        }
    }
    drawPolylineChart(polylineChartTableOfYearFlow, polylineChartsOfYearFlow);
}

function resetDrawMonthFlowAll(){
    for (let i = 0; i < polylineChartsOfMonthFlow.length; i++) {
        polylineChartsOfMonthFlow[i].width = 2;
    }
    drawPolylineChart(polylineChartTableOfMonthFlow, polylineChartsOfMonthFlow);
}
function drawMonthFlowItem(id) {
    let tempPolylineChartsOfMonthSale = new Array();
    for (let i = 0; i < polylineChartsOfMonthFlow.length; i++) {
        if (polylineChartsOfMonthFlow[i].id == id) {
            polylineChartsOfMonthFlow[i].width = 2;
            tempPolylineChartsOfMonthSale.push(polylineChartsOfMonthFlow[i]);
            break;
        }
    }
    drawPolylineChart(polylineChartTableOfMonthFlow, tempPolylineChartsOfMonthSale);
}

function drawMonthFlowItemBold(id) {
    for (let i = 0; i < polylineChartsOfMonthFlow.length; i++) {
        if (polylineChartsOfMonthFlow[i].id == id) {
            polylineChartsOfMonthFlow[i].width = 5;
        } else {
            polylineChartsOfMonthFlow[i].width = 1;
        }
    }
    drawPolylineChart(polylineChartTableOfMonthFlow, polylineChartsOfMonthFlow);
}