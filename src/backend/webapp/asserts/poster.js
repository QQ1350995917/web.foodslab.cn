/**
 * Created by dingpengwei on 8/15/16.
 */

function posterInit() {
    var indexUrl = BASE_PATH + "/poster/";
    asyncRequestByGet(indexUrl, function (data) {
        onPosterDataCallback(data);
    }, onRequestError(), onRequestTimeout());
}

function updatePoster(posterId, status, clickable, href, start, end) {
    var indexUrl = BASE_PATH + "/poster/update?posterId=" + posterId + "&status=" + status + "&clickable=" + clickable + "&href=" + href + "&start=" + start + "&end=" + end;
    asyncRequestByGet(indexUrl, function (data) {
        onUpdateDataCallback(data);
    }, onRequestError(), onRequestTimeout());
}

function onPosterDataCallback(data) {
    var result = checkResponseDataFormat(data);
    if (result) {
        var parseData = JSON.parse(data);
        initPosterView(parseData.data);
    }
}

function onUpdateDataCallback(data) {
    var result = checkResponseDataFormat(data);
    if (result) {
        var parseData = JSON.parse(data);
        if (parseData.code == 200) {
            new Toast().show("保存成功");
        } else {
            new Toast().show("保存失败");
        }
    }
}

function initPosterView(poster) {
    // 重置界面
    resetView();
    // 获取根元素对象
    let titleViewContainer = document.getElementById(MAIN_TITLE_ID);
    let contentViewContainer = document.getElementById(MAIN_CONTENT_ID);
    // 添加标题
    let titleView = document.createElement("div");
    titleView.innerHTML = "海报管理";
    titleView.className = "horizontalSelected";
    titleView.style.width = "100%";
    titleViewContainer.appendChild(titleView);

    let posterTitleContainer = document.createElement("div");
    posterTitleContainer.style.width = "100%";
    posterTitleContainer.style.height = "30px";
    let displayView = document.createElement("input");
    displayView.setAttribute("type", "checkbox");
    displayView.className = "formatDisplayCheckBox";
    displayView.style.marginLeft = "10px";
    displayView.style.cursor = "pointer";
    if (poster.status == 0) {
        displayView.checked = false;
    } else if (poster.status == 1) {
        displayView.checked = true;
    }
    posterTitleContainer.appendChild(displayView);

    let displayViewText1 = document.createElement("div");
    displayViewText1.style.float = "left";
    displayViewText1.style.height = "28px";
    displayViewText1.style.lineHeight = "30px";
    displayViewText1.style.fontSize = "14px";
    displayViewText1.innerHTML = "是否显示&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;从";
    posterTitleContainer.appendChild(displayViewText1);

    let startTimeView = document.createElement("input");
    startTimeView.className = "posterItemContainer";
    startTimeView.readOnly = true;
    startTimeView.style.paddingLeft = "10px";
    startTimeView.style.margin = "0px";
    startTimeView.style.width = "245px";
    startTimeView.style.height = "28px";
    startTimeView.style.lineHeight = "30px";
    startTimeView.style.fontSize = "14px";
    startTimeView.style.borderWidth = "1px";
    new Pikaday({
        field: startTimeView,
        firstDay: 1,
        minDate: new Date('2015-01-01'),
        maxDate: new Date('2020-12-31'),
        yearRange: [2015, 2020]
    });
    if (poster.start != undefined) {
        startTimeView.value = poster.start;
    }
    posterTitleContainer.appendChild(startTimeView);

    let displayViewText2 = document.createElement("div");
    displayViewText2.style.float = "left";
    displayViewText2.style.width = "15px";
    displayViewText2.style.height = "28px";
    displayViewText2.style.lineHeight = "30px";
    displayViewText2.style.fontSize = "14px";
    displayViewText2.innerHTML = "到";
    posterTitleContainer.appendChild(displayViewText2);

    let endTimeView = document.createElement("input");
    endTimeView.className = "posterItemContainer";
    endTimeView.readOnly = true;
    endTimeView.style.paddingLeft = "10px";
    endTimeView.style.margin = "0px";
    endTimeView.style.width = "245px";
    endTimeView.style.height = "28px";
    endTimeView.style.lineHeight = "30px";
    endTimeView.style.fontSize = "14px";
    endTimeView.style.borderWidth = "1px";
    new Pikaday({
        field: endTimeView,
        firstDay: 1,
        minDate: new Date('2015-01-01'),
        maxDate: new Date('2020-12-31'),
        yearRange: [2015, 2020]
    });
    if (poster.end != undefined) {
        endTimeView.value = poster.end;
    }
    posterTitleContainer.appendChild(endTimeView);

    let displayViewText3 = document.createElement("div");
    displayViewText3.style.float = "left";
    displayViewText3.style.width = "60px";
    displayViewText3.style.height = "28px";
    displayViewText3.style.lineHeight = "30px";
    displayViewText3.style.fontSize = "14px";
    displayViewText3.innerHTML = "显示海报";
    posterTitleContainer.appendChild(displayViewText3);

    let save = document.createElement("div");
    save.className = "B_B_D";
    save.style.float = "right";
    save.style.marginRight = "15px";
    save.innerHTML = "保存";
    save.onclick = function () {
        if (displayView.checked ? 1 : 0  == poster.status && poster.start == startTimeView.value && poster.end == endTimeView.value) {
            new Toast().show("无需保存");
        } else {
            updatePoster(poster.posterId, displayView.checked ? 1 : 0, 0, "", startTimeView.value, endTimeView.value);
        }
    };
    posterTitleContainer.appendChild(save);

    contentViewContainer.appendChild(posterTitleContainer);
    let postersViewContainer = document.createElement("div");
    postersViewContainer.style.width = "100%";

    let posterSize = poster.children == undefined ? 0 :poster.children.length;
    for (let index = 0; index < posterSize; index++) {
        if (index % 2 == 0) {
            let clear = document.createElement("div");
            clear.className = "clearFloat";
            postersViewContainer.appendChild(clear);
        }
        createPosterItemWidget(postersViewContainer,poster.children[index]);
    }
    createAddNewPosterWidget(postersViewContainer,poster);
    contentViewContainer.appendChild(postersViewContainer);
}

