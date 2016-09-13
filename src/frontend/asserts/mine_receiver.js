/**
 * Created by dingpengwei on 9/8/16.
 */
function requestReceiver(accountId) {
    let mainView = document.getElementById(MAIN);
    mainView.innerHTML = null;

    let url = BASE_PATH + "order/retrieve?accountId=" + accountId;
    asyncRequestByGet(url, function (data) {
        var result = checkResponseDataFormat(data);
        if (result) {
            var jsonData = JSON.parse(data);
        }
    }, onErrorCallback, onTimeoutCallback);
}