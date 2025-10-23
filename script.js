const input = document.getElementById("new-task");
const addBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");

let tasks = [];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) li.classList.add("completed");

    // Botón eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => deleteTask(index);

    // Marcar completada
    li.onclick = () => toggleTask(index);

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateStats();
}

function addTask() {
  const text = input.value.trim();
  if (text === "") return;

  tasks.push({ text, completed: false });
  input.value = "";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function updateStats() {
  totalTasks.textContent = tasks.length;
  completedTasks.textContent = tasks.filter(t => t.completed).length;
}

addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

renderTasks();