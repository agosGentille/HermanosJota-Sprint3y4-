# E-commerce Mueblería Hermanos Jota

---

## Grupo 11 - Code Breakers

- Fabrizio, Jazmin Maia
- Gentille, Agostina Abril
- Giménez, Agustín José
- Insaurralde, Mariano Gastón
- Vila, Juan Manuel

---

## Descripción del Proyecto

Este proyecto corresponde a la **Consigna Final - Sprint 3 y 4**.  
Se trata de la segunda fase en la construcción de la plataforma de e-commerce para **Mueblería Hermanos Jota**, donde se da un salto tecnológico importante: se reconstruye el frontend usando **React** y se implementa un backend con **Node.js y Express**, creando una verdadera arquitectura cliente-servidor.

El objetivo de esta entrega es:
- Reconstruir la interfaz de usuario como una SPA (Single Page Application) con React.
- Conectar la aplicación con un backend propio que sirva datos dinámicos de productos.
- Manejar estado y eventos en React, incluyendo carrito de compras y renderizado condicional.
- Implementar una API REST básica en Node.js/Express para listar productos y obtener detalles individuales.

El sitio incluye:
- **Navbar y Footer** reutilizables con estado dinámico del carrito.
- **Página de Catálogo:** carga de productos desde la API, estados de "Cargando..." y manejo de errores.
- **Vista de Detalle de Producto:** renderizado condicional al seleccionar un producto del catálogo.
- **Carrito de Compras:** estado global en React, contador de ítems en el navbar y posibilidad de agregar productos desde la vista de detalle.
- **Formulario de Contacto:** formulario controlado con React que valida y registra la información en la consola al enviar.
- **Inicio de Sesión:** El sistema cuenta con un modal de login que permite a los usuarios ingresar con sus credenciales. Una vez autenticados correctamente:
    - Se genera un token temporal (actualmente tokens falsos a modo de prueba).
    - Dicho token se guarda en localStorage del navegador.
    - El token se envía en cada request para validar el acceso a las rutas protegidas.
⚠️ En esta versión de prueba los tokens no son reales (se usan prefijos como fake-token-), pero el flujo está preparado para, si se quiere, migrar por ejemplo a JWT en el futuro.
- **Registro de Usuarios:** El sistema cuenta con un modal de registro que permite crear nuevos usuarios. Los datos de registro se guardan temporalmente en un array en el servidor. IMPORTANTE: Estos usuarios estarán disponibles mientras Node.js se encuentre en ejecución. Si el servidor se reinicia, los datos se pierden (no hay persistencia en base de datos por el momento).

---

## Tecnologías Utilizadas

### Frontend
- **React** → Arquitectura de componentes, hooks (`useState`, `useEffect`), props y manejo de estado.
- **CSS3 (Flexbox + Responsive)** → Estilos responsivos y maquetación moderna.
- **React Router (Opcional)** → Para rutas de detalle de productos (si se decide usar más adelante).
- **Fetch API** → Comunicación con el backend.
### Backend
- **Node.js** → Servidor y entorno de ejecución.
- **Express.js** → Creación de la API REST, rutas modulares y middlewares.
- **Middlewares Personalizados** → Logging de peticiones y manejo de errores.
- **Datos Locales** → Array de productos en archivo `.js` como fuente de datos inicial.
### Control de Versiones
- **Git & GitHub** → Repositorio único tipo monorepo con carpetas `/client` y `/backend`.

---

## Estructura del Proyecto
```
/backend
|-- server.js
|-- routes/
|-- controllers/
|-- data/
|-- middlewares/
|-- public/images/catalogo

/client
|-- src/ 
|---- components/
|---- images/
|---- pages/
|---- styles/
|---- test/
|---- App.js
|---- index.js
|-- public/
```
---

## Cómo instalar las Dependencias Utilizadas e Iniciar el Servidor

### Para el Backend
```
cd backend
npm install
npm run dev
```
### Para el Frontend
```
cd client
npm install
npm start
```
