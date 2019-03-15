const { db } = require("./Connect.js");

const getAllFavorites = (req, res, next) => {
  db.any("SELECT * FROM favorites")
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "YOU GOT FAVS"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const postFavorite = (req, res, next) => {
  db.none(
    "INSERT INTO favorites (userfav_id, songfav_id) VALUES (${userfav_id}, ${songfav_id})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        message: "YOU HEART IT"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const deleteFavorite = (req, res, next) => {
  let favId = parseInt(req.params.id);
  db.result("DELETE FROM favorites WHERE id=$1", [favId])
    .then(result => {
      res.status(200).json({
        status: "Success",
        message: "WHY?!",
        result: result
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getAllFavoritesForOneUser = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.any("SELECT userfav_id, songfav_id FROM favorites WHERE userfav_id = $1", [
    userId
  ])
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "YOU GOT THEIR FAVS"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getAllFavoritesForOneSong = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.any("SELECT userfav_id, songfav_id FROM favorites WHERE songfav_id = $1", [
    userId
  ])
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "YOU GOT FAVS FOR ONE"
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllFavorites,
  postFavorite,
  deleteFavorite,
  getAllFavoritesForOneUser,
  getAllFavoritesForOneSong
};
