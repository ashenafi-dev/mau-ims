import axios from "axios";
import {
  getToken,
  setToken,
  removeToken,
  getRefreshToken,
} from "./tokenService";

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

      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const response = await axios.post(
            "http://localhost:5000/auth/refresh-token",
            { refreshToken }
          );
          const { token } = response.data;
          setToken(token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.log(refreshError);
          removeToken();
          console.error("Refresh token expired, please login again.");
          window.location.href = "/login"; // Redirect to login page
        }
      } else {
        removeToken();
        console.error("No refresh token available, please login again.");
        window.location.href = "/login"; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default api;
