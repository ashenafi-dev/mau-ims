import axios from "axios";
import { getToken, removeToken } from "./tokenService";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      removeToken();
      console.error("Token expired, please login again.");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
