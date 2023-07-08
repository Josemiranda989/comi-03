const fs = require('fs');
const path = require('path');
const gamesPath = path.join(__dirname, "../data/games.json");

const mainController = {
  index: function (req, res) {
    /* leo un json y lo parseo */
    const games = JSON.parse(fs.readFileSync(gamesPath, 'utf-8'));
    res.render("index", {games});
  },
  about: function (req, res) {
    
    res.render("about");
  },
};

module.exports = mainController;