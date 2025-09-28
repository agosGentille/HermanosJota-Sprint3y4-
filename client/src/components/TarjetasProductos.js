import React from 'react';
import '../styles/TarjetaProd.css'; 

function TarjetasProductos({ productos, mostrarMax}) {
  // Si se pasó mostrarMax, filtramos la cantidad de productos
  const lista = mostrarMax ? productos.slice(0, mostrarMax) : productos;

  return (
    <>
      {lista.map((producto) => (
          <a key={producto.id} href={`producto.html?id=${producto.id}`} className="tarjeta-producto">
              <img src={producto.imagen} alt={producto.titulo} className="tarjeta-foto" />
              <h3>{producto.titulo}</h3>
              <p>${producto.Precio}</p>
          </a>
          ))}
    </>
  );
}

export default TarjetasProductos;