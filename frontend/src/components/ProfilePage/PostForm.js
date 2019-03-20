import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Profile from "./Profile";
const axios = require("axios");

class PostForm extends Component {
  state = {
    songImg: "",
    songTitle: "",
    sumbit: false
  };

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

  handleSubmit = event => {
    event.preventDefault();

    const { songImg, songTitle } = this.state;

    axios.post("/songs", {
      user_id: 1,
      img_url: songImg,
      title: songTitle,
      genre_id: 5
    });

    this.setState({
      submit: true
    });
  };
  render() {
    if (this.state.submitImgCheck) {
      return <Redirect to="/myprofile" component={Profile} />;
    }

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
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default PostForm;
