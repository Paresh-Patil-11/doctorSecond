import React from 'react'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react'

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 98765 43210',
      href: 'tel:+919876543210'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@shashwatihealthcare.com',
      href: 'mailto:info@shashwatihealthcare.com'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: '123 Medical Complex, Healthcare City, Bangalore - 560001',
      href: '#'
    },
    {
      icon: Clock,
      label: 'Working Hours',
      value: 'Mon-Sat: 9:00 AM - 8:00 PM\nSunday: 10:00 AM - 6:00 PM',
      href: '#'
    }
  ]

  const departments = [
    { name: 'General Enquiry', email: 'info@shashwatihealthcare.com' },
    { name: 'Appointments', email: 'appointments@shashwatihealthcare.com' },
    { name: 'Emergency', email: 'emergency@shashwatihealthcare.com' },
    { name: 'Billing', email: 'billing@shashwatihealthcare.com' },
    { name: 'Feedback', email: 'feedback@shashwatihealthcare.com' },
    { name: 'Careers', email: 'careers@shashwatihealthcare.com' }
  ]

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'LinkedIn', href: '#', icon: Linkedin }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-100 leading-relaxed">
              Get in touch with us for any medical emergencies, appointments, or general inquiries. 
              We're here to help you 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{info.label}</h3>
                  {info.href.startsWith('tel:') || info.href.startsWith('mailto:') ? (
                    <a
                      href={info.href}
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      {info.value.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < info.value.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </a>
                  ) : (
                    <p className="text-gray-600">
                      {info.value.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < info.value.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select className="input-field">
                    <option value="">Select a subject</option>
                    <option value="appointment">Book Appointment</option>
                    <option value="emergency">Medical Emergency</option>
                    <option value="feedback">Feedback</option>
                    <option value="complaint">Complaint</option>
                    <option value="general">General Enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="input-field"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Find Us</h2>
              
              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-lg h-64 mb-8 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-4" />
                  <p>Interactive Map</p>
                  <p className="text-sm">123 Medical Complex, Healthcare City</p>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-red-600 mb-4">
                  Emergency Contact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-red-600 mr-3" />
                    <a
                      href="tel:+919876543210"
                      className="text-red-600 font-bold text-lg hover:text-red-700"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                  <p className="text-red-700 text-sm">
                    Available 24/7 for medical emergencies
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                        aria-label={social.name}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">Department Contacts</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reach out to specific departments for targeted assistance and faster response.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-lg font-semibold mb-3">{dept.name}</h3>
                <a
                  href={`mailto:${dept.email}`}
                  className="text-primary hover:text-primary-dark flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {dept.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions about our services and procedures.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-3">
                How do I book an appointment?
              </h3>
              <p className="text-gray-600">
                You can book an appointment online through our website, call us at +91 98765 43210, 
                or visit our hospital in person. Online booking is the fastest and most convenient method.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-3">
                What should I bring for my first appointment?
              </h3>
              <p className="text-gray-600">
                Please bring a valid ID proof, previous medical records, current medications list, 
                and insurance information if applicable.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-3">
                Do you accept insurance?
              </h3>
              <p className="text-gray-600">
                Yes, we accept most major insurance plans. Please contact our billing department 
                to verify your coverage before your appointment.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-3">
                What are your visiting hours?
              </h3>
              <p className="text-gray-600">
                General visiting hours are 9:00 AM to 8:00 PM (Monday to Saturday) and 
                10:00 AM to 6:00 PM on Sunday. Emergency services are available 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact