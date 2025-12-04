import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer'; 
import ProtectedRoute from './components/layout/ProtectedRoute'; 

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import NotFound from './pages/NotFound';
import BlogPost from './pages/BlogPost';
import CreatePost from './pages/admin/CreatePost';
import EditPost from './pages/admin/EditPost';

// Import the updated CSS
import './App.css'; 

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          
          {/* UPDATED: Use the class instead of inline styles */}
          <div className="main-content"> 
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/post/:id" element={<BlogPost />} />

              {/* PROTECTED ROUTES */}
              <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<Dashboard />} />
                  <Route path="/admin/create" element={<CreatePost />} /> 
                  <Route path="/admin/edit/:id" element={<EditPost />} />
              </Route>

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