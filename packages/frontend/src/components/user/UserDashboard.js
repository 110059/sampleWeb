import React from "react";
import Sidebar from "../common/Sidebar";
import { Outlet } from "react-router-dom";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";

const data = [
  { name: "Jan", value: 400, uv: 240, pv: 300 },
  { name: "Feb", value: 300, uv: 139, pv: 200 },
  { name: "Mar", value: 500, uv: 980, pv: 400 },
  { name: "Apr", value: 700, uv: 390, pv: 600 },
];

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const UserDashboard = () => {
  return (
    <div className="d-flex flex-column" style={{ height: "85vh" }}>
      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="col-md-9 d-flex flex-column">
          <div className="p-3">
            <h2 className="text-primary">Welcome to User Dashboard</h2>
            <p className="text-muted">
              Access your profile, AI features, and other functionalities here.
            </p>
          </div>

          {/* Chart Section */}
          <div className="p-3 overflow-auto">
            <div className="row">
              <div className="col-md-6 mb-4">
                <h5>Bar Chart</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="col-md-6 mb-4">
                <h5>Line Chart</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="col-md-6 mb-4">
                <h5>Pie Chart</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100}>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="col-md-6 mb-4">
                <h5>Area Chart</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="pv" stroke="#ffc658" fill="#ffc658" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="flex-grow-1 p-3 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;