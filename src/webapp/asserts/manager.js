/**
 * Created by dingpengwei on 7/31/16.
 */

class ManagerEntity {
    /**
     * 管理员数据对象
     * @param managerId // 数据ID
     * @param username // 用户名，即登录名
     * @param level // 管理员的等级
     * @param queue // 顺序
     * @param status // 数据状态，可以查询数据库元数据表，这里取值有3个，-1标示删除，0标示禁用，1标示正常
     * @param pId
     * @param managerMenuEntitiesMapping
     */
    constructor(managerId, username, level, queue, status, pId, managerMenuEntitiesMapping) {
        this.managerId = managerId;
        this.username = username;
        this.level = level;
        this.queue = queue;
        this.status = status;
        this.pId = pId;
        this.managerMenuEntitiesMapping = managerMenuEntitiesMapping;
        this.isUsernameU = false;
        this.password = "";
        this.isPasswordU = false;
        this.isStatusU = false;
    }

    // 非数据库字段，标记是否要更新数据库字段，默认为false不更新，非false更新
    setUsernameUpdate(isUsernameU) {
        this.isUsernameU = isUsernameU;
    }

    // 用户密码，即登录密码，非明文 TODO: 采用哪种加密方式
    setPassword(password) {
        this.password = password;
    }

    // 非数据库字段，标记是否要更新数据库字段，默认为false不更新，非false更新
    setPasswordUpdate(isPasswordU) {
        this.isPasswordU = isPasswordU;
    }

    // 非数据库字段，标记是否要更新数据库字段，默认为false不更新，非false更新
    setPasswordUpdate(isPasswordU) {
        this.isStatusU = isStatusU;
    }

    toString() {
        return '(' + this.managerId + ', ' + this.username + ')';
    }
}

class ManagerMenuEntity {
    /**
     * 管理员-菜单数据映射对象
     * @param managerId // 管理员数据ID
     * @param menuId // 菜单数据ID
     * @param menuLabel  // 菜单数据名称
     */
    constructor(managerId, menuId, menuLabel) {
        this.managerId = managerId;
        this.menuId = menuId;
        this.menuLabel = menuLabel;
    }

    toString() {
        return '(' + this.managerId + ', ' + this.username + ')';
    }
}

/**
 * 管理员接口发生请求错误
 */
function onManagerRequestError() {

}

/**
 * 管理员接口发生请求超时
 */
function onManagerRequestTimeout() {

}

/**
 * 读取管理员列表
 */
function managerIndex() {
    const indexUrl = BASE_PATH + "/manager";
    asyncRequestByGet(indexUrl, onIndexDataCallback, onManagerRequestError(), onManagerRequestTimeout());
}

/**
 * 读取管理员列表
 */
function onIndexDataCallback(data) {
    var result = checkResponsDataFormat(data);
    if (result) {
        var mainTitles = new Array(new TabItem("1", "管理员信息", "", "horizontalNormal", "horizontalSelected", "horizontalSelected"));
        initHorizontalTabHostView(MAIN_TITLE_ID, mainTitles);
        var parseData = JSON.parse(data);
        var dataJson = parseData.data;
        var managerEntities = new Array();
        for (var index = 0; index < dataJson.length; index++) {
            var managerEntity = dataJson[index];
            managerEntities.push(new ManagerEntity(managerEntity.managerId, managerEntity.username, managerEntity.level, managerEntity.queue, managerEntity.status, managerEntity.pId, managerEntity.managerMenuEntitiesMapping));
        }
        var managerContainer = document.createElement("div");
        managerContainer.id = "managerContainer";
        managerContainer.className = "managerContainer";
        document.getElementById(MAIN_CONTENT_ID).appendChild(managerContainer);
        initManagerList(managerContainer, managerEntities);
    }
}

/**
 * 管理员用户名是否可用
 */
