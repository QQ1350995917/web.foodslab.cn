/**
 * Created by dingpengwei on 8/13/16.
 */
/**
 * 请求link数据
 */
function link() {
    requestTopLink();
}

function requestTopLink() {
    let linkEntity = new Object();
    let indexUrl = BASE_PATH + "/link/mRetrieves?p=" + JSON.stringify(linkEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            onRequestTopLinkCallback(parseData.data);
        }
    }, onRequestError(), onRequestTimeout());
}

function onRequestTopLinkCallback(linkEntities) {
    resetView();
    let titleViewContainer = document.getElementById(MAIN_TITLE_ID);
    let titleView = document.createElement("div");
    titleView.innerHTML = "链接管理";
    titleView.className = "horizontalSelected";
    titleView.style.width = "100%";
    titleViewContainer.appendChild(titleView);

    let mainView = document.getElementById(MAIN_CONTENT_ID);
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

function requestSubLink(pLinkEntity) {
    let indexUrl = BASE_PATH + "/link/mRetrieves?p=" + JSON.stringify(pLinkEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            onRequestSubLinkCallback(pLinkEntity, parseData.data);
        }
    }, onRequestError(), onRequestTimeout());
}


function onRequestSubLinkCallback(pLinkEntity, linkEntities) {
    resetView();
    let titleViewContainer = document.getElementById(MAIN_TITLE_ID);
    let titleView = document.createElement("div");
    titleView.innerHTML = "链接管理 >> " + pLinkEntity.label;
    titleView.className = "horizontalSelected";
    titleView.style.width = "100%";
    titleViewContainer.style.cursor = "pointer";
    titleViewContainer.onclick = function () {
        requestTopLink();
    }
    titleViewContainer.appendChild(titleView);

    let mainView = document.getElementById(MAIN_CONTENT_ID);
    let length = linkEntities == undefined ? 0 : linkEntities.length;
    for (let index = 0; index <= length; index++) {
        if (index < length) {
            let subLinkEntity = linkEntities[index];
            let recommendItemRootViewContainer = document.createElement("div");
            recommendItemRootViewContainer.className = "SS_IC";
            recommendItemRootViewContainer.style.height = "40px";
            recommendItemRootViewContainer.style.width = "100%";

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
            seriesLabel.innerHTML = subLinkEntity.label;
            if (subLinkEntity.status == 1) {
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
            formatLabel.innerHTML = subLinkEntity.href;
            if (subLinkEntity.status == 1) {
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
            if (subLinkEntity.status == 1) {
                actionEditor.style.borderColor = "red";
            }
            recommendItemRootView.appendChild(actionEditor);

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

            if (subLinkEntity.status == 1) {
                actionBlock.innerHTML = "启用";
                actionBlock.style.borderColor = "red";
            } else if (subLinkEntity.status == 2) {
                actionBlock.innerHTML = "禁用";
            }

            actionBlock.onclick = function () {
                let requestLinkEntity = new Object();
                requestLinkEntity.pid = subLinkEntity.pid;
                requestLinkEntity.linkId = subLinkEntity.linkId;
                if (subLinkEntity.status == 1) {
                    requestLinkEntity.status = 2;
                } else if (subLinkEntity.status = 2) {
                    requestLinkEntity.status = 1;
                }
                requestMarkLink(pLinkEntity,requestLinkEntity);
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
            if (subLinkEntity.status == 1) {
                actionDelete.style.borderColor = "red";
            }
            actionDelete.onclick = function () {
                let requestLinkEntity = new Object();
                requestLinkEntity.pid = subLinkEntity.pid;
                requestLinkEntity.linkId = subLinkEntity.linkId;
                requestLinkEntity.status = -1;
                requestMarkLink(pLinkEntity,requestLinkEntity);
            }
            recommendItemRootView.appendChild(actionDelete);

            recommendItemRootView.id = subLinkEntity.linkId;
            recommendItemRootView.pid = subLinkEntity.pid;
            recommendItemRootView.weight = subLinkEntity.weight;
            recommendItemRootView.draggable = "true";
            recommendItemRootView.style.cursor = "move";
            recommendItemRootView.addEventListener("dragstart", onLinkDragStart);
            recommendItemRootView.addEventListener("dragover", onLinkDragOver);
            recommendItemRootView.addEventListener("drop", onLinkDrop);
            recommendItemRootView.addEventListener("dragend", onLinkDragEnd);

            recommendItemRootViewContainer.appendChild(recommendItemRootView);
            mainView.appendChild(recommendItemRootViewContainer);
        } else {
            let recommendItemRootViewContainer = document.createElement("div");
            recommendItemRootViewContainer.className = "SS_IC";
            recommendItemRootViewContainer.style.height = "40px";
            recommendItemRootViewContainer.style.width = "100%";

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
            seriesLabel.innerHTML = "+";
            seriesLabel.style.width = "97.6%";

            seriesLabel.onclick = function () {

            }
            recommendItemRootView.appendChild(seriesLabel);
            recommendItemRootViewContainer.appendChild(recommendItemRootView);
            mainView.appendChild(recommendItemRootViewContainer);
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
            convertLinkContainerToEditor(container, linkEntity);
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
            requestSubLink(linkEntity);
        } else {
            convertLinkContainerToEditor(container, linkEntity);
        }
    }
    container.style.cursor = "pointer";
}

function convertLinkContainerToEditor(linkContainer, linkEntity) {
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
            window.event.cancelBubble = true
            attachLinkGridViewToContainer(linkContainer, linkEntity);
        }

        saveAction.onclick = function () {
            let label = linkLabelInput.value;
            if (label == undefined || label == null || label == "") {
                new Toast().show("名称不能为空");
            } else {
                let requestLinkEntity = new Object();
                requestLinkEntity.sessionId = "admin";
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
            window.event.cancelBubble = true
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
            requestLinkEntity.sessionId = "admin";
            requestLinkEntity.linkId = linkEntity.linkId;
            requestLinkEntity.pid = linkEntity.pid;
            if (linkEntity.status == 1) {
                requestLinkEntity.status = 2;
            } else if (linkEntity.status == 2) {
                requestLinkEntity.status = 1;
            }
            requestMarkLink(requestLinkEntity,requestLinkEntity);
        }

        deleteAction.onclick = function () {
            window.event.cancelBubble = true;
            let requestLinkEntity = new Object();
            requestLinkEntity.sessionId = "admin";
            requestLinkEntity.linkId = linkEntity.linkId;
            requestLinkEntity.pid = linkEntity.pid;
            requestLinkEntity.status = -1;
            requestMarkLink(requestLinkEntity,requestLinkEntity);
        }
    }
}


/**
 * 请求创建link数据
 */
function requestCreateLink(linkEntity) {
    let indexUrl = BASE_PATH + "/link/mCreate?p=" + JSON.stringify(linkEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                new Toast().show("创建成功");
                if (parseData.data.linkId == parseData.data.pid) {
                    requestTopLink();
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
    }, onRequestError(), onRequestTimeout());
}

function requestMarkLink(pLinkEntity,linkEntity) {
    let indexUrl = BASE_PATH + "/link/mMark?p=" + JSON.stringify(linkEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                new Toast().show("操作成功");
                if (parseData.data.linkId == parseData.data.pid) {
                    requestTopLink();
                } else {
                    requestSubLink(pLinkEntity);
                }
            } else {
                new Toast().show("操作失败");
            }
        }
    }, onRequestError(), onRequestTimeout());

}

