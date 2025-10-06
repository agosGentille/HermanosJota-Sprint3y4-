# E-commerce Mueblería Hermanos Jota

---

## Grupo 11 - Code Breakers

- **Fabrizio, Jazmin Maia** - ProductDetail (Frontend + Backend)
- **Gentille, Agostina Abril** - Home + Header + Footer (Frontend + Backend)
- **Giménez, Agustín José** - Carrito Lateral y Carrito (Frontend + Backend)
- **Insaurralde, Mariano Gastón** - Contacto (Frontend + Backend)
- **Vila, Juan Manuel** - Pantalla Productos (Frontend + Backend)

---

## División de Tareas

Cada miembro del equipo continuó con la misma división de responsabilidades que en el trabajo práctico anterior, desarrollando tanto la parte frontend como backend de sus secciones asignadas:

- **Jazmin Fabrizio**: Se encargó del componente ProductDetail, implementando la vista detallada de productos y la conexión con el backend correspondiente.
- **Agostina Gentille**: Desarrolló la página Home, Header y Footer, asegurando la navegación principal y la estructura base de la aplicación.
- **Agustín Giménez**: Implementó el Carrito Lateral y la página completa del Carrito, gestionando el estado global del carrito de compras.
- **Mariano Insaurralde**: Creó la página de Contacto con formularios funcionales y validaciones.
- **Juan Manuel Vila**: Desarrolló la pantalla de Productos con sistema de filtros, búsqueda y catálogo completo.

Cada integrante realizó tanto el desarrollo frontend (componentes React, estilos, estado) como las partes backend necesarias (rutas, controladores, lógica de negocio) para sus secciones asignadas.

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
    - ⚠️ En esta versión de prueba los tokens no son reales (se usan prefijos como fake-token-), pero el flujo está preparado para, si se quiere, migrar por ejemplo a JWT en el futuro.
- **Registro de Usuarios:** El sistema cuenta con un modal de registro que permite crear nuevos usuarios. Los datos de registro se guardan temporalmente en un array en el servidor. **IMPORTANTE:** ⚠️ Estos usuarios estarán disponibles mientras Node.js se encuentre en ejecución. Si el servidor se reinicia, los datos se pierden (no hay persistencia en base de datos por el momento).

---

## Tecnologías Utilizadas

### Frontend
- **React** → Arquitectura de componentes, hooks (`useState`, `useEffect`), props y manejo de estado.
- **CSS3 (Flexbox + Responsive)** → Estilos responsivos y maquetación moderna.
- **React Router** → Navegación entre páginas y rutas dinámicas.
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


---

## División de Tareas

### 🏠 Home y Header (Agostina Gentille)
- Carrusel principal con imágenes destacadas
- Sección de Best Sellers
- Modal de Inicio de Sesión y Registro
- Componente reutilizable de tarjetas de productos

### 🛍️ Productos (Juan Manuel Vila)
- Catálogo completo de productos
- Sistema de filtros por categoría, precio y certificación
- Búsqueda dinámica en tiempo real
- Ordenamiento múltiple
- Diseño responsive

### 📦 ProductDetail (Jazmin Fabrizio)
- Vista detallada de productos
- Galería de imágenes
- Información técnica completa
- Integración con carrito de compras

### 🛒 Carrito (Agustín Giménez)
- Carrito lateral deslizante
- Página completa del carrito
- Gestión de cantidades
- Cálculo de totales
- Persistencia en localStorage

### 📞 Contacto (Mariano Insaurralde)
- Formulario de contacto completo
- Validaciones de campos
- Validación con ReCaptcha
- Experiencia de usuario mejorada
- Integración con backend
- Integración de un mapa de Google Maps

---

## Estado del Proyecto

✅ **Completado** - Todas las funcionalidades básicas implementadas  
🚀 **En producción** - Listo para uso y testing  
🔧 **Mejoras continuas** - Optimizaciones y nuevas features en desarrollo