function check(username) {
    const checkUrl = BASE_PATH + "/manager/check";
    asyncRequestByPost(checkUrl, function (data) {
        var parseData = JSON.parse(data);
        var result = parseData.data;
        if (result == "true") {
            new Toast().show("用户名已经存在");
        } else {
            new Toast().show("用户名可用");
        }
    }, onManagerRequestError, onManagerRequestTimeout, "username=" + username);
}

/**
 * 创建管理员
 */
function create(username, password, menus) {
    const checkUrl = BASE_PATH + "/manager/create";
    let menusParams = "";
    for (let index = 0; index < menus.length; index++) {
        let menu = menus[index];
        menusParams = menusParams + "," + menu.menuId + ":" + menu.label
    }
    let params = "pid=xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx&username=" + username + "&password=" + password + "&menus=" + menusParams;
    asyncRequestByPost(checkUrl, function (data) {
        var parseData = JSON.parse(data);
        var result = parseData.data;
        if (result == "false") {
            new Toast().show("创建失败");
        } else {
            new Toast().show("创建成功");
        }
    }, onManagerRequestError, onManagerRequestTimeout, params);
}

/**
 * 更新管理员
 */
function update(managerId, username, password, menus) {
    const checkUrl = BASE_PATH + "/manager/update";
    let menusParams = "";
    for (let index = 0; index < menus.length; index++) {
        let menu = menus[index];
        menusParams = menusParams + "," + menu.menuId + ":" + menu.menuLabel;
    }
    let params = "managerId=" + managerId + "&username=" + username + "&password=" + password + "&menus=" + menusParams;
    asyncRequestByPost(checkUrl, function (data) {
        var parseData = JSON.parse(data);
        var result = parseData.data;
        if (result == "false") {
            new Toast().show("更新失败");
        } else {
            new Toast().show("更新成功");
        }
    }, onManagerRequestError, onManagerRequestTimeout, params);
}

function initManagerList(managerViewContainer, managerEntities) {
    managerViewContainer.innerHTML = null;
    var size = managerEntities.length;
    managerViewContainer.style.height = size * 240 + "px";
    for (var index = 0; index < size; index++) {
        managerViewContainer.appendChild(createManagerItemView(managerEntities[index]));
    }
    let element = document.createElement("button");
    element.className = "managerItem_save";
    element.innerHTML = "添加管理员";
    managerViewContainer.appendChild(element);
    element.onclick = function () {
        managerEntities.push(new ManagerEntity(APP_CONST_CLIENT_ID, "default", 1,1,"", new Array()));
        initManagerList(managerViewContainer, managerEntities);
    };
}

/**
 * 构件Manager显示的View
 * @param managerEntity
 * @returns {Element}
 */
