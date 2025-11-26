const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/admin/stats
// @desc    Get admin dashboard statistics
router.get('/stats', protect, authorize('admin'), async (req, res) => {
  try {
    // User statistics
    const totalUsers = await User.countDocuments({ isActive: true });
    const newUsersThisMonth = await User.countDocuments({
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    });

    // Doctor statistics
    const totalDoctors = await Doctor.countDocuments({ isApproved: true, isActive: true });
    const pendingDoctors = await Doctor.countDocuments({ isApproved: false });
    const newDoctorsThisMonth = await Doctor.countDocuments({
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    });

    // Appointment statistics
    const totalAppointments = await Appointment.countDocuments();
    const todayAppointments = await Appointment.countDocuments({
      appointmentDate: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59, 999))
      }
    });

    const appointmentStats = await Appointment.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const stats = {
      users: {
        total: totalUsers,
        newThisMonth: newUsersThisMonth
      },
      doctors: {
        total: totalDoctors,
        pending: pendingDoctors,
        newThisMonth: newDoctorsThisMonth
      },
      appointments: {
        total: totalAppointments,
        today: todayAppointments,
        byStatus: appointmentStats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {})
      }
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users
router.get('/users', protect, authorize('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status } = req.query;

    // Build filter
    const filter = {};
    if (status === 'active') {
      filter.isActive = true;
    } else if (status === 'inactive') {
      filter.isActive = false;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      users,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users'
    });
  }
});

// @route   GET /api/admin/users/:id
// @desc    Get single user details
router.get('/users/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate({
        path: 'appointments',
        select: 'appointmentDate status doctorId',
        populate: {
          path: 'doctorId',
          select: 'name specialization'
        }
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's appointment statistics
    const appointmentStats = await Appointment.aggregate([
      { $match: { patientId: user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      user: {
        ...user.toObject(),
        appointmentStats
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user'
    });
  }
});

// @route   PUT /api/admin/users/:id/status
// @desc    Update user status (activate/deactivate)
router.put('/users/:id/status', protect, authorize('admin'), [
  body('isActive').isBoolean().withMessage('Status must be boolean')
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

    const { isActive } = req.body;
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating user status'
    });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
router.delete('/users/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Also delete user's appointments
    await Appointment.deleteMany({ patientId: req.params.id });

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting user'
    });
  }
});

// @route   GET /api/admin/doctors
// @desc    Get all doctors
router.get('/doctors', protect, authorize('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status } = req.query;

    // Build filter
    const filter = {};
    if (status === 'approved') {
      filter.isApproved = true;
    } else if (status === 'pending') {
      filter.isApproved = false;
    } else if (status === 'active') {
      filter.isActive = true;
    } else if (status === 'inactive') {
      filter.isActive = false;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } }
      ];
    }

    const doctors = await Doctor.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
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

// @route   PUT /api/admin/doctors/:id/approve
// @desc    Approve doctor registration
router.put('/doctors/:id/approve', protect, authorize('admin'), async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    ).select('-password');

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.json({
      success: true,
      message: 'Doctor approved successfully',
      doctor
    });
  } catch (error) {
    console.error('Approve doctor error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while approving doctor'
    });
  }
});

// @route   PUT /api/admin/doctors/:id/status
// @desc    Update doctor status (activate/deactivate)
router.put('/doctors/:id/status', protect, authorize('admin'), [
  body('isActive').isBoolean().withMessage('Status must be boolean')
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

    const { isActive } = req.body;
    const { id } = req.params;

    const doctor = await Doctor.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    ).select('-password');

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.json({
      success: true,
      message: `Doctor ${isActive ? 'activated' : 'deactivated'} successfully`,
      doctor
    });
  } catch (error) {
    console.error('Update doctor status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating doctor status'
    });
  }
});

// @route   DELETE /api/admin/doctors/:id
// @desc    Delete doctor
router.delete('/doctors/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Also delete doctor's appointments
    await Appointment.deleteMany({ doctorId: req.params.id });

    res.json({
      success: true,
      message: 'Doctor deleted successfully'
    });
  } catch (error) {
    console.error('Delete doctor error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting doctor'
    });
  }
});

// @route   GET /api/admin/appointments
// @desc    Get all appointments
router.get('/appointments', protect, authorize('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 10, status, date, doctorId, patientId } = req.query;

    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (date) {
      filter.appointmentDate = {
        $gte: new Date(date),
        $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
      };
    }
    if (doctorId) filter.doctorId = doctorId;
    if (patientId) filter.patientId = patientId;

    const appointments = await Appointment.find(filter)
      .populate('patientId', 'name email phone')
      .populate('doctorId', 'name specialization')
      .sort({ appointmentDate: -1, appointmentTime: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Appointment.countDocuments(filter);

    res.json({
      success: true,
      appointments,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching appointments'
    });
  }
});

// @route   GET /api/admin/appointments/:id
// @desc    Get single appointment details
router.get('/appointments/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patientId', 'name email phone address medicalHistory')
      .populate('doctorId', 'name specialization qualification experience');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      appointment
    });
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching appointment'
    });
  }
});

module.exports = router;