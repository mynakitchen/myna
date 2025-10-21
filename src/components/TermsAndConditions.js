import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-12 md:pt-28 pb-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. Introduction & Acceptance</h2>
      <p className="mb-4">
        Welcome to Myna Kitchen. By accessing or using our website, application, or services
        (collectively, the "Platform"), you agree to these Terms and Conditions ("Terms"). If you do not
        agree, please do not use the Platform.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">2. Eligibility & Corporate Users</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>You must be of legal age to contract under applicable law. If you are a minor, you confirm
          you have parental/guardian consent.</li>
        <li>When using the Platform for an organization, you represent you are authorized to bind that
          organization to these Terms.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. Use of the Platform</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Do not post unlawful, defamatory, obscene, harmful, or infringing content.</li>
        <li>Do not introduce malware, attempt to gain unauthorized access, or reverse-engineer our
          software.</li>
        <li>Do not harvest data, send unsolicited communications, or otherwise misuse the Platform.</li>
        <li>You must comply with all applicable laws while using the Platform.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. Our Services</h2>
      <p className="mb-4">
        We provide home-style meals through one-time orders and subscription plans, subject to service
        area and availability. Menu items, delivery slots, and service coverage may change from time to
        time.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. Accounts & Communication</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>You are responsible for maintaining the confidentiality of your account and for all activity
          under it.</li>
        <li>By using the Platform, you consent to receive transactional communications related to your
          orders and subscriptions.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">6. Pricing, Taxes & Payments</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>All prices are in INR and may change without prior notice due to market conditions or other
          reasons. Taxes and fees may apply.</li>
        <li>Despite our best efforts, pricing or availability errors may occur. We may cancel orders that
          result from such errors and refund prepaid amounts where applicable.</li>
        <li>Payments are processed via secure third-party payment gateways. By submitting payment
          information, you authorize us and our payment partners to process the transaction.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">7. Orders, Subscription Plans & Renewals</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Orders and subscriptions are subject to acceptance and availability.</li>
        <li>Subscription plans may auto-renew based on your selection. You can manage renewals or
          changes before the renewal date as per plan rules.</li>
        <li>Plan customizations, delivery schedules, and holidays are subject to operational feasibility.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">8. Delivery, Service Areas & Delays</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>We currently deliver in select serviceable pincodes in and around OMR, Chennai.</li>
        <li>Delivery windows are indicative and may vary due to traffic, weather, or logistical factors.</li>
        <li>In case of unforeseen delays or unserviceable locations, we may reschedule, cancel, or offer
          alternatives with appropriate communication.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">9. Cancellations, Pauses & Refunds</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Cancellation/pauses depend on your plan type, required notice period, and cut-off times.</li>
        <li>Refunds (if applicable) are processed to the original payment method within a reasonable time
          after approval. Certain fees may be non-refundable.</li>
        <li>Please contact us for assistance with cancellations, pauses, or delivery issues before the
          cut-off time.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">10. Allergies, Nutrition & User Responsibilities</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Please disclose allergies and dietary restrictions at the time of ordering. While we take care,
          our kitchen may handle common allergens and cross-contact is possible.</li>
        <li>Consult a physician or qualified professional if you have medical conditions or specific
          nutritional needs.</li>
        <li>You are responsible for providing accurate delivery details and being available to receive
          deliveries.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">11. Promotions, Credits & Offers</h2>
      <p className="mb-4">
        Promotional codes, credits, and offers are time-bound, non-transferable, and may be subject to
        additional terms. We may modify or withdraw promotions at our discretion.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">12. Intellectual Property</h2>
      <p className="mb-4">
        The Platform and its content, including text, graphics, logos, and software, are owned by or
        licensed to Myna Kitchen and protected by intellectual property laws. You may not copy,
        distribute, modify, or create derivative works without prior written consent.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">13. Third‑Party Services & Links</h2>
      <p className="mb-4">
        We may integrate or link to third‑party services (e.g., payment gateways, maps). We do not
        control and are not responsible for third‑party content, policies, or practices.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">14. Privacy</h2>
      <p className="mb-4">
        Your use of the Platform is subject to our Privacy Policy. Please review it to understand how we
        collect, use, and safeguard your information.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">15. Disclaimers</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Services are provided on an "as is" and "as available" basis. We do not warrant that the
          Platform will be uninterrupted or error‑free.</li>
        <li>Nutritional outcomes vary by individual. We do not provide medical advice or guarantee
          specific results.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">16. Limitation of Liability</h2>
      <p className="mb-4">
        To the maximum extent permitted by law, Myna Kitchen shall not be liable for any indirect,
        incidental, special, consequential, punitive damages, or loss of profits arising out of your use of
        the Platform or Services. Our aggregate liability, if any, shall not exceed the amount you paid for
        the applicable order or plan.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">17. Indemnity</h2>
      <p className="mb-4">
        You agree to indemnify and hold harmless Myna Kitchen, its affiliates, and personnel from any
        claims, losses, liabilities, and expenses arising out of your breach of these Terms or violation of
        any law or third‑party rights.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">18. Force Majeure</h2>
      <p className="mb-4">
        We are not responsible for delays or failures due to events beyond our reasonable control,
        including natural disasters, strikes, pandemics, or governmental actions.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">19. Governing Law & Jurisdiction</h2>
      <p className="mb-4">
        These Terms are governed by the laws of India. Courts in Chennai, Tamil Nadu shall have
        exclusive jurisdiction over disputes arising from these Terms or the use of the Platform.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">20. Changes to These Terms</h2>
      <p className="mb-4">
        We may update these Terms from time to time. Changes are effective upon posting on the
        Platform. Your continued use of the Services constitutes acceptance of the updated Terms.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">21. Grievance Redressal & Contact</h2>
      <p className="mb-2">If you have questions, concerns, or complaints about the Platform or our Services, contact us:</p>
      <ul className="list-disc pl-6 space-y-1 mb-6">
        <li>Email: <a className="text-blue-600 underline" href="mailto:kitchenmyna@gmail.com">kitchenmyna@gmail.com</a></li>
        <li>Phone: +91 7418688269</li>
        <li>Address: OMR, Chennai, Tamil Nadu, India</li>
      </ul>
    </div>
  );
}


