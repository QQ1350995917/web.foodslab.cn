/**
 * Created by dingpengwei on 9/8/16.
 */
window.onload = function () {
    initTitleView();
    requestCart(document.getElementById("accountId") == undefined ? null : document.getElementById("accountId").content);
    requestLinker();
};