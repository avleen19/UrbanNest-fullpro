import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await fetch('https://formspree.io/f/xvgaynvy', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });
      const data = await res.json();

      if (res.ok) {
        alert('Message sent successfully!');
        e.target.reset();
      } else {
        alert('Error: ' + (data.error || 'Failed to send message.'));
      }
    } catch (error) {
      alert('Network error: Please try again later.');
    }
  };

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, #1f2937 0%, #111827 100%)',
        color: 'white',
        padding: '4rem 1.5rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
        }}
      >
        {/* Brand Info */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3
            style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#60a5fa',
              marginBottom: '1rem',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.color = '#93c5fd')}
            onMouseOut={(e) => (e.target.style.color = '#60a5fa')}
          >
            UrbanNest
          </h3>
          <p
            style={{
              fontSize: '0.9rem',
              color: '#d1d5db',
              lineHeight: '1.5',
            }}
          >
            Your go-to platform for modern design and elegant living.
          </p>
        </div>

        {/* Quick Links */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h4
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#e5e7eb',
            }}
          >
            Quick Links
          </h4>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {['Home', 'Shop', 'About', 'Contact'].map((link) => (
              <li key={link}>
                <a
                  href={`/${link.toLowerCase()}`}
                  style={{
                    color: '#d1d5db',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseOver={(e) => (e.target.style.color = '#60a5fa')}
                  onMouseOut={(e) => (e.target.style.color = '#d1d5db')}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h4
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#e5e7eb',
            }}
          >
            Contact Us
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#d1d5db', lineHeight: '1.5' }}>
            Email: support@urbannest.com
          </p>
          <p style={{ fontSize: '0.9rem', color: '#d1d5db', lineHeight: '1.5' }}>
            Phone: +91 98765 43210
          </p>
          <p style={{ fontSize: '0.9rem', color: '#d1d5db', lineHeight: '1.5' }}>
            Chandigarh, India
          </p>
        </div>

        {/* Contact Form (Formspree) */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h4
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#e5e7eb',
            }}
          >
            Send Us a Message
          </h4>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: 'none',
                fontSize: '0.9rem',
              }}
            />
            {/* Note the name="_replyto" here, which Formspree uses */}
            <input
              type="email"
              name="_replyto"
              placeholder="Your Email"
              required
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: 'none',
                fontSize: '0.9rem',
              }}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows="4"
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: 'none',
                fontSize: '0.9rem',
                resize: 'vertical',
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#60a5fa',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '0.75rem',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#93c5fd')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#60a5fa')}
            >
              Send
            </button>
          </form>
        </div>

        {/* Social Media */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h4
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#e5e7eb',
            }}
          >
            Follow Us
          </h4>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a
              href="#"
              style={{
                color: '#d1d5db',
                fontSize: '1.2rem',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.target.style.color = '#3b5998';
                e.target.style.transform = 'scale(1.2)';
              }}
              onMouseOut={(e) => {
                e.target.style.color = '#d1d5db';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              style={{
                color: '#d1d5db',
                fontSize: '1.2rem',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.target.style.color = '#1da1f2';
                e.target.style.transform = 'scale(1.2)';
              }}
              onMouseOut={(e) => {
                e.target.style.color = '#d1d5db';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              style={{
                color: '#d1d5db',
                fontSize: '1.2rem',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.target.style.color = '#e4405f';
                e.target.style.transform = 'scale(1.2)';
              }}
              onMouseOut={(e) => {
                e.target.style.color = '#d1d5db';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              style={{
                color: '#d1d5db',
                fontSize: '1.2rem',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.target.style.color = '#0077b5';
                e.target.style.transform = 'scale(1.2)';
              }}
              onMouseOut={(e) => {
                e.target.style.color = '#d1d5db';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: 'center',
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#9ca3af',
          fontSize: '0.85rem',
        }}
      >
        © 2025 UrbanNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
