import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer'; 

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import NotFound from './pages/NotFound';
import BlogPost from './pages/BlogPost';
import CreatePost from './pages/admin/CreatePost';
import EditPost from './pages/admin/EditPost';
import ContactForm from './components/forms/ContactForm';

// Quick Contact Page Component (Inline for now)
const ContactPage = () => (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 0' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2c3e50' }}>Get in Touch</h1>
        <ContactForm />
    </div>
);

function App() {
  return (
    <HelmetProvider> {/* <--- Wrap the whole app */}
      <Router>
        <div className="app-container">
          <Navbar />
          
          <div style={{ padding: '20px' }}> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Dashboard />} />
              
              {/* Dynamic Route for Posts */}
              <Route path="/post/:id" element={<BlogPost />} /> {/* <--- The Magic Link */}

              {/* Admin Routes */}
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/create" element={<CreatePost />} /> 
              <Route path="/admin/edit/:id" element={<EditPost />} />

              {/* Page Not Found / 404 Route */}
              <Route path="*" element={<NotFound />} />
              
            </Routes>
          </div>
            <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;