function requestUpdateLink(linkEntity) {
    let indexUrl = BASE_PATH + "/link/mUpdate?p=" + JSON.stringify(linkEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                new Toast().show("操作成功");
                if (parseData.data.linkId == parseData.data.pid) {
                    requestTopLink();
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
    }, onRequestError(), onRequestTimeout());
}

function requestSwapSubLinkWeight(linkEntity) {
    let indexUrl = BASE_PATH + "/link/mSwap?p=" + JSON.stringify(linkEntity);
    asyncRequestByGet(indexUrl, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            if (parseData.code == RESPONSE_SUCCESS) {
                new Toast().show("操作成功");
                let requestLinkEntity = new Object();
                requestLinkEntity.linkId = linkEntity.pid;
                requestLinkEntity.pid = linkEntity.pid;
                requestSubLink(requestLinkEntity);
            } else {
                new Toast().show("操作失败");
            }
        }
    }, onRequestError(), onRequestTimeout());
}

function onAddNewLinkViewClick(subLinkItemRootView, pid, convertView, linkEntity) {
    convertView.innerHTML = null;
    let addLabel = document.createElement("input");
    addLabel.className = "SS_IC_LABEL";
    addLabel.style.width = "100px";
    addLabel.style.height = "30px";
    addLabel.style.marginTop = "5px";
    addLabel.style.borderLeftWidth = "1px";
    convertView.appendChild(addLabel);
    if (linkEntity != undefined) {
        addLabel.value = linkEntity.label;
    } else {
        addLabel.focus();
    }
    // 连接线横线
    let line_H_level2 = document.createElement("hr");
    line_H_level2.className = "SS_IC_HL";
    line_H_level2.style.marginTop = "20px";
    convertView.appendChild(line_H_level2);

    let addHref = document.createElement("input");
    addHref.className = "SS_IC_LABEL";
    if (linkEntity == undefined) {
        addHref.style.width = "602px";
    } else {
        addHref.style.width = "532px";
    }

    addHref.style.height = "30px";
    addHref.style.marginTop = "5px";
    addHref.style.borderLeftWidth = "1px";
    convertView.appendChild(addHref);
    if (linkEntity != undefined) {
        addHref.value = linkEntity.href;
        addHref.focus();
    }
    let cancel = document.createElement("div");
    cancel.className = "B_B_D";
    cancel.style.marginTop = "5px";
    cancel.style.height = "33px";
    cancel.innerHTML = "取消";
    cancel.onclick = function () {
        convertView.innerHTML = null;
        if (linkEntity == undefined) {
            let addNewLinkLabel = document.createElement("div");
            addNewLinkLabel.className = "SS_IC_LABEL";
            addNewLinkLabel.style.width = "870px";
            addNewLinkLabel.style.height = "30px";
            addNewLinkLabel.style.marginTop = "5px";
            addNewLinkLabel.style.borderLeftWidth = "1px";
            addNewLinkLabel.innerHTML = "+";
            addNewLinkLabel.onclick = function () {
                onAddNewLinkViewClick(subLinkItemRootView, pid, convertView, linkEntity);
            };
            convertView.appendChild(addNewLinkLabel);
        } else {
            let linkNameLabel = document.createElement("div");
            linkNameLabel.className = "SS_IC_LABEL";
            linkNameLabel.style.width = "100px";
            linkNameLabel.style.height = "30px";
            linkNameLabel.style.marginTop = "5px";
            linkNameLabel.style.borderLeftWidth = "1px";
            linkNameLabel.innerHTML = linkEntity.label;
            linkNameLabel.ondblclick = function () {
                onAddNewLinkViewClick(subLinkItemRootView, pid, convertView, linkEntity);
            };
            convertView.appendChild(linkNameLabel);

            let line_H_level23 = document.createElement("hr");
            line_H_level23.className = "SS_IC_HL";
            line_H_level23.style.marginTop = "20px";
            convertView.appendChild(line_H_level23);

            let linkHrefLabel = document.createElement("div");
            linkHrefLabel.className = "SS_IC_LABEL";
            linkHrefLabel.style.width = "736px";
            linkHrefLabel.style.height = "30px";
            linkHrefLabel.style.marginTop = "5px";
            linkHrefLabel.style.borderLeftWidth = "1px";
            linkHrefLabel.style.textAlign = "left";
            linkHrefLabel.style.paddingLeft = "10px";
            linkHrefLabel.innerHTML = linkEntity.href;
            linkHrefLabel.ondblclick = function () {
                onAddNewLinkViewClick(subLinkItemRootView, pid, convertView, linkEntity);
            };
            convertView.appendChild(linkHrefLabel);
        }

    };
    convertView.appendChild(cancel);

    let save = document.createElement("div");
    save.className = "B_B_D";
    save.style.marginTop = "5px";
    save.style.height = "33px";
    save.innerHTML = "保存";
    save.onclick = function () {
        if (addHref.value == undefined || addHref.value == null || addHref.value.trim() == "" || addLabel.value == undefined || addLabel.value == null || addLabel.value.trim() == "") {
            new Toast().show("请输入完整信息");
        } else {
            if (linkEntity == undefined) {

            } else {
                convertView.innerHTML = null;
                let linkNameLabel = document.createElement("div");
                linkNameLabel.className = "SS_IC_LABEL";
                linkNameLabel.style.width = "100px";
                linkNameLabel.style.height = "30px";
                linkNameLabel.style.marginTop = "5px";
                linkNameLabel.style.borderLeftWidth = "1px";
                linkNameLabel.innerHTML = addLabel.value;
                linkNameLabel.ondblclick = function () {
                    onAddNewLinkViewClick(subLinkItemRootView, pid, convertView, linkEntity);
                };
                convertView.appendChild(linkNameLabel);

                let line_H_level23 = document.createElement("hr");
                line_H_level23.className = "SS_IC_HL";
                line_H_level23.style.marginTop = "20px";
                convertView.appendChild(line_H_level23);

                let linkHrefLabel = document.createElement("div");
                linkHrefLabel.className = "SS_IC_LABEL";
                linkHrefLabel.style.width = "736px";
                linkHrefLabel.style.height = "30px";
                linkHrefLabel.style.marginTop = "5px";
                linkHrefLabel.style.borderLeftWidth = "1px";
                linkHrefLabel.style.textAlign = "left";
                linkHrefLabel.style.paddingLeft = "10px";
                linkHrefLabel.innerHTML = addHref.value;
                linkHrefLabel.ondblclick = function () {
                    onAddNewLinkViewClick(subLinkItemRootView, pid, convertView, linkEntity);
                };
                convertView.appendChild(linkHrefLabel);
            }
        }
    };
    convertView.appendChild(save);

    if (linkEntity != undefined) {
        let del = document.createElement("div");
        del.className = "B_B_D";
        del.style.marginTop = "5px";
        del.style.height = "33px";
        del.innerHTML = "删除";
        del.onclick = function () {

        };
        convertView.appendChild(del);
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
