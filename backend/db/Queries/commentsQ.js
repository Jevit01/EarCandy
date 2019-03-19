const { db } = require("./Connect.js");

const getAllComments = (req, res, next) => {
  db.any("SELECT * FROM comments")
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "YOU GOT COMMENTS"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const postComment = (req, res, next) => {
  db.none(
    "INSERT INTO comments (comment_body, usercom_id, songcom_id) VALUES (${comment_body}, ${usercom_id}, ${songcom_id})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        message: "YOU COMMENTED"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const deleteComment = (req, res, next) => {
  let favId = parseInt(req.params.id);
  db.result("DELETE FROM comments WHERE id=$1", [favId])
    .then(result => {
      res.status(200).json({
        status: "Success",
        message: "REGRET WHAT YOU SAID?",
        result: result
      });
    })
    .catch(err => {
      return next(err);
    });
};

const editComment = (req, res) => {
  db.none(
    "UPDATE comments SET comment_body=${comment_body}, usercom_id=${usercom_id}, songcom_id=${songcom_id} WHERE id=${id}",
    {
      comment_body: req.body.comment_body,
      usercom_id: req.body.usercom_id,
      songcom_id: req.body.songcom_id,
      id: parseInt(req.params.id)
    }
  ).then(() => {
    res.status(200).json({
      status: "Success",
      message: "EDIT THAT COMMENT!"
    });
  });
};

const getAllCommentsForOneSong = (req, res, next) => {
  let comId = parseInt(req.params.id);
  db.one(
    "SELECT songs.id, img_url, title, array_agg(DISTINCT comments.comment_body) AS comments FROM comments JOIN songs ON  songs.id = comments.songcom_id WHERE songs.id = $1 GROUP BY songs.id, img_url, title",
    [comId]
  )
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "COMMENT WHAT!"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getAllSongsWithComments = (req, res, next) => {
  db.any(
    "SELECT songs.id, img_url, title, array_agg(DISTINCT comments.comment_body) AS comments FROM comments JOIN songs ON  songs.id = comments.songcom_id GROUP BY songs.id, img_url, title"
  )
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "YOU GOT COMMENTS"
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllComments,
  postComment,
  deleteComment,
  editComment,
  getAllCommentsForOneSong,
  getAllSongsWithComments
};
