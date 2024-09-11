import { LocalStorage } from "./app-algorithm";
import del from "./icons/delete.png";
import edit from "./icons/edit.png";
import {format, formatDistance} from "date-fns";

const embedElements = function(tabArea){
    chooseContentToShow(tabArea); //call the function to check which todo list to show on the page
}


//check user's current tab

function chooseContentToShow(tab){
    switch (tab){
        case 1:
            TabMenu.inboxData();
            break;
        
        case 2 :
            TabMenu.tomorrowData();
            break;
        
        case 3 :
            TabMenu.upcomingData();
            break;

        default :
            TabMenu.projectData(tab);
    }
}
//inbox tab
class TabMenu {
    static inboxData(){
        HtmlRender.renderData('');
    }
    static tomorrowData(){
        HtmlRender.filterData('', "1 day", false);
    }
    static upcomingData(){
        HtmlRender.filterData('', "", true);
    }
    static projectData(name){
        HtmlRender.filterData(name);
    }
}


class HtmlRender {
    static filterData(name, condition, check){
        const filteredData =  filterLocalStorage(this.#fetchData(name), condition, check);
        embedHtmlElements(filteredData);
    }
    static renderData(name){
        embedHtmlElements(this.#fetchData(name));
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


function embedHtmlElements(data){

    const content = document.querySelector("#content");
    content.textContent = "";
    const todoElements = ["div", "label", "input", "p", "img", "img", "p"];
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
        const text = ["", "", "", `${data[key].title}`, "", "", `${format(new Date(data[key]["Due date"]), "dd-MM-yyyy")}`];
        DomHelper.textEmbed(element, text);
        DomHelper.appendChildren(element, 0);
        content.appendChild(element[0]);

        // element[4]
        editFunction(element[5]);
    }
}
function editFunction(event){
    event.addEventListener("click", ()=>{
        const container = document.querySelector(".task-container");
        container.style = "display: block";
        const button = document.querySelector("input[type='submit']");
        button.setAttribute("data-key",`${event.target.getAttribute('data-key')}`); //need to debug
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

export{embedElements, DomHelper};