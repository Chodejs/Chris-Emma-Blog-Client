import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../api/axios';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    try {
      // 1. Send Post Request to PHP
      const response = await api.post('/login.php', {
        username: formData.username,
        password: formData.password
      });

      // 2. If successful (Axios throws error if 401/400, so we are good here)
      const { user, token } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // 3. Redirect
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