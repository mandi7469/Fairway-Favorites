// imports
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/NavBar.css";

// navbar component that renders a navigation bar with links
function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Fairway Favorites</Link>
      </div>
      {/* container for the navigation links */}
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          <i className="bi bi-house"></i>
          Home
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
          <i class="bi bi-upload"></i>
          Upload
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
