import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faUsers, faHeadset, faHandshake, faComments } from '@fortawesome/free-solid-svg-icons';
import { openSecureLink } from '../lib/utils';

const ContactSalesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const handleWhatsAppContact = () => {
    const whatsappUrl = 'https://api.whatsapp.com/send/?phone=%2B917418688269&text=Hi%2C%20I%20want%20to%20know%20about%20discounts%20on%20your%20meal%20subscriptions.&type=phone_number&app_absent=0';
    
    openSecureLink(whatsappUrl, {
      onError: (error) => {
        console.error('Failed to open WhatsApp link:', error);
        // Could show user notification here
      }
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #825F45 0%, #997B66 50%, #D08C60 100%)'
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Title with underline */}
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
              Let's find your perfect plan
            </h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>

          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-gold-100 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Every person has unique dietary needs and preferences. That's why we recommend talking to our team once 
            to understand your requirements and help you choose the meal plan that's perfect for you.
          </motion.p>

          {/* Benefits grid */}
          <motion.div
            className="grid md:grid-cols-2 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              {
                icon: "🎯",
                title: "Personalized Recommendations",
                description: "Get meal plans tailored to your specific dietary needs and preferences"
              },
              {
                icon: "📞",
                title: "Expert Consultation",
                description: "Talk directly with our nutrition experts to find your perfect fit"
              },
              {
                icon: "⚡",
                title: "Quick Setup",
                description: "Get started with your customized meal plan in just minutes"
              },
              {
                icon: "🔄",
                title: "Flexible Changes",
                description: "Easily modify your plan anytime based on your evolving needs"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-left"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gold-100 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to action */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              onClick={handleWhatsAppContact}
              className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-gold-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Contact Myna Kitchen team on WhatsApp"
            >
              <span className="flex items-center justify-center gap-3">
                <span className="text-2xl">💬</span>
                Talk to Our Team
              </span>
            </motion.button>
            <p className="text-sm text-gold-100 opacity-90">
              Free consultation • No commitment required
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSalesSection; 