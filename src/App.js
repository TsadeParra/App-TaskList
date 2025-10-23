import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("General");
  const [filter, setFilter] = useState("Todas");

  const categories = ["General", "Escuela", "Trabajo", "Actividades", "Comida", "Ejercicio", "Otros"];

  // Agregar tarea
  const addTask = () => {
    if (newTask.trim() === "") return;

    const newItem = {
      text: newTask,
      completed: false,
      category: category
    };

    setTasks([...tasks, newItem]);
    setNewTask("");
    setCategory("General");
  };

  // Marcar completada
  const toggleTask = (index) => {
    const updated = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
  };

  // Eliminar tarea
  const deleteTask = (index) => {
    const filtered = tasks.filter((_, i) => i !== index);
    setTasks(filtered);
  };

  // Filtrar tareas según categoría seleccionada
  const filteredTasks =
    filter === "Todas" ? tasks : tasks.filter((t) => t.category === filter);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div className="app-container">
      <h1>Lista de Tareas</h1>

      {/* --- INPUT DE NUEVA TAREA --- */}
      <div className="task-input">
        <input
          type="text"
          placeholder="Escribe una nueva tarea..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
        />

        {/* --- SELECT DE CATEGORÍA --- */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button onClick={addTask}>Agregar</button>
      </div>

      {/* --- FILTRO DE CATEGORÍAS --- */}
      <div className="filter-section">
        <label>Filtrar por:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="Todas">Todas</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* --- LISTA DE TAREAS --- */}
      <ul>
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            className={task.completed ? "completed" : ""}
            onClick={() => toggleTask(index)}
          >
            <div>
              <strong>{task.text}</strong>
              <span className="category-tag">{task.category}</span>
            </div>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(index);
              }}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>

      {/* --- ESTADÍSTICAS --- */}
      <div className="task-stats">
        <p>Total: {total}</p>
        <p>Completadas: {completed}</p>
      </div>
    </div>
  );
}

export default App;