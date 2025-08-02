import { Navigate } from "react-router-dom";
import { useFetch } from "../context/useFetch";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("Login-Token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const { data, loading, error } = useFetch("https://erms-backend.vercel.app/v1/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data || typeof data !== "object" || !data._id) {
  console.error("Token validation failed:", error || data);
  localStorage.removeItem("Login-Token");
  return <Navigate to="/login" />;
}

  return children;
}
