import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import axios from "axios";
import "./../../style/ManageProfile.css";
import { showErrorToast } from "./../../../src/utilities/toast";


const ManageProfile = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [roles] = useState(["admin", "user"]); // Superadmin role not included

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      showErrorToast("Error fetching users");
    }
  };

  const toggleUserStatus = async (id, isSuperAdmin) => {
    if (isSuperAdmin) {
      showErrorToast("Superadmin account cannot be disabled.");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      await axios.patch(`${process.env.REACT_APP_API_URL}/users/${id}/disable`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.error("Error changing user status.");
      showErrorToast("Error changing user status.");

    }
  };

  const updateUserRole = async (id, newRole, isSuperAdmin) => {
    if (isSuperAdmin) {
      showErrorToast("Superadmin role cannot be changed.");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      await axios.put(`${process.env.REACT_APP_API_URL}/users/${id}/role`, 
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
      showErrorToast("Error updating user role");
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    // Always keep Superadmin at the top
    if (a.role === "superadmin") return -1;
    if (b.role === "superadmin") return 1;

    // Sorting logic for other users
    if (sortConfig.key) {
      const order = sortConfig.direction === "asc" ? 1 : -1;
      return a[sortConfig.key] > b[sortConfig.key] ? order : -order;
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex" style={{ height: "85vh" }}>
      <Sidebar />
      <div className="col-md-9 p-4 d-flex flex-column">
        <h2>Manage Users</h2>
        <input
          type="text"
          placeholder="Search users..."
          className="form-control mb-3"
          value={searchTerm}
          onChange={handleSearch}
        />
  
        {/* Table Container with Scroll */}
        <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
          <table className="table table-bordered">
            <thead className="table-dark" style={{ position: "sticky", top: 0, zIndex: 2 }}>
              <tr>
                <th onClick={() => handleSort("name")}>
                  Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("email")}>
                  Email {sortConfig.key === "email" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("role")}>
                  Role {sortConfig.key === "role" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr 
                  key={user._id} 
                  className={`user-row ${user.isActive ? "active" : "disabled"} ${user.role === "superadmin" ? "superadmin-row" : ""}`}
                >
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "superadmin" ? (
                      <span className="badge bg-primary">Superadmin</span>
                    ) : (
                      <select 
                        value={user.role} 
                        onChange={(e) => updateUserRole(user._id, e.target.value, user.role === "superadmin")}
                        className="form-control"
                      >
                        {roles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td>{user.isActive ? "Active" : "Disabled"}</td>
                  <td>
                    <button
                      className={`btn btn-${user.isActive ? "danger" : "success"} btn-sm`}
                      onClick={() => toggleUserStatus(user._id, user.role === "superadmin")}
                    >
                      {user.isActive ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
};

export default ManageProfile;
