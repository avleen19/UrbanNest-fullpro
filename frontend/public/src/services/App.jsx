// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from '../components/Home';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import AdminProductList from '../components/Admin/AdminProductList';
import ShoppingCart from '../components/Customer/ShoppingCart';
import ProductsPage from '../components/Customer/Products';
import AboutPage from '../components/Shared/About';
import Navbar from '../components/Shared/Navbar';
import Footer from '../components/Shared/Footer';
import ContactPage from '../components/Shared/Contact';
import Success from '../components/Customer/success';

import './App.css';

// A separate component to use location inside Router
const AppRoutes = ({ cartItems, addToCart, updateCart, removeItem }) => {
  const location = useLocation();

  const hideNavbarFooter = location.pathname.startsWith('/admin');

  return (
    <>
      {!hideNavbarFooter && <Navbar cartItemCount={cartItems.length} />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ProductsPage addToCart={addToCart} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/products" element={<AdminProductList />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/success" element={<Success />} />

          <Route
            path="/cart"
            element={
              <ShoppingCart
                cartItems={cartItems}
                updateCart={updateCart}
                removeItem={removeItem}
              />
            }
          />
        </Routes>
      </main>
      {!hideNavbarFooter && <Footer />}
    </>
  );
};

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.ProductId);
    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.ProductId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, id: product.ProductId, quantity: 1 }]);
    }
  };

  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <div className="app-container">
        <AppRoutes
          cartItems={cartItems}
          addToCart={addToCart}
          updateCart={updateCart}
          removeItem={removeItem}
        />
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </Router>
  );
}

export default App;
