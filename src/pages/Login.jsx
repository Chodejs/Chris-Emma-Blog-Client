import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../api/axios';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 1. AUTO-REDIRECT if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin'); 
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await api.post('/login.php', {
        username: formData.username,
        password: formData.password
      });

      const { user, token } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      navigate('/admin');
      window.location.reload(); 

    } catch (err) {
      console.error("Login Error:", err);
      if (!err?.response) {
          setError('No Server Response');
      } else if (err.response?.status === 400) {
          setError('Missing Username or Password');
      } else if (err.response?.status === 401) {
          setError('Invalid Username or Password');
      } else {
          setError('Login Failed');
      }
    }
  };

  return (
    <div className="login-container">
      <Helmet>
        <title>Staff Login | Chris & Emma Press</title>
      </Helmet>

      <div className="login-card">
        <h2>Authorized Access Only</h2>
        
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
              placeholder="Enter credentials"
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
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;