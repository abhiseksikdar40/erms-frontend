import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResourceContext } from "../context/ResourceContext";
import Logo from "../components/Logo";

export default function Signup() {
  const { createUser } = useResourceContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userRole: "",
    userSkills: [],
    userSeniority: "Junior",
    userDepartment: "",
  });

  const [newSkill, setNewSkill] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "userRole") {
      setFormData((prev) => ({
        ...prev,
        userRole: value,
        // Optionally reset skills and seniority if role is Manager
        userSkills: value === "Engineer" ? prev.userSkills : [],
        userSeniority: value === "Engineer" ? prev.userSeniority : "Junior",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddSkill = () => {
    const skill = newSkill.trim();
    if (skill && !formData.userSkills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        userSkills: [...prev.userSkills, skill],
      }));
      setNewSkill("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const payload = {
        userName: formData.userName,
        userEmail: formData.userEmail,
        userPassword: formData.userPassword,
        userRole: formData.userRole,
        userDepartment: formData.userDepartment,
        userSkills: formData.userRole === "Engineer" ? formData.userSkills : undefined,
        userSeniority: formData.userRole === "Engineer" ? formData.userSeniority : undefined,
      };

      await createUser(payload);

      setSuccessMessage("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginRedirect = (e) => {
    e.preventDefault();
    setAnimateOut(true);
    setTimeout(() => navigate("/login"), 500);
  };

  const isEngineer = formData.userRole === "Engineer";

  return (
    <div className="position-relative d-flex align-items-center justify-content-center vh-100">
      <Logo />

      <div
        className={`w-100 box-shadow pt-4 px-5 rounded text-white input-container ${
          animateOut ? "fade-slide-out" : ""
        }`}
        style={{ maxWidth: "550px", backgroundColor: "#1f1b32", zIndex: 1 }}
      >
        <p className="text-center fw-bold fs-4 mb-4">
          Code. <span style={{ color: "#F14A00" }}>Collaborate.</span> Contribute.
        </p>

        <div className="text-center mb-3">
          <h4
            className="fw-bold d-inline-block"
            style={{ borderBottom: "3px solid #F14A00", paddingBottom: "4px" }}
          >
            Join the Build Crew
          </h4>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              name="userName"
              type="text"
              className="form-control"
              value={formData.userName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              name="userEmail"
              type="email"
              className="form-control"
              value={formData.userEmail}
              onChange={handleChange}
              placeholder="name@example.com"
              required
            />
          </div>

          {/* Department and Role - hidden if Engineer, values preserved */}
          {!isEngineer ? (
            <>
              <div className="mb-3">
                <label className="form-label">Department</label>
                <input
                  name="userDepartment"
                  type="text"
                  className="form-control"
                  value={formData.userDepartment}
                  onChange={handleChange}
                  placeholder="Engineering"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  name="userRole"
                  className="form-select"
                  value={formData.userRole}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Manager">Manager</option>
                  <option value="Engineer">Engineer</option>
                </select>
              </div>
            </>
          ) : (
            <>
              {/* Hidden fields to preserve values when not shown */}
              <input type="hidden" name="userDepartment" value={formData.userDepartment} />
              <input type="hidden" name="userRole" value={formData.userRole} />
            </>
          )}

          {/* Skills and Seniority for Engineer */}
          {isEngineer && (
            <>
              <div className="mb-3">
                <label className="form-label">Skills</label>
                <div className="d-flex gap-2 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Enter a skill"
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-warning fw-bold"
                    onClick={handleAddSkill}
                  >
                    Add
                  </button>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {formData.userSkills.map((skill, index) => (
                    <span key={index} className="badge bg-warning text-dark">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Seniority Level</label>
                <select
                  name="userSeniority"
                  className="form-select"
                  value={formData.userSeniority}
                  onChange={handleChange}
                >
                  <option value="Junior">Junior</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
            </>
          )}

          {/* Password */}
          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <input
              name="userPassword"
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={formData.userPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            <img
              src={showPassword ? "eye-slash.svg" : "eye.svg"}
              alt="togglePassword"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                width: "20px",
                position: "absolute",
                right: "10px",
                top: "72%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-warning w-100 fw-semibold d-flex justify-content-center align-items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Success Message */}
          {successMessage && (
            <div className="alert alert-success mt-3 text-center p-2" role="alert">
              {successMessage}
            </div>
          )}
        </form>

        <p className="text-center mt-3 text-white-50" style={{ fontSize: "0.9rem" }}>
          By clicking Sign Up, you agree to our
          <a href="#" className="text-warning text-decoration-none"> Terms</a> and
          <a href="#" className="text-warning text-decoration-none"> Privacy Policy</a>.
        </p>

        <p className="text-center mt-2 text-white-50" style={{ fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <a
            href="/login"
            className="text-warning text-decoration-none"
            onClick={handleLoginRedirect}
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
