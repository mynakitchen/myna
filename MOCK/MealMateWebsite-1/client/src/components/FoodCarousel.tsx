import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FOOD_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80",
    alt: "Food plate with vegetables"
  },
  {
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80",
    alt: "Pizza with toppings"
  },
  {
    src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80",
    alt: "Pancakes with fruits"
  },
  {
    src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80",
    alt: "Salmon dish"
  },
  {
    src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80",
    alt: "Breakfast toast"
  },
  {
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80",
    alt: "Healthy salad bowl"
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80",
    alt: "Grilled meat with vegetables"
  },
  {
    src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80",
    alt: "Pasta dish"
  },
  {
    src: "https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?auto=format&fit=crop&q=80",
    alt: "Burger with fries"
  },
  {
    src: "https://images.unsplash.com/photo-1596797038530-2c107aa7e1f3?auto=format&fit=crop&q=80",
    alt: "Homemade Indian meal with rice and curry"
  },
  {
    src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80",
    alt: "Indian thali with multiple dishes"
  },
  {
    src: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80",
    alt: "Homemade curry with naan bread"
  },
];

const FoodCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Function to cycle through images automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FOOD_IMAGES.length);
    }, 2500); // Change image every 2.5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden bg-black">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-2 items-center">
          {/* Left content - Text */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
              <span className="block mb-4">Myna Kitchen</span>
              <span className="text-4xl md:text-5xl block font-normal">Daily meals delivered</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 leading-relaxed opacity-80">
              With us you no longer have to run a kitchen, manage groceries or worry about your daily food.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
              <a 
                href="#explore" 
                className="px-8 py-4 rounded-full bg-white text-black font-medium text-lg transition-all hover:bg-opacity-90 transform hover:scale-105"
              >
                Try Today
              </a>
              <a 
                href="#learn" 
                className="px-8 py-4 rounded-full bg-transparent border-2 border-white text-white font-medium text-lg transition-all hover:bg-white hover:bg-opacity-10 transform hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>
          
          {/* Right content - Apple-style grid carousel */}
          <div className="w-full h-full relative">
            {/* The "GIVE FOOD, GET LOVE" text overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <div className="text-center">
                <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none">
                  <span className="block">GIVE</span>
                  <span className="block text-3xl md:text-5xl my-2 md:my-4">FOOD</span>
                  <span className="block">GET</span>
                  <span className="block text-3xl md:text-5xl mt-2 md:mt-4">LOVE</span>
                </h2>
              </div>
            </div>
            
            {/* Grid of images */}
            <div 
              className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 rounded-2xl overflow-hidden"
              ref={containerRef}
            >
              {FOOD_IMAGES.map((image, index) => (
                <div 
                  key={index}
                  className="relative overflow-hidden rounded-lg aspect-square"
                >
                  <AnimatePresence>
                    <motion.img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        filter: index % 3 === activeIndex % 3 ? 'brightness(1.2)' : 'brightness(0.8)'
                      }}
                      transition={{ 
                        opacity: { duration: 0.8 },
                        scale: { duration: 1.2 },
                        filter: { duration: 1.5 }
                      }}
                    />
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodCarousel;
