import { Link } from "react-router-dom";
import { useState } from "react";
import '../css/Navbar.css';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">
        <div className="logo">
          <Link to="/">Movie App</Link>
        </div>
      </div>
      
      <button 
        className="mobile-menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div className={`nav-group ${isMenuOpen ? 'nav-group-open' : ''}`}>
        <div className="nav-links">
          <Link to="/favourites" onClick={() => setIsMenuOpen(false)}>Favourites</Link>
        </div>
        <div className="nav-links">
          <Link to="/airingtoday" onClick={() => setIsMenuOpen(false)}>Airing Today</Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;