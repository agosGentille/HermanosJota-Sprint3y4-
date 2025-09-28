import React, {useState, useEffect} from 'react';
import '../styles/TarjetaProd.css'; 

function TarjetasProductos({ productos, mostrarMax}) {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    if (productos.length > 0) {
      // pequeño delay para animar escaladamente
      const timeout = setTimeout(() => setMostrar(true), 100);
      return () => clearTimeout(timeout);
    }
  }, [productos]);

  const lista = mostrarMax ? productos.slice(0, mostrarMax) : productos;


  return (
    <>
      {lista.map((producto) => (
          <a key={producto.id} href={`producto.html?id=${producto.id}`} className={`tarjeta-producto ${mostrar ? 'mostrar' : ''}`}>
              <img src={producto.imagen} alt={producto.titulo} className="tarjeta-foto" />
              <h3>{producto.titulo}</h3>
              <p>${producto.Precio}</p>
          </a>
          ))}
    </>
  );
}

export default TarjetasProductos;