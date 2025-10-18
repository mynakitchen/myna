import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-12 md:pt-28 pb-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. Introduction</h2>
      <p className="mb-4">
        Thank you for choosing Myna Kitchen ("we", "us", "our"). This Privacy Policy ("Policy") explains
        how we collect, use, disclose, and safeguard information when you use our website, application,
        and services (collectively, the "Platform"). We may update this Policy from time to time. Your
        continued use of the Platform signifies your acceptance of the updated Policy.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">2. Information We Collect From You</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Identity and Contact: name, email address, phone number.</li>
        <li>Delivery Details: address, pincode, delivery instructions.</li>
        <li>Order & Subscription Data: plan selections, preferences, delivery schedule.</li>
        <li>Support & Communication: messages you send us (e.g., feedback or queries).</li>
      </ul>
      <p className="mb-4 text-sm text-gray-600">
        When collected: during account creation, checkout, subscription setup, or when you contact us.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. Information Generated During Use</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Usage Data: pages viewed, features used, clicks, scrolling, referring/exit pages, timestamps.</li>
        <li>Location Signals: approximate location derived from IP or delivery pincode.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. Technical Information</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Device & Browser: device type, OS, browser type/version, network details.</li>
        <li>Diagnostics: performance metrics, error logs, and crash data for troubleshooting.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. Why We Collect and How We Use Data</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Fulfil orders and deliver meals; manage subscriptions and renewals.</li>
        <li>Process payments and prevent fraud.</li>
        <li>Provide customer support and respond to queries.</li>
        <li>Improve the Platform’s performance, content, and user experience.</li>
        <li>Send service updates, policy changes, and—with consent—promotional communications.</li>
        <li>Comply with legal obligations and enforce our terms.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">6. Analytics & Cookies</h2>
      <p className="mb-3">
        We and our analytics partners use cookies and similar technologies to understand usage and
        improve the Platform. Cookie categories include:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Essential Cookies: required for core functionality and security.</li>
        <li>Analytics Cookies: help measure traffic and usage (e.g., Google Analytics).</li>
        <li>Functionality/Preference Cookies: remember your settings and choices.</li>
        <li>Targeting/Advertising Cookies: personalize and measure ads, where applicable.</li>
      </ul>
      <p className="mb-4 text-sm text-gray-600">
        You can control cookies in your browser settings. Disabling certain cookies may limit some
        functionality. We may use Google Analytics and similar tools to analyze usage trends.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">7. Sensitive Data</h2>
      <p className="mb-4">
        Where you share dietary preferences or allergy information, we process it to tailor meals. Payment
        information is handled by our payment partners; we do not store your full card details on our
        servers.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">8. Your Rights</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Access: request details about your personal data we process.</li>
        <li>Correction/Deletion: request updates or deletion of your personal data, subject to law.</li>
        <li>Restriction/Object: request we limit certain processing, or object to processing.</li>
        <li>Choices: opt out of marketing communications at any time.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">9. Sharing Your Data</h2>
      <p className="mb-4">
        We do not sell your personal data. We may share limited data with trusted service providers for
        payment processing, delivery logistics, analytics, email/IT services, fraud prevention, regulatory
        compliance, or as required by law.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">10. How We Protect Your Data</h2>
      <p className="mb-4">
        We use appropriate technical and organizational safeguards, including encryption in transit where
        applicable, access controls, and retention policies designed to prevent unauthorized access and
        reduce unnecessary retention.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">11. Retention & Deletion</h2>
      <p className="mb-4">
        We retain data only as long as necessary for the purposes outlined in this Policy, to provide our
        services, comply with legal obligations, resolve disputes, and enforce agreements. Upon request
        and where legally permissible, we will delete or anonymize your data.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">12. Third‑Party Links</h2>
      <p className="mb-4">
        The Platform may contain links to third‑party sites. Their privacy policies govern those sites. We
        are not responsible for third‑party practices. Please review their policies before sharing data.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">13. Governing Law & Dispute Resolution</h2>
      <p className="mb-4">
        This Policy is governed by the laws of India. Courts in Chennai, Tamil Nadu shall have exclusive
        jurisdiction over disputes arising from this Policy, in accordance with our Terms and Conditions.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">14. Contact Us</h2>
      <p className="mb-2">If you have questions regarding this Policy, contact us:</p>
      <ul className="list-disc pl-6 space-y-1 mb-6">
        <li>Email: <a className="text-blue-600 underline" href="mailto:kitchenmyna@gmail.com">kitchenmyna@gmail.com</a></li>
        <li>Phone: +91 7418688269</li>
        <li>Address: OMR, Chennai, Tamil Nadu, India</li>
      </ul>
    </div>
  );
}


