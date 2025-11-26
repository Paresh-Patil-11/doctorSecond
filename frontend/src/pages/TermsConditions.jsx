import React from 'react'

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Terms and Conditions
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-gray-600 mb-6">
              By accessing and using Shashwati Healthcare's website and services, you accept and 
              agree to be bound by these Terms and Conditions. If you do not agree to these terms, 
              please do not use our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Medical Services
            </h2>
            <p className="text-gray-600 mb-4">
              Shashwati Healthcare provides medical services through qualified healthcare professionals. 
              Our services include but are not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Outpatient consultations</li>
              <li>Inpatient care and hospitalization</li>
              <li>Emergency medical services</li>
              <li>Diagnostic and laboratory services</li>
              <li>Surgical procedures</li>
              <li>Specialized medical treatments</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Patient Responsibilities
            </h2>
            <p className="text-gray-600 mb-4">
              As a patient, you are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Providing accurate and complete medical information</li>
              <li>Following prescribed treatment plans</li>
              <li>Attending scheduled appointments</li>
              <li>Informing us of any changes in your health condition</li>
              <li>Paying for services rendered in a timely manner</li>
              <li>Treating staff and other patients with respect</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Appointments and Scheduling
            </h2>
            <p className="text-gray-600 mb-6">
              Appointments can be scheduled online, by phone, or in person. We request that you 
              arrive 15 minutes before your scheduled appointment time. Cancellations should be 
              made at least 24 hours in advance. Late cancellations or no-shows may incur a fee.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Payment and Billing
            </h2>
            <p className="text-gray-600 mb-4">
              Payment for services is due at the time of service unless prior arrangements have been made. 
              We accept various payment methods including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Cash</li>
              <li>Credit and debit cards</li>
              <li>Mobile wallets and UPI</li>
              <li>Insurance (subject to verification)</li>
            </ul>
            <p className="text-gray-600 mb-6">
              Detailed billing statements are available upon request. Any disputes regarding charges 
              should be raised within 30 days of the billing date.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Insurance and Third-Party Payments
            </h2>
            <p className="text-gray-600 mb-6">
              We work with various insurance providers. Patients are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Verifying insurance coverage before treatment</li>
              <li>Paying deductibles, co-payments, and non-covered services</li>
              <li>Providing accurate insurance information</li>
              <li>Following insurance company procedures</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Medical Records and Privacy
            </h2>
            <p className="text-gray-600 mb-6">
              Your medical information is confidential and protected by law. We maintain medical 
              records in accordance with applicable regulations. Information may be shared with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Healthcare providers involved in your treatment</li>
              <li>Insurance companies for billing purposes</li>
              <li>Legal authorities when required by law</li>
              <li>With your explicit consent</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Emergency Services
            </h2>
            <p className="text-gray-600 mb-6">
              Emergency medical services are available 24/7. In life-threatening situations, 
              call our emergency helpline +91 98765 43210 or visit our emergency department 
              immediately. Emergency care prioritization is based on medical necessity.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Consent to Treatment
            </h2>
            <p className="text-gray-600 mb-6">
              By seeking treatment at Shashwati Healthcare, you consent to medical examination, 
              diagnosis, and treatment as deemed necessary by our healthcare professionals. 
              For certain procedures, specific written consent may be required.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Intellectual Property
            </h2>
            <p className="text-gray-600 mb-6">
              All content on our website, including text, images, logos, and design elements, 
              is the property of Shashwati Healthcare and is protected by intellectual property laws. 
              Unauthorized use is prohibited.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-600 mb-6">
              Shashwati Healthcare is not liable for any indirect, incidental, or consequential 
              damages arising from the use of our services or website. Our liability is limited 
              to the extent permitted by applicable law.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Disclaimer
            </h2>
            <p className="text-gray-600 mb-6">
              The information provided on our website is for general informational purposes only 
              and does not constitute medical advice. Always consult with qualified healthcare 
              professionals for medical concerns and treatment decisions.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Termination of Services
            </h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to refuse or discontinue services to patients who violate 
              these terms, engage in disruptive behavior, or fail to comply with medical advice. 
              In such cases, we will provide appropriate notice and ensure continuity of care 
              through referral to other providers.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Governing Law
            </h2>
            <p className="text-gray-600 mb-6">
              These terms and conditions are governed by the laws of India. Any disputes arising 
              from these terms shall be subject to the exclusive jurisdiction of the courts in Bangalore.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-600 mb-6">
              We may update these terms and conditions from time to time. Changes will be 
              effective immediately upon posting on our website. Your continued use of our 
              services constitutes acceptance of any changes.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600 mb-6">
              For questions about these terms and conditions, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> legal@shashwatihealthcare.com<br />
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

export default TermsConditions