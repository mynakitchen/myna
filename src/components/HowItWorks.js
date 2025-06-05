import React, { useRef } from "react";
import { motion } from "framer-motion";
import { openSecureLink } from '../lib/utils';
import './HowItWorks.css';

export default function HowItWorks() {
  const handleWhatsAppContact = () => {
    // Updated WhatsApp link with correct phone number and pre-filled message
    const whatsappUrl = 'https://api.whatsapp.com/send/?phone=%2B917418688269&text=I+want+to+try+your+meal+service.&type=phone_number&app_absent=0';
    
    openSecureLink(whatsappUrl, {
      onError: (error) => {
        console.error('Failed to open WhatsApp link:', error);
        // Could show user notification here
      }
    });
  };

  const handleSignUpClick = () => {
    openSecureLink('https://mynakitchen.in/SignUp', {
      onError: (error) => {
        console.error('Failed to open signup link:', error);
        // Could show user notification here
      }
    });
  };
  
  const steps = [
    {
      number: "01",
      title: "Browse Plans",
      description: "Explore our delicious meal plans and find the perfect fit for your lifestyle and dietary needs.",
      accent: "#825F45", // Primary brown
      bgGradient: "bg-gradient-to-br from-gold-50 to-white",
      image: "/images/how-it-works/1.png",
      imageAlt: "Browse meal plans interface showing various food options"
    },
    {
      number: "02", 
      title: "Connect on WhatsApp",
      description: "Get in touch with our team to discuss your requirements and get personalized meal recommendations.",
      accent: "#D08C60", // Warm orange
      bgGradient: "bg-gradient-to-br from-warmOrange-50 to-white",
      image: "/images/how-it-works/2.png",
      imageAlt: "WhatsApp chat interface for customer support",
      hasButton: true
    },
    {
      number: "03",
      title: "Easy Registration",
      description: "Complete your registration using our simple form and receive your personalized user dashboard via email. Sign up takes just a few minutes and you'll get instant access to your account.",
      accent: "#797D62", // Sage green
      bgGradient: "bg-gradient-to-br from-sage-50 to-white",
      image: "/images/how-it-works/3.png",
      imageAlt: "User registration form and dashboard preview"
    },
    {
      number: "04",
      title: "Manage Everything",
      description: "Use your personalized dashboard to manage everything - add or cancel subscriptions, change delivery addresses, order delicious add-ons, and customize your meal preferences all in one place.",
      accent: "#997B66", // Muted brown
      bgGradient: "bg-gradient-to-br from-mutedBrown-50 to-white",
      image: "/images/how-it-works/4.png",
      imageAlt: "User dashboard showing subscription management features"
    }
  ];

  // Simple, clean card component without complex stacking
  const StepCard = ({ step, index }) => {
    return (
      <motion.div 
        className="w-full max-w-5xl mx-auto how-it-works-card"
        initial={{ 
          opacity: 0, 
          y: 60
        }}
        whileInView={{ 
          opacity: 1, 
          y: 0
        }}
        viewport={{ 
          once: true,
          amount: 0.2
        }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.08,
          ease: [0.21, 0.47, 0.32, 0.98]
        }}
      >
        <div 
          className={`${step.bgGradient} border-2 border-black shadow-lg md:shadow-xl rounded-xl md:rounded-2xl overflow-hidden hover:shadow-xl md:hover:shadow-2xl transition-shadow duration-300`}
        >
          {/* Card Header with Step Number */}
          <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4">
            <div className="flex items-center justify-between mb-4">
              <motion.div 
                className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-2 md:border-3 border-black bg-white shadow-lg"
                style={{ backgroundColor: step.accent }}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.2 + index * 0.08,
                  ease: "easeOut"
                }}
              >
                <span className="text-white font-black text-sm md:text-lg lg:text-2xl">{step.number}</span>
              </motion.div>
              <div className="flex-1 ml-4 lg:ml-6">
                <motion.h3 
                  className="text-lg md:text-2xl lg:text-3xl font-black text-black mb-1 md:mb-2 tracking-tight leading-tight"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.3 + index * 0.08,
                    ease: "easeOut"
                  }}
                >
                  {step.title}
                </motion.h3>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 px-6 md:px-8 pb-6 md:pb-8">
            {/* Image Section */}
            <motion.div 
              className="order-2 lg:order-1 flex items-center justify-center p-2 md:p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: 0.4 + index * 0.08,
                ease: "easeOut"
              }}
            >
              <div className="relative w-full max-w-sm lg:max-w-md mx-auto">
                {/* Fixed aspect ratio container for consistent display */}
                <div className="how-it-works-image-container">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/10" />
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    className="how-it-works-image"
                    loading="lazy"
                    onError={(e) => {
                      console.error(`Failed to load image: ${step.image}`);
                      e.target.style.backgroundColor = '#f3f4f6';
                      e.target.style.display = 'flex';
                      e.target.style.alignItems = 'center';
                      e.target.style.justifyContent = 'center';
                      e.target.innerHTML = '📷 Image Loading...';
                    }}
                    onLoad={(e) => {
                      console.log(`Successfully loaded image: ${step.image}`);
                      e.target.style.opacity = '1';
                    }}
                  />
                  {/* Decorative overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>

            {/* Text Content Section */}
            <div className="order-1 lg:order-2 flex flex-col justify-center space-y-4 md:space-y-6">
              <motion.p 
                className="text-black text-sm md:text-base lg:text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.5 + index * 0.08,
                  ease: "easeOut"
                }}
              >
                {step.description}
              </motion.p>
              
              {/* WhatsApp Button */}
              {step.hasButton && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.6 + index * 0.08,
                    ease: "easeOut"
                  }}
                >
                  <motion.button
                    onClick={handleWhatsAppContact}
                    className="w-full lg:w-auto px-4 md:px-6 lg:px-8 py-3 md:py-4 bg-accent hover:bg-warmOrange-600 text-white font-bold text-sm md:text-base border-2 border-accent hover:border-warmOrange-600 transition-all duration-200 flex items-center justify-center gap-2 md:gap-3 rounded-lg md:rounded-xl shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-sm md:text-base lg:text-lg">💬</span>
                    <span>Contact on WhatsApp</span>
                  </motion.button>
                </motion.div>
              )}
              
              {/* Feature highlight */}
              <motion.div 
                className="border-t border-tertiary/30 pt-3 md:pt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.7 + index * 0.08,
                  ease: "easeOut"
                }}
              >
                <div className="flex items-center">
                  <div 
                    className="w-2 h-2 md:w-3 md:h-3 rounded-full mr-2 md:mr-3 shadow-sm" 
                    style={{backgroundColor: step.accent}}
                  />
                  <span className="text-xs md:text-sm lg:text-base text-tertiary uppercase tracking-wider font-bold">
                    {index === 0 && "Multiple Plans Available"}
                    {index === 1 && "Instant Support Available"}
                    {index === 2 && "Quick & Easy Process"}
                    {index === 3 && "Complete Control & Flexibility"}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="how-it-works" className="relative bg-gradient-to-b from-white via-mutedBrown-50 via-mutedBrown-100 via-mutedBrown-200 to-mutedBrown-300">
      {/* Gradient overlay for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sage-50/30 via-mutedBrown-100/50 via-mutedBrown-200/70 to-mutedBrown-300/90" />
      
      {/* Simplified background decoration */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gold-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-warmOrange-200 rounded-full blur-3xl" />
      </div>
      
      {/* Header Section */}
      <div className="container mx-auto px-4 sm:px-6 md:px-6 relative z-10">
        <motion.div 
          className="text-center flex flex-col justify-center py-8 md:py-12 lg:py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-brown-800 mb-3 md:mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-brown-700 max-w-2xl mx-auto leading-relaxed">
            From browsing to enjoying delicious meals at your doorstep - we've made it incredibly simple in just 4 easy steps.
          </p>
        </motion.div>
      </div>

      {/* Steps Container - Simple layout */}
      <div className="container mx-auto px-4 sm:px-6 md:px-6 pb-12 md:pb-16 lg:pb-20 relative z-10">
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-12 px-4 sm:px-6 md:px-0">
          {steps.map((step, index) => (
            <StepCard 
              key={index}
              step={step} 
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div id="start-food-journey" className="container mx-auto px-4 sm:px-6 md:px-6 pb-12 md:pb-16 lg:pb-24 pt-24 md:pt-32 lg:pt-40 relative z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white border-2 border-black shadow-xl max-w-2xl mx-auto overflow-hidden relative">
            {/* Accent line */}
            <div className="h-2 w-full bg-gradient-to-r from-primary via-secondary to-accent"></div>
            
            {/* Background decorative pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-8 left-8 w-16 h-16 bg-primary rounded-full"></div>
              <div className="absolute bottom-8 right-8 w-20 h-20 bg-secondary rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-accent rounded-full"></div>
            </div>
            
            {/* Curved Arrow Indicator */}
            <motion.div 
              className="absolute -top-8 -right-8 md:-top-12 md:-right-12 z-30"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 5, 0],
                transition: { 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }
              }}
            >
              <svg 
                width="60" 
                height="60" 
                viewBox="0 0 60 60" 
                fill="none" 
                className="text-accent"
                style={{ color: '#D08C60' }}
              >
                <path 
                  d="M15 10 C 25 5, 35 5, 45 15 C 50 20, 50 30, 45 35 L 40 30 M 45 35 L 50 40" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  fill="none"
                />
                <circle cx="48" cy="38" r="2" fill="currentColor" />
              </svg>
              <div className="absolute -bottom-6 -right-2 text-xs font-bold text-accent rotate-12 whitespace-nowrap" style={{ color: '#D08C60' }}>
                Try it!
              </div>
            </motion.div>
            
            <div className="relative z-10 p-4 md:p-6 lg:p-8">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-black mb-4 md:mb-6 tracking-tight">
                Start Your Food Journey
              </h3>
              <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6 leading-relaxed font-medium">
                Take a <span className="text-primary font-bold">3-day trial</span> and let your taste buds decide. 
                <br className="hidden md:block" />
                No longterm commitment, just Amma's food delivered to your doorstep.
              </p>
              <motion.button 
                onClick={handleSignUpClick}
                className="bg-primary hover:bg-secondary text-white font-bold text-base md:text-lg px-6 md:px-10 py-3 md:py-4 border-2 border-black shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-900"
                style={{ backgroundColor: '#825F45' }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                aria-label="Sign up for Myna Kitchen"
              >
                Sign up
              </motion.button>
              <div className="mt-4 flex flex-wrap justify-center gap-3 md:gap-6 text-xs md:text-sm text-gray-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" style={{ backgroundColor: '#D08C60' }}></div>
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full" style={{ backgroundColor: '#797D62' }}></div>
                  <span>Free delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" style={{ backgroundColor: '#825F45' }}></div>
                  <span>Satisfaction guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 