import React from "react";
import Sidebar from "../common/Sidebar"; // Import Sidebar

const UserProfile = () => {
  return (
    <div className="d-flex" style={{ height: "85vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="col-md-9 d-flex flex-column">
        <div className="flex-grow-1 p-3 overflow-auto">
          <h2>Manage Profile Page</h2>
          <p>Edit your profile details here.</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
