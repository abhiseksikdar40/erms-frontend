import { useState } from "react";
import { useFetch } from "../context/useFetch";
import { useResourceContext } from "../context/ResourceContext";
import Logo from "../components/Logo";

export default function CreateTask() {
  const { createTask } = useResourceContext();

  const { data: engineerData, loading: loadingEngineers } = useFetch("https://erms-backend.vercel.app/v1/auth/engineers");
  const { data: projectData, loading: loadingProjects } = useFetch("https://erms-backend.vercel.app/v1/auth/projects");

  const [formData, setFormData] = useState({
    engineerId: "",
    projectId: "",
    allocationPercentage: "",
    startDate: "",
    endDate: ""
  });

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [hideForm, setHideForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  const result = await createTask(formData);
  setIsSubmitting(false);

  if (result.success) {
    setSuccess("✅ Task created successfully!");
    setError(null);
    setFormData({
      engineerId: "",
      projectId: "",
      allocationPercentage: "",
      startDate: "",
      endDate: ""
    });
    setHideForm(true);

    setTimeout(() => {
      setSuccess(null);
      setHideForm(false);
    }, 3000);
  } else {
    setError(result.error || "❌ Failed to create task");
    setSuccess(null);
  }
};



  const engineers = engineerData?.users || [];
  const projects = projectData?.projects || [];
//   const loading = loadingEngineers || loadingProjects;

  return (
  <div className="position-relative">
    {/* Background Logo */}
    <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0 }}>
      <Logo />
    </div>

    {/* Foreground Content */}
    <div className="container mt-5 position-relative text-white" style={{ zIndex: 1 }}>
      <h2 className="text-center mb-4">Create Task</h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}
      {success && <div className="alert alert-success text-center">{success}</div>}

   
      {!hideForm && (
        <form onSubmit={handleSubmit} className="mx-auto">
          {/* Engineer Dropdown */}
          <div className="mb-3">
            <label className="form-label">Assign to Engineer</label>
            <select
              name="engineerId"
              className="form-select"
              value={formData.engineerId}
              onChange={handleChange}
              
              required
            >
              <option value="">-- Select Engineer --</option>
              {engineers.map((eng) => (
                <option key={eng._id} value={eng._id}>
                  {eng.userName}
                </option>
              ))}
            </select>
          </div>

          {/* Project Dropdown */}
          <div className="mb-3">
            <label className="form-label">Assign to Project</label>
            <select
              name="projectId"
              className="form-select"
              value={formData.projectId}
              onChange={handleChange}
              
              required
            >
              <option value="">-- Select Project --</option>
              {projects.map((proj) => (
                <option key={proj._id} value={proj._id}>
                  {proj.projectName}
                </option>
              ))}
            </select>
          </div>

          {/* Allocation */}
          <div className="mb-3">
            <label className="form-label">Allocation %</label>
            <input
              type="number"
              name="allocationPercentage"
              className="form-control"
              value={formData.allocationPercentage}
              onChange={handleChange}
              
              required
            />
          </div>

          <div className="row">
            {/* Start Date */}
            <div className="mb-3 col">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="form-control"
                value={formData.startDate}
                onChange={handleChange}
                
                required
              />
            </div>

            {/* End Date */}
            <div className="mb-3 col">
              <label className="form-label">End Date</label>
              <input
                type="date"
                name="endDate"
                className="form-control"
                value={formData.endDate}
                onChange={handleChange}
                
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100" disabled={ isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Task"}
            </button>
        </form>
      )}
    </div>
  </div>
);
}
