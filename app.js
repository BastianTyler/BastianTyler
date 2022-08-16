//Tip 1- organize code before writing your first line

//Selectors
//What is an Selector? Awnser: tools to find html elements based on tag, id, class, type, attribute, and many more
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//Event-Listeners
//What is an Event-listener? Awnser: A procedure in JavaScript that waits for ane event to occur
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions
//What is an function? Awnser: A reusable codeblock that has a specific purpose or use

function addTodo(event){
 //Prevent form from submitting
 event.preventDefault();
 //Todo DIV

const todoDiv = document.createElement("div");
todoDiv.classList.add("todo");
//Create LI
const newTodo = document.createElement("li");
newTodo.innerText = todoInput.value;
newTodo.classList.add('todo-item');
todoDiv.appendChild(newTodo);
//ADD TODO TO LOCAL STORAGE
saveLocalTodo(todoInput.value);
//CHECK MARK BUTTON
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class="fas fa-check"></i>';
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton);
//CHECK TRASH BUTTON
const trashButton = document.createElement('button');
trashButton.innerHTML = '<i class="fas fa-trash"></i>';
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);
//APEND TO LIST
todoList.appendChild(todoDiv);
//Clear todo input value
todoInput.value = "";
}

function deleteCheck(e){
 //Grabbing item for deletion
 const item = e.target;
 //Delete todo
 if(item.classList[0] === 'trash-btn'){
  const todo = item.parentElement;
  //Animation for deletion
  todo.classList.add("fall");
  removeLocalTodos(todo);
  todo.addEventListener('transitionend', function(){
      todo.remove();
  });

 }

 if(item.classList[0] === 'complete-btn'){
  const todo = item.parentElement;
  todo.classList.toggle("completed");
 }
}

function filterTodo(e) {
 const todos = todoList.childNodes;
 todos.forEach(function(todo){
  switch(e.target.value){
   case "all":
    todo.style.display = 'flex';
    break;
   case "completed":
    if(todo.classList.contains('completed')){
     todo.style.display = 'flex';
    }else{
     todo.style.display = 'none';
    }
    break;
   case "uncompleted":
    if(!todo.classList.contains('completed')){
     todo.style.display = 'flex';
    }else{
     todo.style.display = 'none';
    }
    break;
  }
 });
}

function saveLocalTodo(todo){
 //Check for if you already have a local todo
 let todos;
 if(localStorage.getItem('todos') == null){
  todos = [];
 }else{
  todos = JSON.parse(localStorage.getItem('todos'));
 }
 todos.push(todo);
 localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
 //Check for if you already have a local todo
 let todos;
 if(localStorage.getItem('todos') == null){
  todos = [];
 }else{
  todos = JSON.parse(localStorage.getItem('todos'));
 }
 todos.forEach(function(todo) {
  //Todo DIV

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todo;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  //CHECK MARK BUTTON
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //CHECK TRASH BUTTON
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //APEND TO LIST
  todoList.appendChild(todoDiv);
 });

}

function removeLocalTodos(todo){
 let todos;
 if(localStorage.getItem('todos') == null){
  todos = [];
 }else{
  todos = JSON.parse(localStorage.getItem('todos'));
 }
 const todoIndex = todo.children.innerText;
 todos.splice(todos.indexOf(todoIndex, 1));
 localStorage.setItem('todos', JSON.stringify(todos));
}