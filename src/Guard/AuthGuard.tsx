import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dispatchLogout } from "../redux/userSlice";
import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const isLogged = useSelector((state: any) => state.user.isLogged);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged === true) {
      <Navigate to="/dashboard/home" />;
    }

    if (!isLogged) {
      dispatch(dispatchLogout());
      navigate("/auth/login");
    }

    const timer = setTimeout(() => {
      if (!isLogged) {
        dispatch(dispatchLogout());
        navigate("/auth/login");
      }
    }, 2 * 60 * 1000);
    return () => clearTimeout(timer);
  }, [isLogged, dispatch, navigate]);

  return <>{children}</>;
}
