import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Auth";
import Dashboard from "../Layouts/Dashboard";
import Example from "../pages/example";
import Settings from "../pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/example",
        element: <Example />,
      },
      { path: "/settings", element: <Settings /> },
    ],
  },
  { path: "/auth/login", element: <LoginPage /> },
]);
