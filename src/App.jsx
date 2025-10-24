import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

// Componentes personalizados
import MensajePersonalizado from './components/MensajePersonalizado';
import TemaOscuro from './components/TemaOscuro';
import FechaHora from './components/FechaHora';
import useWindowSize from './hooks/useWindowSize';
import MostrarTamañoVentana from './components/MostrarTamañoVentana';
import BarraProgreso from './components/BarraProgreso';

// Categorías disponibles
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
  const size = useWindowSize(); // Hook para obtener tamaño de ventana

  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("General");
  const [filter, setFilter] = useState("Todas");

  
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Agregar nueva tarea
  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { text: newTask, completed: false, category }]);
    setNewTask("");
    setCategory("General");
  };

  // Marcar tarea como completada/incompleta
  const toggleTask = (index) => {
    setTasks(tasks.map((t, i) => i === index ? { ...t, completed: !t.completed } : t));
  };

  // Eliminar tarea
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Iniciar edición
  const startEditing = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  // Guardar edición
  const saveEdit = () => {
    if (!editText.trim()) return;
    const updatedTasks = [...tasks];
    updatedTasks[editIndex].text = editText;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditText("");
  };

  // Filtrar tareas por categoría
  const filteredTasks = filter === "Todas"
    ? tasks
    : tasks.filter((t) => t.category === filter);

  // Cálculo de progreso
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const progreso = total === 0 ? 0 : (completed / total) * 100;

  return (
    <>
      {/* Componentes adicionales */}
      <MostrarTamañoVentana />
      <FechaHora />
      <MensajePersonalizado />
      <TemaOscuro />

      <div className="app-container">
        <h1 className="text-center mb-4">
          <i className="bi bi-clipboard-check me-2"></i>
          Lista de Tareas
        </h1>

        {/* Barra de progreso */}
        <BarraProgreso progreso={progreso} />

        {/* Input para nueva tarea */}
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

        {/* Filtro por categoría */}
        <div className="filter-section d-flex justify-content-center align-items-center gap-2 mb-3">
          <label className="filtroNegro">Filtrar por:</label>
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

                  {/* Modo edición */}
                  {editIndex === index ? (
                    <input
                      type="text"
                      className="form-control me-2"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <strong>{task.text}</strong>
                  )}

                  <span className={`category-tag ms-2 ${task.category}`}>
                    {task.category}
                  </span>
                </div>

                {/* Botones de acción */}
                <div className="d-flex align-items-center gap-2">
                  {editIndex === index ? (
                    <button className="btn btn-success btn-sm" onClick={(e) => {
                      e.stopPropagation();
                      saveEdit();
                    }}>
                      <i className="bi bi-check-lg"></i>
                    </button>
                  ) : (
                    <button className="btn btn-warning btn-sm" onClick={(e) => {
                      e.stopPropagation();
                      startEditing(index);
                    }}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  )}

                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(index);
                    }}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Estadísticas */}
        <div className="task-stats d-flex justify-content-between mt-3">
          <p className="filtroNegro">Total: {total}</p>
          <p className="filtroNegro">Completadas: {completed}</p>
        </div>
      </div>
    </>
  );
}

export default App;