// routes/payment.js

const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
require('dotenv').config();

// ✅ Use environment variable for security
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Create Checkout Session
router.post('/create-checkout-session', async (req, res) => {
  const { cartItems, email } = req.body;

  try {
    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: { name: item.ProductName },
        unit_amount: Math.round(item.UnitPrice * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      customer_email: email,
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: 'http://localhost:3000/cart',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// ✅ Get Session Details
router.get("/checkout-session", async (req, res) => {
  const { sessionId } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer_details', 'payment_intent'],
    });

    const paymentIntent = session.payment_intent;
    res.json({ session, paymentIntent });
  } catch (err) {
    console.error("Error retrieving checkout session:", err.message);
    res.status(400).json({ error: "Failed to retrieve session" });
  }
});

// ✅ Get Recent Sessions
router.get('/sessions', async (req, res) => {
  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 10,
      expand: ['data.customer_details', 'data.line_items'],
    });
    res.json(sessions.data);
  } catch (err) {
    console.error("Error listing sessions:", err.message);
    res.status(500).json({ error: 'Unable to retrieve sessions' });
  }
});

module.exports = router;
