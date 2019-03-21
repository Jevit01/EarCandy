import React, { Component } from "react";
import PostForm from "./PostForm.js";
const axios = require("axios");

class Profile extends Component {
  state = {
    songs: [],
    fav: [],
    showFav: false,
    showPosts: false
  };

  componentDidMount() {
    this.showUsersPosts();
    this.showFavorites();
  }

  showUsersPosts = () => {
    axios.get("/songs/sample").then(songs => {
      this.setState({
        songs: songs.data.data,
        showPosts: !this.state.showPosts,
        showFav: false
      });
    });
  };

  showFavorites = () => {
    axios.get("/favorites/user").then(fav => {
      this.setState({
        fav: fav.data.data,
        showFav: !this.state.showFav,
        showPosts: false
      });
    });
  };

  render() {
    let fav = this.state.fav.map(res => {
      let com = res.comments.map(data => {
        if (data === null) {
          return <>{""}</>;
        } else {
          return (
            <>
              <li>{data}</li>
            </>
          );
        }
      });
      return (
        <div className="songDisplay">
          <img className="albumCover" src={res.img_url} alt="" />
          <div className="titleBar">
            <h3 className="title">{res.title}</h3>
          </div>
          <div className="favButton">
            <button className="fav">Unfavorite</button>
          </div>
          <div className="coms">
            <ul>{com}</ul>
          </div>
        </div>
      );
    });
    let songs = this.state.songs.map(res => {
      let com = res.comments.map(data => {
        if (data === null) {
          return <>{""}</>;
        } else {
          return (
            <>
              <li>{data}</li>
            </>
          );
        }
      });
      return (
        <div className="songDisplay">
          <img className="albumCover" src={res.img_url} alt="" />
          <div className="titleBar">
            <h3 className="title">{res.title}</h3>
            <p className="totalFav">{res.total}</p>
          </div>
          <div className="favButton">
            <button className="fav">Favorite</button>
          </div>
          <div className="coms">
            <ul>{com}</ul>
          </div>
        </div>
      );
    });
    let name = this.state.songs.map(res => {
      return res.username;
    });
    return (
      <>
        <h2>{name[0]}</h2>
        <br />
        <PostForm />
        <br />
        <button onClick={this.showUsersPosts}>Posts</button>
        <button onClick={this.showFavorites}>Favorites</button>
        {this.state.showPosts ? <div>{songs}</div> : ""}
        {this.state.showFav ? <div>{fav}</div> : ""}
        <br />
      </>
    );
  }
}

export default Profile;
