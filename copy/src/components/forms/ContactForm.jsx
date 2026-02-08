import { useState } from 'react';
import api from '../../api/axios'; // Use our axios instance
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General', // Default value matches select option
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // POST to our new PHP endpoint
      await api.post('/contact.php', formData);
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: 'General', message: '' });
    } catch (err) {
      console.error("Email Error:", err);
      setStatus('error');
      setResponseMsg('Failed to send message. Please try again later.');
    }
  };

  if (status === 'success') {
    return (
      <div className="success-message">
        <h3>Message Sent!</h3>
        <p>Thanks for reaching out! We'll get back to you shortly.</p>
        <button onClick={() => setStatus('idle')} className="reset-form-btn">Send Another</button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {/* ... (Keep your existing JSX for inputs, just ensure the onSubmit points to the new handler) ... */}
      
      {status === 'error' && <p className="error-text" style={{color: 'red', marginBottom:'1rem'}}>{responseMsg}</p>}

      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Subject</label>
        <select name="subject" value={formData.subject} onChange={handleChange}>
            <option value="General">General Inquiry</option>
            <option value="Collab">Collaboration / Podcast</option>
            <option value="Tech">Web Dev Project</option>
            <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Message</label>
        <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
      </div>

      <button type="submit" className="submit-btn" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;