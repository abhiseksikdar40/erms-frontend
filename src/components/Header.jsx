import { useResourceContext } from "../context/ResourceContext";
import { Link } from "react-router-dom";
import Logout from "../auth/Logout";

export default function Header() {
  const { user } = useResourceContext();
  const role = user?.userRole;

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Center Nav Links */}
        <div className="navbar-nav mx-auto d-flex flex-row gap-4">
          <Link className="nav-link text-white" to="/auth/dashboard">
            Dashboard
          </Link>
          {role === "Manager" && (
            <>
              <Link className="nav-link text-white" to="/auth/project">
                Create Project
              </Link>
              <Link className="nav-link text-white" to="/auth/task">
                Create Task
              </Link>
            </>
          )}
          <Link className="nav-link text-white" to="/auth/profile">
            Profile
          </Link>
        </div>

        <Logout />
      </div>
    </nav>
  );
}
