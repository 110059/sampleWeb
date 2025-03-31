import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { parsePhoneNumberFromString } from "libphonenumber-js";


const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("VedTry@123");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.match(/^[a-zA-Z ]{3,}$/)) {
      setError("Name must be at least 3 characters and contain only letters.");
      return;
    }
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      setError("Invalid email format.");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_REGISTER}`,
        { name, username, email, password, role, phone }
      );

      if (response) {
        setSuccess("Registration successful! Redirecting to login...");
        setError("");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : "Server error");
      setSuccess("");
    }
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    setPhone(input);

    const phoneNumber = parsePhoneNumberFromString(input);

    // Use optional chaining to check validity safely
    setError(phoneNumber?.isValid() ? "" : "Invalid phone number format");
  };

  return (
    <div className="container text-center mt-5">
      <h1>Register for VedTry</h1>
      <div className="row justify-content-center mt-3">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-3">
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
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label>Phone Number (optional)</label>
                <input
                  type="tel"
                  className="form-control"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter phone number (with country code)"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}"
                  title="Must contain at least one number, one uppercase, one lowercase, one special character, and at least 8 characters"
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label>Role</label>
                <select
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary mt-3 w-100">
                Register
              </button>
            </form>
            <p className="mt-3">
              Already have an account? <a href="/login">Login here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
