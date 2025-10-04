import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './components/ProductDetail';
import Contacto from './pages/Contacto';
import Carrito from './pages/Carrito';
import CarritoLateral from './components/CarritoLateral';
import { cargarCarrito, guardarCarrito } from './components/CarritoStorage';
import { agregarProducto, eliminarProducto, vaciarCarrito, sumarCantidad, restarCantidad, calcularTotal } from './components/CarritoFunciones';

function App() {
  const [isCarritoAbierto, setIsCarritoAbierto] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const usuario = localStorage.getItem("emailUsuario");
  const saveTimeout = useRef(null);
  const toggleCarrito = () => setIsCarritoAbierto(prev => !prev);
  // Cargar carrito al iniciar
  useEffect(() => {
    const initCarrito = async () => {
      const data = await cargarCarrito(usuario);
      setCarrito(data || []);
    };
    initCarrito();
  }, [usuario]);
  // Guardar carrito en localStorage y backend con retraso para no saturar el server.
  useEffect(() => {
    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
    if (usuario) {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(() => {
        guardarCarrito(usuario, carrito);
      }, 1000);
      return () => {
        if (saveTimeout.current) clearTimeout(saveTimeout.current);
      };
    }
  }, [carrito, usuario]);

  const total = calcularTotal(carrito);
  // Funciones del carrito agrupadas, accedan a ellas con carritoFunciones.laQueNecesiten o solo ...carritoFunciones si quieren todas.
  const carritoFunciones = {
    agregarProducto: (producto) => agregarProducto(carrito, setCarrito, producto),
    eliminarProducto: (id) => eliminarProducto(carrito, setCarrito, id),
    vaciarCarrito: () => vaciarCarrito(setCarrito),
    sumarCantidad: (id) => sumarCantidad(carrito, setCarrito, id),
    restarCantidad: (id) => restarCantidad(carrito, setCarrito, id),
  };

  return (
    <Router>
      <Header toggleCarrito={toggleCarrito} carrito={carrito} />
      <CarritoLateral
        isAbierto={isCarritoAbierto}
        toggleCarrito={toggleCarrito}
        carrito={carrito}
        total={total}
        {...carritoFunciones}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={
          <Carrito carrito={carrito} {...carritoFunciones} />
        } />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/ProductDetail/:id" element={
          <ProductDetail agregarProducto={carritoFunciones.agregarProducto} />
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
