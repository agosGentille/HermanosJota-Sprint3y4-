import React, { useState, useEffect } from "react";
import '../styles/Header.css';
/*Imports de Imágenes*/
import av_ardilla from '../images/Avatares/avatar-ardilla.png';
import av_buho from '../images/Avatares/avatar-buho.png';
import av_castor from '../images/Avatares/avatar-castor.png';
import av_mapache from '../images/Avatares/avatar-mapache.png';
import av_pajaro from '../images/Avatares/avatar-pajaro.png';

function ModalLogin({ show, onClose }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    // Cargar usuario guardado al abrir modal
    const nombreGuardado = localStorage.getItem("nombreUsuario");
    const emailGuardado = localStorage.getItem("emailUsuario");
    const avatarGuardado = localStorage.getItem("avatarUsuario");

    if (nombreGuardado) setNombre(nombreGuardado);
    if (emailGuardado) setEmail(emailGuardado);
    if (avatarGuardado) setAvatar(avatarGuardado);
  }, [show]);

  const handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem("nombreUsuario", nombre);
    localStorage.setItem("emailUsuario", email);
    if(avatar) localStorage.setItem("avatarUsuario", avatar);
    onClose();
  };
  
  if (!show) return null; // Si show es false, no renderiza nada

  return (
    <div className="modal" style={{ display: show ? 'flex' : 'none' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <img id="avatarMini" alt="Avatar seleccionado" />
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="loginForm">
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          
          <h3>Seleccioná tu Avatar</h3>
          <div className="avatar-container">
            <label>
              <input type="radio" name="avatar" value="castor" className="iconoUsuario"/>
              <img src={av_castor} alt="Castor" />
            </label>
            <label>
              <input type="radio" name="avatar" value="buho" />
              <img src={av_buho} alt="Búho" />
            </label>
            <label>
              <input type="radio" name="avatar" value="ardilla" />
              <img src={av_ardilla} alt="Ardilla" />
            </label>
            <label>
              <input type="radio" name="avatar" value="pajaro" />
              <img src={av_pajaro} alt="Pajaro Carpintero" />
            </label>
            <label>
              <input type="radio" name="avatar" value="mapache" />
              <img src={av_mapache} alt="Mapache" />
            </label>
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

export default ModalLogin;