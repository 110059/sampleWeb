import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const role = localStorage.getItem("role"); // Get role from localStorage

  return (
    <div
      className="col-md-3 bg-light p-4 d-flex flex-column"
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <h4>Navigation</h4>
      <ul className="nav flex-column">
        {/* Face Detection is common for both */}
        <li className="nav-item">
          <Link to="/face-detection" className="nav-link">
            Face Detection
          </Link>
        </li>

        {/* Role-based links */}
        {role === "admin" ? (
          <li className="nav-item">
            <Link to="/admin/manage-profile" className="nav-link">
              Manage Profile
            </Link>
          </li>
        ) : (
          <li className="nav-item">
            <Link to="/user/manage-profile" className="nav-link">
              Manage User Profile
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
