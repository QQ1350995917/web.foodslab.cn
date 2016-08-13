/**
 * Created by dingpengwei on 8/13/16.
 */
/**
 * 请求产品反转树形列表
 */
function recommend() {
    var indexUrl = BASE_PATH + "/product/convert";
    asyncRequestByGet(indexUrl, function (data) {
        onConvertDataCallback(data);
    }, onRequestError(), onRequestTimeout());
}

function onConvertDataCallback(data) {
    var result = checkResponsDataFormat(data);
    if (result) {
        var parseData = JSON.parse(data);
        initRecommendView(parseData.data);
    }
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
        let recommendItemRootView = document.createElement("div");
        recommendItemRootView.className = "SS_IC";
        recommendItemRootView.style.height = "40px";
        recommendItemRootView.style.width = "100%";
        //系列连接线横线
        let line_H_level11 = document.createElement("hr");
        line_H_level11.className = "SS_IC_HL";
        line_H_level11.style.marginTop = "20px";
        recommendItemRootView.appendChild(line_H_level11);

        // 显示系列名称的容器对象
        let seriesLabel = document.createElement("div");
        seriesLabel.className = "SS_IC_LABEL";
        seriesLabel.style.borderLeftWidth = "1px";
        seriesLabel.style.marginTop = "5px";
        seriesLabel.innerHTML = formatEntity.parent.parent.label;
        seriesLabel.style.cursor = "move";
        recommendItemRootView.appendChild(seriesLabel);

        //系列连接线横线
        let line_H_level12 = document.createElement("hr");
        line_H_level12.className = "SS_IC_HL";
        line_H_level12.style.marginTop = "20px";
        recommendItemRootView.appendChild(line_H_level12);

        // 显示类型名称的容器对象
        let typeLabel = document.createElement("div");
        typeLabel.className = "SS_IC_LABEL";
        typeLabel.style.borderLeftWidth = "1px";
        typeLabel.style.marginTop = "5px";
        typeLabel.innerHTML = formatEntity.parent.label;
        typeLabel.style.cursor = "move";
        recommendItemRootView.appendChild(typeLabel);

        //系列连接线横线
        let line_H_level13 = document.createElement("hr");
        line_H_level13.className = "SS_IC_HL";
        line_H_level13.style.marginTop = "20px";
        recommendItemRootView.appendChild(line_H_level13);

        // 显示规格名称的容器对象
        let formatLabel = document.createElement("div");
        formatLabel.className = "SS_IC_LABEL";
        formatLabel.style.borderLeftWidth = "1px";
        formatLabel.style.marginTop = "5px";
        formatLabel.style.width = "70%";
        formatLabel.innerHTML = formatEntity.label + " " +formatEntity.meta;
        formatLabel.style.cursor = "move";
        recommendItemRootView.appendChild(formatLabel);

        if (index > 3){
            //系列连接线横线
            let line_H_level14 = document.createElement("hr");
            line_H_level14.className = "SS_IC_HL";
            line_H_level14.style.marginTop = "20px";
            recommendItemRootView.appendChild(line_H_level14);

            // 显示规格名称的容器对象
            let downLabel = document.createElement("div");
            downLabel.className = "SS_IC_LABEL";
            downLabel.style.borderLeftWidth = "1px";
            downLabel.style.marginTop = "5px";
            downLabel.style.width = "50px";
            downLabel.innerHTML = "↓↑ ";
            recommendItemRootView.appendChild(downLabel);
        }


        contentViewContainer.appendChild(recommendItemRootView);
    }
}
