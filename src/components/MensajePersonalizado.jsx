import { useEffect, useState } from 'react';

function MensajePersonalizado() {
  const [usuario, setUsuario] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get('usuario');
    if (nombre) {
      setUsuario(nombre);
    }
  }, []);

  return (
    <div>
      {usuario && <h2>¡Hola, {usuario}! Bienvenida a tu lista de tareas 📝</h2>}
    </div>
  );
}

export default MensajePersonalizado;