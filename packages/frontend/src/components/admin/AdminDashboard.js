import React from "react";
import Sidebar from "../common/Sidebar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="d-flex flex-column" style={{ height: "85vh" }}>
      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="col-md-9 d-flex flex-column">
          <div className="p-3">
            <h2 className="text-primary">Welcome to Admin Dashboard</h2>
            <p className="text-muted">
              Manage users, settings, and AI features from here.
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

export default AdminDashboard;
