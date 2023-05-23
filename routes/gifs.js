const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "./uploads" });

const {
  getAll,
  getGifById,
  deleteById,
  uploadGifFromUrl,
  uploadGifFromLocal,
} = require("../controllers/gifs");

const gifsRouter = express.Router();

gifsRouter.get("/", getAll);
gifsRouter.get("/:id", getGifById);
gifsRouter.post("/addfromurl", uploadGifFromUrl);
gifsRouter.post("/addfromlocal", upload.single("url"), uploadGifFromLocal);
gifsRouter.delete("/:id", deleteById);

module.exports = gifsRouter;
