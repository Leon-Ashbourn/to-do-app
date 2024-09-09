import {fetchData, LocalStorage} from "./app-algorithm.js";
import { embedElements, inboxData } from "./embedel.js";

import "./style-main.css";
import "./taskfield.css";
const domController = (function(){
    const submitBtn = document.querySelector("input[type='submit']");
    document.addEventListener("load", inboxData());
    submitBtn.addEventListener("click", (event)=>{
        event.preventDefault();
        fetchData();
        displayData(event.target.name);
    })
})()

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


function displayData(name){
    const data = LocalStorage.getKey(name); //index of the element in the local storage

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
export{displayData};