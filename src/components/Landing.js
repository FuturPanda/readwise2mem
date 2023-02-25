import React, { useEffect, useState } from "react";
import { supabase } from "../backend/config/supabaseConfig.js";
import { UilEye } from "@iconscout/react-unicons";

const Landing = ({ changeSession }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeMenu, setActiveMenu] = useState("SignUp");
  const [activeEye, setActiveEye] = useState(true);
  const [inputType, setInputType] = useState("password");

  const signUpWithPassword = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    changeSession();
    console.log("Signed Up ! : " + data);
  };

  const logInWithPassword = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    changeSession();
    console.log("logged In ! : " + data);
  };

  const changeStatusMenu = (e) => {
    e.preventDefault();
    if (activeMenu == "SignUp") setActiveMenu("LogIn");
    else setActiveMenu("SignUp");
  };
  const changeActiveEye = (e) => {
    e.preventDefault();
    if (activeEye == true) {
      setActiveEye(false);
      setInputType("text");
    } else {
      setActiveEye(true);
      setInputType("password");
    }
  };

  return (
    <>
      <div className="login-box">
        <div className="header-landing">
          <h2>Readwise To Mem</h2>
        </div>
        <form>
          <div className="log-choice">
            <button
              className={activeMenu == "SignUp" ? "active-menu" : " "}
              onClick={changeStatusMenu}
            >
              SIGN UP
            </button>
            <button
              className={activeMenu !== "SignUp" ? "active-menu" : " "}
              onClick={changeStatusMenu}
            >
              LOG IN
            </button>
          </div>

          <div className="inputs-login">
            <div className="mail-box box-input">
              <input
                className="email-input"
                type="text"
                name=""
                required="true"
                placeholder="EMAIL"
              />
            </div>
            <div className=" password-box box-input">
              <input
                className="password-input"
                type={inputType}
                name=""
                required="true"
                placeholder="PASSWORD"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={
                  activeEye == true
                    ? "feather feather-eye inactive-eye"
                    : "feather feather-eye"
                }
                onClick={changeActiveEye}
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={
                  activeEye == false
                    ? "feather feather-eye inactive-eye"
                    : "feather feather-eye"
                }
                onClick={changeActiveEye}
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
          </div>
          <button className="btn-create">CREATE ACCOUNT</button>
        </form>
      </div>
    </>
  );
};

export default Landing;
