/**
 * Created by dingpengwei on 8/13/16.
 */
/**
 * 请求产品反转树形列表
 */
function recommend() {
    var indexUrl = BASE_PATH + "/format/mWeights";
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponsDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                initRecommendView(parseData.data);
            } else {
                new Toast().show("更新失败");
            }
        }
    }, onRequestError(), onRequestTimeout());
}

/**
 * 请求产品推荐交换
 * @param formatId
 * @param weight
 */
function swapRecommend(swapWeightFormatEntity) {
    var indexUrl = BASE_PATH + "/format/mSwapWeight?p="  + JSON.stringify(swapWeightFormatEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponsDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                new Toast().show("更新成功");
            } else {
                new Toast().show("更新失败");
            }
        }
    }, onRequestError(), onRequestTimeout());
}

/**
 * 请求产品推荐更新
 * @param formatId
 * @param weight
 */
function updateRecommend(formatId, weight) {
    var indexUrl = BASE_PATH + "/product/updateWeight?formatId=" + formatId + "&weight=" + weight;
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponsDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == 200) {
                new Toast().show("更新成功");
            } else {
                new Toast().show("更新失败");
            }
        }
        onConvertDataCallback(data);
    }, onRequestError(), onRequestTimeout());
}

function initRecommendView(formatEntities) {
    // 重置界面
    resetView();
    // 获取根元素对象
    let titleViewContainer = document.getElementById(MAIN_TITLE_ID);
    let contentViewContainer = document.getElementById(MAIN_CONTENT_ID);
    // 添加标题
    let titleView = document.createElement("div");
    titleView.innerHTML = "推荐管理";
    titleView.className = "horizontalSelected";
    titleView.style.width = "100%";
    titleViewContainer.appendChild(titleView);

    let formatSize = formatEntities == undefined ? 0 : formatEntities.length;
    for (let index = 0; index < formatSize; index++) {
        let formatEntity = formatEntities[index];
        let recommendItemRootViewContainer = document.createElement("div");
        recommendItemRootViewContainer.className = "SS_IC";
        recommendItemRootViewContainer.style.height = "40px";
        recommendItemRootViewContainer.style.width = "100%";

        let recommendItemRootView = document.createElement("div");
        recommendItemRootView.className = "SS_IC";
        recommendItemRootView.style.height = "32px";
        recommendItemRootView.style.width = "100%";
        recommendItemRootView.style.borderWidth = "0px";

        //系列连接线横线
        let line_H_level11 = document.createElement("hr");
        line_H_level11.className = "SS_IC_HL";
        recommendItemRootView.appendChild(line_H_level11);

        // 显示系列名称的容器对象
        let seriesLabel = document.createElement("div");
        seriesLabel.className = "SS_IC_LABEL";
        seriesLabel.style.borderLeftWidth = "1px";
        seriesLabel.innerHTML = formatEntity.parent.parent.label;
        recommendItemRootView.appendChild(seriesLabel);

        //系列连接线横线
        let line_H_level12 = document.createElement("hr");
        line_H_level12.className = "SS_IC_HL";
        recommendItemRootView.appendChild(line_H_level12);

        // 显示类型名称的容器对象
        let typeLabel = document.createElement("div");
        typeLabel.className = "SS_IC_LABEL";
        typeLabel.style.borderLeftWidth = "1px";
        typeLabel.innerHTML = formatEntity.parent.label;
        recommendItemRootView.appendChild(typeLabel);

        //系列连接线横线
        let line_H_level13 = document.createElement("hr");
        line_H_level13.className = "SS_IC_HL";
        recommendItemRootView.appendChild(line_H_level13);

        // 显示规格名称的容器对象
        let formatLabel = document.createElement("div");
        formatLabel.className = "SS_IC_LABEL";
        formatLabel.style.borderLeftWidth = "1px";
        formatLabel.style.width = "70%";
        formatLabel.innerHTML = formatEntity.label + " " + formatEntity.meta;
        recommendItemRootView.appendChild(formatLabel);

        if (index > 8) {
            seriesLabel.style.cursor = "default";
            typeLabel.style.cursor = "default";
            formatLabel.style.cursor = "default";

            //系列连接线横线
            let line_H_level14 = document.createElement("hr");
            line_H_level14.className = "SS_IC_HL";
            recommendItemRootView.appendChild(line_H_level14);

            // 显示规格名称的容器对象
            let downLabel = document.createElement("div");
            downLabel.className = "SS_IC_LABEL";
            downLabel.style.borderLeftWidth = "1px";
            downLabel.style.width = "50px";
            downLabel.innerHTML = "↓↑ ";
            downLabel.formatId = formatEntity.formatId;
            downLabel.weight = formatEntity.weight;
            downLabel.onclick = function () {
                updateRecommend(formatEntity.formatId,0);
            };
            recommendItemRootView.appendChild(downLabel);
        } else {
            recommendItemRootView.id = formatEntity.formatId;
            recommendItemRootView.weight = formatEntity.weight;
            recommendItemRootView.draggable = "true";
            recommendItemRootView.style.cursor = "move";
            recommendItemRootView.addEventListener("dragstart", onDragStart);
            recommendItemRootView.addEventListener("dragover", onDragOver);
            recommendItemRootView.addEventListener("drop", onDrop);
            recommendItemRootView.addEventListener("dragend", onDragEnd);
            seriesLabel.style.cursor = "move";
            typeLabel.style.cursor = "move";
            formatLabel.style.cursor = "move";
        }
        recommendItemRootViewContainer.appendChild(recommendItemRootView);
        contentViewContainer.appendChild(recommendItemRootViewContainer);
    }
}

function onDragStart(event) {
    event.dataTransfer.setData("formatId", event.target.id);
    event.dataTransfer.setData("weight", event.target.weight);
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    event.preventDefault();
    let sourceFormatId = event.dataTransfer.getData("formatId");
    let sourceWeight = event.dataTransfer.getData("weight");
    let targetFormatId = (event.target.id == "" || event.target.id == undefined) ? event.target.parentNode.id : event.target.id;
    let targetWeight = (event.target.weight == "" || event.target.weight == undefined) ? event.target.parentNode.weight : event.target.weight;
    let targetIdElement = document.getElementById(targetFormatId);
    let sourceIdElement = document.getElementById(sourceFormatId);
    let tempInnerHtml = targetIdElement.innerHTML;
    targetIdElement.innerHTML = sourceIdElement.innerHTML;
    sourceIdElement.innerHTML = tempInnerHtml;

    event.dataTransfer.setData("sourceFormatId", sourceFormatId);
    event.dataTransfer.setData("sourceWeight", sourceWeight);

    event.dataTransfer.setData("targetFormatId", targetFormatId);
    event.dataTransfer.setData("targetWeight", targetWeight);

    let swapWeightFormatEntity = new Object();
    swapWeightFormatEntity.formatId1 = sourceFormatId;
    swapWeightFormatEntity.weight1 = sourceWeight;
    swapWeightFormatEntity.formatId2 = targetFormatId;
    swapWeightFormatEntity.weight2 = targetWeight;
    swapRecommend(swapWeightFormatEntity);

}

function onDragEnd(event) {
    let sourceFormatId = event.dataTransfer.getData("sourceFormatId");
    let sourceWeight = event.dataTransfer.getData("sourceWeight");
    let targetFormatId = event.dataTransfer.getData("targetFormatId");
    let targetWeight = event.dataTransfer.getData("targetWeight");
    event.dataTransfer.clearData();
}
