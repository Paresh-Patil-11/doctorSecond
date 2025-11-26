import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { useDoctors } from '../hooks/useDoctors'
import { appointmentAPI } from '../utils/api'
import { format, addDays } from 'date-fns'
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MessageSquare,
  Stethoscope,
  MapPin,
  CreditCard
} from 'lucide-react'
import toast from 'react-hot-toast'

const BookAppointment = () => {
  const { user, isAuthenticated, role } = useAuth()
  const navigate = useNavigate()
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [availableTimes, setAvailableTimes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  const { doctors, loading: doctorsLoading } = useDoctors()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm()

  const watchedDoctor = watch('doctorId')
  const watchedDate = watch('appointmentDate')
  const watchedTime = watch('appointmentTime')

  // Generate available dates (next 30 days, excluding weekends)
  const generateAvailableDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 1; i <= 30; i++) {
      const date = addDays(today, i)
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date)
      }
    }
    
    return dates
  }

  const availableDates = generateAvailableDates()

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        slots.push(time)
      }
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  useEffect(() => {
    if (watchedDate) {
      setAvailableTimes(timeSlots)
    }
  }, [watchedDate])

  useEffect(() => {
    if (watchedDoctor) {
      const doctor = doctors.find(d => d._id === watchedDoctor)
      setSelectedDoctor(doctor)
      setValue('department', doctor?.specialization || '')
    }
  }, [watchedDoctor, doctors, setValue])

  useEffect(() => {
    if (isAuthenticated && user) {
      setValue('patientName', user.name)
      setValue('email', user.email)
      setValue('phone', user.phone)
    }
  }, [isAuthenticated, user, setValue])

  const onSubmit = async (data) => {
    if (!isAuthenticated) {
      toast.error('Please login to book an appointment')
      navigate('/login/user')
      return
    }

    if (role !== 'user') {
      toast.error('Only patients can book appointments')
      return
    }

    setIsLoading(true)
    try {
      const appointmentData = {
        doctorId: data.doctorId,
        department: data.department,
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        consultationType: data.consultationType || 'in-person',
        symptoms: data.symptoms || '',
        notes: data.notes || ''
      }

      const response = await appointmentAPI.book(appointmentData)
      
      if (response.data.success) {
        toast.success('Appointment booked successfully!')
        navigate('/dashboard/user')
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to book appointment'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please Login to Book Appointment
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in as a patient to book an appointment.
          </p>
          <button
            onClick={() => navigate('/login/user')}
            className="btn-primary"
          >
            Login as Patient
          </button>
        </div>
      </div>
    )
  }

  if (role !== 'user') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            Only patients can book appointments.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Book Appointment
          </h1>
          <p className="text-xl text-gray-600">
            Schedule your consultation with our expert doctors
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Doctor Selection */}
          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Stethoscope className="w-6 h-6 mr-2 text-primary" />
              Select Doctor
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctorsLoading ? (
                <div className="col-span-2 text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading doctors...</p>
                </div>
              ) : doctors && doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <div
                    key={doctor._id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      watchedDoctor === doctor._id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setValue('doctorId', doctor._id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialization}</p>
                        <p className="text-sm text-gray-500">
                          {doctor.qualification?.join(', ')}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-primary font-medium">
                            ₹{doctor.consultationFee}
                          </span>
                          <span className="text-xs text-gray-500">
                            {doctor.experience} years exp.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8">
                  <p className="text-gray-600">No doctors available at the moment</p>
                </div>
              )}
            </div>

            <input
              {...register('doctorId', { required: 'Please select a doctor' })}
              type="hidden"
            />
            {errors.doctorId && (
              <p className="text-red-600 text-sm mt-2">{errors.doctorId.message}</p>
            )}

            {selectedDoctor && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Selected Doctor</h4>
                <p className="text-blue-700">
                  Dr. {selectedDoctor.name} - {selectedDoctor.specialization}
                </p>
                <p className="text-blue-600 text-sm">
                  Consultation Fee: ₹{selectedDoctor.consultationFee}
                </p>
              </div>
            )}
          </div>

          {/* Date & Time Selection */}
          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-primary" />
              Select Date & Time
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                  {availableDates.map((date) => (
                    <button
                      key={date.toISOString()}
                      type="button"
                      onClick={() => {
                        setValue('appointmentDate', format(date, 'yyyy-MM-dd'))
                        setSelectedDate(format(date, 'yyyy-MM-dd'))
                      }}
                      className={`p-2 text-sm rounded-lg border transition-all ${
                        watchedDate === format(date, 'yyyy-MM-dd')
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">
                        {format(date, 'MMM dd')}
                      </div>
                      <div className="text-xs opacity-75">
                        {format(date, 'EEEE')}
                      </div>
                    </button>
                  ))}
                </div>
                <input
                  {...register('appointmentDate', { required: 'Please select a date' })}
                  type="hidden"
                />
                {errors.appointmentDate && (
                  <p className="text-red-600 text-sm mt-2">{errors.appointmentDate.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time
                </label>
                <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => {
                        setValue('appointmentTime', time)
                        setSelectedTime(time)
                      }}
                      disabled={!watchedDate}
                      className={`p-2 text-sm rounded-lg border transition-all ${
                        !watchedDate
                          ? 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                          : watchedTime === time
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <input
                  {...register('appointmentTime', { required: 'Please select a time' })}
                  type="hidden"
                />
                {errors.appointmentTime && (
                  <p className="text-red-600 text-sm mt-2">{errors.appointmentTime.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <User className="w-6 h-6 mr-2 text-primary" />
              Patient Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  {...register('patientName', { required: 'Name is required' })}
                  type="text"
                  className="input-field"
                  placeholder="Enter your full name"
                  readOnly
                />
                {errors.patientName && (
                  <p className="text-red-600 text-sm mt-1">{errors.patientName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  className="input-field"
                  placeholder="Enter your email"
                  readOnly
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Please enter a valid 10-digit phone number',
                    },
                  })}
                  type="tel"
                  className="input-field"
                  placeholder="Enter your phone number"
                  readOnly
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consultation Type
                </label>
                <select
                  {...register('consultationType')}
                  className="input-field"
                >
                  <option value="in-person">In-Person</option>
                  <option value="video">Video Consultation</option>
                  <option value="phone">Phone Consultation</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Symptoms / Reason for Visit (Optional)
              </label>
              <textarea
                {...register('symptoms')}
                rows={3}
                className="input-field"
                placeholder="Describe your symptoms or reason for consultation..."
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                {...register('notes')}
                rows={3}
                className="input-field"
                placeholder="Any additional information you'd like to share..."
              />
            </div>
          </div>

          {/* Consultation Fee Summary */}
          {selectedDoctor && (
            <div className="card p-6 bg-green-50 border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-4">
                Consultation Fee Summary
              </h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-green-700">
                    Doctor: Dr. {selectedDoctor.name}
                  </p>
                  <p className="text-green-600 text-sm">
                    {selectedDoctor.specialization}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-900">
                    ₹{selectedDoctor.consultationFee}
                  </p>
                  <p className="text-green-600 text-sm">
                    Consultation Fee
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading || !selectedDoctor || !selectedDate || !selectedTime}
              className="btn-primary px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Booking Appointment...
                </div>
              ) : (
                'Book Appointment'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookAppointment