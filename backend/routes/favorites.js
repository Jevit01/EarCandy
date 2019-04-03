var express = require("express");
var router = express.Router();
const {
  getAllFavorites,
  postFavorite,
  deleteFavorite,
  getAllFavoritesForOneUser,
  getAllFavoritesForOneSong,
  getAllUsersFavorites
} = require("../db/Queries/favoritesQ.js");

router.get("/", getAllFavorites);
router.get("/user", getAllUsersFavorites);
router.post("/", postFavorite);
router.delete("/:song/:user", deleteFavorite);
router.get("/users/:id", getAllFavoritesForOneUser);
router.get("/songs/:id", getAllFavoritesForOneSong);

module.exports = router;
