import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { AuthProvider } from "./contexts/Auth";
import { useAuth } from "./contexts/Auth";
import { useEffect } from "react";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute component={Dashboard} />,
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
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
