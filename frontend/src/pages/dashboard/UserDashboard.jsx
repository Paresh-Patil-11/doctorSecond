import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useUserProfile } from '../../hooks/useUserProfile'
import { useAppointments } from '../../hooks/useAppointments'
import { formatDate, formatTime, formatAppointmentStatus } from '../../utils/helpers'
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Edit,
  LogOut,
  ChevronRight,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

const UserDashboard = () => {
  const { user, logout } = useAuth()
  const { profile, loading: profileLoading } = useUserProfile()
  const { appointments, loading: appointmentsLoading } = useAppointments('user')
  const [activeTab, setActiveTab] = useState('overview')

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'approved':
        return <AlertCircle className="w-5 h-5 text-blue-500" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />
    }
  }

  const upcomingAppointments = appointments?.filter(apt => 
    ['pending', 'approved'].includes(apt.status)
  ) || []

  const recentAppointments = appointments?.slice(0, 5) || []

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {profile?.name || user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your appointments and health information
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'appointments'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Appointments
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile
            </button>
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                    <p className="text-2xl font-semibold text-gray-900">{appointments?.length || 0}</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Upcoming</p>
                    <p className="text-2xl font-semibold text-gray-900">{upcomingAppointments.length}</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {appointments?.filter(apt => apt.status === 'completed').length || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 rounded-full">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Cancelled</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {appointments?.filter(apt => apt.status === 'cancelled').length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/book-appointment"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-primary mr-3" />
                    <span className="font-medium">Book Appointment</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>

                <Link
                  to="/team"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-primary mr-3" />
                    <span className="font-medium">Find Doctors</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>

                <Link
                  to="/services"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <div className="flex items-center">
                    <Activity className="w-5 h-5 text-primary mr-3" />
                    <span className="font-medium">Our Services</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              </div>
            </div>

            {/* Recent Appointments */}
            <div className="card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Appointments</h2>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="text-primary hover:text-primary-dark font-medium text-sm"
                >
                  View All
                </button>
              </div>
              
              {appointmentsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
              ) : recentAppointments.length > 0 ? (
                <div className="space-y-4">
                  {recentAppointments.map((appointment) => (
                    <div key={appointment._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            {getStatusIcon(appointment.status)}
                            <span className="ml-2 font-medium">{appointment.doctorId?.name}</span>
                            <span className="ml-auto text-sm text-gray-500">
                              {formatAppointmentStatus(appointment.status).text}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {appointment.doctorId?.specialization}
                          </p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(appointment.appointmentDate)}
                            <Clock className="w-4 h-4 ml-3 mr-1" />
                            {formatTime(appointment.appointmentTime)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No appointments yet</p>
                  <Link
                    to="/book-appointment"
                    className="btn-primary mt-4 inline-block"
                  >
                    Book Your First Appointment
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6">All Appointments</h2>
            
            {appointmentsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : appointments?.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          {getStatusIcon(appointment.status)}
                          <span className="ml-2 font-medium">{appointment.doctorId?.name}</span>
                          <span className="ml-auto text-sm text-gray-500">
                            {formatAppointmentStatus(appointment.status).text}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {appointment.doctorId?.specialization}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(appointment.appointmentDate)}
                          <Clock className="w-4 h-4 ml-3 mr-1" />
                          {formatTime(appointment.appointmentTime)}
                        </div>
                        {appointment.symptoms && (
                          <p className="text-sm text-gray-600 mt-2">
                            <strong>Symptoms:</strong> {appointment.symptoms}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No appointments found</p>
                <Link
                  to="/book-appointment"
                  className="btn-primary mt-4 inline-block"
                >
                  Book an Appointment
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-gray-900">{profile?.name || user?.name}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-gray-900">{profile?.email || user?.email}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-gray-900">{profile?.phone || user?.phone}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-gray-900">
                          {profile?.dateOfBirth ? formatDate(profile.dateOfBirth) : 'Not provided'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {profile?.address && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                        <span className="text-gray-900">
                          {[
                            profile.address.street,
                            profile.address.city,
                            profile.address.state,
                            profile.address.zipCode
                          ].filter(Boolean).join(', ')}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="pt-4">
                    <button className="btn-primary">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Change Password</span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>
                  
                  <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Download Records</span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 border border-red-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-all text-red-600"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Logout</span>
                      <LogOut className="w-5 h-5" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDashboard