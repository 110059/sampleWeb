import React from "react";
import Header from "../pages/Header";
import Footer from "../pages/Footer";

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <div className="flex-grow-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
