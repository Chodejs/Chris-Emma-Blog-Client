import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer'; 
import ProtectedRoute from './components/layout/ProtectedRoute'; // <--- Import the Bouncer

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import NotFound from './pages/NotFound';
import BlogPost from './pages/BlogPost';
import CreatePost from './pages/admin/CreatePost';
import EditPost from './pages/admin/EditPost';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          
          <div style={{ padding: '20px', minHeight: '80vh' }}> 
            <Routes>
              {/* PUBLIC ROUTES (Open to everyone) */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/post/:id" element={<BlogPost />} />

              {/* PROTECTED ROUTES ( VIP Only ) */}
              <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<Dashboard />} />
                  <Route path="/admin/create" element={<CreatePost />} /> 
                  <Route path="/admin/edit/:id" element={<EditPost />} />
              </Route>

              {/* 404 Route */}
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