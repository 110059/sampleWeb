import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem("role");

    if (role === "admin" || role === "superadmin") {
      navigate("/admin");
    } else if (role === "user") {
      navigate("/user");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="text-center">
      <h2>404 - Page Not Found</h2>
      <p>Redirecting...</p>
    </div>
  );
};

export default NotFound;
