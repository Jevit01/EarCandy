import React, { Component } from "react";
import PostForm from "./PostForm.js";
const axios = require("axios");

class Profile extends Component {
  state = {
    songs: []
  };

  componentDidMount() {
    this.getUsersSongs();
  }

  getUsersSongs = () => {
    axios.get("/songs/sample").then(songs => {
      this.setState({
        songs: songs.data.data
      });
    });
  };

  render() {
    let songs = this.state.songs.map(res => {
      let com = res.comments.map(data => {
        return (
          <>
            <li>{data}</li>
          </>
        );
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
        <div>{songs}</div>
        <br />
      </>
    );
  }
}

export default Profile;
