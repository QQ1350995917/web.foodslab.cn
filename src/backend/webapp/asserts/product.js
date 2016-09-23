/**
 * Created by dingpengwei on 8/3/16.
 */

/**
 * 全局变量,产品树数据
 */
let GLOBAL_PRODUCT_TREE;

/**
 * 请求产品列表
 */
function initProduct() {
    resetView();
    var indexUrl = BASE_PATH + "/product/mRetrieves?p={\"sessionId\":\"admin\"}";
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponsDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                console.log(parseData.data);
                onRequestProductTreeCallback(parseData.data);
            } else {
                new Toast().show("删除失败");
            }
        }
    }, onRequestError(), onRequestTimeout());
}

/**
 * 请求服务器的产品树数据的回调
 * @param data 产品树数据
 */
function onRequestProductTreeCallback(data) {
    GLOBAL_PRODUCT_TREE = data;
    // 获取根元素对象
    let titleViewContainer = document.getElementById(MAIN_TITLE_ID);
    let contentViewContainer = document.getElementById(MAIN_CONTENT_ID);
    // 添加标题
    let titleView = document.createElement("div");
    titleView.innerHTML = "产品总览";
    titleView.className = "horizontalSelected";
    titleView.style.width = "100%";
    titleViewContainer.appendChild(titleView);
    // 构建系列组合
    let seriesEntitiesSize = GLOBAL_PRODUCT_TREE == undefined ? 0 : GLOBAL_PRODUCT_TREE.length;
    for (let index = 0; index < seriesEntitiesSize; index++) {
        initProductItemView(contentViewContainer, GLOBAL_PRODUCT_TREE[index]);
    }
    addNewSeries(contentViewContainer);
}

/**
 * 创建系列名称
 * @param containerView 所在的容器对象
 * @param seriesName 名称
 */
function createSeries(containerView, seriesEntity) {
    var indexUrl = BASE_PATH + "/series/mCreate?p=" + JSON.stringify(seriesEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponsDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            containerView.removeChild(containerView.childNodes[containerView.childNodes.length - 1]);
            containerView.removeChild(containerView.childNodes[containerView.childNodes.length - 1]);
            initProductItemView(containerView, parseData.data);
            addNewSeries(containerView);
        }
    }, onRequestError(), onRequestTimeout());
}

/**
 * 更新系列名称
 * @param seriesEntity 系列对象
 */
function renameSeries(seriesEntity) {
    var indexUrl = BASE_PATH + "/series/mUpdate?p=" + JSON.stringify(seriesEntity);
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


function blockSeries() {

}

/**
 * 删除系列
 * @param rootView 根对象
 * @param seriesRootView 系列根对象
 * @param seriesId 数据ID
 */
function deleteSeries(rootView, seriesRootView, seriesEntity) {
    var indexUrl = BASE_PATH + "/series/mMark?p=" + JSON.stringify(seriesEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponsDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                rootView.removeChild(seriesRootView);
                new Toast().show("删除成功");
            } else {
                new Toast().show("删除失败");
            }
        }
    }, onRequestError(), onRequestTimeout());
}

/**
 * 显示单个的产品数据到界面
 * @param containerView 容器对象
 * @param productEntity 产品数据
 */
