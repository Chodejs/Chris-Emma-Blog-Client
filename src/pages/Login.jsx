import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // MOCK AUTHENTICATION CHECK
    // In the real world, this would be an Axios post to your PHP API
    if (formData.username === 'admin' && formData.password === 'password') {
      // 1. Save fake token
      localStorage.setItem('token', '123456-fake-token');
      localStorage.setItem('user', JSON.stringify({ name: 'Chris', role: 'admin' }));
      
      // 2. Redirect to Admin Dashboard
      navigate('/admin');
      
      // 3. Force a reload so Navbar updates (We will fix this with Context later!)
      window.location.reload(); 
    } else {
      setError('Invalid credentials. Try "admin" and "password".');
    }
  };

  return (
    <div className="login-container">
      <Helmet>
        <title>Staff Login | Chris & Emma Press</title>
      </Helmet>

      <div className="login-card">
        <h2>Member Login</h2>
        
        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              name="username" 
              className="form-input"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;