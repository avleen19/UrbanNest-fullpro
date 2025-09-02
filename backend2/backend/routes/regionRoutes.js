const express = require('express');
const router = express.Router();
const regionController = require('../controllers/regionController'); // Ensure correct path

// Define routes
router.get('/', regionController.getRegions);
router.post('/', regionController.createRegion);
router.get('/:id', regionController.getRegionById);
router.put('/:id', regionController.updateRegion);
router.delete('/:id', regionController.deleteRegion);

module.exports = router;
