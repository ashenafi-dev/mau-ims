import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Navs/Home";
import About from "./pages/Navs/About";
import Contact from "./pages/Navs/Contact";
import Login from "./pages/Navs/Login";
import NotFound from "./pages/Navs/NotFound";
import Admin from "./pages/Dashboards/Admin";
import Manager from "./pages/Dashboards/Manager";
import User from "./pages/Dashboards/User";
import Staff from "./pages/Dashboards/Staff";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  // Array of paths where the Header should be displayed
  const validPaths = ["/", "/about", "/contact-us"]; /* "/login", */

  // Check if the current path is in the array of valid paths
  const shouldShowHeader = validPaths.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/user" element={<User />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

/*
---- use protected routes ----

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import your protected route component

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-dashboard" element={<ProtectedRoute element={UserDashboard} />} />
        <Route path="/manager-dashboard" element={<ProtectedRoute element={ManagerDashboard} />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute element={AdminDashboard} />} />
        <Route path="/staff-dashboard" element={<ProtectedRoute element={StaffDashboard} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;

*/
