import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/HomePage/Home.js";
import Songs from "./components/SongsPage/Songs.js";
import NavBar from "./components/NavBar.js";
import Profile from "./components/ProfilePage/Profile.js";
import ByPopularity from "./components/PopularPage/ByPopularity.js";
import ByGenre from "./components/GenrePage/ByGenre.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/songs" component={Songs} />
          <Route path="/popularity" component={ByPopularity} />
          <Route path="/genres" component={ByGenre} />
          <Route path="/myprofile" component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default App;
