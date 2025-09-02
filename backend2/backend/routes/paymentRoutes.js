// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');  // Ensure this is correctly importing your controller

// Ensure you're using the correct route handlers
router.get('/', paymentController.getAllPayments);  // Check if getAllPayments is defined in paymentController
router.get('/:id', paymentController.getPaymentById);  // Check if getPaymentById is defined
router.post('/', paymentController.createPayment);  // Check if createPayment is defined
router.put('/:id', paymentController.updatePayment);  // Check if updatePayment is defined
router.delete('/:id', paymentController.deletePayment);  // Check if deletePayment is defined

module.exports = router;
