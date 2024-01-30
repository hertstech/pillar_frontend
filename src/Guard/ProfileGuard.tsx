import React from "react";
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

  if (isLogged === false) {
    dispatch(dispatchLogout());
    navigate("/auth/login");
  }
  return <>{children}</>;
}
