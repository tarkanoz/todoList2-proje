const form = document.querySelector("#todo-form");
const todoinput = document.querySelector("#todo");
const todolist = document.querySelector(".list-group");
const firscardbody = document.querySelectorAll(".card-bdoy")[0];
const secondcardbody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

 eventListeners();

 function eventListeners() {

    a.addEventListener("submit",addTodo);
    
 }

 function addTodo(e){
     const newTodo =todoinput.value.trim();

     addTodoToUI(newTodo);

     

     e.preventDefault();
 }

function addTodoToUI(newTodo){

    const listıtem = document.createElement("li");
    const link = document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML ="<i class = 'fa fa-remove'></i>";

    listıtem.className = "list-group-item d-flex justify-content-between";

    listıtem.appendChild(document.createTextNode(newTodo));
    listıtem.appendChild(link);
    f.appendChild(listıtem);
    b.value ="";



}