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
      })
      .then(() => {
        this.getAllFavorites();
      })
      .then(() => {
        this.props.songData();
        this.props.popularSongs();
      });
  };

  unFavoriteSong = () => {
    axios
      .delete(`/favorites/${this.props.songId}/1`)
      .then(() => {
        this.setState({
          fav: false
        });
      })
      .then(() => {
        this.getAllFavorites();
      })
      .then(() => {
        this.props.songData();
        this.props.popularSongs();
      });
  };

  render() {
    let favorite = this.state.favorites.map(res => {
      return res.songfav_id;
    });
    return (
      <>
        {this.state.fav ? (
          <button onClick={this.unFavoriteSong}>
            {favorite.includes(this.props.songId) ? "Unfavorite" : "Favorite"}
          </button>
        ) : (
          <button onClick={this.favSong}>
            {favorite.includes(this.props.songId) ? "Unfavorite" : "Favorite"}
          </button>
        )}
      </>
    );
  }
}

export default FavoriteButton;
