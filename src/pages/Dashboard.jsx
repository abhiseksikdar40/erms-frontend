import ManagerDashboard from "../components/ManagerDashboard";
import EngineerDashboard from "../components/EngineerDashboard";
import { useFetch } from "../context/useFetch";
import Logo from "../components/Logo";

export default function Dashboard() {
  const { data: user, loading, error } = useFetch("https://erms-backend.vercel.app/v1/auth/me");

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">Failed to load user info</div>;
  }

  return (
    <div className="position-relative">
      {/* Background Logo Layer */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0}}>
        <Logo />
      </div>

      {/* Foreground Content */}
      <div className="container mt-2 text-white position-relative" style={{ zIndex: 1 }}>
        {user?.userRole === "Manager" && <ManagerDashboard />}
        {user?.userRole === "Engineer" && <EngineerDashboard />}
      </div>
    </div>
  );
}
