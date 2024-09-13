import { LocalStorage } from "./app-algorithm";
import del from "./icons/delete.png";
import edit from "./icons/edit.png";
import add from "./icons/add.png"
import {format, formatDistance} from "date-fns";

const embedElements = function(target){
    chooseContentToShow(target); //call the function to check which todo list to show on the page
}


//check user's current tab

function chooseContentToShow(target){
    switch (target.getAttribute("value")){
        case "1":
            TabMenu.inboxData(target);
            break;
        
        case "2":
            TabMenu.tomorrowData(target);
            break;
        
        case "3" :
            TabMenu.upcomingData(target);
            break;

        default :
            TabMenu.projectData(target);
    }
}
//inbox tab
class TabMenu {
    static inboxData(target){
        HtmlRender.renderData(target);
    }
    static tomorrowData(target){
        HtmlRender.filterData('', "1 day", false, target);
    }
    static upcomingData(target){
        HtmlRender.filterData('', "", true, target);
    }
    static projectData(target){
        HtmlRender.renderData(target);
    }
}


class HtmlRender {
    static filterData(name, condition, check, target){
        const filteredData =  filterLocalStorage(this.#fetchData(name), condition, check);
        embedHtmlElements(filteredData, target);
    }
    static renderData(target){
        embedHtmlElements(this.#fetchData(target.getAttribute("value")), target);
    }

    static #fetchData(name){
        return LocalStorage.fetchFullData(name);
    }
}
//filter method

function filterLocalStorage(data, check, check2){
    const newObject = {};
    const today = format(new Date(), "MM-dd-yyyy");
    for(let key in data){
        let dueDate = new Date(data[key]["Due date"]);
        if (check2){
        if(formatDistance(dueDate, today) !== "less than a minute" && formatDistance(dueDate, today) !== "1 day"){
            newObject[key] = data[key];
        }
        }else {
            if(formatDistance(dueDate, today) === check) newObject[key] = data[key];
        }
    }
    return newObject;
}


function embedHtmlElements(data, target){

    const content = document.querySelector("#content");
    const todoElements = ["div", "label", "input", "p", "img", "img", "p"];
    content.textContent = "" ;
    addButton(content, target.getAttribute("name"), target.getAttribute("value"));
    for(let key in data){
        const element = [];
        todoElements.forEach((value)=>{
            const ele = document.createElement(value);
            element.push(ele);
        })
    
        const attrList = [
            {"class": "todo" },
            {"for" : "todo-name"},
            {"id": "todo-name", "type": "checkbox", "name": "todo-list"},
            {"id" : "todo-title"},
            {"src": `${del}`, "alt": "delete", "data-key": `${key}`,"name": `${data[key].name}`, "class": "icon delete"},
            {"src": `${edit}`, "alt": "edit", "data-key": `${key}`, "name": `${data[key].name}`, "class": "icon edit"},
            {"class":"date"}
        ]
        for(let index in element){
            DomHelper.setAttributes(element[index], attrList[index]);
        }
        const text = [ "", "", "", `${data[key].title}`, "", "", `${format(new Date(data[key]["Due date"]), "dd-MM-yyyy")}`];
        DomHelper.textEmbed(element, text);
        DomHelper.appendChildren(element, 0);
        content.appendChild(element[0]);
        // element[4]
        editFunction(element[5]);
    }
}

// add buttton function for every tab 

const addButton = function(node, name, value){
    const elements = ["div","img","button"];
    const attrList = [
        {"class": "add-task-button", "name": `${name}`, "value": `${value}`},
        {"src": `${add}`, "alt": "add", "class": "icon"},
        {"id": "task-button"},
    ];
    const text = [ "","","Add"];
    const button = [];
    elements.forEach((value)=>{
        const e = document.createElement(value);
        button.push(e);
    })
    for(let index in button){
        DomHelper.setAttributes(button[index], attrList[index]);
    }
    DomHelper.textEmbed(button, text);
    button[1].style = "height: 1.5rem, width: 1.5rem";
    DomHelper.appendChildren(button, 0);
    node.appendChild(button[0]);
    node.appendChild(button[0]);
    editFunction(button[0]);
}


function editFunction(element){
    element.addEventListener("click", (event)=>{
        let dataKey = event.target.getAttribute("data-key");
        if(!dataKey) dataKey = LocalStorage.getKey("");
        const target = event.currentTarget;
        if( !Number(target.getAttribute("name")) && target.getAttribute("name") ) dataKey = JSON.parse(localStorage.getItem(target.getAttribute("value"))).length;
        const container = document.querySelector(".task-container");
        container.style.display ="block";
        const button = document.querySelector("input[type='submit']");
        button.setAttribute("data-key",`${dataKey}`);
        button.setAttribute("name", `${target.getAttribute("value")}`) 
    })
}

class DomHelper {
    static setAttributes(ele, attributes){

        for(let key in attributes){
            ele.setAttribute(key, attributes[key]);
        }
    }
    static appendChildren(ele, index){
        index = `${index}`;
        for(let key in ele){
            if(!(key === index)) ele[index].appendChild(ele[key]) ;
        }
    }
    static textEmbed(ele, text){
        for(let key in ele){
            ele[Number(key)].textContent = text[Number(key)];
        }
    }
}

//delete todo's from local storage on user's request

export{embedElements, DomHelper, editFunction};