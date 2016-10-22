/**
 * Created by dingpengwei on 10/20/16.
 */
function loadManagerEditorView(managerEntity, menuEntities) {
    let titleView = document.createElement("div");
    if (isNullValue(managerEntity)) {
        titleView.innerHTML = "管理员编辑 >> 添加管理员";
    } else {
        titleView.innerHTML = "管理员编辑 >> " + managerEntity.username;
    }
    titleView.style.cursor = "pointer";
    titleView.onclick = function () {
        resetMainContainer();
        loadManagerView();
    }
    getTitleContainer().appendChild(titleView);
    attachManagerEditorView(managerEntity, menuEntities);
}

function attachManagerEditorView(managerEntity, menuEntities) {
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
        convertMangerPasswordView(passwordContainer, false)
    }

    let password1Input = document.createElement("input")
    password1Input.className = "default";
    password1Input.placeholder = "请输入确认密码";
    password1Input.style.marginLeft = "10px";
    if (isNullValue(managerEntity)) {
        passwordContainer.appendChild(password1Input);
    }

    let leftMenuEntities = new Array();
    for (let i = 0; i < menuEntities.length; i++) {
        let menuEntity = menuEntities[i];
        let selected = false;
        if (!isNullValue(managerEntity)) {
            let length = managerEntity.menus == undefined ? 0 : managerEntity.menus.length;
            for (let j = 0; j < length; j++) {
                let selectedMenuEntity = managerEntity.menus[j];
                if (selectedMenuEntity.menuId == menuEntity.menuId) {
                    selected = true;
                    break;
                }
            }
        }
        if (!selected) {
            leftMenuEntities.push(menuEntity);
        }
    }
    attachMenuSelectorToAccessView(accessContainer, managerEntity == undefined ? undefined : managerEntity.menus, leftMenuEntities);

    let cancelDiv = document.createElement("div")
    cancelDiv.className = "actionButton floatLeft";
    if (isNullValue(managerEntity)) {
        cancelDiv.innerHTML = "取消";
    } else {
        cancelDiv.innerHTML = "返回";
    }
    cancelDiv.style.marginLeft = "39%";
    cancelDiv.style.marginRight = "1%";
    cancelDiv.style.width = "10%";
    actionBarContainer.appendChild(cancelDiv);

    let saveDiv = document.createElement("div")
    saveDiv.className = "actionButton floatLeft";
    if (isNullValue(managerEntity)) {
        saveDiv.innerHTML = "提交";
    } else {
        saveDiv.innerHTML = "保存";
    }
    saveDiv.style.marginLeft = "1%";
    saveDiv.style.width = "10%";
    actionBarContainer.appendChild(saveDiv);

    cancelDiv.onclick = function () {
        resetMainContainer();
        loadManagerView();
    }

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
        requestManagerEntity.menus = accessContainer.menus == undefined ? new Array() : accessContainer.menus;
        if (isNullValue(managerEntity)) {
            requestCreateManager(requestManagerEntity);
        } else {
            requestManagerEntity.managerId = managerEntity.managerId;
            requestManagerEntity.status = managerEntity.status;
            requestManagerEntity.queue = managerEntity.queue;
            requestManagerEntity.level = managerEntity.level;
            requestUpdateManager(requestManagerEntity);
        }
    }
}

function convertMangerPasswordView(container, editorStatus) {
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
            convertMangerPasswordView(container, false)
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
            convertMangerPasswordView(container, true)
        }
    }
}

