import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout"; // Import the Layout component
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import FaceDetection from "./components/FaceDetection";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes with Layout */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />

          {/* Forwarder Route */}
          <Route
            path="/face-detection"
            element={<Navigate to="/dashboard/face-detection" replace />}
          />

          {/* Protected Dashboard Layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  {" "}
                  {/* Wrap Dashboard with Layout */}
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          >
            {/* Nested Routes Inside Dashboard */}
            <Route index element={<h3>Welcome to Your Dashboard</h3>} />
            <Route path="face-detection" element={<FaceDetection />} />
          </Route>

          {/* Catch-all Route for 404 */}
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
