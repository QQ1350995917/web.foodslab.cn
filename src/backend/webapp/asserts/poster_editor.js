/**
 * Created by dingpengwei on 8/15/16.
 */

function loadPosterEditor(posterEntity) {
    let titleView = document.createElement("div");
    titleView.innerHTML = "海报编辑";
    titleView.style.cursor = "pointer";
    getTitleContainer().appendChild(titleView);
    initPosterEditorView(posterEntity);
}

function initPosterEditorView(posterEntity) {
    let imgViewContainer = document.createElement("div");
    imgViewContainer.className = "editorBlockView";
    imgViewContainer.style.height = "440px";
    imgViewContainer.style.borderWidth = "1px";
    imgViewContainer.style.cursor = "pointer";
    getMainContainer().appendChild(imgViewContainer);

    let posterNameContainer = document.createElement("div");
    posterNameContainer.className = "editorBlockView";
    let posterNameLabelDiv = document.createElement("div");
    posterNameLabelDiv.className = "editorBlockView";
    posterNameLabelDiv.style.width = "7%";
    posterNameLabelDiv.style.float = "left";
    posterNameLabelDiv.innerHTML = "海报名称:";
    posterNameContainer.appendChild(posterNameLabelDiv);

    let posterNameInput = document.createElement("input");
    posterNameInput.className = "SS_IC_LABEL";
    posterNameInput.style.width = "92%";
    posterNameInput.style.height = "28px";
    posterNameInput.style.borderLeftWidth = "1px";

    posterNameContainer.appendChild(posterNameInput);

    getMainContainer().appendChild(posterNameContainer);

    let posterClickerContainer = document.createElement("div");
    posterClickerContainer.className = "editorBlockView";
    let posterHrefLabelDiv = document.createElement("div");
    posterHrefLabelDiv.className = "editorBlockView";
    posterHrefLabelDiv.style.width = "7%";
    posterHrefLabelDiv.style.float = "left";
    posterHrefLabelDiv.innerHTML = "链接地址:";
    posterClickerContainer.appendChild(posterHrefLabelDiv);

    let posterHrefInput = document.createElement("input");
    posterHrefInput.className = "SS_IC_LABEL";
    posterHrefInput.style.width = "82%";
    posterHrefInput.style.height = "28px";
    posterHrefInput.style.borderLeftWidth = "1px";
    posterClickerContainer.appendChild(posterHrefInput);

    let posterClickableLabelDiv = document.createElement("div");
    posterClickableLabelDiv.style.float = "left";
    posterClickableLabelDiv.style.marginLeft = "20px";
    posterClickableLabelDiv.style.height = "28px";
    posterClickableLabelDiv.style.lineHeight = "28px";
    posterClickableLabelDiv.style.fontSize = "14px";
    posterClickableLabelDiv.innerHTML = "是否可点击";
    posterClickerContainer.appendChild(posterClickableLabelDiv);

    let posterClickableInput = document.createElement("input");
    posterClickableInput.setAttribute("type", "checkbox");
    posterClickableInput.className = "formatDisplayCheckBox";
    posterClickerContainer.appendChild(posterClickableInput);
    getMainContainer().appendChild(posterClickerContainer);

    let posterActionBar = document.createElement("div");
    posterActionBar.className = "posterActionBar";
    posterActionBar.style.marginTop = "15px";
    let posterCancelDiv = document.createElement("div");
    posterCancelDiv.className = "posterButton";
    posterCancelDiv.innerHTML = "取消";
    posterCancelDiv.style.width = "49%";
    posterCancelDiv.style.marginRight = "1%";
    let commitView = document.createElement("div");
    commitView.className = "posterButton";
    commitView.innerHTML = "提交";
    commitView.style.width = "49%";
    commitView.style.marginLeft = "1%";
    posterActionBar.appendChild(posterCancelDiv);
    posterActionBar.appendChild(commitView);


    posterCancelDiv.onclick = function () {
        resetMainContainer();
        loadPosterView();
    };

    if (posterEntity == undefined) {
        commitView.innerHTML = "提交";
        commitView.onclick = function () {
            let requestPosterEntity = new Object();
            requestPosterEntity.name = posterNameInput.value;
            requestPosterEntity.href = posterHrefInput.value;
            requestPosterEntity.clickable = posterClickableInput.checked ? 2 : 1;
            requestCreatePoster(requestPosterEntity);
        };
    } else {
        posterNameInput.value = posterEntity.name;
        posterHrefInput.value = posterEntity.href;
        if (posterEntity.clickable == 1) {
            posterClickableInput.checked = false;
        } else if (posterEntity.clickable == 2) {
            posterClickableInput.checked = true;
        }
        commitView.innerHTML = "保存";
        commitView.onclick = function () {
            let requestPosterEntity = new Object();
            requestPosterEntity.posterId = posterEntity.posterId;
            requestPosterEntity.name = posterNameInput.value;
            requestPosterEntity.href = posterHrefInput.value;
            requestPosterEntity.clickable = posterClickableInput.checked ? 2 : 1;
            requestUpdatePoster(requestPosterEntity);
        };
    }

    getMainContainer().appendChild(posterActionBar);
}

function requestUpdatePoster(posterEntity) {
    posterEntity.cs = getCookie(KEY_CS);
    var url = BASE_PATH + "/poster/mUpdate?p="  + JSON.stringify(posterEntity);;
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        console.log(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RC_SUCCESS) {
                new Toast().show("保存成功");
                resetMainContainer();
                loadPosterView();
            } else {
                new Toast().show("保存失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}