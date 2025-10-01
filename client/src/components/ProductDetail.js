import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/productDetail.css';

export default function ProductDetail({ onAddToCart }) {
  const { id } = useParams(); // obtenemos el id de la URL
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/productos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      })
      .then(data => setProducto(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!producto) return null;

  return (
    <div className="detalle_producto">
      <button onClick={() => navigate(-1)}>← Volver al catálogo</button>
      <img src={producto.imagen} alt={producto.titulo} />
      <h2>{producto.titulo}</h2>
      <p>{producto.descripcion}</p>
      <p className="precio">${producto.Precio ?? "Consultar"}.-</p>
      
      <div className="detalle_info">
        {producto.medidas && <p><strong>Medidas:</strong> {producto.medidas}</p>}
        {producto.materiales && <p><strong>Materiales:</strong> {producto.materiales}</p>}
        {producto.acabado && <p><strong>Acabado:</strong> {producto.acabado}</p>}
        {producto.peso && <p><strong>Peso:</strong> {producto.peso}</p>}
        {producto.capacidad && <p><strong>Capacidad:</strong> {producto.capacidad}</p>}
        {producto.tapizado && <p><strong>Tapizado:</strong> {producto.tapizado}</p>}
        {producto.confort && <p><strong>Confort:</strong> {producto.confort}</p>}
        {producto.almacenamiento && <p><strong>Almacenamiento:</strong> {producto.almacenamiento}</p>}
        {producto.cables && <p><strong>Cables:</strong> {producto.cables}</p>}
        {producto.extension && <p><strong>Extensión:</strong> {producto.extension}</p>}
        {producto.carga_max && <p><strong>Carga máxima:</strong> {producto.carga_max}</p>}
        {producto.caracteristicas && <p><strong>Características:</strong> {producto.caracteristicas}</p>}
        {producto.regulacion && <p><strong>Regulación:</strong> {producto.regulacion}</p>}
        {producto.certificacion && <p><strong>Certificación:</strong> {producto.certificacion}</p>}
        {producto.apilables && <p><strong>Apilables:</strong> {producto.apilables}</p>}
        {producto.rotacion && <p><strong>Rotación:</strong> {producto.rotacion}</p>}
        {producto.garantia && <p><strong>Garantía:</strong> {producto.garantia}</p>}
        {producto.estructura && <p><strong>Estructura:</strong> {producto.estructura}</p>}
        {producto.sostenibilidad && <p><strong>Sostenibilidad:</strong> {producto.sostenibilidad}</p>}
        {producto.colchon && <p><strong>Colchón:</strong> {producto.colchon}</p>}
      </div>
      <button onClick={() => onAddToCart(producto)}>Añadir al carrito</button>
    </div>
  );
}
