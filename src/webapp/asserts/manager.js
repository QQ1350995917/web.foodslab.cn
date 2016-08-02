/**
 * Created by dingpengwei on 7/31/16.
 */

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
        var managers = new Array();
        for (var index = 0; index < dataJson.length; index++) {
            var manager = dataJson[index];
            console.log(manager);
            // var element = document.createElement("div");
            // element.innerHTML = manager.username;
            // document.getElementById(MAIN_CONTENT_ID).appendChild(element);
            managers.push(new Manager(manager.managerId, manager.username, manager.level,manager.menus));
        }
        var managerContainer = document.createElement("div");
        managerContainer.id = "managerContainer";
        managerContainer.className = "managerContainer";
        document.getElementById(MAIN_CONTENT_ID).appendChild(managerContainer);
        initManagerList(managerContainer, managers);
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
function update(managerId,username, password, menus) {
    const checkUrl = BASE_PATH + "/manager/update";
    let menusParams = "";
    for (let index = 0; index < menus.length; index++) {
        let menu = menus[index];
        menusParams = menusParams + "," + menu.menuId + ":" + menu.label
    }
    let params = "managerId="+managerId+"&username=" + username + "&password=" + password + "&menus=" + menusParams;
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

function initManagerList(managerViewContainer, managers) {
    managerViewContainer.innerHTML = null;
    var size = managers.length;
    managerViewContainer.style.height = size * 240 + "px";
    for (var index = 0; index < size; index++) {
        managerViewContainer.appendChild(createManagerItemView(managers[index]));
    }
    let element = document.createElement("button");
    element.className = "managerItem_save";
    element.innerHTML = "添加管理员";
    managerViewContainer.appendChild(element);
    element.onclick = function () {
        managers.push(new Manager(APP_CONST_CLIENT_ID, "default", 1,new Array()));
        initManagerList(managerViewContainer, managers);
    };
}


/**
 * 定义Manager信息
 * @param managerId
 * @param managerName
 * @param managerLevel
 * @param managerOrder
 * @param managerStatus
 * @param managerPId
 * @constructor
 */
function Manager(managerId, managerName, managerLevel, menus,managerOrder, managerStatus, managerPId) {
    this.managerId = managerId;
    this.managerName = managerName;
    this.managerLevel = managerLevel;
    this.menus = menus;
    this.managerOrder = managerOrder;
    this.managerStatus = managerStatus;
    this.managerPId = managerPId;
}


/**
 * 构件Manager显示的View
 * @param manager
 * @returns {Element}
 */
function createManagerItemView(manager) {
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
    managerItem_managerName.innerHTML = manager.managerName;
    managerItem_rowLevel1.appendChild(initWidgetEditable1(managerItem_managerName, manager));
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
    managerItem_rowLevel2_1.appendChild(initWidgetEditable2(managerItem_managerEditor2_1, manager, "password1"));
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
    managerItem_rowLevel3_1.appendChild(initWidgetEditable2(managerItem_managerEditor3_1, manager, "password2"));
    /**添加第三行:密码确认**/
    managerItemContainer.appendChild(managerItem_rowLevel3_1);

    if (manager.managerLevel == 1) {
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
        let selectedMenus = manager.menus;
        let optionsMenus = new Array();
        for (let index = 0;index < APP_CONST_MENU.length;index++){
            let option =  APP_CONST_MENU[index];
            let flag = undefined;
            for (let i = 0;i<selectedMenus.length;i++){
                let selected = selectedMenus[i]
                if (option.menuId == selected.menuId){
                    flag = 1;
                    break;
                }
            }
            if (!flag){
                optionsMenus.push(option);
            }
        }
        initWidgetSelector(managerItem_managerEditor4_1, selectedMenus, optionsMenus);
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
        if (manager.managerId == APP_CONST_CLIENT_ID) {
            create(managerItem_managerName.innerText, managerItem_managerEditor2_1.password, managerItem_managerEditor4_1.menus);
        } else {
            update(manager.managerId,managerItem_managerName.innerText, managerItem_managerEditor2_1.password, managerItem_managerEditor4_1.menus);
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
 * @param widgetEditable
 */
function initWidgetEditable1(container, manager) {
    container.innerHTML = null;
    if (manager.currentUserNameStatus == undefined || manager.currentUserNameStatus == "normalDisplay") {
        let username = document.createElement("div");
        username.className = "widget_editable_block";
        username.innerHTML = manager.managerName;
        container.appendChild(username);
        username.addEventListener("dblclick", function () {
            manager.currentUserNameStatus = "selectDisplay";
            if (manager.managerLevel == 1) {
                container.style.width = "300px";
            }
            initWidgetEditable1(container, manager)
        });
    } else if (manager.currentUserNameStatus == "selectDisplay") {
        let input = document.createElement("input");
        input.className = "widget_editable_block";
        input.type = "text";
        input.style.fontSize = 1 + "rem";
        input.value = manager.managerName;
        container.appendChild(input);
        if (manager.managerLevel == 1 && manager.managerId != APP_CONST_CLIENT_ID) {
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
            manager.currentUserNameStatus = "normalDisplay";
            manager.managerName = input.value;
            initWidgetEditable1(container, manager)
            check(manager.managerName);
        });
    }
    return container;
}


/**
 * 用户密码文本显示区域,输入框
 * @param container
 * @param widgetEditable
 */
function initWidgetEditable2(container, manager, id) {
    container.innerHTML = null;
    if (manager.currentPassword1Status == undefined || manager.currentPassword1Status == "normalDisplay") {
        let username = document.createElement("div");
        username.className = "widget_editable_block";
        username.id = id;
        if (manager.passowrd1 != undefined && manager.passowrd1 != "") {
            username.value = manager.passowrd1;
            username.innerText = "......";
        }
        container.appendChild(username);
        username.addEventListener("dblclick", function () {
            manager.currentPassword1Status = "selectDisplay";
            initWidgetEditable2(container, manager)
        });
    } else if (manager.currentPassword1Status == "selectDisplay") {
        let input = document.createElement("input");
        input.innerHTML = null;
        input.id = id;
        input.className = "widget_editable_block";
        input.type = "password";
        input.style.fontSize = 1 + "rem";
        container.appendChild(input);
        input.addEventListener("blur", function () {
            // container.style.width = "50%";
            manager.currentPassword1Status = "normalDisplay";
            manager.passowrd1 = input.value;
            container.password = input.value;
            initWidgetEditable2(container, manager)
        });
    }
    return container;
}

/**
 * 权限选择器
 * @param container
 * @param selected
 * @param options
 */
function initWidgetSelector(container, selected, options) {
    container.innerHTML = null;
    let selectedSize = selected.length;
    container.menus = selected;
    for (let index = 0; index < selectedSize; index++) {
        let selectorItem = selected[index];
        let displayLabel = document.createElement("div");
        displayLabel.className = "selector_selected";
        displayLabel.innerHTML = selectorItem.menuLabel;
        let displayLabelDelete = document.createElement("div");
        displayLabelDelete.innerHTML = "X";
        displayLabelDelete.className = "selector_selected_delete";
        displayLabel.appendChild(displayLabelDelete);
        displayLabel.onmousemove = function () {
            displayLabelDelete.style.visibility = "visible";
            displayLabelDelete.onclick = function () {
                let selected1 = selected.slice(0, index);
                let selected2 = selected.slice(index + 1, selectedSize);
                selected = selected1.concat(selected2);
                options.push(selectorItem);
                initWidgetSelector(container, selected, options);
            }
        }
        displayLabel.onmouseout = function () {
            displayLabelDelete.style.visibility = "hidden";
        }

        container.appendChild(displayLabel);
    }
    let optionsSize = options.length;
    if (optionsSize > 0) {
        let selector = document.createElement("select");
        selector.className = "selector_selected";
        selector.options.add(new Option("请选择", "请选择"));
        container.appendChild(selector);
        for (let index = 0; index < optionsSize; index++) {
            let option = new Option(options[index].label, options[index].menuId);
            selector.options.add(option);
        }
        selector.onchange = function () {
            if (selector.selectedIndex > 0) {
                let selectedOption = options[selector.selectedIndex - 1];
                let options1 = options.slice(0, selector.selectedIndex - 1);
                let options2 = options.slice(selector.selectedIndex, optionsSize);
                options = options1.concat(options2);
                selected.push(selectedOption);
                initWidgetSelector(container, selected, options);
            }
        };
    }
}