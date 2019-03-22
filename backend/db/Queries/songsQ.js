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
    "SELECT COUNT(DISTINCT userfav_id) AS total, title, img_url, array_agg(DISTINCT comments.comment_body) AS comments, posted_at FROM songs FULL JOIN favorites ON songfav_id = songs.id FULL JOIN comments ON songcom_id = songs.id GROUP BY songfav_id, title, img_url, posted_at ORDER BY posted_at DESC"
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
    "SELECT COUNT(DISTINCT userfav_id) AS total, title, img_url, array_agg(DISTINCT comments.comment_body) AS comments, genres.id, genre_name, posted_at FROM songs FULL JOIN favorites ON songfav_id = songs.id FULL JOIN comments ON songcom_id = songs.id FULL JOIN genres ON songs.genre_id = genres.id WHERE genres.id = $1 GROUP BY songfav_id, title, img_url, genres.id, genre_name, posted_at",
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
    "SELECT songs.id, img_url, title, username FROM songs JOIN users ON  songs.user_id = users.id WHERE users.id = $1 GROUP BY songs.id, img_url, title, username",
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

const getSongsForSampleUser = (req, res, next) => {
  db.any(
    "SELECT array_agg(DISTINCT users.username) AS username, users.id, COUNT(DISTINCT userfav_id) AS total, title, img_url, array_agg(DISTINCT comments.comment_body) AS comments, posted_at FROM songs FULL JOIN favorites ON songfav_id = songs.id FULL JOIN comments ON songcom_id = songs.id FULL JOIN users ON users.id = songs.user_id WHERE users.id = 1 GROUP BY users.id , songfav_id, title, img_url, posted_at ORDER BY posted_at DESC"
  )
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "SAMPLE USER?!"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getByPopular = (req, res, next) => {
  db.any(
    "SELECT COUNT(DISTINCT userfav_id) AS total, title, img_url, array_agg(DISTINCT comments.comment_body) AS comments, posted_at FROM songs FULL JOIN favorites ON songfav_id = songs.id FULL JOIN comments ON songcom_id = songs.id GROUP BY songfav_id, title, img_url, posted_at ORDER BY total DESC, posted_at DESC"
  )
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "POPULAR?!"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getByGenre = (req, res, next) => {
  db.any(
    "SELECT COUNT(DISTINCT userfav_id) AS total, title, img_url, array_agg(DISTINCT comments.comment_body) AS comments, genres.id, genre_name, posted_at FROM songs FULL JOIN favorites ON songfav_id = songs.id FULL JOIN comments ON songcom_id = songs.id FULL JOIN genres ON songs.genre_id = genres.id GROUP BY songfav_id, title, img_url, genres.id, genre_name, posted_at"
  )
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "GENRE?!"
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
  getAllSongsFavsAndComs,
  getSongsForSampleUser,
  getByPopular,
  getByGenre
};
