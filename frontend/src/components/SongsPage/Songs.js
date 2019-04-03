import React, { Component } from "react";
import CommentsForm from "../CommentsForm.js";
import FavoriteButton from "../FavoriteButton.js";
const axios = require("axios");

class Songs extends Component {
  state = {
    songs: [],
    input: "",
    submit: false
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
    this.setState({
      input: ""
    });
  };

  render() {
    let songs = this.state.songs.map(res => {
      if (
        res.title.toLowerCase().indexOf(this.state.input.toLowerCase()) === 0
      ) {
        return (
          <>
            <div key={res.id} className="songDisplay">
              <img className="albumCover" src={res.img_url} alt="" />
              <div className="titleBar">
                <h2 className="title">{res.title}</h2>
                <p className="totalFav">{res.total}</p>
              </div>
              <div className="favButton">
                <FavoriteButton songId={res.id} />
              </div>

              <CommentsForm songId={res.id} comments={res.comments} />
            </div>
            <br />
            <br />
          </>
        );
      } else {
        return null;
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
