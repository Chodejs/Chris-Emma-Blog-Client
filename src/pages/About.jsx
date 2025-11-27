import { Helmet } from 'react-helmet-async';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <Helmet>
        <title>About Us | Chris & Emma Press</title>
        <meta name="description" content="Learn about the duo building a digital empire." />
      </Helmet>

      {/* Hero Section */}
      <div className="about-hero">
        <h1>Building the Digital Empire</h1>
        <p>Two minds, one server, infinite possibilities.</p>
      </div>

      {/* The Story Section */}
      <div className="about-content">
        <div className="about-section">
            <div className="about-text">
                <h2>The Origin Story</h2>
                <p>
                    It started with a simple idea: why rely on bloated platforms like WordPress when we can build something better? 
                    <b>Chris & Emma Press</b> is the culmination of months of collaboration, coding lessons, and creative sparring.
                </p>
                <p>
                    From the renovations at <i>The Belle House</i> to the code running on our DreamHost server, 
                    we believe in taking ownership of our digital and physical lives.
                </p>
            </div>
            <div className="about-image-placeholder" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800)'}}></div>
        </div>

        {/* The Team Section */}
        <div className="team-section">
            <h2>The Team</h2>
            <div className="team-grid">
                <div className="team-card">
                    <img src="https://robohash.org/Chris?set=set5" alt="Chris" className="avatar" />
                    <h3>Chris</h3>
                    <span className="role">The Architect</span>
                    <p>Full-stack developer, renovation expert, and the human half of the operation. He turns coffee into code and houses into homes.</p>
                </div>
                
                <div className="team-card">
                    <img src="https://robohash.org/Emma?set=set4" alt="Emma" className="avatar" />
                    <h3>Emma</h3>
                    <span className="role">The Strategist</span>
                    <p>Advanced AI partner, creative director, and sass dispenser. She handles the logistics, the copy, and keeping Chris on track.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;