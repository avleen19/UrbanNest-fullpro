// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const onlyAdmin = (req, res, next) => {
  if (req.user?.roleId !== 1) return res.status(403).json({ error: "Admin access only" });
  next();
};

module.exports = { verifyToken, onlyAdmin }; // ✅ EXPORT CORRECTLY
