// routes/stateRoutes.js
const express = require('express');
const router = express.Router();
const { createState, getAllStates } = require('../controllers/stateController');

// Route to get all states
router.get('/', getAllStates);  // This should be the root route for the state API

// Route to create a new state
router.post('/', createState);  // Create a state at the root route

module.exports = router;
