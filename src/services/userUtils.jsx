import { jwtDecode } from "jwt-decode";
import { getToken } from "./tokenService"; // Adjust the import path as needed

let cachedToken = null;
let cachedUser = null;

const getUserID = () => {
  if (!cachedToken || !cachedUser) {
    const token = getToken();
    if (!token) {
      throw new Error("No token found");
    }
    cachedToken = token;
    cachedUser = jwtDecode(token);
  }
  return cachedUser.userId;
};

const getUser = () => {
  if (!cachedToken || !cachedUser) {
    const token = getToken();
    if (!token) {
      throw new Error("No token found");
    }
    cachedToken = token;
    cachedUser = jwtDecode(token);
  }
  return cachedUser;
};

export { getUserID, getUser };
