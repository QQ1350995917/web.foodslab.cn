/**
 * Created by dingpengwei on 8/13/16.
 */
/**
 * 请求link数据
 */
function link() {
    let indexUrl = BASE_PATH + "/link";
    asyncRequestByGet(indexUrl, function (data) {
        onLinkDataCallback(data);
    }, onRequestError(), onRequestTimeout());
}

/**
 * 请求创建link数据
 * @param pid
 * @param label
 * @param href
 */
function createLink(subLinkItemRootView, pid, label, href) {
    let indexUrl = BASE_PATH + "/link/create?pid=" + pid + "&label=" + label + "&href=" + href;
    asyncRequestByGet(indexUrl, function (data) {
        onCreateLinkDataCallback(pid, subLinkItemRootView, data);
    }, onRequestError(), onRequestTimeout());
}

function updateLink(subLinkItemRootView, deleteView, linkId, pid, label, href, status) {
    let indexUrl = undefined;
    if (status == undefined) {
        indexUrl = BASE_PATH + "/link/update?linkId=" + linkId + "&pid=" + pid + "&label=" + label + "&href=" + href + "&status=1";
    } else {
        indexUrl = BASE_PATH + "/link/update?linkId=" + linkId + "&pid=" + pid + "&label=" + label + "&href=" + href + "&status=-1";
    }

    if (indexUrl == undefined) {
        new Toast().show("信息缺失,无法提交");
    } else {
        asyncRequestByGet(indexUrl, function (data) {
            onUpdateLinkDataCallback(subLinkItemRootView, deleteView, data, status);
        }, onRequestError(), onRequestTimeout());
    }
}

/**
 * 处理请求link后,服务器返回的数据
 * @param data
 */
function onLinkDataCallback(data) {
    var result = checkResponseDataFormat(data);
    if (result) {
        var parseData = JSON.parse(data);
        initLinkRootView(parseData.data);
    }
}

/**
 * 处理请求创建link的服务器返回的数据
 * @param data
 */
function onCreateLinkDataCallback(pid, subLinkItemRootView, data) {
    var result = checkResponseDataFormat(data);
    if (result) {
        var parseData = JSON.parse(data);
        if (parseData.code == 200) {
            new Toast().show("创建成功");
            subLinkItemRootView.removeChild(subLinkItemRootView.lastChild);
            subLinkItemRootView.style.height = subLinkItemRootView.clientHeight + 50 + "px";
            subLinkItemRootView.parentNode.style.height = subLinkItemRootView.parentNode.clientHeight + 50 + "px";
            createLinkItemView(pid, subLinkItemRootView, parseData.data);
            createLinkItemView(pid, subLinkItemRootView, undefined);
        } else {
            new Toast().show("创建失败");
        }
    }
}

/**
 * 处理更新返回的数据
 * @param subLinkItemRootView
 * @param deleteView
 * @param data
 */
function onUpdateLinkDataCallback(subLinkItemRootView, deleteView, data, status) {
    var result = checkResponsDataFormat(data);
    if (result) {
        var parseData = JSON.parse(data);
        if (parseData.code == 200) {
            new Toast().show("更新成功");
            if (status) {
                subLinkItemRootView.removeChild(deleteView);
                subLinkItemRootView.style.height = subLinkItemRootView.clientHeight - 50 + "px";
                subLinkItemRootView.parentNode.style.height = subLinkItemRootView.parentNode.clientHeight - 50 + "px";
            } else {

            }
        } else {
            new Toast().show("更新失败");
        }
    }
}

