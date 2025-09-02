// src/components/Customer/ShoppingCart.jsx
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './ShoppingCart.css';

const ShoppingCart = ({ cartItems, updateCart, removeItem }) => {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  
  const stripePromise = loadStripe("pk_test_51QNXL0Ezjpdl2chbYYS7x4hoxPRdB37KcXzCA5PRuLMsFDZoqfKTtv72HZXKbEr2TOWYaHf2CunTgSlrNGOgkBmd00wsg7jZba");


  // Hardcoded customerId – replace with actual auth context or prop later
  const customerId = 1;

  const handleQuantityChange = (id, amount) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    updateCart(updatedCart);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.UnitPrice * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!address || !location) {
      alert('Please enter your address and location before checkout.');
      return;
    }
  
    try {
      const stripe = await stripePromise;
  
      const response = await fetch('http://localhost:5001/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems,
          address,
          location,
          customerId, // optional
        }),
      });
  
      const session = await response.json();
  
      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
  
      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong!');
    }
  };
  

  // const handleCheckout = async () => {
  //   if (!address || !location) {
  //     alert('Please enter your address and location before checkout.');
  //     return;
  //   }

  //   alert(`Proceeding to checkout\nLocation: ${location}\nAddress: ${address}`);

  //   const orderData = {
  //     customerId,
  //     totalAmount: total,
  //     orderDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
  //     address,
  //     location,
  //   };

  //   try {
  //     const response = await fetch('http://localhost:5001/api/orders/', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(orderData),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to place order');
  //     }

  //     const result = await response.json();
  //     console.log('Order saved:', result);
  //     alert('Order placed successfully!');
  //     // Optionally clear the cart here
  //     updateCart([]);
  //     setAddress('');
  //     setLocation('');
  //   } catch (error) {
  //     console.error('Checkout error:', error);
  //     alert('Something went wrong. Please try again.');
  //   }
  // };

  return (
    <div className="shopping-cart">
      <h1>Your Cart</h1>

      <div className="checkout-form">
        <h3>Shipping Information</h3>
        <input
          type="text"
          placeholder="Enter your location (City, State)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <textarea
          placeholder="Enter full delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
      </div>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.ImageURL || 'https://via.placeholder.com/100'}
                  alt={item.ProductName}
                />
                <div className="item-info">
                  <h3>{item.ProductName}</h3>
                  <p>₹{item.UnitPrice}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Total: ₹{total.toFixed(2)}</h2>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
