const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const gamesPath = path.join(__dirname, "../data/games.json");


const mainController = {
  /* vista de detalle de juego */
  detail: function (req, res) {
    /* leo un json y lo parseo */
    const games = JSON.parse(fs.readFileSync(gamesPath, "utf-8"));
    /* busco juego en base al req.params si existe renderizo la vista con el juego, sino un error */
    const game = games.find((game) => game.id == req.params.id);
    if (game) {
      res.render("games/detail", { game });
    } else {
      res.send(`
            <div style="text-align: center; padding-top:30px">
            <h1>El producto no existe</h1>
            <img style="width:40%;" src="/img/default-game.jpg">
            </div>
            `);
    }
  },
  /* vista de formulario de creación de juego */
  getCreateForm: function (req, res) {
    res.render("games/create");
  },
  /* proceso de creación de nuevo juego */
  postCreateForm: function (req, res) {
    /* leo un json y lo parseo */
    const games = JSON.parse(fs.readFileSync(gamesPath, "utf-8"));
    /* creo una variable para generar el nuevo juego del req.body */
    let newGame = {
      id: uuidv4(), //uso de uuid para generar un id unico
      title: req.body.title,
      genre: req.body.genre,
      /* if ternario para preguntar si viene imagen que la escriba, sino que se quede con la por default */
      thumbnail: req.file
        ? `/img/${req.file.filename}`
        : "/img/default-game.jpg",
    };
    /* agrego ese juego al listado */
    games.push(newGame);
    /* convierto a json nuevamente y escribo el archivo games.json */
    const gamesJSON = JSON.stringify(games, null, " ");
    fs.writeFileSync(gamesPath, gamesJSON);
    res.redirect("/");
  },
  /* vista de formulario de edición de juego */
  getUpdateForm: function (req, res) {
    /* traigo el listado de juegos para filtrar por el req.params */
    const games = JSON.parse(fs.readFileSync(gamesPath, "utf-8"));
    const game = games.find((game) => game.id == req.params.id);
    /* si lo encuentra que me muestre la vista sino que me muestre un error */
    if (game) {
      res.render("games/update", { game });
    } else {
      res.send(`
            <div style="text-align: center; padding-top:30px">
            <h1>El producto a editar no existe</h1>
            <img style="width:40%;" src="/img/default-game.jpg">
            </div>
            `);
    }
  },
  /* proceso de edición de juego */
  putUpdateForm: function (req, res) {
    /* busco el juego a editar  */
    const games = JSON.parse(fs.readFileSync(gamesPath, "utf-8"));
    const game = games.find((game) => game.id == req.params.id);
    /* si lo encuentra le cambio los valores permitiendo conservar la imagen anterior si no quiere cambiarla */
    if (game) {
      game.title = req.body.title;
      game.thumbnail = req.file ? `/img/${req.file.filename}` : game.thumbnail;
      game.genre = req.body.genre;
      /* escribo el json nuevamente y redirecciono */
      fs.writeFileSync(gamesPath, JSON.stringify(games, null, " "));
      res.redirect("/");
    } else {
      res.send(`
      <div style="text-align: center; padding-top:30px">
      <h1>El producto no se puede editar</h1>
      <img style="width:40%;" src="/img/default-game.jpg">
      </div>
      `);
    }
  },
  /* proceso de borrado */
  delete: (req, res) => {
    /* Guardo en newGames todos los juegos que no quiero borrar */
    const games = JSON.parse(fs.readFileSync(gamesPath, "utf-8"));
    const newGames = games.filter((game) => game.id != req.params.id);
    /* busco el juego a borrar para eliminarle la imagen */
    const gameToDelete = games.find((game) => game.id == req.params.id);
    const publicPath = path.join(__dirname, "../../public");
    /* utilizo fs.existsSync para saber si existe una imagen física en nuestra carpeta estatica, si la tiene que la borre con fsUnlink, sino que no haga nada */
    if (
      fs.existsSync(
        path.join(publicPath, gameToDelete.thumbnail)
      )
    ) {
      fs.unlinkSync(
        path.join(publicPath, gameToDelete.thumbnail)
      );
    }
    /* reescribo ese listado de juegos excluyendo el que eliminamos y redirecciono */
    fs.writeFileSync(gamesPath, JSON.stringify(newGames, null, " "));
    res.redirect("/");
  },
};

module.exports = mainController;
