// src/components/carritoFunciones.js

export const agregarProducto = (carrito, setCarrito, producto) => {
  const existe = carrito.find(p => p.id === producto.id);
  if (existe) {
    setCarrito(
      carrito.map(p =>
        p.id === producto.id
          ? { ...p, cantidad: p.cantidad + (producto.cantidad || 1) }
          : p
      )
    );
  } else {
    setCarrito([...carrito, { ...producto, cantidad: producto.cantidad || 1 }]);
  }
};

export const eliminarProducto = (carrito, setCarrito, id) => {
  setCarrito(carrito.filter(p => p.id !== id));
};

export const vaciarCarrito = (setCarrito) => {
  setCarrito([]);
};

export const sumarCantidad = (carrito, setCarrito, id) => {
  setCarrito(
    carrito.map(p => (p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p))
  );
};

export const restarCantidad = (carrito, setCarrito, id) => {
  setCarrito(
    carrito.map(p =>
      p.id === id ? { ...p, cantidad: p.cantidad > 1 ? p.cantidad - 1 : 1 } : p
    )
  );
};

export const calcularTotal = (carrito) => {
  return carrito.reduce((acc, p) => acc + (p.Precio || 0) * p.cantidad, 0);
};
