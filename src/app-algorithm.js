import {format} from "date-fns";

/*fetch data*/

const fetchData = (function(dataKey){
    createObject(dataKey);
})

//create todo object

class Todo{}
const iterator= (function(){
    const getTodo = (target)=>{
        const newTodo = new Todo(); //create todo
        target.forEach((node)=>{
            const key = node.name;
            if(key) newTodo[key] = node.value;
            if(!node.value && key === "Due date") newTodo[key] = format(new Date, "MM-dd-yyyy");
            if(node.value && key === "Due date") newTodo[key] = format(new Date(node.value),"MM-dd-yyyy");
        }) //fill up with data
        return newTodo;
    }
        
    return {getTodo};
})()

function createObject(dataKey){
    const inputElements = document.querySelectorAll("input:not(input[type='button']), textarea:not(textarea[id='side-note']), input[checked='true']");
    const newProject = iterator.getTodo(inputElements);
    AddObjectToArray.addToArray(newProject, dataKey);
}


//add object to the library

class AddObjectToArray {
    static #privateConstructor = true;
    static #object = [];
    constructor(){
        if(!AddObjectToArray.#privateConstructor){
            throw SyntaxError("cannot create objects from the constructor");
        }
    }

    static addToArray(todoObject, dataKey){
        if(dataKey) {addToLocalStorage( dataKey , todoObject); return}
        const miniVersion = AddObjectToArray.#object;
        miniVersion.push(todoObject);
        addToLocalStorage( this.getKey(), todoObject);
    }
    static getKey(){    
        let tempKey = localStorage.key(0);
        let count = 0;
        let key = 0;
        while(tempKey){
            if(!isNaN(Number(tempKey))) key++;
            tempKey = localStorage.key(++count);  
        }
        return key;
    }

    static updateArray(key, value){
        AddObjectToArray.#object[key] = value;

    }
}

//add each object to the local storage

function addToLocalStorage(key, value){
    if(value.project) {
        key = value.project;
        checkStorageForProject(key, value);
        return;
    };
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
}

function checkStorageForProject(key, value){
    if(localStorage.getItem(key)) {
        const project = JSON.parse(localStorage.getItem(key));
        project.push(value);
        localStorage.setItem(key, JSON.stringify(project));
        return;
    };
}

//user chose to edit the list
const editTodoList = (function(){
    const editProject = document.querySelector("#edit-confirm");
    editProject.addEventListener("click",(event)=>{
        if(!event.target.dataIndex) return ;
        updateLocalStorage(event.target);
    } )
})

//update local storage in case the user edited the list

function updateLocalStorage(targetElement){
    const dataId = targetElement["data-Key"];
    let key = Number(dataId);
    if(dataId && !key) key = dataId;   

    const inputValue = targetElement.parentNode.querySelectorAll(`input:not(input[type="submit"]), textarea, input[type='button'][checked='true'] `);
    const newTodo = iterator.getTodo(inputValue);
    AddObjectToArray.updateArray(key, newTodo);
    addToLocalStorage(key, newTodo);
}

//manipulating data from local storage

class LocalStorage {
    static data;
    static fetchFullData(target){
        this.data = fetchDataFromLocalStore(target);
        return this.data;
    }
    static sortData(parameter){
        sortLocalStorageData(parameter);
    }
    static getProjectKey(){
        const keys = [];
        let count = 0;
        while(localStorage.key(count)){
            const key = localStorage.key(count);
            if(isNaN(Number(key)) && key) keys.push(localStorage.key(count));
            count ++;
        }
        return keys;
    }
    static getKey(name){
        if(name) return JSON.parse(localStorage.getItem(name)).length-1;
        return AddObjectToArray.getKey();
    }
    static deleteFromLocalStore(target){
        deleteData(target);
    }
}


function fetchDataFromLocalStore(name){
    if(name) return JSON.parse(localStorage.getItem(name));
    return storageIterator();
}

function storageIterator(){
    const storageObject = {};
    let count = 0;
    while(localStorage.key(count)){
        const key = localStorage.key(count);
        if(Number(key) || Number(key) === 0) storageObject[key] =   JSON.parse(localStorage.getItem(`${key}`));
        count++;
    }
    return storageObject;
}
//delete the data fromo the local storage if the uer chose delete option.

function deleteData(target){
    const index = Number(target["data-key"]);
    if(target.name) {
        const key = target.name;
        let data = JSON.parse(localStorage.getItem(key));
        data.slice(index, 1);
        data = JSON.stringify(data);
        localStorage.setItem(key, data);
        return;
    }
    localStorage.removeItem(index);
}


export{fetchData, LocalStorage, addToLocalStorage};