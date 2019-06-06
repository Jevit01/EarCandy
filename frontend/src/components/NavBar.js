import React from "react";
import { Link } from "react-router-dom";
import "../CSS/NavBar.css";

const NavBar = () => {
  return (
    <>
      <div className="topBar">
        <Link to="/" className="logo">
          <h1>EarCandy</h1>
        </Link>
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
