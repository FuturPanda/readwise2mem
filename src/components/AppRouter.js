import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.js";
import About from "../pages/About.js";
import User from "../pages/User.js";
import Jokes from "../pages/Jokes.js";

const AppRouter = ({ currentSession, user }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/user"
        element={<User currentSession={currentSession} user={user} />}
      />
      <Route
        path="/joke"
        element={<Jokes currentSession={currentSession} user={user} />}
      />
    </Routes>
  );
};

export default AppRouter;
