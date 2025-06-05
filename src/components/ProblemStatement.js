import React from 'react';
import { motion } from 'framer-motion';
import './ProblemStatement.css';

const ProblemStatement = () => {
  const problems = [
    {
      id: 'busy',
      title: 'Too Busy to Cook?',
      description: 'Your schedule is packed. Between work, commute, and life, who has time to plan, shop, and cook?',
      icon: '⏰',
      fact: 'Average person works 8+ hours daily'
    },
    {
      id: 'junk',
      title: 'Stuck with Junk Food?',
      description: 'Quick fixes lead to unhealthy choices. Fast food becomes the norm when convenience matters most.',
      icon: '🍔',
      fact: '70% of daily intake is processed food'
    },
    {
      id: 'expensive',
      title: 'Tired of Overspending on Food?',
      description: 'Ordering out daily burns through your budget. Groceries expire unused. Money down the drain.',
      icon: '💸',
      fact: 'Spend ₹500+ daily on food delivery'
    },
    {
      id: 'away',
      title: 'Away from Home?',
      description: 'Living away from family means no home-cooked meals. Missing that comfort and nutrition.',
      icon: '🏠',
      fact: 'Missing the comfort of home-cooked meals'
    }
  ];

  return (
    <>
      {/* Problem Statement Section */}
      <section id="problem-statement" className="problem-section">
        <div className="container mx-auto px-4 md:px-6">
          {/* Problem Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.h2 
              className="problem-title"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            >
              We Know Your <span style={{color: '#D08C60'}}>Daily Struggle</span>
            </motion.h2>
            <motion.p 
              className="problem-subtitle"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            >
              Modern life shouldn't mean compromising on nutrition and taste
            </motion.p>
          </motion.div>

          {/* Problems List */}
          <div className="problems-list">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.id}
                className="problem-item"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              >
                <motion.div 
                  className="problem-icon-large"
                  initial={{ scale: 0.8, rotate: -90 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                >
                  {problem.icon}
                </motion.div>
                
                <div className="problem-content-text">
                  <motion.h3 
                    className="problem-title-large"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.25 + index * 0.1, ease: "easeOut" }}
                  >
                    {problem.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="problem-description-text"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                  >
                    {problem.description}
                  </motion.p>
                  
                  <motion.div 
                    className="problem-fact"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: 0.35 + index * 0.1, ease: "easeOut" }}
                  >
                    {problem.fact}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Transition to Solution - Reduced spacing */}
          <motion.div 
            className="problem-cta mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
          >
            <h3 className="cta-title">Ready to Break Free from These Problems?</h3>
            <p className="cta-description">Let us handle your daily meals while you focus on what matters most</p>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Unified Design */}
      <section id="features" className="solution-section">
        <div className="container mx-auto px-4 md:px-6">
          {/* Unified Header Section */}
          <div className="unified-hero-section">
            {/* Header Section - Reduced spacing */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <motion.h2 
                className="hero-title"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              >
                Myna <span className="text-primary">Kitchen</span>
              </motion.h2>
              <motion.h3 
                className="hero-subtitle"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
              >
                Daily Meals Delivered
              </motion.h3>
              <motion.p 
                className="hero-description"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              >
                With us you no longer have to run a kitchen, manage groceries or worry about your daily food.
              </motion.p>
              
              {/* New text addition */}
              <motion.p 
                className="hero-description-sub mt-4 text-lg md:text-xl text-gray-700 font-medium"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
              >
                Fresh homely meals delivered to you day by day, meal by meal
              </motion.p>

              {/* Pricing Text and Button - Reduced spacing */}
              <motion.div 
                className="hero-pricing-section mt-6 mb-12"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              >
                <motion.p 
                  className="pricing-text text-2xl md:text-3xl font-bold text-primary mb-6 tracking-wide"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
                  style={{
                    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                    letterSpacing: "0.02em",
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}
                >
                  Prices starting at ₹80/day
                </motion.p>
                
                <motion.button 
                  className="cta-button bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const section = document.getElementById('subscription-plans');
                    if (section) {
                      window.scrollTo({
                        top: section.offsetTop - 80,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  Check plans and prices
                </motion.button>
              </motion.div>

              {/* Tokyo-style Feature Grid - Restored original design */}
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12">
                {[
                  {
                    icon: '🍽️',
                    title: 'Responsible Eating',
                    subtitle: 'NUTRITIONALLY BALANCED',
                    description: 'Perfectly balanced selection throughout the day',
                    accent: '#825F45',
                    bgPattern: 'radial-gradient(circle at 20% 80%, #825F45 0%, transparent 50%)',
                    tags: ['Fresh ingredients', 'Balanced nutrition']
                  },
                  {
                    icon: '🚚',
                    title: 'Reliable Delivery',
                    subtitle: 'ZERO DELIVERY FEES',
                    description: 'Right on time, always fresh and ready',
                    accent: '#797D62',
                    bgPattern: 'radial-gradient(circle at 80% 20%, #797D62 0%, transparent 50%)',
                    tags: ['Free delivery', 'On-time guarantee']
                  },
                  {
                    icon: '📅',
                    title: 'Flexible Plans',
                    subtitle: 'ULTIMATE CONVENIENCE',
                    description: 'Weekdays, everyday, or specific days. Cancel meals or change delivery location from office to home anytime.',
                    accent: '#D08C60',
                    bgPattern: 'radial-gradient(circle at 20% 20%, #D08C60 0%, transparent 50%)',
                    tags: ['Cancel anytime', 'Change location', 'Flexible scheduling']
                  },
                  {
                    icon: '👨‍🍳',
                    title: 'Fresh Preparation',
                    subtitle: 'NO PRESERVATIVES',
                    description: 'New meals everyday, prepared by passionate chefs daily with fresh ingredients',
                    accent: '#997B66',
                    bgPattern: 'radial-gradient(circle at 80% 80%, #997B66 0%, transparent 50%)',
                    tags: ['New meals daily', 'Passionate chefs', 'No additives']
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    {/* Main Card */}
                    <div className="bg-white border-2 border-black shadow-2xl overflow-hidden relative h-full transform transition-transform duration-200 hover:translate-y-[-4px]">
                      {/* Accent line */}
                      <div 
                        className="h-2 w-full" 
                        style={{backgroundColor: feature.accent}}
                      ></div>
                      
                      {/* Background Pattern */}
                      <div 
                        className="absolute inset-0 opacity-5"
                        style={{background: feature.bgPattern}}
                      ></div>
                      
                      {/* Content */}
                      <div className="relative p-6 md:p-8">
                        {/* Header with Icon and Visual */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-3 md:space-x-4">
                            <div 
                              className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 border-black text-xl md:text-2xl"
                              style={{backgroundColor: `${feature.accent}20`}}
                            >
                              {feature.icon}
                            </div>
                            <div>
                              <h3 className="text-xl md:text-2xl font-black text-black tracking-tight">{feature.title}</h3>
                              <p className="text-xs text-tertiary uppercase tracking-widest font-bold">{feature.subtitle}</p>
                            </div>
                          </div>
                          
                          {/* Large Visual Element */}
                          <div className="text-4xl md:text-6xl opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                            {feature.icon}
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-primary text-base md:text-lg leading-relaxed mb-6 font-medium">
                          {feature.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {feature.tags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="px-2 py-1 md:px-3 md:py-1 text-xs font-bold uppercase tracking-wider border border-black text-black hover:bg-black hover:text-white transition-colors duration-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* Decorative Element */}
                        <motion.div 
                          className="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-8 h-8 md:w-12 md:h-12 border-2 opacity-30"
                          style={{borderColor: feature.accent}}
                          animate={{ 
                            rotate: [0, 90, 180, 270, 360],
                          }}
                          transition={{ 
                            duration: 20, 
                            repeat: Infinity,
                            ease: "linear" 
                          }}
                        ></motion.div>
                      </div>
                    </div>
                    
                    {/* Floating accent shadow - optimized */}
                    <motion.div 
                      className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-full h-full border-2 border-gray-700 -z-10"
                      style={{backgroundColor: `${feature.accent}10`}}
                      animate={{ 
                        x: [0, 1, 0, -1, 0],
                        y: [0, -1, 0, 1, 0]
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    ></motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom decorative element */}
              <motion.div 
                className="text-center mt-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <div className="inline-flex items-center space-x-4 text-gray-500">
                  <div className="w-16 h-px bg-gray-300"></div>
                  <span className="text-sm uppercase tracking-widest font-bold">Myna Kitchen</span>
                  <div className="w-16 h-px bg-gray-300"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProblemStatement; 