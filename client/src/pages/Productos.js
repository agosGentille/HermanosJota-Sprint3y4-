import React, {useState, useEffect} from "react";
import '../styles/StyleProductos.css';

function Productos () {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtro, setFiltro] = useState("");
  const [ordenamiento, setOrdenamiento] = useState("titulo");

  useEffect(() => {
    fetch('http://localhost:4000/api/productos')
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar los productos");
        return res.json();
      })
      .then(data => {
        const productosConUrl = data.map(p => ({
          ...p,
          imagen: `http://localhost:4000${p.imagen}`
        }));
        setProductos(productosConUrl);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message || "Error al cargar los productos");
        setLoading(false);
      });
  }, []);

  // 🔹 filtro
  const productosFiltrados = productos.filter(p =>
    p.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  // 🔹 ordenamiento
  const productosOrdenados = [...productosFiltrados].sort((a, b) => {
    switch (ordenamiento) {
      case "Precio":
        return a.Precio - b.Precio;
      case "titulo":
        return a.titulo.localeCompare(b.titulo);
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

        <label htmlFor="orden">Ordenar por:</label>
        <select
          id="orden"
          name="orden"
          value={ordenamiento}
          onChange={e => setOrdenamiento(e.target.value)}
        >
          <option value="titulo">Título</option>
          <option value="Precio">Precio</option>
        </select>
      </div>

      <div className="contenedor-tarjetas">
        {productosOrdenados.map((prod, index) => (
          <div
            key={prod.id}
            className="tarjeta-producto mostrar"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <a href={`producto.html?id=${prod.id}`}>
              <img
                src={prod.imagen}
                alt={prod.titulo}
                className="tarjeta-foto"
              />
              <h3>{prod.titulo}</h3>
              <p>${prod.Precio}</p> {/* 👈 asegurate que sea 'precio' y no 'Precio' */}
            </a>
            <button
              className="btn-agregarcarrito"
              type="button"
              data-id={prod.id}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Productos;
