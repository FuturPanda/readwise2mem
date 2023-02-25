import React from "react";
import ImportRM from "./ImportRM.js";
import MyProfile from "./MyProfile.js";

const Home = () => {
  return (
    <div className="homepage">
      <MyProfile />
      <ImportRM />
    </div>
  );
};

export default Home;
