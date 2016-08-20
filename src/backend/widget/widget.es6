/**
 * Created by dingpengwei on 8/1/16.
 */

class SelectorItem{
    constructor(dataId, displayLabel) {
        this.dataId = dataId;
        this.displayLabel = displayLabel;
    }
}

function initWidgetSelector(container,selected, options) {
    container.innerHTML = null;
    let selectedSize = selected.length;
    for (let index =0;index<selectedSize;index++){
        let selectorItem = selected[index];
        let displayLabel = document.createElement("div");
        displayLabel.className = "selector_selected";
        displayLabel.innerHTML = selectorItem.displayLabel;
        let displayLabelDelete = document.createElement("div");
        displayLabelDelete.innerHTML = "X";
        displayLabelDelete.className = "selector_selected_delete";
        displayLabel.appendChild(displayLabelDelete);
        displayLabel.onmousemove = function () {
            displayLabelDelete.style.visibility = "visible";
            displayLabelDelete.onclick = function () {
                let selected1 = selected.slice(0,index);
                let selected2 = selected.slice(index + 1,selectedSize);
                selected = selected1.concat(selected2);
                options.push(selectorItem);
                console.log(selected.length + " = " + options.length);
                initWidgetSelector(container,selected,options);
            }
        }
        displayLabel.onmouseout = function () {
            displayLabelDelete.style.visibility = "hidden";
        }

        container.appendChild(displayLabel);
    }
    let optionsSize = options.length;
    if (optionsSize > 0){
        let selector = document.createElement("select");
        selector.className = "selector_selected";
        selector.options.add(new Option("请选择","请选择"));
        container.appendChild(selector);
        for (let index =0;index<optionsSize;index++){
            let option = new Option(options[index].displayLabel,options[index].displayLabel);
            selector.options.add(option);
        }
        selector.onchange = function () {
            if(selector.selectedIndex > 0){
                let selectedOption = options[selector.selectedIndex -1];
                let options1 = options.slice(0,selector.selectedIndex -1);
                let options2 = options.slice(selector.selectedIndex,optionsSize);
                options = options1.concat(options2);
                selected.push(selectedOption);
                initWidgetSelector(container,selected,options);
            }
        };
    }
}



/**
 * 双击编辑对象
 */
class WidgetEditable {
    constructor(initClassName, normalClassName, selectedClassName) {
        this.initClassName = initClassName; // 初始化显示的状态, 0为不可编辑,1为可以编辑
        this.normalClassName = normalClassName;
        this.selectClassName = selectedClassName;
        this.displayData = "双击试试";
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