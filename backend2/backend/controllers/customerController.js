const Customer = require('../models/customerModel');

exports.getAllCustomers = async (req, res) => {
    try {
        console.log('Fetching all customers...');
        const customers = await Customer.findAll();  // This should work if your model is set up correctly
        res.json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
    try {
        console.log(`Fetching customer with ID: ${req.params.id}`);
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new customer
exports.createCustomer = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        await customer.update(req.body);
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        await customer.destroy();
        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
