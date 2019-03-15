var express = require("express");
var router = express.Router();
const {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser
} = require("../db/Queries/usersQ.js");

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:id", getOneUser);
router.delete("/:id", deleteUser);

module.exports = router;
