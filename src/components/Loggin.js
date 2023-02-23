import React, { useEffect, useState } from "react";
import { supabase } from "../backend/config/supabaseConfig.js";
import "../styles/components/loggin.scss";

const Loggin = ({ changeSession, user }) => {
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
  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    changeSession();
  };

  return (
    <div className="auth">
      {user == null ? (
        <>
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={signUpWithPassword}>Sign Up</button>
          <button onClick={logInWithPassword}>Log IN </button>
        </>
      ) : (
        <>
          <p>Hello {user.email}</p>
          <button onClick={logOut}>Log Out </button>
        </>
      )}
    </div>
  );
};

export default Loggin;
