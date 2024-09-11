import {addToLocalStorage, fetchData, LocalStorage} from "./app-algorithm.js";
import { embedElements, DomHelper} from "./embedel.js";



import "./style-main.css";
import "./taskfield.css";

const domController = (function(){
    const submitBtn = document.querySelector("input[type='submit']");
    const tabBtn = document.querySelectorAll("nav>ul:first-child>li");
    
    window.addEventListener("load", ()=>{
        tabBtn[0].click(); 
    })
    submitBtn.addEventListener("click", (event)=>{
        event.preventDefault();
        fetchData();
        displayData(event.target.name);
        submitBtn.parentNode.parentNode.parentNode.style = "display: none";
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
        ChildElement.createElement(ele);
        for(let index in ele){
            DomHelper.setAttributes(ele[index], attr[index]);
        }
        DomHelper.appendChildren(ele, 0);
        addEvent(ele[3], false);
        addEvent(ele[4], true);
        projectBtn.parentNode.insertBefore(ele[0], projectBtn);
        
    })
})()

//project creation or cancelling input using event listeners

function addEvent(target, para){
    target.addEventListener("click", (event)=>{
        if(para) {
            ChildElement.removeInput(event);
            return;
        };
        const value = event.target.parentNode.querySelector("input[type='text']").value;

        const newEle = ["div"];
        ChildElement.createElement(newEle);
        DomHelper.setAttributes(newEle[0], {"value": `${value}`, "name": "project", "class": "project-tab"});
        const node  =event.target.parentNode.parentNode;
        let childNode = node.querySelector("project-tab:last-of-type, ul:nth-child(2)");
        ChildElement.removeInput(event);
        childNode = Array.isArray(childNode)? childNode[0] : childNode ;
        DomHelper.textEmbed(newEle, [`# ${value}`]);
        addToLocalStorage(value, []);
        ChildElement.insert(node, newEle[0], childNode.nextSibling);
    })
}

//methods for child elements

class ChildElement{

    static removeInput(event){ //remove input element from projects
        return event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    }
    static createElement(element){  //create new elements
        for(let key in element){
            const ele  = document.createElement(element[key]);
            element[key] = ele;
        }
    }
    static insert(node, newEl, child){
        return node.insertBefore(newEl, child);
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

//delete todo's from local storage on user's request



export{displayData};