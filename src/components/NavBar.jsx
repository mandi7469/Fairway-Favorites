// imports
import { Link } from "react-router-dom";
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
          Home
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
        <Link to="/game" className="nav-link">
          Game
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
