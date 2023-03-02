import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "../contexts/Auth";

export function PrivateRoute({ component: Component }) {
  const { user } = useAuth();

  return (
    // Renders the page only if `user` is present (user is authenticated)
    // Otherwise, redirect to the login page
    user ? <Component /> : <Navigate to="/login" />
  );
}