function createManagerItemView(managerEntity) {
    var managerItemContainer = document.createElement("div")
    managerItemContainer.className = "managerItemContainer";
    /**创建第一行:用户名**/
    var managerItem_rowLevel1 = document.createElement("div");
    managerItem_rowLevel1.className = "managerItem_rowLevel1";
    /**一级短横线**/
    var managerItem_connectLineHLevel1 = document.createElement("hr");
    managerItem_connectLineHLevel1.className = "managerItem_connectLineHLevel1";
    managerItem_rowLevel1.appendChild(managerItem_connectLineHLevel1);
    /**创建用户名**/
    var managerItem_managerName = document.createElement("div");
    managerItem_managerName.className = "managerItem_managerName";
    managerItem_managerName.innerHTML = managerEntity.username;
    managerItem_rowLevel1.appendChild(initWidgetEditable1(managerItem_managerName, managerEntity));
    /**添加第一行:用户名**/
    managerItemContainer.appendChild(managerItem_rowLevel1);

    /**创建第垂直线**/
    var managerItem_connectLineV = document.createElement("hr");
    managerItem_connectLineV.className = "managerItem_connectLineV";
    managerItemContainer.appendChild(managerItem_connectLineV);

    /**创建第二行:密码**/
    var managerItem_rowLevel2_1 = document.createElement("div");
    managerItem_rowLevel2_1.className = "managerItem_rowLevel2";
    /**创建第二行:密码连接线**/
    var managerItem_connectLineHLevel2 = document.createElement("hr");
    managerItem_connectLineHLevel2.className = "managerItem_connectLineHLevel2";
    managerItem_rowLevel2_1.appendChild(managerItem_connectLineHLevel2);
    /**创建第二行:密码label**/
    var managerItem_label2_1 = document.createElement("div");
    managerItem_label2_1.className = "managerItem_label";
    managerItem_label2_1.innerHTML = "密码:";
    managerItem_rowLevel2_1.appendChild(managerItem_label2_1);
    /**创建第二行:密码内容**/
    var managerItem_managerEditor2_1 = document.createElement("div");
    managerItem_managerEditor2_1.className = "managerItem_managerEditor";
    // managerItem_rowLevel2_1.appendChild(managerItem_managerEditor2_1);
    managerItem_rowLevel2_1.appendChild(initWidgetEditable2(managerItem_managerEditor2_1, managerEntity, "password1"));
    /**添加第二行:密码**/
    managerItemContainer.appendChild(managerItem_rowLevel2_1);


    /**创建第三行:密码确认**/
    var managerItem_rowLevel3_1 = document.createElement("div");
    managerItem_rowLevel3_1.className = "managerItem_rowLevel2";
    /**创建第三行:密码确认连接线**/
    var managerItem_connectLineHLevel3 = document.createElement("hr");
    managerItem_connectLineHLevel3.className = "managerItem_connectLineHLevel2";
    managerItem_rowLevel3_1.appendChild(managerItem_connectLineHLevel3);
    /**创建第三行:密码确认label**/
    var managerItem_label3_1 = document.createElement("div");
    managerItem_label3_1.className = "managerItem_label";
    managerItem_label3_1.innerHTML = "确认:";
    managerItem_rowLevel3_1.appendChild(managerItem_label3_1);
    /**创建第三行:密码确认内容**/
    var managerItem_managerEditor3_1 = document.createElement("div");
    managerItem_managerEditor3_1.className = "managerItem_managerEditor";
    // managerItem_rowLevel3_1.appendChild(managerItem_managerEditor3_1);
    managerItem_rowLevel3_1.appendChild(initWidgetEditable2(managerItem_managerEditor3_1, managerEntity, "password2"));
    /**添加第三行:密码确认**/
    managerItemContainer.appendChild(managerItem_rowLevel3_1);

    if (managerEntity.level == 1) {
        /**创建第四行:权限**/
        var managerItem_rowLevel4_1 = document.createElement("div");
        managerItem_rowLevel4_1.className = "managerItem_rowLevel2";
        /**创建第四行:权限连接线**/
        var managerItem_connectLineHLevel4 = document.createElement("hr");
        managerItem_connectLineHLevel4.className = "managerItem_connectLineHLevel2";
        managerItem_rowLevel4_1.appendChild(managerItem_connectLineHLevel4);
        /**创建第四行:权限label**/
        var managerItem_label4_1 = document.createElement("div");
        managerItem_label4_1.className = "managerItem_label";
        managerItem_label4_1.innerHTML = "权限:";
        managerItem_rowLevel4_1.appendChild(managerItem_label4_1);
        /**创建第四行:权限内容**/
        var managerItem_managerEditor4_1 = document.createElement("div");
        managerItem_managerEditor4_1.className = "managerItem_managerEditor";
        managerItem_managerEditor4_1.style.width = "90%";
        let selectedManagerMenuEntities = managerEntity.managerMenuEntitiesMapping == undefined ? new Array() : managerEntity.managerMenuEntitiesMapping;
        let optionsMenus = new Array();
        for (let index = 0; index < APP_CONST_MENU.length; index++) {
            let option = APP_CONST_MENU[index];
            let flag = undefined;
            for (let i = 0; i < selectedManagerMenuEntities.length; i++) {
                let selected = selectedManagerMenuEntities[i]
                if (option.menuId == selected.menuId) {
                    flag = 1;
                    break;
                }
            }

            if (!flag) {
                optionsMenus.push(option);
            }
        }
        initWidgetSelector(managerItem_managerEditor4_1, selectedManagerMenuEntities, optionsMenus);
        managerItem_rowLevel4_1.appendChild(managerItem_managerEditor4_1);
        /**添加第四行:权限**/
        managerItemContainer.appendChild(managerItem_rowLevel4_1);
    }


    /**创建第五行**/
    var managerItem_rowLevel5_1 = document.createElement("div");
    managerItem_rowLevel5_1.className = "managerItem_rowLevel2";
    /**创建第五行连接线**/
    var managerItem_connectLineHLevel5 = document.createElement("hr");
    managerItem_connectLineHLevel5.className = "managerItem_connectLineHLevel2";
    managerItem_rowLevel5_1.appendChild(managerItem_connectLineHLevel5);
    /**创建第五行内容**/
    var managerItem_save = document.createElement("button");
    managerItem_save.className = "managerItem_save";
    managerItem_save.innerHTML = "确认保存";
    managerItem_save.onclick = function () {
        let menus = managerItem_managerEditor4_1.menus;

        if (managerEntity.managerId == APP_CONST_CLIENT_ID) {
            create(managerItem_managerName.innerText, managerItem_managerEditor2_1.password,menus );
        } else {
            update(managerEntity.managerId, managerItem_managerName.innerText, managerItem_managerEditor2_1.password, menus);
        }
    };
    managerItem_rowLevel5_1.appendChild(managerItem_save);
    /**添加第五行**/
    managerItemContainer.appendChild(managerItem_rowLevel5_1);

    return managerItemContainer;
}


