const express = require("express");
const app = express();
const PORT = 4000;

const cors = require("cors");
const path = require('path');

const authRoutes = require("./routes/authRoutes");
const productosRoutes = require("./routes/productos.js");

app.use(cors()); // permite leer JSON en req.body
app.use(express.json()); //parsea JSON para que no llegue undefined 

//Middleware global que muestre método y url de la petición (Punto 4 consigna final)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next(); 
});

//rutas
app.use("/api", authRoutes);   
app.use('/api/productos', productosRoutes); 

app.use('/Images', express.static(path.join(__dirname, 'public/images')));

// 404
app.use((req, res) => {
  res.status(404).json({ error: `Ruta: ${req.originalUrl} - no encontrada` });
});
// 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno" });
});
// 200
app.get("/",(req,res)=>{
    res.status(200)
    .send("Bienvenido a la Mueblería Hermanos Jota!");
})

app.listen(PORT,()=>{
    console.log("Se inició el servidor en el puerto:" + PORT);
})
