// controllers/roleController.js
const Role = require('../models/roleModel');

exports.createRole = async (req, res) => {
  try {
    const { RoleName } = req.body;
    console.log("Received RoleName:", RoleName); // Debugging line
    const newRole = await Role.create({ RoleName });
    res.status(201).json();
  } catch (error) {
    console.error("Error:", error); // Additional error debugging
    res.status(500).json({ error: error.message });
  }
};

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Role
exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    await role.destroy();
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
