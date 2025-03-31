import React from "react";
import Sidebar from "../common/Sidebar";
import { Outlet } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, ResponsiveContainer } from "recharts";

const sampleData = [
  { name: "Jan", users: 400, revenue: 2400 },
  { name: "Feb", users: 300, revenue: 2210 },
  { name: "Mar", users: 500, revenue: 2290 },
  { name: "Apr", users: 700, revenue: 2000 },
];

const pieData = [
  { name: "AI Features", value: 400 },
  { name: "User Management", value: 300 },
  { name: "Settings", value: 300 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const AdminDashboard = () => {
  return (
    <div className="d-flex flex-column" style={{ height: "85vh" }}>
      <div className="d-flex flex-grow-1 overflow-hidden">
        <Sidebar />
        <div className="col-md-9 d-flex flex-column">
          <div className="p-3">
            <h2 className="text-primary">Welcome to Admin Dashboard</h2>
            <p className="text-muted">Manage users, settings, and AI features from here.</p>
          </div>
          <div className="flex-grow-1 p-3 overflow-auto">
            <div className="row">
              {/* Bar Chart */}
              <div className="col-md-6">
                <h5>User Growth</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sampleData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Line Chart */}
              <div className="col-md-6">
                <h5>Revenue Trend</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={sampleData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* Pie Chart */}
              <div className="col-md-6">
                <h5>Feature Usage</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} label>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Area Chart */}
              <div className="col-md-6">
                <h5>Overall Activity</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={sampleData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#ffc658" fill="#ffc658" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;