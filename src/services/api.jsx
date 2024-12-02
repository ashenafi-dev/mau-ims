import axios from "axios";
import { getToken, setToken, removeToken } from "./tokenService";

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
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          "http://localhost:5000/auth/refresh-token",
          {
            refreshToken,
          }
        );
        setToken(response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        return api(originalRequest);
      } catch (e) {
        removeToken();
        console.error("Failed to refresh token:", e);
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
