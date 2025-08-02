import { useState } from "react";
import { useFetch } from "../context/useFetch";
import UpdateProjectStatusModal from "../components/UpdateProjectStatusModal";
import { useResourceContext } from "../context/ResourceContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ManagerDashboard() {
    const { updateProject } = useResourceContext();
  const {
    data: engineersData,
    loading: loadingEngineers,
    error: errorEngineers,
  } = useFetch("https://erms-backend.vercel.app/v1/auth/engineers");

  const {
  data: projectsData,
  loading: loadingProjects,
  error: errorProjects,
  refetch: refetchProjects,
} = useFetch("https://erms-backend.vercel.app/v1/auth/projects");

const [showModal, setShowModal] = useState(false);
const [selectedProject, setSelectedProject] = useState(null);

  const {
    data: tasksData,
    loading: loadingTasks,
    error: errorTasks,
  } = useFetch("https://erms-backend.vercel.app/v1/auth/tasks");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const engineers = engineersData?.users || [];
  const projects = projectsData?.projects || [];
  const tasks = tasksData || [];

  const filteredEngineers = engineers
    .filter((eng) => {
      const nameMatch = eng.userName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const skillMatch = eng.userSkills?.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return nameMatch || skillMatch;
    })
    .map((eng) => {
      const allocated = tasks
        .filter((task) => {
          const taskEngineerId = task.engineerId?._id || task.engineerId;
          return String(taskEngineerId) === String(eng._id);
        })
        .reduce((sum, task) => sum + (task.allocationPercentage ?? 0), 0);

      const capacity = eng.maxCapacity ?? 100;
      const utilizationPercentage = capacity > 0 ? (allocated / capacity) * 100 : 0;

      return {
        ...eng,
        allocationPercentage: allocated,
        utilizationPercentage: utilizationPercentage.toFixed(1),
      };
    });

  const filteredProjects =
    statusFilter === "All"
      ? projects
      : projects.filter((proj) => proj.projectStatus === statusFilter);

  const projectStatusCounts = {
    Planning: 0,
    Active: 0,
    Completed: 0,
  };

  projects.forEach((proj) => {
    if (projectStatusCounts[proj.projectStatus] !== undefined) {
      projectStatusCounts[proj.projectStatus]++;
    }
  });

  const chartData = [
    { name: "Planning", count: projectStatusCounts.Planning },
    { name: "Active", count: projectStatusCounts.Active },
    { name: "Completed", count: projectStatusCounts.Completed },
  ];


  const handleStatusSave = async (updatedProject) => {
  const response = await updateProject(updatedProject._id, {
    projectStatus: updatedProject.projectStatus,
  });

  if (response.success) {
    await refetchProjects();
  } else {
    console.error("Project update failed:", response.error);
  }

  setShowModal(false);
  setSelectedProject(null);
};
  return (
    <div className="container mt-4 text-white">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search engineers by name or skills..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row">
        {/* Engineers and Capacity */}
        <div
          className="col-md-6 mb-4 bg-dark p-3 rounded shadow d-flex flex-column"
          style={{ maxHeight: "200px" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0 text-white">Engineers and Capacity</h4>
          </div>

          <div
            style={{
              overflowY: "auto",
              borderTop: "1px solid #444",
              paddingTop: "0.5rem",
              flex: "1 1 auto",
            }}
          >
            {loadingEngineers || loadingTasks ? (
              <p>Loading engineers...</p>
            ) : errorEngineers || errorTasks ? (
              <p className="text-danger">{errorEngineers || errorTasks}</p>
            ) : filteredEngineers.length === 0 ? (
              <p>No engineers found.</p>
            ) : (
              <div className="list-group list-group-flush">
                {filteredEngineers.map((eng) => {
                  const allocated = eng.allocationPercentage;
                  const capacity = eng.maxCapacity;
                  const progressWidth = Math.min(
                    (allocated / capacity) * 100,
                    100
                  );
                  const percentageText = `${allocated.toFixed(1)}% / ${capacity}% (${eng.utilizationPercentage}% used)`;

                  return (
                    <div
                      key={eng._id}
                      className="list-group-item bg-dark text-white mb-2 rounded shadow-sm"
                    >
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <strong>{eng.userName}</strong>
                        <small>{percentageText}</small>
                      </div>

                      <div
                        className="progress"
                        role="progressbar"
                        aria-valuenow={allocated}
                        aria-valuemin="0"
                        aria-valuemax={capacity}
                        style={{ height: "22px" }}
                      >
                        <div
                          className="progress-bar bg-success"
                          style={{ width: `${progressWidth}%` }}
                        >
                          {eng.utilizationPercentage}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Project Status Chart */}
        <div className="col-md-6 mb-2">
          <h4>Project Status Report</h4>
          {loadingProjects ? (
            <p>Loading projects...</p>
          ) : errorProjects ? (
            <p className="text-danger">{errorProjects}</p>
          ) : (
            <div className="bg-dark p-3 rounded shadow" style={{ height: "230px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0d6efd" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Projects List */}
      <div
        className="bg-dark p-3 rounded shadow mt-1"
        style={{ maxHeight: "250px", display: "flex", flexDirection: "column" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">Projects</h5>
          <select
            className="form-select w-auto bg-secondary text-white border-0"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Planning">Planning</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div
          style={{
            overflowY: "auto",
            flex: "1 1 auto",
            borderTop: "1px solid #444",
            paddingTop: "0.5rem",
          }}
        >
          <ul className="list-group list-group-flush">
            {filteredProjects.map((proj) => (
              <li
            key={proj._id}
            className="list-group-item bg-dark text-white border-secondary"
            style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                cursor: "pointer",
            }}
            title={proj.projectName}
            onClick={() => {
                setSelectedProject(proj);
                setShowModal(true);
            }}
            >
            {proj.projectName}
            </li>
            ))}
          </ul>
        </div>
      </div>

      {showModal && selectedProject && (
        <UpdateProjectStatusModal
            project={selectedProject}
            onSave={handleStatusSave}
            onClose={() => {
            setShowModal(false);
            setSelectedProject(null);
            }}
        />
        )}
    </div>
  );
}
