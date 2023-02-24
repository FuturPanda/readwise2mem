import React, { useEffect, useState } from "react";
import { supabase } from "../backend/config/supabaseConfig.js";
import { UilEye } from "@iconscout/react-unicons";

const Landing = ({ changeSession }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  return (
    <>
      <div className="login-box">
        <div className="header-landing">
          <h2>Readwise To Mem</h2>
        </div>
        <form>
          <div className="log-choice">
            <button>SIGN UP</button>
            <button>LOG IN</button>
          </div>
          <div className="inputs-login">
            <input
              className="email-input"
              type="text"
              name=""
              required=""
              placeholder="EMAIL"
            />
            <div className="password-box">
              <input
                className="password-input"
                type="password"
                name=""
                required=""
                placeholder="PASSWORD"
              />
              <UilEye />
            </div>
          </div>
          <button className="btn-create">CREATE ACCOUNT</button>
        </form>
      </div>
    </>
  );
};

export default Landing;
