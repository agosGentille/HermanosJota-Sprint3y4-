import React, { useState, useEffect } from "react";
import '../styles/HeaderFooter.css';

function ModalRegister({ show, onClose, onLogin, onShowLogin}) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      setNombre("");
      setEmail("");
      setError("");
    }
  }, [show]);

  if (!show) return null;

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await fetch("http://localhost:4000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, email })
        });

        setLoading(false);

        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Error al registrarse");
          return;
        }

        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("nombreUsuario", data.usuario.nombre);
        localStorage.setItem("emailUsuario", data.usuario.email);

        onLogin({ nombre: data.usuario.nombre });
        onClose();
      } catch (err) {
        setError("No se pudo conectar con el servidor");
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="modal" style={{ display: show ? 'flex' : 'none' }}>
      <div className="modal-content">
        <div className="botones-cerrar-volver">
          <span
            className="volver"
            onClick={() => {
              onClose();
              if (onShowLogin) onShowLogin();
            }}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </span>
          <span className="close" onClick={onClose}>&times;</span>
        </div>
        <h2>Registro</h2>
        <p className={`errorLogin ${error ? "active" : ""}`}>* {error}</p>
        <form onSubmit={handleSubmit} className="loginForm">
          <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <button type="submit">{loading ? "Registrando..." : "Registrarse"}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalRegister;