import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ManageProfile from "./components/admin/ManageProfile";
import UserProfile from "./components/user/UserProfile";
import FaceDetection from "./components/common/FaceDetection";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/unauthorized" element={<Layout><Unauthorized /></Layout>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route index element={<Layout><AdminDashboard /></Layout>} />
            <Route path="manage-profile" element={<Layout><ManageProfile /></Layout>} />
          </Route>

          {/* User Routes (Admins cannot access `/user/manage-profile`) */}
          <Route path="/user" element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route index element={<Layout><UserDashboard /></Layout>} />
            <Route path="manage-profile" element={<Layout><UserProfile /></Layout>} />
          </Route>

          {/* Common Feature Route (Face Detection) */}
          <Route path="/face-detection" element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
            <Route index element={<Layout><FaceDetection /></Layout>} />
          </Route>

          {/* Catch-All 404 */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
