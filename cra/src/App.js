import { createClient } from "@supabase/supabase-js";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Home.js";
import Loggin from "./components/Loggin.js";
import Landing from "./components/Landing.js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const App = () => {
  const [user, setUser] = useState();
  const [currentSession, setCurrentSession] = useState(null);

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    const { session } = data;
    setCurrentSession(session);
    setUser(session?.user);
  };
  const changeSession = () => {
    getSession();
  };

  useEffect(() => {
    getSession();

    supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_IN":
          setUser(session?.user);
          break;
        case "SIGNED_OUT":
          setUser(null);
          break;

        default:
      }
      console.log("event auth change", event, session);
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        {currentSession ? (
          <>
            <Loggin changeSession={changeSession} user={user} /> <Home />
          </>
        ) : (
          <Landing changeSession={changeSession} />
        )}
      </BrowserRouter>
    </>
  );
};

export default App;