/**
 * 用户名称文本显示区域,输入框,操作按钮呼唤
 * @param container
 * @param managerEntity
 */
function initWidgetEditable1(container, managerEntity) {
    container.innerHTML = null;
    if (managerEntity.currentUserNameStatus == undefined || managerEntity.currentUserNameStatus == "normalDisplay") {
        let username = document.createElement("div");
        username.className = "widget_editable_block";
        username.innerHTML = managerEntity.username;
        container.appendChild(username);
        username.addEventListener("dblclick", function () {
            managerEntity.currentUserNameStatus = "selectDisplay";
            if (managerEntity.level == 1) {
                container.style.width = "300px";
            }
            initWidgetEditable1(container, managerEntity)
        });
    } else if (managerEntity.currentUserNameStatus == "selectDisplay") {
        let input = document.createElement("input");
        input.className = "widget_editable_block";
        input.type = "text";
        input.style.fontSize = 1 + "rem";
        input.value = managerEntity.username;
        container.appendChild(input);
        if (managerEntity.level == 1 && managerEntity.managerId != APP_CONST_CLIENT_ID) {
            let blockButton = document.createElement("div");
            blockButton.type = "button";
            blockButton.className = "widget_editable_button";
            blockButton.innerHTML = "禁用";
            let deleteButton = document.createElement("div");
            deleteButton.type = "button";
            deleteButton.className = "widget_editable_button";
            deleteButton.innerHTML = "删除";
            container.appendChild(blockButton);
            container.appendChild(deleteButton);
        }
        input.addEventListener("blur", function () {
            container.style.width = "200px";
            managerEntity.currentUserNameStatus = "normalDisplay";
            managerEntity.username = input.value;
            initWidgetEditable1(container, managerEntity)
            check(managerEntity.username);
        });
    }
    return container;
}


/**
 * 用户密码文本显示区域,输入框
 * @param container
 * @param managerEntity
 */
