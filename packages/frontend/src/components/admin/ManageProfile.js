import React from "react";
import Sidebar from "../common/Sidebar"; // Import Sidebar

const ManageProfile = () => {
  return (
    <div className="d-flex" style={{ height: "85vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="col-md-9 d-flex flex-column p-4">
        <h2>Manage Profile</h2>
        <p>Update and manage your profile settings here.</p>
      </div>
    </div>
  );
};

export default ManageProfile;