function attachMenuSelectorToAccessView(container, selectedMenuEntities, leftMenuEntities) {
    container.innerHTML = null;
    container.menus = selectedMenuEntities;
    if (isNullValue(selectedMenuEntities)) {
        selectedMenuEntities = new Array();
    }
    if (isNullValue(leftMenuEntities)) {
        leftMenuEntities = new Array();
    }

    let selectedSize = selectedMenuEntities.length;
    let optionsSize = leftMenuEntities.length;
    let allItemsNumber = selectedSize + optionsSize;//菜单总个数
    let itemsNumber = selectedSize + (optionsSize > 0 ? 1 : 0);//显示的菜单个数 (选择器占用一个菜单位置)
    let itemWidth = (container.clientWidth / allItemsNumber) - 2;//实际显示的菜单中每个菜单应该占用的宽度(样式中标注了左右各一个像素的边框)
    let innerContainer = document.createElement("div");
    innerContainer.className = "managerItem textCenter editorManagerItem";
    innerContainer.style.width = itemsNumber * (itemWidth + 2) + "px";//由于样式中标注了左右各一个像素的边框,故实际显示的时候要计算上
    container.appendChild(innerContainer);

    for (let index = 0; index < selectedSize; index++) {
        let selectedMenuEntity = selectedMenuEntities[index];
        let selectedMenuDiv = document.createElement("div");
        selectedMenuDiv.innerHTML = selectedMenuEntity.label;
        selectedMenuDiv.className = "selectedMenu";
        selectedMenuDiv.style.width = itemWidth + "px";
        let selectedMenuDelDiv = document.createElement("div");
        selectedMenuDelDiv.innerHTML = "X";
        selectedMenuDelDiv.className = "selectedDel";
        selectedMenuDiv.appendChild(selectedMenuDelDiv);
        selectedMenuDiv.onmousemove = function () {
            selectedMenuDelDiv.style.visibility = "visible";
            selectedMenuDelDiv.onclick = function () {
                let selected1 = selectedMenuEntities.slice(0, index);
                let selected2 = selectedMenuEntities.slice(index + 1, selectedSize);
                selectedMenuEntities = selected1.concat(selected2);
                leftMenuEntities.push(selectedMenuEntity);
                attachMenuSelectorToAccessView(container, selectedMenuEntities, leftMenuEntities);
            }
        }
        selectedMenuDiv.onmouseout = function () {
            selectedMenuDelDiv.style.visibility = "hidden";
        }
        innerContainer.appendChild(selectedMenuDiv);
    }

    if (optionsSize < 1) {
        return;
    }
    let accessSelector = document.createElement("select");
    accessSelector.className = "selector";
    accessSelector.style.width = itemWidth + "px";
    accessSelector.options.add(new Option("请选择授权项", "请选择授权项"));
    innerContainer.appendChild(accessSelector);

    for (let i = 0; i < optionsSize; i++) {
        let option = new Option(leftMenuEntities[i].label, leftMenuEntities[i].menuId);
        accessSelector.options.add(option);
    }

    accessSelector.onchange = function () {
        if (accessSelector.selectedIndex > 0) {
            let selectedOption = leftMenuEntities[accessSelector.selectedIndex - 1];
            let options1 = leftMenuEntities.slice(0, accessSelector.selectedIndex - 1);
            let options2 = leftMenuEntities.slice(accessSelector.selectedIndex, optionsSize);
            leftMenuEntities = options1.concat(options2);
            selectedMenuEntities.push(selectedOption);
            attachMenuSelectorToAccessView(container, selectedMenuEntities, leftMenuEntities);
        }
    };
}

function requestCreateManager(managerEntity) {
    const url = BASE_PATH + "/manager/MCreate?p=" + JSON.stringify(managerEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                var managerEntity = parseData.data;
                new Toast().show("创建成功");
                resetMainContainer();
                loadManagerEditorView(managerEntity,FRAME_MENUS,false);
            } else {
                new Toast().show("创建失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function requestUpdateManager(managerEntity) {
    let url = BASE_PATH + "/manager/MUpdate?p=" + JSON.stringify(managerEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                var managerEntity = parseData.data;
                new Toast().show("更新成功");
                resetMainContainer();
                loadManagerEditorView(managerEntity,FRAME_MENUS);
            } else {
                new Toast().show("更新失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}