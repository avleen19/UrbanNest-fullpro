const Region = require('../models/region');



exports.getRegions = async (req, res) => {
    console.log("🔍 Fetching all regions...");
    try {
        const regions = await Region.findAll();
        console.log("✅ Regions found:", regions);
        res.status(200).json(regions);
    } catch (error) {
        console.error("❌ Error fetching regions:", error);
        res.status(500).json({ error: 'Failed to fetch regions', details: error.message });
    }
};

// Get a single region by ID
exports.getRegionById = async (req, res) => {
    try {
        const region = await Region.findByPk(req.params.id);
        if (!region) {
            return res.status(404).json({ error: 'Region not found' });
        }
        res.status(200).json(region);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch region', details: error.message });
    }
};

// Create a new region
exports.createRegion = async (req, res) => {
    try {
        const { RegionName } = req.body;
        if (!RegionName) {
            return res.status(400).json({ error: 'RegionName is required' });
        }
        const newRegion = await Region.create({ RegionName });
        res.status(201).json(newRegion);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create region', details: error.message });
    }
};

// Update a region by ID
exports.updateRegion = async (req, res) => {
    try {
        const { RegionName } = req.body;
        const region = await Region.findByPk(req.params.id);
        if (!region) {
            return res.status(404).json({ error: 'Region not found' });
        }
        region.RegionName = RegionName;
        await region.save();
        res.status(200).json(region);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update region', details: error.message });
    }
};

// Delete a region by ID
exports.deleteRegion = async (req, res) => {
    try {
        const region = await Region.findByPk(req.params.id);
        if (!region) {
            return res.status(404).json({ error: 'Region not found' });
        }
        await region.destroy();
        res.status(200).json({ message: 'Region deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete region', details: error.message });
    }
};
