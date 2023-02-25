import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "../contexts/Auth";

export function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        {...rest}
        render={(props) => {
          // Renders the page only if `user` is present (user is authenticated)
          // Otherwise, redirect to the login page
          return user ? <Component {...props} /> : <Navigate to="/login" />;
        }}
      ></Route>
    </Routes>
  );
}
