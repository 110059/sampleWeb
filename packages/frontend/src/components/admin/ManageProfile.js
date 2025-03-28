import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import axios from "axios";
import "./../../style/ManageProfile.css";

const ManageProfile = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [roles] = useState(["admin", "user"]); // Superuser role not included

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleUserStatus = async (id, isSuperUser) => {
    if (isSuperUser) {
      alert("Superuser account cannot be disabled.");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      await axios.patch(`${process.env.REACT_APP_API_URL}/auth/users/${id}/disable`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.error("Error changing user status.");
    }
  };

  const updateUserRole = async (id, newRole, isSuperUser) => {
    if (isSuperUser) {
      alert("Superuser role cannot be changed.");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      await axios.put(`${process.env.REACT_APP_API_URL}/auth/users/${id}/role`, 
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortedUsers = [...users].sort((a, b) => {
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
      <div className="col-md-9 p-4">
        <h2>Manage Users</h2>
        <input
          type="text"
          placeholder="Search users..."
          className="form-control mb-3"
          value={searchTerm}
          onChange={handleSearch}
        />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className={user.isActive ? "user-row active" : "user-row disabled"}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "superuser" ? (
                    <span className="badge bg-primary">Superuser</span>
                  ) : (
                    <select 
                      value={user.role} 
                      onChange={(e) => updateUserRole(user._id, e.target.value, user.role === "superuser")}
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
                    onClick={() => toggleUserStatus(user._id, user.role === "superuser")}
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
  );
};

export default ManageProfile;
