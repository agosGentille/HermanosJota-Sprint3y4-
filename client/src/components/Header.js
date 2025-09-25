import React from 'react';

function Header() {
  return (
    <header>
      <nav>
        <ul style={{ display: 'flex', gap: '10px', listStyle: 'none' }}>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Productos</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;