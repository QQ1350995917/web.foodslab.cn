/**
 * Created by dingpengwei on 8/16/16.
 */
function loadUserView() {
    let titleView = document.createElement("div");
    titleView.innerHTML = "用户列表";
    getTitleContainer().appendChild(titleView);

    let searchContainer = document.createElement("div");
    searchContainer.className = "listItem listItemWidthBottom";
    let searchView = createSearchWidget("100%", function (data) {
        console.log(data);
    });
    searchContainer.appendChild(searchView);
    getMainContainer().appendChild(searchContainer);

    let userListContainer = document.createElement("div");
    userListContainer.className = "managerItem";
    getMainContainer().appendChild(userListContainer);

    var indexUrl = BASE_PATH + "/account/mRetrieves";
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                attachUsersToMainContainer(userListContainer,parseData.data);
            } else {
                new Toast().show("请求失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function attachUsersToMainContainer(userListContainer,userEntities) {
    let length = userEntities == undefined ? 0 : userEntities.length;
    for (let i = 0; i < length; i++) {
        let userEntity = userEntities[i];
        let userEntityContainer = document.createElement("div");
        userEntityContainer.className = "managerItem";
        let userPhoneAccountDiv = document.createElement("div");
        userPhoneAccountDiv.className = "listItemLabel listItemNormal";
        userPhoneAccountDiv.innerHTML = "电话账号未绑定";
        let userWeiXinAccountDiv = document.createElement("div");
        userWeiXinAccountDiv.className = "listItemLabel listItemNormal";
        userWeiXinAccountDiv.innerHTML = "微信账号未绑定";
        let userQQAccountDiv = document.createElement("div");
        userQQAccountDiv.className = "listItemLabel listItemNormal";
        userQQAccountDiv.innerHTML = "QQ账号未绑定";
        let blockUserDiv = document.createElement("div");
        blockUserDiv.className = "listAction";
        blockUserDiv.innerHTML = "禁用";
        let userDetailDiv = document.createElement("div");
        userDetailDiv.className = "listAction";
        userDetailDiv.innerHTML = "详情";
        userEntityContainer.appendChild(userPhoneAccountDiv);
        userEntityContainer.appendChild(userWeiXinAccountDiv);
        userEntityContainer.appendChild(userQQAccountDiv);
        userEntityContainer.appendChild(userDetailDiv);
        userEntityContainer.appendChild(blockUserDiv);
        userListContainer.appendChild(userEntityContainer);

        let accountEntities = userEntity.children;
        for (let i = 0; i < accountEntities.length; i++) {
            let accountEntity = userEntity.children[i];
            let displayName = accountEntity.nickName == undefined ? accountEntity.identity : accountEntity.nickName;
            if (accountEntity.source == 1) {
                userPhoneAccountDiv.className = "listItemLabel listItemActive";
                userPhoneAccountDiv.innerHTML = displayName;
            } else if (accountEntity.source == 2) {
                userWeiXinAccountDiv.className = "listItemLabel listItemActive";
                userWeiXinAccountDiv.innerHTML = displayName;
            } else if (accountEntity.source == 3) {
                userQQAccountDiv.className = "listItemLabel listItemActive";
                userQQAccountDiv.innerHTML = displayName;
            }
        }

        if (userEntity.status == 1) {
            userPhoneAccountDiv.className = "listItemLabel listItemBlock";
            userWeiXinAccountDiv.className = "listItemLabel listItemBlock";
            userQQAccountDiv.className = "listItemLabel listItemBlock";
            blockUserDiv.innerHTML = "启用";
        } else {
            blockUserDiv.innerHTML = "禁用";
        }

        blockUserDiv.onclick = function () {
            let requestUserEntity = new Object();
            requestUserEntity.userId = userEntity.userId;
            if (userEntity.status == 1) {
                requestUserEntity.status = 2;
            } else if (userEntity.status == 2) {
                requestUserEntity.status = 1;
            }
            requestUpdateStatus(requestUserEntity);
        }
        userDetailDiv.onclick = function () {
            resetMainContainer();
            loadUserDetailView(userEntity);
        }
    }
}

function requestUpdateStatus(userEntity) {
    var indexUrl = BASE_PATH + "/account/mMark?p=" + JSON.stringify(userEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                resetMainContainer();
                loadUserView();
            } else {
                new Toast().show("请求失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}