import api from "./api";

export async function registerUser(userData) {
  const response = await api.post(
    "/api/auth/register",
    userData
  );

  return response.data;
}

export async function loginUser(credentials) {
  const response = await api.post(
    "/api/auth/login",
    credentials
  );

  const { access_token, user } = response.data;

  localStorage.setItem(
    "samanvay_token",
    access_token
  );

  return user;
}

export async function getCurrentUser() {
  const response = await api.get(
    "/api/auth/me"
  );

  return response.data;
}

export function logoutUser() {
  localStorage.removeItem(
    "samanvay_token"
  );
}