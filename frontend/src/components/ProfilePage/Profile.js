import React, { Component } from "react";
import PostForm from "./PostForm.js";
import SongDisplay from "../SongDisplay.js";
import { MyContext } from "../../Provider/MyProvider.js";
const axios = require("axios");

class Profile extends Component {
  render() {
    return (
      <>
        <MyContext.Consumer>
          {context => {
            let nameSearch = context.state.users.map(res => {
              if (res.id === 1) {
                return res.username;
              }
              return nameSearch;
            });

            return (
              <>
                <h2 className="username">{nameSearch}</h2>
                <br />
                <PostForm showUsersPosts={context.func.showUsersPosts} />
                <br />
                <button onClick={context.func.showUsersPosts}>Posts</button>
                <button onClick={context.func.showFavorites}>Favorites</button>
                {context.state.compDisplay === "posts" ? (
                  <div>{context.func.usersSongs()}</div>
                ) : (
                  ""
                )}
                {context.state.compDisplay === "favs" ? (
                  <div>{context.func.fav()}</div>
                ) : (
                  ""
                )}
                <br />
              </>
            );
          }}
        </MyContext.Consumer>
      </>
    );
  }
}

export default Profile;
