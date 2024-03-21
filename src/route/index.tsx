import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginForm";
import DashboardLayout from "../Layouts/Dashboard";
import CreateUser from "../pages/dashboard/CreateUser";
import Settings from "../pages/Settings";
import RegisterPage from "../pages/Auth/RegisterForm";
import Page404 from "../pages/Page404";
import Singleuser from "../pages/dashboard/serviceUsers";
import AuthGuard from "../Guard/AuthGuard";
import CreateRecord from "../pages/dashboard/CreateRecord";
import Home from "../pages/dashboard/home";
import Result from "../pages/dashboard/home/Result";
import Monitor from "../pages/dashboard/monitor";
import File from "../pages/dashboard/files";
import CreateReport from "../pages/dashboard/monitor/Report/CreateReport";

export const router = createBrowserRouter([
  // AUTH
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: (
          <AuthGuard>
            <LoginPage />
          </AuthGuard>
        ),
      },
      {
        path: "register",
        element: (
          <AuthGuard>
            <RegisterPage />
          </AuthGuard>
        ),
      },
    ],
  },

  // DASHBOARD
  {
    path: "/dashboard",
    element: <DashboardLayout />,

    children: [
      { element: <Navigate to="/dashboard/app" replace />, index: true },

      {
        path: "app",
        element: <Outlet />,
        children: [
          { index: true, element: <Home /> },
          { path: "search", element: <Result /> },
        ],
      },

      {
        path: "create-new",
        element: <CreateUser />,
      },

      {
        path: "setting",
        element: <Settings />,
      },

      {
        path: "monitoring",
        element: <Outlet />,
        children: [
          { index: true, element: <Monitor /> },
          { path: "create-report", element: <CreateReport /> },
        ],
      },

      { path: "files", element: <File /> },

      {
        path: "user/:id",
        element: <Outlet />,
        children: [
          { index: true, element: <Singleuser /> },
          { path: ":tabID", element: <Singleuser /> },
          { path: "update", element: <CreateRecord /> },
          { path: "update/:tabId", element: <CreateRecord /> },
        ],
      },
    ],
  },

  { path: "/", element: <Navigate to="/auth/login" replace /> },
  { path: "*", element: <Page404 /> },
]);
