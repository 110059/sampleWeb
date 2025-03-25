import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a token exists in localStorage (user is logged in)
    const token = localStorage.getItem("token");

    if (token) {
      // Redirect to the Dashboard if the user is already logged in
      navigate("/dashboard");
    }
  }, [navigate]); // Empty dependency array ensures this runs once when component mounts

  return (
    <div className="container text-center mt-5">
      <h1>Welcome to My VedTry</h1>
      <div className="mt-3">
        <Link to="/login" className="btn btn-primary mr-3">
          Login
        </Link>
        <Link to="/register" className="btn btn-secondary">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