function initProductItemView(containerView, productEntity) {
    // 显示系列容器的根对象
    let seriesRootView = document.createElement("div");
    seriesRootView.className = "SS_IC";
    //系列连接线横线
    let line_H_level1 = document.createElement("hr");
    line_H_level1.className = "SS_IC_HL";
    seriesRootView.appendChild(line_H_level1);

    // 系类显示容器(二级根容器对象)
    let seriesSubRootViewContainer = document.createElement("div");
    seriesSubRootViewContainer.className = "SS_IC";
    seriesSubRootViewContainer.style.height = "90%";

    // 显示和编辑转化容器对象
    let converterViewContainer = document.createElement("div");
    // 显示系列名称的容器对象
    let seriesLabel = document.createElement("div");
    seriesLabel.className = "SS_IC_LABEL";
    seriesLabel.innerHTML = productEntity.label;
    seriesLabel.ondblclick = function () {
        onSeriesNameClick(containerView, seriesRootView, converterViewContainer, productEntity);
    };
    converterViewContainer.appendChild(seriesLabel);
    seriesSubRootViewContainer.appendChild(converterViewContainer);
    let clearFloat = document.createElement("div");
    clearFloat.className = "clearFloat";
    seriesSubRootViewContainer.appendChild(clearFloat);

    //判断是否是有类型
    let typeEntitiesSize = (productEntity == undefined || productEntity.children == undefined) ? 0 : productEntity.children.length;
    if (typeEntitiesSize < 1) {
        // 显示类型和规格的根对象
        let typeRootViewContainer = document.createElement("div");
        typeRootViewContainer.className = "SS_IC";
        typeRootViewContainer.style.height = "30px";
        typeRootViewContainer.style.borderLeftWidth = "0px";
        typeRootViewContainer.style.marginTop = "10px";
        //类型连接线横线
        let line_H_level2 = document.createElement("hr");
        line_H_level2.className = "SS_IC_HL";
        typeRootViewContainer.appendChild(line_H_level2);
        // 添加型号显示框
        let typeItemLabelView = document.createElement("div");
        typeItemLabelView.className = "B_B_D";
        typeItemLabelView.style.width = "100px";
        typeItemLabelView.style.marginLeft = "0px";
        typeItemLabelView.innerHTML = "编辑类型";
        typeItemLabelView.onclick = function () {
            showSeries(productEntity);
        };
        typeRootViewContainer.appendChild(typeItemLabelView);
        seriesSubRootViewContainer.appendChild(typeRootViewContainer);
    } else {
        let lineCounter = 1;
        for (let i = 0; i < typeEntitiesSize; i++) {
            lineCounter++;
            let typeEntity = productEntity.children[i];
            // 显示类型和规格的根对象
            let typeRootViewContainer = document.createElement("div");
            typeRootViewContainer.className = "SS_IC";
            typeRootViewContainer.style.height = "30px";
            typeRootViewContainer.style.borderLeftWidth = "0px";
            typeRootViewContainer.style.marginTop = "10px";
            //类型连接线横线
            let line_H_level2 = document.createElement("hr");
            line_H_level2.className = "SS_IC_HL";
            typeRootViewContainer.appendChild(line_H_level2);
            // 类型-规格容器对象
            let typeLabelView = document.createElement("div");
            typeLabelView.className = "SS_IC_LABEL";
            typeLabelView.style.borderLeftWidth = "1px";
            typeLabelView.innerHTML = typeEntity.label;
            typeLabelView.onclick = function () {
                onSeriesItemClick(productEntity.seriesId);
            };
            typeRootViewContainer.appendChild(typeLabelView);
            let formatEntitiesSize = typeEntity.children == undefined ? 0 : typeEntity.children.length;
            if (formatEntitiesSize > 0) {
                //规格显示框的横向连接线
                let line_H_level3 = document.createElement("hr");
                line_H_level3.className = "SS_IC_HL";
                typeRootViewContainer.appendChild(line_H_level3);

                //类型规格框
                let formatContainer = document.createElement("div");
                formatContainer.className = "SS_IC_LABEL";
                formatContainer.style.width = 60 * formatEntitiesSize + "px";
                formatContainer.style.textAlign = "left";
                formatContainer.style.borderLeftWidth = "1px";
                formatContainer.onclick = function () {
                    onSeriesItemClick(productEntity.seriesId);
                };
                typeRootViewContainer.appendChild(formatContainer);
                for (let j = 0; j < formatEntitiesSize; j++) {
                    let formatLabel = document.createElement("label");
                    formatLabel.style.margin = "10px";
                    let formatEntity = typeEntity.children[j];
                    formatLabel.innerHTML = formatEntity.label + formatEntity.meta;
                    formatContainer.appendChild(formatLabel);
                }
            }
            seriesSubRootViewContainer.appendChild(typeRootViewContainer);
        }

        seriesRootView.style.height = lineCounter * 40 + "px";
    }
    seriesRootView.appendChild(seriesSubRootViewContainer);
    containerView.appendChild(seriesRootView);
}

