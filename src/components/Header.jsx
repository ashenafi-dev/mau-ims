import { Link } from "react-router-dom";
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
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
    </div>
  );
}

function NavBar() {
  return (
    <>
      <ul className="navbar">
        <Link to="/">
          <li>home</li>
        </Link>
        <Link to="/contact-us">
          <li>contact-us</li>
        </Link>
        <Link to="/about">
          <li>about</li>
        </Link>
        <Link to="/login">
          <li>login</li>
        </Link>
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
