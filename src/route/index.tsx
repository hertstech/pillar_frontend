import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginForm";
import DashboardLayout from "../Layouts/Dashboard";
import CreateUser from "../pages/dashboard/CreateUser";
import Settings from "../pages/Settings";
import RegisterPage from "../pages/Auth/RegisterForm";
import Page404 from "../pages/Page404";
import SingleUser from "../pages/dashboard/serviceUsers";
import AuthGuard from "../Guard/AuthGuard";
import UpdateRecord from "../pages/dashboard/CreateRecord";
import Search from "../pages/dashboard/search";
import Result from "../pages/dashboard/search/Result";
import Monitor from "../pages/dashboard/monitor";
import File from "../pages/dashboard/files";
import CreateReport from "../pages/dashboard/monitor/Report/CreateReport";
import Home from "../pages/dashboard/home";
import { AddTestRecord } from "../pages/dashboard/serviceUsers/Test/AddTest";
import { DupTestRecord } from "../pages/dashboard/serviceUsers/Test/DuplicateTest";
import { UpdateTestRecord } from "../pages/dashboard/serviceUsers/Test/UpdateTest";

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
      { element: <Navigate to="/dashboard/home" replace />, index: true },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "search",
        element: <Outlet />,
        children: [
          { index: true, element: <Search /> },
          { path: "result", element: <Result /> },
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
          { path: "update/:tabId?", element: <UpdateRecord /> },
          { path: ":tabId?", element: <SingleUser /> },
          { path: ":tabId?/add-test", element: <AddTestRecord /> },
          { path: ":tabId?/duplicate-test", element: <DupTestRecord /> },
          { path: ":tabId?/update-test", element: <UpdateTestRecord /> },
        ],
      },
    ],
  },

  { path: "/", element: <Navigate to="/auth/login" replace /> },
  { path: "*", element: <Page404 /> },
]);
