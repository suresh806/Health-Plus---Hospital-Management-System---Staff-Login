import React from "react";
import { ImMenu } from "react-icons/im";
import { BsBell } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <ImMenu />
        </button>
      </div>
      
      <div className="navbar-right">
        <div className="nav-item">
          <BsBell className="nav-icon" />
          <span className="notification-badge">3</span>
        </div>
        <div className="nav-item">
          <FaUserCircle className="nav-icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
