import React, { Component } from "react";
const axios = require("axios");

class ByPopularity extends Component {
  state = {
    songs: []
  };

  componentDidMount() {
    this.getSongs();
  }

  getSongs = () => {
    axios.get("/songs/popular").then(songs => {
      this.setState({
        songs: songs.data.data
      });
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
    return (
      <>
        <br />
        <div>{songs}</div>
        <br />
      </>
    );
  }
}

export default ByPopularity;
