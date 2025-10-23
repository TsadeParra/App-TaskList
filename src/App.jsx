import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

const categories = [
  { name: "General", icon: "bi bi-list-task" },
  { name: "Escuela", icon: "bi bi-book" },
  { name: "Trabajo", icon: "bi bi-briefcase" },
  { name: "Actividades", icon: "bi bi-calendar-check" },
  { name: "Comida", icon: "bi bi-cup-straw" },
  { name: "Ejercicio", icon: "bi bi-heart-pulse" },
  { name: "Otros", icon: "bi bi-three-dots" },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("General");
  const [filter, setFilter] = useState("Todas");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { text: newTask, completed: false, category }]);
    setNewTask("");
    setCategory("General");
  };

  const toggleTask = (index) => {
    setTasks(tasks.map((t, i) => i === index ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const filteredTasks = filter === "Todas"
    ? tasks
    : tasks.filter((t) => t.category === filter);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div className="app-container">
      <h1 className="text-center mb-4">
        <i className="bi bi-clipboard-check me-2"></i>
        Lista de Tareas
      </h1>

      {/* Input nueva tarea */}
      <div className="task-input d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Escribe una nueva tarea..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={addTask}>
          <i className="bi bi-plus-circle"></i> Agregar
        </button>
      </div>

      {/* Filtro */}
      <div className="filter-section d-flex justify-content-center align-items-center gap-2 mb-3">
        <label className="fw-semibold">Filtrar por:</label>
        <select
          className="form-select w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Todas">Todas</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Lista de tareas */}
      <ul className="p-0">
        {filteredTasks.map((task, index) => {
          const cat = categories.find((c) => c.name === task.category);
          return (
            <li
              key={index}
              className={`d-flex justify-content-between align-items-center ${task.completed ? "completed" : ""}`}
              onClick={() => toggleTask(index)}
            >
              <div className="d-flex align-items-center">
                <div className={`task-bullet bullet-${task.category}`}></div>
                <i className={`${cat.icon} me-2`}></i>
                <strong>{task.text}</strong>
                <span className={`category-tag ms-2 ${task.category}`}>
                  {task.category}
                </span>
              </div>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(index);
                }}
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Estadísticas */}
      <div className="task-stats d-flex justify-content-between mt-3">
        <p>Total: {total}</p>
        <p>Completadas: {completed}</p>
      </div>
    </div>
  );
}

export default App;