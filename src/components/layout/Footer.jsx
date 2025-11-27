import { Link } from 'react-router-dom';
import { FaGithub, FaYoutube, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Section 1: Brand */}
        <div className="footer-section">
          <h3>Chris & Emma Press</h3>
          <p>
            Building a digital empire, one component at a time. 
            From vegan recipes to React tutorials, we cover it all.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Staff Login</Link></li>
          </ul>
        </div>

        {/* Section 3: The Network (Your Sites) */}
        <div className="footer-section">
          <h4>The Network</h4>
          <ul>
            <li><a href="https://wellness.chrisandemmashow.com" target="_blank" rel="noreferrer">Wellness Hub</a></li>
            <li><a href="https://pantry.chrisandemmashow.com" target="_blank" rel="noreferrer">The Pantry</a></li>
            <li><a href="https://chrisandemmashow.com" target="_blank" rel="noreferrer">Podcast Site</a></li>
            <li><a href="https://maracentral.com" target="_blank" rel="noreferrer">Mara Central</a></li>
          </ul>
        </div>

        {/* Section 4: Socials */}
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="social-icons">
            <FaGithub className="social-icon" />
            <FaYoutube className="social-icon" />
            <FaInstagram className="social-icon" />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Chris & Emma Press. Designed by Chris & Emma.
      </div>
    </footer>
  );
};

export default Footer;