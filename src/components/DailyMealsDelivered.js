import React from 'react';
import { motion } from 'framer-motion';
import './DailyMealsDelivered.css';

const DailyMealsDelivered = () => {
  const solutionFeatures = [
    {
      icon: '🍽️',
      title: 'Daily Meals Delivered',
      description: 'Fresh, home-style meals prepared daily and delivered right to your doorstep'
    },
    {
      icon: '⏰',
      title: 'Save Your Time',
      description: 'No more planning, shopping, or cooking. We handle everything while you focus on what matters'
    },
    {
      icon: '💰',
      title: 'Budget-Friendly',
      description: 'Starting at ₹80/day - more affordable than ordering out, with zero waste'
    },
    {
      icon: '🏠',
      title: 'Home-Style Comfort',
      description: 'Taste the comfort of home-cooked meals, even when you\'re away from family'
    }
  ];

  // Animation variants for the main title
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Animation variants for individual letters of "Myna Kitchen"
  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  // Split "Myna Kitchen" into individual letters for animation
  const title = "Myna Kitchen";
  const letters = title.split("");

  return (
    <section id="daily-meals-delivered" className="daily-meals-delivered-section">
      <div className="container mx-auto px-4 md:px-6">
        {/* Enhanced Daily Meals Header with "Myna Kitchen" animation */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Animated "Myna Kitchen" Title */}
          <motion.div 
            className="mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-2 text-gray-900 tracking-tight overflow-hidden">
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  className="inline-block"
                  style={{ 
                    background: letter === " " ? "transparent" : `linear-gradient(135deg, #D4930D, #8B1538)`,
                    WebkitBackgroundClip: letter === " " ? "initial" : "text",
                    WebkitTextFillColor: letter === " " ? "transparent" : "transparent",
                    backgroundClip: letter === " " ? "initial" : "text",
                    color: letter === " " ? "transparent" : "#1a1a1a"
                  }}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* Animated subtitle */}
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-700 tracking-tight"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Daily Meals <motion.span 
              className="text-primary"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.6, type: "spring", bounce: 0.4 }}
            >
              Delivered
            </motion.span>
          </motion.h2>
          
          {/* Animated description */}
          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            With us you no longer have to run a kitchen, manage groceries or worry about your daily food.
          </motion.p>

          {/* Decorative elements */}
          <motion.div
            className="flex justify-center mt-8 space-x-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Solution Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {solutionFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="solution-feature-card bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.6 + index * 0.1,
                ease: "easeOut"
              }}
            >
              <motion.div 
                className="text-4xl md:text-5xl mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.3, 
                  delay: 0.7 + index * 0.1,
                  ease: "easeOut"
                }}
              >
                {feature.icon}
              </motion.div>
              <motion.h3 
                className="text-xl md:text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                {feature.title}
              </motion.h3>
              <motion.p 
                className="text-gray-600 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div 
          className="text-center bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 md:p-12 border border-primary/20 shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div 
            className="text-primary text-lg md:text-xl font-medium mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            Starting at
          </motion.div>
          <motion.div 
            className="text-5xl md:text-6xl font-black text-gray-900 mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              delay: 0.8, 
              duration: 0.6,
              type: "spring",
              bounce: 0.3
            }}
          >
            ₹80<span className="text-2xl md:text-3xl text-gray-600 font-normal">/day</span>
          </motion.div>
          <motion.p 
            className="text-gray-600 mb-8 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            Fresh homely meals delivered to you day by day, meal by meal
          </motion.p>
          
          <motion.button 
            className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-bold px-10 py-4 rounded-full shadow-lg text-lg transition-all transform"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(212, 147, 13, 0.3)"
            }}
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
      </div>
    </section>
  );
};

export default DailyMealsDelivered; 