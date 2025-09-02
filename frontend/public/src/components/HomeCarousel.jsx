import React, { useState, useEffect } from 'react';
import './HomeCarousel.css'; // You'll need to create this CSS file

const HomeCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80',
      title: 'Luxury Living Room Sets',
      subtitle: 'Elevate Your Home with Premium Comfort',
      cta: 'Shop Now'
    },
    {
      image: 'https://images.unsplash.com/photo-1618221195710-dd2b37bca94f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80',
      title: 'Modern Dining Collections',
      subtitle: 'Crafted for Memorable Gatherings',
      cta: 'Explore Collection'
    },
    {
      image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80',
      title: 'Cozy Bedroom Furniture',
      subtitle: 'Transform Your Sleep Experience',
      cta: 'Discover More'
    }
  ];

  // Automatic slide transition
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5001); // Change slide every 5 seconds
    
    return () => clearInterval(timer); // Cleanup on unmount
  }, [slides.length]);

  // Manual navigation handlers
  const goToPrevious = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const goToNext = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div className="home-carousel">
      <div className="carousel-container">
        <button className="carousel-arrow left-arrow" onClick={goToPrevious}>
          &#10094;
        </button>
        
        <div className="carousel-slide" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div className="slide" key={index}>
              <img src={slide.image} alt={slide.title} />
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                <button className="cta-button">{slide.cta}</button>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-arrow right-arrow" onClick={goToNext}>
          &#10095;
        </button>
      </div>

      {/* Dots navigation */}
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;