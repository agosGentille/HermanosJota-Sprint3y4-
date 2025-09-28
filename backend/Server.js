const express = require("express");
const app = express();
const PORT = 4000;
const authRoutes = require("./routes/authRoutes");

const cors = require("cors");
app.use(cors()); // permite leer JSON en req.body
app.use(express.json()); //parsea JSON para que no llegue undefined 

app.use("/api", authRoutes);   // /api/login

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});
// 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno" });
});
// 200
app.get("/",(req,res)=>{
    res.status(200)
    .send("Bienvenido a HermanosJota!");
})

app.listen(PORT,()=>{
    console.log("Se inició el servidor en el puerto:" + PORT);
})
