import React, { Component } from "react";
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
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { songImg, songTitle, selectedGenre } = this.state;

    axios
      .post("/songs", {
        user_id: 1,
        img_url: songImg,
        title: songTitle,
        genre_id: selectedGenre
      })
      .then(() => {
        this.setState({
          songImg: "",
          songTitle: "",
          selectedGenre: ""
        });
      })
      .then(() => {
        this.props.showUsersPosts();
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
          <select
            name="selectedGenre"
            onChange={this.handleSelect}
            value={this.state.selectedGenre}
          >
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
