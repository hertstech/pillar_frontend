import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const isLogged = useSelector((state: any) => state.user.isLogged);

  if (isLogged === true) {
    return <Navigate to="/dashboard/home" />;
  }
  return <>{children}</>;
}
