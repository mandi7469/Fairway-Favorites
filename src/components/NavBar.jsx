// imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/NavBar.css";

// navBar component that renders a navigation bar with links and a responsive drawer
function NavBar() {
  // state to manage the open/closed status of the drawer
  const [isOpen, setIsOpen] = useState(false);

  // function to toggle the drawer's open state
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Fairway Favorites</Link>
      </div>

      {/* hamburger icon for smaller screens, this button will be displayed only on screens smaller than 980px & when the drawer is closed */}
      {!isOpen && ( // conditionally render the hamburger menu only when the drawer is NOT open
        <button
          className="hamburger-menu"
          onClick={toggleDrawer}
          aria-label="Open navigation menu"
        >
          <i className="bi bi-list"></i>
        </button>
      )}

      {/* regular navigation links for larger screens, these links will be hidden on screens smaller than 980px */}
      <div className="navbar-links-desktop">
        <Link to="/" className="nav-link">
          <i className="bi bi-search"></i>
          Search
        </Link>
        <Link to="/favorites" className="nav-link">
          <i className="bi bi-heart"></i>
          Favorites
        </Link>
        <Link to="/game" className="nav-link">
          <i className="bi bi-controller"></i>
          Game
        </Link>
        <Link to="/scorecard" className="nav-link">
          <i className="bi bi-card-text"></i>
          Scorecard
        </Link>
        <Link to="/udisc" className="nav-link">
          <i className="bi bi-geo-alt"></i>
          UDisc
        </Link>
        <Link to="/upload" className="nav-link">
          <i className="bi bi-upload"></i>
          Upload
        </Link>
      </div>

      {/* drawer for smaller screens, the 'open' class is conditionally applied based on the 'isOpen' state */}
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        {/* close button inside the drawer */}
        <button
          className="close-drawer"
          onClick={toggleDrawer}
          aria-label="Close navigation menu"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        {/* navigation links inside the drawer */}
        <div className="drawer-links">
          <Link to="/" className="drawer-link" onClick={toggleDrawer}>
            <i className="bi bi-search"></i>
            Search
          </Link>
          <Link to="/favorites" className="drawer-link" onClick={toggleDrawer}>
            <i className="bi bi-heart"></i>
            Favorites
          </Link>
          <Link to="/game" className="drawer-link" onClick={toggleDrawer}>
            <i className="bi bi-controller"></i>
            Game
          </Link>
          <Link to="/scorecard" className="drawer-link" onClick={toggleDrawer}>
            <i className="bi bi-card-text"></i>
            Scorecard
          </Link>
          <Link to="/udisc" className="drawer-link" onClick={toggleDrawer}>
            <i className="bi bi-geo-alt"></i>
            UDisc
          </Link>
          <Link to="/upload" className="drawer-link" onClick={toggleDrawer}>
            <i className="bi bi-upload"></i>
            Upload
          </Link>
        </div>
      </div>

      {/* overlay that appears when the drawer is open, clicking on the overlay will close the drawer */}
      {isOpen && <div className="overlay" onClick={toggleDrawer}></div>}
    </nav>
  );
}

export default NavBar;
