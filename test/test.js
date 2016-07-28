function draw() {
    var body = document.getElementById("body");
    var div = document.createElement("div");
    body.appendChild(div);
    alert("ok");
}
window.onload = draw();