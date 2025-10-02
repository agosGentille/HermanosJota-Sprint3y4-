import React, { useState } from "react";

// para el estado inicial se puede tomar los datos del localStorage
// lo que esta abajo es lo que estaba del sprint anterior
// function autorellenarFormulario() {
//   const nombre = localStorage.getItem("nombreUsuario");
//   const email = localStorage.getItem("emailUsuario");

//   if (nombre) {
//     document.getElementById("nombre").value = nombre;
//   }
//   if (email) {
//     document.getElementById("email").value = email;
//   }
// }
// document.addEventListener("DOMContentLoaded", autorellenarFormulario);

const initialState = {
  nombre: "",
  email: "",
  mensaje: "",
};

const formularios = [];

export default function ContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSuccessMessage(""); // ocultar mensaje previo al volver a editar
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { nombre, email, mensaje } = formData;

    if (!nombre.trim() || !email.trim() || !mensaje.trim()) {
      alert("Por favor, complete todos los campos.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, ingrese un correo electrónico válido.");
      return false;
    }

    if (mensaje.trim().length < 10) {
      alert("El mensaje debe tener al menos 10 caracteres.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("Datos del formulario:", formData);

    // espacio para la conexion con el backend
    // la siguiente funcion es la que estaba del sprint anterior
    // async function cargarDatosDelFormulario(formData) {
    //   try {
    //     const url = "/api/contacto"; // cuando tengamos el backend hay que cambiar aca
    //     const response = await fetch(url, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(formData),
    //     });

    //     if (response.ok) {
    //       alert("Mensaje enviado al servidor correctamente");
    //     } else {
    //       alert("Error al enviar el mensaje al servidor");
    //     }
    //   } catch (error) {
    //     console.error("Error:", error);
    //     alert("Error de conexión");
    //   }
    // }

    setSuccessMessage("¡Mensaje enviado con éxito!");
    formularios.push(formData);
    setFormData(initialState);
  };

  return (
    // eslint-disable-next-line
    <form
      aria-label="contact-form"
      role="form"
      onSubmit={handleSubmit}
      className="contacto__formulario"
    >
      <label htmlFor="nombre" className="contacto__formulario__label">
        Nombre:
      </label>
      <input
        id="nombre"
        name="nombre"
        type="text"
        value={formData.nombre}
        onChange={handleChange}
        required
        className="contacto__formulario__input contacto__formulario__campo"
        placeholder="Ingrese su nombre..."
      />

      <label htmlFor="email" className="contacto__formulario__label">
        Email:
      </label>
      <input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="contacto__formulario__input contacto__formulario__campo"
        placeholder="Ingrese su email..."
      />

      <label htmlFor="mensaje" className="contacto__formulario__label">
        Mensaje:
      </label>
      <textarea
        id="mensaje"
        name="mensaje"
        rows="4"
        value={formData.mensaje}
        onChange={handleChange}
        required
        className="contacto__formulario__mensaje contacto__formulario__campo"
        placeholder="Ingrese su mensaje..."
      />

      <button type="submit" className="contacto__formulario__boton">
        Enviar
      </button>

      {successMessage && (
        <p
          id="mensaje-exito"
          style={{
            color: "#87a96b",
            fontWeight: "700",
            marginTop: "1rem",
          }}
        >
          {successMessage}
        </p>
      )}
    </form>
  );
}
