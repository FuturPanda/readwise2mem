import { createClient } from "@supabase/supabase-js";
import NavBar from "./components/NavBar.js";
import AppRouter from "./components/AppRouter.js";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";

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
    setUser(session?.user);
    setCurrentSession(session);
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
        <NavBar user={user} currentSession={currentSession} />
        <AppRouter user={user} currentSession={currentSession} />
      </BrowserRouter>
    </>
  );
};

export default App;
