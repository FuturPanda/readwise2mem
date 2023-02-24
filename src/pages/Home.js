import React from "react";
import ImportRM from "../components/ImportRM.js";
import NavBar from "../components/NavBar.js";
import MyProfile from "../components/MyProfile.js";

const Home = () => {
  return (
    <div className="homepage">
      <MyProfile />
      <ImportRM />
    </div>
  );
};

export default Home;
