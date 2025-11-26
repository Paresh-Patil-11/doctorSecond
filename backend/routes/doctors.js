const express = require('express');
const { body, validationResult } = require('express-validator');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/doctors
// @desc    Get all approved doctors (public)
router.get('/', async (req, res) => {
  try {
    const { specialization, page = 1, limit = 10, search } = req.query;

    // Build filter
    const filter = { isApproved: true, isActive: true };
    if (specialization) {
      filter.specialization = specialization;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } }
      ];
    }

    const doctors = await Doctor.find(filter)
      .select('-password')
      .sort({ rating: -1, totalReviews: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Doctor.countDocuments(filter);

    res.json({
      success: true,
      doctors,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching doctors'
    });
  }
});

// @route   GET /api/doctors/:id
// @desc    Get single doctor details
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .select('-password');

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Get doctor's appointment statistics
    const stats = await Appointment.aggregate([
      { $match: { doctorId: doctor._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const appointmentStats = {
      total: 0,
      pending: 0,
      approved: 0,
      completed: 0,
      cancelled: 0
    };

    stats.forEach(stat => {
      appointmentStats[stat._id] = stat.count;
      appointmentStats.total += stat.count;
    });

    res.json({
      success: true,
      doctor: {
        ...doctor.toObject(),
        appointmentStats
      }
    });
  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching doctor'
    });
  }
});

// @route   GET /api/doctors/profile
// @desc    Get doctor profile (protected)
router.get('/profile', protect, authorize('doctor'), async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user._id)
      .select('-password');

    // Get today's appointments
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayAppointments = await Appointment.countDocuments({
      doctorId: req.user._id,
      appointmentDate: {
        $gte: today,
        $lt: tomorrow
      }
    });

    // Get total appointments
    const totalAppointments = await Appointment.countDocuments({
      doctorId: req.user._id
    });

    // Get completed appointments
    const completedAppointments = await Appointment.countDocuments({
      doctorId: req.user._id,
      status: 'completed'
    });

    res.json({
      success: true,
      doctor: {
        ...doctor.toObject(),
        stats: {
          todayAppointments,
          totalAppointments,
          completedAppointments
        }
      }
    });
  } catch (error) {
    console.error('Get doctor profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
});

// @route   PUT /api/doctors/profile
// @desc    Update doctor profile
router.put('/profile', protect, authorize('doctor'), [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('phone').optional().matches(/^[0-9]{10}$/).withMessage('Please enter a valid 10-digit phone number'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('consultationFee').optional().isFloat({ min: 0 }).withMessage('Consultation fee must be positive')
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

    const { name, phone, email, bio, consultationFee, availability } = req.body;
    
    // Build update object
    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (email) updateData.email = email;
    if (bio) updateData.bio = bio;
    if (consultationFee) updateData.consultationFee = consultationFee;
    if (availability) updateData.availability = availability;

    // Check if email or phone already exists (if being updated)
    if (email || phone) {
      const existingDoctor = await Doctor.findOne({
        _id: { $ne: req.user._id },
        $or: [
          ...(email ? [{ email }] : []),
          ...(phone ? [{ phone }] : [])
        ]
      });

      if (existingDoctor) {
        return res.status(400).json({
          success: false,
          message: 'Email or phone already exists'
        });
      }
    }

    const doctor = await Doctor.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      doctor
    });
  } catch (error) {
    console.error('Update doctor profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
});

// @route   PUT /api/doctors/password
// @desc    Update doctor password
router.put('/password', protect, authorize('doctor'), [
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

    // Get doctor with password
    const doctor = await Doctor.findById(req.user._id).select('+password');

    // Check current password
    if (!(await doctor.comparePassword(currentPassword))) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    doctor.password = newPassword;
    await doctor.save();

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Update doctor password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating password'
    });
  }
});

// @route   GET /api/doctors/specializations
// @desc    Get all specializations
router.get('/specializations/list', async (req, res) => {
  try {
    const specializations = await Doctor.distinct('specialization', {
      isApproved: true,
      isActive: true
    });

    res.json({
      success: true,
      specializations
    });
  } catch (error) {
    console.error('Get specializations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching specializations'
    });
  }
});

// @route   GET /api/doctors/availability/:id
// @desc    Get doctor availability
router.get('/availability/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .select('availability name');

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.json({
      success: true,
      availability: doctor.availability,
      doctorName: doctor.name
    });
  } catch (error) {
    console.error('Get doctor availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching availability'
    });
  }
});

module.exports = router;