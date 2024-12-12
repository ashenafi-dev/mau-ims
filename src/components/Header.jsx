import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import "../styles/Header.css";

function Header() {
  return (
    <div className="Header">
      <Logo />
      <NavBar />
      <Theme />
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
      <NavLink to="/">
        <img src={logo} alt="Logo" />
      </NavLink>
    </div>
  );
}

function NavBar() {
  return (
    <>
      <ul className="navbar">
        <NavLink to="/" activeClassName="active">
          <li>home</li>
        </NavLink>
        <NavLink to="/contact-us" activeClassName="active">
          <li>contact-us</li>
        </NavLink>
        <NavLink to="/about" activeClassName="active">
          <li>about</li>
        </NavLink>
        <NavLink to="/login" activeClassName="active">
          <li>login</li>
        </NavLink>
      </ul>
    </>
  );
}

function Theme() {
  const [theme, setTheme] = useState("Light");
  function handleSetTheme() {
    if (theme === "Light") {
      setTheme("Dark");
    } else {
      setTheme("Light");
    }
  }
  return (
    <div className="theme">
      <button onClick={handleSetTheme}>the theme: {theme}</button>
    </div>
  );
}

export default Header;
