import React, { Component } from "react";
const axios = require("axios");

class Songs extends Component {
  state = {
    songs: [],
    input: ""
  };

  componentDidMount() {
    this.getSongs();
  }

  getSongs = () => {
    axios.get("/songs/info").then(songs => {
      this.setState({
        songs: songs.data.data
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
            <h3 className="title">{res.title}</h3>
            <p className="totalFav">{res.total}</p>
            <button className="Fav">Favorite</button>
            <ul>
              <li>{res.comments}</li>
            </ul>
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
