/**
 * Created by dingpengwei on 8/16/16.
 */
function loadUserView() {
    let titleView = document.createElement("div");
    titleView.innerHTML = "用户列表";
    getTitleContainer().appendChild(titleView);

    var indexUrl = BASE_PATH + "/account/mRetrieves";
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
    }, onErrorCallback(), onTimeoutCallback());
}

function initUserList(userEntities) {
    let contentViewContainer = getMainContainer();
    let searchView = createSearchWidget("100%", function (data) {
        console.log(data);
    });
    contentViewContainer.appendChild(searchView);
    let userGridView = createUserGridView(userEntities);
    userGridView.style.marginTop = "5px";
    contentViewContainer.appendChild(userGridView);
}

function createUserGridView(userEntities) {
    let gridContainer = document.createElement("div");
    let length = userEntities == undefined ? 0 : userEntities.length;
    for (let i = 0; i < length; i++) {
        let gridView = document.createElement("div");
        gridView.className = "gridItemContainer";
        let gridContentView = createUserContentContainer(userEntities[i]);
        gridView.appendChild(gridContentView);
        gridContainer.appendChild(gridView);
        if (i % 4 == 0) {
            let clearFloat = document.createElement("div");
            clearFloat.className = "clearFloat";
            gridContainer.appendChild(gridView);
        }
    }
    return gridContainer;
}

function createUserContentContainer(userEntity) {
    let gridContentView = document.createElement("div");
    gridContentView.className = "gridItemSubContainer";
    let blockView = document.createElement("div");
    blockView.className = "actionButton gridItemActionButton";
    if (userEntity.status == 1) {
        blockView.innerHTML = "启用";
        gridContentView.style.borderColor = "red";
    } else if (userEntity.status == 2) {
        blockView.innerHTML = "禁用";
    }
    blockView.onclick = function () {
        let requestUserEntity = new Object();
        requestUserEntity.userId = userEntity.userId;
        if (userEntity.status == 1) {
            requestUserEntity.status = 2;
        } else if (userEntity.status == 2) {
            requestUserEntity.status = 1;
        }
        requestUpdateStatus(requestUserEntity);
    };
    gridContentView.appendChild(blockView);
    let detailView = document.createElement("div");
    detailView.className = "actionButton gridItemActionButton";
    detailView.innerHTML = "详情";
    detailView.onclick = function () {
        resetMainContainer();
        loadUserDetailView(userEntity);
    };
    gridContentView.appendChild(detailView);

    let foodslabView = document.createElement("div");
    foodslabView.className = "actionButton accountStatusNormal";
    foodslabView.innerHTML = "电话账号未绑定";
    gridContentView.appendChild(foodslabView);
    let weixinView = document.createElement("div");
    weixinView.className = "actionButton accountStatusNormal";
    weixinView.innerHTML = "微信账号未绑定";
    gridContentView.appendChild(weixinView);
    let QQView = document.createElement("div");
    QQView.className = "actionButton accountStatusNormal";
    QQView.innerHTML = "QQ账号未绑定";
    gridContentView.appendChild(QQView);

    let accountEntities = userEntity.children;
    for (let i = 0; i < accountEntities.length; i++) {
        let accountEntity = userEntity.children[i];
        let displayName = accountEntity.nickName == undefined ? accountEntity.identity : accountEntity.nickName;
        if (accountEntity.source == 1) {
            foodslabView.className = "actionButton accountStatusActive";
            foodslabView.innerHTML = "电话账号{" + displayName + "}已绑定";
        } else if (accountEntity.source == 2) {
            weixinView.className = "actionButton accountStatusActive";
            weixinView.innerHTML = "微信账号{" + displayName + "}已绑定";
        } else if (accountEntity.source == 3) {
            QQView.className = "actionButton accountStatusActive";
            QQView.innerHTML = "QQ账号{" + displayName +"}已绑定";
        }
    }
    return gridContentView;
}

function requestUpdateStatus(userEntity) {
    var indexUrl = BASE_PATH + "/account/mMark?p=" + JSON.stringify(userEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                showUsers();
            } else {
                new Toast().show("请求失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}