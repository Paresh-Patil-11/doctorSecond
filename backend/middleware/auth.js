const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Doctor = require('../models/Doctor');

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  let token;

  // Get token from header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if it's a user or doctor token
    if (decoded.role === 'user') {
      req.user = await User.findById(decoded.id);
    } else if (decoded.role === 'doctor') {
      req.user = await Doctor.findById(decoded.id);
    } else if (decoded.role === 'admin') {
      req.user = { role: 'admin', id: decoded.id };
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. User not found.'
      });
    }

    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token.'
    });
  }
};

// Role-based access control
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. ${req.userRole} role is not authorized.`
      });
    }
    next();
  };
};

// Optional authentication - doesn't fail if no token
const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role === 'user') {
      req.user = await User.findById(decoded.id);
    } else if (decoded.role === 'doctor') {
      req.user = await Doctor.findById(decoded.id);
    } else if (decoded.role === 'admin') {
      req.user = { role: 'admin', id: decoded.id };
    }

    req.userRole = decoded.role;
  } catch (error) {
    // Token is invalid, but we don't fail the request
    return next();
  }

  next();
};

module.exports = {
  protect,
  authorize,
  optionalAuth
};