var express = require("express");
var router = express.Router();
const {
  getAllSongs,
  getOneSong,
  postSong,
  deleteSong
} = require("../db/Queries/songsQ.js");

router.get("/", getAllSongs);
router.post("/", postSong);
router.get("/:id", getOneSong);
router.delete("/:id", deleteSong);

module.exports = router;
