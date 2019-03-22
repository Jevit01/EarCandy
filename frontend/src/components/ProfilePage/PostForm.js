import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Profile from "./Profile";
const axios = require("axios");

class PostForm extends Component {
  state = {
    songImg: "",
    songTitle: "",
    selectedGenre: "",
    genres: [],
    sumbit: false
  };

  componentDidMount() {
    this.getGenre();
  }

  handleImg = event => {
    this.setState({
      songImg: event.target.value
    });
  };

  handleText = event => {
    this.setState({
      songTitle: event.target.value
    });
  };

  handleSelect = e => {
    this.setState({
      [e.target.name]: e.target.value,
      submit: true
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { songImg, songTitle, selectedGenre } = this.state;

    axios.post("/songs", {
      user_id: 1,
      img_url: songImg,
      title: songTitle,
      genre_id: selectedGenre
    });

    this.setState({
      submit: true
    });
  };

  getGenre = () => {
    axios.get("/genres").then(gen => {
      this.setState({
        genres: gen.data.data
      });
    });
  };

  render() {
    if (this.state.submitImgCheck) {
      return <Redirect to="/myprofile" component={Profile} />;
    }

    let genreList = this.state.genres.map(genre => {
      return (
        <option key={genre.id} value={genre.id}>
          {genre.genre_name}
        </option>
      );
    });

    const { songImg, songTitle } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            className="imgInput"
            type="text"
            name="songImg"
            value={songImg}
            onChange={this.handleImg}
            placeholder="Enter Cover Art"
          />
          <input
            className="textInput"
            type="text"
            name="songTitle"
            value={songTitle}
            onChange={this.handleText}
            placeholder="Title"
          />
          <select name="selectedGenre" onChange={this.handleSelect}>
            <option key="0" value="">
              {" "}
            </option>
            {genreList}
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default PostForm;
