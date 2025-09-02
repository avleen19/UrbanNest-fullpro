import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('Please fill in all the fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setFormStatus('Please enter a valid email address.');
      return;
    }

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setFormStatus('Thank you! Your message has been sent. We’ll get back to you shortly.');
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero">
  <div className="hero-image-wrapper">
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCln4Mk1A45y6wwSBWoHfZ23CyED9ArYgw4w"
      alt="Contact Banner"
      className="hero-image"
    />
  </div>
  <div className="hero-content">
    <h1>Get in Touch with Urban Nest</h1>
    <p>Have questions or ideas? We’re here to help!</p>
  </div>
</section>


      {/* Contact Form & Info */}
      <section className="contact-section">
        <div className="contact-container">
          {/* Contact Form */}
          <div className="contact-form">
            <h2>Send Us a Message</h2>
            {formStatus && <p className={`form-status ${formStatus.includes('Thank') ? 'success' : 'error'}`}>{formStatus}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What would you like to ask or share?"
                  rows="5"
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-info">
            <h2>Contact Details</h2>
            <ul>
              <li>
                <strong>Phone:</strong> +91 98765 43210
              </li>
              <li>
                <strong>Email:</strong> support@urbannest.com
              </li>
              <li>
                <strong>Address:</strong> 456 Urban Nest Avenue, Bengaluru, India
              </li>
            </ul>
            <h3>Connect with Us</h3>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Explore?</h2>
        <p>Discover stylish furniture and home decor at Urban Nest!</p>
        <Link to="/shop" className="cta-button">
          Browse Collection
        </Link>
      </section>
    </div>
  );
};

export default ContactPage;
