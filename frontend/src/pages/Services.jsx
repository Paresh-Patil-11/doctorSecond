import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Heart, 
  Brain, 
  Bone, 
  Baby, 
  User, 
  Eye, 
  Ear, 
  Smile,
  Stethoscope,
  ChevronRight,
  Phone
} from 'lucide-react'

const Services = () => {
  const services = [
    {
      id: 'cardiology',
      title: 'Cardiology',
      description: 'Comprehensive heart care including diagnostic services, interventional procedures, and cardiac rehabilitation.',
      icon: Heart,
      features: [
        'Echocardiography',
        'Stress Testing',
        'Cardiac Catheterization',
        'Pacemaker Implantation',
        'Heart Failure Management'
      ],
      color: 'red'
    },
    {
      id: 'neurology',
      title: 'Neurology',
      description: 'Advanced diagnosis and treatment of brain, spine, and nervous system disorders.',
      icon: Brain,
      features: [
        'EEG & EMG Studies',
        'Stroke Management',
        'Epilepsy Treatment',
        'Movement Disorders',
        'Neurocritical Care'
      ],
      color: 'purple'
    },
    {
      id: 'orthopedics',
      title: 'Orthopedics',
      description: 'Complete bone and joint care including sports medicine and joint replacement surgeries.',
      icon: Bone,
      features: [
        'Joint Replacement',
        'Arthroscopy',
        'Fracture Management',
        'Sports Medicine',
        'Spine Surgery'
      ],
      color: 'blue'
    },
    {
      id: 'pediatrics',
      title: 'Pediatrics',
      description: 'Specialized healthcare for infants, children, and adolescents with child-friendly facilities.',
      icon: Baby,
      features: [
        'Newborn Care',
        'Vaccination Programs',
        'Growth & Development',
        'Pediatric Surgery',
        'Child Psychology'
      ],
      color: 'pink'
    },
    {
      id: 'gynecology',
      title: 'Gynecology',
      description: 'Complete women\'s health services including maternity care and reproductive health.',
      icon: User,
      features: [
        'Maternity Care',
        'High-Risk Pregnancy',
        'Infertility Treatment',
        'Minimally Invasive Surgery',
        'Menopause Management'
      ],
      color: 'rose'
    },
    {
      id: 'dermatology',
      title: 'Dermatology',
      description: 'Advanced skin care and cosmetic treatments for all skin types and conditions.',
      icon: Eye,
      features: [
        'Medical Dermatology',
        'Cosmetic Procedures',
        'Laser Treatments',
        'Acne Management',
        'Anti-Aging Solutions'
      ],
      color: 'green'
    },
    {
      id: 'psychiatry',
      title: 'Psychiatry',
      description: 'Mental health services including counseling, therapy, and psychiatric treatment.',
      icon: Stethoscope,
      features: [
        'Depression Treatment',
        'Anxiety Disorders',
        'Stress Management',
        'Addiction Treatment',
        'Cognitive Therapy'
      ],
      color: 'indigo'
    },
    {
      id: 'ent',
      title: 'ENT',
      description: 'Ear, nose, and throat care including advanced surgical procedures.',
      icon: Ear,
      features: [
        'Hearing Assessment',
        'Sinus Surgery',
        'Voice Disorders',
        'Allergy Management',
        'Head & Neck Surgery'
      ],
      color: 'cyan'
    },
    {
      id: 'ophthalmology',
      title: 'Ophthalmology',
      description: 'Complete eye care services from routine check-ups to complex eye surgeries.',
      icon: Eye,
      features: [
        'Cataract Surgery',
        'LASIK Surgery',
        'Glaucoma Treatment',
        'Retinal Disorders',
        'Pediatric Ophthalmology'
      ],
      color: 'teal'
    },
    {
      id: 'dentistry',
      title: 'Dentistry',
      description: 'Comprehensive dental care including cosmetic dentistry and oral surgery.',
      icon: Smile,
      features: [
        'Root Canal Treatment',
        'Dental Implants',
        'Orthodontics',
        'Cosmetic Dentistry',
        'Oral Surgery'
      ],
      color: 'orange'
    },
    {
      id: 'general-medicine',
      title: 'General Medicine',
      description: 'Primary healthcare services for common illnesses and preventive care.',
      icon: Stethoscope,
      features: [
        'General Consultation',
        'Preventive Care',
        'Chronic Disease Management',
        'Health Checkups',
        'Vaccination'
      ],
      color: 'gray'
    },
    {
      id: 'urology',
      title: 'Urology',
      description: 'Specialized care for urinary tract and male reproductive system disorders.',
      icon: Stethoscope,
      features: [
        'Kidney Stone Treatment',
        'Prostate Care',
        'Urinary Tract Infections',
        'Male Infertility',
        'Urological Surgery'
      ],
      color: 'amber'
    }
  ]

  const getColorClasses = (color) => {
    const colorMap = {
      red: 'bg-red-100 text-red-600',
      purple: 'bg-purple-100 text-purple-600',
      blue: 'bg-blue-100 text-blue-600',
      pink: 'bg-pink-100 text-pink-600',
      rose: 'bg-rose-100 text-rose-600',
      green: 'bg-green-100 text-green-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      cyan: 'bg-cyan-100 text-cyan-600',
      teal: 'bg-teal-100 text-teal-600',
      orange: 'bg-orange-100 text-orange-600',
      gray: 'bg-gray-100 text-gray-600',
      amber: 'bg-amber-100 text-amber-600'
    }
    return colorMap[color] || 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Our Medical Services
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-100 leading-relaxed">
              Comprehensive healthcare services across all major specialties with expert doctors 
              and state-of-the-art facilities.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div key={service.id} className="card p-8 hover:shadow-xl transition-all duration-300 group">
                  <div className={`w-16 h-16 ${getColorClasses(service.color)} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800">Key Services:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to={`/book-appointment?department=${service.id}`}
                    className="inline-flex items-center text-primary hover:text-primary-dark font-medium mt-4 group"
                  >
                    Book Consultation
                    <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-20 bg-red-50 border-t-4 border-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-red-600 mb-6">
                24/7 Emergency Services
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our emergency department is equipped to handle all types of medical emergencies 
                with trained specialists and advanced life support systems available round the clock.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Trauma Care</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Cardiac Emergency</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Neurological Emergency</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Pediatric Emergency</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-red-600 text-white rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Emergency Helpline</h3>
                <a
                  href="tel:+919876543210"
                  className="text-4xl font-bold hover:text-red-200 transition-colors inline-flex items-center"
                >
                  <Phone className="mr-3 w-8 h-8" />
                  +91 98765 43210
                </a>
                <p className="mt-4 text-red-100">
                  Available 24 hours a day, 7 days a week
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Checkup Packages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">Health Checkup Packages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Preventive healthcare packages designed for different age groups and health needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">Basic Package</h3>
              <div className="text-3xl font-bold mb-4">₹1,999</div>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Complete Blood Count
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Blood Sugar Test
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Blood Pressure Check
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Basic Vision Test
                </li>
              </ul>
              <Link
                to="/book-appointment"
                className="btn-primary w-full"
              >
                Book Now
              </Link>
            </div>

            <div className="card p-8 text-center border-2 border-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm">
                Popular
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Premium Package</h3>
              <div className="text-3xl font-bold mb-4">₹4,999</div>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Everything in Basic
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Lipid Profile
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Liver Function Test
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Kidney Function Test
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Chest X-Ray
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  ECG
                </li>
              </ul>
              <Link
                to="/book-appointment"
                className="btn-primary w-full"
              >
                Book Now
              </Link>
            </div>

            <div className="card p-8 text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">Executive Package</h3>
              <div className="text-3xl font-bold mb-4">₹9,999</div>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Everything in Premium
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Thyroid Profile
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Vitamin D & B12
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Ultrasound Abdomen
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Stress Test
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  2D Echo
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  PFT Test
                </li>
              </ul>
              <Link
                to="/book-appointment"
                className="btn-primary w-full"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
