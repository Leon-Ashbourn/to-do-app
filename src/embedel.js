import { LocalStorage } from "./app-algorithm";
import del from "./icons/delete.png";
import edit from "./icons/edit.png";


const embedElements = (function(tabArea){
    chooseContentToShow(tabArea);

})()

function chooseContentToShow(tab){
    switch (tab){
        case "Inbox":
            inboxData();
            break;
        
            case "Tomorrow" :
                tomorrowData();
                break;
            
            case "Upcoming" :
                upcomingData();
                break;

            default :
                // projectData(tab);
    }
}

function inboxData(){
    const data = LocalStorage.fetchFullData('');
    embedHtmlElements(data)
}

function embedHtmlElements(data){
    data = JSON.parse(data);
    const content = document.querySelector("#content");
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
            {"src": `${del}`, "alt": "edit", "data-key": `${key}`,"name": `${data[key].name}`, "class": "icon"},
            {"src": `${edit}`, "alt": "delete", "data-key": `${key}`, "name": `${data[key].name}`, "class": "icon"},
            {"class":"date"}
        ]
        for(let index in element){
            setAttributes(element[index], attrList[index]);
        }
        const text = ["", "", "", `${data[key].title}`, "", "", `${new Date(data[key]["Due date"])}`];
        textEmbed(element, text);
        appendChildren(element, 0);
        content.appendChild(element[0]);
    }
}

function appendChildren(ele, index){
    index = `${index}`;
    for(let key in ele){
        if(!(key === index)) ele[index].appendChild(ele[key]) ;
    }
}

function textEmbed(ele, text){
    for(let key in ele){
        ele[Number(key)].textContent = text[Number(key)];
    }
}

function setAttributes(ele, attributes){
    for(let key in attributes){
        ele.setAttribute(key, attributes[key]);
    }
}


export{embedElements, inboxData};