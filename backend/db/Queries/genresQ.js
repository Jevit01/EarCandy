const { db } = require("./Connect.js");

const getAllGenres = (req, res, next) => {
  db.any("SELECT * FROM genres")
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "YOU GOT Genres"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const postGenre = (req, res, next) => {
  db.none("INSERT INTO genres (genre_name) VALUES (${genre_name})", req.body)
    .then(() => {
      res.status(200).json({
        message: "WHAT TYPE IS IT?"
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = { getAllGenres, postGenre };
