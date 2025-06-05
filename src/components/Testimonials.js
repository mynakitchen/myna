import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faChevronLeft, faChevronRight, faHeart, faAward, faUsers } from '@fortawesome/free-solid-svg-icons';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    name: "Arjun Murthy",
    meal: "Regular subscriber - Weekday Plan",
    quote: "Myna Kitchen has simplified my life. As a busy professional, I no longer worry about cooking or ordering from random places. Their food is consistently delicious and reminds me of home-cooked meals.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    meal: "Monthly subscriber",
    quote: "The variety of dishes keeps things interesting, and the portion sizes are perfect. I appreciate that they use quality ingredients and deliver on time every day. Highly recommended!",
    rating: 5
  },
  {
    name: "Karthik Rajan",
    meal: "Quarterly subscriber",
    quote: "What I love about Myna Kitchen is the flexibility. I can pause my subscription when I'm traveling, and the team is always accommodating. The food quality has been excellent for the past three months.",
    rating: 5
  },
  {
    name: "Divya Krishnan",
    meal: "Half-yearly subscriber",
    quote: "I've tried several meal services in Chennai, and Myna Kitchen stands out for its authentic flavors and reliability. The food is never late, and customer service is excellent.",
    rating: 5
  }
];

// Custom hook for intersection observer
function useIntersectionObserver(ref) {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const currentRef = ref.current; // Store ref.current in a variable
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref]);

  return isInView;
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef(null);
  
  // Animated count for meals served
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const isInViewCount = useIntersectionObserver(countRef);
  
  useEffect(() => {
    if (isInViewCount && count < 10000) {
      // Animate count from 0 to 10000
      const duration = 2000; // 2 seconds
      const increment = 200;
      const steps = 10000 / increment;
      const intervalTime = duration / steps;
      
      const interval = setInterval(() => {
        setCount(prevCount => {
          const newCount = prevCount + increment;
          return newCount >= 10000 ? 10000 : newCount;
        });
      }, intervalTime);
      
      return () => clearInterval(interval);
    }
  }, [isInViewCount, count]);

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
      }, 5000);
    }
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay]);

  const nextTestimonial = () => {
    setAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setAutoplay(false);
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const currentTestimonial = TESTIMONIALS[activeIndex];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-b from-mutedBrown-300 via-mutedBrown-200 via-mutedBrown-100 to-white overflow-hidden section-fade">
      <div className="container mx-auto px-4 md:px-6">
        {/* Customer Success Stats */}
        <div className="relative mb-24">
          <div 
            className="absolute inset-0 bg-mutedBrown-100/60 skew-y-3 -z-10 rounded-3xl"
            style={{ transformOrigin: 'bottom left' }}
          ></div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16 px-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-4xl lg:text-5xl font-bold text-brown-900 mb-6 leading-tight">
                <span ref={countRef} className="text-5xl lg:text-6xl text-primary">{count.toLocaleString()}</span>
                <span className="block">Meals Delivered</span>
                <span className="block text-xl lg:text-2xl font-medium text-brown-700 mt-2">and counting...</span>
              </h2>
              <p className="text-lg lg:text-xl text-brown-800 mb-8 leading-relaxed">
                We are growing fast, and our food is tasted by hundreds of people daily. Our dedication to quality, freshness, and taste has made us a favorite meal delivery service across the city. Over 90% of our trial customers continue their subscription after experiencing our quality service.
              </p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
                  <FontAwesomeIcon icon={faHeart} className="text-primary mr-2" />
                  <span className="font-medium">Happy customers</span>
                </div>
                <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
                  <FontAwesomeIcon icon={faAward} className="text-primary mr-2" />
                  <span className="font-medium">Quality ingredients</span>
                </div>
                <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
                  <FontAwesomeIcon icon={faUsers} className="text-primary mr-2" />
                  <span className="font-medium">Growing community</span>
                </div>
              </motion.div>
            </div>
            
            <div className="relative">
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square md:aspect-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Happy customers dining"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xl font-semibold">4.9 out of 5 stars</p>
                  <p className="text-white/80">Based on 500+ reviews</p>
                </div>
              </motion.div>
              
              {/* Floating testimonial cards */}
              <motion.div 
                className="absolute -top-10 -right-10 bg-white rounded-lg shadow-lg p-4 max-w-xs hidden md:block"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-xs" />
                  ))}
                </div>
                <p className="text-sm text-gray-700">"The food is always hot and fresh! Love the menu variety."</p>
                <div className="text-xs text-gray-500 mt-2">- Anjali S.</div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-10 -left-10 bg-white rounded-lg shadow-lg p-4 max-w-xs hidden md:block"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 1.0 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-xs" />
                  ))}
                </div>
                <p className="text-sm text-gray-700">"Best decision I've made for my busy work schedule!"</p>
                <div className="text-xs text-gray-500 mt-2">- Vikram R.</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Testimonial Cards */}
        <div className="text-center mb-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Our Customers Say
          </motion.h2>
        </div>
        
        <div className="relative mb-16">
          <div className="relative">
            {/* Left/Right controls */}
            <motion.button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:-left-5 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-gray-700" />
            </motion.button>
            
            <motion.button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 md:-right-5 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-gray-700" />
            </motion.button>
            
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -200 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex flex-col md:flex-row gap-8"
                >
                  {/* Testimonial Card - Featured */}
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 flex-1 shadow-lg border border-primary/10">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="flex space-x-1 mb-2">
                          {[...Array(currentTestimonial.rating)].map((_, i) => (
                            <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />
                          ))}
                        </div>
                        <h3 className="font-bold text-lg">{currentTestimonial.name}</h3>
                        <p className="text-gray-500 text-sm">{currentTestimonial.meal}</p>
                      </div>
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary text-2xl font-bold">M</span>
                      </div>
                    </div>
                    <blockquote className="text-gray-700 text-lg leading-relaxed mb-4">
                      "{currentTestimonial.quote}"
                    </blockquote>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center mb-4">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Verified customer</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Previous and next testimonial previews */}
                  <div className="hidden lg:flex flex-col justify-between gap-4">
                    {/* Preview of the next testimonial */}
                    <div className="bg-white rounded-xl p-6 shadow-md flex-1">
                      <div className="flex space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-xs" />
                        ))}
                      </div>
                      <p className="text-gray-700 text-sm line-clamp-3">
                        "{TESTIMONIALS[(activeIndex + 1) % TESTIMONIALS.length].quote.slice(0, 100)}..."
                      </p>
                      <div className="mt-3">
                        <p className="font-medium text-sm">{TESTIMONIALS[(activeIndex + 1) % TESTIMONIALS.length].name}</p>
                      </div>
                    </div>
                    
                    {/* Preview of the previous testimonial */}
                    <div className="bg-white rounded-xl p-6 shadow-md flex-1">
                      <div className="flex space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-xs" />
                        ))}
                      </div>
                      <p className="text-gray-700 text-sm line-clamp-3">
                        "{TESTIMONIALS[(activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length].quote.slice(0, 100)}..."
                      </p>
                      <div className="mt-3">
                        <p className="font-medium text-sm">{TESTIMONIALS[(activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length].name}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 