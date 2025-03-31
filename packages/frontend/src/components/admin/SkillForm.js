import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import Sidebar from "../common/Sidebar";

const SkillForm = () => {
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      skills: [{ category: "", name: "", version: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "category", direction: "asc" });

  // Fetch categories and skills from backend
  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const categoryRes = await axios.get(`${process.env.REACT_APP_API_URL}/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const skillRes = await axios.get(`${process.env.REACT_APP_API_URL}/skills`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCategories(categoryRes.data);
        setSkills(skillRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  // Handle skill submission
  const onSubmit = async (data) => {
    try {
      const token = sessionStorage.getItem("token");
      setLoading(true);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/skills`, 
        { skills: data.skills },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data.message);
      setSkills([...skills, ...response.data.skills]); // Update skill list
      reset();
    } catch (error) {
      toast.error("Error adding skills!");
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a new category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/categories`, 
        { name: newCategory },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCategories([...categories, response.data]); // Update categories list
      setNewCategory("");
      toast.success("Category added successfully!");
    } catch (error) {
      toast.error("Error adding category!");
    }
  };

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedSkills = [...skills].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSkills(sortedSkills);
  };

  return (
    <div className="d-flex" style={{ height: "85vh" }}>
      <Sidebar />
  
      <div className="container mt-4">
        <div style={{ width: "85%", marginLeft: "10px" }}> {/* Adjust width as needed */}
  
          {/* Skills & Categories Table */}
          <div className="card shadow p-4 mb-3">
            <h3 className="text-primary mb-3">Skills & Categories</h3>
            
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th onClick={() => handleSort("category")} style={{ cursor: "pointer" }}>
                      Category {sortConfig.key === "category" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                      Skill Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th onClick={() => handleSort("version")} style={{ cursor: "pointer" }}>
                      Version {sortConfig.key === "version" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {skills.length > 0 ? (
                    skills.map((skill, index) => (
                      <tr key={index}>
                        <td>{skill.category}</td>
                        <td>{skill.name}</td>
                        <td>{skill.version}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">No skills added yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

  
          {/* Add New Category Box */}
          <div className="card shadow p-4 mb-3">
            <h4 className="text-primary mb-3">Add Category</h4>
            <div className="d-flex">
                <input
                type="text"
                className="form-control me-2"
                style={{ width: "400px" }}  // Reduced width here
                placeholder="Enter category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                />
                <button className="btn btn-success" onClick={handleAddCategory}>
                Add Category
                </button>
            </div>
            </div>

  
          {/* Add Skills Form */}
          <div className="card shadow p-4 mb-3">
            <h3 className="text-primary mb-4">Add Skills</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              {fields.map((item, index) => (
                <div key={item.id} className="mb-3 d-flex align-items-center">
                  {/* Category Dropdown */}
                  <select className="form-select me-2" {...register(`skills.${index}.category`, { required: true })}>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
  
                  {/* Skill Name */}
                  <input
                    className="form-control me-2"
                    type="text"
                    placeholder="Skill Name"
                    {...register(`skills.${index}.name`, { required: true })}
                  />
  
                  {/* Version */}
                  <input
                    className="form-control me-2"
                    type="text"
                    placeholder="Version"
                    {...register(`skills.${index}.version`, { required: true })}
                  />
  
                  {/* Remove Button */}
                  {fields.length > 1 && (
                    <button type="button" className="btn btn-danger" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </div>
              ))}
  
              <div className="text-start">
                <button type="button" className="btn btn-primary me-2" onClick={() => append({ category: "", name: "", version: "" })}>
                  + Add Skill
                </button>
  
                <button type="submit" className="btn btn-success" disabled={loading}>
                  {loading ? "Saving..." : "Save Skills"}
                </button>
              </div>
            </form>
          </div>
  
        </div>
      </div>
    
    
    </div>
  );
  
  
};

export default SkillForm;
