const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// @route   POST /api/auth/register/user
// @desc    Register a new user
router.post('/register/user', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('phone').matches(/^[0-9]{10}$/).withMessage('Please enter a valid 10-digit phone number'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or phone already exists'
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      phone,
      password
    });

    // Generate token
    const token = generateToken(user._id, 'user');

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: user.getProfile()
    });
  } catch (error) {
    console.error('User registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// @route   POST /api/auth/register/doctor
// @desc    Register a new doctor
router.post('/register/doctor', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('phone').matches(/^[0-9]{10}$/).withMessage('Please enter a valid 10-digit phone number'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('specialization').notEmpty().withMessage('Specialization is required'),
  body('qualification').isArray({ min: 1 }).withMessage('At least one qualification is required'),
  body('experience').isInt({ min: 0, max: 50 }).withMessage('Experience must be between 0 and 50 years'),
  body('registrationNumber').notEmpty().withMessage('Medical registration number is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, phone, password, specialization, qualification, experience, registrationNumber } = req.body;

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ $or: [{ email }, { phone }, { registrationNumber }] });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: 'Doctor with this email, phone, or registration number already exists'
      });
    }

    // Create new doctor
    const doctor = await Doctor.create({
      name,
      email,
      phone,
      password,
      specialization,
      qualification,
      experience,
      registrationNumber
    });

    // Generate token
    const token = generateToken(doctor._id, 'doctor');

    res.status(201).json({
      success: true,
      message: 'Doctor registered successfully. Please wait for admin approval.',
      token,
      doctor: doctor.getProfile()
    });
  } catch (error) {
    console.error('Doctor registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// @route   POST /api/auth/login/user
// @desc    Login user
router.post('/login/user', [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user with password
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Your account has been deactivated. Please contact support.'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id, 'user');

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: user.getProfile()
    });
  } catch (error) {
    console.error('User login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// @route   POST /api/auth/login/doctor
// @desc    Login doctor
router.post('/login/doctor', [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find doctor with password
    const doctor = await Doctor.findOne({ email }).select('+password');

    if (!doctor || !(await doctor.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if doctor is approved and active
    if (!doctor.isApproved) {
      return res.status(401).json({
        success: false,
        message: 'Your account is pending approval. Please wait for admin approval.'
      });
    }

    if (!doctor.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Your account has been deactivated. Please contact support.'
      });
    }

    // Update last login
    doctor.lastLogin = new Date();
    await doctor.save();

    // Generate token
    const token = generateToken(doctor._id, 'doctor');

    res.json({
      success: true,
      message: 'Login successful',
      token,
      doctor: doctor.getProfile()
    });
  } catch (error) {
    console.error('Doctor login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// @route   POST /api/auth/login/admin
// @desc    Login admin (using a default admin account)
router.post('/login/admin', [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // For demo purposes, using hardcoded admin credentials
    // In production, you should have a proper admin model
    if (email === 'admin@shashwati.com' && password === 'admin123') {
      const token = generateToken('admin', 'admin');
      
      res.json({
        success: true,
        message: 'Admin login successful',
        token,
        admin: {
          email: 'admin@shashwati.com',
          name: 'Administrator',
          role: 'admin'
        }
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current logged-in user/doctor/admin
router.get('/me', protect, async (req, res) => {
  try {
    if (req.userRole === 'admin') {
      return res.json({
        success: true,
        user: {
          email: 'admin@shashwati.com',
          name: 'Administrator',
          role: 'admin'
        }
      });
    }

    res.json({
      success: true,
      user: req.user.getProfile(),
      role: req.userRole
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;