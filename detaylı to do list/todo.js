//Tüm elementleri seçin
const form = document.querySelector("#todo-form");
const todoinput = document.querySelector("#todo");
const todolist = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");



eventListeners(); //elementleri seçtikten sonra bu funksiyon çalışacak

function eventListeners(){ //Tüm event Listenerlar
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){
    if(confirm("Tümünü silmek istediğinize emin misiniz ?")){
        //todolist.innerHTML = ""; // todolistin içini bu şekilde silmek biraz yavaç bir yöntem
        

        while(todolist.firstElementChild != null ){
            todolist.removeChild(todolist.firstElementChild);
        }

        localStorage.removeItem("todos"); //localstoragedende sildik
    }
    //arayüzden todoları temizleme



}



function filterTodos(e){
    const filterValue = e.target.value.toLowerCase(); //büyük küçük harf ayrımı yapmasın diye hepsini küçüğe çevirdik
     
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){

        const text = listItem.textContent.toLowerCase();//lilerdeki textler, aldık ve küçük harfe çevirdik
        
        if (text.indexOf(filterValue) === -1){

            listItem.setAttribute("style","display : none !important");

        }

        else {
            listItem.setAttribute("style","display : block");
        }
    
    
    });



}





function deleteTodo(e){

    if (e.target.className === "fa fa-remove"){
        
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyla silindi....");
        
    }
}
function deleteTodoFromStorage(deletetodo){
       
       let todos = getTodosFromStorage();

       todos.forEach(function(todo,index){
           if (todo === deletetodo){
               todos.splice(index,1); //arrayden değer silebiliriz
           }
       });

       localStorage.setItem("todos",JSON.stringify(todos));

}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){
    const newTodo = todoinput.value.trim();

    if (newTodo === "") {

        /*
           <div class="alert alert-danger" role="alert">
                        This is a danger alert—check it out!
                      </div>
        */
       // showAlert(type,message); //dedik ki fonksiyonumuzun bir tipi bir de mesajı olacak
          showAlert("danger","Lütfen bir todo girin...");
    }                                  
    else {                          //burada bir todo girilmediyse uyarı mesajı ver kısmını yaptık
      
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo başarıyla eklendi...")
    }
   


    e.preventDefault();
}

function getTodosFromStorage(){ //Storagedon Todoları Alma
  
    let todos;

    if (localStorage.getItem("todos") === null){
        todos = [];
    }
      else {
          todos = JSON.parse(localStorage.getItem("todos"));
      }
    
     return todos;

}


function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo); //bize gönderilen stringi buraya ekledik
    localStorage.setItem("todos",JSON.stringify(todos));
      
     

}

  function showAlert(type,message){  //yukarıda yazdığımız showAlert fonksiyonunu oluşturduk

         const alert = document.createElement("div"); // divimizi oluşturduk

         alert.className = `alert alert-${type}`; //dolar işaretine bak ?
         alert.textContent = message;

         firstCardBody.appendChild(alert);

         //setTimeout

         setTimeout(function(){
             alert.remove();
         },1000);


  }


function addTodoToUI(newTodo){ //String değerini list item olarak UI'ya ekleyecek


    /* <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li> */

   //list ıtem oluşturma
    const listItem = document.createElement("li");
    //link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className ="delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";


    listItem.className = "list-group-item d-flex justify-content-between";

    // Text Node Ekleme
     listItem.appendChild(document.createTextNode(newTodo));
     listItem.appendChild(link);

     // Todo list e list ıtem'ı ekleme

     todolist.appendChild(listItem);

    
    console.log(listItem);
    todoinput.value= "";

}