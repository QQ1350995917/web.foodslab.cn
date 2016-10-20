/**
 * Created by dingpengwei on 7/31/16.
 */
function loadManagerView() {
    let titleView = document.createElement("div");
    titleView.innerHTML = "管理员列表"
    getTitleContainer().appendChild(titleView);

    const url = BASE_PATH + "/manager/mRetrieves";
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                var managerEntities = parseData.data;
                attachManagerToMainContainer(managerEntities);
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}


function attachManagerToMainContainer(managerEntities) {
    let length = managerEntities == undefined ? 0 : managerEntities.length;
    for (let i = 0; i < length; i++) {
        let managerEntity = managerEntities[i];

        let managerEntityContainer = document.createElement("div");
        managerEntityContainer.className = "managerItem";
        let userNameDiv = document.createElement("div");
        userNameDiv.className = "listItemLabel";
        userNameDiv.innerHTML = managerEntity.username;

        let accessDiv = document.createElement("div");
        accessDiv.className = "listItemLabel";
        accessDiv.innerHTML = "系统日志 ";

        let blockDiv = document.createElement("div");
        blockDiv.className = "listAction";
        blockDiv.innerHTML = "禁用";

        let deleteDiv = document.createElement("div");
        deleteDiv.className = "listAction";
        deleteDiv.innerHTML = "删除";

        let editorDiv = document.createElement("div");
        editorDiv.className = "listAction";
        editorDiv.innerHTML = "编辑";

        if (managerEntity.status == 1) {
            userNameDiv.className = "listItemLabel listItemBlock";
            accessDiv.className = "listItemLabel listItemBlock";
            blockDiv.innerHTML = "启用";
        } else {
            blockDiv.innerHTML = "禁用";
        }

        managerEntityContainer.appendChild(userNameDiv);
        managerEntityContainer.appendChild(accessDiv);
        managerEntityContainer.appendChild(editorDiv);
        managerEntityContainer.appendChild(deleteDiv);
        managerEntityContainer.appendChild(blockDiv);
        getMainContainer().appendChild(managerEntityContainer);

        deleteDiv.onclick = function () {
            let requestManagerEntity = new Object();
            requestManagerEntity.managerId = managerEntity.managerId;
            requestManagerEntity.status = -1;
            requestMarkManager(requestManagerEntity);
        }

        blockDiv.onclick = function () {
            let requestManagerEntity = new Object();
            requestManagerEntity.managerId = managerEntity.managerId;
            if (managerEntity.status == 1) {
                requestManagerEntity.status = 2;
            } else if (managerEntity.status == 2) {
                requestManagerEntity.status = 1;
            }
            requestMarkManager(requestManagerEntity);
        }
        editorDiv.onclick = function () {
            resetMainContainer();
            loadManagerEditorView(managerEntity);
        }
    }
    
    let addNewManagerView = document.createElement("div");
    addNewManagerView.className = "actionButton";
    addNewManagerView.style.width = "100%";
    addNewManagerView.innerHTML = "添加管理员";
    getMainContainer().appendChild(addNewManagerView);
    addNewManagerView.onclick = function () {
        resetMainContainer();
        loadManagerEditorView(undefined);
    };
}

/**
 * 禁用或启用
 * @param managerEntity
 */
function requestMarkManager(managerEntity) {
    const url = BASE_PATH + "/manager/mMark?p=" + JSON.stringify(managerEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                resetMainContainer();
                loadManagerView();
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}