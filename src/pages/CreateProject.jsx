import { useState } from "react";
import { useResourceContext } from "../context/ResourceContext";
import Logo from "../components/Logo";

export default function CreateProject() {
  const { createProject, user } = useResourceContext();

  const initialForm = {
    projectName: "",
    projectDescription: "",
    startDate: "",
    endDate: "",
    requiredSkills: [],
    teamSize: "",
    projectStatus: "Planning",
  };

  const [formData, setFormData] = useState(initialForm);
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [hideForm, setHideForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    const skill = newSkill.trim();
    if (skill && !formData.requiredSkills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, skill],
      }));
      setNewSkill("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const projectPayload = {
      ...formData,
      teamSize: parseInt(formData.teamSize),
      managerId: user?._id,
    };

    const result = await createProject(projectPayload);

    if (result?.success) {
      setSuccess("✅ Project created successfully!");
      setHideForm(true);
      setFormData(initialForm);

      // Show form again after 3 seconds
      setTimeout(() => {
        setSuccess("");
        setHideForm(false);
      }, 3000);
    } else {
      setError(result?.error || "Failed to create project");
    }

    setLoading(false);
  };

  return (
    <div className="position-relative">
      {/* Background Logo */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0 }}>
        <Logo />
      </div>

      {/* Foreground Content */}
      <div className="container mt-2 text-white position-relative" style={{ zIndex: 1 }}>
        <h2>Create New Project</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {!hideForm && (
          <form onSubmit={handleSubmit} className="p-4 rounded shadow">
            <div className="mb-3">
              <label className="form-label">Project Name</label>
              <input
                type="text"
                className="form-control"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className="mb-3 col">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 col">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Required Skills</label>
              <div className="d-flex gap-2 mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Enter skill"
                />
                <button type="button" className="btn btn-outline-light" onClick={handleAddSkill}>
                  Add
                </button>
              </div>
              <div className="d-flex flex-wrap gap-2">
                {formData.requiredSkills.map((skill, index) => (
                  <span key={index} className="badge bg-secondary">{skill}</span>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Team Size</label>
              <input
                type="number"
                className="form-control"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                min={1}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Project Status</label>
              <select
                className="form-select"
                name="projectStatus"
                value={formData.projectStatus}
                onChange={handleChange}
              >
                <option value="Planning">Planning</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? "Creating..." : "Create Project"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
