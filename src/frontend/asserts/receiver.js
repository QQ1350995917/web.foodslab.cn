/**
 * Created by dingpengwei on 8/24/16.
 */
function showReceiverEditorView() {
    document.documentElement.style.overflow = 'hidden';
    document.oncontextmenu = new Function("event.returnValue=false;");
    document.onselectstart = new Function("event.returnValue=false;");
    window.onhelp = new Function("event.returnValue=false;"); //屏蔽F1帮助
    document.onkeydown = function () {
        if (window.event && window.event.keyCode == 13) {
            window.event.returnValue = false;
        }
    }

    document.body.appendChild(createReceiverBackground());
    let receiverEditor = createReceiverEditor();
    document.body.appendChild(receiverEditor);
    receiverEditor.appendChild(createReceiverEditorTitle());
    receiverEditor.appendChild(createReceiverEditorName());
    receiverEditor.appendChild(createReceiverEditorAddress());
    receiverEditor.appendChild(createReceiverEditorAddressAppend());
    receiverEditor.appendChild(createReceiverEditorPhone());
    receiverEditor.appendChild(createReceiverEditorSave());
}

function dismissReceiverEditorView() {
    document.documentElement.style.overflow = 'scroll';
    document.oncontextmenu = new Function("event.returnValue=true;");
    document.onselectstart = new Function("event.returnValue=true;");
    window.onhelp = new Function("event.returnValue=true;");
    document.onkeydown = null;
    document.body.removeChild(document.getElementById("receiverEditorView"));
    document.body.removeChild(document.getElementById("receiverView"));
}

function createReceiverBackground() {
    let receiverView = document.createElement("div");
    receiverView.id = "receiverView";
    receiverView.style.position = "absolute";
    receiverView.style.top = getScrollTop() + "px";
    receiverView.style.backgroundColor = "#CCCCCC";
    receiverView.style.width = "1000px";
    receiverView.style.height = "100%";
    receiverView.style.left = "50%";
    receiverView.style.marginLeft = "-500px";
    receiverView.style.zIndex = "9";
    receiverView.style.opacity = "0.6";
    return receiverView;
}

function createReceiverEditor() {
    let receiverEditorContainer = document.createElement("div");
    receiverEditorContainer.id = "receiverEditorView";
    receiverEditorContainer.className = "receiverEditor";
    receiverEditorContainer.style.position = "absolute";
    receiverEditorContainer.style.width = "600px";
    receiverEditorContainer.style.height = "300px";
    receiverEditorContainer.style.top = "15%";
    receiverEditorContainer.style.left = "50%";
    receiverEditorContainer.style.marginLeft = "-300px";
    receiverEditorContainer.style.zIndex = "10";
    receiverEditorContainer.style.opacity = "1";
    receiverEditorContainer.style.borderWidth = "1px";
    receiverEditorContainer.style.borderColor = "#CCCCCC";
    receiverEditorContainer.style.borderStyle = "solid";
    receiverEditorContainer.style.backgroundColor = "#FFFFFF";
    return receiverEditorContainer;
}

function createReceiverEditorTitle() {
    let receiverEditorTitleLine = document.createElement("div");
    receiverEditorTitleLine.className = "receiverItem";
    let receiverTipLabel = document.createElement("div");
    receiverTipLabel.className = "receiverItemLabel";
    receiverTipLabel.style.fontSize = "1.2rem";
    receiverTipLabel.innerHTML = "收货人信息";
    receiverEditorTitleLine.appendChild(receiverTipLabel);

    let receiverEditorClose = document.createElement("div");
    receiverEditorClose.innerHTML = "X";
    receiverEditorClose.className = "receiverItemLabel";
    receiverEditorClose.style.float = "right";
    receiverEditorClose.style.width = "30px";
    receiverEditorClose.style.height = "30px";
    receiverEditorClose.style.margin = "5px";
    receiverEditorClose.style.lineHeight = "30px";
    receiverEditorClose.style.borderRadius = "20px";
    receiverEditorClose.style.borderColor = "red";
    receiverEditorClose.style.color = "red";
    receiverEditorClose.style.borderWidth = "1px";
    receiverEditorClose.style.cursor = "pointer";
    receiverEditorClose.onclick = function () {
        dismissReceiverEditorView();
    };
    receiverEditorTitleLine.appendChild(receiverEditorClose);
    return receiverEditorTitleLine;
}

function createReceiverEditorName() {
    let receiverEditorNameLine = document.createElement("div");
    receiverEditorNameLine.className = "receiverItem";
    let receiverNameLabel = document.createElement("div");
    receiverNameLabel.className = "receiverItemLabel";
    receiverNameLabel.style.float = "left";
    receiverNameLabel.style.textAlign = "right";
    receiverNameLabel.innerHTML = "<span style='color: #FF0000;'>*</span>姓名:";
    receiverEditorNameLine.appendChild(receiverNameLabel);

    let receiverEditorName = document.createElement("input");
    receiverEditorName.id = "receiverEditorName";
    receiverEditorName.className = "editor input";
    receiverEditorNameLine.appendChild(receiverEditorName);
    return receiverEditorNameLine;
}

