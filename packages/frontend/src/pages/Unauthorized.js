import React from "react";

const Unauthorized = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="text-danger">Access Denied</h1>
      <p>You do not have permission to view this page.</p>
    </div>
  );
};

export default Unauthorized;