function createPosterItemWidget(container, poster) {
    let posterItemContainer = document.createElement("div");
    posterItemContainer.className = "posterItemContainer";
    let posterItemImg = document.createElement("img");
    posterItemImg.className = "posterSnap";
    posterItemContainer.appendChild(posterItemImg);
    let posterButtonContainer = document.createElement("div");
    posterButtonContainer.className = "posterButtonContainer";
    let display = document.createElement("div");
    display.className = "posterButton";
    display.innerHTML = "显示";
    posterButtonContainer.appendChild(display);
    let displayHL = document.createElement("hr");
    displayHL.className = "posterButtonHL";
    posterButtonContainer.appendChild(displayHL);
    let clickAble = document.createElement("div");
    clickAble.className = "posterButton";
    clickAble.innerHTML = "可点击";
    posterButtonContainer.appendChild(clickAble);
    let clickAbleHL = document.createElement("hr");
    clickAbleHL.className = "posterButtonHL";
    posterButtonContainer.appendChild(clickAbleHL);
    let deletePoster = document.createElement("div");
    deletePoster.className = "posterButton";
    deletePoster.innerHTML = "删除";
    posterButtonContainer.appendChild(deletePoster);
    let deletePosterHL = document.createElement("hr");
    deletePosterHL.className = "posterButtonHL";
    posterButtonContainer.appendChild(deletePosterHL);
    let editor = document.createElement("div");
    editor.className = "posterButton";
    editor.innerHTML = "编辑";
    editor.onclick = function () {
        posterEditor(poster,false);
    };
    posterButtonContainer.appendChild(editor);
    posterItemContainer.appendChild(posterButtonContainer);
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