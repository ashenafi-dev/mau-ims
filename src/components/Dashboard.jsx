// src/components/Dashboard.jsx
import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/dashboard.css";
import { sun, moon, arrow, profileImage } from "./Svg";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../contexts/AuthContext"; // Import AuthContext

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
      const response = await api.post("/products", product);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const [active, setActive] = useState(true);
  function handleThemeClick() {
    setActive((active) => !active);
  }

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  const { logout } = useContext(AuthContext); // Destructure logout from AuthContext

  const handleLogoutClick = () => {
    logout();
    window.location.href = "/login"; // Redirect to login after logging out
  };

  const [mirror, setMirror] = useState(false);
  const hadleArrowClick = () => {
    setMirror(!mirror);
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
                <button className="menu--list--inner">
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
            onClick={hadleArrowClick}
          >
            {arrow}
          </button>
        </div>
      </div>
      <div className="content">
        <div className="content--header">
          <button onClick={handleLogoutClick}>Logout</button>
          {/* {bell} */}
          <div className="profile">
            {profileImage}
            <p>
              name: {decodedToken.username} id: {decodedToken.id} role:{" "}
              {decodedToken.role}
            </p>
          </div>
        </div>
        <div className="content--body">
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
