const { db } = require("./Connect.js");

const getOneSong = (req, res, next) => {
  let songId = parseInt(req.params.id);
  db.one("SELECT * FROM songs WHERE id=$1", [songId])
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "YOU GOT A SONG!"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getAllSongs = (req, res, next) => {
  db.any("SELECT * FROM songs")
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "YOU GOT SONGS"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const postSong = (req, res, next) => {
  db.none(
    "INSERT INTO songs (title, img_url, user_id, genre_id) VALUES (${title}, ${img_url}, ${user_id}, ${genre_id})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        message: "THIS IS MY JAM"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const deleteSong = (req, res, next) => {
  let songId = parseInt(req.params.id);
  db.result("DELETE FROM songs WHERE id=$1", [songId])
    .then(result => {
      res.status(200).json({
        status: "Success",
        message: "WHY YOU HATING!",
        result: result
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = { getAllSongs, getOneSong, postSong, deleteSong };
