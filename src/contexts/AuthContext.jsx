import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../services/api";
import { getToken, setToken, removeToken } from "../services/tokenService";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ token, role: decoded.role, username: decoded.username });
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const login = async (username, password) => {
    const response = await api.post("/auth/login", { username, password });
    const { token, refreshToken } = response.data;
    setToken(token);
    localStorage.setItem("refreshToken", refreshToken);
    const decoded = jwtDecode(token);
    setUser({ token, role: decoded.role, username: decoded.username });
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const logout = () => {
    removeToken();
    localStorage.removeItem("refreshToken");
    setUser(null);
    api.defaults.headers.common["Authorization"] = "";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
