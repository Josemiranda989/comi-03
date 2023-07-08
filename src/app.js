const express = require("express");
const app = express();
const path = require("path"); 
const methodOverride = require("method-override")
const mainRoutes = require("./routes/main.routes")
const gamesRoutes = require("./routes/games.routes")

app.use(express.json())
app.use(express.urlencoded({extended:false}));

/* static folder */
app.use(express.static(path.join(__dirname, '../public')))
/* ejs view engine */
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride('_method'))

app.use(mainRoutes)
app.use('/games', gamesRoutes)
/* app.get("/", function (req, res) {
  res.render('index')
}); */

const PORT = 3000 
app.listen(PORT, () =>{
    console.log("servidor activo en http://localhost:"+ PORT + " 😁");
});
