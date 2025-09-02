const Order = require('../models/orderModel');
const PaymentDetails = require('../models/paymentDetailsModel');
const Customer = require('../models/customerModel');
const User = require('../models/userModel');

// ✅ Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        console.log('Fetching all orders...');
        const orders = await Order.findAll({
            include: { model: Customer, attributes: ['id', 'name', 'email'] } // Include customer details
        });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Error fetching orders: ' + error.message });
    }
};

// ✅ Get order by ID
exports.getOrderById = async (req, res) => {
    try {
        console.log(`Fetching order with ID: ${req.params.id}`);
        const order = await Order.findByPk(req.params.id, {
            include: [Customer, PaymentDetails]
        });

        if (!order) {
            console.warn(`Order not found: ID ${req.params.id}`);
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        res.status(500).json({ error: 'Error fetching order by ID: ' + error.message });
    }
};

// ✅ Create an Order
exports.createOrder = async (req, res) => {
    try {
        console.log("📌 Incoming Order Data:", req.body); // Debugging

        const { customerId, totalAmount } = req.body;

        if (!customerId || !totalAmount) {
            return res.status(400).json({ error: "customerId and totalAmount are required" });
        }

        // Check if customer exists
        const customerExists = await User.findByPk(customerId);
        console.log("✅ Customer Exists Check:", customerExists);

        if (!customerExists) {
            console.error("❌ Customer ID does not exist:", customerId);
            return res.status(400).json({ error: "Invalid customerId: Customer does not exist" });
        }

        const order = await Order.create({
            customerId,
            totalAmount,
        });

        res.status(201).json(order);
    } catch (error) {
        console.error("❌ Error creating order:", error);
        res.status(500).json({ error: 'Error creating order: ' + error.message });
    }
};

// ✅ Update an Order
exports.updateOrder = async (req, res) => {
    try {
        console.log(`Updating order with ID: ${req.params.id}`, req.body);
        const order = await Order.findByPk(req.params.id);

        if (!order) {
            console.warn(`Order not found: ID ${req.params.id}`);
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.update(req.body);
        res.json(order);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Error updating order: ' + error.message });
    }
};

// ✅ Delete an Order
exports.deleteOrder = async (req, res) => {
    try {
        console.log(`Deleting order with ID: ${req.params.id}`);
        const order = await Order.findByPk(req.params.id);

        if (!order) {
            console.warn(`Order not found: ID ${req.params.id}`);
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.destroy();
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Error deleting order: ' + error.message });
    }
};
