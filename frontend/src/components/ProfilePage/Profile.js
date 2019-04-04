import React, { Component } from "react";
import PostForm from "./PostForm.js";
import SongDisplay from "../SongDisplay.js";
const axios = require("axios");

class Profile extends Component {
  state = {
    mySongs: [],
    songs: [],
    users: [],
    fav: [],
    // showFav: false,
    // showPosts: false
    compDisplay: ""
  };

  componentDidMount() {
    this.showUsersPosts();
    this.getSongs();
    this.getUsers();
  }

  getUsers = () => {
    axios.get("/users/").then(user => {
      this.setState({
        users: user.data.data
      });
    });
  };

  getSongs = () => {
    axios.get("/songs/info").then(songs => {
      this.setState({
        songs: songs.data.data
      });
    });
  };

  showUsersPosts = () => {
    axios.get("/songs/info").then(songs => {
      this.setState({
        mySongs: songs.data.data,
        compDisplay: "posts"
      });
    });
  };

  showFavorites = () => {
    axios.get("/favorites/user").then(fav => {
      this.setState({
        fav: fav.data.data,
        compDisplay: "favs"
      });
    });
  };

  render() {
    let songs = this.state.songs.map(res => {
      if (res.users === 1) {
        return (
          <>
            <div key={res.id} className="songDisplay">
              <SongDisplay
                image={res.img_url}
                title={res.title}
                favTotal={res.total}
                songId={res.id}
                songData={this.getSongs}
                comments={res.comments}
              />
            </div>
            <br />
            <br />
          </>
        );
      }
    });
    let fav = this.state.fav.map(res => {
      return (
        <>
          <div key={res.id} className="songDisplay">
            <SongDisplay
              image={res.img_url}
              title={res.title}
              favTotal={res.total}
              songId={res.id}
              songData={this.getSongs}
              comments={res.comments}
            />
          </div>
          <br />
          <br />
        </>
      );
    });
    let nameSearch = this.state.users.map(res => {
      if (res.id === 1) {
        return res.username;
      }
      return nameSearch;
    });

    return (
      <>
        <h2 className="username">{nameSearch}</h2>
        <br />
        <PostForm showUsersPosts={this.showUsersPosts} />
        <br />
        <button onClick={this.showUsersPosts}>Posts</button>
        <button onClick={this.showFavorites}>Favorites</button>
        {this.state.compDisplay === "posts" ? <div>{songs}</div> : ""}
        {this.state.compDisplay === "favs" ? <div>{fav}</div> : ""}
        <br />
      </>
    );
  }
}

export default Profile;
