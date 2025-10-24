import { useEffect, useState } from 'react';

function FechaHora() {
  const [fecha, setFecha] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFecha(new Date());
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="fecha-hora">
      <p><i className="bi bi-calendar-event me-2"></i>Fecha: {fecha.toLocaleDateString()}</p>
      <p><i className="bi bi-clock me-2"></i>Hora: {fecha.toLocaleTimeString()}</p>
    </div>
  );
}

export default FechaHora;