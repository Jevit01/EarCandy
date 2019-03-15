var express = require("express");
var router = express.Router();
const { getAllGenres, postGenre } = require("../db/Queries/genresQ.js");

router.get("/", getAllGenres);
router.post("/", postGenre);

module.exports = router;