/**
 * 创建添加新系列的按钮以及点击逻辑
 * @param containerView
 */
function addNewSeries(containerView) {
    // 添加新系列的容器
    let newSeriesViewContainer = document.createElement("div");
    newSeriesViewContainer.className = "SS_IC";
    newSeriesViewContainer.style.height = "50px";
    //系列连接线横线
    let line_H_level1 = document.createElement("hr");
    line_H_level1.className = "SS_IC_HL";
    newSeriesViewContainer.appendChild(line_H_level1);
    // 添加新系列的按钮
    let addNewSeriesView = document.createElement("button");
    addNewSeriesView.className = "managerItem_save";
    addNewSeriesView.innerHTML = "添加新系列";
    newSeriesViewContainer.appendChild(addNewSeriesView);
    addNewSeriesView.onclick = function () {
        containerView.removeChild(newSeriesViewContainer);
        let childId = containerView.lastChild == undefined ? undefined : containerView.lastChild.childId;
        if (childId != APP_CONST_CLIENT_ID) {
            // 添加新系列的容器
            let itemViewContainerSub = document.createElement("div");
            itemViewContainerSub.childId = APP_CONST_CLIENT_ID;
            itemViewContainerSub.className = "SS_IC";
            itemViewContainerSub.style.height = "50px";
            // 添加新系列连接线横线
            let line_H_level1 = document.createElement("hr");
            line_H_level1.className = "SS_IC_HL";
            itemViewContainerSub.appendChild(line_H_level1);

            // 添加新系列的容器
            let seriesItemLabelContainerView = document.createElement("div");
            seriesItemLabelContainerView.className = "SS_IC_LABEL";
            seriesItemLabelContainerView.style.borderWidth = "0px";
            seriesItemLabelContainerView.style.width = "300px";
            // 添加新系列的按钮
            let addNewSeriesViewSub = document.createElement("input");
            addNewSeriesViewSub.className = "SS_IC_LABEL";
            addNewSeriesViewSub.style.height = "28px";
            addNewSeriesViewSub.style.borderLeftWidth = "1px";
            seriesItemLabelContainerView.appendChild(addNewSeriesViewSub);
            let seriesNameSaveView = document.createElement("div");
            seriesNameSaveView.innerHTML = "保存";
            seriesNameSaveView.className = "B_B_D";
            seriesNameSaveView.onclick = function () {
                if (addNewSeriesViewSub.value == "" || addNewSeriesViewSub.value == undefined || addNewSeriesViewSub.value == null) {
                    new Toast().show("请输入系列名称");
                } else {
                    let seriesEntity = new Object()
                    seriesEntity.label = addNewSeriesViewSub.value;
                    seriesEntity.sessionId = "admin";
                    createSeries(containerView, seriesEntity);
                }
            };
            seriesItemLabelContainerView.appendChild(seriesNameSaveView);
            let seriesNameDeleteView = document.createElement("div");
            seriesNameDeleteView.innerHTML = "删除";
            seriesNameDeleteView.className = "B_B_D";
            seriesNameDeleteView.onclick = function () {
                if (itemViewContainerSub.childId == APP_CONST_CLIENT_ID) {
                    containerView.removeChild(itemViewContainerSub);
                }
            };
            seriesItemLabelContainerView.appendChild(seriesNameDeleteView);
            itemViewContainerSub.appendChild(seriesItemLabelContainerView);
            containerView.appendChild(itemViewContainerSub);
        }
        addNewSeries(containerView);
    };
    containerView.appendChild(newSeriesViewContainer);
}

