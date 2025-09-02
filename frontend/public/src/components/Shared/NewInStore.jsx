import React from 'react';
import { Link } from 'react-router-dom';
import './NewInStore.css';
import chair from "../../images/sofa.jpg";
import bed from "../../images/bed.jpg";
import light from "../../images/light.jpg";
import sofa from "../../images/sofa.jpg";


const NewInStore = () => {
  const items = [
    {
      id: 1,
      name: 'Chair',
      image: chair,
    },
    {
      id: 2,
      name: 'Bed',
      image: bed,
    },
    {
      id: 3,
      name: 'Cupboard',
      image: sofa,
    },
    {
      id: 4,
      name: 'Lightening',
      image: light,
    },
  ];

  return (
    <section className="new-in-store">
      <div className="new-in-store-content">
        <div className="new-in-store-text">
          <h2>New In Store Now</h2>
          <p>Get the latest items immediately with promo prices</p>
          <Link to="/shop" className="check-all">
            Check all →
          </Link>
        </div>
        <div className="new-in-store-images">
          <div className="image-scroll">
            {items.map((item) => (
              <div key={item.id} className="image-card">
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
              </div>
            ))}
            {/* Duplicate items for seamless loop */}
            {items.map((item) => (
              <div key={`${item.id}-duplicate`} className="image-card">
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewInStore;