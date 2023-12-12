import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginForm";
import Dashboard from "../Layouts/Dashboard";
import Example from "../pages/CreateUser";
import Settings from "../pages/Settings";
import RegisterPage from "../pages/Auth/RegisterForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <Example />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/auth",
    children: [
      { path: "/auth/login", element: <LoginPage /> },
      { path: "/auth/register", element: <RegisterPage /> },
    ],
  },
]);
