import React, { useState, useEffect } from 'react';
import blabla from "../../images/spacejoy-RqO6kwm4tZY-unsplash.jpg";
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Paula Pfeiffer',
      title: 'Manager of The New York Times',
      quote: 'They have a perfect touch for making something so professional, interesting and useful for a lot of people.',
    },
    {
      id: 2,
      name: 'Aayush Sharma',
      title: 'Interior Designer',
      quote: 'FurnitureWala transformed my projects with their stunning designs and quality craftsmanship.',
    },
    {
      id: 3,
      name: 'Ravi Kumar',
      title: 'Homeowner',
      quote: 'Affordable and durable furniture—bhai, ghar mein ekdum naya josh aa gaya!',
    },
    {
      id: 4,
      name: 'Sneha Patel',
      title: 'Business Owner',
      quote: 'Their service is top-notch, and the furniture fits perfectly in my office space.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5001); // Auto-scroll every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <section className="testimonials">
      <div className="testimonials-content">
        <div className="testimonial-text">
          <h2>What people are saying about us</h2>
          <div className="testimonial-card">
            <div className="testimonial-author">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOHtqsQizwi4syQ1AyhMVid6SO78Nfdd-meQ&s"
                alt={testimonials[currentIndex].name}
                className="author-image"
              />
              <div>
                <h3>{testimonials[currentIndex].name}</h3>
                <p className="author-title">{testimonials[currentIndex].title}</p>
              </div>
            </div>
            <p className="testimonial-quote">{`"${testimonials[currentIndex].quote}"`}</p>
          </div>
          <div className="navigation">
            <button onClick={prevTestimonial} className="nav-arrow">
              &lt;
            </button>
            <button onClick={nextTestimonial} className="nav-arrow">
              &gt;
            </button>
          </div>
          <div className="dots">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>
        <div className="testimonial-image">
          <img src={blabla} alt="Furniture Setup" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
