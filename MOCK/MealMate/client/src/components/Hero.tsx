import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5], [0, 45]);
  
  // For 3D carousel effect with high-quality food images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
  ];
  
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isHovered, images.length]);
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  
  // Apple-inspired scroll effects for Y-axis rotation of the carousel
  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;
      
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollPercentage = Math.min(scrollPosition / windowHeight, 1);
      
      // Apply Y-axis rotation (like spinning on a vertical axis) as user scrolls
      carouselRef.current.style.transform = `perspective(1000px) rotateY(${scrollPercentage * 35}deg)`;
      
      // Add subtle variations in scale and opacity for more depth
      const scaleValue = 1 - (scrollPercentage * 0.15);
      const opacityValue = 1 - (scrollPercentage * 0.5);
      
      carouselRef.current.style.scale = `${scaleValue}`;
      carouselRef.current.style.opacity = `${opacityValue}`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" ref={scrollRef} className="relative bg-white h-screen overflow-hidden">
      {/* Apple-inspired hero section with parallax effect */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-white to-secondary"
        style={{ 
          opacity: 0.9,
          transform: "translateZ(0)"
        }}
      ></div>
      
      <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center h-full relative z-10 pt-20">
        <motion.div 
          className="w-full lg:w-1/2 lg:pr-10 space-y-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-block px-4 py-1.5 bg-primary text-white text-sm font-semibold rounded-full">
            FREE DELIVERY
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
            Food Sorted.<br/>
            <span className="text-primary">Life's Sorted.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-light">
            Delicious home-style meals delivered to your doorstep. 
            With us you no longer have to run a kitchen, manage groceries or worry about your daily food.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button 
              onClick={() => scrollToSection('try-a-meal')}
              className="bg-accent hover:bg-orange-600 text-white font-medium px-8 py-6 h-auto rounded-full shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
            >
              Try a Meal
            </Button>
            <Button
              onClick={() => scrollToSection('explore-menu')}
              variant="outline"
              className="bg-white hover:bg-gray-100 text-gray-800 font-medium px-8 py-6 h-auto rounded-full shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
            >
              Explore Menu
            </Button>
          </div>
        </motion.div>
        
        {/* 3D Image Carousel with Y-axis rotation on scroll */}
        <motion.div 
          ref={carouselRef}
          className="w-full lg:w-1/2 mt-12 lg:mt-0 perspective-1000"
          style={{ y, opacity }}
          initial={{ opacity: 0, rotateY: 45 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl transform-style-3d h-[500px]">
            {images.map((img, index) => (
              <motion.div 
                key={index}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ 
                  opacity: currentImageIndex === index ? 1 : 0,
                  rotateY: currentImageIndex === index ? 0 : 90,
                  zIndex: currentImageIndex === index ? 10 : 0
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <img 
                  src={img} 
                  alt={`Fresh cooked meal ${index + 1}`}
                  className="w-full h-full object-cover"
                  style={{ 
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                    transition: "transform 0.5s ease"
                  }}
                />
              </motion.div>
            ))}
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-20"></div>
            
            {/* Image navigation dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    currentImageIndex === index ? "bg-white" : "bg-white/50"
                  } transition-colors`}
                  onClick={() => setCurrentImageIndex(index)}
                ></button>
              ))}
            </div>
          </div>
          
          {/* Floating accent elements */}
          <motion.div 
            className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent rounded-full z-0 opacity-30 blur-xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ 
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity
            }}
          ></motion.div>
          
          <motion.div 
            className="absolute -top-8 -left-8 w-32 h-32 bg-primary rounded-full z-0 opacity-20 blur-xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2] 
            }}
            transition={{ 
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 1
            }}
          ></motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity
        }}
      >
        <div className="text-gray-500 mb-2 text-sm tracking-wide">Scroll to discover</div>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-500"
        >
          <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
