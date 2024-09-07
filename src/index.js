import {fetchData} from "./app-algorithm.js";

import "./taskfield.css";

const domController = (function(){
    const submitBtn = document.querySelector("input[type='submit']");
    submitBtn.addEventListener("click", (event)=>{
        event.preventDefault();
        fetchData();
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
        console.log(this.computedStyles);
        return this.computedStyles.getPropertyValue(property);
    }
}

function modifyInput(target) {
    target.setAttribute("data-check", "checked");
    const appliedStyle = ComputedStyles.getStyle(target, "color");

    target.style = `background-color: ${appliedStyle}; color: white`;
}

function restoreInput(target){
    const button = document.querySelectorAll("input[type='button']");

    button.forEach((btn)=>{
        if(btn === target) return;

        btn.removeAttribute("data-checked");
        const backgroundColor = ComputedStyles.getStyle(btn, "background-color");
        btn.style = `color: ${backgroundColor}; background-color: none`;
    })
}