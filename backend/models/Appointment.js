const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Patient ID is required']
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: [true, 'Doctor ID is required']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: [
      'Cardiology',
      'Neurology',
      'Orthopedics',
      'Pediatrics',
      'Gynecology',
      'Dermatology',
      'Psychiatry',
      'General Medicine',
      'ENT',
      'Ophthalmology',
      'Dentistry',
      'Urology'
    ]
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  appointmentTime: {
    type: String,
    required: [true, 'Appointment time is required']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'cancelled', 'completed'],
    default: 'pending'
  },
  consultationType: {
    type: String,
    enum: ['in-person', 'video', 'phone'],
    default: 'in-person'
  },
  symptoms: {
    type: String,
    maxlength: [500, 'Symptoms description cannot exceed 500 characters']
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  prescription: {
    medicines: [{
      name: String,
      dosage: String,
      duration: String,
      instructions: String
    }],
    advice: String,
    followUpDate: Date
  },
  fee: {
    type: Number,
    required: [true, 'Consultation fee is required']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'online', 'insurance'],
    default: 'cash'
  },
  reminderSent: {
    type: Boolean,
    default: false
  },
  cancellationReason: {
    type: String,
    maxlength: [300, 'Cancellation reason cannot exceed 300 characters']
  },
  cancelledBy: {
    type: String,
    enum: ['patient', 'doctor', 'admin'],
    default: null
  }
}, {
  timestamps: true
});

// Index for efficient queries
appointmentSchema.index({ patientId: 1, status: 1 });
appointmentSchema.index({ doctorId: 1, appointmentDate: 1 });
appointmentSchema.index({ appointmentDate: 1, status: 1 });

// Virtual for formatted appointment datetime
appointmentSchema.virtual('formattedDateTime').get(function() {
  const date = this.appointmentDate.toLocaleDateString();
  const time = this.appointmentTime;
  return `${date} at ${time}`;
});

// Pre-save middleware to validate appointment date
appointmentSchema.pre('save', function(next) {
  if (this.appointmentDate < new Date()) {
    return next(new Error('Appointment date cannot be in the past'));
  }
  next();
});

module.exports = mongoose.model('Appointment', appointmentSchema);