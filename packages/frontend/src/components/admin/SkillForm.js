import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import Sidebar from "../common/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { showErrorToast, showSuccessToast } from "./../../../src/utilities/toast";


const SkillForm = () => {
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: { skills: [{ category: "", name: "", version: "" }] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "skills" });

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

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

  const onSubmit = async (data) => {
    try {
      const token = sessionStorage.getItem("token");
      setLoading(true);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/skills`, 
        { skills: data.skills },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showSuccessToast(response.data.message);
      setSkills([...skills, ...response.data.skills]);
      reset();
      setShowSkillModal(false);
    } catch (error) {

      showErrorToast("Error adding skills!");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/categories`, 
        { name: newCategory },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCategories([...categories, response.data]);
      setNewCategory("");
      showSuccessToast("Category added successfully!");
      setShowCategoryModal(false);
    } catch (error) {
      showErrorToast("Error adding category!");
    }
  };

  return (
    <div className="d-flex" style={{ height: "85vh" }}>
      <Sidebar />
      <div className="container mt-4">
        <div style={{ width: "85%", marginLeft: "10px" }}>

          {/* Skills Table */}
          <div className="card shadow p-4 mb-3">
            <h3 className="text-primary mb-3">Skills & Categories</h3>
            <div style={{ maxHeight: "450px", overflowY: "auto" }}>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Category</th>
                    <th>Skill Name</th>
                    <th>Version</th>
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

          {/* Add Buttons */}
          <button className="btn btn-primary me-3" onClick={() => setShowSkillModal(true)}>+ Add Skill</button>
          <button className="btn btn-success" onClick={() => setShowCategoryModal(true)}>+ Add Category</button>
        </div>
      </div>

      {/* Add Skill Modal */}
      <div className={`modal fade ${showSkillModal ? "show d-block" : ""}`} style={{ background: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-lg"> {/* Enlarged modal width */}
          <div className="modal-content p-3"> {/* Added padding for better spacing */}
            <div className="modal-header">
              <h5 className="modal-title">Add Skill</h5>
              <button type="button" className="btn-close" onClick={() => setShowSkillModal(false)}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((item, index) => (
                  <div key={item.id} className="mb-3 d-flex">
                    <select className="form-select me-2" {...register(`skills.${index}.category`, { required: true })} style={{ width: "30%" }}>
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                    <input className="form-control me-2" type="text" placeholder="Skill Name" {...register(`skills.${index}.name`, { required: true })} style={{ width: "30%" }} />
                    <input className="form-control me-2" type="text" placeholder="Version" {...register(`skills.${index}.version`, { required: true })} style={{ width: "20%" }} />
                    {fields.length > 1 && <button type="button" className="btn btn-danger" onClick={() => remove(index)}>Remove</button>}
                  </div>
                ))}
                <button type="button" className="btn btn-primary me-2" onClick={() => append({ category: "", name: "", version: "" })}>+ Add More</button>
                <button type="submit" className="btn btn-success" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>


      {/* Add Category Modal */}
      <div className={`modal fade ${showCategoryModal ? "show d-block" : ""}`} style={{ background: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-lg"> {/* Enlarged modal width */}
          <div className="modal-content p-3">
            <div className="modal-header">
              <h5 className="modal-title">Add Category</h5>
              <button type="button" className="btn-close" onClick={() => setShowCategoryModal(false)}></button>
            </div>
            <div className="modal-body">
              <input type="text" className="form-control mb-3" placeholder="Enter category name" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
              <button className="btn btn-success" onClick={handleAddCategory}>Add Category</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SkillForm;
