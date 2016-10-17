/**
 * Created by dingpengwei on 10/16/16.
 */
function sha256(text) {
    var buffer = new TextEncoder("utf-8").encode(text);
    return crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
        return hex(hash);
    });
}

function hex(buffer) {
    var hexCodes = [];
    var view = new DataView(buffer);
    for (var i = 0; i < view.byteLength; i += 4) {
        var value = view.getUint32(i)
        var stringValue = value.toString(16)
        var padding = '00000000'
        var paddedValue = (padding + stringValue).slice(-padding.length)
        hexCodes.push(paddedValue);
    }
    return hexCodes.join("");
}

sha256("foobar").then(function(digest) {
    console.log(digest);
});