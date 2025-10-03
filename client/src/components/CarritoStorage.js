// src/components/carritoStorage.js

export const cargarCarrito = async (usuario) => {
  try {
    if (usuario) {
      const res = await fetch(`http://localhost:4000/api/carrito/${usuario}`);
      if (!res.ok) throw new Error("Error al obtener carrito");
      const data = await res.json();
      return Array.isArray(data) ? data.map(p => ({ ...p, cantidad: Number(p.cantidad) || 1 })) : [];
    } else {
      const carritoGuardado = localStorage.getItem("productos-en-carrito");
      if (carritoGuardado) {
        const data = JSON.parse(carritoGuardado);
        return Array.isArray(data) ? data.map(p => ({ ...p, cantidad: Number(p.cantidad) || 1 })) : [];
      }
    }
    return [];
  } catch (err) {
    console.error("Error al cargar carrito:", err);
    return [];
  }
};

export const guardarCarrito = async (usuario, carrito) => {
  try {
    if (usuario) {
      await fetch(`http://localhost:4000/api/carrito/${usuario}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carrito),
      });
    } else {
      localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
    }
  } catch (err) {
    console.error("Error al guardar carrito:", err);
  }
};
