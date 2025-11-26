import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Introduction
            </h2>
            <p className="text-gray-600 mb-6">
              Shashwati Healthcare ("we," "us," or "our") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website or use our healthcare services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Information We Collect
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Personal Information
            </h3>
            <p className="text-gray-600 mb-4">
              We may collect personal information that can be used to identify you, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Name, date of birth, and contact information</li>
              <li>Medical history and health information</li>
              <li>Insurance information and billing details</li>
              <li>Emergency contact information</li>
              <li>Government-issued identification numbers</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Usage Data
            </h3>
            <p className="text-gray-600 mb-6">
              We automatically collect information about how you interact with our website, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>IP address and browser information</li>
              <li>Pages visited and time spent on our site</li>
              <li>Device information and operating system</li>
              <li>Referring website information</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-600 mb-4">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>To provide medical services and treatment</li>
              <li>To schedule appointments and manage your care</li>
              <li>To process payments and insurance claims</li>
              <li>To communicate with you about your health</li>
              <li>To maintain and improve our services</li>
              <li>To comply with legal and regulatory requirements</li>
              <li>To conduct research and improve healthcare outcomes</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Information Sharing
            </h2>
            <p className="text-gray-600 mb-4">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>With healthcare providers involved in your treatment</li>
              <li>With insurance companies for billing purposes</li>
              <li>With law enforcement or regulatory authorities when required by law</li>
              <li>With third-party service providers who assist in our operations</li>
              <li>With your consent for specific purposes</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Data Security
            </h2>
            <p className="text-gray-600 mb-6">
              We implement appropriate technical and organizational measures to protect your information 
              against unauthorized access, alteration, disclosure, or destruction. These include encryption, 
              secure servers, access controls, and regular security audits.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-600 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Opt-out of marketing communications</li>
              <li>Obtain a copy of this Privacy Policy</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-600 mb-6">
              We use cookies and similar tracking technologies to enhance your experience on our website. 
              You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Third-Party Links
            </h2>
            <p className="text-gray-600 mb-6">
              Our website may contain links to third-party websites. We are not responsible for the 
              privacy practices of these external sites. Please review their privacy policies before 
              providing personal information.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Children's Privacy
            </h2>
            <p className="text-gray-600 mb-6">
              Our services are not directed to children under 18. We do not knowingly collect 
              personal information from children without parental consent.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-600 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any 
              significant changes by posting the new policy on our website and updating the 
              "Last updated" date.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 mb-6">
              If you have questions or concerns about this Privacy Policy or our data practices, 
              please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@shashwatihealthcare.com<br />
                <strong>Phone:</strong> +91 98765 43210<br />
                <strong>Address:</strong> 123 Medical Complex, Healthcare City, Bangalore - 560001
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy