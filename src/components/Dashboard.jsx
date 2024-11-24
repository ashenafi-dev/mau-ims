import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/dashboard.css";
import { sun, moon, arrow, profile, bell } from "./Svg";

export function Dashboard({ menu }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <Link className="sidebar--top">
          <img src={logo} alt="Logo" />
          <p>mau inventory</p>
        </Link>
        <div className="sidebar--middle">
          <ul className="menu--list">
            {menu.map((item, index) => (
              <li key={index}>
                <button>
                  {item.icon}
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="sidebar--bottom">
          <button className="sun--moon">
            {sun}
            {moon}
          </button>
          <button className="resize--sidebar">{arrow}</button>
        </div>
      </div>
      <div className="content">
        <div className="content--header">
          {bell}

          {profile}

          {user ? (
            <p>
              name: {user.first_name} {user.last_name} role: {user.role}{" "}
            </p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="content--body"></div>
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
