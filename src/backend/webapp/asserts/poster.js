/**
 * Created by dingpengwei on 8/15/16.
 */
function loadPosterView() {
    let titleView = document.createElement("div");
    titleView.innerHTML = "海报管理";
    getTitleContainer().appendChild(titleView);

    let object = new Object();
    object.cs = getCookie(KEY_CS);
    var url = BASE_PATH + "/poster/mRetrieves?p=" + JSON.stringify(object);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            initPosterView(parseData.data);
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function requestCreatePoster(posterEntity) {
    posterEntity.cs = getCookie(KEY_CS);
    var url = BASE_PATH + "/poster/mCreate?p="  + JSON.stringify(posterEntity);;
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
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


function requestPosterMark(posterEntity) {
    posterEntity.cs = getCookie(KEY_CS);
    var url = BASE_PATH + "/poster/mMark?p="  + JSON.stringify(posterEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
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

function initPosterView(posterEntities) {
    let mainView = getMainContainer();
    let length = posterEntities == undefined ? 0 :posterEntities.length;
    for (let index = 0; index < length; index++) {
        if (index % 2 == 0) {
            let clear = document.createElement("div");
            clear.className = "clearFloat";
            mainView.appendChild(clear);
        }
        createPosterItemWidget(mainView,posterEntities[index]);
    }
    createAddNewPosterWidget(mainView,undefined);
}

function createPosterItemWidget(container, posterEntity) {
    let posterItemContainer = document.createElement("div");
    posterItemContainer.className = "posterItemContainer";

    let posterNameDiv = document.createElement("div");
    posterNameDiv.className = "posterActionBar";
    posterNameDiv.innerHTML = posterEntity.name;
    posterItemContainer.appendChild(posterNameDiv);

    let posterItemImg = document.createElement("img");
    posterItemImg.className = "posterSnap";
    posterItemContainer.appendChild(posterItemImg);

    let posterActionBar = document.createElement("div");
    posterActionBar.className = "posterActionBar";
    let display = document.createElement("div");
    display.className = "posterButton";
    if (posterEntity.status == 2){
        display.innerHTML = "禁止显示";
    } else if (posterEntity.status == 1){
        display.innerHTML = "启用显示";
    }
    display.onclick = function () {
        if (posterEntity.status == 2){
            let requestPosterEntity = new Object();
            requestPosterEntity.posterId = posterEntity.posterId;
            requestPosterEntity.status = 1;
            requestPosterMark(requestPosterEntity);
        } else if (posterEntity.status == 1){
            let requestPosterEntity = new Object();
            requestPosterEntity.posterId = posterEntity.posterId;
            requestPosterEntity.status = 2;
            requestPosterMark(requestPosterEntity);
        }
    }
    posterActionBar.appendChild(display);

    let deletePoster = document.createElement("div");
    deletePoster.className = "posterButton";
    deletePoster.style.marginLeft = "5%";
    deletePoster.style.marginRight = "5%";
    deletePoster.innerHTML = "删除";
    deletePoster.onclick = function () {
        let requestPosterEntity = new Object();
        requestPosterEntity.posterId = posterEntity.posterId;
        requestPosterEntity.status = -1;
        requestPosterMark(requestPosterEntity);
    }
    posterActionBar.appendChild(deletePoster);

    let editor = document.createElement("div");
    editor.className = "posterButton";
    editor.innerHTML = "编辑";
    editor.onclick = function () {
        resetMainContainer();
        loadPosterEditor(posterEntity);
    };
    posterActionBar.appendChild(editor);
    posterItemContainer.appendChild(posterActionBar);
    container.appendChild(posterItemContainer);
}

function createAddNewPosterWidget(container) {
    let posterItemContainer = document.createElement("div");
    posterItemContainer.className = "posterItemContainer";
    posterItemContainer.style.backgroundColor = "#169BD5";
    posterItemContainer.style.color = "#FFFFFF";
    posterItemContainer.style.fontSize = "200px";
    posterItemContainer.style.height = "323px";
    posterItemContainer.style.lineHeight = "323px";
    posterItemContainer.style.cursor = "pointer";
    posterItemContainer.innerHTML = "+";
    posterItemContainer.onclick = function () {
        resetMainContainer();
        loadPosterEditor(undefined);
    };
    container.appendChild(posterItemContainer);
}