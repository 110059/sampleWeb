import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/dashboard"); // Redirect to dashboard after 3 seconds
    }, 3000);
  }, [navigate]);

  return (
    <div className="text-center">
      <h2>404 - Page Not Found</h2>
      <p>Redirecting to Dashboard...</p>
    </div>
  );
};

export default NotFound;
