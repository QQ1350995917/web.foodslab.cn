/**
 * Created by dingpengwei on 8/13/16.
 */
/**
 * 请求link数据
 */
function loadLinkView() {
    let titleView = document.createElement("div");
    titleView.innerHTML = "链接管理";
    getTitleContainer().appendChild(titleView);

    let linkEntity = new Object();
    linkEntity.cs = getCookie(KEY_CS);
    let indexUrl = BASE_PATH + "/link/mRetrieves?p=" + JSON.stringify(linkEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            onRequestTopLinkCallback(parseData.data);
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function onRequestTopLinkCallback(linkEntities) {
    let mainView = getMainContainer();
    let length = linkEntities == undefined ? 0 : linkEntities.length;
    for (let i = 0; i <= length; i++) {
        if (i % 4 == 0) {
            let clearFloat = document.createElement("div");
            clearFloat.className = "clearFloat";
            mainView.appendChild(clearFloat);
        }

        let linkEntityContainer = document.createElement("div");
        linkEntityContainer.className = "productItemContainer";
        let linkEntitySubContainer = document.createElement("div");
        linkEntitySubContainer.className = "productItemSubContainer";
        let linkEntity = undefined;
        if (i < length) {
            linkEntity = linkEntities[i];
            if (linkEntity.status == 1) {
                linkEntitySubContainer.style.borderColor = "#FF0000";
            }
        }
        attachLinkGridViewToContainer(linkEntitySubContainer, linkEntity);
        linkEntityContainer.appendChild(linkEntitySubContainer);
        mainView.appendChild(linkEntityContainer);
    }
}

function initSubLinkView(linkEntity) {
    let titleView = document.createElement("div");
    titleView.innerHTML = "链接管理 >> " + linkEntity.label;
    titleView.style.cursor = "pointer";
    titleView.onclick = function () {
        resetMainContainer();
        loadLinkView();
    }
    getTitleContainer().appendChild(titleView);

    requestSubLink(linkEntity);
}

function requestSubLink(pLinkEntity) {
    pLinkEntity.cs = getCookie(KEY_CS);
    getMainContainer().innerHTML = null;
    let url = BASE_PATH + "/link/mRetrieves?p=" + JSON.stringify(pLinkEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            onRequestSubLinkCallback(pLinkEntity.linkId, parseData.data);
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function onRequestSubLinkCallback(pid, linkEntities) {
    let length = linkEntities == undefined ? 0 : linkEntities.length;
    for (let index = 0; index <= length; index++) {
        if (index <= length) {
            let subLinkEntity = undefined;
            if (index < length) {
                subLinkEntity = linkEntities[index];
            }
            let recommendItemRootViewContainer = document.createElement("div");
            recommendItemRootViewContainer.className = "SS_IC";
            recommendItemRootViewContainer.style.height = "40px";
            recommendItemRootViewContainer.style.width = "100%";
            onAttachSubLinkEntityView(recommendItemRootViewContainer, pid, subLinkEntity, false);
            getMainContainer().appendChild(recommendItemRootViewContainer);
        }
    }
}


function attachLinkGridViewToContainer(container, linkEntity) {
    container.innerHTML = null;
    if (linkEntity != undefined) {
        let seriesLabelInput = document.createElement("input");
        seriesLabelInput.className = "labelNameEditor";
        seriesLabelInput.readOnly = true;
        seriesLabelInput.value = linkEntity.label;
        container.appendChild(seriesLabelInput);
        seriesLabelInput.onclick = function () {
            convertTopLinkContainerToEditor(container, linkEntity);
        }
    } else {
        let addLabel = document.createElement("div");
        addLabel.innerHTML = "+";
        addLabel.style.fontSize = "150px";
        addLabel.style.cursor = "pointer";
        container.appendChild(addLabel);
    }
    container.onclick = function () {
        if (linkEntity != undefined) {
            resetMainContainer();
            initSubLinkView(linkEntity)
        } else {
            convertTopLinkContainerToEditor(container, linkEntity);
        }
    }
    container.style.cursor = "pointer";
}

function convertTopLinkContainerToEditor(linkContainer, linkEntity) {
    linkContainer.innerHTML = null;
    linkContainer.onclick = null;
    linkContainer.ondblclick = null;
    linkContainer.style.cursor = "default";
    let linkLabelInput = document.createElement("input");
    linkLabelInput.className = "labelNameEditor";
    linkLabelInput.style.cursor = "text";
    linkContainer.appendChild(linkLabelInput);
    let linkEditorActionBar = document.createElement("div");
    linkEditorActionBar.className = "actionBar";
    linkContainer.appendChild(linkEditorActionBar);
    if (linkEntity == undefined) {
        //添加新系列
        linkLabelInput.placeholder = "请输入链接分类";
        linkLabelInput.focus();

        let cancelAction = document.createElement("div");
        cancelAction.className = "actionButton";
        cancelAction.style.width = "48%";
        cancelAction.innerHTML = "取消";
        linkEditorActionBar.appendChild(cancelAction);

        let saveAction = document.createElement("div");
        saveAction.className = "actionButton";
        saveAction.style.width = "48%";
        saveAction.innerHTML = "保存";
        linkEditorActionBar.appendChild(saveAction);

        cancelAction.onclick = function () {
            window.event.cancelBubble = true;
            attachLinkGridViewToContainer(linkContainer, linkEntity);
        }

        saveAction.onclick = function () {
            let label = linkLabelInput.value;
            if (label == undefined || label == null || label == "") {
                new Toast().show("名称不能为空");
            } else {
                let requestLinkEntity = new Object();
                requestLinkEntity.label = label;
                requestCreateLink(requestLinkEntity);
            }
        }

    } else {
        //编辑旧系列
        linkLabelInput.value = linkEntity.label;
        linkLabelInput.focus();
        let backAction = document.createElement("div");
        backAction.className = "actionButton";
        backAction.innerHTML = "返回";
        linkEditorActionBar.appendChild(backAction);

        let saveAction = document.createElement("div");
        saveAction.className = "actionButton";
        saveAction.innerHTML = "保存";
        linkEditorActionBar.appendChild(saveAction);

        let blockAction = document.createElement("div");
        blockAction.className = "actionButton";
        if (linkEntity.status == 1) {
            blockAction.innerHTML = "启用";
        } else if (linkEntity.status == 2) {
            blockAction.innerHTML = "禁用";
        }
        linkEditorActionBar.appendChild(blockAction);
        let deleteAction = document.createElement("div");
        deleteAction.className = "actionButton";
        deleteAction.innerHTML = "删除";
        linkEditorActionBar.appendChild(deleteAction);

        backAction.onclick = function () {
            window.event.cancelBubble = true;
            attachLinkGridViewToContainer(linkContainer, linkEntity);
        }

        saveAction.onclick = function () {
            let label = linkLabelInput.value;
            if (label == undefined || label == null || label == "") {
                new Toast().show("名称不能为空");
            } else if (label == linkEntity.label) {
                new Toast().show("名称没有变化,无需更改");
            } else {
                let requestLinkEntity = new Object();
                requestLinkEntity.sessionId = "admin";
                requestLinkEntity.linkId = linkEntity.linkId;
                requestLinkEntity.pid = linkEntity.pid;
                requestLinkEntity.label = label;
                requestUpdateLink(requestLinkEntity);
            }
        }

        blockAction.onclick = function () {
            window.event.cancelBubble = true;
            let requestLinkEntity = new Object();
            requestLinkEntity.linkId = linkEntity.linkId;
            requestLinkEntity.pid = linkEntity.pid;
            if (linkEntity.status == 1) {
                requestLinkEntity.status = 2;
            } else if (linkEntity.status == 2) {
                requestLinkEntity.status = 1;
            }
            requestMarkLink(requestLinkEntity);
        }

        deleteAction.onclick = function () {
            window.event.cancelBubble = true;
            let requestLinkEntity = new Object();
            requestLinkEntity.linkId = linkEntity.linkId;
            requestLinkEntity.pid = linkEntity.pid;
            requestLinkEntity.status = -1;
            requestMarkLink(requestLinkEntity, requestLinkEntity);
        }
    }
}


/**
 * 请求创建link数据
 */
function requestCreateLink(linkEntity) {
    linkEntity.cs = getCookie(KEY_CS);
    let url = BASE_PATH + "/link/mCreate?p=" + JSON.stringify(linkEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RC_SUCCESS) {
                new Toast().show("创建成功");
                if (linkEntity.pid == undefined) {
                    resetMainContainer();
                    loadLinkView();
                } else {
                    let requestLinkEntity = new Object();
                    requestLinkEntity.linkId = linkEntity.pid;
                    requestLinkEntity.pid = linkEntity.pid;
                    requestSubLink(requestLinkEntity);
                }
            } else {
                new Toast().show("创建失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function requestMarkLink(linkEntity) {
    linkEntity.cs = getCookie(KEY_CS);
    let url = BASE_PATH + "/link/mMark?p=" + JSON.stringify(linkEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RC_SUCCESS) {
                new Toast().show("操作成功");
                if (linkEntity.linkId == linkEntity.pid) {
                    resetMainContainer();
                    loadLinkView();
                } else {
                    let requestLinkEntity = new Object();
                    requestLinkEntity.linkId = linkEntity.pid;
                    requestLinkEntity.pid = linkEntity.pid;
                    requestSubLink(requestLinkEntity);
                }
            } else {
                new Toast().show("操作失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());

}

function requestUpdateLink(linkEntity) {
    linkEntity.cs = getCookie(KEY_CS);
    let url = BASE_PATH + "/link/mUpdate?p=" + JSON.stringify(linkEntity);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RC_SUCCESS) {
                new Toast().show("操作成功");
                if (linkEntity.linkId == linkEntity.pid) {
                    resetMainContainer();
                    loadLinkView();
                } else {
                    let requestLinkEntity = new Object();
                    requestLinkEntity.linkId = linkEntity.pid;
                    requestLinkEntity.pid = linkEntity.pid;
                    requestSubLink(requestLinkEntity);
                }
            } else {
                new Toast().show("操作失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function requestSwapSubLinkWeight(linkEntity) {
    linkEntity.cs = getCookie(KEY_CS);
    let url = BASE_PATH + "/link/mSwap?p=" + JSON.stringify(linkEntity);
    console.log(url);
    asyncRequestByGet(url, function (data) {
        console.log(data);
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RC_SUCCESS) {
                new Toast().show("操作成功");
                let requestLinkEntity = new Object();
                requestLinkEntity.linkId = linkEntity.pid;
                requestLinkEntity.pid = linkEntity.pid;
                requestSubLink(requestLinkEntity);
            } else {
                new Toast().show("操作失败");
            }
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function onAttachSubLinkEntityView(containerView, pid, linkEntity, viewEditorStatus) {
    containerView.innerHTML = null;
    if (linkEntity == undefined) {
        /**
         * 新建链接的编辑状态
         */
        if (viewEditorStatus) {
            let line_H_level1 = document.createElement("hr");
            line_H_level1.className = "SS_IC_HL";
            line_H_level1.style.marginTop = "20px";
            containerView.appendChild(line_H_level1);

            let addLabel = document.createElement("input");
            addLabel.className = "SS_IC_LABEL";
            addLabel.style.width = "78px";
            addLabel.style.height = "30px";
            addLabel.style.marginTop = "5px";
            addLabel.style.borderLeftWidth = "1px";
            containerView.appendChild(addLabel);
            addLabel.focus();
            // 连接线横线
            let line_H_level2 = document.createElement("hr");
            line_H_level2.className = "SS_IC_HL";
            line_H_level2.style.marginTop = "20px";
            containerView.appendChild(line_H_level2);

            let addHref = document.createElement("input");
            addHref.className = "SS_IC_LABEL";
            addHref.style.height = "30px";
            addHref.style.marginTop = "5px";
            addHref.style.borderLeftWidth = "1px";
            addHref.style.width = "710px";
            containerView.appendChild(addHref);

            // 连接线横线
            let line_H_level3 = document.createElement("hr");
            line_H_level3.className = "SS_IC_HL";
            line_H_level3.style.marginTop = "20px";
            containerView.appendChild(line_H_level3);

            let cancel = document.createElement("div");
            cancel.className = "B_B_D";
            cancel.style.marginTop = "5px";
            cancel.style.height = "33px";
            cancel.style.width = "93px";
            cancel.style.marginLeft = "0px";
            cancel.innerHTML = "取消";
            containerView.appendChild(cancel);
            cancel.onclick = function () {
                onAttachSubLinkEntityView(containerView, pid, undefined, false);
            }
            // 连接线横线
            let line_H_level4 = document.createElement("hr");
            line_H_level4.className = "SS_IC_HL";
            line_H_level4.style.marginTop = "20px";
            containerView.appendChild(line_H_level4);

            let save = document.createElement("div");
            save.className = "B_B_D";
            save.style.marginTop = "5px";
            save.style.height = "33px";
            save.style.width = "92px";
            save.style.marginLeft = "0px";
            save.innerHTML = "保存";
            containerView.appendChild(save);
            save.onclick = function () {
                let label = addLabel.value;
                let href = addHref.value;
                if (label == "" || label == undefined || label == null || href == "" || href == undefined || href == null) {
                    new Toast().show("名称和链接不能为空");
                } else {
                    let requestLinkEntity = new Object();
                    requestLinkEntity.pid = pid;
                    requestLinkEntity.label = label;
                    requestLinkEntity.href = href;
                    requestCreateLink(requestLinkEntity);
                }
            }
        } else {
            /**
             * 新建链接的正常状态
             */
            // 连接线横线
            let line_H_level1 = document.createElement("hr");
            line_H_level1.className = "SS_IC_HL";
            line_H_level1.style.marginTop = "20px";
            containerView.appendChild(line_H_level1);
            // 显示添加新链接容器对象
            let addNewLink = document.createElement("div");
            addNewLink.className = "SS_IC_LABEL";
            addNewLink.style.borderLeftWidth = "1px";
            addNewLink.innerHTML = "+";
            addNewLink.style.width = "97.6%";
            addNewLink.onclick = function () {
                onAttachSubLinkEntityView(containerView, pid, undefined, true);
            }
            containerView.appendChild(addNewLink);
        }
    } else {
        if (viewEditorStatus) {
            /**
             * 修改链接的编辑状态
             */
            // 连接线横线
            let line_H_level1 = document.createElement("hr");
            line_H_level1.className = "SS_IC_HL";
            line_H_level1.style.marginTop = "15px";
            containerView.appendChild(line_H_level1);

            let addLabel = document.createElement("input");
            addLabel.className = "SS_IC_LABEL";
            addLabel.style.width = "78px";
            addLabel.style.height = "30px";
            addLabel.style.borderLeftWidth = "1px";
            addLabel.value = linkEntity.label;
            containerView.appendChild(addLabel);
            addLabel.focus();
            // 连接线横线
            let line_H_level2 = document.createElement("hr");
            line_H_level2.className = "SS_IC_HL";
            line_H_level2.style.marginTop = "15px";
            containerView.appendChild(line_H_level2);

            let addHref = document.createElement("input");
            addHref.className = "SS_IC_LABEL";
            addHref.style.height = "30px";
            addHref.style.borderLeftWidth = "1px";
            addHref.style.width = "710px";
            addHref.value = linkEntity.href;
            containerView.appendChild(addHref);

            // 连接线横线
            let line_H_level3 = document.createElement("hr");
            line_H_level3.className = "SS_IC_HL";
            line_H_level3.style.marginTop = "15px";
            containerView.appendChild(line_H_level3);

            let cancel = document.createElement("div");
            cancel.className = "B_B_D";
            cancel.style.height = "33px";
            cancel.style.width = "93px";
            cancel.style.marginLeft = "0px";
            cancel.innerHTML = "取消";
            containerView.appendChild(cancel);
            cancel.onclick = function () {
                onAttachSubLinkEntityView(containerView, pid, linkEntity, false);
            }
            // 连接线横线
            let line_H_level4 = document.createElement("hr");
            line_H_level4.className = "SS_IC_HL";
            line_H_level4.style.marginTop = "15px";
            containerView.appendChild(line_H_level4);

            let save = document.createElement("div");
            save.className = "B_B_D";
            save.style.height = "33px";
            save.style.width = "93px";
            save.style.marginLeft = "0px";
            save.innerHTML = "保存";
            containerView.appendChild(save);
            save.onclick = function () {
                let label = addLabel.value;
                let href = addHref.value;
                if (label == "" || label == undefined || label == null || href == "" || href == undefined || href == null) {
                    new Toast().show("名称和链接不能为空");
                } else {
                    let requestLinkEntity = new Object();
                    requestLinkEntity.pid = linkEntity.pid;
                    requestLinkEntity.linkId = linkEntity.linkId;
                    requestLinkEntity.label = label;
                    requestLinkEntity.href = href;
                    requestUpdateLink(requestLinkEntity);
                }
            }
        } else {
            /**
             * 修改链接的正常状态
             */
            let recommendItemRootView = document.createElement("div");
            recommendItemRootView.className = "SS_IC";
            recommendItemRootView.style.height = "32px";
            recommendItemRootView.style.width = "100%";
            recommendItemRootView.style.borderWidth = "0px";

            //系列连接线横线
            let line_H_level11 = document.createElement("hr");
            line_H_level11.className = "SS_IC_HL";
            recommendItemRootView.appendChild(line_H_level11);

            // 显示系列名称的容器对象
            let seriesLabel = document.createElement("div");
            seriesLabel.className = "SS_IC_LABEL";
            seriesLabel.style.borderLeftWidth = "1px";
            seriesLabel.style.cursor = "move";
            seriesLabel.innerHTML = linkEntity.label;
            if (linkEntity.status == 1) {
                seriesLabel.style.borderColor = "red";
            }
            recommendItemRootView.appendChild(seriesLabel);

            //系列连接线横线
            let line_H_level13 = document.createElement("hr");
            line_H_level13.className = "SS_IC_HL";
            recommendItemRootView.appendChild(line_H_level13);

            // 显示规格名称的容器对象
            let formatLabel = document.createElement("div");
            formatLabel.className = "SS_IC_LABEL";
            formatLabel.style.borderLeftWidth = "1px";
            formatLabel.style.width = "67%";
            formatLabel.style.cursor = "move";
            formatLabel.innerHTML = linkEntity.href;
            if (linkEntity.status == 1) {
                formatLabel.style.borderColor = "red";
            }
            recommendItemRootView.appendChild(formatLabel);

            //系列连接线横线
            let line_H_level14 = document.createElement("hr");
            line_H_level14.className = "SS_IC_HL";
            recommendItemRootView.appendChild(line_H_level14);
            // 显示规格名称的容器对象
            let actionEditor = document.createElement("div");
            actionEditor.className = "SS_IC_LABEL";
            actionEditor.style.borderLeftWidth = "1px";
            actionEditor.style.width = "5%";
            actionEditor.style.cursor = "pointer";
            actionEditor.innerHTML = "编辑";
            if (linkEntity.status == 1) {
                actionEditor.style.borderColor = "red";
            }
            recommendItemRootView.appendChild(actionEditor);
            actionEditor.onclick = function () {
                onAttachSubLinkEntityView(containerView, pid, linkEntity, true);
            }

            //系列连接线横线
            let line_H_level15 = document.createElement("hr");
            line_H_level15.className = "SS_IC_HL";
            recommendItemRootView.appendChild(line_H_level15);
            // 显示规格名称的容器对象
            let actionBlock = document.createElement("div");
            actionBlock.className = "SS_IC_LABEL";
            actionBlock.style.borderLeftWidth = "1px";
            actionBlock.style.width = "5%";
            actionBlock.style.cursor = "pointer";

            if (linkEntity.status == 1) {
                actionBlock.innerHTML = "启用";
                actionBlock.style.borderColor = "red";
            } else if (linkEntity.status == 2) {
                actionBlock.innerHTML = "禁用";
            }

            actionBlock.onclick = function () {
                let requestLinkEntity = new Object();
                requestLinkEntity.linkId = linkEntity.linkId;
                requestLinkEntity.pid = linkEntity.pid;
                if (linkEntity.status == 1) {
                    requestLinkEntity.status = 2;
                } else if (linkEntity.status = 2) {
                    requestLinkEntity.status = 1;
                }
                requestMarkLink(requestLinkEntity);
            }
            recommendItemRootView.appendChild(actionBlock);

            //系列连接线横线
            let line_H_level16 = document.createElement("hr");
            line_H_level16.className = "SS_IC_HL";
            recommendItemRootView.appendChild(line_H_level16);
            // 显示规格名称的容器对象
            let actionDelete = document.createElement("div");
            actionDelete.className = "SS_IC_LABEL";
            actionDelete.style.borderLeftWidth = "1px";
            actionDelete.style.width = "5%";
            actionDelete.style.cursor = "pointer";
            actionDelete.innerHTML = "删除";
            if (linkEntity.status == 1) {
                actionDelete.style.borderColor = "red";
            }
            actionDelete.onclick = function () {
                let requestLinkEntity = new Object();
                requestLinkEntity.linkId = linkEntity.linkId;
                requestLinkEntity.pid = linkEntity.pid;
                requestLinkEntity.status = -1;
                requestMarkLink(requestLinkEntity);
            }
            recommendItemRootView.appendChild(actionDelete);

            recommendItemRootView.id = linkEntity.linkId;
            recommendItemRootView.pid = linkEntity.pid;
            recommendItemRootView.weight = linkEntity.weight;
            recommendItemRootView.draggable = "true";
            recommendItemRootView.style.cursor = "move";
            recommendItemRootView.addEventListener("dragstart", onLinkDragStart);
            recommendItemRootView.addEventListener("dragover", onLinkDragOver);
            recommendItemRootView.addEventListener("drop", onLinkDrop);
            recommendItemRootView.addEventListener("dragend", onLinkDragEnd);

            containerView.appendChild(recommendItemRootView);
        }
    }
}

function onLinkDragStart(event) {
    event.dataTransfer.setData("linkId", event.target.id);
    event.dataTransfer.setData("pid", event.target.pid);
    event.dataTransfer.setData("weight", event.target.weight);
}

function onLinkDragOver(event) {
    event.preventDefault();
}

function onLinkDrop(event) {
    event.preventDefault();
    let sourceLinkId = event.dataTransfer.getData("linkId");
    let sourceLinkPid = event.dataTransfer.getData("pid");
    let sourceWeight = event.dataTransfer.getData("weight");
    let targetLinkId = (event.target.id == "" || event.target.id == undefined) ? event.target.parentNode.id : event.target.id;
    let targetWeight = (event.target.weight == "" || event.target.weight == undefined) ? event.target.parentNode.weight : event.target.weight;
    let targetIdElement = document.getElementById(targetLinkId);
    let sourceIdElement = document.getElementById(sourceLinkId);
    let tempInnerHtml = targetIdElement.innerHTML;
    targetIdElement.innerHTML = sourceIdElement.innerHTML;
    sourceIdElement.innerHTML = tempInnerHtml;

    event.dataTransfer.setData("sourceLinkId", sourceLinkId);
    event.dataTransfer.setData("sourceWeight", sourceWeight);

    event.dataTransfer.setData("targetLinkId", targetLinkId);
    event.dataTransfer.setData("targetWeight", targetWeight);

    let requestLinkEntity = new Object();
    requestLinkEntity.pid = sourceLinkPid;
    requestLinkEntity.linkId1 = sourceLinkId;
    requestLinkEntity.weight1 = sourceWeight;
    requestLinkEntity.linkId2 = targetLinkId;
    requestLinkEntity.weight2 = targetWeight;
    requestSwapSubLinkWeight(requestLinkEntity);
}

function onLinkDragEnd(event) {
    let sourceLinkId = event.dataTransfer.getData("sourceLinkId");
    let sourceWeight = event.dataTransfer.getData("sourceWeight");
    let targetLinkId = event.dataTransfer.getData("targetLinkId");
    let targetWeight = event.dataTransfer.getData("targetWeight");
    event.dataTransfer.clearData();
}
