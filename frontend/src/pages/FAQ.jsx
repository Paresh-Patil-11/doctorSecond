import React, { useState } from 'react'
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Phone,
  Mail,
  Calendar,
  FileText,
  CreditCard,
  Users,
  Clock,
  Shield,
  Heart
} from 'lucide-react'

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general')
  const [openItems, setOpenItems] = useState({})

  const categories = [
    { id: 'general', name: 'General', icon: HelpCircle },
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'billing', name: 'Billing & Insurance', icon: CreditCard },
    { id: 'emergency', name: 'Emergency', icon: Shield },
    { id: 'services', name: 'Services', icon: Heart }
  ]

  const faqData = {
    general: [
      {
        question: 'What are your hospital timings?',
        answer: 'Our general hospital timings are Monday to Saturday: 9:00 AM to 8:00 PM, and Sunday: 10:00 AM to 6:00 PM. However, our emergency services are available 24/7.'
      },
      {
        question: 'How do I book an appointment?',
        answer: 'You can book an appointment through our website, by calling us at +91 98765 43210, or by visiting our hospital in person. Online booking is the most convenient option.'
      },
      {
        question: 'Do I need a referral to see a specialist?',
        answer: 'While referrals are not always necessary, we recommend bringing a referral letter from your primary care physician for specialized consultations.'
      },
      {
        question: 'What should I bring for my first visit?',
        answer: 'Please bring a valid ID proof, previous medical records, current medications list, insurance information, and any relevant test reports.'
      },
      {
        question: 'How can I access my medical records?',
        answer: 'You can access your medical records through our patient portal or request them from our medical records department. Proper identification is required.'
      }
    ],
    appointments: [
      {
        question: 'How far in advance should I book an appointment?',
        answer: 'We recommend booking appointments at least 2-3 days in advance for routine consultations. For urgent cases, we try to accommodate same-day appointments based on availability.'
      },
      {
        question: 'Can I cancel or reschedule my appointment?',
        answer: 'Yes, you can cancel or reschedule your appointment up to 24 hours before the scheduled time. Late cancellations may incur a fee.'
      },
      {
        question: 'What happens if I miss my appointment?',
        answer: 'If you miss your appointment without prior notice, a no-show fee may be charged. Please inform us as early as possible if you need to cancel.'
      },
      {
        question: 'Do you offer telemedicine consultations?',
        answer: 'Yes, we offer video and phone consultations for certain types of appointments. Please check with our reception staff about telemedicine availability.'
      },
      {
        question: 'How long does a typical consultation last?',
        answer: 'A standard consultation usually lasts 15-30 minutes. First-time consultations or complex cases may take longer.'
      }
    ],
    billing: [
      {
        question: 'What insurance plans do you accept?',
        answer: 'We accept most major insurance plans. Please contact our billing department or check with your insurance provider to confirm coverage.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept cash, credit/debit cards, UPI, and mobile wallet payments. We also offer EMI options for certain procedures.'
      },
      {
        question: 'Can I get an estimate of treatment costs?',
        answer: 'Yes, we provide detailed cost estimates for treatments and procedures. Please consult with our billing department for accurate pricing.'
      },
      {
        question: 'Do you offer any discounts or packages?',
        answer: 'We offer various health checkup packages and seasonal discounts. Please check our website or contact us for current offers.'
      },
      {
        question: 'How do I claim insurance reimbursement?',
        answer: 'Our billing team will assist you with insurance claims. Please provide your insurance details and necessary documents at the time of admission.'
      }
    ],
    emergency: [
      {
        question: 'What constitutes a medical emergency?',
        answer: 'Medical emergencies include chest pain, difficulty breathing, severe bleeding, loss of consciousness, major injuries, stroke symptoms, and other life-threatening conditions.'
      },
      {
        question: 'How quickly will I be seen in the emergency department?',
        answer: 'Patients are triaged based on the severity of their condition. Life-threatening cases are attended to immediately, while less urgent cases may have to wait.'
      },
      {
        question: 'Do you have ambulance services?',
        answer: 'Yes, we provide 24/7 ambulance services equipped with basic and advanced life support systems. Call our emergency helpline for immediate assistance.'
      },
      {
        question: 'What should I do in case of a medical emergency?',
        answer: 'Call our emergency helpline +91 98765 43210 immediately, or come directly to our emergency department. If possible, bring your medical records and ID.'
      },
      {
        question: 'Is your ICU fully equipped?',
        answer: 'Yes, our ICU is equipped with modern medical equipment, ventilators, monitoring systems, and staffed by critical care specialists 24/7.'
      }
    ],
    services: [
      {
        question: 'What specialties do you offer?',
        answer: 'We offer comprehensive medical services including Cardiology, Neurology, Orthopedics, Pediatrics, Gynecology, Dermatology, Psychiatry, and many more specialties.'
      },
      {
        question: 'Do you have diagnostic facilities?',
        answer: 'Yes, we have a fully equipped diagnostic center with X-ray, CT scan, MRI, ultrasound, laboratory services, and other advanced diagnostic equipment.'
      },
      {
        question: 'Do you provide surgical services?',
        answer: 'Yes, we have modern operation theaters and provide various surgical services including minimally invasive surgeries, laparoscopic procedures, and major surgeries.'
      },
      {
        question: 'What about pharmacy services?',
        answer: 'We have an in-house pharmacy that stocks a wide range of medicines and is open during hospital hours. Emergency pharmacy services are available 24/7.'
      },
      {
        question: 'Do you offer rehabilitation services?',
        answer: 'Yes, we provide physiotherapy, occupational therapy, and other rehabilitation services to help patients recover and regain their independence.'
      }
    ]
  }

  const toggleItem = (category, index) => {
    setOpenItems(prev => ({
      ...prev,
      [`${category}-${index}`]: !prev[`${category}-${index}`]
    }))
  }

  const currentFAQs = faqData[activeCategory] || []

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-100 leading-relaxed">
              Find answers to common questions about our services, appointments, billing, and more. 
              Can't find what you're looking for? Feel free to contact us.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-12 bg-red-50 border-b-4 border-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-red-600 mb-2">
                Need Immediate Assistance?
              </h2>
              <p className="text-red-700">
                Our support team is available to help you with any questions or concerns.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+919876543210"
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors inline-flex items-center justify-center"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call Now
              </a>
              <a
                href="mailto:info@shashwatihealthcare.com"
                className="bg-white text-red-600 border-2 border-red-600 px-6 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors inline-flex items-center justify-center"
              >
                <Mail className="mr-2 w-5 h-5" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Category Sidebar */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-semibold mb-6">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                        activeCategory === category.id
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {category.name}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  {categories.find(c => c.id === activeCategory)?.name} Questions
                </h2>
                <p className="text-gray-600">
                  Common questions and answers about {categories.find(c => c.id === activeCategory)?.name.toLowerCase()}.
                </p>
              </div>

              <div className="space-y-4">
                {currentFAQs.map((faq, index) => (
                  <div key={index} className="card p-6">
                    <button
                      onClick={() => toggleItem(activeCategory, index)}
                      className="w-full text-left flex items-center justify-between"
                    >
                      <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                      {openItems[`${activeCategory}-${index}`] ? (
                        <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                      )}
                    </button>
                    {openItems[`${activeCategory}-${index}`] && (
                      <div className="mt-4 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {currentFAQs.length === 0 && (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No questions available in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Help */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">Still Need Help?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our support team is here to assist you with any questions or concerns you may have.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Call Us</h3>
              <p className="text-gray-600 mb-4">
                Speak with our support team for immediate assistance.
              </p>
              <a
                href="tel:+919876543210"
                className="text-primary font-medium hover:text-primary-dark"
              >
                +91 98765 43210
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Email Us</h3>
              <p className="text-gray-600 mb-4">
                Send us your questions and we'll respond within 24 hours.
              </p>
              <a
                href="mailto:info@shashwatihealthcare.com"
                className="text-primary font-medium hover:text-primary-dark"
              >
                info@shashwatihealthcare.com
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Visit Us</h3>
              <p className="text-gray-600 mb-4">
                Meet our staff in person for personalized assistance.
              </p>
              <a
                href="/contact"
                className="text-primary font-medium hover:text-primary-dark"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Helpful Resources */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">Helpful Resources</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access important information and resources to make your healthcare journey easier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="/privacy-policy"
              className="card p-6 hover:shadow-lg transition-shadow text-center group"
            >
              <FileText className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Privacy Policy</h3>
              <p className="text-sm text-gray-600">
                Learn how we protect your personal information
              </p>
            </a>

            <a
              href="/terms-conditions"
              className="card p-6 hover:shadow-lg transition-shadow text-center group"
            >
              <FileText className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Terms & Conditions</h3>
              <p className="text-sm text-gray-600">
                Read our terms of service and usage policies
              </p>
            </a>

            <a
              href="/services"
              className="card p-6 hover:shadow-lg transition-shadow text-center group"
            >
              <Heart className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Our Services</h3>
              <p className="text-sm text-gray-600">
                Explore our comprehensive medical services
              </p>
            </a>

            <a
              href="/contact"
              className="card p-6 hover:shadow-lg transition-shadow text-center group"
            >
              <Phone className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Contact Info</h3>
              <p className="text-sm text-gray-600">
                Get in touch with our support team
              </p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQