import { Navigate, createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginForm";
import DashboardLayout from "../Layouts/Dashboard";
import Dashboard from "../pages/CreateUser";
import Settings from "../pages/Settings";
import RegisterPage from "../pages/Auth/RegisterForm";
import Page404 from "../pages/Page404";
import ResultPage from "../pages/ResultPage";

export const router = createBrowserRouter([
  // AUTH
  {
    path: "auth",
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },

  // DASHBOARD
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "new",
        element: <Dashboard />,
        // index: true,
      },
      {
        path: "setting",
        element: <Settings />,
      },
      { path: "search-result", element: <ResultPage /> },
    ],
  },

  { path: "/", element: <Navigate to="/auth/login" replace /> },
  { path: "*", element: <Page404 /> },
]);
