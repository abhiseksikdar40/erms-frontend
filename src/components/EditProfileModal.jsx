import { useState, useEffect } from "react";

export default function EditProfileModal({ data, onClose, onSave, role }) {
  if (!data) return null;

  const [formData, setFormData] = useState({
    userName: "",
    userDepartment: "",
    maxCapacity: 0,         
    userSeniority: "Junior",
    userSkills: [],
  });

  const [newSkill, setNewSkill] = useState("");
  const [updating, setUpdating] = useState(false);
  const isManager = role === "Manager";

  useEffect(() => {
    if (data) {
      setFormData({
        ...data,
        maxCapacity: data.maxCapacity ?? 0,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "maxCapacity") {
      const numValue = Math.min(100, Math.max(0, Number(value)));
      setFormData((prev) => ({ ...prev, [name]: numValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddSkill = () => {
    const trimmedSkill = newSkill.trim();
    if (trimmedSkill && !formData.userSkills.includes(trimmedSkill)) {
      setFormData((prev) => ({
        ...prev,
        userSkills: [...prev.userSkills, trimmedSkill],
      }));
      setNewSkill("");
    }
  };

  const handleSave = async () => {
    setUpdating(true);
    await onSave(formData);
    setUpdating(false);
    onClose();
  };

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h5 className="modal-title">Edit Profile</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                name="userName"
                className="form-control"
                value={formData.userName}
                onChange={handleChange}
                disabled={updating}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Department</label>
              <input
                name="userDepartment"
                className="form-control"
                value={formData.userDepartment}
                onChange={handleChange}
                disabled={updating}
              />
            </div>

            {/* Capacity input shown only for Engineers */}
            {!isManager && (
              <div className="mb-3">
                <label className="form-label">Capacity (%)</label>
                <input
                  type="number"
                  name="maxCapacity"
                  className="form-control"
                  value={formData.maxCapacity}
                  onChange={handleChange}
                  min={0}
                  max={100}
                  disabled={updating}
                />
              </div>
            )}

            {!isManager && (
              <>
                <div className="mb-3">
                  <label className="form-label">Seniority</label>
                  <select
                    name="userSeniority"
                    className="form-select"
                    value={formData.userSeniority}
                    onChange={handleChange}
                    disabled={updating}
                  >
                    <option>Junior</option>
                    <option>Mid</option>
                    <option>Senior</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Add Skill</label>
                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      disabled={updating}
                    />
                    <button className="btn btn-outline-light" type="button" onClick={handleAddSkill} disabled={updating}>
                      Add
                    </button>
                  </div>
                </div>

                {formData.userSkills.length > 0 && (
                  <div className="mb-3">
                    <label className="form-label">Skills</label>
                    <div className="d-flex flex-wrap gap-2">
                      {formData.userSkills.map((skill, index) => (
                        <span key={index} className="badge bg-secondary">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={updating}>
              Close
            </button>
            <button type="button" className="btn btn-success" onClick={handleSave} disabled={updating}>
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
