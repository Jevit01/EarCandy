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

const getAllSongsFavsAndComs = (req, res, next) => {
  db.any(
    "SELECT COUNT(DISTINCT userfav_id) AS total, title, img_url, array_agg(DISTINCT comments.comment_body) AS comments FROM songs JOIN favorites ON songfav_id = songs.id JOIN comments ON songcom_id = songs.id GROUP BY songfav_id, title, img_url"
  )
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "YOU GOT IT ALL"
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

const getSongByGenre = (req, res, next) => {
  let genId = parseInt(req.params.id);
  db.any(
    "SELECT songs.id, img_url, title, genre_name FROM songs JOIN genres ON  songs.genre_id = genres.id WHERE genres.id = $1 GROUP BY songs.id, img_url, title, genre_name",
    [genId]
  )
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "THE GENRE IS!"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getSongsByUsers = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.any(
    "SELECT songs.id, img_url, title, username FROM songs JOIN users ON  songs.user_id = users.id WHERE users.id = 1 GROUP BY songs.id, img_url, title, username",
    [userId]
  )
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "THEY POSTED WHAT?!"
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllSongs,
  getOneSong,
  postSong,
  deleteSong,
  getSongByGenre,
  getSongsByUsers,
  getAllSongsFavsAndComs
};
