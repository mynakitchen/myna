import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './Features.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlFood, faTruck, faCalendarCheck, faClock } from '@fortawesome/free-solid-svg-icons';

const Features = () => {
  // Create refs for each feature section
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  
  const features = [
    {
      icon: faBowlFood,
      title: 'Meals & Super Meals',
      subtitle: 'NUTRITIONALLY BALANCED',
      description: 'Perfectly balanced selection throughout the day',
      visual: '🍽️',
      accent: '#825F45', // Primary brown
      bgPattern: 'radial-gradient(circle at 20% 80%, #825F45 0%, transparent 50%)',
      tags: ['Fresh ingredients', 'Balanced nutrition']
    },
    {
      icon: faTruck,
      title: 'Punctual Delivery',
      subtitle: 'ZERO DELIVERY FEES',
      description: 'Right on time, always fresh and ready',
      visual: '🚚',
      accent: '#797D62', // Sage green
      bgPattern: 'radial-gradient(circle at 80% 20%, #797D62 0%, transparent 50%)',
      tags: ['Free delivery', 'On-time guarantee']
    },
    {
      icon: faCalendarCheck,
      title: 'Flexible Plans',
      subtitle: 'ULTIMATE CONVENIENCE',
      description: 'Weekdays, everyday, or specific days',
      visual: '📅',
      accent: '#D08C60', // Warm orange
      bgPattern: 'radial-gradient(circle at 20% 20%, #D08C60 0%, transparent 50%)',
      tags: ['Cancel anytime', 'Customizable']
    },
    {
      icon: faClock,
      title: 'Fresh Preparation',
      subtitle: 'NO PRESERVATIVES',
      description: 'Prepared by passionate chefs daily',
      visual: '👨‍🍳',
      accent: '#997B66', // Muted brown
      bgPattern: 'radial-gradient(circle at 80% 80%, #997B66 0%, transparent 50%)',
      tags: ['Fresh ingredients', 'No additives']
    }
  ];

  return (
    <section id="features" className="py-20 md:py-32 overflow-hidden section-fade bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
          </motion.div>
        </div>

        {/* Tokyo-style Feature Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              ref={index === 0 ? ref1 : index === 1 ? ref2 : index === 2 ? ref3 : ref4}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Main Card */}
              <div className="bg-white border-2 border-black shadow-2xl overflow-hidden relative h-full">
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
                <div className="relative p-8">
                  {/* Header with Icon and Visual */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-black"
                        style={{backgroundColor: `${feature.accent}20`}}
                      >
                        <FontAwesomeIcon 
                          icon={feature.icon} 
                          className="w-8 h-8"
                          style={{color: feature.accent}}
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-black tracking-tight">{feature.title}</h3>
                        <p className="text-xs text-tertiary uppercase tracking-widest font-bold">{feature.subtitle}</p>
                      </div>
                    </div>
                    
                    {/* Large Visual Element */}
                    <div className="text-6xl opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                      {feature.visual}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-primary text-lg leading-relaxed mb-6 font-medium">
                    {feature.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 text-xs font-bold uppercase tracking-wider border border-black text-black hover:bg-black hover:text-white transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Decorative Element */}
                  <motion.div 
                    className="absolute bottom-4 right-4 w-12 h-12 border-2 opacity-30"
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
              
              {/* Floating accent shadow */}
              <motion.div 
                className="absolute -bottom-4 -right-4 w-full h-full border-2 border-tertiary -z-10"
                style={{backgroundColor: `${feature.accent}10`}}
                animate={{ 
                  x: [0, 2, 0, -2, 0],
                  y: [0, -2, 0, 2, 0]
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
          <div className="inline-flex items-center space-x-4 text-tertiary">
            <div className="w-16 h-px bg-tertiary/30"></div>
            <span className="text-sm uppercase tracking-widest font-bold">Myna Kitchen</span>
            <div className="w-16 h-px bg-tertiary/30"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 