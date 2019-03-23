import React, { Component } from "react";
const axios = require("axios");

class Songs extends Component {
  state = {
    songs: [],
    input: "",
    commentInput: "",
    comId: "",
    submit: false,
    comSubmit: false
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

  handleCom = e => {
    this.setState({
      commentInput: e.target.value
    });
  };

  handleComId = e => {
    this.setState({
      comId: e.target.id
    });
  };

  handleCommentSubmit = e => {
    e.preventDefault();
    axios.post("/comments", {
      comment_body: this.state.commentInput,
      usercom_id: 1,
      songcom_id: this.state.comId
    });
    this.setState({
      comSubmit: true,
      commentInput: this.state.commentInput
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.state.songs.find(song => {
      return (
        song.title.toLowerCase().indexOf(this.state.input.toLowerCase()) === 0
      );
    });
    this.setState({
      submit: true,
      input: this.state.input
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
          <>
            <div key={res.id} className="songDisplay">
              <img className="albumCover" src={res.img_url} alt="" />
              <div className="titleBar">
                <h2 className="title">{res.title}</h2>
                <p className="totalFav">{res.total}</p>
              </div>
              <div className="favButton">
                <button className="fav">Favorite</button>
              </div>
              <div className="coms">
                <ul>{com}</ul>
              </div>
              <div className="commentBox">
                <form onSubmit={this.handleCommentSubmit}>
                  <input
                    type="text"
                    name="commentInput"
                    id={res.id}
                    value={this.state.commentInput}
                    onChange={this.handleCom}
                    placeholder="Enter Comment"
                  />
                  <button type="submit">Submit</button>
                </form>
              </div>
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
