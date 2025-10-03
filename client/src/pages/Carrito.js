import React from "react";
import "../styles/Carrito.css";

const Carrito = ({
  carrito,
  sumarCantidad,
  restarCantidad,
  eliminarProducto,
  vaciarCarrito,
  total
}) => {
  return (
    <main className="contenedor__carrito">
      <h2 className="titulo__principal">Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p className="carrito-vacio">Tu carrito está vacío 😞</p>
      ) : (
        <>
          <table id="carrito-productos">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Título</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map(producto => (
                <tr key={producto.id}>
                  <td>
                    <img
                      src={producto.imagen}
                      alt={producto.titulo}
                      className="carrito-producto-img"
                    />
                  </td>
                  <td>{producto.titulo}</td>
                  <td>
                    <div className="cantidad-botones">
                      <button onClick={() => restarCantidad(producto.id)}>−</button>
                      <span>{producto.cantidad}</span>
                      <button onClick={() => sumarCantidad(producto.id)}>+</button>
                    </div>
                  </td>
                  <td>${producto.Precio}</td>
                  <td>${producto.Precio * producto.cantidad}</td>
                  <td>
                    <button
                      className="carrito-producto-eliminar"
                      onClick={() => eliminarProducto(producto.id)}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div id="carrito-acciones">
            <div className="carrito-acciones-total">
              <p>Total:</p>
              <p>${total}</p>
            </div>

            <button className="carrito-acciones-vaciar" onClick={vaciarCarrito}>
              Vaciar Carrito
            </button>
            <button className="carrito-acciones-comprar" onClick={vaciarCarrito}>
              Comprar Ahora
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default Carrito;
