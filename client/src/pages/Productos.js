import React, { useState, useEffect, use } from "react";
import "../styles/StyleProductos.css";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtro, setFiltro] = useState("");
  const [ordenamiento, setOrdenamiento] = useState("titulo");
  const [favoritos, setFavoritos] = useState([]);
  const [categoriaSeleccionadas, setCategoriaSeleccionadas] = useState([]);
  const [precioSeleccionado, setPrecioSeleccionado] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [certificadoSeleccionado, setCertificadoSeleccionado] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/api/productos")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar los productos");
        return res.json();
      })
      .then((data) => {
        const productosConUrl = data.map((p) => ({
          ...p,
          imagen: `http://localhost:4000${p.imagen}`,
          imagenHover: p.imagenHover
            ? `http://localhost:4000${p.imagenHover}`
            : `http://localhost:4000${p.imagen}`,
        }));

        setProductos(productosConUrl);

        // 🔹 restaurar favoritos válidos
        const favsGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
        const idsValidos = productosConUrl.map((p) => p.id);
        const favsFiltrados = favsGuardados.filter((fav) => idsValidos.includes(fav));
        setFavoritos(favsFiltrados);

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Error al cargar los productos");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <main>
        <div className="buscador-productos">
          <p>Cargando productos...</p>
        </div>
      </main>
    );

  if (error)
    return (
      <main>
        <div className="buscador-productos">
          <p>Error: {error}</p>
        </div>
      </main>
    );

const precios = productos.map(p => p.Precio);
const precioPromedio = precios.reduce((acc, p) => acc + p, 0) / precios.length;

// Definí límites usando el promedio
const limiteBajo = Math.round(precioPromedio * 0.8);  // 20% menos que el promedio
const limiteAlto = Math.round(precioPromedio * 1.2);   // 20% más que el promedio
const aplicarRangoPersonalizado = () => {
  setPrecioSeleccionado("personalizado");
};

  /* 🔹 Filtrado combinado */
  const productosFiltrados = productos.filter((p) => {
    const coincideBusqueda = p.titulo.toLowerCase().includes(filtro.toLowerCase());

    // 🔹 Categorías
    const categoria = p.titulo.trim().split(" ")[0].toLowerCase();
    const coincideCategoria =
      categoriaSeleccionadas.length === 0 || categoriaSeleccionadas.includes(categoria);

    // 🔹 Precio
    let coincidePrecio = true;
    if (precioSeleccionado === "menor") coincidePrecio = p.Precio < limiteBajo;
    else if (precioSeleccionado === "menoryMayor") coincidePrecio = p.Precio >= limiteBajo && p.Precio <= limiteAlto;
    else if (precioSeleccionado === "mayor") coincidePrecio = p.Precio > limiteAlto;

    if (precioSeleccionado === "personalizado") {
    coincidePrecio =
      (!precioMin || p.Precio >= precioMin) &&
      (!precioMax || p.Precio <= precioMax);
  }

    const coincideCertificado = !certificadoSeleccionado || p.certificacion !== null;



    return coincideBusqueda && coincideCategoria && coincidePrecio && coincideCertificado;
  });

  /* 🔹 Categorías dinámicas */
  const categoriasProductos = Array.from(
    new Set(productos.map((p) => p.titulo?.trim().split(" ")[0].toLowerCase()))
  );
  const limpiarFiltros = () => {
  setFiltro("");
  setCategoriaSeleccionadas([]);
  setPrecioSeleccionado("");
  setPrecioMin("");
  setPrecioMax("");
  setCertificadoSeleccionado(false);
};


  const toggleFavorito = (idProd) => {
    if (favoritos.includes(idProd)) {
      setFavoritos(favoritos.filter((fav) => fav !== idProd));
    } else {
      setFavoritos([...favoritos, idProd]);
    }
  };


  const handleCategoriaChange = (e) => {
    const nombre = e.target.value;
    const checked = e.target.checked;
    setCategoriaSeleccionadas((prev) =>
      checked ? [...prev, nombre] : prev.filter((cat) => cat !== nombre)
    );
  };

  const handlePrecioChange = (e) => {
    setPrecioSeleccionado(e.target.value);
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
    <main className="productos-container">
      <aside className="filtros">
        <h2>Filtros</h2>

        <div className="filtro-seccion">
          <h3>Categoría</h3>
          <ul>
            {categoriasProductos.map((cat, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  id={`cat-${i}`}
                  name="categoria"
                  value={cat}
                  onChange={handleCategoriaChange}
                  checked={categoriaSeleccionadas.includes(cat)}
                />
                <label htmlFor={`cat-${i}`}>{cat}</label>
              </li>
            ))}
          </ul>
        </div>
        <div className="filtro-seccion">
          <h3>Certificado</h3>
          <label>
            <input
              type="checkbox"
              checked={certificadoSeleccionado}
              onChange={(e) => setCertificadoSeleccionado(e.target.checked)}
            />
            Posee certificacion
          </label>
        </div>
        <div className="filtro-seccion">
          <h3>Precio</h3>
          <ul>
            <li>
              <input
                type="radio"
                name="precio"
                value="menor"
                checked={precioSeleccionado === "menor"}
                onChange={handlePrecioChange}
              />
              Hasta ${limiteBajo.toLocaleString("es-AR")}
            </li>
            <li>
              <input
                type="radio"
                name="precio"
                value="menoryMayor"
                checked={precioSeleccionado === "menoryMayor"}
                onChange={handlePrecioChange}
              />{" "}
              ${limiteBajo.toLocaleString("es-AR")} a ${limiteAlto.toLocaleString("es-AR")}
            </li>
            <li>
              <input
                type="radio"
                name="precio"
                value="mayor"
                checked={precioSeleccionado === "mayor"}
                onChange={handlePrecioChange}
              />{" "}
              Mas de ${limiteAlto.toLocaleString("es-AR")}
            </li>
          </ul>
          <div className="filtro-rango">
          <label>Rango personalizado: </label>
          <div className="inputs-rango">
            <input
              type="text"
              placeholder="Mínimo"
              value={precioMin || ""}
              onChange={(e) => setPrecioMin(Number(e.target.value))}
            />
            <span> - </span>
            <input
              type="text"
              placeholder="Máximo"
              value={precioMax || ""}
              onChange={(e) => setPrecioMax(Number(e.target.value))}
            />
          </div>
        </div>
          <button className="btn-limpiar" onClick={limpiarFiltros}>
          Limpiar filtros
        </button>
        </div>
      </aside>

      <section className="catalogo">
        <div className="catalogo-header">
          <input
            type="search"
            placeholder="Buscar producto..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />

          <div>
            <label htmlFor="orden">Ordenar por: </label>
            <select
              id="orden"
              name="orden"
              value={ordenamiento}
              onChange={(e) => setOrdenamiento(e.target.value)}
            >
              <option value="tituloAsc">Título (A-Z)</option>
              <option value="tituloDesc">Título (Z-A)</option>
              <option value="preciodesc">Precio (Mayor a menor)</option>
              <option value="precioasc">Precio (Menor a mayor)</option>
            </select>
          </div>
        </div>

        <div className="contenedor-tarjetas">
          {productosOrdenados.length === 0 ? (
            <p
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                color: "#c47a6d",
              }}
            >
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
                  <div className="info-producto">
                    <h3>{prod.titulo}</h3>
                  </div>

                  <div className="tarjeta-foto">
                    <img
                      src={prod.imagen}
                      alt={prod.titulo}
                      className="img-normal"
                    />
                    <img
                      src={prod.imagenHover}
                      alt={prod.titulo}
                      className="img-hover"
                    />
                  </div>

                  <div className="info-producto">
                    <p>${prod.Precio.toLocaleString("es-AR")}</p>
                  </div>

                  <button
                    className={`btn-favorito ${
                      favoritos.includes(prod.id) ? "activo" : ""
                    }`}
                    onClick={() => toggleFavorito(prod.id)}
                  >
                    {favoritos.includes(prod.id)
                      ? "🤎 Quitar favorito"
                      : "🤍 Agregar a favoritos"}
                  </button>

                  <button
                    className="btn-agregarcarrito"
                    type="button"
                    data-id={prod.id}
                  >
                    <span className="material-symbols-outlined icono-comprar">
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
      </section>
    </main>
  );
}

export default Productos;
