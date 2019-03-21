import React, { Component } from "react";
const axios = require("axios");

class ByGenre extends Component {
  state = {
    songs: [],
    genres: [],
    selectedGenre: "",
    submit: false
  };

  componentDidMount() {
    this.getSongs();
    this.getGenre();
  }

  getSongs = () => {
    axios.get("/songs/genre").then(songs => {
      this.setState({
        songs: songs.data.data
      });
    });
  };

  getGenre = () => {
    axios.get("/genres").then(gen => {
      this.setState({
        genres: gen.data.data
      });
    });
  };

  handleSelect = e => {
    this.setState({
      [e.target.name]: e.target.value,
      submit: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      submit: true
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
    let genreList = this.state.genres.map(genre => {
      return (
        <option key={genre.id} value={genre.genre_name}>
          {genre.genre_name}
        </option>
      );
    });
    if (this.state.submit && this.state.selectedGenre) {
      songs = this.state.songs.filter(song => {
        return songs.genre_name === this.state.selectedGenre;
      });
    }
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <select name="selectedGenre" onChange={this.handleSelect}>
            <option key="0" value="">
              {" "}
            </option>
            {genreList}
          </select>
          <button type="submit">Submit</button>
        </form>
        <div>{songs}</div>
      </>
    );
  }
}

export default ByGenre;
