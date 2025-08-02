import { useContext, createContext, useState } from "react";

const ResourceContext = createContext();

export const useResourceContext = () => useContext(ResourceContext);

export default function ResourceProvider({ children }) {
  // ✅ Load user from localStorage on first render
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("User-Info");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ✅ Signup
  const createUser = async (newUser) => {
    try {
      const response = await fetch("https://erms-backend.vercel.app/v1/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Signup failed:", error);
      return { error: "Failed to create new user" };
    }
  };

  // ✅ Login
  const loginUser = async ({ userEmail, userPassword }) => {
    try {
      const response = await fetch("https://erms-backend.vercel.app/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, userPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.message || "Login failed" };
      }

      if (data.token) {
        const userDetails = await fetch("https://erms-backend.vercel.app/v1/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        const userInfo = await userDetails.json();
        setUser(userInfo);

        localStorage.setItem("Login-Token", data.token);
        localStorage.setItem("User-Info", JSON.stringify(userInfo)); // ✅ Save user info

        return { success: true, token: data.token };
      } else {
        return { error: "Token missing in response" };
      }
    } catch (error) {
      console.error("Login failed:", error);
      return { error: "Something went wrong during login" };
    }
  };

  // ✅ Update Profile
  const updateUserProfile = async (updatedData) => {
    const token = localStorage.getItem("Login-Token");

    try {
      const response = await fetch("https://erms-backend.vercel.app/v1/auth/update/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (!response.ok) {
        return { error: result.message || "Update failed" };
      }

      setUser(result.user);
      localStorage.setItem("User-Info", JSON.stringify(result.user)); // ✅ Update stored user
      return { success: true, user: result.user };
    } catch (error) {
      console.error("Update profile failed:", error);
      return { error: "Something went wrong while updating profile" };
    }
  };

  // ✅ Create Project
  const createProject = async (projectData) => {
    const token = localStorage.getItem("Login-Token");

    try {
      const response = await fetch("https://erms-backend.vercel.app/v1/auth/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      const result = await response.json();

      if (!response.ok) {
        return { error: result.message || "Project creation failed" };
      }

      return { success: true, project: result.project };
    } catch (error) {
      console.error("Create project failed:", error);
      return { error: "Something went wrong while creating project" };
    }
  };
  

  // ✅ Update Project
const updateProject = async (projectId, updateData) => {
  const token = localStorage.getItem("Login-Token");

  try {
    const response = await fetch(`https://erms-backend.vercel.app/v1/auth/update/projects/${projectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.message || "Project update failed" };
    }

    return { success: true, project: result.project };
  } catch (error) {
    console.error("Update project failed:", error);
    return { error: "Something went wrong while updating project" };
  }
};


  // Create Task
  const createTask = async (taskData) => {
  const token = localStorage.getItem("Login-Token");

  try {
    const response = await fetch("https://erms-backend.vercel.app/v1/auth/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.message || "Task creation failed" };
    }

    return { success: true, task: result.task };
  } catch (error) {
    console.error("Create task failed:", error);
    return { error: "Something went wrong while creating task" };
  }
};

  // ✅ Logout
  const logoutUser = () => {
    localStorage.removeItem("Login-Token");
    localStorage.removeItem("User-Info"); // ✅ Clear user info on logout
    setUser(null);
  };

  return (
    <ResourceContext.Provider
      value={{
        createUser,
        loginUser,
        logoutUser,
        updateUserProfile,
        createProject,
        createTask,
        updateProject,
        user,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
}
