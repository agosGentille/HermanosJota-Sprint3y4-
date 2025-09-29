import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ModalLogin from './ModalLogin';
import ModalRegister from './ModalRegister';
import '../styles/HeaderFooter.css';
/*Imports de Imágenes*/
import logo from '../images/logo.svg';
import menu from '../images/iconoMenu.png';

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [usuario, setUsuario] = useState({ nombre: null, email: null });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showRegister, setShowRegister] = useState(false);

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cargar usuario guardado 
  useEffect(() => {
    const nombreGuardado = localStorage.getItem("nombreUsuario");
    if (nombreGuardado){
      setUsuario({ nombre: nombreGuardado, email: localStorage.getItem("emailUsuario")});
    }
  }, []);

  const handleLogin = ({ nombre }) => {
    setUsuario({ nombre });
  };

  const handleLogout = () => {
    if (window.confirm("¿Desea cerrar sesión?")) {
      localStorage.removeItem("nombreUsuario");
      localStorage.removeItem("emailUsuario");
      setUsuario({ nombre: null});
    }
  };


 return (
    <header className='header-sticky'>
      <div className="header-marca">
        <img src={logo} alt="Logo Hermanos Jota" id="logo" />
        <p>Hermanos Jota</p>
      </div>

      <nav className={`header-nav ${isMobile && menuOpen ? 'open' : ''}`}>
        {isMobile && (
          <span className="close" onClick={() => setMenuOpen(false)}>
            &times;
          </span>
        )}
        <ul>
          <li><Link to="/">INICIO</Link></li>
          <li><Link to="/">PRODUCTOS</Link></li>
          <li><Link to="/contacto">CONTACTO</Link></li>
        </ul>
      </nav>

      <div className="header-right">
        {/*en OnClick Si existe un nombre (esta logueado) damos la op de cerrar 
        sesion, sino la op de loguearse con el form de Login*/}
        <span
          className={`material-symbols-outlined header-usuario ${usuario.nombre ? "logueado" : ""}`}
          onClick={() => (usuario.nombre ? handleLogout() : setShowLogin(true))}
          title={usuario.nombre ? "Cerrar sesión" : "Iniciar sesión"}
        >
          account_circle
        </span>

        <ModalLogin show={showLogin} onClose={() => setShowLogin(false)} onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />
        <ModalRegister show={showRegister} onClose={() => setShowRegister(false)} onLogin={handleLogin} onShowLogin={() => setShowLogin(true)}/>
        <span className="header-carrito material-symbols-outlined" id="carrito-icono" title="Carrito">
          shopping_bag
        </span>
        <span className="numerito" id="numerito">0</span>

        {isMobile && (
          <img
            src={menu}
            alt="Icono Hamburguesa Menu"
            className="header-menu"
            onClick={() => setMenuOpen(true)}
          />
        )}
      </div>
    </header>
  );
}

export default Header;