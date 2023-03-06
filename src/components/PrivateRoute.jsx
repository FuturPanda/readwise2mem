import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "../contexts/Auth";

export function PrivateRoute({ component: Component }) {
  const { sessionState } = useAuth();

  return (
    // Renders the page only if `user` is present (user is authenticated)
    // Otherwise, redirect to the login page
    sessionState ? <Component /> : <Navigate to="/login" />
  );
}
