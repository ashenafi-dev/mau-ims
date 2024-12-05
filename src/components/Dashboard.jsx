import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/dashboard.css";
import { profileImage } from "./Svg";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../contexts/AuthContext";
import {
  Accounts,
  Inventory,
  Report,
  Request,
  Transfer,
  Supports,
  UsersByDepartments,
} from "./SubComponent/User";

export function Dashboard({ menu }) {
  const [activeComponent, setActiveComponent] = useState(<Inventory />); // Default to Home component

  const handleMenuClick = (menuName, userType) => {
    console.log(menuName);
    console.log(userType);

    let component = null;
    switch (userType) {
      case "user":
        if (menuName === "inventory") {
          component = <Inventory />;
        } else if (menuName === "request") {
          component = <Request />;
        } else if (menuName === "transfer") {
          component = <Transfer />;
        } else if (menuName === "report") {
          component = <Report />;
        } else if (menuName === "account") {
          component = <Accounts />;
        } else if (menuName === "support") {
          component = <Supports />;
        } else {
          component = <Inventory />; // Default to Home component if no match
        }
        break;
      case "staff":
        if (menuName === "inventory") {
          component = <Inventory />;
        } else if (menuName === "request") {
          component = <Request />;
        } else if (menuName === "transfer") {
          component = <Transfer />;
        } else if (menuName === "report") {
          component = <Report />;
        } else if (menuName === "account") {
          component = <Accounts />;
        } else if (menuName === "support") {
          component = <Supports />;
        } else {
          component = <Inventory />; // Default to Home component if no match
        }
        break;
      case "admin":
        if (menuName === "inventory") {
          component = <Inventory />;
        } else if (menuName === "request") {
          component = <Request />;
        } else if (menuName === "transfer") {
          component = <Transfer />;
        } else if (menuName === "report") {
          component = <Report />;
        } else if (menuName === "account") {
          component = <Accounts />;
        } else if (menuName === "support") {
          component = <Supports />;
        } else {
          component = <Inventory />; // Default to Home component if no match
        }
        break;
      case "technician":
        if (menuName === "inventory") {
          component = <Inventory />;
        } else if (menuName === "request") {
          component = <Request />;
        } else if (menuName === "transfer") {
          component = <Transfer />;
        } else if (menuName === "report") {
          component = <Report />;
        } else if (menuName === "account") {
          component = <Accounts />;
        } else if (menuName === "support") {
          component = <Supports />;
        } else {
          component = <Inventory />; // Default to Home component if no match
        }
        break;
      case "manager":
        if (menuName === "inventory") {
          component = <Inventory />;
        } else if (menuName === "request") {
          component = <Request />;
        } else if (menuName === "transfer") {
          component = <Transfer />;
        } else if (menuName === "report") {
          component = <Report />;
        } else if (menuName === "account") {
          component = <Accounts />;
        } else if (menuName === "support") {
          component = <Supports />;
        } else {
          component = <Inventory />; // Default to Home component if no match
        }
        break;
      case "faculity":
        if (menuName === "inventory") {
          component = <Inventory />;
        } else if (menuName === "request") {
          component = <Request />;
        } else if (menuName === "users") {
          component = <UsersByDepartments />;
        } else if (menuName === "report") {
          component = <Report />;
        } else if (menuName === "account") {
          component = <Accounts />;
        } else if (menuName === "support") {
          component = <Supports />;
        } else {
          component = <Inventory />; // Default to Home component if no match
        }
        break;
      default:
        console.log("Incorrect user type");
    }

    setActiveComponent(component);
  };

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  const { logout } = useContext(AuthContext);

  const handleLogoutClick = () => {
    logout();
    window.location.href = "/login"; // Redirect to login after logging out
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <Link className="sidebar--top" to="/">
          <img src={logo} alt="Logo" />
          <p>mau inventory</p>
        </Link>
        <div className="sidebar--middle">
          <ul className="menu--list">
            {menu.map((item, index) => (
              <li key={index}>
                <button
                  onClick={(e) => handleMenuClick(e.target.value, e.target.id)}
                  value={item.name}
                  id={decodedToken.role}
                  className="menu--list--inner"
                >
                  {item.icon}
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="sidebar--bottom">
          <button className="logout" onClick={handleLogoutClick}>
            logout
          </button>
        </div>
      </div>
      <div className="content">
        <div className="content--header">
          <div className="profile">
            <button className="profile-btn">{profileImage}</button>
            <div>
              <p>name: {decodedToken.username}</p>
              <p>role: {decodedToken.role}</p>
            </div>
          </div>
        </div>
        <div className="content--body">{activeComponent}</div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.object.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
