import {fetchData, LocalStorage} from "./app-algorithm.js";
import { embedElements, DomHelper} from "./embedel.js";



import "./style-main.css";
import "./taskfield.css";

const domController = (function(){
    const submitBtn = document.querySelector("input[type='submit']");
    const tabBtn = document.querySelectorAll("nav>ul>li");
    

    submitBtn.addEventListener("click", (event)=>{
        event.preventDefault();
        fetchData();
        displayData(event.target.name);
    })
    tabBtn.forEach((btn)=>{
        btn.addEventListener("click", (event)=>{
            event.target.style = `background-color: ${ComputedStyles.getStyle(event.target, "background-color")}`;
            modifyTab(event.target);
            displayData(event.target.value);
        })
    })
})()

// new project input

const newProject = (function(){
    const projectBtn = document.querySelector("#add-new-proj-button");

    projectBtn.addEventListener("click", ()=>{
        const ele = ["div", "label", "input", "input", "input"];
        const attr = [
            {"class": "project"},
            {"for": "project-heading"},
            {"id": "project-heading", "type": "text"},
            {"type": "submit", "id": "proj-add-btn", "value": "Add"},
            {"type": "button", "id": "proj-cancel-btn", "value": "cancel"}
        ]
        createElement(ele);
        for(let index in ele){
            DomHelper.setAttributes(ele[index], attr[index]);
        }
        DomHelper.appendChildren(ele, 0);
        addEvent(ele[3], false);
        addEvent(ele[4], true);
        projectBtn.parentNode.insertBefore(ele[0], projectBtn);
        
    })
})()

//project creation or cancelling input

function addEvent(target, para){
    target.addEventListener("click", (event)=>{
        if(para) removeInput(event);
        const value = event.targe.parentNode.querySelector("input[type='text']").value;

        const newEle = createElement(["div"]);
        DomHelper.setAttributes(newEle, {"value": `${value}`, "name": `${value}`, "class": "project-tab"});
        const node  =event.targe.parentNode.parentNode;
        const childNode = parentNode.querySelector("project-tab:last-of-type, ul:nth-child(2)");
        removeInput(event);
        node.insertBefore(newEle, childNode);
        
    })
}
function removeInput(event){
    return event.targe.parentNode.parentNode.removeChild(event.target);
}

//create new elements
function createElement(element){
    for(let key in element){
        const ele  = document.createElement(element[key]);
        element[key] = ele;
    }
}

//modify the tab menu to it's usual background color

function modifyTab(target){
    const submitBtn = document.querySelectorAll("nav>ul>li");
    submitBtn.forEach((node)=>{
        if(node === target) return;
        node.style = `background-color: ${ComputedStyles.getStyle(node.parentNode,"background-color")}`;
    })
}

const checkPriority = (function(){
    const button = document.querySelectorAll("input[type='button']");
    button.forEach((btn)=>{
        btn.addEventListener("click", (event)=> {
            modifyInput(event.target);
            restoreInput(event.target);
        })
    })
})()

class ComputedStyles {
    static computedStyles;
    static getStyle(target, property){
        this.computedStyles = getComputedStyle(target);
        return this.computedStyles.getPropertyValue(property);
    }
    static defaultStyle(target, property){
        this.computedStyles = getComputedStyle(target);
        //just a check up for future reference where we can get the default styles applied on a certain element in a specific browser
    }
}

function modifyInput(target) {
    target.setAttribute("checked", "true");
    const appliedStyle = ComputedStyles.getStyle(target, "background-color");

    target.style = `background-color: ${appliedStyle}; color: white`;
}

function restoreInput(target){
    const button = document.querySelectorAll("input[type='button']");

    button.forEach((btn)=>{
        if(btn === target) return;

        btn.removeAttribute("checked");
        const backgroundColor = ComputedStyles.getStyle(btn, "background-color");
        if(backgroundColor === 'rgba(0, 0, 0, 0)') return;
        btn.style = `color: ${backgroundColor}; background-color: none`;
    })
}


function displayData(value){
    embedElements(value);
}

function deleteBtn(){
    const deleteBtn = document.querySelectorAll(".delete-btn");
    let name ;
    deleteBtn.forEach((delBtn)=>{
        delBtn.addEventListener("click", (event)=> {
            name = event.target;
            LocalStorage.deleteFromLocalStore(event.target);
        });
    })
    displayData(name)
}

//functions for each tab menu


export{displayData};