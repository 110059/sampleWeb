import React from "react";
import { Navigate } from "react-router-dom";

// ProtectedRoute component to check if user is logged in
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, allow access to the dashboard or other protected pages
  return children;
};

export default ProtectedRoute;
