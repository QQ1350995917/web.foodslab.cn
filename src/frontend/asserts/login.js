/**
 * Created by dingpengwei on 9/7/16.
 */
function showLoginView() {
    showMaskView();
    createLoginView();
    document.body.appendChild(createLoginView());
}

function createLoginView() {
    let loginContainer = document.createElement("div")
    loginContainer.id = "loginContainer";
    loginContainer.className = "loginContainer";
    loginContainer.appendChild(crateTitleRowView());
    loginContainer.appendChild(createAuthRowView());
    loginContainer.appendChild(createLoginTitleRow());
    loginContainer.appendChild(createPhoneNumberRow());
    loginContainer.appendChild(createManualCodeRow());
    loginContainer.appendChild(createSMSCodeRow());
    loginContainer.appendChild(createLoginActionRow());
    return loginContainer;
}

function crateTitleRowView() {
    let titleRowView = document.createElement("div")
    titleRowView.className = "titleRowView";

    let titleMessage = document.createElement("div")
    titleMessage.className = "titleMessage";
    titleMessage.innerHTML = "微信/QQ扫码登录";
    titleRowView.appendChild(titleMessage);

    let closer = document.createElement("div")
    closer.className = "closer";
    closer.innerHTML = "X";
    closer.onclick = function () {
        dismissLoginView();
    };
    titleRowView.appendChild(closer);

    return titleRowView;
}

function createAuthRowView() {
    let authRowView = document.createElement("div")
    authRowView.className = "authRowView";
    let wx = document.createElement("img");
    wx.className = "login";
    wx.src = "http://localhost:8080/foodslab/webapp/asserts/images/login_wx.png";
    authRowView.appendChild(wx);
    let authLine = document.createElement("hr");
    authLine.className = "authLine";
    authRowView.appendChild(authLine);
    let qq = document.createElement("img");
    qq.className = "login";
    qq.src = "http://localhost:8080/foodslab/webapp/asserts/images/login_qq.png";
    authRowView.appendChild(qq);
    return authRowView;
}

function createLoginTitleRow() {
    let titleMessage = document.createElement("div");
    titleMessage.style.float = "none";
    titleMessage.style.marginTop = "10px";
    titleMessage.className = "titleMessage";
    titleMessage.innerHTML = "手机号码动态登录";
    return titleMessage;
}

function createPhoneNumberRow() {
    let phoneNumberRow = document.createElement("div");
    phoneNumberRow.className = "inputRow";
    let phoneNumberInput = document.createElement("input");
    phoneNumberInput.placeholder = "请输入电话号码";
    phoneNumberInput.className = "login";
    phoneNumberRow.appendChild(phoneNumberInput);

    let phoneNumberError = document.createElement("div");
    phoneNumberError.className = "loginError";
    phoneNumberError.innerHTML = "电话号码格式错误";
    phoneNumberRow.appendChild(phoneNumberError);
    return phoneNumberRow;
}

function createManualCodeRow() {
    let manualCodeRow = document.createElement("div");
    manualCodeRow.className = "inputRow";
    let manualCodeInput = document.createElement("input");
    manualCodeInput.placeholder = "请输入验证码";
    manualCodeInput.className = "login";
    manualCodeInput.style.width = "190px";
    manualCodeRow.appendChild(manualCodeInput);

    let manualCode = document.createElement("img");
    manualCode.className = "manualCode";
    manualCodeRow.appendChild(manualCode);

    let manualCodeError = document.createElement("div");
    manualCodeError.className = "loginError";
    manualCodeError.innerHTML = "验证码错误,请重新输入";
    manualCodeRow.appendChild(manualCodeError);
    return manualCodeRow;
}

function createSMSCodeRow() {
    let smsCodeRow = document.createElement("div");
    smsCodeRow.className = "inputRow";

    let smsCodeInput = document.createElement("input");
    smsCodeInput.placeholder = "请输入动态密码";
    smsCodeInput.className = "login";
    smsCodeInput.style.width = "190px";
    smsCodeRow.appendChild(smsCodeInput);

    let manualCode = document.createElement("img");
    manualCode.className = "manualCode";
    smsCodeRow.appendChild(manualCode);

    let smsCodeError = document.createElement("div");
    smsCodeError.className = "loginError";
    smsCodeError.innerHTML = "动态密码错误";
    smsCodeRow.appendChild(smsCodeError);

    return smsCodeRow;
}

function createLoginActionRow() {
    let loginAction = document.createElement("div")
    loginAction.className = "loginAction";
    loginAction.innerHTML = "登录";
    loginAction.style.backgroundColor = "red";
    loginAction.style.height = "40px";
    return loginAction;
}


function dismissLoginView() {
    document.body.removeChild(document.getElementById("loginContainer"));
    dismissMaskView();
}