const express = require("express");
const app = express();
const path = require("path"); 
const methodOverride = require("method-override")
const mainRoutes = require("./routes/main.routes")
const gamesRoutes = require("./routes/games.routes")

/* form config */
app.use(express.json())
app.use(express.urlencoded({extended:false}));
/* Configurar metodos put delete patch */
app.use(methodOverride('_method'))

/* static folder */
app.use(express.static(path.join(__dirname, '../public')))
/* ejs view engine */
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

/* implementacion de rutas */
app.use(mainRoutes)
app.use('/games', gamesRoutes)

const PORT = 3000 
app.listen(PORT, () =>{
    console.log("servidor activo en http://localhost:"+ PORT + " 😁");
});
