/**
 * Created by dingpengwei on 8/12/16.
 */
function init(containerView) {
    for (let index =0;index < 3;index++){
        let C_1 = document.createElement("div");
        C_1.className = "C_1";
        C_1.style.float = "none";
        if (index == 1){
            C_1.style.height = "100px";
        }
        let hrH1 = document.createElement("hr");
        hrH1.className = "hr_h";
        hrH1.style.marginTop = "10px";
        C_1.appendChild(hrH1);
        let C_2 = document.createElement("div");
        C_2.className = "C_1";
        C_2.style.width = "90%";
        C_2.style.height = "90%";
        C_1.appendChild(C_2);
        let labelEditable = document.createElement("div");
        labelEditable.className = "labelEditable";
        let label = document.createElement("div");
        label.innerHTML = "label" + index;
        label.className = "label";
        labelEditable.appendChild(label);
        C_2.appendChild(labelEditable);
        let clearFloat = document.createElement("div");
        clearFloat.className = "clearFloat";
        C_2.appendChild(clearFloat);

        let item = document.createElement("div");
        item.style.backgroundColor = "red";
        item.style.marginTop = "20px";
        item.style.width = "900px";
        item.style.height = "30px";
        let hrH2 = document.createElement("hr");
        hrH2.className = "hr_h";
        hrH2.style.marginTop = "20px";
        item.appendChild(hrH2);
        C_2.appendChild(item);



        containerView.appendChild(C_1);
    }
}