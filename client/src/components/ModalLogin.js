import React, { useState } from "react";
import '../styles/Header.css';

function ModalLogin({ show, onClose }) {
  if (!show) return null; // Si show es false, no renderiza nada

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <img id="avatarMini" alt="Avatar seleccionado" />
        <h2>Iniciar Sesión</h2>
        <form id="loginForm">
          <input type="text" id="nombre" required placeholder="Nombre" />
          <input type="email" id="email" required placeholder="Correo Electrónico" />
          <h3>Seleccioná tu Avatar</h3>
          <div className="avatar-container">
            <label>
              <input type="radio" name="avatar" value="castor" />
              <img src="Images/Avatares/avatar-castor.png" alt="Castor" />
            </label>
            <label>
              <input type="radio" name="avatar" value="buho" />
              <img src="Images/Avatares/avatar-buho.png" alt="Búho" />
            </label>
            <label>
              <input type="radio" name="avatar" value="ardilla" />
              <img src="Images/Avatares/avatar-ardilla.png" alt="Ardilla" />
            </label>
            <label>
              <input type="radio" name="avatar" value="pajaro" />
              <img src="Images/Avatares/avatar-pajaro.png" alt="Pajaro Carpintero" />
            </label>
            <label>
              <input type="radio" name="avatar" value="mapache" />
              <img src="Images/Avatares/avatar-mapache.png" alt="Mapache" />
            </label>
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

export default ModalLogin;