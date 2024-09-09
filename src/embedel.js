import { LocalStorage } from "./app-algorithm";


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
            {"id": "todo-name", "type": "check-box", "name": "todo-list"},
            {"id" : "todo-title"},
            {"src": "./src/icons/edit.png", "alt": "edit", "data-key": `${key}`,"name": `${data[key].name}`},
            {"src": "./src/icons/delete.png", "alt": "delete", "delete": `${key}`, "name": `${data[key].name}`},
            {"class":"date"}
        ]
        for(let index in ele){
            setAttributes(element[index], attrList[index]);
        }
        const text = ["","",`${data[key].title}`, "", "", `${new Date(data[key].date)}`];
        textEmbed(ele, text);
        appendChildren(ele, 0);
        content.appendChild(element[0]);
    }
}

function appendChildren(ele, index){
    for(let key in ele){
        ele[index].appendChild(ele[key]);
        if(key === index) ele[index].removeChild(ele[key]);
    }
}
function textEmbed(ele, text){
    for(let key in ele){
        ele[key].textContent = text[key];
    }
}
function setAttributes(ele, attributes){
    for(let key in attributes){
        ele.setAttribute(key, attributes[key]);
    }
}


export{embedElements, inboxData};