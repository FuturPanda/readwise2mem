import React from "react";
import { NavLink } from "react-router-dom";
import Loggin from "./Loggin.js";

const NavBar = ({ changeSession, user }) => {
  return (
    <div className="navbar">
      <ul>
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/about">
          <li>About</li>
        </NavLink>
        <NavLink to="/user">
          <li>User</li>
        </NavLink>
        <NavLink to="/joke">
          <li>Joke</li>
        </NavLink>
      </ul>
      <Loggin changeSession={changeSession} user={user} />
    </div>
  );
};

export default NavBar;
