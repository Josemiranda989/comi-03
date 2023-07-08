const fs = require("fs");
const path = require("path");
const gamesPath = path.join(__dirname, "../data/games.json");
const { v4: uuidv4 } = require("uuid");

const mainController = {
  detail: function (req, res) {
    /* leo un json y lo parseo */
    const games = JSON.parse(fs.readFileSync(gamesPath, "utf-8"));
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
  getCreateForm: function (req, res) {
    res.render("games/create");
  },
  postCreateForm: function (req, res) {
    const games = JSON.parse(fs.readFileSync(gamesPath, "utf-8"));
    newGame = {
      id: uuidv4(),
      title: req.body.title,
      genre: req.body.genre,
      thumbnail: req.file
        ? `/img/${req.file.filename}`
        : "/img/default-game.jpg",
    };
    games.push(newGame);
    const gamesJSON = JSON.stringify(games, null, " ");
    fs.writeFileSync(gamesPath, gamesJSON);
    console.log("todo salió ok");
    res.redirect("/");
  },

  getUpdateForm: function (req, res) {
    const games = JSON.parse(fs.readFileSync(gamesPath, "utf-8"));
    const game = games.find((game) => game.id == req.params.id);
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
  putUpdateForm: function (req, res) {
    const games = JSON.parse(fs.readFileSync(gamesPath, "utf-8"));
    const game = games.find((game) => game.id == req.params.id);
    if (game) {
      game.title = req.body.title;
      game.thumbnail = req.file
        ? `/img/${req.file.filename}`
        : game.thumbnail;
      game.genre = req.body.genre

      fs.writeFileSync(gamesPath, JSON.stringify(games, null, " "))
      res.redirect('/')
    } else {
      res.send(`
      <div style="text-align: center; padding-top:30px">
      <h1>El producto no se puede editar</h1>
      <img style="width:40%;" src="/img/default-game.jpg">
      </div>
      `);
    }
  },
  delete: (req, res) => {
    const games = JSON.parse(fs.readFileSync(gamesPath, "utf-8"));
    const newGames = games.filter((game) => game.id != req.params.id);
    /* const gameToDelete = games.find(game => game.id == req.params.id)
     if (fs.existsSync(path.join(__dirname, "../../", gameToDelete.thumbnail))) {
      fs.unlinkSync(path.join(__dirname, '../../' ,gameToDelete.thumbnail))
    } */
    fs.writeFileSync(gamesPath, JSON.stringify(newGames, null, " "));
    res.redirect("/");
  }
};

module.exports = mainController;
