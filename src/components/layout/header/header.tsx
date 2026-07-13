import React from "react";
import "./header.scss";
import { useNavigate } from "react-router-dom";

/* Common header */

const Header = () => {
  const naviagte = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    naviagte("/login");
  };

  return (
    <nav className="navbar_band">
      <div className="welcome_msg"></div>

      {isLoggedIn && (
        <>
          <div className="header">
            <div className="title"> Central File Management</div>
            <div className="button-container">
              <button
                className="btn btn-logout btn-primary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
