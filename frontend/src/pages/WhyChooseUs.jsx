import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  Heart, 
  Award, 
  Clock,
  Users,
  Stethoscope,
  CheckCircle,
  TrendingUp,
  Target
} from 'lucide-react'

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Shield,
      title: 'Expert Medical Team',
      description: 'Highly qualified and experienced doctors with expertise in various medical specialties.',
      features: ['Board-certified physicians', 'Extensive clinical experience', 'Continuous medical education']
    },
    {
      icon: Heart,
      title: 'Patient-Centric Care',
      description: 'We prioritize patient comfort and well-being with personalized treatment plans.',
      features: ['Personalized attention', 'Compassionate care', 'Emotional support']
    },
    {
      icon: Award,
      title: 'Quality Healthcare',
      description: 'Internationally recognized standards and quality assurance in all our services.',
      features: ['ISO certified', 'Quality protocols', 'Regular audits']
    },
    {
      icon: Clock,
      title: '24/7 Emergency Services',
      description: 'Round-the-clock medical assistance and emergency care facilities.',
      features: ['Emergency department', 'ICU facilities', 'Ambulance services']
    },
    {
      icon: Users,
      title: 'Comprehensive Services',
      description: 'Complete healthcare solutions under one roof for all your medical needs.',
      features: ['Multiple specialties', 'Diagnostic services', 'Pharmacy']
    },
    {
      icon: Stethoscope,
      title: 'Advanced Technology',
      description: 'State-of-the-art medical equipment and modern treatment methods.',
      features: ['Latest equipment', 'Digital records', 'Telemedicine']
    }
  ]

  const stats = [
    { number: '15+', label: 'Years of Excellence', icon: Award },
    { number: '500+', label: 'Expert Doctors', icon: Users },
    { number: '100K+', label: 'Happy Patients', icon: Heart },
    { number: '50+', label: 'Specializations', icon: Stethoscope },
    { number: '98%', label: 'Success Rate', icon: TrendingUp },
    { number: '24/7', label: 'Emergency Care', icon: Clock }
  ]

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Patient',
      content: 'The doctors and staff at Shashwati Healthcare are extremely professional and caring. They provided excellent treatment for my heart condition.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Patient',
      content: 'I had a wonderful experience during my pregnancy. The gynecology team provided exceptional care throughout my journey.',
      rating: 5
    },
    {
      name: 'Amit Patel',
      role: 'Patient',
      content: 'The emergency services saved my life during a critical situation. Quick response and excellent medical care.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Why Choose Shashwati Healthcare?
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-100 leading-relaxed">
              Discover what makes us the preferred healthcare destination for thousands of patients 
              who trust us with their health and well-being.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Reasons */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">Reasons to Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine medical expertise with cutting-edge technology and compassionate care 
              to provide you with the best healthcare experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => {
              const Icon = reason.icon
              return (
                <div key={index} className="card p-8 group">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{reason.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{reason.description}</p>
                  <ul className="space-y-2">
                    {reason.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Healthcare Approach</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Preventive Care</h3>
                    <p className="text-gray-600">
                      We focus on preventing diseases through regular check-ups, vaccinations, 
                      and health education programs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Compassionate Treatment</h3>
                    <p className="text-gray-600">
                      Our medical team provides care with empathy and understanding, 
                      ensuring patients feel comfortable and supported.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Continuous Improvement</h3>
                    <p className="text-gray-600">
                      We regularly update our medical practices and technologies to provide 
                      the latest and most effective treatments.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Healthcare Approach"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">98%</div>
                    <div className="text-sm text-gray-600">Patient Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">What Our Patients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from patients who have trusted us with their healthcare journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">Awards & Recognition</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence has been recognized by various healthcare organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">Best Hospital 2023</h3>
              <p className="text-sm text-gray-600">Healthcare Excellence Awards</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Quality Care Certified</h3>
              <p className="text-sm text-gray-600">National Health Authority</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Patient Choice Award</h3>
              <p className="text-sm text-gray-600">Medical Association</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Innovation Leader</h3>
              <p className="text-sm text-gray-600">Healthcare Technology Forum</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Experience the Shashwati Healthcare Difference
          </h2>
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Join thousands of satisfied patients who have chosen us for their healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-appointment"
              className="btn-primary bg-white text-primary hover:bg-gray-100 inline-flex items-center justify-center"
            >
              Book Appointment
            </Link>
            <Link
              to="/contact"
              className="btn-secondary border-white text-white hover:bg-white hover:text-primary inline-flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WhyChooseUs