var express = require("express");
var router = express.Router();
const {
  getAllComments,
  postComment,
  deleteComment,
  editComment
} = require("../db/Queries/commentsQ.js");

router.get("/", getAllComments);
router.post("/", postComment);
router.patch("/:id", editComment);
router.delete("/:id", deleteComment);

module.exports = router;
