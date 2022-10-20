const form = document.querySelector("#new-todo-form");
const template = document.querySelector("#list-item-template");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#list");

loadTodos();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (todoInput.value == "") return;
  const todo = getTodo();
  renderTodo(todo);
  saveTodo(todo);
  todoInput.value = "";
});

todoList.addEventListener("change", (e) => {
  if (!e.target.matches("[data-list-item-checkbox]")) return;
  setComplete(e);
});
todoList.addEventListener("click", (e) => {
  if (e.target.matches("[data-button-delete]")) deleteTodo(e);
  else if (e.target.matches("[data-button-edit]"))
  editList()
});
// gets form data and returns as an todo object
function getTodo() {
  return {
    name: todoInput.value,
    complete: false,
    id: new Date().valueOf().toString(),
  };
}

// renders todo to the UI
function renderTodo(todo) {
  // create elements to display the todo's data
  const templateClone = template.content.cloneNode(true);
  const listItem = templateClone.querySelector(".list-item");
  const checkbox = listItem.querySelector("[data-list-item-checkbox]");
  const dataText = listItem.querySelector("[data-list-item-text]");
  // display the todo's data in the elements
  dataText.innerText = todo.name;
  checkbox.checked = todo.complete;
  listItem.dataset.todoId = todo.id;
  todoList.appendChild(listItem);
}

// saves todo to localStorage
function saveTodo(todo) {
  const todos = getTodos();
  todos.push(todo);
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

// returns an array of todo objects from localStorage or empty array
function getTodos() {
  return JSON.parse(localStorage.getItem("todo-list")) || [];
}

// sets the complete property status of the todo when the checkbox is changed
function setComplete(e) {
  const checkbox = e.target;
  const listItem = checkbox.closest(".list-item");
  const todoId = listItem.dataset.todoId;
  const todos = getTodos();
  todos.forEach((todo, i) => {
    if (todo.id == todoId) {
      todos[i].complete = checkbox.checked;
      localStorage.setItem("todo-list", JSON.stringify(todos));
    }
  });
}

// runs on clicking delete button
function deleteTodo(e) {
  // remove from UI
  const deleteBtn = e.target;
  const listItem = deleteBtn.parentElement;
  listItem.remove();
  // remove from localStorage
  // gets the listItem data id that references the todo id
  const todoId = listItem.dataset.todoId;
  /*const todos = getTodos().filter(todo => todo.id != todoId)*/
  const todos = getTodos();
  todos.forEach((todo, index) => {
    if (todo.id == todoId) todos.splice(index, 1);
  });
  // sets the new todos excluding the deleted one
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

function editList() {
  todoInput.value = 
}

// render each todo to the screen when the document has loaded
function loadTodos() {
  const todoList = getTodos();
  todoList.forEach((todo) => {
    renderTodo(todo);
  });
}
