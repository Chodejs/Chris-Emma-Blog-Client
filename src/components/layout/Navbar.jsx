import { useState, useEffect } from 'react'; // <--- Add useEffect
import { Link, useNavigate } from 'react-router-dom'; // <--- Add useNavigate
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // <--- New State
  const navigate = useNavigate();

  // Check login status when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    closeMobileMenu();
    navigate('/');
    window.location.reload(); // Force refresh to clear state
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
          Chris & Emma Press
        </Link>
      </div>

      <div className="menu-icon" onClick={handleClick}>
        {click ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li><Link to="/" className="nav-item" onClick={closeMobileMenu}>Home</Link></li>
        <li><Link to="/about" className="nav-item" onClick={closeMobileMenu}>About</Link></li>
        
        {/* Only show Admin link if logged in */}
        {isLoggedIn && (
           <li><Link to="/admin" className="nav-item" onClick={closeMobileMenu}>Dashboard</Link></li>
        )}

        <li>
          {isLoggedIn ? (
            <span className="nav-item" onClick={handleLogout} style={{cursor: 'pointer'}}>Logout</span>
          ) : (
            <Link to="/login" className="nav-item" onClick={closeMobileMenu}>Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;