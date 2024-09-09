import {format} from "date-fns";

/*fetch data*/

const fetchData = (function(){
    createObject();
})

//create todo object

class Todo{}
const iterator= (function(){
    const getTodo = (target)=>{
        const newTodo = new Todo(); //create todo
        target.forEach((node)=>{
            const key = node.name;
            if(key) newTodo[key] = node.value;
            if(!node.value && key === "Due date") newTodo[key] = format(new Date, "dd-MM-yyyy");
        }) //fill up with data
        return newTodo;
    }
        
    return {getTodo};
})()

function createObject(){
    const inputElements = document.querySelectorAll("input:not(input[type='button']), textarea:not(textarea[id='side-note']), input[checked='true']");
    const newProject = iterator.getTodo(inputElements);
    AddObjectToArray.addToArray(newProject);
}


//add object to the library

class AddObjectToArray {
    static #privateConstructor = true;
    static #object = [];
    static #objectKey = 0;
    constructor(){
        if(!AddObjectToArray.#privateConstructor){
            throw SyntaxError("cannot create objects from the constructor");
        }
    }

    static addToArray(todoObject){
        const miniVersion = AddObjectToArray.#object;
        let count = this.#objectKey;
        miniVersion.push(todoObject);
        addToLocalStorage(count, todoObject);
        if(!todoObject.project) this.#objectKey++;
    }
    static getKey(){
        return this.#objectKey;
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
    console.log("here");
}

function checkStorageForProject(key, value){
    if(localStorage.getItem(key)) {
        const project = JSON.parse(localStorage.getItem(key));
        project.push(value);
        localStorage.setItem(key, JSON.stringify(project));
        return;
    };
    let project = [value];
    project = JSON.stringify(project);
    localStorage.setItem(key, project);
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
    static getItem(key){
        return localStorage(key);
    }
    static getKey(name){
        if(name) return JSON.parse(localStorage.getItem(name)).length-1;
        AddObjectToArray.getKey();
    }
    static deleteFromLocalStore(target){
        deleteData(target);
    }
}


function fetchDataFromLocalStore(name){
    if(name) JSON.parse(localStorage.getItem(name));
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


export{fetchData, LocalStorage};