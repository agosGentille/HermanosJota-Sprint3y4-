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
        <div className={`tarjeta-producto ${mostrar ? 'mostrar' : ''}`}>
          <div className="fondo-tarjeta">
            <div className='info-producto'>
              <a key={producto.id} href={`producto.html?id=${producto.id}`} >
<<<<<<< HEAD
=======
                <div className="tarjeta-foto">
                  <img src={producto.imagen} alt={producto.titulo} className="img-normal" />
                  <img src={producto.imagenHover} alt={producto.titulo} className="img-hover" />
                </div>
>>>>>>> 3d51779e7d6b415292b78a62ac3e8fa827d3abfb
                <h3>{producto.titulo}</h3>
                <div className="tarjeta-foto">
                  <img src={producto.imagen} alt={producto.titulo} className="img-normal" />
                  <img src={producto.imagenHover} alt={producto.titulo} className="img-hover" />
                </div>
                <p>${producto.Precio.toLocaleString('es-AR')}</p>
              </a>
<<<<<<< HEAD
            </div>
=======
>>>>>>> 3d51779e7d6b415292b78a62ac3e8fa827d3abfb
              <div className="btnAgregarCarrito">
                <span className="material-symbols-outlined">shopping_bag</span>
                <span> | Comprar </span>
              </div> 
          </div>
        </div>
          ))}
    </>
  );
}

export default TarjetasProductos;