/**
 * Created by dingpengwei on 8/18/16.
 */

function showMessageView() {
    // 重置界面
    resetView();
    // 获取根元素对象
    let titleViewContainer = document.getElementById(MAIN_TITLE_ID);
    // 添加标题
    let titleView = document.createElement("div");
    titleView.innerHTML = "用户列表";
    titleView.className = "horizontalSelected";
    titleView.style.width = "100%";
    titleViewContainer.appendChild(titleView);

    requestMessage();
}

function requestMessage() {
    onRequestMessageDataCallback(null);
}

function onRequestMessageDataCallback(data) {
    initMessageEntitiesContainerView();
}

function initMessageEntitiesContainerView(messageEntities) {
    let contentViewContainer = document.getElementById(MAIN_CONTENT_ID);
    let searchView = createSearchWidget(function (data) {
        console.log(data);
    });
    contentViewContainer.appendChild(searchView);

    let messageContainer = document.createElement("div");
    messageContainer.className = "SS_IC";
    messageContainer.style.width = "100%";
    messageContainer.style.height = "40px";//在添加之前设置动态高度=数据条数*40
    messageContainer.appendChild(createPublishMessageView());//新添加按钮已经占据了40px的高度

    let size = 3;
    for (let index = 0; index < size; index++) {
        let messageItemContainer = document.createElement("div");
        messageItemContainer.className = "SS_IC";
        messageItemContainer.style.width = "100%";
        messageItemContainer.style.height = "40px";
        messageItemContainer.style.borderWidth = "0px";

        let line_H_level1 = document.createElement("hr");
        line_H_level1.className = "SS_IC_HL";
        messageItemContainer.appendChild(line_H_level1);

        let messageView = document.createElement("div");
        messageView.className = "SS_IC_LABEL";
        messageView.style.borderWidth = "1px";
        messageView.style.paddingLeft = "10px";
        messageView.style.width = "1033px";
        messageView.style.cursor = "default";
        messageView.style.textAlign = "left";
        messageView.innerHTML = "2016-07-08 13:34:12 系统发布消息：春节到了，特惠大酬宾，敬请关注。<span style='color:red'>1234</span>人已读";
        messageItemContainer.appendChild(messageView);
        messageContainer.appendChild(messageItemContainer);
    }

    messageContainer.style.height = (size + 1) * 40 + "px";
    contentViewContainer.appendChild(messageContainer);

}

function createPublishMessageView() {
    let publishMessageContainer = document.createElement("div");
    publishMessageContainer.className = "SS_IC";
    publishMessageContainer.style.width = "100%";
    publishMessageContainer.style.height = "40px";
    publishMessageContainer.style.borderWidth = "0px";

    let line_H_level1 = document.createElement("hr");
    line_H_level1.className = "SS_IC_HL";
    publishMessageContainer.appendChild(line_H_level1);

    let publishConvertView = document.createElement("div");
    publishConvertView.className = "SS_IC";
    publishConvertView.style.borderWidth = "0px";
    publishConvertView.style.width = "1043px";
    createConvertView(publishConvertView, true, 0);
    publishMessageContainer.appendChild(publishConvertView);
    return publishMessageContainer;
}

function createConvertView(container, status, width) {
    container.innerHTML = null;
    if (status) {
        let addLabel = document.createElement("div");
        addLabel.className = "SS_IC_LABEL";
        addLabel.style.width = 1043 + width + "px";
        addLabel.style.height = "30px";
        addLabel.style.lineHeight = "30px";
        addLabel.style.textAlign = "center";
        addLabel.style.borderWidth = "1px";
        addLabel.innerHTML = "+";
        addLabel.onclick = function () {
            createConvertView(container, false, width);
        };
        container.appendChild(addLabel);
    } else {
        let editor = document.createElement("input");
        editor.className = "SS_IC_LABEL";
        editor.style.width = 899 + width + "px";
        editor.style.height = "28px";
        editor.style.lineHeight = "28px";
        editor.style.borderWidth = "1px";
        container.appendChild(editor);
        editor.focus();

        let cancelView = document.createElement("div");
        cancelView.className = "B_B_D";
        cancelView.style.height = "31px";
        cancelView.style.lineHeight = "30px";
        cancelView.innerHTML = "取消";
        cancelView.onclick = function () {
            console.log("cancelView");
            createConvertView(container, true, width);
        };
        container.appendChild(cancelView);

        let publishView = document.createElement("div");
        publishView.className = "B_B_D";
        publishView.style.height = "31px";
        publishView.style.lineHeight = "30px";
        publishView.innerHTML = "发布";
        publishView.onclick = function () {
            console.log("publishView");
            createConvertView(container, true, width);
        };
        container.appendChild(publishView);
    }

}