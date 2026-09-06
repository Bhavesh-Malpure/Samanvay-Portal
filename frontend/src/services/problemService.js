import api from "./api";

export async function createProblem(problemData) {
  const formData = new FormData();

  formData.append("title", problemData.title || "");
  formData.append("description", problemData.description || "");

  if (problemData.category) {
    formData.append("category", problemData.category);
  }

  if (problemData.location) {
    formData.append("location", problemData.location);
  }

  if (problemData.district) {
    formData.append("district", problemData.district);
  }

  // Add uploaded images
  if (problemData.images && problemData.images.length > 0) {
    problemData.images.forEach((image) => {
      formData.append("images", image);
    });
  }

  const response = await api.post("/api/problems", formData);

  return response.data;
}

export async function getMyProblems() {
  const response = await api.get("/api/problems");

  return response.data;
}

export async function getProblemById(problemId) {
  const response = await api.get(`/api/problems/${problemId}`);

  return response.data;
}