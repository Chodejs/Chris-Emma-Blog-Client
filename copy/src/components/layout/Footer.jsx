import { Link } from 'react-router-dom';
import { FaGithub, FaYoutube, FaInstagram, FaSpotify, FaFacebook, FaPatreon } from 'react-icons/fa'; 
import { siteConfig } from '../../config/siteConfig'; // <--- Import Config
import './Footer.css';

const Footer = () => {
  const { socials, networkLinks, brandName } = siteConfig;

  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Section 1: Brand */}
        <div className="footer-section">
          <h3>{brandName}</h3>
          <p>
            {siteConfig.about.heroSubtitle} 
            Built with Chris & Emma Press Technology.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Staff Access</Link></li> 
          </ul>
        </div>

        {/* Section 3: The Network (Dynamic) */}
        {networkLinks.length > 0 && (
            <div className="footer-section">
            <h4>Network</h4>
            <ul>
                {networkLinks.map((link, index) => (
                    <li key={index}>
                        <a href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
                    </li>
                ))}
            </ul>
            </div>
        )}

        {/* Section 4: Socials (Conditional Rendering) */}
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="social-icons">
            {socials.spotify && <a href={socials.spotify} target="_blank" rel="noreferrer"><FaSpotify className="social-icon" /></a>}
            {socials.facebook && <a href={socials.facebook} target="_blank" rel="noreferrer"><FaFacebook className="social-icon" /></a>}
            {socials.patreon && <a href={socials.patreon} target="_blank" rel="noreferrer"><FaPatreon className="social-icon" /></a>}
            {socials.github && <a href={socials.github} target="_blank" rel="noreferrer"><FaGithub className="social-icon" /></a>}
            {socials.youtube && <a href={socials.youtube} target="_blank" rel="noreferrer"><FaYoutube className="social-icon" /></a>}
            {socials.instagram && <a href={socials.instagram} target="_blank" rel="noreferrer"><FaInstagram className="social-icon" /></a>}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} {brandName}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;