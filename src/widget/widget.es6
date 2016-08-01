/**
 * Created by dingpengwei on 8/1/16.
 */


/**
 * 双击编辑对象
 */
class WidgetEditable {
    constructor(initClassName, normalClassName, selectedClassName) {
        this.initClassName = initClassName; // 初始化显示的状态, 0为不可编辑,1为可以编辑
        this.normalClassName = normalClassName;
        this.selectClassName = selectedClassName;
        this.displayData = "dingpengwei";
    }
}


function initWidgetEditable(container, widgetEditable) {
    container.innerHTML = null;
    if (widgetEditable.initClassName == widgetEditable.normalClassName) {
        let username = document.createElement("div");
        username.className = "widget_editable_block";
        username.innerHTML = widgetEditable.displayData;
        console.log(widgetEditable.displayData);
        container.appendChild(username);
        username.addEventListener("dblclick", function () {
            widgetEditable.initClassName = widgetEditable.selectClassName;
            initWidgetEditable(container, widgetEditable)
        });
    } else if (widgetEditable.initClassName == widgetEditable.selectClassName) {
        let input = document.createElement("input");
        input.className = "widget_editable_block";
        input.focus();
        input.type = "text";
        input.style.fontSize = 1 + "rem";
        input.value = widgetEditable.displayData;
        let blockButton = document.createElement("div");
        blockButton.type = "button";
        blockButton.className = "widget_editable_button";
        blockButton.innerHTML = "禁用";
        let deleteButton = document.createElement("div");
        deleteButton.type = "button";
        deleteButton.className = "widget_editable_button";
        deleteButton.innerHTML = "删除";
        container.appendChild(input);
        container.appendChild(blockButton);
        container.appendChild(deleteButton);
        input.addEventListener("blur", function () {
            widgetEditable.initClassName = widgetEditable.normalClassName;
            widgetEditable.displayData = input.value;
            initWidgetEditable(container, widgetEditable)
        });
    }
}