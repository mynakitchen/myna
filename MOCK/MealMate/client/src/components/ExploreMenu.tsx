import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronsDown, ChevronsUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MENU_ITEMS } from "@/lib/constants";

type MenuItem = typeof MENU_ITEMS[0];

export default function ExploreMenu() {
  const [activeCategory, setActiveCategory] = useState("Greatest Hits");
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Updated categories based on the newly added menu items in constants.ts
  const categories = ["Greatest Hits", "Supermeals", "Easy Meals", "Day Starters"];
  
  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);
  
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Apple-inspired scroll animation for menu cards
  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;
      
      const cards = carouselRef.current.querySelectorAll('.menu-card');
      const carouselRect = carouselRef.current.getBoundingClientRect();
      const centerX = carouselRect.left + carouselRect.width / 2;
      
      cards.forEach((card) => {
        const cardEl = card as HTMLElement;
        const cardRect = cardEl.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const distanceFromCenter = Math.abs(centerX - cardCenterX);
        const maxDistance = window.innerWidth / 2;
        
        // Calculate scale based on distance from center
        let scale = 1 - (distanceFromCenter / maxDistance) * 0.15;
        scale = Math.max(0.85, scale); // Don't scale below 0.85
        
        // Calculate opacity based on distance from center
        let opacity = 1 - (distanceFromCenter / maxDistance) * 0.5;
        opacity = Math.max(0.6, opacity); // Don't fade below 0.6
        
        // Apply transformations
        cardEl.style.transform = `scale(${scale})`;
        cardEl.style.opacity = opacity.toString();
      });
    };
    
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      // Initial calculation
      handleScroll();
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [activeCategory]);

  // Price indicator based on category
  const getCategoryPrice = () => {
    switch(activeCategory) {
      case "Supermeals": return "₹150";
      case "Easy Meals": return "₹120";
      case "Day Starters": return "₹100";
      default: return "₹120";
    }
  };

  return (
    <section id="explore-menu" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
            Explore The Menu
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-4">
            Find your new favorite meal with delicious options starting at {getCategoryPrice()} per serving
          </p>
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-medium text-lg text-gray-900 mb-2">Preorder Pricing</h3>
            <p className="text-gray-600 text-base mb-3">
              Order 4 hours in advance for your mealtime and enjoy our best rates
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg border border-primary/20">
                <span className="font-semibold text-primary block">Supermeals</span>
                <span className="text-xl font-bold">₹150</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-primary/20">
                <span className="font-semibold text-primary block">Meals</span>
                <span className="text-xl font-bold">₹130</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-primary/20">
                <span className="font-semibold text-primary block">Day Starters</span>
                <span className="text-xl font-bold">₹100</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-3">*Desserts and Juices prices may vary. Subscribers get Supermeals and Desserts included with their plan at no extra cost.</p>
          </div>
        </motion.div>
        
        {/* Menu Navigation - Apple-style tabs */}
        <motion.div
          className="flex justify-center mb-10 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex rounded-lg bg-gray-100 p-1.5 shadow-inner">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeCategory === category 
                    ? "bg-primary text-white shadow-md" 
                    : "text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Menu Carousel with 3D-like effects */}
        <div ref={carouselRef} className="relative mb-16">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div 
              ref={scrollRef}
              className="overflow-x-auto pb-8 hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex space-x-6 px-12" style={{ width: "max-content" }}>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <MenuItemCard item={item} />
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Navigation Arrows with animation */}
            <motion.button
              type="button"
              onClick={() => scroll("left")}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg z-10 hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="text-gray-800 w-6 h-6" />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => scroll("right")}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg z-10 hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="text-gray-800 w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
        
        {/* Expandable Full Menu Section */}
        <div className="mt-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-6 h-auto rounded-full shadow-md transition-all hover:shadow-lg hover:-translate-y-1 flex items-center gap-2"
            >
              {isExpanded ? 'Show Less' : 'Explore Full Menu'}
              {isExpanded ? <ChevronsUp className="w-5 h-5" /> : <ChevronsDown className="w-5 h-5" />}
            </Button>
          </motion.div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden mt-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {MENU_ITEMS.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.03 }}
                    >
                      <ExpandedMenuItemCard item={item} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <motion.div 
      className="w-64 md:w-72 bg-white rounded-xl overflow-hidden shadow-lg menu-card transform transition-all duration-300"
      whileHover={{ 
        y: -10, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
      layout
    >
      <div className="h-48 relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        {/* Price tag */}
        <div className="absolute bottom-3 left-3 bg-white rounded-full px-3 py-1 text-sm font-semibold shadow-md">
          ₹{item.price}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
          <div className="flex items-center text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-xs ml-1">4.8</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
        <div className="flex items-center justify-center">
          <span className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">
            View Details
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function ExpandedMenuItemCard({ item }: { item: MenuItem }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100">
      <div className="flex flex-col md:flex-row h-full">
        <div className="w-full md:w-1/3 h-32 md:h-auto relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
            {item.category}
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <span className="text-accent font-bold">₹{item.price}</span>
            </div>
            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
          </div>
          <div className="flex items-center justify-end mt-4">
            <Button 
              size="sm" 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white text-xs h-8 px-3"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
