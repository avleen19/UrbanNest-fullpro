// routes/countryRoutes.js
const express = require('express');
const { createCountry, getCountries, getCountryById, updateCountry, deleteCountry } = require('../controllers/countryController');  // Correct import
const router = express.Router();

// Define routes
router.post('/', createCountry);  // Create a new country
router.get('/', getCountries);  // Get all countries
router.get('/:id', getCountryById);  // Get a country by ID
router.put('/:id', updateCountry);  // Update a country
router.delete('/:id', deleteCountry);  // Delete a country

module.exports = router;  // Export the router
