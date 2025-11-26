import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Stethoscope, 
  Calendar, 
  Users, 
  Award, 
  Clock, 
  Phone,
  ChevronRight,
  Heart,
  Shield,
  Activity
} from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Stethoscope,
      title: 'Expert Doctors',
      description: 'Highly qualified and experienced medical professionals dedicated to your health.'
    },
    {
      icon: Shield,
      title: 'Advanced Technology',
      description: 'State-of-the-art medical equipment and modern treatment methods.'
    },
    {
      icon: Heart,
      title: 'Patient Care',
      description: 'Compassionate care with personalized treatment plans for every patient.'
    },
    {
      icon: Clock,
      title: '24/7 Service',
      description: 'Round-the-clock medical assistance and emergency care services.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Internationally recognized standards and quality healthcare services.'
    },
    {
      icon: Activity,
      title: 'Comprehensive Care',
      description: 'Complete healthcare solutions under one roof for all your medical needs.'
    }
  ]

  const services = [
    {
      title: 'Cardiology',
      description: 'Complete heart care with advanced diagnostic and treatment facilities.',
      icon: '❤️'
    },
    {
      title: 'Neurology',
      description: 'Expert care for brain, spine, and nervous system disorders.',
      icon: '🧠'
    },
    {
      title: 'Orthopedics',
      description: 'Comprehensive treatment for bone, joint, and muscle conditions.',
      icon: '🦴'
    },
    {
      title: 'Pediatrics',
      description: 'Specialized healthcare services for children and adolescents.',
      icon: '👶'
    },
    {
      title: 'Gynecology',
      description: 'Complete women\'s health and maternity care services.',
      icon: '👩'
    },
    {
      title: 'Dermatology',
      description: 'Advanced skin care and cosmetic treatment solutions.',
      icon: '✨'
    }
  ]

  const stats = [
    { number: '500+', label: 'Expert Doctors' },
    { number: '50+', label: 'Specializations' },
    { number: '100K+', label: 'Happy Patients' },
    { number: '15+', label: 'Years of Excellence' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Health is Our 
                <span className="text-yellow-300"> Priority</span>
              </h1>
              <p className="text-xl mb-8 text-gray-100 leading-relaxed">
                Experience world-class healthcare with our team of expert doctors. 
                Book appointments online and get the best medical care at Shashwati Healthcare.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/book-appointment"
                  className="btn-primary bg-white text-primary hover:bg-gray-100 inline-flex items-center justify-center"
                >
                  Book Appointment
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/services"
                  className="btn-secondary border-white text-white hover:bg-white hover:text-primary inline-flex items-center justify-center"
                >
                  Our Services
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Medical Care"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Emergency Care</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">Why Choose Shashwati Healthcare?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine medical expertise with cutting-edge technology to provide you with the best healthcare experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="card p-8 text-center group">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive medical services across all major specialties with expert doctors and advanced facilities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card p-8 hover:shadow-xl transition-all duration-300 group">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="btn-primary inline-flex items-center"
            >
              View All Services
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Experience Quality Healthcare?
          </h2>
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust Shashwati Healthcare for their medical needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-appointment"
              className="btn-primary bg-white text-primary hover:bg-gray-100 inline-flex items-center justify-center"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Book Appointment Now
            </Link>
            <Link
              to="/contact"
              className="btn-secondary border-white text-white hover:bg-white hover:text-primary inline-flex items-center justify-center"
            >
              <Phone className="mr-2 w-5 h-5" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-16 bg-red-50 border-t-4 border-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-6 lg:mb-0">
              <h2 className="text-2xl lg:text-3xl font-bold text-red-600 mb-2">
                Emergency Services Available 24/7
              </h2>
              <p className="text-gray-600">
                For medical emergencies, don't hesitate to call us immediately.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="tel:+919876543210"
                className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-red-700 transition-colors inline-flex items-center"
              >
                <Phone className="mr-2 w-6 h-6" />
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home