import React, { useState, useEffect } from "react";
import '../styles/Header.css';
/*Imports de Imágenes*/
import avatar_ardilla from '../images/Avatares/avatar-ardilla.png';
import avatar_buho from '../images/Avatares/avatar-buho.png';
import avatar_castor from '../images/Avatares/avatar-castor.png';
import avatar_mapache from '../images/Avatares/avatar-mapache.png';
import avatar_pajaro from '../images/Avatares/avatar-pajaro.png';

function ModalLogin({ show, onClose, onLogin }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
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

    // Notificar al Header que se logueó
    if (onLogin) onLogin({ nombre, avatar });

    onClose();
  };
  
  if (!show) return null; // Si show es false, no renderiza nada

  return (
    <div className="modal" style={{ display: show ? 'flex' : 'none' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="loginForm">
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          
          <h3>Seleccioná tu Avatar</h3>
          <div className="avatar-container">
            <label>
              <input type="radio" name="avatar" value="castor" className="iconoUsuario"/>
              <img src={avatar_castor} alt="Castor" />
            </label>
            <label>
              <input type="radio" name="avatar" value="buho" />
              <img src={avatar_buho} alt="Búho" />
            </label>
            <label>
              <input type="radio" name="avatar" value="ardilla" />
              <img src={avatar_ardilla} alt="Ardilla" />
            </label>
            <label>
              <input type="radio" name="avatar" value="pajaro" />
              <img src={avatar_pajaro} alt="Pajaro Carpintero" />
            </label>
            <label>
              <input type="radio" name="avatar" value="mapache" />
              <img src={avatar_mapache} alt="Mapache" />
            </label>
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

export default ModalLogin;