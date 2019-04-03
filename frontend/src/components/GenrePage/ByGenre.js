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
    this.getGenre();
  }

  getGenre = () => {
    axios.get("/genres").then(gen => {
      this.setState({
        genres: gen.data.data
      });
    });
  };

  handleSelect = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios.get(`/songs/genres/${this.state.selectedGenre}`).then(songs => {
      this.setState({
        songs: songs.data.data,
        submit: true
      });
    });
  };

  render() {
    let genreList = this.state.genres.map(genre => {
      return <option value={genre.id}>{genre.genre_name}</option>;
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

    return (
      <>
        <form type="submit" onSubmit={this.handleSubmit}>
          <select name="selectedGenre" onChange={this.handleSelect}>
            <option value=""> </option>
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
