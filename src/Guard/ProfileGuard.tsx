import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dispatchLogout } from "../redux/userSlice";

export default function ProfileGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogged = useSelector((state: any) => state.user.isLogged);

  useEffect(() => {
    if (isLogged === false) {
      dispatch(dispatchLogout());
      navigate("/auth/login");
    } else {
      const timer = setTimeout(() => {
        if (isLogged === false) {
          dispatch(dispatchLogout());
          navigate("/auth/login");
        }
      }, 2 * 60 * 1000);
      return () => clearTimeout(timer);
    }
  }, [isLogged, dispatch, navigate]);

  return <>{children}</>;
}
