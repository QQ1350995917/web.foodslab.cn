/**
 * Created by dingpengwei on 8/15/16.
 */
function initSkinView() {
    // 重置界面
    resetView();
    // 获取根元素对象
    let titleViewContainer = document.getElementById(MAIN_TITLE_ID);
    let contentViewContainer = document.getElementById(MAIN_CONTENT_ID);
    // 添加标题
    let titleView = document.createElement("div");
    titleView.innerHTML = "皮肤设置";
    titleView.className = "horizontalSelected";
    titleView.style.width = "100%";
    titleViewContainer.appendChild(titleView);

    let skins = new Array();
    skins.push("简单 洁净 明亮");
    skins.push("传统 稳重 古典");
    skins.push("轻快 时尚 进步");
    skins.push("沉稳 肃穆 安静");
    for (let index =0;index<skins.length;index++){
        contentViewContainer.appendChild(createItemWidget(skins[index]));
    }

}

function createItemWidget(text) {
    let itemViewContainer = document.createElement("div");
    itemViewContainer.className = "SS_IC";
    itemViewContainer.style.borderWidth = "1px";
    itemViewContainer.style.width = "100%";
    itemViewContainer.style.height = "300px";
    itemViewContainer.style.marginBottom = "20px";

    let textViewContainer = document.createElement("div");
    textViewContainer.className = "SS_IC";
    textViewContainer.style.width = "133px";
    textViewContainer.style.height = "100%";
    textViewContainer.style.lineHeight = "300px";
    textViewContainer.style.textAlign = "center";
    textViewContainer.style.borderWidth = "0px";
    textViewContainer.innerHTML = text;

    let snapViewContainer1 = document.createElement("div");
    snapViewContainer1.className = "SS_IC";
    snapViewContainer1.style.width = "310px";
    snapViewContainer1.style.height= "100%";
    let snapViewContainer2 = document.createElement("div");
    snapViewContainer2.className = "SS_IC";
    snapViewContainer2.style.width = "310px";
    snapViewContainer2.style.height= "100%";
    let snapViewContainer3 = document.createElement("div");
    snapViewContainer3.className = "SS_IC";
    snapViewContainer3.style.width = "310px";
    snapViewContainer3.style.height= "100%";

    itemViewContainer.appendChild(textViewContainer);
    itemViewContainer.appendChild(snapViewContainer1);
    itemViewContainer.appendChild(snapViewContainer2);
    itemViewContainer.appendChild(snapViewContainer3);
    return itemViewContainer;
}