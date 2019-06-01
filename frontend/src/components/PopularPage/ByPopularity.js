import React, { Component } from "react";
import { MyContext } from "../../Provider/MyProvider.js";
const axios = require("axios");

class ByPopularity extends Component {
  render() {
    return (
      <>
        <MyContext.Consumer>
          {context => {
            return (
              <>
                <br />
                <div>{context.func.popularSongs()}</div>
                <br />
              </>
            );
          }}
        </MyContext.Consumer>
      </>
    );
  }
}

export default ByPopularity;
