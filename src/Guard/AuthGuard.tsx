import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dispatchLogout } from "../redux/userSlice";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const isLogged = useSelector((state: any) => state.user.isLogged);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isRegisterRoute = location.pathname === "/auth/register";

    if (isLogged && !isRegisterRoute) {
      navigate("/dashboard/home");
    } else if (!isLogged && !isRegisterRoute) {
      dispatch(dispatchLogout());
      navigate("/auth/login");
    }

    const timer = setTimeout(() => {
      if (!isLogged && !isRegisterRoute) {
        dispatch(dispatchLogout());
        navigate("/auth/login");
      }
    }, 2 * 60 * 1000);

    return () => clearTimeout(timer);
  }, [isLogged, dispatch, navigate, location.pathname]);

  return <>{children}</>;
}
