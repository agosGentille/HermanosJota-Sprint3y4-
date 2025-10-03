import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './components/ProductDetail';
import Contacto from './pages/Contacto';
import Carrito from './pages/Carrito';
import CarritoLateral from './components/CarritoLateral';
import { cargarCarrito, guardarCarrito } from './components/CarritoStorage';
import {
  agregarProducto,
  eliminarProducto,
  vaciarCarrito,
  sumarCantidad,
  restarCantidad,
  calcularTotal
} from './components/CarritoFunciones';

function App() {
  const [isCarritoAbierto, setIsCarritoAbierto] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const usuario = localStorage.getItem("emailUsuario");

  const toggleCarrito = () => setIsCarritoAbierto(prev => !prev);

  // Cargar carrito
  useEffect(() => {
    const initCarrito = async () => {
      const data = await cargarCarrito(usuario);
      setCarrito(data);
    };
    initCarrito();
  }, [usuario]);

  // Guardar carrito automáticamente
  useEffect(() => {
    if (carrito.length >= 0) guardarCarrito(usuario, carrito);
  }, [carrito, usuario]);

  const total = calcularTotal(carrito);

  return (
    <Router>
      <Header toggleCarrito={toggleCarrito} carrito={carrito} />
      <CarritoLateral
        isAbierto={isCarritoAbierto}
        toggleCarrito={toggleCarrito}
        carrito={carrito}
        eliminarProducto={(id) => eliminarProducto(carrito, setCarrito, id)}
        vaciarCarrito={() => vaciarCarrito(setCarrito)}
        sumarCantidad={(id) => sumarCantidad(carrito, setCarrito, id)}
        restarCantidad={(id) => restarCantidad(carrito, setCarrito, id)}
        total={total}
      />
      <Routes>
        <Route path="/" element={<Home agregarProducto={(producto) => agregarProducto(carrito, setCarrito, producto)} />} />
        <Route
          path="/carrito"
          element={
            <Carrito
              carrito={carrito}
              eliminarProducto={(id) => eliminarProducto(carrito, setCarrito, id)}
              vaciarCarrito={() => vaciarCarrito(setCarrito)}
              sumarCantidad={(id) => sumarCantidad(carrito, setCarrito, id)}
              restarCantidad={(id) => restarCantidad(carrito, setCarrito, id)}
              total={total}
            />
          }
        />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/ProductDetail/:id" element={<ProductDetail agregarProducto={(producto) => agregarProducto(carrito, setCarrito, producto)} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
