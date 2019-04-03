import React, { Component } from "react";
const axios = require("axios");

class FavoriteButton extends Component {
  state = {
    favorites: [],
    fav: false
  };

  componentDidMount() {
    this.getAllFavorites();
  }

  getAllFavorites = () => {
    axios.get("/favorites/users/1").then(fav => {
      this.setState({
        favorites: fav.data.data
      });
    });
  };

  favSong = () => {
    axios
      .post("/favorites", {
        userfav_id: 1,
        songfav_id: this.props.songId
      })
      .then(() => {
        this.setState({
          fav: true
        });
      });
  };

  unFavoriteSong = () => {
    axios.delete(`/favorites/${this.props.songId}/1`).then(() => {
      this.setState({
        fav: false
      });
    });
  };

  render() {
    let favorite = this.state.favorites.map(res => {
      return res.songfav_id;
    });
    return (
      <>
        <button onClick={this.state.fav ? this.unFavoriteSong : this.favSong}>
          {this.props.songId === favorite ? "Unfavorite" : "Favorite"}
        </button>
      </>
    );
  }
}

export default FavoriteButton;
