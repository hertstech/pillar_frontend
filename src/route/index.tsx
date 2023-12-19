import { Navigate, createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginForm";
import DashboardLayout from "../Layouts/Dashboard";
import Dashboard from "../pages/dashboard/CreateUser";
import Settings from "../pages/Settings";
import RegisterPage from "../pages/Auth/RegisterForm";
import Page404 from "../pages/Page404";
import ResultPage from "../pages/ResultPage";
import ProfileHome from "../pages/dashboard/Profile";
import Singleuser from "../pages/dashboard/serviceUsers";

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
      { element: <Navigate to="/dashboard/profile" replace />, index: true },

      {
        path: "profile",
        element: <ProfileHome />,
      },
      {
        path: "new",
        element: <Dashboard />,
      },
      {
        path: "setting",
        element: <Settings />,
      },
      {
        path: "search-result/:id",
        element: <ResultPage />,
      },
      {
        path: "user/:id",
        element: <Singleuser />,
      },
    ],
  },

  { path: "/", element: <Navigate to="/auth/login" replace /> },
  { path: "*", element: <Page404 /> },
]);
