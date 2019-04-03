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
  let songId = parseInt(req.params.song);
  let userId = parseInt(req.params.user);
  db.result("DELETE FROM favorites WHERE songfav_id=$1 AND userfav_id=$2", [
    songId,
    userId
  ])
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

const getAllUsersFavorites = (req, res, next) => {
  db.any(
    "SELECT array_agg(DISTINCT users.username) AS username, users.id, COUNT(DISTINCT userfav_id) AS total, title, img_url, array_agg(DISTINCT comments.comment_body) AS comments, posted_at FROM songs FULL JOIN favorites ON songfav_id = songs.id FULL JOIN comments ON songcom_id = songs.id FULL JOIN users ON users.id = songs.user_id WHERE userfav_id = 1 GROUP BY users.id , songfav_id, title, img_url, posted_at ORDER BY posted_at DESC"
  )
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

module.exports = {
  getAllFavorites,
  postFavorite,
  deleteFavorite,
  getAllFavoritesForOneUser,
  getAllFavoritesForOneSong,
  getAllUsersFavorites
};
