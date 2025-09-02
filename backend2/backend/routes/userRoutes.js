const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require('../middleware/authMiddleware');
const User = require("../models/userModel");

// Debug: Make sure functions exist
console.log("✅ registerUser exists:", typeof userController.registerUser); // should be "function"
console.log("✅ loginUser exists:", typeof userController.loginUser);

// Protected route
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'User profile data', user: req.user });
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Auth Routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;
