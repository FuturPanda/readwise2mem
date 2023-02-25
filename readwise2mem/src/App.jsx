import { useState } from "react";
// import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import "./App.css";
import { AuthProvider } from "./contexts/Auth";
// import { PrivateRoute } from "./components/PrivateRoute";
import { useAuth } from "./contexts/Auth";
import { useEffect } from "react";

function App() {
  // const { user } = useAuth();
  // useEffect(() => {
  //   console.log(user);
  // });
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return (
    <div className="App">
      <h1>Readwise to Mem</h1>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
