import React, { useEffect, useState } from "react";
import { supabase } from "../backend/config/supabaseConfig.js";

const MyProfile = ({ currentSession }) => {
  const [user, setUser] = useState(null);
  const [memApiKey, setMemApiKey] = useState("");
  const [readwiseApiKey, setReadwiseApiKey] = useState("");
  const [editState, setEditState] = useState(false);
  const [email, setEmail] = useState("");
  const [lastFetched, setLastFetched] = useState("");

  const getUser = async () => {
    const { data } = await supabase.from("profiles").select("*");
    const user = data[0];
    if (user) setUser(user);
    if (user.mem_api_key) setMemApiKey(user.mem_api_key);
    if (user.readwise_api_key) setReadwiseApiKey(user.readwise_api_key);
    if (user.email) setEmail(user.email);
    if (user.last_fetched) setLastFetched(user.last_fetched);
  };
  const saveProfile = async () => {
    const res = await supabase
      .from("profiles")
      .update({
        mem_api_key: memApiKey,
        readwise_api_key: readwiseApiKey,
        email: email,
      })
      .eq("id", user.id);
    console.log(res);
    setEditState(false);
  };
  const editProfile = () => {
    setEditState(true);
  };
  const handleChangeMem = (e) => {
    setMemApiKey(e.target.value);
  };
  const handleChangeReadwise = (e) => {
    setReadwiseApiKey(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  useEffect(() => {
    getUser();
    console.log(user);
  }, []);
  return (
    <div className="myprofile">
      <img src="./assets/profile.jpg" alt="" />
      <section className="card-profile ">
        <div className="container">
          <p className="item-a"> EMAIL </p>
          <p className="item-b"> PASSWORD </p>
          <p className="item-c">READWISE API KEY </p>
          <p className="item-d">MEM API KEY </p>
          {editState == true ? (
            <input
              type="text"
              className="email-button"
              onChange={handleChangeEmail}
              value={email}
            />
          ) : (
            <h2 className="email-button">{email}</h2>
          )}
          <button className="password-button">CHANGE PASSWORD</button>
          {editState == true ? (
            <input
              type="text"
              className="readwise-input"
              onChange={handleChangeReadwise}
              value={readwiseApiKey}
            />
          ) : (
            <h2 className="readwise-input">{readwiseApiKey}</h2>
          )}
          {editState == true ? (
            <input
              type="text"
              className="mem-input"
              onChange={handleChangeMem}
              value={memApiKey}
            />
          ) : (
            <h2 className="readwise-input"> {memApiKey} </h2>
          )}
        </div>
        <div className="button-wrapper">
          <p> Last Fetch Was : {lastFetched}</p>
          <button className="button-save" onClick={saveProfile}>
            Save
          </button>
          <button className="button-edit" onClick={editProfile}>
            Edit Profile
          </button>
        </div>
      </section>
    </div>
  );
};

export default MyProfile;
