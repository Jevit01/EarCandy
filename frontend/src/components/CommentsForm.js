import React, { Component } from "react";
const axios = require("axios");

class CommentsForm extends Component {
  state = {
    comments: [],
    commentInput: "",
    comSubmit: false
  };

  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    axios.get(`/comments/songs/${this.props.songId}`).then(com => {
      this.setState({
        comments: com.data.data
      });
    });
  };

  handleCom = e => {
    this.setState({
      commentInput: e.target.value
    });
  };

  handleCommentSubmit = e => {
    e.preventDefault();
    console.log(this.props.songId);
    axios
      .post("/comments", {
        comment_body: this.state.commentInput,
        usercom_id: 1,
        songcom_id: this.props.songId
      })
      .then(() => {
        this.setState({
          commentInput: ""
        });
      });
  };

  render() {
    let com = this.props.comments.map(data => {
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
      <>
        <div className="coms">
          <ul>{com}</ul>
        </div>
        <div className="commentBox">
          <form onSubmit={this.handleCommentSubmit}>
            <input
              type="text"
              name="commentInput"
              id={this.props.songId}
              value={this.state.commentInput}
              onChange={this.handleCom}
              placeholder="Enter Comment"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </>
    );
  }
}

export default CommentsForm;
