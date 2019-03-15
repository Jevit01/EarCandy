const { db } = require("./Connect.js");

const getOneUser = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.one("SELECT * FROM users WHERE id=$1", [userId])
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "YOU GOT A USER!"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getAllUsers = (req, res, next) => {
  db.any("SELECT * FROM users")
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "YOU GOT USERS"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const createUser = (req, res, next) => {
  db.none("INSERT INTO users (username) VALUES (${username})", req.body)
    .then(() => {
      res.status(200).json({
        message: "YOU ARE GOD"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const deleteUser = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.result("DELETE FROM users WHERE id=$1", [userId])
    .then(result => {
      res.status(200).json({
        status: "Success",
        message: "YOU KILLED THE USER!",
        result: result
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = { getAllUsers, getOneUser, createUser, deleteUser };
