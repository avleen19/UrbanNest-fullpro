import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../images/DeWatermark.ai_1744302405827.png"; // Adjust the path if needed
import sofaImage from "../images/sofa.jpg";
import imggg from "../images/DeWatermark.ai_1744386825568.png";
import NewInStore from "./Shared/NewInStore";
import Testimonials from "./Shared/Testimonials";
import DiscountBanner from "./Shared/DiscountBanner";
import discountBackgroundImage from "../images/pierre-chatel-innocenti-pxoZSTdAzeU-unsplash.jpg";
import "./Home.css";

const Home = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
      const statsData = [
        { label: "Year Experience", value: 7 },
        { label: "Opened in the country", value: 2 },
        { label: "Furniture sold", value: "10k+" },
        { label: "Variant Furniture", value: "260+" },
      ];
      setStats(statsData);
      setLoading(false);
    } catch (err) {
      setError("Failed to load data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section
        className="heroo-section"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="heroo-content">
          <h1>
            Creative Home <br /> Simplify your Furniture
          </h1>
          <p>
            Do I have consent to record this meeting? Gain location, root-and-branch,
            review, nor game plan who’s the goto.
          </p>
          <Link to="/products" className="shop-now-button">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            <div className="stat-card">
              <h2>{stat.value}</h2>
              <p>{stat.label}</p>
            </div>
            {index < stats.length - 1 && <div className="stat-divider" />}
          </React.Fragment>
        ))}
      </section>

      {/* Intro Section */}
      <section className="intro-section">
        <div className="intro-content">
          <div className="intro-image">
            <img src={sofaImage} alt="Sofa" />
          </div>
          <div className="intro-text">
            <h2>We Create your home more aesthetic</h2>
            <p>
              UrbanNest is a software-as-a-service for multipurpose business management systems.
            </p>
            <ul>
              <li>
                <span>✔</span>
                <div>
                  <strong>Valuation Services</strong>
                  <p>
                    Sometimes features require a short description. This can be a detailed description.
                  </p>
                </div>
              </li>
              <li>
                <span>✔</span>
                <div>
                  <strong>Development of Furniture Models</strong>
                  <p>
                    Sometimes features require a short description. This can be a detailed description.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* New In Store Section */}
      <NewInStore />

      {/* Manufacturer Section */}
      <section className="best-manufacturer">
        <div className="best-manufacturer-content">
          <div className="manufacturer-text">
            <h2>The Best Furniture Manufacturer of your Choice</h2>
            <p>
              UrbanNest is a software-as-a-service for multipurpose business
              management systems, especially for those who are running two or more
              businesses. Explore the future of furniture technology with us.
            </p>
            <Link to="/shop" className="explore-button">
              Explore Now
            </Link>
          </div>
          <div className="manufacturer-image">
            <img src={imggg} alt="Furniture Manufacturer" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Discount Banner */}
      <DiscountBanner backgroundImage={discountBackgroundImage} />
    </div>
  );
};

export default Home;
