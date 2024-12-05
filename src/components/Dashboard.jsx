import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/dashboard.css";
import { sun, moon, profileImage } from "./Svg";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../contexts/AuthContext";
import {
  Home,
  Account,
  Inventory,
  Report,
  Request,
  Support,
  Transfer,
} from "./SubComponent/User";

export function Dashboard({ menu }) {
  const [active, setActive] = useState(true);
  const [activeComponent, setActiveComponent] = useState(<Home />); // Default to Home component

  function handleThemeClick() {
    setActive((active) => !active);
  }

  const handleMenuClick = (menuName, userType) => {
    console.log(menuName);
    console.log(userType);

    let component = null;
    switch (userType) {
      case "user":
        if (menuName === "dashboard") {
          component = <Home />;
        } else if (menuName === "inventory") {
          component = <Inventory />;
        } else if (menuName === "request") {
          component = <Request />;
        } else if (menuName === "transfer") {
          component = <Transfer />;
        } else if (menuName === "report") {
          component = <Report />;
        } else if (menuName === "account") {
          component = <Account />;
        } else if (menuName === "support") {
          component = <Support />;
        } else {
          component = <Home />; // Default to Home component if no match
        }
        break;
      case "staff":
        // Similar cases for staff...
        break;
      case "admin":
        // Similar cases for admin...
        break;
      case "technician":
        // Similar cases for technician...
        break;
      case "manager":
        // Similar cases for manager...
        break;
      case "faculty":
        // Similar cases for faculty...
        break;
      default:
        console.log("Incorrect user type");
        component = <Home />; // Default to Home component if no match
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
          <button onClick={handleThemeClick} className="sun--moon">
            <div className={active ? "active--theme" : ""}>{sun}</div>
            <div className={active ? "" : "active--theme"}>{moon}</div>
          </button>
          <button className="logout" onClick={handleLogoutClick}>
            logout
          </button>
          {/* <button
            className={`arrow-btn ${mirror ? "mirrored" : ""}`}
            onClick={handleArrowClick}
          >
            {arrow}
          </button> */}
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
