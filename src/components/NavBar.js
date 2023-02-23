import React from "react";
import { NavLink } from "react-router-dom";
import Loggin from "./Loggin.js";

const NavBar = ({ getSession }) => {
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
      </ul>
      <Loggin getSession={getSession} />
    </div>
  );
};

export default NavBar;
