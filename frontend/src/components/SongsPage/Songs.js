import React, { Component } from "react";
const axios = require("axios");

class Songs extends Component {
  state = {
    songs: [],
    input: "",
    favs: []
  };

  componentDidMount() {
    this.getSongs();
    this.getFavs();
  }

  getSongs = () => {
    axios.get("/songs/").then(songs => {
      this.setState({
        songs: songs.data.data
      });
    });
  };

  getFavs = () => {
    axios.get("/").then(fav => {
      this.setState({
        favs: fav.data.data
      });
    });
  };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.state.songs.find(song => {
      return (
        song.title.toLowerCase().indexOf(this.state.input.toLowerCase()) === 0
      );
    });
  };

  render() {
    let songs = this.state.songs.map(res => {
      if (
        res.title.toLowerCase().indexOf(this.state.input.toLowerCase()) === 0
      ) {
        return (
          <div className="songDisplay">
            <img className="albumCover" src={res.img_url} alt="" />
            <h3>{res.title}</h3>
          </div>
        );
      } else {
        return null;
      }
    });
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.input}
            onChange={this.handleChange}
            placeholder="Search Song"
            className="find"
          />
          <input type="submit" value="Search By Title" />
        </form>
        <div>{songs}</div>
      </>
    );
  }
}

export default Songs;
