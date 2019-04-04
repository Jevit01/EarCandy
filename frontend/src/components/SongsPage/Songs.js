import React, { Component } from "react";
import SongDisplay from "../SongDisplay.js";
const axios = require("axios");

class Songs extends Component {
  state = {
    songs: [],
    songDisplay: [],
    input: "",
    submit: false
  };

  componentDidMount() {
    this.getSongs();
  }

  getSongs = () => {
    axios.get("/songs/info").then(songs => {
      this.setState({
        songs: songs.data.data,
        songDisplay: songs.data.data
      });
    });
  };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let search = this.state.songs.filter(song => {
      return song.title.toLowerCase().includes(this.state.input.toLowerCase());
    });
    this.setState({
      input: "",
      songDisplay: search
    });
  };

  render() {
    let songs = this.state.songDisplay.map(res => {
      if (res.id === null) {
        return "";
      } else {
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
    return (
      <>
        <br />
        <br />
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
        <br />
        <div>{songs}</div>
        <br />
      </>
    );
  }
}

export default Songs;
