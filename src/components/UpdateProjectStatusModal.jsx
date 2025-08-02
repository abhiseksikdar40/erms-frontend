import { useState } from "react";

export default function UpdateProjectStatusModal({ project, onSave, onClose }) {
  const [newStatus, setNewStatus] = useState(project?.projectStatus || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...project, projectStatus: newStatus });
    onClose(); // Close modal after saving
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h5 className="modal-title">Update Status: {project.projectName}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Project Status</label>
                <select
                  className="form-select bg-secondary text-white border-0"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  required
                >
                  <option value="Planning">Planning</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-light" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update Status
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
