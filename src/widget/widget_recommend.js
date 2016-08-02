/**
 * Created by dingpengwei on 7/22/16.
 */
function Recommend(recommendId,seriesName, recommendName) {
    this.recommendId = recommendId;
    this.seriesName = seriesName;
    this.recommendName = recommendName;
}

function onDragStart(event) {
    event.dataTransfer.setData("id", event.target.id);
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    event.preventDefault();
    let targetId = event.target.id;
    let sourceId = event.dataTransfer.getData("id");
    let targetIdElement = document.getElementById(targetId);
    let sourceIdElement = document.getElementById(sourceId);
    let tempInnerHtml = targetIdElement.innerHTML;
    targetIdElement.innerHTML = sourceIdElement.innerHTML;
    sourceIdElement.innerHTML = tempInnerHtml;

}

function onDragEnd(event) {
    event.dataTransfer.clearData();
}


function createRecommendItemView(recommend) {
    var recommendItemContainer = document.createElement("div");
    recommendItemContainer.className = "recommendItemContainer";
    recommendItemContainer.id = recommend.recommendId;

    recommendItemContainer.draggable = "true";
    recommendItemContainer.addEventListener("dragstart",onDragStart);
    recommendItemContainer.addEventListener("dragover",onDragOver);
    recommendItemContainer.addEventListener("drop",onDrop);
    recommendItemContainer.addEventListener("dragend",onDragEnd);

    var recommendItem_connectLine1 = document.createElement("hr");
    recommendItem_connectLine1.className = "recommendItem_connectLine1";
    recommendItemContainer.appendChild(recommendItem_connectLine1);

    var recommendItem_series = document.createElement("div");
    recommendItem_series.className = "recommendItem_series";
    recommendItem_series.innerHTML = recommend.seriesName;
    recommendItemContainer.appendChild(recommendItem_series);

    var recommendItem_connectLine2 = document.createElement("hr");
    recommendItem_connectLine2.className = "recommendItem_connectLine2";
    recommendItemContainer.appendChild(recommendItem_connectLine2);

    var recommendItem_productName = document.createElement("div");
    recommendItem_productName.className = "recommendItem_productName";
    recommendItem_productName.innerHTML = recommend.recommendName;
    recommendItemContainer.appendChild(recommendItem_productName);

    return recommendItemContainer;

    // var recommendItemContainer = document.createElement("div");
    // recommendItemContainer.className = "recommendItemContainer";
    // recommendItemContainer.id = "2";
    // recommendItemContainer.innerHTML = "2";
    // recommendItemContainer.dragable = "true";
    // recommendItemContainer.addEventListener("dragstart", onDragStart);
    // recommendItemContainer.addEventListener("dragover", onDragOver);
    // recommendItemContainer.addEventListener("drop", onDrop);
    // recommendItemContainer.addEventListener("dragend", onDragEnd);
    // return recommendItemContainer;
}

function initRecommendView(id, recommends) {
    let commendViewContainer = document.getElementById(id);
    let size = recommends.length;
    commendViewContainer.className = "recommendContainer";
    commendViewContainer.style.height = size * 40 + "px";
    for (let index = 0; index < size; index++) {
        commendViewContainer.appendChild(createRecommendItemView(recommends[index]));
    }
}