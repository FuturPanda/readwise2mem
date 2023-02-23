import React from "react";
import MyProfile from "../components/MyProfile.js";
import NavBar from "../components/NavBar.js";

const User = ({ currentSession, user }) => {
  return (
    <div>
      <MyProfile currentSession={currentSession} user={user} />
    </div>
  );
};

export default User;
