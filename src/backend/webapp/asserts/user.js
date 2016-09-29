/**
 * Created by dingpengwei on 8/16/16.
 */
function showUsers() {
    var indexUrl = BASE_PATH + "/account/mRetrieve";
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                initUserList(parseData.data);
            } else {
                new Toast().show("请求失败");
            }
        }
    }, onRequestError(), onRequestTimeout());
}

function initUserList(userEntities) {
    // 重置界面
    resetView();
    // 获取根元素对象
    let titleViewContainer = document.getElementById(MAIN_TITLE_ID);
    let contentViewContainer = document.getElementById(MAIN_CONTENT_ID);
    // 添加标题
    let titleView = document.createElement("div");
    titleView.innerHTML = "用户列表";
    titleView.className = "horizontalSelected";
    titleView.style.width = "100%";
    titleViewContainer.appendChild(titleView);

    contentViewContainer.appendChild(createSearchViewWidget());

    let listViewContainer = document.createElement("div")
    listViewContainer.className = "SS_IC";
    listViewContainer.style.marginTop = "10px";
    listViewContainer.style.width = "100%";
    let userSize = userEntities == undefined ? 0 : userEntities.length;
    for (let index = 0; index < userSize; index++) {
        listViewContainer.appendChild(createUserItemViewWidget(userEntities[index]));
    }
    listViewContainer.style.height = userSize * 40 + "px";
    contentViewContainer.appendChild(listViewContainer);
}

function createSearchViewWidget() {
    let searchViewContainer = document.createElement("div")
    searchViewContainer.className = "SS_IC";
    searchViewContainer.style.borderWidth = "0px";
    searchViewContainer.style.float = "none";
    searchViewContainer.style.width = "100%";
    searchViewContainer.style.height = "30px";

    let searchInputView = document.createElement("input")
    searchInputView.className = "posterItemContainer";
    searchInputView.style.borderWidth = "1px";
    searchInputView.style.margin = "0px";
    searchInputView.style.width = "903px";
    searchInputView.style.height = "26px";
    searchViewContainer.appendChild(searchInputView);

    let line_H_level1 = document.createElement("hr");
    line_H_level1.className = "SS_IC_HL";
    searchViewContainer.appendChild(line_H_level1);

    let searchView = document.createElement("div")
    searchView.className = "B_B_D";
    searchView.style.margin = "0px";
    searchView.style.width = "139px";
    searchView.style.height = "30px";
    searchView.innerHTML = "搜索";
    searchViewContainer.appendChild(searchView);

    return searchViewContainer;
}

function createUserItemViewWidget(userEntity) {
    let accountEntities = userEntity.accountEntities;
    let listViewContainer = document.createElement("div")
    listViewContainer.className = "SS_IC";
    listViewContainer.style.width = "100%";
    listViewContainer.style.height = "40px";
    listViewContainer.style.borderWidth = "0px";

    let line_H_level11 = document.createElement("hr");
    line_H_level11.className = "SS_IC_HL";
    listViewContainer.appendChild(line_H_level11);

    let userInfoView = document.createElement("div")
    userInfoView.className = "SS_IC";
    userInfoView.style.width = "874px";
    userInfoView.style.height = "30px";
    userInfoView.style.borderWidth = "1px";
    userInfoView.style.lineHeight = "30px";
    userInfoView.style.paddingLeft = "10px";
    // userInfoView.innerHTML = accountEntity.name + " - " + accountEntity.telephone + " - " + (accountEntity.gender == 0 ? "女" : "男") + " - " + accountEntity.birthday + " - " + accountEntity.address;
    listViewContainer.appendChild(userInfoView);

    let line_H_level12 = document.createElement("hr");
    line_H_level12.className = "SS_IC_HL";
    listViewContainer.appendChild(line_H_level12);

    let userBlockView = document.createElement("div")
    userBlockView.className = "B_B_D";
    userBlockView.style.width = "60px";
    userBlockView.style.height = "30px";
    userBlockView.style.marginLeft = "0px";
    userBlockView.innerHTML = "禁用";
    listViewContainer.appendChild(userBlockView);

    let line_H_level13 = document.createElement("hr");
    line_H_level13.className = "SS_IC_HL";
    listViewContainer.appendChild(line_H_level13);

    let userDetailView = document.createElement("div")
    userDetailView.className = "B_B_D";
    userDetailView.style.width = "60px";
    userDetailView.style.height = "30px";
    userDetailView.style.marginLeft = "0px";
    userDetailView.innerHTML = "详情";
    userDetailView.onclick = function () {
        showUserDetail(userEntity);
    };
    listViewContainer.appendChild(userDetailView);

    return listViewContainer;
}