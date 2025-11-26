import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Loader2 } from 'lucide-react'

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, role: userRole, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login/user" replace />
  }

  if (role && userRole !== role) {
    // Redirect to appropriate dashboard based on user role
    switch (userRole) {
      case 'user':
        return <Navigate to="/dashboard/user" replace />
      case 'doctor':
        return <Navigate to="/dashboard/doctor" replace />
      case 'admin':
        return <Navigate to="/dashboard/admin" replace />
      default:
        return <Navigate to="/login/user" replace />
    }
  }

  return children
}

export default ProtectedRoute