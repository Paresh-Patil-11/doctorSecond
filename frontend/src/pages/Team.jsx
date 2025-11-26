import React from 'react'
import { Link } from 'react-router-dom'
import { useDoctors } from '../../hooks/useDoctors'
import { 
  User, 
  Star, 
  MapPin, 
  Calendar,
  Award,
  Heart
} from 'lucide-react'

const Team = () => {
  const { doctors, loading } = useDoctors()

  const specialties = [
    'Cardiology',
    'Neurology', 
    'Orthopedics',
    'Pediatrics',
    'Gynecology',
    'Dermatology',
    'Psychiatry',
    'General Medicine'
  ]

  const getSpecialtyIcon = (specialty) => {
    const iconMap = {
      'Cardiology': '❤️',
      'Neurology': '🧠',
      'Orthopedics': '🦴',
      'Pediatrics': '👶',
      'Gynecology': '👩',
      'Dermatology': '✨',
      'Psychiatry': '🧠',
      'General Medicine': '⚕️'
    }
    return iconMap[specialty] || '⚕️'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading our medical team...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Our Medical Team
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-100 leading-relaxed">
              Meet our team of highly qualified and experienced doctors dedicated to providing 
              the best healthcare services with compassion and expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Specialties Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">Medical Specialties</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We have expert doctors across all major medical specialties to serve your healthcare needs.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {specialties.map((specialty) => (
              <div key={specialty} className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-4xl mb-3">{getSpecialtyIcon(specialty)}</div>
                <h3 className="font-semibold text-gray-800">{specialty}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">Expert Doctors</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team of board-certified physicians with extensive experience in their respective fields.
            </p>
          </div>

          {doctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <div key={doctor._id} className="card p-8 text-center group">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light opacity-20"></div>
                    <User className="w-16 h-16 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">Dr. {doctor.name}</h3>
                  <p className="text-primary font-medium mb-3">{doctor.specialization}</p>
                  
                  <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span>{doctor.rating || 4.5}</span>
                    <span className="mx-2">•</span>
                    <span>{doctor.experience} years exp.</span>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <p className="mb-1">{doctor.qualification?.[0] || 'MBBS, MD'}</p>
                    <p>Reg. No: {doctor.registrationNumber}</p>
                  </div>

                  <div className="text-sm text-gray-600 mb-6">
                    <div className="flex items-center justify-center mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>Bangalore, India</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Available for consultation</span>
                    </div>
                  </div>

                  <div className="text-lg font-semibold text-primary mb-6">
                    Consultation Fee: ₹{doctor.consultationFee}
                  </div>

                  <div className="space-y-3">
                    <Link
                      to={`/book-appointment?doctor=${doctor._id}`}
                      className="btn-primary w-full"
                    >
                      Book Appointment
                    </Link>
                    <Link
                      to={`/doctors/${doctor._id}`}
                      className="btn-secondary w-full"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No doctors available at the moment
              </h3>
              <p className="text-gray-500 mb-6">
                Please check back later or contact us for more information.
              </p>
              <Link to="/contact" className="btn-primary">
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Doctors */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">Why Choose Our Doctors?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our medical team is committed to providing exceptional healthcare with expertise and compassion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Highly Qualified</h3>
              <p className="text-gray-600 leading-relaxed">
                All our doctors are board-certified with degrees from premier medical institutions 
                and extensive clinical experience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Patient-Centric Care</h3>
              <p className="text-gray-600 leading-relaxed">
                Our doctors prioritize patient well-being and provide personalized treatment plans 
                tailored to individual needs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Always Available</h3>
              <p className="text-gray-600 leading-relaxed">
                Our medical team is available round-the-clock to address your health concerns 
                and provide timely medical assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Consult Our Expert Doctors?
          </h2>
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Book an appointment with our experienced doctors and take the first step towards better health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-appointment"
              className="btn-primary bg-white text-primary hover:bg-gray-100 inline-flex items-center justify-center"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Book Appointment
            </Link>
            <Link
              to="/contact"
              className="btn-secondary border-white text-white hover:bg-white hover:text-primary inline-flex items-center justify-center"
            >
              Get Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Team