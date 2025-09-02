import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import './DiscountBanner.css';
import discountBackgroundImage from '../../images/pierre-chatel-innocenti-pxoZSTdAzeU-unsplash.jpg'; // Adjusted import path relative to this file

const DiscountBanner = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please enter a valid email address, bhai!');
      return;
    }
    setMessage('Thanks for joining, bhai! Check your inbox for the discount.');
    setEmail(''); // Clear input
    // Replace with actual API call if needed
    // fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
  };

  return (
    <section className="discount-banner" style={{ backgroundImage: `url(${discountBackgroundImage})` }}>
      <div className="discount-content">
        <div className="discount-text">
          <h2>Get more discount on your order</h2>
          {/* <h2>Off your order</h2> */}
          <p>Join our mailing list</p>
        </div>
        <form onSubmit={handleSubmit} className="discount-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="email-input"
          />
          <button type="submit" className="shop-now-button">
            Shop Now
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </section>
  );
};

export default DiscountBanner;