const PaymentDetails = require('../models/paymentDetailsModel');

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await PaymentDetails.findAll();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
    try {
        console.log(`Fetching payment with ID: ${req.params.id}`);
        const payment = await PaymentDetails.findByPk(req.params.id);
        if (!payment) {
            console.warn(`Payment not found: ID ${req.params.id}`);
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(payment);
    } catch (error) {
        console.error('Error fetching payment by ID:', error);
        res.status(500).json({ error: error.message });
    }
};

// Create a payment
exports.createPayment = async (req, res) => {
    try {
        console.log('Creating a new payment:', req.body);
        const payment = await PaymentDetails.create(req.body);
        res.status(201).json(payment);
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: error.message });
    }
};

// Update a payment
exports.updatePayment = async (req, res) => {
    try {
        console.log(`Updating payment with ID: ${req.params.id}`, req.body);
        const payment = await PaymentDetails.findByPk(req.params.id);
        if (!payment) {
            console.warn(`Payment not found: ID ${req.params.id}`);
            return res.status(404).json({ message: 'Payment not found' });
        }
        await payment.update(req.body);
        res.json(payment);
    } catch (error) {
        console.error('Error updating payment:', error);
        res.status(500).json({ error: error.message });
    }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
    try {
        console.log(`Deleting payment with ID: ${req.params.id}`);
        const payment = await PaymentDetails.findByPk(req.params.id);
        if (!payment) {
            console.warn(`Payment not found: ID ${req.params.id}`);
            return res.status(404).json({ message: 'Payment not found' });
        }
        await payment.destroy();
        res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
        console.error('Error deleting payment:', error);
        res.status(500).json({ error: error.message });
    }
};