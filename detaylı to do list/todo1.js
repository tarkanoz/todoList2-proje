const form = document.querySelector("#todo-form");
const todoinput = document.querySelector("#todo");
const todolist = document.querySelector(".list-group");
const firscardbody = document.querySelectorAll(".card-body")[0];
const secondcardbody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");



eventListeners();

function eventListeners(){

    form.addEventListener("submit",addTodo);

  
}

function addTodo(e){
    const newTodo = todoinput.value.trim();

    if(newTodo === ""){


        // <div class="alert alert-danger" role="alert">
        //                 This is a danger alert—check it out!
        //               </div>

        showAlert("danger","Lütfen bir todo girin...")
   
    }

    else{

        addTodoToUI(newTodo);
        showAlert("success","Todo başarıyla eklendi...")

    }

    



    e.preventDefault();
}

function showAlert(type,message){

    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent= message;
    
    firstCardBody.appendChild(alert);

    setTimeout(function(){
        alert.remove();
    },1000);
    
}

function addTodoToUI(newTodo){

    const listItem = document.createElement("li");

    const link = document.createElement("a");
    link.href= "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    
    todolist.appendChild(listItem);
    todoinput.value ="";




}