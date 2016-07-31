/*! foodslab-back-end 2016-07-31 */
function httpGetAsync(a,b,c,d){var e=new XMLHttpRequest;e.onreadystatechange=function(){4==e.readyState&&200==e.status?b(e.responseText):c()},e.timeout=5e3,e.ontimeout=d,e.open("GET",a,!0),e.send(null)}function requestMenus(a){httpGetAsync(menuUrl,onDataCallback,onErrorCallback,onTimeoutCallback)}function onDataCallback(a){var b=JSON.parse(a),c=b.code,d=b.message,e=JSON.parse(b.data);console.log(c),console.log(d),console.log(e.length);for(var f=new Array,g=new Array,h=0;h<e.length;h++){var i=e[h].columns;"51bf4162-5270-11e6-8311-1cae145b8cab"==i.positionId?f.push(new TabItem(i.menuId,i.label,"horizontalIndexNormal","horizontalIndexSelect","horizontalIndexNormal")):"8e2e3fc7-1968-4f1b-bd4c-07794c5855b5"==i.positionId&&g.push(new TabItem(i.menuId,i.label,"verticalNormal","verticalSelected","verticalNormal","verticalNormalArrow","verticalSelectedArrow","verticalNormalArrow"))}initHorizontalTabHostView("header_menu",f,100,!0),initVerticalTabHostView("leftMenu",g,!0)}function onErrorCallback(){}function onTimeoutCallback(){}function CircleProgress(a){this.progress=document.getElementById(a),this.context=this.progress.getContext("2d"),this.centerX=this.progress.width/2,this.centerY=this.progress.height/2,this.radius=Math.min(this.progress.width,this.progress.height)/3,this.context.translate(this.centerX,this.centerY)}function getArcLocation(a,b){var c=a*Math.cos(b),d=a*Math.sin(b);return new Array(c,d)}function showLoadingView(){var a=document.createElement("div");a.id="mask",a.style.position="absolute",a.style.top=getScrollTop()+"px",a.style.backgroundColor="#CCCCCC",a.style.width="100%",a.style.height="100%",a.style.left="0px",a.style.zIndex="10",a.style.opacity="0.6",document.body.appendChild(a);var b=document.createElement("canvas");b.id="canvas",b.style.position="absolute",b.style.top=getScrollTop()+100+"px",b.style.backgroundColor="#00FF0000",b.style.left=document.body.clientWidth/2-200+"px",b.style.width="400px",b.style.height="200px",b.style.zIndex="10",b.style.opacity="0.9",document.body.appendChild(b),document.documentElement.style.overflow="hidden";var c=new CircleProgress("canvas");c.rotate(30),document.oncontextmenu=new Function("event.returnValue=false;"),document.onselectstart=new Function("event.returnValue=false;"),window.onhelp=new Function("event.returnValue=false;"),document.onkeydown=function(){window.event&&13==window.event.keyCode&&(window.event.returnValue=!1)}}function dismissLoadingView(){document.onkeydown=null,document.documentElement.style.overflow="scroll",clearInterval(CircleProgress.prototype.task),document.oncontextmenu=new Function("event.returnValue=true;"),document.onselectstart=new Function("event.returnValue=true;"),document.body.removeChild(document.getElementById("mask")),document.body.removeChild(document.getElementById("canvas")),document.body.removeChild(document.getElementById("button"))}function getScrollTop(){var a;return window.pageYOffset?a=window.pageYOffset:document.compatMode&&"BackCompat"!=document.compatMode?a=document.documentElement.scrollTop:document.body&&(a=document.body.scrollTop),a}function TabItem(a,b,c,d,e,f,g,h,i,j){this.id=a,this.displayName=b,this.normalClassName=c,this.selectedClassName=d,this.currentClassName=e,this.verticalNormalArrowClassName=f,this.verticalSelectedArrowClassName=g,this.verticalCurrentArrowClassName=h,this.width=i,this.height=j}function addExclusiveId(a){null!==a&&void 0!==a&&""!==a&&exclusiveIds.indexOf(a)<0&&exclusiveIds.push(a)}function initHorizontalTabHostView(a,b,c,d){var e=document.getElementById(a),f=parseInt(e.clientWidth),g=parseInt(e.clientHeight),h=b.length,i=(f-3*(h-1))/h;null!=c&&(i=c);for(var j=0;j<h;j++){var k=b[j];k.width=i,k.height=g,createTabItem(e,k,!1)}d&&addExclusiveId(a)}function initVerticalTabHostView(a,b,c){for(var d=document.getElementById(a),e=parseInt(d.clientWidth),f=parseInt(d.clientHeight),g=b.length,h=f/g,i=0;i<g;i++){var j=b[i];j.width=e,j.height=h,createTabItem(d,j,!0)}c&&addExclusiveId(a)}function createTabItem(a,b,c){var d=document.createElement("div");if(d.innerHTML=b.displayName,d.style.width=b.width+"px",d.className=b.currentClassName,d.normalClassName=b.normalClassName,d.selectedClassName=b.selectedClassName,d.addEventListener("click",onTabItemClick),c){var e=document.createElement("div");e.tagName=e.className=b.verticalCurrentArrowClassName,e.normalClassName=b.verticalNormalArrowClassName,e.selectedClassName=b.verticalSelectedArrowClassName,d.appendChild(e)}a.appendChild(d)}function resetTabHost(a){for(var b=document.getElementById(a),c=b.childElementCount,d=0;d<c;d++)b.childNodes[d].className=b.childNodes[d].normalClassName,b.childNodes[d].childNodes.length>1&&(b.childNodes[d].childNodes[1].className=b.childNodes[d].childNodes[1].normalClassName,b.childNodes[1].className=b.childNodes[1].normalClassName)}function onTabItemClick(){for(var a=this.parentNode.childElementCount,b=0;b<a;b++)this.parentNode.childNodes[b].className=this.normalClassName,this.childNodes.length>1&&(this.parentNode.childNodes[b].childNodes[1].className=this.parentNode.childNodes[b].childNodes[1].normalClassName,this.childNodes[1].className=this.childNodes[1].normalClassName);if(this.className=this.selectedClassName,this.childNodes.length>1&&(this.childNodes[1].className=this.childNodes[1].selectedClassName),exclusiveIds.indexOf(this.parentNode.id)>=0)for(var b=0;b<exclusiveIds.length;b++)this.parentNode.id!==exclusiveIds[b]&&resetTabHost(exclusiveIds[b]);new Toast("body",null,null,200,30).show(this.childNodes[0].data)}function Toast(a,b,c,d,e,f){this.view=document.getElementById(a),this.startX=b,this.startY=c,this.width=d,this.height=e,this.className=f,this.opacity=1,this.step=.01,this.duration=10}function dismiss(){document.body.removeChild(document.getElementById("toastView"))}function isNull(a){return null===a||void 0===a||""===a}const menuUrl="http://localhost:8080/menus";CircleProgress.prototype.drawCircleProgress=function(){this.context.clearRect(0-this.centerX,0-this.centerY,2*this.centerX,2*this.centerY);for(var a=15,b=0,c=a,d=0;d<15;d++){var e=Math.acos((2*Math.pow(this.radius,2)-Math.pow(a+c,2)-5)/(2*Math.pow(this.radius,2)))*(180/Math.PI),f=getArcLocation(this.radius,-(e+b)*Math.PI/180);this.context.fillStyle="#FFFFFF",this.context.beginPath(),this.context.arc(f[0],f[1],c,0*Math.PI,2*Math.PI,!0),this.context.closePath(),this.context.fill(),a=c,c--,b+=e}},CircleProgress.prototype.rotate=function(a){this.drawCircleProgress();var b=this;CircleProgress.prototype.task=setInterval(function(){b.context.rotate(10*Math.PI/180),b.drawCircleProgress()},a)};var exclusiveIds=new Array;Toast.prototype.show=function(a){var b=this.view.offsetLeft+this.view.clientWidth/4,c=this.view.offsetTop,d=this.view.clientWidth/2,e=this.view.clientHeight/2,f=document.createElement("div");f.id="toastView",f.style.styleFloat="left",f.style.position="fixed",f.style.zIndex="10",isNull(this.startX)||(b=this.startX),isNull(this.startY)||(c=this.startY),isNull(this.width)||(d=this.width,isNull(this.startX)&&(b=this.view.clientWidth/2-d/2)),isNull(this.height)||(e=this.height),isNull(this.className)?(f.style.left=b+"px",f.style.top=c+"px",f.style.width=d+"px",f.style.height=e+"px",f.style.lineHeight=e+"px",f.style.textAlign="center",f.style.color="#FFFFFF",f.style.backgroundColor="#CCCCCC",f.style.opacity=this.opacity,f.style.borderRight="1px solid #999999",f.style.borderBottom="1px solid #999999",f.style.borderLeft="1px solid #999999",f.style.borderBottomRightRadius="5px",f.style.borderBottomLeftRadius="5px"):f.className=this.className,isNull(a)?f.innerHTML="you can set message here":f.innerHTML=a,document.body.appendChild(f);var g=this.opacity,h=this.step,i=setTimeout(function(){var a=setInterval(function(){g<0?(clearInterval(a),dismiss()):f.style.opacity=g,g-=h},this.duration);clearTimeout(i)},1e3)};