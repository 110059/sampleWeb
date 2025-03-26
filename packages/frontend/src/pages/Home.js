import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    }
  }, [navigate]);

  return (
    <div>
      {/* Hero Section */}
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to VedTry</h1>
          <p className="lead">
            AI-powered content generation & image recognition at your
            fingertips.
          </p>
          <div className="mt-4">
            <Link to="/login" className="btn btn-light btn-lg me-3">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline-light btn-lg">
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container py-5">
        <h2 className="text-center mb-4">Why Choose VedTry?</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <div className="card shadow-sm p-4">
              <h3 className="fw-bold">AI-Powered</h3>
              <p>
                Experience the best AI-driven content creation and image
                recognition.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-4">
              <h3 className="fw-bold">Fast & Secure</h3>
              <p>
                Lightning-fast performance with top-notch security features.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-4">
              <h3 className="fw-bold">User-Friendly</h3>
              <p>
                A seamless experience tailored to enhance your productivity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
