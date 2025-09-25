const express = require("express");
const app = express();
const PORT = 4000;

app.get("/",(req,res)=>{
    res.status(200)
    .send("Bienvenido a HermanosJota!");
})

app.listen(PORT,()=>{
    console.log("Se inició el servidor en el puerto:" + PORT);
})
