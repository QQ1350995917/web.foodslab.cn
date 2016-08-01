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
    asyncRequestByGet(indexUrl,onIndexDataCallback,onManagerRequestError(),onManagerRequestTimeout());
}

/**
 * 读取管理员列表
 */
function onIndexDataCallback(data) {
    var result = checkResponsDataFormat(data);
    if (result){
        var mainTitles = new Array(new TabItem("1","管理员信息","horizontalNormal","horizontalSelected","horizontalSelected"));
        initHorizontalTabHostView(MAIN_TITLE_ID,mainTitles);
        var parseData = JSON.parse(data);
        var dataJson = parseData.data;
        console.log(dataJson.length);
        var managers = new Array();
        for (var index =0;index < dataJson.length;index++){
            var manager = dataJson[index];
            // var element = document.createElement("div");
            // element.innerHTML = manager.username;
            // document.getElementById(MAIN_CONTENT_ID).appendChild(element);
            managers.push(new Manager(manager.managerId,manager.username,manager.level));
        }
        var managerContainer = document.createElement("div");
        managerContainer.id = "managerContainer";
        managerContainer.className = "managerContainer";
        document.getElementById(MAIN_CONTENT_ID).appendChild(managerContainer);
        initManagerList(managerContainer,managers);
    }
}

/**
 * 管理员用户名是否可用
 */
function check(username){
    const checkUrl = BASE_PATH + "/manager/check";
}

/**
 * 创建管理员
 */
function create(){
    const checkUrl = BASE_PATH + "/manager/create";
}

/**
 * 更新管理员
 */
function update(){
    const checkUrl = BASE_PATH + "/manager/update";
}

function initManagerList(managerViewContainer, managers) {
    var size = managers.length;
    managerViewContainer.style.height = size * 240 + "px";
    for (var index = 0; index < size; index++) {
        managerViewContainer.appendChild(createManagerItemView(managers[index]));
    }
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
function Manager(managerId, managerName, managerLevel, managerOrder, managerStatus, managerPId) {
    this.managerId = managerId;
    this.managerName = managerName;
    this.managerLevel = managerLevel;
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
    /**创建第一行**/
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
    managerItem_rowLevel1.appendChild(managerItem_managerName);
    if (manager.managerLevel == 1){
        /**创建禁用操作按钮**/
        var managerItem_actionBlock = document.createElement("div");
        managerItem_actionBlock.className = "managerItem_action";
        managerItem_actionBlock.innerHTML = "禁用";
        managerItem_rowLevel1.appendChild(managerItem_actionBlock);
        /**创建删除操作按钮**/
        var managerItem_actionDelete = document.createElement("div");
        managerItem_actionDelete.className = "managerItem_action";
        managerItem_actionDelete.innerHTML = "删除";
        managerItem_rowLevel1.appendChild(managerItem_actionDelete);
    }
    /**添加第一行**/
    managerItemContainer.appendChild(managerItem_rowLevel1);

    /**创建第垂直线**/
    var managerItem_connectLineV = document.createElement("hr");
    managerItem_connectLineV.className = "managerItem_connectLineV";
    managerItemContainer.appendChild(managerItem_connectLineV);

    /**创建第二行**/
    var managerItem_rowLevel2_1 = document.createElement("div");
    managerItem_rowLevel2_1.className = "managerItem_rowLevel2";
    /**创建第二行连接线**/
    var managerItem_connectLineHLevel2 = document.createElement("hr");
    managerItem_connectLineHLevel2.className = "managerItem_connectLineHLevel2";
    managerItem_rowLevel2_1.appendChild(managerItem_connectLineHLevel2);
    /**创建第二行label**/
    var managerItem_label2_1 = document.createElement("div");
    managerItem_label2_1.className = "managerItem_label";
    managerItem_label2_1.innerHTML = "密码:";
    managerItem_rowLevel2_1.appendChild(managerItem_label2_1);
    /**创建第二行内容**/
    var managerItem_managerEditor2_1 = document.createElement("div");
    managerItem_managerEditor2_1.className = "managerItem_managerEditor";
    managerItem_rowLevel2_1.appendChild(managerItem_managerEditor2_1);
    /**添加第一行**/
    managerItemContainer.appendChild(managerItem_rowLevel2_1);


    /**创建第三行**/
    var managerItem_rowLevel3_1 = document.createElement("div");
    managerItem_rowLevel3_1.className = "managerItem_rowLevel2";
    /**创建第三行连接线**/
    var managerItem_connectLineHLevel3 = document.createElement("hr");
    managerItem_connectLineHLevel3.className = "managerItem_connectLineHLevel2";
    managerItem_rowLevel3_1.appendChild(managerItem_connectLineHLevel3);
    /**创建第三行label**/
    var managerItem_label3_1 = document.createElement("div");
    managerItem_label3_1.className = "managerItem_label";
    managerItem_label3_1.innerHTML = "确认:";
    managerItem_rowLevel3_1.appendChild(managerItem_label3_1);
    /**创建第三行内容**/
    var managerItem_managerEditor3_1 = document.createElement("div");
    managerItem_managerEditor3_1.className = "managerItem_managerEditor";
    managerItem_rowLevel3_1.appendChild(managerItem_managerEditor3_1);
    /**添加第三行**/
    managerItemContainer.appendChild(managerItem_rowLevel3_1);

    if (manager.managerLevel == 1){
        /**创建第四行**/
        var managerItem_rowLevel4_1 = document.createElement("div");
        managerItem_rowLevel4_1.className = "managerItem_rowLevel2";
        /**创建第四行连接线**/
        var managerItem_connectLineHLevel4 = document.createElement("hr");
        managerItem_connectLineHLevel4.className = "managerItem_connectLineHLevel2";
        managerItem_rowLevel4_1.appendChild(managerItem_connectLineHLevel4);
        /**创建第四行label**/
        var managerItem_label4_1 = document.createElement("div");
        managerItem_label4_1.className = "managerItem_label";
        managerItem_label4_1.innerHTML = "权限:";
        managerItem_rowLevel4_1.appendChild(managerItem_label4_1);
        /**创建第四行内容**/
        var managerItem_managerEditor4_1 = document.createElement("div");
        managerItem_managerEditor4_1.className = "managerItem_managerEditor";
        managerItem_rowLevel4_1.appendChild(managerItem_managerEditor4_1);
        /**添加第四行**/
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
    managerItem_rowLevel5_1.appendChild(managerItem_save);
    /**添加第五行**/
    managerItemContainer.appendChild(managerItem_rowLevel5_1);

    return managerItemContainer;
}
