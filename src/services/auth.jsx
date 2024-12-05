import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found, please login again.");
    return null;
  }

  try {
    const user = jwtDecode(token);
    return user;
  } catch (error) {
    console.error("Invalid token, please login again.", error);
    return null;
  }
};
