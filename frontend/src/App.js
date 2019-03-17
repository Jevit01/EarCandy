import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/HomePage/Home.js";
import Songs from "./components/SongsPage/Songs.js";
import NavBar from "./components/NavBar.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/songs" component={Songs} />
        </Switch>
      </div>
    );
  }
}

export default App;
