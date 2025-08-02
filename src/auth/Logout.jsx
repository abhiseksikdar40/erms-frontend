import { useNavigate } from "react-router-dom";
import { useResourceContext } from "../context/ResourceContext";

export default function Logout() {
  const { logoutUser } = useResourceContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <button
      className="btn btn-outline-light"
      onClick={handleLogout}
      style={{ marginRight: "1rem" }}
    >
      Logout <span><img
  src="/logout.svg"
  alt="logout"
  className="logout-icon"
/>
</span>
    </button>
  );
}
