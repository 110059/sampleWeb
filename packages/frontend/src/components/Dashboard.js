import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom"; // Import Outlet to load pages

const Dashboard = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Header />

      <div className="container-fluid mt-4 flex-grow-1">
        <div className="row">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content (Dynamic Page Content) */}
          <div className="col-md-9">
            <Outlet /> {/* This will load different pages inside Dashboard */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
