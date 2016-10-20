/**
 * Created by dingpengwei on 8/15/16.
 */
function loadPosterView() {
    let titleView = document.createElement("div");
    titleView.innerHTML = "海报管理";
    getTitleContainer().appendChild(titleView);

    var indexUrl = BASE_PATH + "/poster/mRetrieves";
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            initPosterView(parseData.data);
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function requestCreatePoster(posterEntity) {
    var indexUrl = BASE_PATH + "/poster/mCreate?p="  + JSON.stringify(posterEntity);;
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                new Toast().show("保存成功");
                resetMainContainer();
                loadPosterView();
            } else {
                new Toast().show("保存失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function requestUpdatePoster(posterEntity) {
    var indexUrl = BASE_PATH + "/poster/mUpdate?p="  + JSON.stringify(posterEntity);;
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                new Toast().show("保存成功");
                resetMainContainer();
                loadPosterView();
            } else {
                new Toast().show("保存失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function requestUpdatePosterStatus(posterEntity) {
    var indexUrl = BASE_PATH + "/poster/mMark?p="  + JSON.stringify(posterEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
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
    createAddNewPosterWidget(mainView,posterEntities);
}

function createPosterItemWidget(container, posterEntity) {
    let posterItemContainer = document.createElement("div");
    posterItemContainer.className = "posterItemContainer";
    let posterItemImg = document.createElement("img");
    posterItemImg.className = "posterSnap";
    posterItemContainer.appendChild(posterItemImg);
    let posterActionBar = document.createElement("div");
    posterActionBar.className = "posterButtonContainer";
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
            requestUpdatePosterStatus(requestPosterEntity);
        } else if (posterEntity.status == 1){
            let requestPosterEntity = new Object();
            requestPosterEntity.posterId = posterEntity.posterId;
            requestPosterEntity.status = 2;
            requestUpdatePosterStatus(requestPosterEntity);
        }
    }
    posterActionBar.appendChild(display);
    let displayHL = document.createElement("hr");
    displayHL.className = "posterButtonHL";
    posterActionBar.appendChild(displayHL);
    let clickAble = document.createElement("div");
    clickAble.className = "posterButton";
    if (posterEntity.clickable == 2){
        clickAble.innerHTML = "禁用点击";
    } else if (posterEntity.clickable == 1){
        clickAble.innerHTML = "启用点击";
    }
    clickAble.onclick = function () {
        let requestPosterEntity = new Object();
        requestPosterEntity.posterId = posterEntity.posterId;
        requestPosterEntity.href = posterEntity.href;
        requestPosterEntity.fileId = posterEntity.fileId;
        requestPosterEntity.start = posterEntity.start;
        requestPosterEntity.end = posterEntity.end;
        requestPosterEntity.status = posterEntity.status;
        if (posterEntity.clickable == 2){
            requestPosterEntity.clickable = 1;
        } else if (posterEntity.clickable == 1){
            requestPosterEntity.clickable = 2;
        }
        requestUpdatePoster(requestPosterEntity);
    }
    posterActionBar.appendChild(clickAble);
    let clickAbleHL = document.createElement("hr");
    clickAbleHL.className = "posterButtonHL";
    posterActionBar.appendChild(clickAbleHL);
    let deletePoster = document.createElement("div");
    deletePoster.className = "posterButton";
    deletePoster.innerHTML = "删除";
    deletePoster.onclick = function () {
        let requestPosterEntity = new Object();
        requestPosterEntity.posterId = posterEntity.posterId;
        requestPosterEntity.status = -1;
        requestUpdatePosterStatus(requestPosterEntity);
    }
    posterActionBar.appendChild(deletePoster);
    let deletePosterHL = document.createElement("hr");
    deletePosterHL.className = "posterButtonHL";
    posterActionBar.appendChild(deletePosterHL);
    let editor = document.createElement("div");
    editor.className = "posterButton";
    editor.innerHTML = "编辑";
    editor.onclick = function () {
        resetMainContainer();
        loadPosterEditor(posterEntity,false);
    };
    posterActionBar.appendChild(editor);
    posterItemContainer.appendChild(posterActionBar);
    container.appendChild(posterItemContainer);
}

function createAddNewPosterWidget(container,poster) {
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
        posterEditor(poster,true);
    };
    container.appendChild(posterItemContainer);
}