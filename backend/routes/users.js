const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
router.get('/profile', protect, authorize('user'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.json({
      success: true,
      user: user.getProfile()
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
router.put('/profile', protect, authorize('user'), [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('phone').optional().matches(/^[0-9]{10}$/).withMessage('Please enter a valid 10-digit phone number'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Please enter a valid email')
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

    const { name, phone, email, dateOfBirth, gender, address, medicalHistory } = req.body;
    
    // Build update object
    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (email) updateData.email = email;
    if (dateOfBirth) updateData.dateOfBirth = new Date(dateOfBirth);
    if (gender) updateData.gender = gender;
    if (address) updateData.address = address;
    if (medicalHistory) updateData.medicalHistory = medicalHistory;

    // Check if email or phone already exists (if being updated)
    if (email || phone) {
      const existingUser = await User.findOne({
        _id: { $ne: req.user._id },
        $or: [
          ...(email ? [{ email }] : []),
          ...(phone ? [{ phone }] : [])
        ]
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email or phone already exists'
        });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: user.getProfile()
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
});

// @route   PUT /api/users/password
// @desc    Update user password
router.put('/password', protect, authorize('user'), [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
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

    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user._id).select('+password');

    // Check current password
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating password'
    });
  }
});

// @route   POST /api/users/avatar
// @desc    Update user avatar
router.post('/avatar', protect, authorize('user'), async (req, res) => {
  try {
    const { avatar } = req.body;

    if (!avatar) {
      return res.status(400).json({
        success: false,
        message: 'Avatar URL is required'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Avatar updated successfully',
      user: user.getProfile()
    });
  } catch (error) {
    console.error('Update avatar error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating avatar'
    });
  }
});

// @route   GET /api/users/stats
// @desc    Get user statistics
router.get('/stats', protect, authorize('user'), async (req, res) => {
  try {
    const Appointment = require('../models/Appointment');

    const totalAppointments = await Appointment.countDocuments({ patientId: req.user._id });
    const upcomingAppointments = await Appointment.countDocuments({
      patientId: req.user._id,
      status: { $in: ['pending', 'approved'] },
      appointmentDate: { $gte: new Date() }
    });
    const completedAppointments = await Appointment.countDocuments({
      patientId: req.user._id,
      status: 'completed'
    });
    const cancelledAppointments = await Appointment.countDocuments({
      patientId: req.user._id,
      status: 'cancelled'
    });

    res.json({
      success: true,
      stats: {
        totalAppointments,
        upcomingAppointments,
        completedAppointments,
        cancelledAppointments
      }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
});

module.exports = router;