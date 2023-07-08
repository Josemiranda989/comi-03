const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games.controllers");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'../../public/img'));
  },
    filename: function (req, file, cb) {
      console.log(path.extname(file.originalname))
      const uniqueSuffix = Date.now();
    cb(null, "game-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


router.get("/detail/:id", gamesController.detail);

/* Form create */
router.get("/create", gamesController.getCreateForm);
router.post("/create", upload.single('thumbnail'), gamesController.postCreateForm);
/* form update */
router.get("/update/:id", gamesController.getUpdateForm);
router.put("/update/:id", upload.single('thumbnail'), gamesController.putUpdateForm);

/* delete game */
router.delete("/delete/:id", gamesController.delete)



module.exports = router;
