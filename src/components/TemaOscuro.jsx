import { useEffect, useState } from 'react';

function TemaOscuro() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      Cambiar a {darkMode ? 'Claro' : 'Oscuro'}
    </button>
  );
}

export default TemaOscuro;