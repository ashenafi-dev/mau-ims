import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/dashboard.css";
import { staffMenuList } from "./MenuList";
import { sun, moon, arrow, profile, bell } from "./Svg";

export function Dashboard() {
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
        <di className="sidebar--middle">
          <ul className="menu--list">
            {staffMenuList.map((list) => (
              <li key={list}>
                <button>
                  {list.icon}
                  {list.name}
                </button>
              </li>
            ))}
          </ul>
        </di>
        <di className="sidebar--bottom">
          <button className="sun--moon">
            {sun}
            {moon}
          </button>
          <button className="resize--sidebar">{arrow}</button>
        </di>
      </div>
      <div className="content">
        <div className="content--header">
          {bell}

          {profile}

          {user ? (
            <p>
              || name: {user.first_name} {user.last_name} || role: {user.role}{" "}
              ||
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
