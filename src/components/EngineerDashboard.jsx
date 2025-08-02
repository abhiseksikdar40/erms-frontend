import { useFetch } from "../context/useFetch";

export default function EngineerDashboard() {
  const { data, loading, error } = useFetch("https://erms-backend.vercel.app/v1/auth/projects");

  const currentProjects = data?.projects?.filter(
    (project) => project.projectStatus === "Active"
  );

  const upcomingProjects = data?.projects?.filter(
    (project) => project.projectStatus === "Planning"
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Engineer Dashboard</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          Failed to load projects: {error.message}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Current Projects */}
          <div className="mb-4">
            <h4>My Current Projects</h4>
            <div
              className="border rounded p-3 bg-light"
              style={{ minHeight: "200px", maxHeight: "300px", overflowY: "auto" }}
            >
              {currentProjects.length === 0 ? (
                <p className="text-muted">You have no current (Active) projects.</p>
              ) : (
                <ul className="list-group">
                  {currentProjects.map((project) => (
                    <li
                      key={project._id}
                      className="list-group-item d-flex justify-content-between"
                    >
                      <div>
                        <strong>{project.projectName}</strong>
                        <br />
                        <small>{project.projectDescription}</small>
                      </div>
                      <span className="badge bg-success align-self-center">Active</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Upcoming Assignments */}
          <div className="mb-4">
            <h4>My Upcoming Assignments</h4>
            <div
              className="border rounded p-3 bg-light"
              style={{ minHeight: "200px", maxHeight: "300px", overflowY: "auto" }}
            >
              {upcomingProjects.length === 0 ? (
                <p className="text-muted">No upcoming (Planning) assignments.</p>
              ) : (
                <ul className="list-group">
                  {upcomingProjects.map((project) => (
                    <li
                      key={project._id}
                      className="list-group-item d-flex justify-content-between"
                    >
                      <div>
                        <strong>{project.projectName}</strong>
                        <br />
                        <small>{project.projectDescription}</small>
                      </div>
                      <span className="badge bg-warning text-dark align-self-center">
                        Planning
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
