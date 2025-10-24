import React from "react";
import "../App.css";

const BarraProgreso = ({ progreso }) => {
  return (
    <div className="barra-progreso-container">
      <div
        className="barra-progreso"
        style={{ width: `${progreso}%` }} // ← CORREGIDO
      />
      <div className="barra-progreso-texto">
        {Math.round(progreso)}%
      </div>
    </div>
  );
};

export default BarraProgreso;
