import useWindowSize from '../hooks/useWindowSize';

function MostrarTamañoVentana() {
  const size = useWindowSize();

  return (
    <div className="text-center mt-3">
      <p>Tamaño de ventana: {size.width}px x {size.height}px</p>
      {size.width < 600 && (
        <p className="alert alert-warning">
          Estás usando una pantalla pequeña
        </p>
      )}
    </div>
  );
}

export default MostrarTamañoVentana;