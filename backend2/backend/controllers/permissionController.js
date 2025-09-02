// controllers/permissionController.js
const Permission = require('../models/permissionModel');

exports.createPermission = async (req, res) => {
  try {
    console.log('Request Body:', req.body);  

    const { Permission: permissionName } = req.body; 

    if (!permissionName) {
      return res.status(400).json({ error: "Permission name is required" });
    }

    // // Log model methods to confirm the 'create' method is available
    // console.log("Permission Model Methods:", Object.getOwnPropertyNames(Permission.prototype));

    // Create the permission
    const newPermission = await Permission.create({ Permission: permissionName });

    res.status(201).json({
      message: "Permission created",
      data: newPermission
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};




// Get all permissions
exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();  // Find all permissions
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Permission
exports.deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findByPk(id);

    if (!permission) {
      return res.status(404).json({ error: "Permission not found" });
    }

    await permission.destroy();  // Delete the permission
    res.json({ message: "Permission deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