function initLinkRootView(linkEntities) {
    // 重置界面
    resetView();
    // 获取根元素对象
    let titleViewContainer = document.getElementById(MAIN_TITLE_ID);
    let contentViewContainer = document.getElementById(MAIN_CONTENT_ID);
    // 添加标题
    let titleView = document.createElement("div");
    titleView.innerHTML = "链接管理";
    titleView.className = "horizontalSelected";
    titleView.style.width = "100%";
    titleViewContainer.appendChild(titleView);

    let formatSize = linkEntities == undefined ? 0 : linkEntities.length;
    for (let index = 0; index < formatSize; index++) {
        let linkEntity = linkEntities[index];
        let linkItemRootView = document.createElement("div");
        linkItemRootView.className = "SS_IC";
        linkItemRootView.style.height = "60px";
        linkItemRootView.style.width = "100%";

        //连接容器
        let linkConnectorView = document.createElement("div");
        linkConnectorView.className = "SS_IC";
        linkConnectorView.style.height = "40px";
        linkConnectorView.style.width = "122px";
        linkConnectorView.style.borderLeftWidth = "0px";
        // 连接线横线
        let line_H_level11 = document.createElement("hr");
        line_H_level11.className = "SS_IC_HL";
        line_H_level11.style.marginTop = "20px";
        linkConnectorView.appendChild(line_H_level11);
        // 一级名称的容器对象
        let linkLevel1Label = document.createElement("div");
        linkLevel1Label.className = "SS_IC_LABEL";
        linkLevel1Label.style.borderLeftWidth = "1px";
        linkLevel1Label.style.marginTop = "5px";
        linkLevel1Label.innerHTML = linkEntity.label;
        linkLevel1Label.style.cursor = "default";
        linkConnectorView.appendChild(linkLevel1Label);
        // 连接线横线
        let line_H_level12 = document.createElement("hr");
        line_H_level12.className = "SS_IC_HL";
        line_H_level12.style.marginTop = "20px";
        linkConnectorView.appendChild(line_H_level12);
        linkItemRootView.appendChild(linkConnectorView);

        let subLinkItemRootView = document.createElement("div");
        subLinkItemRootView.className = "SS_IC";
        subLinkItemRootView.style.width = "900px";

        let linkSize = linkEntity.children == undefined ? 0 : linkEntity.children.length;
        for (let index = 0; index < linkSize; index++) {
            let subLinkEntity = linkEntity.children[index];
            createLinkItemView(linkEntity.linkId, subLinkItemRootView, subLinkEntity);
        }
        createLinkItemView(linkEntity.linkId, subLinkItemRootView, undefined);
        linkItemRootView.appendChild(subLinkItemRootView);

        subLinkItemRootView.style.height = (linkSize + 1) * 40 + "px";
        subLinkItemRootView.parentNode.style.height = (linkSize + 1) * 40 + 20 + "px";
        contentViewContainer.appendChild(linkItemRootView);
    }
}

function createLinkItemView(pid, subLinkItemRootView, linkEntity) {
    let linkItemRootView = document.createElement("div");
    linkItemRootView.className = "SS_IC";
    linkItemRootView.style.width = "100%";
    linkItemRootView.style.height = "30px";
    linkItemRootView.style.marginBottom = "10px";
    linkItemRootView.style.borderLeftWidth = "0px";
    // 连接线横线
    let line_H_level2 = document.createElement("hr");
    line_H_level2.className = "SS_IC_HL";
    line_H_level2.style.marginTop = "20px";
    linkItemRootView.appendChild(line_H_level2);

    let linkConvertView = document.createElement("div");
    linkConvertView.className = "SS_IC";
    linkConvertView.style.width = "870px";
    linkConvertView.style.height = "30px";
    linkConvertView.style.borderLeftWidth = "0px";
    linkItemRootView.appendChild(linkConvertView);

    if (linkEntity == undefined) {
        let addNewLinkLabel = document.createElement("div");
        addNewLinkLabel.className = "SS_IC_LABEL";
        addNewLinkLabel.style.width = "870px";
        addNewLinkLabel.style.height = "30px";
        addNewLinkLabel.style.marginTop = "5px";
        addNewLinkLabel.style.borderLeftWidth = "1px";
        addNewLinkLabel.innerHTML = "+";
        addNewLinkLabel.onclick = function () {
            onAddNewLinkViewClick(subLinkItemRootView, pid, linkConvertView, undefined);
        };
        linkConvertView.appendChild(addNewLinkLabel);
        linkItemRootView.appendChild(linkConvertView);
    } else {
        let linkNameLabel = document.createElement("div");
        linkNameLabel.className = "SS_IC_LABEL";
        linkNameLabel.style.width = "100px";
        linkNameLabel.style.height = "30px";
        linkNameLabel.style.marginTop = "5px";
        linkNameLabel.style.borderLeftWidth = "1px";
        linkNameLabel.innerHTML = linkEntity.label;
        linkNameLabel.ondblclick = function () {
            onAddNewLinkViewClick(subLinkItemRootView, pid, linkConvertView, linkEntity);
        };
        linkConvertView.appendChild(linkNameLabel);

        let line_H_level23 = document.createElement("hr");
        line_H_level23.className = "SS_IC_HL";
        line_H_level23.style.marginTop = "20px";
        linkConvertView.appendChild(line_H_level23);

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
            onAddNewLinkViewClick(subLinkItemRootView, pid, linkConvertView, linkEntity);
        };
        linkConvertView.appendChild(linkHrefLabel);
    }
    subLinkItemRootView.appendChild(linkItemRootView);
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
                createLink(subLinkItemRootView, pid, addLabel.value, addHref.value);
            } else {
                updateLink(subLinkItemRootView, convertView.parentNode, linkEntity.linkId, linkEntity.pid, addLabel.value, addHref.value, undefined);
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
            updateLink(subLinkItemRootView, convertView.parentNode, linkEntity.linkId, linkEntity.pid, linkEntity.label, linkEntity.href, -1);
        };
        convertView.appendChild(del);
    }
}
