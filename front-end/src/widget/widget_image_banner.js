/**
 * Created by dingpengwei on 7/20/16.
 */

function Banner(src) {
    this.src = src;
}

function createBannerCellView(visibility, index, banner) {
    // var bannerContainer_div = document.createElement("img");
    // bannerContainer_div.className = "bannerContainer_cell";
    // bannerContainer_div.style.zIndex = index;

    var bannerContainer_cell = document.createElement("img");
    bannerContainer_cell.id = "scroller";
    bannerContainer_cell.className = "bannerContainer_cell";
    bannerContainer_cell.src = banner.src;

    if (visibility) {
        bannerContainer_cell.style.visibility = "visible";
    } else {
        bannerContainer_cell.style.visibility = "hidden";
    }
    // bannerContainer_div.appendChild(bannerContainer_cell);
    return bannerContainer_cell;
}

var Banners;
var index = 0;
function player() {
    setInterval(function () {
        console.log(index + "---" + Banners[index].src);
        var scroller = document.getElementById("scroller");
        scroller.src = Banners[index].src;
        index ++;
        if (index > 12){
            index = 0;
        }
    },3000);
}

function initBanner(id, banners) {
    Banners = banners;
    let bannerContainer = document.getElementById(id);
    let size = banners.length;
    bannerContainer.className = "bannerContainer";
    bannerContainer.appendChild(createBannerCellView(true,index, banners[0]));
    index ++;
    player();
    // for (let index = 0; index < size; index++) {
    //     if (index == 0) {
    //         bannerContainer.appendChild(createBannerCellView(true,index, banners[index]));
    //     } else {
    //         bannerContainer.appendChild(createBannerCellView(false,index, banners[index]));
    //     }
    // }
}