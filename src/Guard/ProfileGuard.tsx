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
  const token = useSelector((state: any) => state.user.access_token);
  const refreshToken = useSelector(
    (state: any) => state.user.user.refresh_token
  );

  console.log(refreshToken);
  if (!token || !refreshToken) {
    dispatch(dispatchLogout());
    navigate("/auth/login");
  }
  return <>{children}</>;
}