function createReceiverEditorAddress() {
    let receiverEditorAddressLine = document.createElement("div");
    receiverEditorAddressLine.className = "receiverItem";
    let receiverAddressLabel = document.createElement("div");
    receiverAddressLabel.className = "receiverItemLabel";
    receiverAddressLabel.style.float = "left";
    receiverAddressLabel.style.textAlign = "right";
    receiverAddressLabel.innerHTML = "<span style='color: #FF0000;'>*</span>地址:";
    receiverEditorAddressLine.appendChild(receiverAddressLabel);

    let province = document.createElement("select");
    province.id = "addressEditorProvince";
    province.className = "addressSelector";
    receiverEditorAddressLine.appendChild(province);

    let city = document.createElement("select");
    province.id = "addressEditorProvince";
    city.className = "addressSelector";
    receiverEditorAddressLine.appendChild(city);

    let county = document.createElement("select");
    county.id = "addressEditorCounty";
    county.className = "addressSelector";
    receiverEditorAddressLine.appendChild(county);

    let town = document.createElement("select");
    town.id = "addressEditorTown";
    town.className = "addressSelector";
    receiverEditorAddressLine.appendChild(town);

    let village = document.createElement("select");
    village.id = "addressEditorVillage";
    village.className = "addressSelector";
    receiverEditorAddressLine.appendChild(village);

    return receiverEditorAddressLine;
}

function createReceiverEditorAddressAppend() {
    let receiverEditorAddressAppendLine = document.createElement("div");
    receiverEditorAddressAppendLine.className = "receiverItem";
    let receiverAddressAppendLabel = document.createElement("div");
    receiverAddressAppendLabel.className = "receiverItemLabel";
    receiverAddressAppendLabel.style.float = "left";
    receiverAddressAppendLabel.style.textAlign = "right";
    receiverAddressAppendLabel.innerHTML = "<span style='color: #FF0000;'>*</span>补充地址:";
    receiverEditorAddressAppendLine.appendChild(receiverAddressAppendLabel);

    let receiverEditorAddressAppend = document.createElement("input");
    receiverEditorAddressAppend.id = "receiverEditorAddressAppend";
    receiverEditorAddressAppend.className = "editor input";
    receiverEditorAddressAppendLine.appendChild(receiverEditorAddressAppend);
    return receiverEditorAddressAppendLine;

}


function createReceiverEditorPhone() {
    let receiverEditorPhoneContainer = document.createElement("div");
    receiverEditorPhoneContainer.className = "receiverItem";
    let receiverPhoneLabel = document.createElement("div");
    receiverPhoneLabel.className = "receiverItemLabel";
    receiverPhoneLabel.style.float = "left";
    receiverPhoneLabel.style.textAlign = "right";
    receiverPhoneLabel.innerHTML = "<span style='color: #FF0000;'>*</span>联系电话:";
    receiverEditorPhoneContainer.appendChild(receiverPhoneLabel);

    let receiverEditorPhone = document.createElement("input");
    receiverEditorPhone.id = "receiverEditorPhone";
    receiverEditorPhone.className = "editor input";
    receiverEditorPhone.style.width = "150px";
    receiverEditorPhone.style.float = "left";
    receiverEditorPhoneContainer.appendChild(receiverEditorPhone);


    let receiverPhoneBackupLabel = document.createElement("div");
    receiverPhoneBackupLabel.className = "receiverItemLabel";
    receiverPhoneBackupLabel.style.float = "left";
    receiverPhoneBackupLabel.style.textAlign = "right";
    receiverPhoneBackupLabel.innerHTML = "备用电话:";
    receiverEditorPhoneContainer.appendChild(receiverPhoneBackupLabel);

    let receiverEditorPhoneBackup = document.createElement("input");
    receiverEditorPhoneBackup.id = "receiverEditorPhoneBackup";
    receiverEditorPhoneBackup.className = "editor input";
    receiverEditorPhoneBackup.style.width = "150px";
    receiverEditorPhoneBackup.style.float = "left";
    receiverEditorPhoneContainer.appendChild(receiverEditorPhoneBackup);

    return receiverEditorPhoneContainer;
}


function createReceiverEditorSave() {
    let receiverEditorSave = document.createElement("div");
    receiverEditorSave.className = "receiverItem";
    receiverEditorSave.style.marginTop = "20px";
    let receiverSave = document.createElement("div");
    receiverSave.className = "receiverItemLabel";
    receiverSave.style.float = "left";
    receiverSave.style.width = "400px";
    receiverSave.style.textAlign = "center";
    receiverSave.style.marginLeft = "100px";
    receiverSave.style.backgroundColor = "red";
    receiverSave.style.color = "#FFFFFF";
    receiverSave.style.cursor = "pointer";
    receiverSave.innerHTML = "确定";
    receiverSave.onclick = function () {
        let receiverEditorName = document.getElementById("receiverEditorName").value;
        let receiverEditorAddressAppend = document.getElementById("receiverEditorAddressAppend").value;
        let receiverEditorPhone = document.getElementById("receiverEditorPhone").value;
        let receiverEditorPhoneBackup = document.getElementById("receiverEditorPhoneBackup").value;
    };
    receiverEditorSave.appendChild(receiverSave);
    return receiverEditorSave;

}