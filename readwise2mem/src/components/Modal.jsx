import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../supabaseConfig";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Modal = ({
  user,
  session,
  signOut,
  activeModal,
  classAnimated: animated,
}) => {
  const [editState, setEditState] = useState(false);
  const [memApiKey, setMemApiKey] = useState(user.memApiKey);
  const [readwiseApiKey, setReadwiseApiKey] = useState(user.readwiseApiKey);
  const [email, setEmail] = useState(user.email);
  const navigateTo = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();
    await signOut();
    navigateTo("/login");
  };

  const saveProfile = async () => {
    const res = await supabase
      .from("profiles")
      .update({
        mem_api_key: memApiKey,
        readwise_api_key: readwiseApiKey,
        email: email,
      })
      .eq("id", session.user.id);
    console.log(res);
    setEditState(false);
  };

  const editProfile = () => {
    console.log("dit ! ");
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
    console.log(user);
  }, []);

  return (
    <div
      className={
        activeModal == false
          ? "profile-box inactive"
          : `profile-box ${animated}`
      }
      onClick={(e) => e.stopPropagation}
    >
      <h1>Profil : </h1>
      <form onSubmit={saveProfile}>
        {editState == true ? (
          <input
            type="text"
            className="email-button"
            onChange={handleChangeEmail}
            value={user.email}
          />
        ) : (
          <p className="email-button">{user.email}</p>
        )}
        {/* <h3>Link To Api Keys</h3> */}

        <p>
          API Key MEM :{" "}
          {editState == true ? (
            <input
              type="text"
              className="mem-input"
              onChange={handleChangeMem}
              value={memApiKey}
            />
          ) : (
            <span className="readwise-input"> {memApiKey} </span>
          )}
        </p>

        <p>
          API Key READWISE :{" "}
          {editState == true ? (
            <input
              type="text"
              className="readwise-input"
              onChange={handleChangeReadwise}
              value={user.readwiseApiKey}
            />
          ) : (
            <span className="readwise-input">{user.readwiseApiKey}</span>
          )}
        </p>
        <p>
          Date of the last Import : <span>{user.lastFetched}</span>
        </p>
      </form>
      <div className="btn-wrapper">
        <Button
          text="Edit Profile"
          fonction="Edit Profile Button"
          onClick={editProfile}
        />
        <Button
          text="Save Profile"
          fonction="Save Profile Button"
          onClick={saveProfile}
        />
        <Button
          text="Sign Out"
          fonction="Sign Out Button"
          onClick={handleSignOut}
        />
      </div>
    </div>

    /* <>
        <div className="login-box">
          <div className="header-landing">
            <h2>Profil</h2>
          </div>
          <div className="myprofile">
            <section className="card-profile ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-user"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
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
                <button onClick={handleSignOut}>Log Out</button>
              </div>
            </section>
          </div>
        </div>
      </> */
  );
};

export default Modal;
