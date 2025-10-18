import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By accessing or using Myna Kitchen services, you agree to be bound by these Terms.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">2. Services</h2>
      <p className="mb-4">
        We provide home-style meal delivery and subscription services. Availability may vary by area.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. Orders and Payments</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>All orders are subject to acceptance and availability</li>
        <li>Prices are listed in INR and may change with prior notice</li>
        <li>Payments are processed securely via our payment partners</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. Cancellations and Refunds</h2>
      <p className="mb-4">
        Cancellation and refund policies are subject to plan type and notice period. Please contact support for assistance.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. User Responsibilities</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Provide accurate information for deliveries</li>
        <li>Review allergies and dietary preferences while ordering</li>
        <li>Comply with applicable laws and these Terms</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">6. Limitation of Liability</h2>
      <p className="mb-4">
        To the maximum extent permitted by law, Myna Kitchen is not liable for indirect or consequential damages arising from use of the services.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">7. Contact</h2>
      <p className="mb-4">
        For questions about these Terms, contact <a className="text-blue-600 underline" href="mailto:kitchenmyna@gmail.com">kitchenmyna@gmail.com</a> or +91 7418688269.
      </p>
    </div>
  );
}


