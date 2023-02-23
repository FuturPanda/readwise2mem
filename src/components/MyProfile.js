import React, { useEffect } from "react";

const MyProfile = ({ currentSession, user }) => {
  useEffect(() => {
    console.log(user);
  });
  return (
    <div className="myprofile">
      <img src="./assets/profile.jpg" alt="" />
      <section className="card-profile r">
        <img src="" alt="avatar" />
        <div className="container">
          <p className="item-a"> EMAIL : {user ? user.email : ""}</p>
          <p className="item-b"> PASSWORD </p>
          <p className="item-c">READWISE API KEY </p>
          <p className="item-d">MEM API KEY </p>
          <button className="email-button"> CHANGE EMAIL</button>
          <button className="password-button">CHANGE PASSWORD</button>
          <input type="text" className="readwise-input" />
          <input type="text" className="mem-input" />
        </div>
        <button className="button-save">Save</button>
      </section>
    </div>
  );
};

export default MyProfile;
