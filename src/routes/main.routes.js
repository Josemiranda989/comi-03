const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main.controllers")

/* Lista de juegos */
router.get("/", mainController.index);
/* about me */
router.get("/about", mainController.about );

module.exports = router;
