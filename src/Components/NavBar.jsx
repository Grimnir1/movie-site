import { Link } from "react-router-dom";
import '../css/Navbar.css';


function NavBar() {
  return (
    <div className="navbar">

        <div className="navbar-brand">
            <div className="logo">
                <Link to="/">Movie App</Link>
            </div>
            
        </div>
        <div className="nav-links">
            <Link to="/favourites">Favourites</Link>
        </div>
    </div>
  );
}

export default NavBar;