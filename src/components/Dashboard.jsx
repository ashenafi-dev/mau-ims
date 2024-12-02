import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/dashboard.css";
import { sun, moon, arrow, profile, bell } from "./Svg";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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
      const response = await axios.post(
        "http://localhost:5000/products",
        product
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const storedUserData = localStorage.getItem("userData");
  //   if (storedUserData) {
  //     setUser(JSON.parse(storedUserData));
  //   }
  // }, []);

  const [active, setActive] = useState(true);
  function handleThemeClick() {
    setActive((active) => !active);
  }

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token); // Decode the token to get user details

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
          <button className="arrow">{arrow}</button>
        </div>
      </div>
      <div className="content">
        <div className="content--header">
          {bell}
          {profile}
          {decodedToken ? (
            <p>
              name: {decodedToken.username} id: {decodedToken.id} role:{" "}
              {decodedToken.role}
            </p>
          ) : (
            <p>Loading...</p>
          )}
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
