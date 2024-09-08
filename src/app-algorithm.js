
/*fetch data*/

const fetchData = (function(){
    createObject();
})

//create todo object
class Todo{};

function createObject(){
    const inputElements = document.querySelectorAll("input:not(input[type='submit'], input[type='button']), textarea:not(textarea[id='side-note']), input[checked='true']");
    const newProject = new Todo();
    inputElements.forEach((node)=>{
        const key = node.name;
        newProject[key] = node.value;
    })
    AddObjectToArray.addToArray(newProject);
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

    static addToArray(todoObject){
        const miniVersion = AddObjectToArray.#object;
        miniVersion.push(todoObject);
        addToLocalStorage(miniVersion.length -1,todoObject);
    }

    static updateArray(key, value){
        AddObjectToArray.#object[key] = value;
    }

}

//add each object to the local storage

function addToLocalStorage(key, value){
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
}

//user chose to edit the list
const editTodoList = (function(){
    const editProject = document.querySelector("#edit-confirm");
    editProject.addEventListener("click",(event)=>{
        if(!Number(event.target.dataIndex)) return ;
        updateLocalStorage(event.target.dataIndex);
    } )
})

//update local storage in case the user edited the list

function updateLocalStorage(key){
    key = Number(key);
    const inputValue = document.querySelectorAll(`form>input#${key}:not(input[type="submit"])`);
    const newTodo = new Todo();
    inputValue.forEach((input)=>{
        const key = input.name;
        newTodo.key = input.value;
    })
    newTodo.date = date.toString();
    AddObjectToArray.updateArray(key, newTodo);

    addToLocalStorage(key, newTodo);
}

//manipulating data from local storage

class LocalStorage {
    static data;
    static fetchData(){
        this.data = fetchDataFromLocalStore();
        return this.data;
    }
    static sortData(parameter){
        sortLocalStorageData(parameter);
    }
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