/**
 * 产品列表,文本域的点击事件
 * @param seriesId 系列的ID
 */
function onSeriesItemClick(seriesId) {
    if (seriesId == undefined || seriesId == null || seriesId.trim() == "") {
        alert("error");
    } else {
        let seriesEntity;
        for (let index = 0; index < GLOBAL_PRODUCT_TREE.length; index++) {
            if (seriesId == GLOBAL_PRODUCT_TREE[index].seriesId) {
                seriesEntity = GLOBAL_PRODUCT_TREE[index]
                break;
            }
        }
        showSeries(seriesEntity);
    }
}

/**
 * 修改系列名称状态
 * @param rootView 跟对象
 * @param seriesRootView 系列跟对象
 * @param containerView 编辑框跟对象
 * @param seriesEntity 数据体
 */
function onSeriesNameClick(rootView, seriesRootView, containerView, seriesEntity) {
    containerView.innerHTML = null;
    let seriesNameInputView = document.createElement("input");
    seriesNameInputView.value = seriesEntity.label;
    seriesNameInputView.className = "SS_IC_LABEL";
    seriesNameInputView.style.height = "28px";

    seriesNameInputView.onblur = function () {
        // onSeriesNameBlur(rootView, seriesRootView, containerView, seriesEntity, seriesNameInputView.value);
    };

    containerView.appendChild(seriesNameInputView);
    seriesNameInputView.focus();

    let seriesNameBackView = document.createElement("div");
    seriesNameBackView.innerHTML = "取消";
    seriesNameBackView.className = "B_B_D";
    containerView.appendChild(seriesNameBackView);
    seriesNameBackView.onclick = function () {
        onSeriesNameBlur(rootView, seriesRootView, containerView, seriesEntity, seriesEntity.label);
    };
    let seriesNameSaveView = document.createElement("div");
    seriesNameSaveView.innerHTML = "保存";
    seriesNameSaveView.className = "B_B_D";
    containerView.appendChild(seriesNameSaveView);
    seriesNameSaveView.onclick = function () {
        onSeriesNameBlur(rootView, seriesRootView, containerView, seriesEntity, seriesNameInputView.value);
    };

    let seriesNameBlockView = document.createElement("div");
    seriesNameBlockView.innerHTML = "禁用";
    seriesNameBlockView.className = "B_B_D";
    seriesNameBlockView.onclick = function () {
        onSeriesNameBlur(containerView, seriesEntity);
    };
    containerView.appendChild(seriesNameBlockView);

    let seriesNameDeleteView = document.createElement("div");
    seriesNameDeleteView.innerHTML = "删除";
    seriesNameDeleteView.className = "B_B_D";
    seriesNameDeleteView.onclick = function () {
        let requestSeriesEntity = new Object();
        requestSeriesEntity.seriesId = seriesEntity.seriesId;
        requestSeriesEntity.status = -1;
        deleteSeries(rootView, seriesRootView, requestSeriesEntity);
    };
    containerView.appendChild(seriesNameDeleteView);
}

function onSeriesNameBlur(rootView, seriesRootView, containerView, seriesEntity, newValue) {
    containerView.innerHTML = null;
    //系列显示框
    let seriesItemLabelView = document.createElement("div");
    seriesItemLabelView.className = "SS_IC_LABEL";
    seriesItemLabelView.innerHTML = newValue;
    seriesItemLabelView.ondblclick = function () {
        onSeriesNameClick(rootView, seriesRootView, containerView, seriesEntity);
    };
    containerView.appendChild(seriesItemLabelView);

    if (newValue != undefined && newValue != null && newValue.trim() != "" && seriesEntity.label != newValue) {
        let requestSeriesEntity = new Object();
        requestSeriesEntity.seriesId = seriesEntity.seriesId;
        requestSeriesEntity.label = newValue;
        renameSeries(requestSeriesEntity);
    }
}