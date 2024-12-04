import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/dashboard.css";
import { sun, moon, arrow, profileImage } from "./Svg";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../contexts/AuthContext";
import Home from "./user/Dashboard";
import Inventory from "./user/Inventory"; // Import other components...
import Request from "./user/Request";
import Transfer from "./user/Transfer";
import Report from "./user/Report";
import Account from "./user/Account";
import Support from "./user/Support";

export function Dashboard({ menu }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/createItem", product);
      console.log(`RES: ${response.data}`);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const [active, setActive] = useState(true);
  const [activeComponent, setActiveComponent] = useState(null);

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
          // component = <Default />;
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
        console.log("incorrect user");
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

  const [mirror, setMirror] = useState(false);
  const handleArrowClick = () => {
    setMirror((mirror) => !mirror);
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
          <button
            className={`arrow-btn ${mirror ? "mirrored" : ""}`}
            onClick={handleArrowClick}
          >
            {arrow}
          </button>
        </div>
      </div>
      <div className="content">
        <div className="content--header">
          <button onClick={handleLogoutClick}>Logout</button>
          <div className="profile">
            <button className="profile-btn" onClick={handleArrowClick}>
              {profileImage}
            </button>
            <div>
              <p>name: {decodedToken.username}</p>
              <p>role: {decodedToken.role}</p>
            </div>
          </div>
        </div>
        <div className="content--body">
          {insertProduct(handleSubmit, product, handleChange)}
          {activeComponent}
        </div>
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

function insertProduct(handleSubmit, product, handleChange) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <input
        name="quantity"
        value={product.quantity}
        onChange={handleChange}
        placeholder="Quantity"
      />
      <button type="submit">Add Product</button>
    </form>
  );
}