function initWidgetEditable2(container, managerEntity, id) {
    container.innerHTML = null;
    if (managerEntity.currentPassword1Status == undefined || managerEntity.currentPassword1Status == "normalDisplay") {
        let username = document.createElement("div");
        username.className = "widget_editable_block";
        username.id = id;
        if (managerEntity.passowrd1 != undefined && managerEntity.passowrd1 != "") {
            username.value = managerEntity.passowrd1;
            username.innerText = "......";
        }
        container.appendChild(username);
        username.addEventListener("dblclick", function () {
            managerEntity.currentPassword1Status = "selectDisplay";
            initWidgetEditable2(container, managerEntity)
        });
    } else if (managerEntity.currentPassword1Status == "selectDisplay") {
        let input = document.createElement("input");
        input.innerHTML = null;
        input.id = id;
        input.className = "widget_editable_block";
        input.type = "password";
        input.style.fontSize = 1 + "rem";
        container.appendChild(input);
        input.addEventListener("blur", function () {
            // container.style.width = "50%";
            managerEntity.currentPassword1Status = "normalDisplay";
            managerEntity.passowrd1 = input.value;
            container.password = input.value;
            initWidgetEditable2(container, managerEntity)
        });
    }
    return container;
}

/**
 * 权限选择器
 * @param container
 * @param selectedManagerMenuEntities
 * @param optionsMenus
 */
function initWidgetSelector(container, selectedManagerMenuEntities, optionsMenus) {
    container.innerHTML = null;
    let selectedSize = selectedManagerMenuEntities.length;
    container.menus = selectedManagerMenuEntities;
    for (let index = 0; index < selectedSize; index++) {
        let managerMenu = selectedManagerMenuEntities[index];
        let managerMenuDiv = document.createElement("div");
        managerMenuDiv.className = "selector_selected";
        managerMenuDiv.innerHTML = managerMenu.menuLabel;
        let managerMenuDeleteDiv = document.createElement("div");
        managerMenuDeleteDiv.innerHTML = "X";
        managerMenuDeleteDiv.className = "selector_selected_delete";
        managerMenuDiv.appendChild(managerMenuDeleteDiv);
        managerMenuDiv.onmousemove = function () {
            managerMenuDeleteDiv.style.visibility = "visible";
            managerMenuDeleteDiv.onclick = function () {
                let selected1 = selectedManagerMenuEntities.slice(0, index);
                let selected2 = selectedManagerMenuEntities.slice(index + 1, selectedSize);
                selectedManagerMenuEntities = selected1.concat(selected2);
                optionsMenus.push(managerMenu);
                initWidgetSelector(container, selectedManagerMenuEntities, optionsMenus);
            }
        }
        managerMenuDiv.onmouseout = function () {
            managerMenuDeleteDiv.style.visibility = "hidden";
        }

        container.appendChild(managerMenuDiv);
    }
    let optionsSize = optionsMenus.length;
    if (optionsSize > 0) {
        let selector = document.createElement("select");
        selector.className = "selector_selected";
        selector.options.add(new Option("请选择", "请选择"));
        container.appendChild(selector);
        for (let index = 0; index < optionsSize; index++) {
            let option = new Option(optionsMenus[index].label, optionsMenus[index].menuId);
            selector.options.add(option);
        }
        selector.onchange = function () {
            if (selector.selectedIndex > 0) {
                let selectedOption = optionsMenus[selector.selectedIndex - 1];
                let options1 = optionsMenus.slice(0, selector.selectedIndex - 1);
                let options2 = optionsMenus.slice(selector.selectedIndex, optionsSize);
                optionsMenus = options1.concat(options2);
                selectedManagerMenuEntities.push(new ManagerMenuEntity("", selectedOption.menuId, selectedOption.label));
                initWidgetSelector(container, selectedManagerMenuEntities, optionsMenus);
            }
        };
    }
}