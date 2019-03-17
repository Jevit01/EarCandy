import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/songs">All Songs</Link>
        <Link to="/popularity">Popularity</Link>
        <Link to="/genres">All Genres</Link>
        <Link to="/myprofile">My Profile</Link>
      </nav>
    </>
  );
};

export default NavBar;
