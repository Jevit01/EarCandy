var express = require("express");
var router = express.Router();
const {
  getAllComments,
  postComment,
  deleteComment,
  editComment,
  getAllCommentsForOneSong,
  getAllSongsWithComments
} = require("../db/Queries/commentsQ.js");

router.get("/", getAllComments);
router.get("/songcoms", getAllSongsWithComments);
router.post("/", postComment);
router.patch("/:id", editComment);
router.delete("/:id", deleteComment);
router.get("/songs/:id", getAllCommentsForOneSong);

module.exports = router;
