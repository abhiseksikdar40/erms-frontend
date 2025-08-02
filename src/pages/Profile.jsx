import { useState } from "react";
import Logo from "../components/Logo";
import { useFetch } from "../context/useFetch";
import { useResourceContext } from "../context/ResourceContext";
import EditProfileModal from "../components/EditProfileModal";

export default function Profile() {
  const { data, loading, error, refetch } = useFetch("https://erms-backend.vercel.app/v1/auth/me");
  const { updateUserProfile } = useResourceContext();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);

  if (loading || !data) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center text-danger" style={{ height: "100vh" }}>
        <p className="fs-5">Error: {error}</p>
      </div>
    );
  }

  const {
    userName,
    userEmail,
    userRole,
    userSkills,
    userSeniority,
    userDepartment,
  } = data;

  const isManager = userRole === "Manager";

  const handleSave = async (updatedData) => {
    await updateUserProfile(updatedData);
    setShowModal(false);
    refetch();
  };

  return (
    <div className="container my-5 d-flex flex-column justify-content-center align-items-center" style={{ position: "relative", zIndex: 1 }}>
      <div className="mt-5 px-4 mb-4">
        <Logo />
        <div className="w-100 p-5 rounded-4" style={{ background: "transparent" }}>
          <div className="d-flex flex-wrap align-items-center mb-5">
            <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-4"
              style={{ width: "100px", height: "100px", fontSize: "2.5rem", fontWeight: "bold" }}>
              {userName?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="text-white">
              <h2 className="mb-1">{userName}</h2>
              <p className="text-light mb-0"><img src="/envelope.svg" alt="Email-Icon" style={{ filter: "invert(1)" }} /> {userEmail}</p>
            </div>
          </div>

          <div className="row text-white mb-4">
            <div className="col-md-4 col-sm-6 mb-4">
              <p className="text-light mb-1">Role</p>
              <p className="fw-semibold">{userRole}</p>
            </div>
            <div className="col-md-4 col-sm-6 mb-4">
              <p className="text-light mb-1">Department</p>
              <p className="fw-semibold">{userDepartment}</p>
            </div>
            {!isManager && (
              <div className="col-md-4 col-sm-6 mb-4">
                <p className="text-light mb-1">Seniority</p>
                <p className="fw-semibold">{userSeniority}</p>
              </div>
            )}
          </div>

          {!isManager && (
            <div className="text-white mb-3">
              <p className="text-light mb-2">Skills</p>
              <div className="d-flex flex-wrap gap-3">
                {userSkills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="badge rounded-pill px-4 py-2"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.3)",
                      fontWeight: 500,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <button
          className="btn btn-warning"
          onClick={() => {
            const editableFields = {
              userName,
              userDepartment,
              ...(isManager ? {} : {
                userSeniority,
                userSkills: [...userSkills],
              }),
            };
            setFormData(editableFields);
            setShowModal(true);
          }}
        >
          Update Profile
        </button>
      </div>

      {showModal && (
        <EditProfileModal
          data={formData}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          role={userRole}
        />
      )}
    </div>
  );
}
