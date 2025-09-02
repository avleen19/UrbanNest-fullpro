const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

// Register
const registerUser = async (req, res) => {
  const { name, email, password, roleId } = req.body;

  if (!name || !email || !password || !roleId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roleId,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user.id, name: user.name, email: user.email, roleId: user.roleId },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, email: user.email, roleId: user.roleId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email, roleId: user.roleId },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

console.log("✅ Inside userController.js");
console.log("✅ registerUser type:", typeof registerUser);
console.log("✅ loginUser type:", typeof loginUser);

module.exports = {
  registerUser,
  loginUser,
};
