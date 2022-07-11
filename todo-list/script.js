const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => {
    addTodo(todo);
  });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEL = document.createElement("li");
    if (todo && todo.completed) {
      todoEL.classList.add("completed");
    }
    todoEL.innerText = todoText;
    todoEL.addEventListener("click", (e) => {
      todoEL.classList.toggle("completed");
      updateLS();
    });
    todoEL.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      todoEL.remove();
      updateLS();
    });
    todosUL.appendChild(todoEL);
    input.value = "";
    updateLS();
  }
}
function updateLS() {
  todosEl = document.querySelectorAll("li");
  const todos = [];

  todosEl.forEach((todoEL) => {
    todos.push({
      text: todoEL.innerText,
      completed: todoEL.classList.contains("completed"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
