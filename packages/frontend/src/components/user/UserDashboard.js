import React from "react";
import Sidebar from "../common/Sidebar"; // Import Sidebar component
import { Outlet } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="d-flex flex-column" style={{ height: "85vh" }}>
      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="col-md-9 d-flex flex-column">
          <div className="p-3">
            <h2 className="text-primary">Welcome to User Dashboard</h2>
            <p className="text-muted">
              Access your profile, AI features, and other functionalities here.
            </p>
          </div>

          <div className="flex-grow-1 p-3 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
