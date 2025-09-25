import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalLogin from './ModalLogin';
import '../styles/Header.css';

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="header-marca">
        <img src="Images/logo.svg" alt="Logo Hermanos Jota" id="logo" />
        <p>Hermanos Jota</p>
      </div>
    
      <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
        <img
          src="Images/icono-cerrar.png"
          alt="Botón Cerrar"
          id="btnCerrarMenu"
          onClick={() => setMenuOpen(false)}
        />
        <ul>
          <li><Link to="/">INICIO</Link></li>
          <li><Link to="/">PRODUCTOS</Link></li>
          <li><Link to="/contacto">CONTACTO</Link></li>
        </ul>
      </nav>

      <div className="header-right">
        {/* Icono de usuario que abre el modal */}
        <span
          className="header-usuario material-symbols-outlined"
          id="iconoUsuario"
          title="Iniciar Sesión"
          onClick={() => setShowLogin(true)}
          style={{ cursor: 'pointer' }}
        >
          account_circle
        </span>

        {/* Modal */}
        <ModalLogin show={showLogin} onClose={() => setShowLogin(false)} />

        <span className="header-carrito material-symbols-outlined" id="carrito-icono" title="Carrito">
          shopping_bag
        </span>
        <span className="numerito" id="numerito">0</span>

        <img
          src="Images/iconoMenu.png"
          alt="Icono Hamburguesa Menu"
          className="header-menu"
          onClick={() => setMenuOpen(true)}
        />
      </div>
    </header>
  );
}

export default Header;