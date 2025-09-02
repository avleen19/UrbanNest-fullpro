const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

console.log("....");

// ✅ Define Routes
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;  // Ensure this is exporting the router correctly
