var express = require("express");
var router = express.Router();
const {
  getAllFavorites,
  postFavorite,
  deleteFavorite
} = require("../db/Queries/favoritesQ.js");

router.get("/", getAllFavorites);
router.post("/", postFavorite);
router.delete("/:id", deleteFavorite);

module.exports = router;
