const form = document.querySelector('#new-todo-form')
const template = document.querySelector('#list-item-template')
const todoInput = document.querySelector('#todo-input')
const todoList = document.querySelector('#list')

form.addEventListener('submit', e => {
  e.preventDefault()
  if (todoInput.value == "") return
  const todo = getTodo()
  renderTodo(todo)
  saveTodo(todo)
  todoInput.value = ""
})

todoList.addEventListener('change', setComplete)
todoList.addEventListener('click', deleteTodo)
// gets form data and returns as an todo object
function getTodo() {
  return {
    name: todoInput.value,
    complete: false,
    id: new Date().valueOf().toString()
  }
}

// renders todo to the UI
function renderTodo(todo) {
  const templateClone = template.content.cloneNode(true)
  const listItem = templateClone.querySelector('.list-item')
  const checkbox = templateClone.querySelector('[data-list-item-checkbox]')
  const  dataText = templateClone.querySelector('[data-list-item-text]')
  dataText.innerText = todo.name
  checkbox.checked = todo.complete
  listItem.dataset.todoId = todo.id
  todoList.appendChild(listItem)
}

// saves todo to localStorage
function saveTodo(todo) {
  const todoList = getTodos()
  todoList.push(todo)
  localStorage.setItem('todo-list', JSON.stringify(todoList))
}

// returns an array of todo objects from localStorage or empty array
function getTodos() {
  return JSON.parse(localStorage.getItem('todo-list')) || []
}

// sets the complete property status of the todo when the checkbox is changed
function setComplete(e) {
  if (!e.target.matches('[data-list-item-checkbox]')) return
  const checkbox = e.target
  const listItem = checkbox.closest('.list-item')
  const todoId = listItem.dataset.todoId
  const todos = getTodos()
  todos.forEach((todo, i) => {
    if (todo.id == todoId) {
      todos[i].complete = checkbox.checked
  localStorage.setItem('todo-list', JSON.stringify(todos))
    }
  })
}

// runs on clicking delete button
function deleteTodo(e) {
  if (!e.target.matches('[data-button-delete]')) return
  const deleteBtn = e.target
  const listItem = deleteBtn.parentElement
  // gets the listItem data id that references the todo id
  const todoId = listItem.dataset.todoId
  // remove from UI
  listItem.remove()
  // remove from localStorage
 /*const todos = getTodos().filter(todo => todo.id != todoId)*/
 const todos = getTodos()
 todos.forEach((todo, index) => {
   if (todo.id == todoId) todos.splice(index, 1)
 })
   // sets the new todos excluding the deleted one
  localStorage.setItem('todo-list', JSON.stringify(todos))
}

document.addEventListener('DOMContentLoaded', loadTodos)

// render each todo to the screen when the document has loaded
function loadTodos() {
  const todoList = getTodos()
  todoList.forEach(todo => {
    renderTodo(todo)
  })
}