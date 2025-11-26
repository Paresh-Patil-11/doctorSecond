import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { 
  Users, 
  UserCheck, 
  Calendar, 
  TrendingUp,
  Shield,
  LogOut,
  ChevronRight,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  UserPlus,
  UserX
} from 'lucide-react'

const AdminDashboard = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data
  const stats = {
    totalUsers: 1250,
    totalDoctors: 85,
    pendingDoctors: 12,
    totalAppointments: 3420,
    todayAppointments: 45
  }

  const recentUsers = [
    { _id: '1', name: 'Rajesh Kumar', email: 'rajesh@email.com', phone: '9876543210', isActive: true },
    { _id: '2', name: 'Priya Sharma', email: 'priya@email.com', phone: '9876543211', isActive: true },
    { _id: '3', name: 'Amit Patel', email: 'amit@email.com', phone: '9876543212', isActive: false }
  ]

  const pendingDoctors = [
    { _id: '1', name: 'Dr. Sarah Johnson', specialization: 'Cardiology', experience: 10 },
    { _id: '2', name: 'Dr. Michael Chen', specialization: 'Neurology', experience: 8 },
    { _id: '3', name: 'Dr. Emily Davis', specialization: 'Pediatrics', experience: 12 }
  ]

  const recentAppointments = [
    { _id: '1', patientName: 'Rajesh Kumar', doctorName: 'Dr. Sarah Johnson', date: '2024-01-15', status: 'pending' },
    { _id: '2', patientName: 'Priya Sharma', doctorName: 'Dr. Michael Chen', date: '2024-01-15', status: 'approved' },
    { _id: '3', patientName: 'Amit Patel', doctorName: 'Dr. Emily Davis', date: '2024-01-14', status: 'completed' }
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
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage users, doctors, and system operations
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
              onClick={() => setActiveTab('users')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'doctors'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Doctors
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
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-full">
                    <UserCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Doctors</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalDoctors}</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending Doctors</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.pendingDoctors}</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.todayAppointments}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
                <div className="space-y-3">
                  {recentUsers.map((user) => (
                    <div key={user._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Pending Doctor Approvals</h3>
                <div className="space-y-3">
                  {pendingDoctors.map((doctor) => (
                    <div key={doctor._id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="font-medium">{doctor.name}</p>
                        <p className="text-sm text-gray-600">{doctor.specialization} • {doctor.experience} years</p>
                      </div>
                      <button className="btn-primary text-sm">
                        Review
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">User Management</h2>
              <button className="btn-primary">
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentUsers.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary hover:text-primary-dark mr-3">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Doctors Tab */}
        {activeTab === 'doctors' && (
          <div className="card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Doctor Management</h2>
              <button className="btn-primary">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Doctor
              </button>
            </div>
            
            <div className="space-y-4">
              {pendingDoctors.map((doctor) => (
                <div key={doctor._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.specialization} • {doctor.experience} years experience</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-primary text-sm">
                        Approve
                      </button>
                      <button className="btn-secondary text-sm">
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6">Appointment Management</h2>
            
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div key={appointment._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {getStatusIcon(appointment.status)}
                        <span className="ml-2 font-medium">{appointment.patientName}</span>
                        <span className="mx-2 text-gray-500">•</span>
                        <span className="text-gray-600">{appointment.doctorName}</span>
                        <span className="ml-auto text-sm text-gray-500">
                          {appointment.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all">
                <div className="flex items-center">
                  <UserPlus className="w-5 h-5 text-primary mr-3" />
                  <span className="font-medium">Add New User</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-primary mr-3" />
                  <span className="font-medium">Approve Doctors</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all">
                <div className="flex items-center">
                  <Activity className="w-5 h-5 text-primary mr-3" />
                  <span className="font-medium">View Analytics</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-8 text-center">
          <button
            onClick={logout}
            className="btn-secondary border-red-200 text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout as Admin
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard