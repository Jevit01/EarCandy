import React, { Component } from "react";
import SongDisplay from "../components/SongDisplay.js";
export const MyContext = React.createContext();
const axios = require("axios");

class MyProvider extends Component {
  state = {
    songs: [],
    songDisplay: [],
    popularSongs: [],
    songsByGenre: [],
    genres: [],
    selectedGenre: "",
    submit: false,
    input: "",
    submit: false,
    users: [],
    mySongs: [],
    compDisplay: "",
    fav: []
  };

  componentDidMount() {
    this.getSongs();
    this.getPopularSongs();
    this.getGenre();
    this.getUsers();
    this.showUsersPosts();
  }

  getUsers = () => {
    axios.get("/users/").then(user => {
      this.setState({
        users: user.data.data
      });
    });
  };

  showUsersPosts = () => {
    axios.get("/songs/info").then(songs => {
      this.setState({
        mySongs: songs.data.data,
        compDisplay: "posts"
      });
    });
  };

  showFavorites = () => {
    axios.get("/favorites/user").then(fav => {
      this.setState({
        fav: fav.data.data,
        compDisplay: "favs"
      });
    });
  };

  getSongs = () => {
    axios.get("/songs/info").then(songs => {
      this.setState({
        songs: songs.data.data,
        songDisplay: songs.data.data
      });
    });
  };

  getPopularSongs = () => {
    axios.get("/songs/popular").then(songs => {
      this.setState({
        popularSongs: songs.data.data
      });
    });
  };

  getGenre = () => {
    axios.get("/genres").then(gen => {
      this.setState({
        genres: gen.data.data
      });
    });
  };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let search = this.state.songs.filter(song => {
      if (song.id === null) {
        return "";
      } else {
        return song.title
          .toLowerCase()
          .includes(this.state.input.toLowerCase());
      }
    });
    this.setState({
      input: "",
      songDisplay: search
    });
  };

  handleSelect = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleGenreSubmit = e => {
    e.preventDefault();
    axios.get(`/songs/genres/${this.state.selectedGenre}`).then(songs => {
      this.setState({
        songsByGenre: songs.data.data,
        submit: true
      });
    });
  };

  genreList = () => {
    let genreList = this.state.genres.map(genre => {
      return <option value={genre.id}>{genre.genre_name}</option>;
    });
    return genreList;
  };

  genreDisplay = () => {
    let songs = this.state.songsByGenre.map(res => {
      if (res.id === null) {
        return "";
      } else {
        return (
          <>
            <div key={res.id} className="songDisplay">
              <SongDisplay
                image={res.img_url}
                title={res.title}
                favTotal={res.total}
                songId={res.id}
                songData={this.getSongs}
                popularSongs={this.getPopularSongs}
                comments={res.comments}
              />
            </div>
            <br />
            <br />
          </>
        );
      }
    });
    return songs;
  };

  songs = () => {
    let songs = this.state.songDisplay.map(res => {
      if (res.id === null) {
        return "";
      } else {
        return (
          <>
            <div key={res.id} className="songDisplay">
              <SongDisplay
                image={res.img_url}
                title={res.title}
                favTotal={res.total}
                songId={res.id}
                songData={this.getSongs}
                popularSongs={this.getPopularSongs}
                comments={res.comments}
              />
            </div>
            <br />
            <br />
          </>
        );
      }
    });
    return songs;
  };

  popularSongs = () => {
    let songs = this.state.popularSongs.map(res => {
      if (res.id === null) {
        return "";
      } else {
        return (
          <>
            <div key={res.id} className="songDisplay">
              <SongDisplay
                image={res.img_url}
                title={res.title}
                favTotal={res.total}
                songId={res.id}
                songData={this.getSongs}
                popularSongs={this.getPopularSongs}
                comments={res.comments}
              />
            </div>
            <br />
            <br />
          </>
        );
      }
    });
    return songs;
  };

  usersSongs = () => {
    let songs = this.state.songs.map(res => {
      if (res.users === 1) {
        return (
          <>
            <div key={res.id} className="songDisplay">
              <SongDisplay
                image={res.img_url}
                title={res.title}
                favTotal={res.total}
                songId={res.id}
                songData={this.getSongs}
                popularSongs={this.getPopularSongs}
                comments={res.comments}
              />
            </div>
            <br />
            <br />
          </>
        );
      }
    });
    return songs;
  };

  fav = () => {
    let fav = this.state.fav.map(res => {
      return (
        <>
          <div key={res.id} className="songDisplay">
            <SongDisplay
              image={res.img_url}
              title={res.title}
              favTotal={res.total}
              songId={res.id}
              songData={this.getSongs}
              popularSongs={this.getPopularSongs}
              comments={res.comments}
            />
          </div>
          <br />
          <br />
        </>
      );
    });
    return fav;
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          func: {
            getSongs: this.getSongs,
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit,
            handleGenreSubmit: this.handleGenreSubmit,
            songs: this.songs,
            popularSongs: this.popularSongs,
            genreList: this.genreList,
            genreDisplay: this.genreDisplay,
            handleSelect: this.handleSelect,
            getUsers: this.getUsers,
            showUsersPosts: this.showUsersPosts,
            showFavorites: this.showFavorites,
            usersSongs: this.usersSongs,
            fav: this.fav
          }
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
