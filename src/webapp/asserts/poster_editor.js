/**
 * Created by dingpengwei on 8/15/16.
 */

function posterEditor(poster,isCreate) {
    initPosterEditorView(poster,isCreate);
}

function createPoster(pid, status, clickable, href) {
    var indexUrl = BASE_PATH + "/poster/create?pid=" + pid + "&status=" + status + "&clickable=" + clickable + "&href=" + href;
    asyncRequestByGet(indexUrl, function (data) {
        onCreateDataCallback(data);
    }, onRequestError(), onRequestTimeout());
}

function onCreateDataCallback(data) {
    var result = checkResponsDataFormat(data);
    if (result) {
        var parseData = JSON.parse(data);
        if (parseData.code == 200) {
            new Toast().show("保存成功");
            poster();
        } else {
            new Toast().show("保存失败");
        }
    }
}


function initPosterEditorView(poster, isCreate) {
    // 重置界面
    resetView();
    // 获取根元素对象
    let titleViewContainer = document.getElementById(MAIN_TITLE_ID);
    let contentViewContainer = document.getElementById(MAIN_CONTENT_ID);
    // 添加标题
    let titleView = document.createElement("div");
    titleView.innerHTML = "海报编辑";
    titleView.className = "horizontalSelected";
    titleView.style.width = "100%";
    titleView.style.cursor = "pointer";
    titleViewContainer.appendChild(titleView);
    titleViewContainer.style.cursor = "pointer";
    titleViewContainer.onclick = function () {
        poster();
        titleViewContainer.onclick = null;
        titleViewContainer.style.cursor = "default";
    };

    let imgViewContainer = document.createElement("div");
    imgViewContainer.className = "editorBlockView";
    imgViewContainer.style.height = "440px";
    imgViewContainer.style.borderWidth = "1px";
    imgViewContainer.style.cursor = "pointer";
    contentViewContainer.appendChild(imgViewContainer);
    let displayViewContainer = document.createElement("div");
    displayViewContainer.className = "editorBlockView";
    let displayView = document.createElement("input");
    displayView.setAttribute("type", "checkbox");
    displayView.className = "formatDisplayCheckBox";
    if (!isCreate){
        if (poster.status == 0) {
            displayView.checked = false;
        } else if (poster.status == 1) {
            displayView.checked = true;
        }
    }
    displayViewContainer.appendChild(displayView);
    let displayViewText = document.createElement("div");
    displayViewText.style.float = "left";
    displayViewText.style.height = "28px";
    displayViewText.style.lineHeight = "28px";
    displayViewText.style.fontSize = "14px";
    displayViewText.innerHTML = "是否显示";
    displayViewContainer.appendChild(displayViewText);
    contentViewContainer.appendChild(displayViewContainer);
    let linkedViewContainer = document.createElement("div");
    linkedViewContainer.className = "editorBlockView";
    let linkedView = document.createElement("input");
    linkedView.setAttribute("type", "checkbox");
    linkedView.className = "formatDisplayCheckBox";
    if (!isCreate){
        if (poster.status == 0) {
            linkedView.checked = false;
        } else if (poster.status == 1) {
            linkedView.checked = true;
        }
    }
    linkedViewContainer.appendChild(linkedView);
    let linkedViewText = document.createElement("div");
    linkedViewText.style.float = "left";
    linkedViewText.style.height = "28px";
    linkedViewText.style.lineHeight = "28px";
    linkedViewText.style.fontSize = "14px";
    linkedViewText.innerHTML = "是否可点击";
    linkedViewContainer.appendChild(linkedViewText);
    contentViewContainer.appendChild(linkedViewContainer);

    let linkedHrefText = document.createElement("div");
    linkedHrefText.style.float = "left";
    linkedHrefText.style.height = "28px";
    linkedHrefText.style.lineHeight = "28px";
    linkedHrefText.style.fontSize = "14px";
    linkedHrefText.style.marginLeft = "20px";
    linkedHrefText.innerHTML = "链接地址";
    linkedViewContainer.appendChild(linkedHrefText);
    let linkedEditor = document.createElement("input");
    linkedEditor.className = "SS_IC_LABEL";
    linkedEditor.style.width = "886px";
    linkedEditor.style.height = "28px";
    linkedEditor.style.borderLeftWidth = "1px";
    linkedEditor.style.marginLeft = "10px";
    if (!isCreate){
        linkedEditor.value = poster.href;
    }
    linkedViewContainer.appendChild(linkedEditor);
    contentViewContainer.appendChild(linkedViewContainer);

    let buttonViewContainer = document.createElement("div");
    buttonViewContainer.className = "editorBlockView";
    buttonViewContainer.style.marginTop = "15px";
    let cancelView = document.createElement("div");
    cancelView.className = "B_B_D";
    cancelView.style.marginLeft = "0px";
    cancelView.style.width = "532px";
    cancelView.innerHTML = "取消";
    cancelView.onclick = function () {
        posterInit();
        titleViewContainer.onclick = null;
        titleViewContainer.style.cursor = "default";
    };
    buttonViewContainer.appendChild(cancelView);
    let separateHL = document.createElement("hr");
    separateHL.className = "posterButtonHL";
    buttonViewContainer.appendChild(separateHL);
    let commitView = document.createElement("div");
    commitView.className = "B_B_D";
    commitView.style.marginLeft = "0px";
    commitView.style.width = "532px";
    if (isCreate) {
        commitView.innerHTML = "提交";
        commitView.onclick = function () {
            createPoster(poster.posterId, displayView.checked ? 1:0,linkedView.checked ? 1:0,linkedEditor.value)
        };
    } else {
        commitView.innerHTML = "保存";
        commitView.onclick = function () {
            updatePoster(poster.posterId, displayView.checked ? 1 : 0, linkedView.checked ? 1:0, linkedEditor.value);
        };
    }
    buttonViewContainer.appendChild(commitView);
    contentViewContainer.appendChild(buttonViewContainer);
}