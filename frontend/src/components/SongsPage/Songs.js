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
      if (
        res.title.toLowerCase().indexOf(this.state.input.toLowerCase()) === 0
      ) {
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
        <br />
        <div>{songs}</div>
        <br />
      </>
    );
  }
}

export default Songs;
