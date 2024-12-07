import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/dashboard.css";
import { profileImage } from "./Svg";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../contexts/AuthContext";
import { getUser } from "../services/userUtils";
import {
  Accounts,
  Inventory,
  Report,
  Request,
  Transfer,
  Supports,
  UsersByDepartments,
  UsersLists,
  Home,
  BackupSettings,
  GetItemsUser,
} from "./SubComponent/User";

export function Dashboard({ menu }) {
  const [activeComponent, setActiveComponent] = useState(<Inventory />); // Default to Inventory component
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken); // Update the user state when the token changes
    }
  }, []); // Only run once on mount

  const handleMenuClick = (menuName, userType) => {
    console.log(menuName);
    console.log(userType);

    let component = null;
    switch (userType) {
      case "user":
        component = getComponentByMenuName(menuName, "user");
        break;
      case "staff":
        component = getComponentByMenuName(menuName, "staff");
        break;
      case "admin":
        component = getComponentByMenuName(menuName, "admin");
        break;
      case "technician":
        component = getComponentByMenuName(menuName, "technician");
        break;
      case "manager":
        component = getComponentByMenuName(menuName, "manager");
        break;
      case "faculity":
        component = getComponentByMenuName(menuName, "faculity");
        break;
      default:
        console.log("Incorrect user type");
    }

    setActiveComponent(component);
  };

  const getComponentByMenuName = (menuName, userType) => {
    switch (menuName) {
      case "dashboard":
        return <Home />;
      case "inventory":
        return <Inventory />;
      case "request":
        return <Request />;
      case "userInventory":
        return <GetItemsUser />;
      case "system":
        return <BackupSettings />;
      case "transfer":
        return <Transfer />;
      case "report":
        return <Report />;
      case "account":
        return <Accounts />;
      case "support":
        return <Supports />;
      case "users":
        return userType === "admin" || userType === "faculity" ? (
          <UsersLists />
        ) : (
          <UsersByDepartments />
        );
      default:
        return (
          <div>
            {menuName} is not a valid menu list. Check the menus again. 😁
          </div>
        );
    }
  };

  const { logout } = useContext(AuthContext);

  const handleLogoutClick = () => {
    logout();
    setUser(null); // Clear the user state on logout
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
                  value={item.id}
                  id={user.role}
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
            Logout
          </button>
        </div>
      </div>
      <div className="content">
        <div className="content--header">
          <div className="profile">
            <button className="profile-btn">{profileImage}</button>
            <div>
              <p>name: {user.username}</p>
              <p>role: {user.role}</p>
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
