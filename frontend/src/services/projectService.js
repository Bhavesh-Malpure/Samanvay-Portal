import api from "./api";

export async function createProject(projectData) {
  const response = await api.post("/api/projects", projectData);
  return response.data;
}

export async function getProjects() {
  const response = await api.get("/api/projects");
  return response.data;
}

export async function getProject(projectId) {
  const response = await api.get(`/api/projects/${projectId}`);
  return response.data;
}