import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ModalLogin from './ModalLogin';
import '../styles/Header.css';
/*Imports de Imágenes*/
import logo from '../images/logo.svg';
import menu from '../images/iconoMenu.png';

import avatar_ardilla from '../images/Avatares/avatar-ardilla.png';
import avatar_buho from '../images/Avatares/avatar-buho.png';
import avatar_castor from '../images/Avatares/avatar-castor.png';
import avatar_mapache from '../images/Avatares/avatar-mapache.png';
import avatar_pajaro from '../images/Avatares/avatar-pajaro.png';

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [usuario, setUsuario] = useState({ nombre: null, email: null, avatar: null });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const avatarMap = {
    castor: avatar_castor,
    buho: avatar_buho,
    ardilla: avatar_ardilla,
    pajaro: avatar_pajaro,
    mapache: avatar_mapache
  };

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
      setUsuario({ nombre: nombreGuardado, email: localStorage.getItem("emailUsuario"), avatar: localStorage.getItem("avatarUsuario") });
    }
  }, []);

  const handleLogin = ({ nombre, avatar }) => {
    setUsuario({ nombre, avatar });
  };

  const handleLogout = () => {
    if (window.confirm("¿Desea cerrar sesión?")) {
      localStorage.removeItem("nombreUsuario");
      localStorage.removeItem("emailUsuario");
      localStorage.removeItem("avatarUsuario");
      setUsuario({ nombre: null, avatar: null });
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
        <span
          className={`material-symbols-outlined header-usuario ${usuario.nombre && !usuario.avatar ? "logueado" : ""}`}
          onClick={() => (usuario.nombre ? handleLogout() : setShowLogin(true))}
          title={usuario.nombre ? "Cerrar sesión" : "Iniciar sesión"}
        >
          {usuario.avatar ? (
            <img src={avatarMap[usuario.avatar]} id="avatarMini" alt="Avatar seleccionado"/>
          ) : (
            "account_circle"
          )}
        </span>

        <ModalLogin show={showLogin} onClose={() => setShowLogin(false)} onLogin={handleLogin} />

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