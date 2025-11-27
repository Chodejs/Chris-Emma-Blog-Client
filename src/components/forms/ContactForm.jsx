import { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate API call to email server
    setTimeout(() => {
      console.log('Form Submitted:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  if (status === 'success') {
    return (
      <div className="success-message">
        <h3>Message Sent!</h3>
        <p>Thanks for reaching out, {formData.name || 'friend'}. We'll get back to you shortly.</p>
        <button onClick={() => setStatus('idle')} className="reset-form-btn">Send Another</button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
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
        <textarea 
          name="message" 
          rows="5" 
          value={formData.message} 
          onChange={handleChange} 
          required
        ></textarea>
      </div>

      <button type="submit" className="submit-btn" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;