/**
 * Created by dingpengwei on 10/19/16.
 */
function createHorizontalTabHostDiv(viewId, tabItems, itemSelectClassName, itemNormalClassName, onItemClickCallback, defaultSelectIndex) {
    return createTabHostDiv(viewId, tabItems, itemSelectClassName, itemNormalClassName, onItemClickCallback, defaultSelectIndex,true);
}

function createVerticalTabHostDiv(viewId, tabItems, itemSelectClassName, itemNormalClassName, onItemClickCallback, defaultSelectIndex) {
    return createTabHostDiv(viewId, tabItems, itemSelectClassName, itemNormalClassName, onItemClickCallback, defaultSelectIndex,false);
}

function createTabHostDiv(viewId, tabItems, itemSelectClassName, itemNormalClassName, onItemClickCallback, defaultSelectIndex,flag) {
    let horizontalTabHost = document.createElement("div");
    horizontalTabHost.id = viewId;
    horizontalTabHost.style.width = "100%";
    horizontalTabHost.style.height = "100%";
    let length = tabItems == undefined ? 0 : tabItems.length;
    let itemWidth = 100;
    let itemHeight = 100;
    if (length > 0 && flag) {
        itemWidth = 100 / length;
    }
    if (length > 0 && !flag){
        itemHeight = 100 / length;
    }
    for (let i = 0; i < length; i++) {
        let tabEntity = tabItems[i];
        let horizontalTabItemContainer = document.createElement("div");
        horizontalTabItemContainer.style.width = itemWidth + "%";
        horizontalTabItemContainer.style.height = itemHeight + "%";
        if (flag){
            horizontalTabItemContainer.style.float = "left";
        }
        let tabItemDiv = document.createElement("div")
        tabItemDiv.innerHTML = tabEntity.label;
        tabItemDiv.className = itemNormalClassName;
        if (i == defaultSelectIndex) {
            tabItemDiv.className = itemSelectClassName;
            onItemClickCallback(tabEntity);
        }
        tabItemDiv.onclick = function () {
            let size = horizontalTabHost.childElementCount;
            for (let j = 0; j < size; j++) {
                if (i == j) {
                    horizontalTabHost.childNodes[j].childNodes[0].className = itemSelectClassName;
                } else {
                    horizontalTabHost.childNodes[j].childNodes[0].className = itemNormalClassName;
                }
            }
            onItemClickCallback(tabEntity);
        }
        horizontalTabItemContainer.appendChild(tabItemDiv);
        horizontalTabHost.appendChild(horizontalTabItemContainer);
    }
    return horizontalTabHost;
}

function resetTabHost(viewId, itemNormalClassName) {
    let container = document.getElementById(viewId);
    if (container){
        let size = container.childElementCount;
        for (let i = 0; i < size; i++) {
            container.childNodes[i].childNodes[0].className = itemNormalClassName;
        }
    }
}