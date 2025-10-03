import React, { useState } from "react";

// para el estado inicial se puede tomar los datos del localStorage

const initialState = {
  nombre: localStorage.getItem("nombreUsuario") || "",
  email: localStorage.getItem("emailUsuario") || "",
  mensaje: "",
};

const initialErrors = {
  nombre: "",
  email: "",
  mensaje: "",
};

const formularios = [];

export default function ContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [successMessage, setSuccessMessage] = useState("");
  const [touched, setTouched] = useState({
    nombre: false,
    email: false,
    mensaje: false,
  });

  const MENSAJE_MIN_LENGTH = 10;
  const MENSAJE_MAX_LENGTH = 500;
  const NOMBRE_MAX_LENGTH = 100;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "nombre":
        if (!value.trim()) {
          error = "El nombre es obligatorio.";
        } else if (value.trim().length < 2) {
          error = "El nombre debe tener al menos 2 caracteres.";
        } else if (value.length > NOMBRE_MAX_LENGTH) {
          error = `El nombre no puede exceder ${NOMBRE_MAX_LENGTH} caracteres.`;
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "El email es obligatorio.";
        } else if (!emailRegex.test(value.trim())) {
          error = "Por favor, ingrese un email válido.";
        }
        break;

      case "mensaje":
        const trimmedLength = value.trim().length;
        if (!value.trim()) {
          error = "El mensaje es obligatorio.";
        } else if (trimmedLength < MENSAJE_MIN_LENGTH) {
          error = `El mensaje debe tener al menos ${MENSAJE_MIN_LENGTH} caracteres.`;
        } else if (value.length > MENSAJE_MAX_LENGTH) {
          error = `El mensaje no puede exceder ${MENSAJE_MAX_LENGTH} caracteres.`;
        }
        break;

      default:
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {
      nombre: validateField("nombre", formData.nombre),
      email: validateField("email", formData.email),
      mensaje: validateField("mensaje", formData.mensaje),
    };

    setErrors(newErrors);

    setTouched({
      nombre: true,
      email: true,
      mensaje: true,
    });

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSuccessMessage(""); // ocultar mensaje previo al volver a editar
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const cleanData = {
      nombre: formData.nombre.trim(),
      email: formData.email.trim().toLowerCase(),
      mensaje: formData.mensaje.trim(),
    };

    console.log("Datos del formulario:", cleanData);

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
    setErrors(initialErrors);
    setTouched({
      nombre: false,
      email: false,
      mensaje: false,
    });
  };

  const mensajeCharsLeft = MENSAJE_MAX_LENGTH - formData.mensaje.length;
  const mensajeCharsCount = formData.mensaje.trim().length;

  return (
    <form
      aria-label="contact-form"
      onSubmit={handleSubmit}
      className="contacto__formulario"
      noValidate
    >
      <label htmlFor="nombre" className="contacto__formulario__label">
        Nombre: <span className="required">*</span>
      </label>
      <input
        id="nombre"
        name="nombre"
        type="text"
        value={formData.nombre}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={touched.nombre && errors.nombre ? "true" : "false"}
        aria-describedby={errors.nombre ? "nombre-error" : undefined}
        className={`contacto__formulario__input  ${
          touched.nombre && errors.nombre ? "input-error" : ""
        } ${
          touched.nombre && !errors.nombre && formData.nombre
            ? "input-success"
            : ""
        }`}
        placeholder="Ingrese su nombre..."
        maxLength={NOMBRE_MAX_LENGTH}
      />
      {touched.nombre && errors.nombre && (
        <span id="nombre-error" className="error-message" role="alert">
          {errors.nombre}
        </span>
      )}

      <label htmlFor="email" className="contacto__formulario__label">
        Email: <span className="required">*</span>
      </label>
      <input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={touched.email && errors.email ? "true" : "false"}
        aria-describedby={errors.email ? "email-error" : undefined}
        className={`contacto__formulario__input  ${
          touched.email && errors.email ? "input-error" : ""
        } ${
          touched.email && !errors.email && formData.email
            ? "input-success"
            : ""
        }`}
        placeholder="Ingrese su email..."
      />
      {touched.email && errors.email && (
        <span id="email-error" className="error-message" role="alert">
          {errors.email}
        </span>
      )}

      <label htmlFor="mensaje" className="contacto__formulario__label">
        Mensaje: <span className="required">*</span>
      </label>
      <textarea
        id="mensaje"
        name="mensaje"
        rows="5"
        value={formData.mensaje}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={touched.mensaje && errors.mensaje ? "true" : "false"}
        aria-describedby={errors.mensaje ? "mensaje-error" : "mensaje-contador"}
        className={`contacto__formulario__mensaje  ${
          touched.mensaje && errors.mensaje ? "input-error" : ""
        } ${
          touched.mensaje && !errors.mensaje && formData.mensaje
            ? "input-success"
            : ""
        }`}
        placeholder="Ingrese su mensaje..."
        maxLength={MENSAJE_MAX_LENGTH}
      />
      <div className="mensaje-info">
        <span
          id="mensaje-contador"
          className={`char-counter ${
            mensajeCharsLeft < 50 ? "char-counter-warning" : ""
          }`}
        >
          {mensajeCharsCount}/{MENSAJE_MIN_LENGTH} caracteres mínimo |{" "}
          {mensajeCharsLeft} restantes
        </span>
      </div>
      {touched.mensaje && errors.mensaje && (
        <span id="mensaje-error" className="error-message" role="alert">
          {errors.mensaje}
        </span>
      )}

      <button
        type="submit"
        className="contacto__formulario__boton"
        disabled={successMessage !== ""}
      >
        Enviar
      </button>

      {successMessage && (
        <div
          id="mensaje-exito"
          className="success-message mensaje-exito"
          role="status"
          aria-live="polite"
        >
          ✓ {successMessage}
        </div>
      )}
    </form>
  );
}
