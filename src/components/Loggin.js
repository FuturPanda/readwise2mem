import React, { useEffect, useState } from "react";
import { supabase } from "../backend/config/supabaseConfig.js";
import "../styles/components/loggin.scss";

const Loggin = ({ getSession }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [session, setSession] = useState(null);

  const handleSessionChange = async () => {
    let currentSession = await getSession();
    console.log(currentSession);
  };
  useEffect(() => {
    handleSessionChange();
  });
  const signUpWithPassword = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    console.log("Signed Up ! : " + data);
  };

  const logInWithPassword = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    console.log("logged In ! : " + data);
  };
  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
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
          <p>Hello {session.user.email}</p>
          <button onClick={logOut}>Log Out </button>
        </>
      )}
    </div>
  );
};

export default Loggin;
