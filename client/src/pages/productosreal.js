import React, { useState, useEffect } from "react";
import '../styles/StyleProductos.css';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtro, setFiltro] = useState("");
  const [ordenamiento, setOrdenamiento] = useState("titulo");
  const [favoritos, setFavoritos] = useState([]);


useEffect(() => {
  fetch('http://localhost:4000/api/productos')
    .then(res => {
      if (!res.ok) throw new Error("Error al cargar los productos");
      return res.json();
    })
    .then(data => {
      const productosConUrl = data.map(p => ({
        ...p,
        imagen: `http://localhost:4000${p.imagen}`,
        imagenHover: p.imagenHover
          ? `http://localhost:4000${p.imagenHover}`
          : `http://localhost:4000${p.imagen}`
      }));

      setProductos(productosConUrl);

      // 🔹 restaurar y limpiar favoritos
const favsGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
const idsValidos = productosConUrl.map(p => p.id);
const favsFiltrados = favsGuardados.filter(fav => idsValidos.includes(fav));
setFavoritos(favsFiltrados);



      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setError(err.message || "Error al cargar los productos");
      setLoading(false);
    });
}, []);


  if (loading) {
    return (
      <main>
        <div className="buscador-productos">
          <p>Cargando productos...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="buscador-productos">
          <p>Error: {error}</p>
        </div>
      </main>
    );
  }

  const productosFiltrados = productos.filter(p =>
    p.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  const toggleFavorito = (idProd) => {
  if (favoritos.includes(idProd)) {
    // Si ya está en favoritos, lo saco
    setFavoritos(favoritos.filter(fav => fav !== idProd));
  } else {
    // Si no está, lo agrego
    setFavoritos([...favoritos, idProd]);
  }
};


  const productosOrdenados = [...productosFiltrados].sort((a, b) => {
    switch (ordenamiento) {
      case "precioasc":
        return a.Precio - b.Precio;
      case "preciodesc":
        return b.Precio - a.Precio;
      case "tituloAsc":
        return a.titulo.toLowerCase().localeCompare(b.titulo);
      case "tituloDesc":
        return b.titulo.toLowerCase().localeCompare(a.titulo);
      default:
        return 0;
    }
  });

  return (
    <main>
      <div className="buscador-productos">
        <input
          type="search"
          placeholder="Buscar producto..."
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
        />

        <label htmlFor="orden"> Ordenar por: </label>
        <select
          id="orden"
          name="orden"
          value={ordenamiento}
          onChange={e => setOrdenamiento(e.target.value)}
        >
          <option value="tituloAsc"> Titulo: orden ascendente (a-z) </option>
          <option value="tituloDesc"> Titulo: orden descendente (z-a) </option>
          <option value="preciodesc"> Precio: Mayor a menor </option>
          <option value="precioasc"> Precio: Menor a mayor </option>
        </select>
      </div>

      <div className="contenedor-tarjetas">
        {productosOrdenados.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#c47a6d' }}>
            No se encontraron productos
          </p>
        ) : (
          productosOrdenados.map((prod, index) => (
            <div
              key={prod.id}
              className="tarjeta-producto mostrar"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="fondo-tarjeta">
  {/* 🔹 Título arriba */}
            <div className="info-producto">
              <h3>{prod.titulo}</h3>
            </div>
            

            {/* 🔹 Imagen en el medio */}
            <div className="tarjeta-foto">
              <img src={prod.imagen} alt={prod.titulo} className="img-normal" />
              <img src={prod.imagenHover} alt={prod.titulo} className="img-hover" />
            </div>

            {/* 🔹 Precio abajo */}
            <div className="info-producto">
              <p>${prod.Precio}</p>
            </div>
              <button
                className={`btn-favorito ${favoritos.includes(prod.id) ? "activo" : ""}`}
                onClick={() => toggleFavorito(prod.id)}
              >
                {favoritos.includes(prod.id) ? "🤎 Quitar favorito" : "🤍 Agregar a favoritos"}
              </button>
            {/* 🔹 Botón al final */}
            <button
              className="btn-agregarcarrito"
              type="button"
              data-id={prod.id}
            >
              <span className="material-symbols-outlined icono-comprar" aria-hidden="true">
              shopping_bag
            </span>
            <span className="sep">|</span>
            Comprar
          </button>

          </div>

            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default Productos;
