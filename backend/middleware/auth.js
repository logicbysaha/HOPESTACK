// middleware/auth.js — Checks if user is logged in before allowing access
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get token from request header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, access denied' });
  }

  try {
    // Verify the token is valid and not expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;  // Attach userId to the request
    next();  // Allow the request to continue
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid' });
  }
};