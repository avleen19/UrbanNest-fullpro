const Country = require('../models/country');  // Ensure case matches exactly


// Create a new country
exports.createCountry = async (req, res) => {
    try {
        const { CountryName, code } = req.body;  // Ensure you're using CountryName here
        if (!CountryName || !code) {
            return res.status(400).json({ error: 'Both CountryName and code are required' });
        }

        const country = await Country.create({ CountryName, code });
        res.status(201).json({ message: 'Country created', country });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Get all countries
exports.getCountries = async (req, res) => {
    try {
        const countries = await Country.findAll();
        res.json(countries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a country by ID
exports.getCountryById = async (req, res) => {
    try {
        const country = await Country.findByPk(req.params.id);
        if (!country) return res.status(404).json({ message: 'Country not found' });
        res.json(country);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a country
exports.updateCountry = async (req, res) => {
    try {
        const { name, code } = req.body;
        await Country.update({ name, code }, { where: { id: req.params.id } });
        res.json({ message: 'Country updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a country
exports.deleteCountry = async (req, res) => {
    try {
        await Country.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Country deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
