import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ModalLogin from './ModalLogin';
import '../styles/Header.css';
/*Imports de Imágenes*/
import logo from '../images/logo.svg';
import menu from '../images/iconoMenu.png';

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [usuario, setUsuario] = useState({ nombre: null, avatar: null });

  useEffect(() => {
    // Cargar usuario guardado al montar
    const nombreGuardado = localStorage.getItem("nombreUsuario");
    const avatarGuardado = localStorage.getItem("avatarUsuario");
    if (nombreGuardado) setUsuario({ nombre: nombreGuardado, avatar: avatarGuardado });
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
    <header>
      <div className="header-marca">
        <img src={logo} alt="Logo Hermanos Jota" id="logo" />
        <p>Hermanos Jota</p>
      </div>
    
      <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
        <span className="close" onClick={() => setMenuOpen(false)}>&times;</span>
        <ul>
          <li><Link to="/">INICIO</Link></li>
          <li><Link to="/">PRODUCTOS</Link></li>
          <li><Link to="/contacto">CONTACTO</Link></li>
        </ul>
      </nav>

      <div className="header-right">
        {/* Icono de usuario que abre el modal */}
        <span
          className="material-symbols-outlined header-usuario"
          onClick={() => (usuario.nombre ? handleLogout() : setShowLogin(true))}
          title={usuario.nombre ? "Cerrar sesión" : "Iniciar sesión"}
        >
          {usuario.avatar ? (
            <img src={`Images/Avatares/avatar-${usuario.avatar}.png`} alt="avatar" className="avatar-icono"/>
          ) : (
            "account_circle"
          )}
        </span>

        {/* Modal */}
        <ModalLogin show={showLogin} onClose={() => setShowLogin(false)} />

        <span className="header-carrito material-symbols-outlined" id="carrito-icono" title="Carrito">
          shopping_bag
        </span>
        <span className="numerito" id="numerito">0</span>

        <img
          src={menu}
          alt="Icono Hamburguesa Menu"
          className="header-menu"
          onClick={() => setMenuOpen(true)}
        />
      </div>
    </header>
  );
}

export default Header;