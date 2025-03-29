import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("VedTry@123");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + process.env.REACT_APP_API_LOGIN,
        { username, password }
      );

      console.log('uiresponse', response);

      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("role", response.data.role); // Save role in sessionStorage
      sessionStorage.setItem("token_expiry", new Date().getTime() + 30 * 60 * 1000); //30min

      // Redirect based on role
      if (response.data.role === "admin" || response.data.role === "superuser") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : "Server error");
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Login to VedTry</h1>
      <div className="row justify-content-center mt-3">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3 w-100">
                Login
              </button>
            </form>
            <p className="mt-3">
              Don't have an account? <a href="/register">Register here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
