var express = require("express");
var router = express.Router();
const {
  getAllFavorites,
  postFavorite,
  deleteFavorite,
  getAllFavoritesForOneUser,
  getAllFavoritesForOneSong
} = require("../db/Queries/favoritesQ.js");

router.get("/", getAllFavorites);
router.post("/", postFavorite);
router.delete("/:id", deleteFavorite);
router.get("/users/:id", getAllFavoritesForOneUser);
router.get("/songs/:id", getAllFavoritesForOneSong);

module.exports = router;
