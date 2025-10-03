import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/*
Importar piezas de React Router:
  BrowserRouter (alias Router) — maneja el history API del navegador (URLs "bonitas" sin # como antes con html).
  Routes — contenedor de rutas (funciona como el Switch antiguo).
  Route — define una ruta individual (path → componente).
*/
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './components/ProductDetail';
import Contacto from './pages/Contacto';
import Productos from './pages/Productos'

function App() {
  return (
    <Router>
      {/*Es el "provider" del router. TODO lo que use rutas (Links, useParams, useNavigate, <Routes>...) 
      debe estar dentro de este componente.  Si ponemos x ej el Header fuera del Router, los Link 
      dentro de Header no funcionarían.*/}
      {
        /*Se usa header y footer fuera de <Routes> para que se renderice en TODAS las pags */
      }
      <Header />
      <Routes>
        {/*Contiene las rutas declaradas. React Router evalúa cuál Route coincide con la 
        URL actual y renderiza su element */}
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/ProductDetail/:id" element={<ProductDetail />} />
        <Route path = "/productos" element = {<Productos/>} />
         {/*path: Es la ruta de la URL. Puede ser estática "/contacto" o dinámica como en "/ProductDetail/:id" 
         donde el :id es un parámetro de ruta al cual se accede por useParams()*/}
         {/*element: Es el componente React que se renderiza cuando la URL coincide con 
         el path, puede incluir props */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;