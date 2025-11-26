const express = require('express');
const { body, validationResult } = require('express-validator');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/appointments
// @desc    Create a new appointment
router.post('/', protect, authorize('user'), [
  body('doctorId').isMongoId().withMessage('Valid doctor ID is required'),
  body('department').notEmpty().withMessage('Department is required'),
  body('appointmentDate').isISO8601().withMessage('Valid appointment date is required'),
  body('appointmentTime').notEmpty().withMessage('Appointment time is required'),
  body('consultationType').isIn(['in-person', 'video', 'phone']).withMessage('Valid consultation type is required')
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

    const { doctorId, department, appointmentDate, appointmentTime, consultationType, symptoms, notes } = req.body;

    // Check if doctor exists and is approved
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    if (!doctor.isApproved || !doctor.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Doctor is not available for appointments'
      });
    }

    // Check if appointment date is in the future
    const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
    if (appointmentDateTime <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Appointment date and time must be in the future'
      });
    }

    // Check for existing appointment at the same time
    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate,
      appointmentTime,
      status: { $in: ['pending', 'approved'] }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked. Please choose another time.'
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      patientId: req.user._id,
      doctorId,
      department,
      appointmentDate,
      appointmentTime,
      consultationType,
      symptoms,
      notes,
      fee: doctor.consultationFee
    });

    // Populate appointment details
    await appointment.populate([
      { path: 'patientId', select: 'name email phone' },
      { path: 'doctorId', select: 'name specialization qualification' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      appointment
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating appointment'
    });
  }
});

// @route   GET /api/appointments/user
// @desc    Get user's appointments
router.get('/user', protect, authorize('user'), async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    // Build filter
    const filter = { patientId: req.user._id };
    if (status) {
      filter.status = status;
    }

    const appointments = await Appointment.find(filter)
      .populate('doctorId', 'name specialization qualification consultationFee')
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
    console.error('Get user appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching appointments'
    });
  }
});

// @route   GET /api/appointments/doctor
// @desc    Get doctor's appointments
router.get('/doctor', protect, authorize('doctor'), async (req, res) => {
  try {
    const { status, date, page = 1, limit = 10 } = req.query;
    
    // Build filter
    const filter = { doctorId: req.user._id };
    if (status) {
      filter.status = status;
    }
    if (date) {
      filter.appointmentDate = {
        $gte: new Date(date),
        $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
      };
    }

    const appointments = await Appointment.find(filter)
      .populate('patientId', 'name email phone age gender')
      .sort({ appointmentDate: 1, appointmentTime: 1 })
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
    console.error('Get doctor appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching appointments'
    });
  }
});

// @route   PUT /api/appointments/:id/status
// @desc    Update appointment status (doctor only)
router.put('/:id/status', protect, authorize('doctor'), [
  body('status').isIn(['approved', 'cancelled', 'completed']).withMessage('Valid status is required')
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

    const { status } = req.body;
    const { id } = req.params;

    // Find appointment
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if appointment belongs to the doctor
    if (appointment.doctorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this appointment'
      });
    }

    // Update appointment status
    appointment.status = status;
    
    if (status === 'cancelled' && req.body.cancellationReason) {
      appointment.cancellationReason = req.body.cancellationReason;
      appointment.cancelledBy = 'doctor';
    }

    await appointment.save();

    // Populate updated appointment
    await appointment.populate([
      { path: 'patientId', select: 'name email phone' },
      { path: 'doctorId', select: 'name specialization' }
    ]);

    res.json({
      success: true,
      message: `Appointment ${status} successfully`,
      appointment
    });
  } catch (error) {
    console.error('Update appointment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating appointment'
    });
  }
});

// @route   PUT /api/appointments/:id/prescription
// @desc    Add prescription to appointment (doctor only)
router.put('/:id/prescription', protect, authorize('doctor'), [
  body('medicines').isArray().withMessage('Medicines must be an array'),
  body('medicines.*.name').notEmpty().withMessage('Medicine name is required'),
  body('medicines.*.dosage').notEmpty().withMessage('Dosage is required'),
  body('medicines.*.duration').notEmpty().withMessage('Duration is required')
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

    const { medicines, advice, followUpDate } = req.body;
    const { id } = req.params;

    // Find appointment
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if appointment belongs to the doctor
    if (appointment.doctorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this appointment'
      });
    }

    // Update prescription
    appointment.prescription = {
      medicines,
      advice,
      followUpDate: followUpDate ? new Date(followUpDate) : null
    };

    // Mark appointment as completed if prescription is added
    appointment.status = 'completed';
    await appointment.save();

    // Populate updated appointment
    await appointment.populate([
      { path: 'patientId', select: 'name email phone' },
      { path: 'doctorId', select: 'name specialization' }
    ]);

    res.json({
      success: true,
      message: 'Prescription added successfully',
      appointment
    });
  } catch (error) {
    console.error('Add prescription error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding prescription'
    });
  }
});

// @route   DELETE /api/appointments/:id
// @desc    Cancel appointment (user only)
router.delete('/:id', protect, authorize('user'), async (req, res) => {
  try {
    const { id } = req.params;

    // Find appointment
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if appointment belongs to the user
    if (appointment.patientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this appointment'
      });
    }

    // Check if appointment can be cancelled (only pending or approved)
    if (!['pending', 'approved'].includes(appointment.status)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel completed or already cancelled appointment'
      });
    }

    // Update appointment status
    appointment.status = 'cancelled';
    appointment.cancellationReason = req.body.reason || 'Cancelled by patient';
    appointment.cancelledBy = 'patient';
    await appointment.save();

    res.json({
      success: true,
      message: 'Appointment cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling appointment'
    });
  }
});

// @route   GET /api/appointments/:id
// @desc    Get single appointment details
router.get('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id)
      .populate('patientId', 'name email phone age gender address')
      .populate('doctorId', 'name specialization qualification experience consultationFee');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check authorization
    if (req.userRole === 'user' && appointment.patientId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this appointment'
      });
    }

    if (req.userRole === 'doctor' && appointment.doctorId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this appointment'
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