import React from "react";
import CommentsForm from "./CommentsForm.js";
import FavoriteButton from "./FavoriteButton.js";

const SongDisplay = props => {
  return (
    <>
      <img className="albumCover" src={props.image} alt="" />
      <div className="titleBar">
        <h2 className="title">{props.title}</h2>
        <p className="totalFav">{props.favTotal}</p>
      </div>
      <div className="favButton">
        <FavoriteButton songId={props.songId} songData={props.songData} />
      </div>
      <CommentsForm songId={props.songId} comments={props.comments} />
    </>
  );
};

export default SongDisplay;
