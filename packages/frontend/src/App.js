import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import Home from "./pages/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserDashboard from "./components/user/UserDashboard";
import ManageProfile from "./components/admin/ManageProfile";
import UserProfile from "./components/user/UserProfile";
import FaceDetection from "./components/common/FaceDetection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SkillForm from "./components/admin/SkillForm";
import ChangePassword from "./components/common/ChangePassword";
import ImageRecognition from "./components/user/ImageRecognition";

function App() {
  return (
    <Router>
      <div className="App">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/unauthorized" element={<Layout><Unauthorized /></Layout>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin", "superadmin"]} />}>
            <Route index element={<Layout><AdminDashboard /></Layout>} />
            <Route path="manage-profile" element={<Layout><ManageProfile /></Layout>} />
            <Route path="manage-skill" element={<Layout><SkillForm /></Layout>} />

          </Route>

          {/* User Routes (Admins cannot access `/user/manage-profile`) */}
          <Route path="/user" element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route index element={<Layout><UserDashboard /></Layout>} />
            <Route path="manage-profile" element={<Layout><UserProfile /></Layout>} />
            <Route path="recognize" element={<Layout><ImageRecognition /></Layout>} />
          </Route>

          {/* Common Feature Route (Face Detection) */}
          <Route path="/face-detection" element={<ProtectedRoute allowedRoles={["user", "admin", "superadmin"]} />}>
            <Route index element={<Layout><FaceDetection /></Layout>} />
          </Route>

           {/* Common Feature Route (Face Detection) */}
           <Route path="/change-password" element={<ProtectedRoute allowedRoles={["user", "admin", "superadmin"]} />}>
            <Route index element={<Layout><ChangePassword /></Layout>} />
         </Route>

          {/* Catch-All 404 */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
