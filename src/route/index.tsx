import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
]);
