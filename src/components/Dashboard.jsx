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
  Report,
  Request,
  Supports,
  UsersByDepartments,
  Home,
  BackupSettings,
  GetItemsUser,
  GetItemsFaculty,
  RequestManager,
  RequestStaff,
  ReceivedItems,
  GetItemsStuff,
  UsersListAdmin,
  TransferUser,
  TransferStaff,
} from "./SubComponent/User";

const getComponentByMenuName = (menuName, userType, searchQuery) => {
  switch (menuName) {
    case "dashboard":
      return <Home />;
    case "usersA":
      return <UsersListAdmin searchQuery={searchQuery} />;
    case "facultyInventory":
      return <GetItemsFaculty searchQuery={searchQuery} />;
    case "request":
      return <Request />;
    case "requestManager":
      return <RequestManager searchQuery={searchQuery} />;
    case "requestStaff":
      return <RequestStaff />;
    case "userInventory":
      return <GetItemsUser searchQuery={searchQuery} />;
    case "staffInventory":
      return <GetItemsStuff searchQuery={searchQuery} />;
    case "system":
      return <BackupSettings />;
    case "stafftransfer":
      return <TransferStaff />;
    case "transferUser":
      return <TransferUser />;
    case "receivedItems":
      return <ReceivedItems />;
    case "report":
      return <Report />;
    case "account":
      return <Accounts />;
    case "support":
      return <Supports />;
    case "usersF":
      return <UsersByDepartments />;
    default:
      return (
        <div>
          {menuName} is not a valid menu list. Check the menus again. 😁
        </div>
      );
  }
};

export function Dashboard({ menu }) {
  const [activeComponent, setActiveComponent] = useState(); // Default to Inventory component
  const [user, setUser] = useState(getUser());
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  console.table(user);

  useEffect(() => {
    // Set the default component based on the user's role
    if (user.role === "user") {
      setActiveComponent(
        getComponentByMenuName("userInventory", user.role, searchQuery)
      );
    } else if (user.role === "faculity") {
      setActiveComponent(
        getComponentByMenuName("facultyInventory", user.role, searchQuery)
      );
    } else if (user.role === "admin") {
      setActiveComponent(
        getComponentByMenuName("usersA", user.role, searchQuery)
      );
    } else if (user.role === "manager") {
      setActiveComponent(
        getComponentByMenuName("requestManager", user.role, searchQuery)
      );
    } else if (user.role === "staff") {
      setActiveComponent(
        getComponentByMenuName("staffInventory", user.role, searchQuery)
      );
    }
  }, [user.role, searchQuery]);

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

    let component = getComponentByMenuName(menuName, userType, searchQuery);
    setActiveComponent(component);
  };

  const { logout } = useContext(AuthContext);

  const handleLogoutClick = () => {
    logout();
    setUser(null); // Clear the user state on logout
    window.location.href = "/login"; // Redirect to login after logging out
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (user.role === "user") {
      setActiveComponent(
        getComponentByMenuName("userInventory", user.role, query)
      );
    } else if (user.role === "faculity") {
      setActiveComponent(
        getComponentByMenuName("facultyInventory", user.role, query)
      );
    } else if (user.role === "staff") {
      setActiveComponent(
        getComponentByMenuName("staffInventory", user.role, query)
      );
    } else if (user.role === "admin") {
      setActiveComponent(getComponentByMenuName("usersA", user.role, query));
    } else if (user.role === "manager") {
      setActiveComponent(
        getComponentByMenuName("requestManager", user.role, query)
      );
    }
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
          {user.role != "manager" && (
            <div className="group">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
              <input
                className="input"
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          )}
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
