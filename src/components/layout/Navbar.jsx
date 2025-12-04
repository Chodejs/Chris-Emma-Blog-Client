import { useState, useEffect, useRef } from 'react'; // Added useRef
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  // Swipe State
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  // Check login status
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
    window.location.reload();
  };

  // --- SWIPE LOGIC ---
  const minSwipeDistance = 50; 

  const onTouchStart = (e) => {
    touchEnd.current = null; 
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    
    if (isLeftSwipe) {
      closeMobileMenu();
    }
  };
  // -------------------

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
            Chris & Emma Press
          </Link>
        </div>

        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>

        {/* SWIPE HANDLERS ADDED TO UL CONTAINER */}
        <ul 
            className={click ? 'nav-menu active' : 'nav-menu'}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
          <li><Link to="/" className="nav-item" onClick={closeMobileMenu}>Home</Link></li>
          <li><Link to="/about" className="nav-item" onClick={closeMobileMenu}>About</Link></li>
          
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
      
      {/* BACKDROP: Only visible when menu is active. Clicking it closes menu. */}
      {click && <div className="nav-backdrop" onClick={closeMobileMenu}></div>}
    </>
  );
};

export default Navbar;