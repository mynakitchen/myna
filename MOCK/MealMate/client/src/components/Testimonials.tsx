import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ShieldCheck, Heart, Award, Users } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
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
    <section id="testimonials" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Customer Success Stats */}
        <div className="relative mb-24">
          <div 
            className="absolute inset-0 bg-gray-100 skew-y-3 -z-10 rounded-3xl"
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
              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                <span ref={countRef} className="text-6xl text-primary">{count.toLocaleString()}</span>
                <span className="block">Meals Delivered</span>
                <span className="block text-2xl font-medium text-gray-600 mt-2">and counting...</span>
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                We are growing fast, and our food is tasted by hundreds of people daily. Our dedication to quality, freshness, and taste has made us a favorite meal delivery service across Chennai's tech corridor.
              </p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
                  <Heart className="text-primary mr-2 w-5 h-5" />
                  <span className="font-medium">Happy customers</span>
                </div>
                <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
                  <Award className="text-primary mr-2 w-5 h-5" />
                  <span className="font-medium">Quality ingredients</span>
                </div>
                <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
                  <Users className="text-primary mr-2 w-5 h-5" />
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
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xl font-semibold">4.9 out of 5 stars</p>
                  <p className="text-white/80">Based on 1,200+ reviews</p>
                </div>
              </motion.div>
              
              {/* Floating testimonial cards */}
              <motion.div 
                className="absolute -top-10 -right-10 bg-white rounded-lg shadow-lg p-4 max-w-xs hidden md:block"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.8 }}
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700">"The food is always hot and fresh! Love the menu variety."</p>
                <div className="text-xs text-gray-500 mt-2">- Amrita S.</div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-10 -left-10 bg-white rounded-lg shadow-lg p-4 max-w-xs hidden md:block"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 1.0 }}
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700">"Best decision I've made for my busy work schedule!"</p>
                <div className="text-xs text-gray-500 mt-2">- Vikas R.</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Removed standalone heading section to make testimonials more seamless */}
        
        {/* Testimonial Cards - Modern Layout */}
        <div className="relative mb-24">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gray-200 -translate-y-1/2"></div>
          
          <div className="relative">
            {/* Left/Right controls */}
            <motion.button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:-left-5 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center"
              whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </motion.button>
            
            <motion.button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 md:-right-5 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center"
              whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
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
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
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
                      <div className="flex items-center text-gray-500 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>Verified customer</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Previous and next testimonial previews */}
                  <div className="hidden lg:flex flex-col justify-between gap-4">
                    {/* Preview of the next testimonial */}
                    <div className="bg-white rounded-xl p-6 shadow-md flex-1">
                      <div className="flex space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
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
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
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
              
              {/* Navigation dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    className={`transition-all duration-300 ${
                      index === activeIndex 
                        ? "w-8 bg-primary rounded-full h-2" 
                        : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
                    }`}
                    onClick={() => {
                      setAutoplay(false);
                      setActiveIndex(index);
                    }}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Satisfaction Guarantee */}
        <motion.div
          className="bg-white shadow-xl rounded-2xl overflow-hidden mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <ShieldCheck className="mr-2 h-5 w-5" />
                <span className="font-semibold">Our Promise</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Satisfaction Guaranteed</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We stand behind the quality of every meal we serve. If you're not completely satisfied with your order, we'll make it right - no questions asked.
              </p>
              <a 
                href="#" 
                className="text-primary font-medium hover:underline inline-flex items-center"
              >
                Learn more about our guarantee
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <div className="md:w-1/2 bg-gradient-to-br from-primary/90 to-primary hidden md:flex items-center justify-center p-12">
              <div className="text-white text-center">
                <h4 className="text-3xl font-bold mb-3">100%</h4>
                <p className="text-white/90 mb-6">Money-back Guarantee</p>
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                    <ShieldCheck className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Featured In */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-8">As Featured In</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
            <motion.img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Epicurious_Logo.svg/320px-Epicurious_Logo.svg.png"
              alt="Epicurious"
              className="h-6 md:h-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
              whileHover={{ scale: 1.1, opacity: 1, filter: "grayscale(0)" }}
            />
            <motion.img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Kitchn_Logo.svg/320px-Kitchn_Logo.svg.png"
              alt="Kitchn"
              className="h-6 md:h-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
              whileHover={{ scale: 1.1, opacity: 1, filter: "grayscale(0)" }}
            />
            <motion.img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Self_Magazine_Logo.svg/320px-Self_Magazine_Logo.svg.png"
              alt="Self"
              className="h-6 md:h-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
              whileHover={{ scale: 1.1, opacity: 1, filter: "grayscale(0)" }}
            />
            <motion.img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Glamour_Magazine_Logo.svg/320px-Glamour_Magazine_Logo.svg.png"
              alt="Glamour"
              className="h-6 md:h-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
              whileHover={{ scale: 1.1, opacity: 1, filter: "grayscale(0)" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Custom hook for intersection observer
function useIntersectionObserver(ref: React.RefObject<HTMLElement>) {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);
  
  return isInView;
}
