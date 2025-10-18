import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. Introduction</h2>
      <p className="mb-4">
        We value your privacy. This policy explains what data we collect, how we use it, and your choices.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">2. Information We Collect</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Contact information such as name, email, and phone number</li>
        <li>Delivery details such as address and pincode</li>
        <li>Order and subscription preferences</li>
        <li>Usage data like pages viewed and interactions</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. How We Use Information</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Provide and improve our meal services</li>
        <li>Process orders and payments</li>
        <li>Communicate updates, offers, and support</li>
        <li>Ensure safety, security, and fraud prevention</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. Sharing of Information</h2>
      <p className="mb-4">
        We do not sell your personal information. We may share it with trusted service providers for
        payment processing, delivery, analytics, or as required by law.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. Your Choices</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Update your information by contacting us</li>
        <li>Unsubscribe from marketing emails using the link in emails</li>
        <li>Disable cookies in your browser settings</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">6. Contact</h2>
      <p className="mb-4">
        For privacy questions, contact us at <a className="text-blue-600 underline" href="mailto:kitchenmyna@gmail.com">kitchenmyna@gmail.com</a> or +91 7418688269.
      </p>
    </div>
  );
}


