import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Menu, 
  X, 
  User, 
  Stethoscope, 
  Shield, 
  Calendar,
  ChevronDown
} from 'lucide-react'

const Navbar = () => {
  const { user, role, isAuthenticated, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
  const location = useLocation()

  const isActiveLink = (path) => {
    return location.pathname === path
  }

  const handleLogout = () => {
    logout()
    setIsDropdownOpen(false)
    setIsMenuOpen(false)
  }

  const getDashboardLink = () => {
    switch (role) {
      case 'user':
        return '/dashboard/user'
      case 'doctor':
        return '/dashboard/doctor'
      case 'admin':
        return '/dashboard/admin'
      default:
        return '/login/user'
    }
  }

  const getRoleIcon = () => {
    switch (role) {
      case 'user':
        return <User className="w-4 h-4" />
      case 'doctor':
        return <Stethoscope className="w-4 h-4" />
      case 'admin':
        return <Shield className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">Shashwati Healthcare</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`nav-link ${isActiveLink('/') ? 'text-primary dark:text-primary-light' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`nav-link ${isActiveLink('/about') ? 'text-primary dark:text-primary-light' : ''}`}
            >
              About
            </Link>
            <Link
              to="/services"
              className={`nav-link ${isActiveLink('/services') ? 'text-primary dark:text-primary-light' : ''}`}
            >
              Services
            </Link>
            <Link
              to="/team"
              className={`nav-link ${isActiveLink('/team') ? 'text-primary dark:text-primary-light' : ''}`}
            >
              Team
            </Link>
            <Link
              to="/contact"
              className={`nav-link ${isActiveLink('/contact') ? 'text-primary dark:text-primary-light' : ''}`}
            >
              Contact
            </Link>
            <Link
              to="/book-appointment"
              className="btn-primary"
            >
              Book Appointment
            </Link>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Authenticated User */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {getRoleIcon()}
                  <span className="text-sm font-medium dark:text-white">{user.name}</span>
                  <ChevronDown className="w-4 h-4 dark:text-white" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700">
                    <Link
                      to={getDashboardLink()}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login/user"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register/user"
                  className="btn-primary"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className={`nav-link ${isActiveLink('/') ? 'text-primary dark:text-primary-light' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`nav-link ${isActiveLink('/about') ? 'text-primary dark:text-primary-light' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/services"
                className={`nav-link ${isActiveLink('/services') ? 'text-primary dark:text-primary-light' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/team"
                className={`nav-link ${isActiveLink('/team') ? 'text-primary dark:text-primary-light' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Team
              </Link>
              <Link
                to="/contact"
                className={`nav-link ${isActiveLink('/contact') ? 'text-primary dark:text-primary-light' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/book-appointment"
                className="btn-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Appointment
              </Link>

              {isAuthenticated && user ? (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                    <div className="flex items-center space-x-2 px-2">
                      {getRoleIcon()}
                      <span className="text-sm font-medium dark:text-white">{user.name}</span>
                    </div>
                    <Link
                      to={getDashboardLink()}
                      className="flex items-center space-x-2 px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-2 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex flex-col space-y-2">
                  <Link
                    to="/login/user"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light font-medium px-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register/user"
                    className="btn-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar