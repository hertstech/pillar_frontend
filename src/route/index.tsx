import { Navigate, createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginForm";
import DashboardLayout from "../Layouts/Dashboard";
import Dashboard from "../pages/dashboard/CreateUser";
import Settings from "../pages/Settings";
import RegisterPage from "../pages/Auth/RegisterForm";
import Page404 from "../pages/Page404";
import ResultPage from "../pages/dashboard/ResultPage";
import ProfileHome from "../pages/dashboard/Profile";
import Singleuser from "../pages/dashboard/serviceUsers";
import AuthGuard from "../Guard/AuthGuard";
import CreateRecord from "../pages/dashboard/CreateRecord";
// import Singleuser from "../pages/dashboard/ServiceUsers";

export const router = createBrowserRouter([
  // AUTH
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: (
          <AuthGuard>
            <LoginPage />{" "}
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
        path: "search-result",
        element: <ResultPage />,
      },
      {
        path: "user/:id",
        element: <Singleuser />,
      },
      {
        path: "user/:id/:tabID",
        element: <Singleuser />,
      },
      {
        path: "user/:id/update",
        element: <CreateRecord />,
      },
      {
        path: "user/:id/update/:tabId",
        element: <CreateRecord />,
      },
    ],
  },

  { path: "/", element: <Navigate to="/auth/login" replace /> },
  { path: "*", element: <Page404 /> },
]);
