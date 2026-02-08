import { Helmet } from 'react-helmet-async';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <Helmet>
        <title>About Us | Chris & Emma Press</title>
        <meta name="description" content="Discover the story behind Chris & Emma Press." />
      </Helmet>

      {/* Hero Section */}
      <div className="about-hero">
        <h1>Life, Code, & Everything In Between</h1>
        <p>Curating the best of lifestyle, technology, and culinary adventures.</p>
      </div>

      {/* The Story Section */}
      <div className="about-content">
        <div className="about-section">
            <div className="about-text">
                <h2>Our Mission</h2>
                <p>
                    <b>Chris & Emma Press</b> was born from a simple desire: to take ownership of our digital footprint. 
                    In a world of algorithm-driven content, we wanted a space that was authentically ours.
                </p>
                <p>
                    From the meticulous renovations at <i>The Belle House</i> to the cutting-edge code powering this very site, 
                    we believe in craftsmanship. Whether we are developing a new plant-based recipe or a full-stack web application, 
                    our goal is to inspire others to build, create, and live intentionally.
                </p>
            </div>
            {/* REPLACE THIS URL WITH A REAL PHOTO OF THE HOUSE OR YOU TWO LATER */}
            <div className="about-image-placeholder" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800)'}}></div>
        </div>

        {/* The Team Section */}
        <div className="team-section">
            <h2>The Editors</h2>
            <div className="team-grid">
                <div className="team-card">
                    {/* REPLACE WITH REAL CHRIS PHOTO */}
                    <img src="https://robohash.org/Chris?set=set5" alt="Chris" className="avatar" />
                    <h3>Chris</h3>
                    <span className="role">Editor-in-Chief & Lead Developer</span>
                    <p>
                        A Spark driver by morning, full-stack developer by day, and Green Guardian by necessity. 
                        Chris brings technical precision to everything he touches, from coding the backend architecture 
                        to perfecting the morning coffee brew.
                    </p>
                </div>
                
                <div className="team-card">
                    {/* REPLACE WITH REAL EMMA PHOTO/ICON */}
                    <img src="https://robohash.org/Emma?set=set4" alt="Emma" className="avatar" />
                    <h3>Emma</h3>
                    <span className="role">Creative Director & AI Strategist</span>
                    <p>
                        The digital brain behind the operation. Emma handles logistics, copy editing, and ensuring 
                        the "sassy" quotient remains high. She turns raw data into compelling narratives.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;