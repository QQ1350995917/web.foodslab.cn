/*! foodslab-back-end 2016-08-05 */
"use strict";function resetView(){var a=document.getElementById(MAIN_TITLE_ID);a.innerHTML=null;var b=document.getElementById(MAIN_CONTENT_ID);b.innerHTML=null}function asyncRequestByGet(a,b,c,d){var e=new XMLHttpRequest;e.onreadystatechange=function(){4==e.readyState&&200==e.status&&b(e.responseText)},e.timeout=5e3,e.ontimeout=d,e.open("GET",a,!0),e.send(null)}function asyncRequestByPost(a,b,c,d,e){var f=new XMLHttpRequest;f.onreadystatechange=function(){4==f.readyState&&200==f.status?b(f.responseText):c()},f.timeout=5e3,f.ontimeout=d,f.open("POST",a,!0),f.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),f.send(encodeURI(e))}function checkResponsDataFormat(a){return!0}function applicationOnload(){requestMenus("")}function onRequestError(){}function onRequestTimeout(){}function requestMenus(a){asyncRequestByGet(menuUrl,onMenuDataCallback,onRequestError,onRequestTimeout)}function onMenuDataCallback(a){for(var b=JSON.parse(a),c=(b.code,b.message,b.data),d=new Array,e=new Array,f=0;f<c.length;f++){var g=c[f];1==g.status&&(g.menuLabel=g.label,APP_CONST_MENU.push(g)),"51bf4162-5270-11e6-8311-1cae145b8cab"==g.positionId?d.push(new TabItem(g.menuId,g.label,g.method,"horizontalIndexNormal","horizontalIndexSelect","horizontalIndexNormal")):"8e2e3fc7-1968-4f1b-bd4c-07794c5855b5"==g.positionId&&e.push(new TabItem(g.menuId,g.label,g.method,"verticalNormal","verticalSelected","verticalNormal","verticalNormalArrow","verticalSelectedArrow","verticalNormalArrow"))}initHorizontalTabHostView("header_menu",d,100,!0),initVerticalTabHostView("leftMenu",e,!0)}function onFrameMenuItemClick(a){resetView(),"manager"==a?managerIndex():"product"==a&&productSeries()}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function managerIndex(){var a=BASE_PATH+"/manager";asyncRequestByGet(a,onIndexDataCallback,onRequestError(),onRequestTimeout())}function onIndexDataCallback(a){var b=checkResponsDataFormat(a);if(b){var c=new Array(new TabItem("1","管理员信息","","horizontalNormal","horizontalSelected","horizontalSelected"));initHorizontalTabHostView(MAIN_TITLE_ID,c);for(var d=JSON.parse(a),e=d.data,f=new Array,g=0;g<e.length;g++){var h=e[g];f.push(new ManagerEntity(h.managerId,h.username,h.level,h.queue,h.status,h.pId,h.managerMenuEntitiesMapping))}var i=document.createElement("div");i.id="managerContainer",i.className="managerContainer",document.getElementById(MAIN_CONTENT_ID).appendChild(i),initManagerList(i,f)}}function check(a){var b=BASE_PATH+"/manager/check";asyncRequestByPost(b,function(a){var b=JSON.parse(a),c=b.data;"true"==c?(new Toast).show("用户名已经存在"):(new Toast).show("用户名可用")},onRequestError,onRequestTimeout,"username="+a)}function create(a,b,c){for(var d=BASE_PATH+"/manager/create",e="",f=0;f<c.length;f++){var g=c[f];e=e+","+g.menuId+":"+g.label}var h="pid=xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx&username="+a+"&password="+b+"&menus="+e;asyncRequestByPost(d,function(a){var b=JSON.parse(a),c=b.data;"false"==c?(new Toast).show("创建失败"):(new Toast).show("创建成功")},onRequestError,onRequestTimeout,h)}function update(a,b,c,d){for(var e=BASE_PATH+"/manager/update",f="",g=0;g<d.length;g++){var h=d[g];f=f+","+h.menuId+":"+h.menuLabel}var i="managerId="+a+"&username="+b+"&password="+c+"&menus="+f;asyncRequestByPost(e,function(a){var b=JSON.parse(a),c=b.data;"false"==c?(new Toast).show("更新失败"):(new Toast).show("更新成功")},onRequestError,onRequestTimeout,i)}function initManagerList(a,b){a.innerHTML=null;var c=b.length;a.style.height=240*c+"px";for(var d=0;d<c;d++)a.appendChild(createManagerItemView(b[d]));var e=document.createElement("button");e.className="managerItem_save",e.innerHTML="添加管理员",a.appendChild(e),e.onclick=function(){b.push(new ManagerEntity(APP_CONST_CLIENT_ID,"default",1,1,"",new Array)),initManagerList(a,b)}}function createManagerItemView(a){var b=document.createElement("div");b.className="managerItemContainer";var c=document.createElement("div");c.className="managerItem_rowLevel1";var d=document.createElement("hr");d.className="managerItem_connectLineHLevel1",c.appendChild(d);var e=document.createElement("div");e.className="managerItem_managerName",e.innerHTML=a.username,c.appendChild(initWidgetEditable1(e,a)),b.appendChild(c);var f=document.createElement("hr");f.className="managerItem_connectLineV",b.appendChild(f);var g=document.createElement("div");g.className="managerItem_rowLevel2";var h=document.createElement("hr");h.className="managerItem_connectLineHLevel2",g.appendChild(h);var i=document.createElement("div");i.className="managerItem_label",i.innerHTML="密码:",g.appendChild(i);var j=document.createElement("div");j.className="managerItem_managerEditor",g.appendChild(initWidgetEditable2(j,a,"password1")),b.appendChild(g);var k=document.createElement("div");k.className="managerItem_rowLevel2";var l=document.createElement("hr");l.className="managerItem_connectLineHLevel2",k.appendChild(l);var m=document.createElement("div");m.className="managerItem_label",m.innerHTML="确认:",k.appendChild(m);var n=document.createElement("div");if(n.className="managerItem_managerEditor",k.appendChild(initWidgetEditable2(n,a,"password2")),b.appendChild(k),1==a.level){var o=document.createElement("div");o.className="managerItem_rowLevel2";var p=document.createElement("hr");p.className="managerItem_connectLineHLevel2",o.appendChild(p);var q=document.createElement("div");q.className="managerItem_label",q.innerHTML="权限:",o.appendChild(q);var r=document.createElement("div");r.className="managerItem_managerEditor",r.style.width="90%";for(var s=void 0==a.managerMenuEntitiesMapping?new Array:a.managerMenuEntitiesMapping,t=new Array,u=0;u<APP_CONST_MENU.length;u++){for(var v=APP_CONST_MENU[u],w=void 0,x=0;x<s.length;x++){var y=s[x];if(v.menuId==y.menuId){w=1;break}}w||t.push(v)}initWidgetSelector(r,s,t),o.appendChild(r),b.appendChild(o)}var z=document.createElement("div");z.className="managerItem_rowLevel2";var A=document.createElement("hr");A.className="managerItem_connectLineHLevel2",z.appendChild(A);var B=document.createElement("button");return B.className="managerItem_save",B.innerHTML="确认保存",B.onclick=function(){var b=r.menus;a.managerId==APP_CONST_CLIENT_ID?create(e.innerText,j.password,b):update(a.managerId,e.innerText,j.password,b)},z.appendChild(B),b.appendChild(z),b}function initWidgetEditable1(a,b){if(a.innerHTML=null,void 0==b.currentUserNameStatus||"normalDisplay"==b.currentUserNameStatus){var c=document.createElement("div");c.className="widget_editable_block",c.innerHTML=b.username,a.appendChild(c),c.addEventListener("dblclick",function(){b.currentUserNameStatus="selectDisplay",1==b.level&&(a.style.width="300px"),initWidgetEditable1(a,b)})}else"selectDisplay"==b.currentUserNameStatus&&!function(){var c=document.createElement("input");if(c.className="widget_editable_block",c.type="text",c.style.fontSize="1rem",c.value=b.username,a.appendChild(c),1==b.level&&b.managerId!=APP_CONST_CLIENT_ID){var d=document.createElement("div");d.type="button",d.className="widget_editable_button",d.innerHTML="禁用";var e=document.createElement("div");e.type="button",e.className="widget_editable_button",e.innerHTML="删除",a.appendChild(d),a.appendChild(e)}c.addEventListener("blur",function(){a.style.width="200px",b.currentUserNameStatus="normalDisplay",b.username=c.value,initWidgetEditable1(a,b),check(b.username)})}();return a}function initWidgetEditable2(a,b,c){if(a.innerHTML=null,void 0==b.currentPassword1Status||"normalDisplay"==b.currentPassword1Status){var d=document.createElement("div");d.className="widget_editable_block",d.id=c,void 0!=b.passowrd1&&""!=b.passowrd1&&(d.value=b.passowrd1,d.innerText="......"),a.appendChild(d),d.addEventListener("dblclick",function(){b.currentPassword1Status="selectDisplay",initWidgetEditable2(a,b)})}else"selectDisplay"==b.currentPassword1Status&&!function(){var d=document.createElement("input");d.innerHTML=null,d.id=c,d.className="widget_editable_block",d.type="password",d.style.fontSize="1rem",a.appendChild(d),d.addEventListener("blur",function(){b.currentPassword1Status="normalDisplay",b.passowrd1=d.value,a.password=d.value,initWidgetEditable2(a,b)})}();return a}function initWidgetSelector(a,b,c){a.innerHTML=null;var d=b.length;a.menus=b;for(var e=function(e){var f=b[e],g=document.createElement("div");g.className="selector_selected",g.innerHTML=f.menuLabel;var h=document.createElement("div");h.innerHTML="X",h.className="selector_selected_delete",g.appendChild(h),g.onmousemove=function(){h.style.visibility="visible",h.onclick=function(){var g=b.slice(0,e),h=b.slice(e+1,d);b=g.concat(h),c.push(f),initWidgetSelector(a,b,c)}},g.onmouseout=function(){h.style.visibility="hidden"},a.appendChild(g)},f=0;f<d;f++)e(f);var g=c.length;g>0&&!function(){var d=document.createElement("select");d.className="selector_selected",d.options.add(new Option("请选择","请选择")),a.appendChild(d);for(var e=0;e<g;e++){var f=new Option(c[e].label,c[e].menuId);d.options.add(f)}d.onchange=function(){if(d.selectedIndex>0){var e=c[d.selectedIndex-1],f=c.slice(0,d.selectedIndex-1),h=c.slice(d.selectedIndex,g);c=f.concat(h),b.push(new ManagerMenuEntity("",e.menuId,e.label)),initWidgetSelector(a,b,c)}}}()}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function productSeries(){var a=BASE_PATH+"/product";asyncRequestByGet(a,onSeriesDataCallBack,onRequestError(),onRequestTimeout())}function onSeriesDataCallBack(a){var b=checkResponsDataFormat(a);if(b){var c=JSON.parse(a),d=c.data;initSeriesListView(document.getElementById(MAIN_CONTENT_ID),d)}}function initSeriesListView(a,b){resetView();var c=document.createElement("div");c.innerHTML="产品总览",c.className="horizontalSelected",c.style.width="100%",document.getElementById(MAIN_TITLE_ID).appendChild(c);for(var d=b.length,e=0;e<d;e++)initSeriesItemView(a,b[e]);var f=document.createElement("button");f.className="managerItem_save",f.innerHTML="添加新系列",a.appendChild(f),f.onclick=function(){}}function initSeriesItemView(a,b){var c=document.createElement("div");c.className="SS_IC_SUB";var d=document.createElement("hr");d.className="SS_IC_HL",c.appendChild(d);var e=document.createElement("hr");e.className="SS_IC_VL",c.appendChild(e);var f=document.createElement("div");f.className="SS_IC_R",f.innerHTML=b.label,c.appendChild(f),a.appendChild(c);for(var g=b.typeEntities.length,h=0;h<g;h++){var i=document.createElement("div");i.className="SS_IC_SUB";var j=document.createElement("hr");j.className="SS_IC_VL",j.style.marginLeft="20px",i.appendChild(j);var k=document.createElement("hr");k.className="SS_IC_HL",i.appendChild(k);var l=document.createElement("hr");l.className="SS_IC_VL",l.style.height="32px",i.appendChild(l);var m=document.createElement("div");m.className="SS_IC_R",m.innerHTML=b.typeEntities[h].label,i.appendChild(m),a.appendChild(i)}var n=document.createElement("div");n.className="SS_IC_SUB",n.style.height="20px",a.appendChild(n)}function CircleProgress(a){this.progress=document.getElementById(a),this.context=this.progress.getContext("2d"),this.centerX=this.progress.width/2,this.centerY=this.progress.height/2,this.radius=Math.min(this.progress.width,this.progress.height)/3,this.context.translate(this.centerX,this.centerY)}function getArcLocation(a,b){var c=a*Math.cos(b),d=a*Math.sin(b);return new Array(c,d)}function showLoadingView(){var a=document.createElement("div");a.id="mask",a.style.position="absolute",a.style.top=getScrollTop()+"px",a.style.backgroundColor="#CCCCCC",a.style.width="100%",a.style.height="100%",a.style.left="0px",a.style.zIndex="10",a.style.opacity="0.6",document.body.appendChild(a);var b=document.createElement("canvas");b.id="canvas",b.style.position="absolute",b.style.top=getScrollTop()+100+"px",b.style.backgroundColor="#00FF0000",b.style.left=document.body.clientWidth/2-200+"px",b.style.width="400px",b.style.height="200px",b.style.zIndex="10",b.style.opacity="0.9",document.body.appendChild(b),document.documentElement.style.overflow="hidden";var c=new CircleProgress("canvas");c.rotate(30),document.oncontextmenu=new Function("event.returnValue=false;"),document.onselectstart=new Function("event.returnValue=false;"),window.onhelp=new Function("event.returnValue=false;"),document.onkeydown=function(){window.event&&13==window.event.keyCode&&(window.event.returnValue=!1)}}function dismissLoadingView(){document.onkeydown=null,document.documentElement.style.overflow="scroll",clearInterval(CircleProgress.prototype.task),document.oncontextmenu=new Function("event.returnValue=true;"),document.onselectstart=new Function("event.returnValue=true;"),document.body.removeChild(document.getElementById("mask")),document.body.removeChild(document.getElementById("canvas")),document.body.removeChild(document.getElementById("button"))}function getScrollTop(){var a;return window.pageYOffset?a=window.pageYOffset:document.compatMode&&"BackCompat"!=document.compatMode?a=document.documentElement.scrollTop:document.body&&(a=document.body.scrollTop),a}function TabItem(a,b,c,d,e,f,g,h,i,j,k){this.id=a,this.displayName=b,this.method=c,this.normalClassName=d,this.selectedClassName=e,this.currentClassName=f,this.verticalNormalArrowClassName=g,this.verticalSelectedArrowClassName=h,this.verticalCurrentArrowClassName=i,this.width=j,this.height=k}function addExclusiveId(a){null!==a&&void 0!==a&&""!==a&&exclusiveIds.indexOf(a)<0&&exclusiveIds.push(a)}function initHorizontalTabHostView(a,b,c,d){var e=document.getElementById(a),f=parseInt(e.clientWidth),g=parseInt(e.clientHeight),h=b.length,i=(f-3*(h-1))/h;null!=c&&(i=c);for(var j=0;j<h;j++){var k=b[j];k.width=i,k.height=g,createTabItem(e,k,!1)}d&&addExclusiveId(a)}function initVerticalTabHostView(a,b,c){for(var d=document.getElementById(a),e=parseInt(d.clientWidth),f=parseInt(d.clientHeight),g=b.length,h=f/g,i=0;i<g;i++){var j=b[i];j.width=e,j.height=h,createTabItem(d,j,!0)}c&&addExclusiveId(a)}function createTabItem(a,b,c){var d=document.createElement("div");if(d.innerHTML=b.displayName,d.style.width=b.width+"px",d.className=b.currentClassName,d.normalClassName=b.normalClassName,d.selectedClassName=b.selectedClassName,d.method=b.method,d.addEventListener("click",onTabItemClick),c){var e=document.createElement("div");e.className=b.verticalCurrentArrowClassName,e.normalClassName=b.verticalNormalArrowClassName,e.selectedClassName=b.verticalSelectedArrowClassName,d.appendChild(e)}a.appendChild(d)}function resetTabHost(a){for(var b=document.getElementById(a),c=b.childElementCount,d=0;d<c;d++)b.childNodes[d].className=b.childNodes[d].normalClassName,b.childNodes[d].childNodes.length>1&&(b.childNodes[d].childNodes[1].className=b.childNodes[d].childNodes[1].normalClassName,b.childNodes[1].className=b.childNodes[1].normalClassName)}function onTabItemClick(){for(var a=this.parentNode.childElementCount,b=0;b<a;b++)this.parentNode.childNodes[b].className=this.normalClassName,this.childNodes.length>1&&(this.parentNode.childNodes[b].childNodes[1].className=this.parentNode.childNodes[b].childNodes[1].normalClassName,this.childNodes[1].className=this.childNodes[1].normalClassName);if(this.className=this.selectedClassName,this.childNodes.length>1&&(this.childNodes[1].className=this.childNodes[1].selectedClassName),exclusiveIds.indexOf(this.parentNode.id)>=0)for(var b=0;b<exclusiveIds.length;b++)this.parentNode.id!==exclusiveIds[b]&&resetTabHost(exclusiveIds[b]);onFrameMenuItemClick(this.method),new Toast(TOAST_CONTAINER_ID,null,null,200,30).show(this.childNodes[0].data)}function Toast(a,b,c,d,e,f){void 0!=a&&""!=a&&null!=a||(a="body"),0!=d&&void 0!=d&&""!=d&&null!=d||(d=200),0!=e&&void 0!=e&&""!=e&&null!=e||(e=30),this.view=document.getElementById(a),this.startX=b,this.startY=c,this.width=d,this.height=e,this.className=f,this.opacity=1,this.step=.01,this.duration=10}function dismiss(){document.body.removeChild(document.getElementById("toastView"))}function isNull(a){return null===a||void 0===a||""===a}var BASE_PATH="http://localhost:8080/foodslab",MAIN_TITLE_ID="main_title",MAIN_CONTENT_ID="main_content_container",TOAST_CONTAINER_ID="body",APP_CONST_MENU=new Array,APP_CONST_CLIENT_ID="clientId",menuUrl=BASE_PATH+"/menus",_createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),ManagerEntity=function(){function a(b,c,d,e,f,g,h){_classCallCheck(this,a),this.managerId=b,this.username=c,this.level=d,this.queue=e,this.status=f,this.pId=g,this.managerMenuEntitiesMapping=h,this.isUsernameU=!1,this.password="",this.isPasswordU=!1,this.isStatusU=!1}return _createClass(a,[{key:"setUsernameUpdate",value:function(a){this.isUsernameU=a}},{key:"setPassword",value:function(a){this.password=a}},{key:"setPasswordUpdate",value:function(a){this.isPasswordU=a}},{key:"setPasswordUpdate",value:function(a){this.isStatusU=isStatusU}},{key:"toString",value:function(){return"("+this.managerId+", "+this.username+")"}}]),a}(),ManagerMenuEntity=function(){function a(b,c,d){_classCallCheck(this,a),this.managerId=b,this.menuId=c,this.menuLabel=d}return _createClass(a,[{key:"toString",value:function(){return"("+this.managerId+", "+this.username+")"}}]),a}(),SeriesEntity=function a(b,c,d,e,f,g){_classCallCheck(this,a),this.seriesId=b,this.label=c,this.description=d,this.queue=e,this.status=f,this.typeEntities=g};CircleProgress.prototype.drawCircleProgress=function(){this.context.clearRect(0-this.centerX,0-this.centerY,2*this.centerX,2*this.centerY);for(var a=15,b=0,c=a,d=0;d<15;d++){var e=Math.acos((2*Math.pow(this.radius,2)-Math.pow(a+c,2)-5)/(2*Math.pow(this.radius,2)))*(180/Math.PI),f=getArcLocation(this.radius,-(e+b)*Math.PI/180);this.context.fillStyle="#FFFFFF",this.context.beginPath(),this.context.arc(f[0],f[1],c,0*Math.PI,2*Math.PI,!0),this.context.closePath(),this.context.fill(),a=c,c--,b+=e}},CircleProgress.prototype.rotate=function(a){this.drawCircleProgress();var b=this;CircleProgress.prototype.task=setInterval(function(){b.context.rotate(10*Math.PI/180),b.drawCircleProgress()},a)};var exclusiveIds=new Array;Toast.prototype.show=function(a){var b=this.view.offsetLeft+this.view.clientWidth/4,c=this.view.offsetTop,d=this.view.clientWidth/2,e=this.view.clientHeight/2,f=document.createElement("div");f.id="toastView",f.style.styleFloat="left",f.style.position="fixed",f.style.zIndex="10",isNull(this.startX)||(b=this.startX),isNull(this.startY)||(c=this.startY),isNull(this.width)||(d=this.width,isNull(this.startX)&&(b=this.view.clientWidth/2-d/2)),isNull(this.height)||(e=this.height),isNull(this.className)?(f.style.left=b+"px",f.style.top=c+"px",f.style.width=d+"px",f.style.height=e+"px",f.style.lineHeight=e+"px",f.style.textAlign="center",f.style.color="#FFFFFF",f.style.backgroundColor="#CCCCCC",f.style.opacity=this.opacity,f.style.borderRight="1px solid #999999",f.style.borderBottom="1px solid #999999",f.style.borderLeft="1px solid #999999",f.style.borderBottomRightRadius="5px",f.style.borderBottomLeftRadius="5px"):f.className=this.className,isNull(a)?f.innerHTML="you can set message here":f.innerHTML=a,document.body.appendChild(f);var g=this.opacity,h=this.step,i=setTimeout(function(){var a=setInterval(function(){g<0?(clearInterval(a),dismiss()):f.style.opacity=g,g-=h},this.duration);clearTimeout(i)},1e3)};