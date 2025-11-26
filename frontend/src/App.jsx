import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// Public Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Team from './pages/Team'
import Contact from './pages/Contact'
import WhyChooseUs from './pages/WhyChooseUs'
import FAQ from './pages/FAQ'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'

// Authentication Pages
import UserLogin from './pages/auth/UserLogin'
import UserRegister from './pages/auth/UserRegister'
import DoctorLogin from './pages/auth/DoctorLogin'
import DoctorRegister from './pages/auth/DoctorRegister'
import AdminLogin from './pages/auth/AdminLogin'

// Appointment
import BookAppointment from './pages/BookAppointment'

// Dashboard Pages
import UserDashboard from './pages/dashboard/UserDashboard'
import DoctorDashboard from './pages/dashboard/DoctorDashboard'
import AdminDashboard from './pages/dashboard/AdminDashboard'

// Protected Routes
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/why-choose-us" element={<WhyChooseUs />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                
                {/* Authentication Routes */}
                <Route path="/login/user" element={<UserLogin />} />
                <Route path="/register/user" element={<UserRegister />} />
                <Route path="/login/doctor" element={<DoctorLogin />} />
                <Route path="/register/doctor" element={<DoctorRegister />} />
                <Route path="/login/admin" element={<AdminLogin />} />
                
                {/* Appointment Route */}
                <Route path="/book-appointment" element={<BookAppointment />} />
                
                {/* Protected Dashboard Routes */}
                <Route
                  path="/dashboard/user"
                  element={
                    <ProtectedRoute role="user">
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/doctor"
                  element={
                    <ProtectedRoute role="doctor">
                      <DoctorDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/admin"
                  element={
                    <ProtectedRoute role="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                
                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App