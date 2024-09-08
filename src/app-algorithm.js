
/*fetch data*/

const fetchData = (function(){
    createObject();
})

//create todo object

class Todo{}

function createObject(){
    const inputElements = document.querySelectorAll("input:not(input[type='button']), textarea:not(textarea[id='side-note']), input[checked='true']");
    const newProject = new Todo();  
    inputElements.forEach((node)=>{
        const key = node.name;
        if(key) newProject[key] = node.value;
    })
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
    static getData(index){
        return this.#object[index];
    }

}

//add each object to the local storage

function addToLocalStorage(key, value){
    if(value.project) {
        key = value.project;
        checkStorageForProject(key, value);
        return;
    };
    value.index = AddObjectToArray.getKey();
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
}

function checkStorageForProject(key, value){
    if(localStorage.getItem(key)) {
        const project = JSON.parse(localStorage.getItem(key));
        value.index = project.length;
        project.push(value);
        localStorage.setItem(key, JSON.stringify(project));
        return;
    };
    let project = [value];
    value.index = 0;
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
    const dataId = targetElement["data-Id"];
    const key = dataId;
    key = Number(dataId);
    if(dataId && !Number(dataId)) key = dataId;   

    const inputValue = document.querySelectorAll(`input[id='${targetElement}']:not(input[type="submit"]), input[id='${targetElement}'].${parentNode} textarea, input[id='#${targetElement}'].${parentNode} input[type='button'][checked='true'] `);
    const newTodo = new Todo();

    inputValue.forEach((input)=>{
        const key = input.name;
        newTodo.key = input.value;
    })
    AddObjectToArray.updateArray(key, newTodo);
    addToLocalStorage(key, newTodo);
}

//manipulating data from local storage

class LocalStorage {
    static data;
    static fetchFullData(){
        this.data = fetchDataFromLocalStore();
        return this.data;
    }
    static sortData(parameter){
        sortLocalStorageData(parameter);
    }
    static fetchData(dataIndex, name){
        return fetch(dataIndex, name);
    }
    static getItem(key){
        return localStorage(key);
    }
}

function fetch(index){
    AddObjectToArray.getData(index);
}

class Storage {};

function fetchDataFromLocalStore(){
    const storageObject = new Storage();
    localStorage.forEach((key)=>{
        const todoData = localStorage.getItem(key);
        storageObject.key = todoData;
    })
    return storageObject;
}

//function to deal with completed projects

function CompletedTasks(){
    //
}

//function to alert the user when the due date exceeded

function exceedDueDate(){
    //
}


export{fetchData, LocalStorage};