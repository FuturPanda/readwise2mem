import React, { useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseConfig.js";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [sessionState, setSessionState] = useState("");

  const getUser = async () => {
    const { data } = await supabase.from("profiles").select("*");
    const userToSet = data[0];
    if (userToSet)
      setUser({
        memApiKey: userToSet.mem_api_key ?? null,
        readwiseApiKey: userToSet.readwise_api_key ?? null,
        email: userToSet.email,
        lastFetched: userToSet.last_fetched ?? null,
        importStatus: userToSet.import_status ?? null,
      });
    setLoading(false);
  };
  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    const { session } = data;
    setSessionState(session);
  };

  const getAuthChange = async () => {
    const { data: listener } = await supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(session);
        const userToSet = session?.user ?? null;
        if (userToSet) {
          setUser({
            memApiKey: userToSet.mem_api_key ?? null,
            readwiseApiKey: userToSet.readwise_api_key ?? null,
            email: userToSet.email,
            lastFetched: userToSet.last_fetched ?? null,
            importStatus: userToSet.import_status ?? null,
          });
          setSession(session);
        }
        setLoading(false);
      }
    );
    const { subscription } = listener;
    return subscription?.unsubscribe();
  };

  useEffect(() => {
    getAuthChange();
    getUser();
    getSession();

    return () => {
      // listener?.unsubscribe();
    };
  }, []);

  // Will be passed down to Signup, Login and Dashboard components
  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),
    user,
    sessionState,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
