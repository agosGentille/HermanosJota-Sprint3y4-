import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './components/ProductDetail';
import Contacto from './pages/Contacto';
import Productos from './pages/Productos'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/ProductDetail/:id" element={<ProductDetail />} />
        <Route path="/Productos" element={<Productos/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
