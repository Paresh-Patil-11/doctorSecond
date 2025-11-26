import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useUserProfile } from '../../hooks/useUserProfile'
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Edit,
  LogOut,
  ChevronRight,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  TrendingUp
} from 'lucide-react'

const DoctorDashboard = () => {
  const { user, logout } = useAuth()
  const { profile, loading: profileLoading } = useUserProfile()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data for appointments
  const appointments = [
    {
      _id: '1',
      patientId: { name: 'Rajesh Kumar', email: 'rajesh@email.com', phone: '9876543210' },
      appointmentDate: '2024-01-15',
      appointmentTime: '10:00',
      status: 'pending',
      department: 'Cardiology',
      symptoms: 'Chest pain and shortness of breath'
    },
    {
      _id: '2',
      patientId: { name: 'Priya Sharma', email: 'priya@email.com', phone: '9876543211' },
      appointmentDate: '2024-01-15',
      appointmentTime: '11:00',
      status: 'approved',
      department: 'Cardiology',
      symptoms: 'Regular checkup'
    },
    {
      _id: '3',
      patientId: { name: 'Amit Patel', email: 'amit@email.com', phone: '9876543212' },
      appointmentDate: '2024-01-14',
      appointmentTime: '14:00',
      status: 'completed',
      department: 'Cardiology',
      symptoms: 'Follow-up consultation'
    }
  ]

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

  const todayAppointments = appointments.filter(apt => {
    const today = new Date().toISOString().split('T')[0]
    return apt.appointmentDate === today
  })

  const pendingAppointments = appointments.filter(apt => apt.status === 'pending')

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
            Welcome back, Dr. {profile?.name || user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your appointments and patient consultations
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
                    <p className="text-2xl font-semibold text-gray-900">{appointments.length}</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                    <p className="text-2xl font-semibold text-gray-900">{todayAppointments.length}</p>
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
                      {appointments.filter(apt => apt.status === 'completed').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Patients</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {new Set(appointments.map(apt => apt.patientId.name)).size}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Appointments */}
            <div className="card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Today's Appointments</h2>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="text-primary hover:text-primary-dark font-medium text-sm"
                >
                  View All
                </button>
              </div>
              
              {todayAppointments.length > 0 ? (
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            {getStatusIcon(appointment.status)}
                            <span className="ml-2 font-medium">{appointment.patientId.name}</span>
                            <span className="ml-auto text-sm text-gray-500">
                              {appointment.appointmentTime}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {appointment.symptoms}
                          </p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Mail className="w-4 h-4 mr-1" />
                            {appointment.patientId.email}
                            <Phone className="w-4 h-4 ml-3 mr-1" />
                            {appointment.patientId.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No appointments scheduled for today</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6">All Appointments</h2>
            
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {getStatusIcon(appointment.status)}
                        <span className="ml-2 font-medium">{appointment.patientId.name}</span>
                        <span className="ml-auto text-sm text-gray-500">
                          {appointment.appointmentDate} at {appointment.appointmentTime}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Symptoms:</strong> {appointment.symptoms}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="w-4 h-4 mr-1" />
                        {appointment.patientId.email}
                        <Phone className="w-4 h-4 ml-3 mr-1" />
                        {appointment.patientId.phone}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-6">Professional Information</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-gray-900">Dr. {profile?.name || user?.name}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Specialization
                      </label>
                      <span className="text-gray-900">Cardiology</span>
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
                  </div>

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
                      <span className="font-medium">Manage Availability</span>
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

export default DoctorDashboard