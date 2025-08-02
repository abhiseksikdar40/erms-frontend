import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResourceContext } from "../context/ResourceContext";
import Logo from "../components/Logo";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { loginUser } = useResourceContext();

  const handleLoginRedirect = (e) => {
    e.preventDefault();
    setAnimateOut(true);
    setTimeout(() => {
      navigate("/signup");
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    const res = await loginUser(formData);
setLoading(false);

if (res.success && res.token) {
  localStorage.setItem("Login-Token", res.token);
  setSuccessMessage("Login successful! Redirecting...");
  setTimeout(() => {
    navigate("/auth/dashboard");
  }, 1500);
} else {
  setErrorMessage(res.error || "Login failed");
}
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 position-relative">
      <Logo/>
      <div
        className={`w-100 box-shadow pt-4 px-5 rounded text-white input-container ${
          animateOut ? "fade-slide-in" : ""
        }`}
        style={{ zIndex: "1", maxWidth: "550px", backgroundColor: "#1a172dff" }}
      >
        <p className="text-center fw-bold fs-4 mb-5">
          Hey, <span style={{ color: "#F14A00" }}>Trailblazer.</span> Ready to Conquer?
        </p>

        <div className="text-center mb-3">
          <h4
            className="fw-bold d-inline-block"
            style={{
              borderBottom: "3px solid #F14A00",
              paddingBottom: "4px",
            }}
          >
            Unlock Your Zone
          </h4>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="userEmail" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="userEmail"
              className="form-control"
              placeholder="name@example.com"
              value={formData.userEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="userPassword" className="form-label">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="userPassword"
              className="form-control"
              placeholder="••••••••"
              value={formData.userPassword}
              onChange={handleChange}
              required
            />
            <img
              src={showPassword ? "eye-slash.svg" : "eye.svg"}
              alt="togglePassword"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                width: "20px",
                position: "absolute",
                right: "2%",
                top: "72%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            />
          </div>

          {errorMessage && (
            <div className="text-danger text-center mb-3">{errorMessage}</div>
          )}

          {successMessage && (
            <div className="text-success text-center mb-3">{successMessage}</div>
          )}

          <button
            type="submit"
            className="btn btn-warning w-100 fw-semibold d-flex justify-content-center align-items-center gap-2"
            disabled={loading}
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-3 text-white-50" style={{ fontSize: "0.9rem" }}>
          <a href="#" className="text-warning text-decoration-none">
            Forgot Password?
          </a>
        </p>

        <p className="text-center mt-2 text-white-50" style={{ fontSize: "0.9rem" }}>
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-warning text-decoration-none"
            onClick={handleLoginRedirect}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
