var express = require("express");
var router = express.Router();
const {
  getAllSongs,
  getOneSong,
  postSong,
  deleteSong,
  getSongByGenre,
  getSongsByUsers,
  getAllSongsFavsAndComs,
  getSongsForSampleUser,
  getByPopular
} = require("../db/Queries/songsQ.js");

router.get("/", getAllSongs);
router.post("/", postSong);
router.get("/popular", getByPopular);
router.get("/info", getAllSongsFavsAndComs);
router.get("/sample", getSongsForSampleUser);
router.get("/:id", getOneSong);
router.delete("/:id", deleteSong);
router.get("/genres/:id", getSongByGenre);
router.get("/users/:id", getSongsByUsers);

module.exports = router;
