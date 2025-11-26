import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Award, 
  Users, 
  Target, 
  Heart, 
  Stethoscope,
  Calendar,
  ChevronRight
} from 'lucide-react'

const About = () => {
  const milestones = [
    {
      year: '2008',
      title: 'Foundation',
      description: 'Shashwati Healthcare was established with a vision to provide quality healthcare services.'
    },
    {
      year: '2012',
      title: 'Expansion',
      description: 'Added new specialties and expanded our facility to accommodate more patients.'
    },
    {
      year: '2016',
      title: 'Technology Upgrade',
      description: 'Introduced advanced medical equipment and digital health records system.'
    },
    {
      year: '2020',
      title: 'Pandemic Response',
      description: 'Led COVID-19 response efforts and provided critical care during the pandemic.'
    },
    {
      year: '2023',
      title: 'Excellence Award',
      description: 'Recognized as the best healthcare provider in the region for exceptional patient care.'
    }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We treat every patient with empathy, dignity, and respect, ensuring their comfort and well-being.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest standards in medical care, continuously improving our services.'
    },
    {
      icon: Users,
      title: 'Teamwork',
      description: 'Our collaborative approach ensures comprehensive care through coordinated medical expertise.'
    },
    {
      icon: Target,
      title: 'Integrity',
      description: 'We maintain transparency and honesty in all our interactions and medical practices.'
    }
  ]

  const achievements = [
    { number: '100K+', label: 'Patients Treated' },
    { number: '500+', label: 'Expert Doctors' },
    { number: '50+', label: 'Specializations' },
    { number: '15+', label: 'Years of Service' },
    { number: '98%', label: 'Patient Satisfaction' },
    { number: '24/7', label: 'Emergency Services' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              About Shashwati Healthcare
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-100 leading-relaxed">
              For over 15 years, we have been dedicated to providing exceptional healthcare services 
              with compassion, excellence, and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="card p-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To provide accessible, affordable, and high-quality healthcare services to all communities 
                through innovative medical practices, compassionate care, and continuous improvement.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We are committed to enhancing the health and well-being of our patients by combining 
                medical expertise with cutting-edge technology and personalized attention.
              </p>
            </div>

            <div className="card p-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To be the leading healthcare institution recognized for excellence in patient care, 
                medical education, and research innovation.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We aspire to create a healthier future by advancing medical knowledge, fostering 
                preventive care, and setting new standards in healthcare delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These fundamental principles guide our actions and decisions in everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">Our Achievements</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence and patient satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-600">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our journey of providing exceptional healthcare services.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="card p-6 inline-block text-left">
                    <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary rounded-full border-4 border-white"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the visionary leaders who guide our organization with expertise and dedication.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold mb-2">Dr. Rajesh Sharma</h3>
              <p className="text-primary font-medium mb-2">Medical Director</p>
              <p className="text-gray-600 text-sm">25+ years of experience in healthcare management and clinical practice.</p>
            </div>
            <div className="card p-8 text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold mb-2">Dr. Priya Nair</h3>
              <p className="text-primary font-medium mb-2">Head of Operations</p>
              <p className="text-gray-600 text-sm">Expert in healthcare operations and patient experience management.</p>
            </div>
            <div className="card p-8 text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold mb-2">Dr. Amit Kumar</h3>
              <p className="text-primary font-medium mb-2">Clinical Director</p>
              <p className="text-gray-600 text-sm">Specialist in clinical quality improvement and medical protocols.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Join Our Healthcare Family
          </h2>
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Experience the difference with Shashwati Healthcare. Your health is our priority.
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
              to="/team"
              className="btn-secondary border-white text-white hover:bg-white hover:text-primary inline-flex items-center justify-center"
            >
              Meet Our Team
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About