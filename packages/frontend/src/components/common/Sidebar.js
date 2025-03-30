import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaChevronRight, FaUser, FaRobot } from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNested, setShowNested] = useState(false);
  const role = sessionStorage.getItem("role"); // Get role from sessionStorage

  return (
    <div
      className="bg-light d-flex flex-column align-items-center"
      style={{
        width: isCollapsed ? "60px" : "220px",
        height: "100vh",
        overflowY: "auto",
        transition: "width 0.3s",
        padding: "10px",
      }}
    >
      {/* Toggle Sidebar Button (Placed at the top-left) */}
      <button
        className="btn btn-sm btn-outline-primary mb-3"
        style={{
          alignSelf: "flex-start",
          marginLeft: isCollapsed ? "5px" : "auto",
        }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <FaBars size={20} /> : <FaTimes size={20} />}
      </button>

      {!isCollapsed && <h5 className="text-center mb-4">Menu</h5>}

      <ul className="nav flex-column w-100">
        <li className="nav-item">
          <Link to="/face-detection" className="nav-link d-flex align-items-center text-dark">
            <FaRobot className="me-2" />
            {!isCollapsed && "Face Detection"}
          </Link>
        </li>

        {/* Nested Sample Links */}
        <li className="nav-item">
          <div
            className="nav-link d-flex align-items-center text-dark"
            style={{ cursor: "pointer", fontWeight: showNested ? "bold" : "normal" }}
            onClick={() => setShowNested(!showNested)}
          >
            <FaChevronRight className="me-2" />
            {!isCollapsed && "AI Features"}
          </div>
          {showNested && !isCollapsed && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item">
                <Link to="/ai/object-detection" className="nav-link text-secondary">
                  Object Detection
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/ai/sentiment-analysis" className="nav-link text-secondary">
                  Sentiment Analysis
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Role-based links */}
        {(role === "admin" || role === "superadmin") ? (
          <li className="nav-item">
            <Link to="/admin/manage-profile" className="nav-link d-flex align-items-center text-danger">
              <FaUser className="me-2" />
              {!isCollapsed && "Manage Profiles"}
            </Link>
          </li>
        ) : (
          <li className="nav-item">
            <Link to="/user/manage-profile" className="nav-link d-flex align-items-center text-success">
              <FaUser className="me-2" />
              {!isCollapsed && "Manage User Profile"}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
