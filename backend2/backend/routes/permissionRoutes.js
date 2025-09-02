// routes/permissionRoutes.js
const express = require('express');
const router = express.Router();
const {
  createPermission,
  getAllPermissions,
  deletePermission
} = require('../controllers/permissionController');  // Import the controller methods

// Define routes and connect them to the controller methods
router.post('/', createPermission);  // Route to create a permission
router.get('/', getAllPermissions);  // Route to get all permissions
router.delete('/:id', deletePermission);  // Route to delete a permission by ID

module.exports = router;
