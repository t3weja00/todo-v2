import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/useUser.ts";

export default function ProtectedRoute() {
  const { user } = useUser();

  // Check if user is authenticated
  if (!user || !user.token) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
}
