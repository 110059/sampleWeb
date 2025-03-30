import React, { useState } from "react";
import Sidebar from "../common/Sidebar";
import axios from "axios";

const UserProfile = () => {
  const [experienceData, setExperienceData] = useState([
    { skills: "", years: "", lastWorked: "", version: "" },
  ]);

  const [companyData, setCompanyData] = useState([
    { companyName: "", startDate: "", endDate: "", isPresent: false },
  ]);

  const getCurrentMonthYear = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  };

  const isFormValid = () => {
    return experienceData.some(exp => exp.skills && exp.years && exp.lastWorked && exp.version) &&
           companyData.some(comp => comp.companyName && comp.startDate && ((!comp.isPresent && comp.endDate) || comp.isPresent ) );
  };

  const getMaxFutureDate = () => {
    return "";
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...experienceData];
    updatedExperience[index][field] = value;
    setExperienceData(updatedExperience);
  };

  const addExperienceGroup = () => {
    setExperienceData([...experienceData, { skills: "", years: "", lastWorked: "" }]);
  };

  const removeExperienceGroup = (index) => {
    if (experienceData.length > 1) {
      setExperienceData(experienceData.filter((_, i) => i !== index));
    }
  };

  const handleCompanyChange = (index, field, value) => {
    const updatedCompanies = [...companyData];
    if (field === "isPresent") {
      updatedCompanies.forEach((company, i) => {
        if (i !== index) company.isPresent = false;
      });
      updatedCompanies[index].isPresent = !updatedCompanies[index].isPresent;
      updatedCompanies[index].endDate = updatedCompanies[index].isPresent ? "" : getMaxFutureDate();
    } else {
      updatedCompanies[index][field] = value;
    }
    setCompanyData(updatedCompanies);
  };

  const addCompany = () => {
    setCompanyData([...companyData, { companyName: "", startDate: "", endDate: "", isPresent: false }]);
  };

  const removeCompany = (index) => {
    if (companyData.length > 1) {
      setCompanyData(companyData.filter((_, i) => i !== index));
    }
  };
  
  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem("token"); 
      if (!token) throw new Error("User not authenticated");
      const phone = "";
      const address = "";
      await axios.put(
        `${process.env.REACT_APP_API_URL}/profile`, // Update API endpoint
        { experienceData, companyData, phone, address},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      alert("Profile saved successfully!");
    } catch (error) {
      alert("Error saving profile: " + (error.response?.data?.message || error.message));
    }
  };
  


  return (
    <div className="d-flex" style={{ height: "85vh" }}>
      <Sidebar />
      <div className="col-md-9 d-flex flex-column p-4 overflow-auto">
        <h2 className="mb-4">Manage Profile</h2>

        {/* Skills & Experience Section */}
        <div className="p-3 border rounded mb-4 bg-light">
          <h4>Skills & Experience</h4>
          {experienceData.map((exp, index) => (
            <div key={index} className="border rounded p-3 mb-3 bg-white">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <label className="form-label">Skill *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={exp.skills}
                    onChange={(e) => handleExperienceChange(index, "skills", e.target.value)}
                  />
                </div>
                <div className="col-md-1">
                  <label className="form-label">Version</label>
                  <input
                    type="number"
                    className="form-control"
                    value={exp.version}
                    onChange={(e) => handleExperienceChange(index, "version", e.target.value)}
                    min="0"
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Experience (Yrs)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={exp.years}
                    onChange={(e) => handleExperienceChange(index, "years", e.target.value)}
                    min="0"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Last Worked</label>
                  <input
                    type="month"
                    className="form-control"
                    value={exp.lastWorked}
                    onChange={(e) => handleExperienceChange(index, "lastWorked", e.target.value)}
                    max={getCurrentMonthYear()}
                  />
                </div>
                {experienceData.length > 1 && (
                  <div className="col-md-1">
                    <button className="btn btn-danger btn-sm mt-4" onClick={() => removeExperienceGroup(index)}>
                      -
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <button className="btn btn-sm btn-primary" onClick={addExperienceGroup}>
            Add More Experience
          </button>
        </div>

        {/* Company Details Section */}
        <div className="p-3 border rounded mb-4 bg-light">
          <h4>Company Details</h4>
          {companyData.map((company, index) => (
            <div key={index} className="border rounded p-3 mb-3 bg-white">
              <div className="row align-items-center">
                <div className="col-md-3">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={company.companyName}
                    onChange={(e) => handleCompanyChange(index, "companyName", e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Start Date</label>
                  <input
                    type="month"
                    className="form-control"
                    value={company.startDate}
                    max= {getCurrentMonthYear()}
                    onChange={(e) => handleCompanyChange(index, "startDate", e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">End Date</label>
                  <input
                    type="month"
                    className="form-control"
                    value={company.endDate}
                    onChange={(e) => handleCompanyChange(index, "endDate", e.target.value)}
                    max={company.isPresent ? getMaxFutureDate() : getCurrentMonthYear()}
                    disabled={company.isPresent}
                  />                 
                </div>
                <div className="col-md-2">                
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={company.isPresent}
                      onChange={() => handleCompanyChange(index, "isPresent")}
                    />
                    <label className="form-check-label">Present Company</label>
                  </div>
                </div>
                {companyData.length > 1 && (
                  <div className="col-md-1">
                    <button className="btn btn-danger btn-sm mt-4" onClick={() => removeCompany(index)}>
                      -
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <button className="btn btn-sm btn-primary" onClick={addCompany}>Add More Company</button>
        </div>

        <button className="btn btn-primary" onClick={handleSave } disabled={!isFormValid()}>Save Profile</button>
      </div>
    </div>
  );
};

export default UserProfile;
