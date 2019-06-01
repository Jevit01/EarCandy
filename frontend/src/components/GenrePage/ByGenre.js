import React, { Component } from "react";
import { MyContext } from "../../Provider/MyProvider.js";
const axios = require("axios");

class ByGenre extends Component {
  render() {
    return (
      <>
        <MyContext.Consumer>
          {context => {
            console.log(context);
            return (
              <>
                <form onSubmit={context.func.handleGenreSubmit}>
                  <select
                    name="selectedGenre"
                    onChange={context.func.handleSelect}
                    value={Number(context.state.selectedGenre)}
                  >
                    <option value=""> </option>
                    {context.func.genreList()}
                  </select>
                  <button type="submit">Submit</button>
                </form>
                <div>{context.func.genreDisplay()}</div>
              </>
            );
          }}
        </MyContext.Consumer>
      </>
    );
  }
}

export default ByGenre;
