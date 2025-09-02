import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>UrbanNest - Your Style, Your Home</h1>
          <p>
            We don’t just sell furniture – we help you create a home you love!
          </p>
          <Link to="/shop" className="shop-now">
            Explore Collection
          </Link>
        </div>
        <img
          src="https://imgmediagumlet.lbb.in/media/2019/09/5d836c4b5ab59911b182733d_1568894027411.PNG"
          alt="Furniture Showroom"
          className="hero-image"
        />
      </section>

      {/* Our Story Section */}
      <section className="our-story">
        <h2>Our Story</h2>
        <p>
          UrbanNest started with a simple dream – to make every home stylish and comfortable. Since 2020, we’ve been delivering high-quality furniture that not only looks great but also fits your budget. From sleek modern sofas to timeless wooden tables, we’ve got something for everyone!
        </p>
        <p>
          Our mission is to bring a special piece of furniture to every Indian home – something that makes you smile every time you see it.
        </p>
      </section>

      {/* Values Section */}
      <section className="values">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Quality</h3>
            <p>Each piece is crafted to last for years to come.</p>
          </div>
          <div className="value-card">
            <h3>Style</h3>
            <p>From contemporary to classic – we’ve got your vibe.</p>
          </div>
          <div className="value-card">
            <h3>Affordability</h3>
            <p>Stylish furniture that doesn’t break the bank.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Shop Now!</h2>
        <p>Give your home a fresh look with UrbanNest.</p>
        <Link to="/shop" className="cta-button">
          Shop Now
        </Link>
      </section>
    </div>
  );
};

export default AboutPage;
