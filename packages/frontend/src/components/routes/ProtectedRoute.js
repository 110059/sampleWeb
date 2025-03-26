import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("role"); // Fetch user role

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />; // Redirect if role is not allowed
  }

  return <Outlet />;
};

export default ProtectedRoute;
