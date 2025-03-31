import React, { useState, useEffect } from "react";
import Sidebar from "../common/Sidebar";
import axios from "axios";
import { showSuccessToast, showErrorToast } from "./../../../src/utilities/toast";


const UserProfile = () => {
  const [experienceData, setExperienceData] = useState([
    { skills: "", years: "", months: "", lastWorked: "", version: "" },
  ]);
  
  const [companyData, setCompanyData] = useState([
    { companyName: "", startDate: "", endDate: "", isCurrent: false },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) throw new Error("User not authenticated");

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('profile', response);

        if (response?.status === 200 &&  response?.data )  {
          const { experience, companyDetails } = response.data;
    
          setExperienceData(
            Array.isArray(experience) && experience.length > 0
              ? experience.map(exp => ({
                  skills: exp.skills || "",
                  years: exp.years || "",
                  months: exp.months || "",
                  lastWorked: formatDateForInput(exp.lastWorked),  // Fix format here
                  version: exp.version || "",
                }))
              : [{ skills: "", years: "", months: "", lastWorked: "", version: "" }]
          );
    
          setCompanyData(
            Array.isArray(companyDetails) && companyDetails.length > 0
              ? companyDetails.map(comp => ({
                  companyName: comp.companyName || "",
                  startDate: formatDateForInput(comp.startDate),  // Fix format
                  endDate: formatDateForInput(comp.endDate),  // Fix format
                  isCurrent: comp.isCurrent || false,
                }))
              : [{ companyName: "", startDate: "", endDate: "", isCurrent: false }]
          );
        }


        
      } catch (err) {
        const error  = err.response?.data?.message || err.message;
        setError(error);
        showErrorToast(error)
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const isFormValid = () => {
    return experienceData.every(exp => exp.skills && exp.years && exp.months && exp.lastWorked && exp.version) &&
           companyData.every(comp => comp.companyName && comp.startDate && ((!comp.isCurrent && comp.endDate) || comp.isCurrent));
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0].slice(0, 7); // Extract YYYY-MM
  };

  const getMaxFutureDate = () => {
    return "";
  };
  
  const getCurrentMonthYear = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  };


  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      await axios.put(
        `${process.env.REACT_APP_API_URL}/profile`,
        { experienceData, companyData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showSuccessToast("Profile saved successfully!")
    } catch (error) {
      showErrorToast("Error saving profile: " + (error.response?.data?.message || error.message));
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="d-flex" style={{ height: "85vh" }}>
      <Sidebar />
      <div className="col-md-9 d-flex flex-column p-4 overflow-auto">
        <h2 className="mb-4">Manage Profile</h2>

        {/* Experience Section */}
        <div className="p-3 border rounded mb-4 bg-light">
          <h4>Skills & Experience</h4>
          {experienceData.map((exp, index) => (
            <div key={index} className="border rounded p-3 mb-3 bg-white">
              <div className="row align-items-center">
                <div className="col-md-3">
                  <label className="form-label">Skill Name *</label>
                  <input type="text" className="form-control" value={exp.skills} 
                    onChange={(e) => {
                      const updated = [...experienceData];
                      updated[index].skills = e.target.value;
                      setExperienceData(updated);
                    }}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Version *</label>
                  <input type="number" className="form-control" value={exp.version} min="0"
                    onChange={(e) => {
                      const updated = [...experienceData];
                      updated[index].version = e.target.value;
                      setExperienceData(updated);
                    }}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Exp. (Yrs) *</label>
                  <input type="number" className="form-control" value={exp.years} min="0"
                    onChange={(e) => {
                      const updated = [...experienceData];
                      updated[index].years = e.target.value;
                      setExperienceData(updated);
                    }}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Exp. (Month) *</label>
                  <input type="number" className="form-control" value={exp.months} min="0"
                    onChange={(e) => {
                      const updated = [...experienceData];
                      updated[index].months = e.target.value;
                      setExperienceData(updated);
                    }}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Last Worked *</label>
                  <input type="month" className="form-control" value={exp.lastWorked}
                    onChange={(e) => {
                      const updated = [...experienceData];
                      updated[index].lastWorked = e.target.value;
                      setExperienceData(updated);
                    }}
                    max={ getCurrentMonthYear()}

                  />
                </div>
                {experienceData.length > 1 && (
                  <div className="col-md-1">
                    <button className="btn btn-danger btn-sm mt-4" onClick={() => setExperienceData(experienceData.filter((_, i) => i !== index))}>
                      -
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <button className="btn btn-sm btn-primary" onClick={() => setExperienceData([...experienceData, { skills: "", years: "", months: "", lastWorked: "", version: "" }])}>
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
                  <label className="form-label">Company Name *</label>
                  <input type="text" className="form-control" value={company.companyName}
                    onChange={(e) => {
                      const updated = [...companyData];
                      updated[index].companyName = e.target.value;
                      setCompanyData(updated);
                    }}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Start Date *</label>
                  <input type="month" className="form-control" value={company.startDate} 
                    onChange={(e) => {
                      const updated = [...companyData];
                      updated[index].startDate = e.target.value;
                      setCompanyData(updated);
                    }}
                    max={company.isCurrent ? getMaxFutureDate() : getCurrentMonthYear()}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">End Date *</label>
                  <input type="month" className="form-control" value={company.endDate}
                    onChange={(e) => {
                      const updated = [...companyData];
                      updated[index].endDate = e.target.value;
                      setCompanyData(updated);
                    }}
                    disabled={company.isCurrent}
                    max={company.isCurrent ? getMaxFutureDate() : getCurrentMonthYear()}
                  />
                </div>
                <div className="col-md-2 d-flex flex-column">
                  <label className="form-label">Present Company</label>
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input mt-1"
                      type="checkbox"
                      checked={company.isCurrent}
                      onChange={() => {
                        const updated = companyData.map((comp, i) => {
                          if (i === index) {
                            return { ...comp, isCurrent: !comp.isCurrent, endDate: !comp.isCurrent ? "" : comp.endDate };
                          } else {
                            return { ...comp, isCurrent: false, endDate: comp.endDate || "" }; // Enable endDate
                          }
                        });
                        setCompanyData(updated);
                      }}
                    />
                  </div>
                </div>

                {companyData.length > 1 && (
                  <div className="col-md-1">
                    <button className="btn btn-danger btn-sm mt-4" onClick={() => setCompanyData(companyData.filter((_, i) => i !== index))}>
                      -
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <button className="btn btn-sm btn-primary" onClick={() => setCompanyData([...companyData, { companyName: "", startDate: "", endDate: "", isCurrent: false }])}>
            Add More Company
          </button>
        </div>

        <button className="btn btn-primary" onClick={handleSave} disabled={!isFormValid()}>Save Profile</button>
      </div>
    </div>
  );
};

export default UserProfile;
