import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import "../../styles/LoginPage.css";
import { AuthContext } from "../../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

function CredentialField() {
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext); // Added user to the context
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = async () => {
    try {
      await login(username, password);

      // Retrieve the token from local storage
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token); // Decode the token to get user details

      // Route based on the user's role
      switch (decodedToken.role) {
        case "user":
          navigate("/user");
          break;
        case "manager":
          navigate("/manager");
          break;
        case "admin":
          navigate("/admin");
          break;
        case "staff":
          navigate("/staff");
          break;
        case "faculity":
          navigate("/faculity");
          break;
        case "technician":
          navigate("/technician");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.table(user);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "user":
          navigate("/user");
          break;
        case "manager":
          navigate("/manager");
          break;
        case "admin":
          navigate("/admin");
          break;
        case "staff":
          navigate("/staff");
          break;
        case "faculity":
          navigate("/faculity");
          break;
        case "technician":
          navigate("/technician");
          break;
        default:
          navigate("/about");
          break;
      }
    }
  }, [user, navigate]);

  return (
    !user && (
      <div className="login">
        <div className="credential">
          <input
            type="text"
            value={username}
            onChange={handleUsernameInput}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordInput}
            placeholder="Password"
          />
          <button onClick={handleLoginClick}>Login</button>
        </div>
      </div>
    )
  );
}

export default CredentialField;
