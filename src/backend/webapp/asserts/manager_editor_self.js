/**
 * Created by dingpengwei on 10/20/16.
 */
function loadManagerSelfEditorView(managerEntity, menuEntities) {
    let titleView = document.createElement("div");
    if (isNullValue(managerEntity)) {
        titleView.innerHTML = "管理员编辑 >> 添加管理员";
    } else {
        titleView.innerHTML = "管理员编辑 >> " + managerEntity.username;
    }
    getTitleContainer().appendChild(titleView);
    attachManagerSelfEditorView(managerEntity, menuEntities);
}

function attachManagerSelfEditorView(managerEntity, menuEntities) {
    let loginNameContainer = document.createElement("div");
    loginNameContainer.className = "managerItem textCenter editorManagerItem";
    let userNameContainer = document.createElement("div");
    userNameContainer.className = "managerItem textCenter editorManagerItem";
    let passwordContainer = document.createElement("div");
    passwordContainer.className = "managerItem textCenter editorManagerItem";
    let accessContainer = document.createElement("div");
    accessContainer.id = "accessContainer";
    accessContainer.className = "managerItem textCenter editorManagerItem";
    let actionBarContainer = document.createElement("div");
    actionBarContainer.className = "managerItem textCenter editorManagerItem";

    getMainContainer().appendChild(loginNameContainer);
    getMainContainer().appendChild(userNameContainer);
    getMainContainer().appendChild(passwordContainer);
    getMainContainer().appendChild(accessContainer);
    getMainContainer().appendChild(actionBarContainer);

    let loginNameInput = document.createElement("input");
    loginNameInput.className = "default";
    if (isNullValue(managerEntity)) {
        loginNameInput.placeholder = "请输入登录名";
    } else {
        loginNameContainer.innerHTML = "登录名: ";
        loginNameInput.value = managerEntity.loginName;
    }
    loginNameContainer.appendChild(loginNameInput);

    let userNameInput = document.createElement("input")
    userNameInput.className = "default";
    if (isNullValue(managerEntity)) {
        userNameInput.placeholder = "请输入用户名";
    } else {
        userNameContainer.innerHTML = "用户名: ";
        userNameInput.value = managerEntity.username;
    }
    userNameContainer.appendChild(userNameInput);

    let password0Input = document.createElement("input")
    password0Input.className = "default";
    password0Input.value = managerEntity.password;
    if (isNullValue(managerEntity)) {
        password0Input.placeholder = "请输入密码";
        password0Input.style.marginRight = "10px";
        passwordContainer.appendChild(password0Input);
    } else {
        convertMangerSelfPasswordView(passwordContainer, false)
    }

    let password1Input = document.createElement("input")
    password1Input.className = "default";
    password1Input.placeholder = "请输入确认密码";
    password1Input.style.marginLeft = "10px";
    if (isNullValue(managerEntity)) {
        passwordContainer.appendChild(password1Input);
    }

    let allItemsNumber = menuEntities == undefined ? 0:menuEntities.length;//菜单总个数
    let itemWidth = accessContainer.clientWidth / allItemsNumber;//实际显示的菜单中每个菜单应该占用的宽度(样式中标注了左右各一个像素的边框)
    for (let index = 0; index < allItemsNumber; index++) {
        let selectedMenuEntity = menuEntities[index];
        let selectedMenuDiv = document.createElement("div");
        selectedMenuDiv.innerHTML = selectedMenuEntity.label;
        selectedMenuDiv.className = "selectedMenu";
        selectedMenuDiv.style.textAlign = "center";
        selectedMenuDiv.style.width = (itemWidth - 2.1) + "px";
        accessContainer.appendChild(selectedMenuDiv);
    }

    let saveDiv = document.createElement("div")
    saveDiv.className = "actionButton";
    saveDiv.style.marginLeft = "45%";
    saveDiv.innerHTML = "保存";
    saveDiv.style.width = "10%";
    actionBarContainer.appendChild(saveDiv);
    saveDiv.onclick = function () {
        let loginName = loginNameInput.value;
        let userName = userNameInput.value;
        let password = password0Input.value;
        if (isNullValue(loginName)) {
            new Toast().show("请输入登录名");
            return;
        }
        if (isNullValue(userName)) {
            new Toast().show("请输入用户名");
            return;
        }

        if (isNullValue(password)) {
            new Toast().show("请输入密码");
            return;
        }

        let requestManagerEntity = new Object();
        requestManagerEntity.loginName = loginName;
        requestManagerEntity.username = userName;
        requestManagerEntity.password = password;
        let accessContainer = document.getElementById("accessContainer");
        if (!isNullValue(accessContainer)) {
            requestManagerEntity.menus = accessContainer.menus == undefined ? new Array() : accessContainer.menus;
            if (isNullValue(managerEntity)) {
                requestCreateManager(requestManagerEntity);
            } else {
                requestManagerEntity.managerId = managerEntity.managerId;
                requestManagerEntity.status = managerEntity.status;
                requestManagerEntity.queue = managerEntity.queue;
                requestManagerEntity.level = managerEntity.level;
                requestUpdateManager(requestManagerEntity, false);
            }
        } else {
            requestManagerEntity.managerId = managerEntity.managerId;
            requestManagerEntity.status = managerEntity.status;
            requestManagerEntity.queue = managerEntity.queue;
            requestManagerEntity.level = managerEntity.level;
            requestUpdateManager(requestManagerEntity, true);
        }
    }
}

function convertMangerSelfPasswordView(container, editorStatus) {
    container.innerHTML = null;
    if (editorStatus) {
        let password0Input = document.createElement("input")
        password0Input.className = "default";
        password0Input.style.marginLeft = "5%";
        password0Input.placeholder = "请输入密码";
        password0Input.style.marginRight = "10px";
        container.appendChild(password0Input);

        let password1Input = document.createElement("input")
        password1Input.className = "default";
        password1Input.placeholder = "请输入确认密码";
        password1Input.style.marginLeft = "10px";
        container.appendChild(password1Input);

        let cancelInput = document.createElement("input")
        cancelInput.type = "button";
        cancelInput.style.width = "5%";
        cancelInput.value = "取消";
        container.appendChild(cancelInput);

        cancelInput.onclick = function () {
            convertMangerSelfPasswordView(container, false)
        }
    } else {
        container.innerHTML = "登录密码: ";
        let passwordInput = document.createElement("input")
        passwordInput.className = "default";
        passwordInput.value = "******";
        passwordInput.readOnly = "true";
        passwordInput.style.cursor = "pointer";
        container.appendChild(passwordInput);
        passwordInput.onclick = function () {
            convertMangerSelfPasswordView(container, true)
        }
    }
}

function requestUpdateManager(managerEntity) {
    let url = BASE_PATH + "/manager/mUpdate?p=" + JSON.stringify(managerEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                var managerEntity = parseData.data;
                new Toast().show("更新成功");
                resetMainContainer();
                loadManagerSelfEditorView(managerEntity, FRAME_MENUS, false);
            } else {
                new Toast().show("更新失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}