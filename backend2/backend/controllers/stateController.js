// controllers/stateControllers.js
const State = require('../models/state');  // Ensure correct model path

exports.createState = async (req, res) => {
    try {
        // 🔍 Log the request body for debugging
        console.log("Received Body:", req.body);

        const { StateName } = req.body;

        if (!StateName) {
            return res.status(400).json({ error: 'StateName is required' });
        }

        const state = await State.create({ StateName });
        res.status(201).json({ message: 'State created', state });
    } catch (err) {
        console.error("Error creating state:", err);
        res.status(500).json({ error: err.message });
    }
};

// Get all states
exports.getAllStates = async (req, res) => {
    try {
        console.log('Fetching all states...');
        const states = await State.findAll();  // This should work if the model is defined and imported correctly
        res.json(states);
    } catch (error) {
        console.error('Error fetching states:', error);
        res.status(500).json({ error: error.message });
    }
};
