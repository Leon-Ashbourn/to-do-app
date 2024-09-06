import {fetchData} from "./app-algorithm.js";

const domController = (function(){
    const submitBtn = document.querySelector("input[type='submit']");
    submitBtn.addEventListener("click", (event)=>{
        event.preventDefault();
        fetchData();
    })
})()

