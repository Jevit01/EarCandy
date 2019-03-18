import React from "react";
import { Link } from "react-router-dom";
import "../CSS/NavBar.css";

const NavBar = () => {
  return (
    <>
      <div className="topBar">
        <h2>Earworm</h2>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/songs">All Songs</Link>
          <Link to="/popularity">Popularity</Link>
          <Link to="/genres">All Genres</Link>
          <Link to="/myprofile">My Profile</Link>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
