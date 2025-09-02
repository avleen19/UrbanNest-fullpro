// routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const { createRole, getAllRoles, deleteRole } = require('../controllers/roleController');

// Define the routes and connect them to the controller methods
router.post('/', createRole);
router.get('/', getAllRoles);
router.delete('/:id', deleteRole);

module.exports = router;
