/**
 * Created by dingpengwei on 11/13/16.
 */
function loadSystemView() {
    let object = new Object();
    object.cs = getCookie(KEY_CS);
    let url = BASE_PATH + "/system/mStatus?p=" + JSON.stringify(object);
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var parseData = JSON.parse(data);
            attachSystemStatusView(parseData.data);
        }
    }, onErrorCallback(), onTimeoutCallback());
}

function attachSystemStatusView(systemEntity) {
    let line1 = document.createElement("div");
    line1.innerHTML = "系统名称: " + systemEntity.osName;
    getMainContainer().appendChild(line1);

    let line2 = document.createElement("div");
    line2.innerHTML = "系统版本: " + systemEntity.osVersion;
    getMainContainer().appendChild(line2);

    let line3 = document.createElement("div");
    line3.innerHTML = "系统架构: " + systemEntity.osArch;
    getMainContainer().appendChild(line3);


    let line4 = document.createElement("div");
    line4.innerHTML = "系统IP: " + systemEntity.osIP;
    getMainContainer().appendChild(line4);

    let line5 = document.createElement("div");
    line5.innerHTML = "系统MAC: " + systemEntity.osMAC;
    getMainContainer().appendChild(line5);

    let line6 = document.createElement("div");
    line6.innerHTML = "系统时间: " + new Date(systemEntity.osDate).format("yyyy-MM-dd hh:mm:ss");
    getMainContainer().appendChild(line6);

    let line7 = document.createElement("div");
    line7.innerHTML = "JAVA版本: " + systemEntity.javaVersion;
    getMainContainer().appendChild(line7);

    let line8 = document.createElement("div");
    line8.innerHTML = "服务器名称: " + systemEntity.serverName;
    getMainContainer().appendChild(line8);

    let line9 = document.createElement("div");
    line9.innerHTML = "服务器版本: " + systemEntity.serverVersion;
    getMainContainer().appendChild(line9);

    let line10 = document.createElement("div");
    line10.innerHTML = "数据库名称: " + systemEntity.dbName;
    getMainContainer().appendChild(line10);

    let line11 = document.createElement("div");
    line11.innerHTML = "数据库版本: " + systemEntity.dbVersion;
    getMainContainer().appendChild(line11);

    let line12 = document.createElement("div");
    line12.innerHTML = "CPU核数: " + systemEntity.CPUS;
    getMainContainer().appendChild(line12);


    let line13 = document.createElement("div");
    line13.innerHTML = "CPU使用率: " + systemEntity.CPURatio;
    getMainContainer().appendChild(line13);

    let line14 = document.createElement("div");
    line14.innerHTML = "内存总大小: " + (systemEntity.memoryTotal / 1024 / 1024 ) + "M";
    getMainContainer().appendChild(line14);

    let line15 = document.createElement("div");
    line15.innerHTML = "已用内存大小: " + (systemEntity.memoryUsed / 1024 / 1024 ) + "M";
    getMainContainer().appendChild(line15);

    let line16 = document.createElement("div");
    line16.innerHTML = "空闲内存容量: " + (systemEntity.memoryFree / 1024 / 1024 ) + "M";
    getMainContainer().appendChild(line16);

    let line17 = document.createElement("div");
    line17.innerHTML = "磁盘总容量: " + systemEntity.diskTotal;
    getMainContainer().appendChild(line17);

    let line18 = document.createElement("div");
    line18.innerHTML = "空闲磁盘容量: " + systemEntity.diskFree;
    getMainContainer().appendChild(line18);

    let line19 = document.createElement("div");
    line19.innerHTML = "可用磁盘容量: " + systemEntity.diskUsable;
    getMainContainer().appendChild(line19);

    let line20 = document.createElement("div");
    line20.style.marginTop = "20px";
    line20.float = "left";
    line20.innerHTML = "数据库上次备份时间: " + new Date(systemEntity.osDate).format("yyyy-MM-dd hh:mm:ss") + " "
    + "缓存文件上次备份时间: " + new Date(systemEntity.osDate).format("yyyy-MM-dd hh:mm:ss");
    getMainContainer().appendChild(line20);


    let DBBackup = document.createElement("div");
    DBBackup.innerHTML = "数据库备份";
    DBBackup.className = "actionButton";
    DBBackup.style.width = "100px";
    getMainContainer().appendChild(DBBackup);

    let FileBackup = document.createElement("div");
    FileBackup.innerHTML = "缓存文件备份";
    FileBackup.className = "actionButton";
    FileBackup.style.width = "100px";
    FileBackup.style.marginLeft = "10px";
    getMainContainer().appendChild(FileBackup);


}