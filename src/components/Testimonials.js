import React, { useState, useEffect, useRef } from 'react';
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
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasIntersected) {
          setIsIntersecting(true);
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, hasIntersected]);

  return isIntersecting;
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const isVisible = useIntersectionObserver(countRef);

  const currentTestimonial = TESTIMONIALS[activeIndex];

  // Counter animation
  useEffect(() => {
    if (isVisible) {
      const targetCount = 1200;
      const duration = 2000;
      const increment = targetCount / (duration / 16);
      let currentCount = 0;

      const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetCount) {
          currentCount = targetCount;
          clearInterval(timer);
        }
        setCount(Math.floor(currentCount));
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-b from-mutedBrown-300 via-mutedBrown-200 via-mutedBrown-100 to-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Customer Success Stats */}
        <div className="relative mb-24">
          <div 
            className="absolute inset-0 bg-mutedBrown-100/60 skew-y-3 -z-10 rounded-3xl"
            style={{ transformOrigin: 'bottom left' }}
          ></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16 px-8">
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-4xl lg:text-5xl font-bold text-brown-900 mb-6 leading-tight">
                <span ref={countRef} className="text-5xl lg:text-6xl text-primary">{count.toLocaleString()}</span>
                <span className="block">Meals Delivered</span>
                <span className="block text-xl lg:text-2xl font-medium text-brown-700 mt-2">and counting...</span>
              </h2>
              <p className="text-lg lg:text-xl text-brown-800 mb-8 leading-relaxed">
                We are growing fast, and our food is tasted by hundreds of people daily. Our dedication to quality, freshness, and taste has made us a favorite meal delivery service across the city. Over 90% of our trial customers continue their subscription after experiencing our quality service.
              </p>
              <div className="flex flex-wrap gap-4">
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
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square md:aspect-auto">
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
              </div>
              
              {/* Floating testimonial cards */}
              <div className="absolute -top-10 -right-10 bg-white rounded-lg shadow-lg p-4 max-w-xs hidden md:block hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-xs" />
                  ))}
                </div>
                <p className="text-sm text-gray-700">"The food is always hot and fresh! Love the menu variety."</p>
                <div className="text-xs text-gray-500 mt-2">- Anjali S.</div>
              </div>
              
              <div className="absolute -bottom-10 -left-10 bg-white rounded-lg shadow-lg p-4 max-w-xs hidden md:block hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-xs" />
                  ))}
                </div>
                <p className="text-sm text-gray-700">"Best decision I've made for my busy work schedule!"</p>
                <div className="text-xs text-gray-500 mt-2">- Vikram R.</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonial Cards */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
        </div>
        
        <div className="relative mb-16">
          <div className="relative">
            {/* Left/Right controls */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:-left-5 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-gray-700" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 md:-right-5 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-gray-700" />
            </button>
            
            <div className="overflow-hidden">
              <div
                key={activeIndex}
                className="flex flex-col md:flex-row gap-8 transition-opacity duration-500"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 