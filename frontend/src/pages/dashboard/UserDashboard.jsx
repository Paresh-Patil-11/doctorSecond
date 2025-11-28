import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useAppointments } from '../../hooks/useAppointments'
import { format } from 'date-fns'
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
  AlertCircle,
  FileText
} from 'lucide-react'
import toast from 'react-hot-toast'

const UserDashboard = () => {
  const { user, logout } = useAuth()
  const { appointments, loading: appointmentsLoading, refetch } = useAppointments('user')
  const [activeTab, setActiveTab] = useState('overview')
  const [profile, setProfile] = useState(null)
  const [profileLoading, setProfileLoading] = useState(true)

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()
        if (data.success) {
          setProfile(data.user)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setProfileLoading(false)
      }
    }

    fetchProfile()
  }, [])

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

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return statusConfig[status] || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (date) => {
    try {
      return format(new Date(date), 'MMM dd, yyyy')
    } catch {
      return date
    }
  }

  const formatTime = (time) => {
    try {
      const [hours, minutes] = time.split(':')
      const hour = parseInt(hours)
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour % 12 || 12
      return `${displayHour}:${minutes} ${ampm}`
    } catch {
      return time
    }
  }

  const upcomingAppointments = appointments?.filter(apt => 
    ['pending', 'approved'].includes(apt.status)
  ) || []

  const completedAppointments = appointments?.filter(apt => 
    apt.status === 'completed'
  ) || []

  const cancelledAppointments = appointments?.filter(apt => 
    apt.status === 'cancelled'
  ) || []

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${import.meta.env.VITE_API_URL}/appointments/${appointmentId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ reason: 'Cancelled by patient' })
        })
        
        if (response.ok) {
          toast.success('Appointment cancelled successfully')
          refetch()
        }
      } catch (error) {
        toast.error('Failed to cancel appointment')
      }
    }
  }

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {profile?.name || user?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your appointments and health information
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'appointments', 'profile'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-primary text-primary dark:text-primary-light'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Appointments</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{appointments?.length || 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                    <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{upcomingAppointments.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{completedAppointments.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                    <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cancelled</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{cancelledAppointments.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/book-appointment"
                  className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary dark:hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all group"
                >
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-primary mr-3" />
                    <span className="font-medium text-gray-900 dark:text-white">Book Appointment</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  to="/team"
                  className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary dark:hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all group"
                >
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-primary mr-3" />
                    <span className="font-medium text-gray-900 dark:text-white">Find Doctors</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  to="/services"
                  className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary dark:hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all group"
                >
                  <div className="flex items-center">
                    <Activity className="w-5 h-5 text-primary mr-3" />
                    <span className="font-medium text-gray-900 dark:text-white">Our Services</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </Link>
              </div>
            </div>

            {/* Recent Appointments */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Appointments</h2>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="text-primary hover:text-primary-dark dark:text-primary-light font-medium text-sm"
                >
                  View All
                </button>
              </div>
              
              {appointmentsLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Loading appointments...</p>
                </div>
              ) : appointments && appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.slice(0, 5).map((appointment) => (
                    <div key={appointment._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            {getStatusIcon(appointment.status)}
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">
                              {appointment.doctorId?.name || 'Doctor'}
                            </span>
                            <span className={`ml-auto px-2 py-1 text-xs rounded-full ${getStatusBadge(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {appointment.doctorId?.specialization || appointment.department}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
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
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <p className="text-lg mb-4">No appointments yet</p>
                  <Link
                    to="/book-appointment"
                    className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">All Appointments</h2>
            
            {appointmentsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading appointments...</p>
              </div>
            ) : appointments && appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          {getStatusIcon(appointment.status)}
                          <span className="ml-2 font-semibold text-lg text-gray-900 dark:text-white">
                            Dr. {appointment.doctorId?.name || 'Doctor'}
                          </span>
                          <span className={`ml-auto px-3 py-1 text-sm rounded-full font-medium ${getStatusBadge(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          <strong>Specialization:</strong> {appointment.doctorId?.specialization || appointment.department}
                        </p>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(appointment.appointmentDate)}
                          <Clock className="w-4 h-4 ml-4 mr-2" />
                          {formatTime(appointment.appointmentTime)}
                        </div>
                        {appointment.symptoms && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            <strong>Symptoms:</strong> {appointment.symptoms}
                          </p>
                        )}
                        {appointment.status === 'pending' && (
                          <button
                            onClick={() => handleCancelAppointment(appointment._id)}
                            className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                          >
                            Cancel Appointment
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                <p className="text-lg mb-4">No appointments found</p>
                <Link
                  to="/book-appointment"
                  className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
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
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Personal Information</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <div className="flex items-center text-gray-900 dark:text-white">
                        <User className="w-5 h-5 text-gray-400 mr-3" />
                        <span>{profile?.name || user?.name}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="flex items-center text-gray-900 dark:text-white">
                        <Mail className="w-5 h-5 text-gray-400 mr-3" />
                        <span>{profile?.email || user?.email}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <div className="flex items-center text-gray-900 dark:text-white">
                        <Phone className="w-5 h-5 text-gray-400 mr-3" />
                        <span>{profile?.phone || user?.phone}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date of Birth
                      </label>
                      <div className="flex items-center text-gray-900 dark:text-white">
                        <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                        <span>
                          {profile?.dateOfBirth ? formatDate(profile.dateOfBirth) : 'Not provided'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors inline-flex items-center">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Account Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary dark:hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all group">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">Change Password</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                    </div>
                  </button>
                  
                  <button className="w-full text-left px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary dark:hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all group">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">Download Records</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                    </div>
                  </button>

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 border-2 border-red-200 dark:border-red-800 rounded-lg hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-red-600 dark:text-red-400"
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