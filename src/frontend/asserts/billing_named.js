/**
 * Created by dingpengwei on 10/30/16.
 */

function loadNamedBilling(receiverContainer,productContainer,payBarContainer) {
    let requestUserEntity = new Object();
    requestUserEntity.cs = getCookie(KEY_CS);
    asyncRequestByGet(BASE_PATH + "receiver/retrieves?p=" + JSON.stringify(requestUserEntity), function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            if (jsonData.code == RC_SUCCESS || jsonData.code == RC_SUCCESS_EMPTY) {
                attachUserReceiverContainer(receiverContainer, jsonData.data, function (height) {
                    receiverContainer.parentNode.style.height = (receiverContainer.parentNode.clientHeight + height) + "px";
                })
            } else {
                new Toast().show("获取收货人失败");
            }
        }
    }, onErrorCallback, onTimeoutCallback);

    let productIds = document.getElementById("productIds") == undefined ? null : document.getElementById("productIds").content;
    let cartEntity = new Object();
    cartEntity.cs = getCookie(KEY_CS);
    cartEntity.productIds = productIds.split(",");
    asyncRequestByGet(BASE_PATH + "cart/retrieves?p=" + JSON.stringify(cartEntity), function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
            attachProductContainer(productContainer, jsonData.data, function (height) {
                productContainer.style.height = height + "px";
                productContainer.parentNode.style.height = (productContainer.parentNode.clientHeight + height) + "px";
            });
            attachPayBarContainer(payBarContainer, jsonData.data);
        }
    }, onErrorCallback, onTimeoutCallback);
}


function attachUserReceiverContainer(container, receiverEntities, onAttachCallback) {
    let receiverMessage = document.createElement("div");
    receiverMessage.className = "messageLabel";
    receiverMessage.innerHTML = "收货人信息";
    container.appendChild(receiverMessage);
    let currentReceiverContainer = createReceiverAddressEditorContainer(receiverEntities[0], true);
    container.appendChild(currentReceiverContainer);

    let moreReceiverTip = document.createElement("div");
    moreReceiverTip.className = "messageLabel";
    moreReceiverTip.style.width = "120px";
    moreReceiverTip.style.height = "40px";
    moreReceiverTip.style.lineHeight = "40px";
    moreReceiverTip.innerHTML = "更多收货地址 ︾ ";
    moreReceiverTip.style.cursor = "pointer";
    moreReceiverTip.status = "less";
    container.appendChild(moreReceiverTip);
    let moreReceiverContainer = createMoreReceiverAddressContainer(receiverEntities);
    moreReceiverTip.onclick = function () {
        if (this.status == "less") {
            moreReceiverTip.innerHTML = "更多收货地址 ︽ ";
            this.status = "more";
            container.style.height = container.clientHeight + moreReceiverContainer.customerHeight + "px";
            container.appendChild(moreReceiverContainer);
            onAttachCallback(moreReceiverContainer.customerHeight);
        } else if (this.status == "more") {
            moreReceiverTip.innerHTML = "更多收货地址 ︾ ";
            this.status = "less";
            container.style.height = "120px";
            container.removeChild(moreReceiverContainer);
            onAttachCallback(-moreReceiverContainer.customerHeight);
        }
    };
}

function createMoreReceiverAddressContainer(receiverEntities) {
    let moreAddressContainer = document.createElement("div");
    moreAddressContainer.style.color = "black";
    let length = receiverEntities == undefined ? 0 : receiverEntities.length;
    for (let i = 0; i < length; i++) {
        let receiverEntity = receiverEntities[i];
        let receiverAddressEditorContainer = createReceiverAddressEditorContainer(receiverEntity, true);
        receiverAddressEditorContainer.style.marginBottom = "2px";
        moreAddressContainer.appendChild(receiverAddressEditorContainer);
    }
    if (receiverEntities == undefined || receiverEntities.length < 10) {
        let addNewReceiver = document.createElement("div");
        addNewReceiver.className = "billingReceiverItem";
        addNewReceiver.style.height = "40px";
        addNewReceiver.style.textAlign = "center";
        addNewReceiver.style.borderColor = "#000000";
        addNewReceiver.innerHTML = "+";
        moreAddressContainer.appendChild(addNewReceiver);
    }
    moreAddressContainer.style.height = (length * 43 + (receiverEntities.length < 10 ? 1 : 0) * 40) + "px";
    moreAddressContainer.customerHeight = length * 43 + ((receiverEntities.length < 10 ? 1 : 0) * 40);
    return moreAddressContainer;
}