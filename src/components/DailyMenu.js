import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronLeft, 
  faChevronRight, 
  faChevronDown, 
  faChevronUp,
  faStar,
  faUsers,
  faCircle
} from '@fortawesome/free-solid-svg-icons';
import './DailyMenu.css';

// Dynamic menu items based on actual folder structure - UPDATED with multiple images
const MENU_ITEMS = [
  // Add-ons (meals with images)
  {
    id: "addon-1",
    name: "Cold Coffee",
    description: "Refreshing cold coffee perfect for any time",
    images: [
      "/menu/Add-ons/Cold Coffee/cold coffee ad.jpg",
      "/menu/Add-ons/Cold Coffee/coldcoffee.jpg",
      "/menu/Add-ons/Cold Coffee/coldocffee top.jpg"
    ],
    price: 45,
    category: "Add-ons"
  },
  {
    id: "addon-2", 
    name: "Mango Milkshake",
    description: "Creamy mango milkshake made with fresh mangoes",
    images: [
      "/menu/Add-ons/Mango Milkshake/Mango Milkshake.jpg",
      "/menu/Add-ons/Mango Milkshake/Akka mangoshake.jpg"
    ],
    price: 70,
    category: "Add-ons"
  },
  
  // Super Meals (meals with images, sorted alphabetically by number)
  {
    id: "super-1",
    name: "Sambhar Rice, Avial and Fish 65",
    description: "Traditional South Indian comfort meal with authentic flavors",
    images: ["/menu/Super Meals/1. Sambhar Rice, Avial and Fish 65/samabar rice + avial+ fish fry.jpg"],
    price: 150,
    category: "Super Meals"
  },
  {
    id: "super-2",
    name: "Idiyappam and Chicken Stew",
    description: "Kerala-style string hoppers with aromatic chicken stew",
    images: ["/menu/Super Meals/2. Idiyappam and Chicken Stew/idiyappam stew.jpg"],
    price: 150,
    category: "Super Meals"
  },
  {
    id: "super-3",
    name: "Rice, Keerai, Fish Fry and Fish Curry",
    description: "Complete meal with rice, greens, fish fry and curry",
    images: [
      "/menu/Super Meals/3. Rice, Keerai, Fish Fry and Fish Curry/rice+fishcurry+keeraiporiyal+fishfry.jpg",
      "/menu/Super Meals/3. Rice, Keerai, Fish Fry and Fish Curry/Mangomeenkulambu&Fishfry(1).JPG"
    ],
    price: 150,
    category: "Super Meals"
  },
  {
    id: "super-4",
    name: "Jackfruit Briyani with Chicken Varuthakari",
    description: "Unique jackfruit briyani served with spicy chicken varuthakari",
    images: ["/menu/Super Meals/4. Jackfruit Briyani with Chicken Varuthakari/jackfruit biriyani+chicken varuthakari+adaprathaman.jpg"],
    price: 150,
    category: "Super Meals"
  },
  {
    id: "super-5",
    name: "Chicken Kothu Parotta",
    description: "Popular street food with shredded parotta and chicken",
    images: [
      "/menu/Super Meals/5. Chicken Kothu Parotta/Parota.jpg",
      "/menu/Super Meals/5. Chicken Kothu Parotta/ChickenKothu&Salna.JPG"
    ],
    price: 150,
    category: "Super Meals"
  },
  {
    id: "super-6",
    name: "Ghee Rice, Chettinad Chicken and Omelette",
    description: "Aromatic ghee rice with spicy Chettinad chicken and fluffy omelette",
    images: ["/menu/Super Meals/6. Ghee Rice, Chettinad Chicken and Omelette/Gheerice&PepperChicken&Omellete.JPG"],
    price: 150,
    category: "Super Meals"
  },
  {
    id: "super-7",
    name: "Rice, Dal Fry and Nethili Fry",
    description: "Comfort meal with steamed rice, dal fry and crispy anchovies",
    images: ["/menu/Super Meals/7. Rice, Dal Fry and Nethili Fry/Rice&Dalfry&nethilifry.JPG"],
    price: 150,
    category: "Super Meals"
  },
  {
    id: "super-8",
    name: "Chicken Rice Bowls",
    description: "Protein-packed chicken rice bowls with aromatic spices",
    images: [
      "/menu/Super Meals/8. Chicken Rice Bowls/aPeriperichickenRicebowl.JPG",
      "/menu/Super Meals/8. Chicken Rice Bowls/Bloodchicken&jeera ricebowl.JPG"
    ],
    price: 150,
    category: "Super Meals"
  },
  {
    id: "super-9",
    name: "Chicken Briyani, Bread Halwa and Raita",
    description: "Classic chicken briyani with sweet bread halwa and cooling raita",
    images: [
      "/menu/Super Meals/9. Chicken Briyani, Bread Halwa and Raita/MushroomBriyani&Bindi(1).jpg",
      "/menu/Super Meals/9. Chicken Briyani, Bread Halwa and Raita/BhaiVeeduChickenBriyani&BreadAlwa.JPG",
      "/menu/Super Meals/9. Chicken Briyani, Bread Halwa and Raita/DonnechickenBriyani&chickenroast.JPG"
    ],
    price: 150,
    category: "Super Meals"
  },
  {
    id: "super-10",
    name: "Rice, Malabar Chicken, Gobi 65 and Rasam",
    description: "Traditional South Indian meal with spicy Malabar chicken and tangy rasam",
    images: ["/menu/Super Meals/10. Rice, Malabar Chicken, Gobi 65 and Rasam/ChinthamaniChickenkolambu&chickenfry&MilaguRasam.JPG"],
    price: 150,
    category: "Super Meals"
  },
  
  // Comfort Meals (meals with images, sorted alphabetically by number)
  {
    id: "comfort-1",
    name: "Spinach Rice, Stuffed Kathirikai, Peanut Ladies Finger Fry",
    description: "Nutritious spinach rice with stuffed brinjal and crispy ladies finger",
    images: ["/menu/Comfort Meals/1. Spinach Rice, Stuffed Kathirikai, Peanut Ladies Finger Fry/spinachrice stuffed kathirika fry ladies finger.jpg"],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-2",
    name: "Vegetarian Rice Bowl and Mango Milkshake",
    description: "Healthy vegetarian rice bowl served with refreshing mango milkshake",
    images: ["/menu/Comfort Meals/1. Vegetarian Rice Bowl and Mango Milkshake/vegetarian rice bowl and mangoshake.jpg"],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-3",
    name: "Chole Bhature",
    description: "North Indian favorite - spiced chickpeas with fluffy bhature",
    images: [
      "/menu/Comfort Meals/2. Chole Bhature/chole batura.jpg",
      "/menu/Comfort Meals/2. Chole Bhature/chole.jpg"
    ],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-4",
    name: "Jackfruit Briyani, Chilli Babycorn and Adaprathaman",
    description: "Aromatic jackfruit briyani with spicy baby corn and traditional dessert",
    images: ["/menu/Comfort Meals/3. Jackfruit Briyani, Chilli Babycorn and Adaprathaman/jackfruit biriyani+babychillicorn+adaprathaman.jpg"],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-5",
    name: "Rice, Ennai Kathirikai Pulikolambu, Keerai and Double Egg Omelette",
    description: "Traditional Tamil meal with brinjal curry, greens and double omelette",
    images: ["/menu/Comfort Meals/4. Rice, Ennai Kathirikai Pulikolambu, Keerai and Double Egg Omelette/rice+ennai kathirikapulikolambu+keeraiporiyal+double omelette.jpg"],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-6",
    name: "Poondukolambu Saadham, Carrot Cabbage Poriyal and Papadam",
    description: "Garlic curry rice with mixed vegetable stir-fry and crispy papadam",
    images: [
      "/menu/Comfort Meals/5. Poondukolambu Saadham, Carrot Cabbage Poriyal and Papadam/garliccurry rice+beanspodimas+papadam.jpg",
      "/menu/Comfort Meals/5. Poondukolambu Saadham, Carrot Cabbage Poriyal and Papadam/garliccurryrice+beanspodimas+papadam.jpg"
    ],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-7",
    name: "Sphagetti Napoli",
    description: "Classic Italian spaghetti with fresh tomato and basil sauce",
    images: ["/menu/Comfort Meals/6. Sphagetti Napoli/pasta.jpg"],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-8",
    name: "Rice, Dal Keerai, Aloo Curry, Boiled Egg and Watermelon Juice",
    description: "Healthy combination of rice, dal spinach, potato curry and fresh juice",
    images: [
      "/menu/Comfort Meals/7. Rice, Dal Keerai, Aloo Curry, Boiled Egg and Watermelon Juice/Popeye'sspinach&aloocurry&watermelon.JPG",
      "/menu/Comfort Meals/7. Rice, Dal Keerai, Aloo Curry, Boiled Egg and Watermelon Juice/Popeye'sspinach&aloocurry&watermelon.(1).JPG"
    ],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-9",
    name: "Brocolli White Sauce Pasta",
    description: "Creamy white sauce pasta with fresh broccoli",
    images: ["/menu/Comfort Meals/8. Brocolli White Sauce Pasta/CreamywhiteSaucepasta.JPG"],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-10",
    name: "Lemon Rice, Tamarind Rice and Ladies Finger Fry",
    description: "Tangy variety rice with crispy ladies finger fry",
    images: [
      "/menu/Comfort Meals/8. Lemon Rice, Tamarind Rice and Ladies Finger Fry/Varietyrice&Ladiesfinger(2).JPG",
      "/menu/Comfort Meals/8. Lemon Rice, Tamarind Rice and Ladies Finger Fry/Varietyrice&Ladiesfinger(3).JPG"
    ],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-11",
    name: "Wheat Parotta, Dahi Paneer, Bhindi Fry and Curd Rice",
    description: "Healthy wheat parotta with creamy paneer, okra fry and cooling curd rice",
    images: [
      "/menu/Comfort Meals/9. Wheat Parotta, Dahi Paneer, Bhindi Fry and Curd Rice/Wheatparota&Bindi&Kadaipaneer(1).JPG",
      "/menu/Comfort Meals/9. Wheat Parotta, Dahi Paneer, Bhindi Fry and Curd Rice/Wheatparota&Bindi&Kadaipaneer(4).JPG"
    ],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-12",
    name: "Aloo Paratha and Dal Makhani",
    description: "North Indian stuffed potato paratha with rich dal makhani",
    images: ["/menu/Comfort Meals/10. Aloo Paratha and Dal Makhani/AlooParatha&Dalmakhani.JPG"],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-13",
    name: "Chapathi and Channa Masala",
    description: "Soft chapathi with spicy chickpea curry",
    images: [
      "/menu/Comfort Meals/11. Chapathi and Channa Masala/Chapati&channamasala.JPEG",
      "/menu/Comfort Meals/11. Chapathi and Channa Masala/Chapati&channamasala(1).JPEG"
    ],
    price: 130,
    category: "Comfort Meals"
  },
  
  // Day Starters (meals with images)
  {
    id: "starter-1",
    name: "Bread Toast, Omelette and Sundal",
    description: "Perfect morning combination with toasted bread, fluffy omelette and nutritious sundal",
    images: [
      "/menu/Day Starters/Bread Toast, Omelette and Sundal/Roastedbread&sundal&omellete.JPG",
      "/menu/Day Starters/Bread Toast, Omelette and Sundal/ClubSandwich&Sundal(1).JPG"
    ],
    price: 80,
    category: "Day Starters"
  },
  {
    id: "starter-2",
    name: "Idiyappam and Kadala Curry",
    description: "Traditional Kerala breakfast with soft string hoppers and spicy black chickpea curry",
    images: ["/menu/Day Starters/Idiyappam and Kadala Curry/Idiyapam&KadalaCurry.JPG"],
    price: 80,
    category: "Day Starters"
  },
  {
    id: "starter-3",
    name: "Uthapam, Peanut Chutney and Sakkarai Pongal",
    description: "South Indian breakfast special with thick pancake, crunchy chutney and sweet pongal",
    images: [
      "/menu/Day Starters/Uthapam, Peanut Chutney and Sakkarai Pongal/Uthapam&sakaraipongal&peanutchutnney.JPG",
      "/menu/Day Starters/Uthapam, Peanut Chutney and Sakkarai Pongal/Uthappam&chutney.JPEG"
    ],
    price: 80,
    category: "Day Starters"
  }
];

const DailyMenu = () => {
  const [activeCategory, setActiveCategory] = useState("Super Meals");
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3); // Default for desktop
  
  // Updated categories order as requested: Super Meals, Comfort Meals, Day Starters, Add-ons
  const categories = ["Super Meals", "Comfort Meals", "Day Starters", "Add-ons"];
  
  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);
  
  // Calculate visible items for current page
  const visibleItems = filteredItems.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  );
  
  // Update itemsPerPage based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Reset current page when category changes
  useEffect(() => {
    setCurrentPage(0);
  }, [activeCategory]);
  
  // Smooth scroll to next/previous page
  const navigatePage = (direction) => {
    if (direction === "next" && currentPage < pageCount - 1) {
      setCurrentPage(prev => prev + 1);
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  const getCategoryPrice = () => {
    const firstItem = filteredItems[0];
    return firstItem ? `₹${firstItem.price}` : '';
  };

  return (
    <section id="daily-menu" className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Explore Menu
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Fresh meals prepared daily by our expert chefs using the finest ingredients
          </motion.p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div 
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gray-100 p-1 rounded-full shadow-inner">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 md:px-6 rounded-full text-sm md:text-base font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-white text-primary shadow-md'
                    : 'text-gray-600 hover:text-primary'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Category Info */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center bg-primary/10 rounded-full px-4 py-2 text-primary font-medium">
            {activeCategory === "Add-ons" && "Special additions to enhance your meal"}
            {activeCategory === "Super Meals" && "Nutrient-packed meals for optimal health"}
            {activeCategory === "Comfort Meals" && "Simple, satisfying comfort food"}
            {activeCategory === "Day Starters" && "Perfect morning combinations"}
          </div>
        </div>
        
        {/* Menu Grid with improved layout and proper arrow alignment for mobile */}
        <div 
          ref={containerRef} 
          className="relative mb-8"
          data-has-multiple-pages={pageCount > 1}
        >
          {/* Mobile overlay arrows - FIXED alignment */}
          {filteredItems.length > itemsPerPage && (
            <>
              {/* Left arrow overlay */}
              {currentPage > 0 && (
                <motion.button
                  type="button"
                  onClick={() => navigatePage("prev")}
                  className="fixed-mobile-arrow fixed-mobile-arrow-left absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/95 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-lg border border-gray-200 md:hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 text-gray-700" />
                </motion.button>
              )}
              
              {/* Right arrow overlay */}
              {currentPage < pageCount - 1 && (
                <motion.button
                  type="button"
                  onClick={() => navigatePage("next")}
                  className="fixed-mobile-arrow fixed-mobile-arrow-right absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/95 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-lg border border-gray-200 md:hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-700" />
                </motion.button>
              )}
            </>
          )}
          
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {visibleItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <MenuItemCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Navigation controls - only show on desktop */}
        <div className="hidden md:flex justify-center items-center mb-6">
          <div className="flex items-center space-x-4">
            <motion.button
              type="button"
              onClick={() => navigatePage("prev")}
              className={`rounded-full w-10 h-10 flex items-center justify-center ${
                currentPage === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              whileHover={currentPage > 0 ? { scale: 1.05 } : {}}
              whileTap={currentPage > 0 ? { scale: 0.95 } : {}}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
            </motion.button>
            
            <div className="flex space-x-2">
              {Array.from({ length: pageCount }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    currentPage === index ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
            
            <motion.button
              type="button"
              onClick={() => navigatePage("next")}
              className={`rounded-full w-10 h-10 flex items-center justify-center ${
                currentPage >= pageCount - 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              whileHover={currentPage < pageCount - 1 ? { scale: 1.05 } : {}}
              whileTap={currentPage < pageCount - 1 ? { scale: 0.95 } : {}}
            >
              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* WhatsApp Group Link - Moved below meal tiles */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white border-2 border-black shadow-lg max-w-lg w-full mx-4 md:mx-0">
            {/* Top accent line */}
            <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>
            
            <div className="px-4 py-3 md:px-6 md:py-4 text-center">
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
                <div className="flex items-center text-black font-medium text-sm md:text-base">
                  <span className="text-lg mr-2">💬</span>
                  <span>Get daily menu updates:</span>
                </div>
                
                <motion.a
                  href="https://chat.whatsapp.com/HURHax6vtqm0yuCno9ktOE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-black text-white px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base font-bold uppercase tracking-wider border-2 border-black hover:bg-white hover:text-black transition-all duration-200 shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="mr-2">📱</span>
                  Join Group
                </motion.a>
              </div>
              
              {/* Subtle helper text */}
              <div className="mt-2 text-xs text-gray-600 font-medium">
                Daily menus • Order updates • No spam
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

function MenuItemCard({ item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const images = item.images || [item.image]; // Support both formats
  const hasMultipleImages = images.length > 1;
  
  // Safe image navigation with bounds checking
  const nextImage = () => {
    if (!images || images.length === 0) return;
    
    setCurrentImageIndex((prev) => {
      const newIndex = (prev + 1) % images.length;
      return newIndex;
    });
  };
  
  const prevImage = () => {
    if (!images || images.length === 0) return;
    
    setCurrentImageIndex((prev) => {
      const newIndex = prev - 1 < 0 ? images.length - 1 : prev - 1;
      return newIndex;
    });
  };
  
  const goToImage = (index) => {
    if (!images || images.length === 0 || index < 0 || index >= images.length) {
      console.warn('Invalid image index:', index);
      return;
    }
    
    setCurrentImageIndex(index);
  };

  // Handle image load errors
  const handleImageError = (e) => {
    console.error('Failed to load image:', images[currentImageIndex]);
    setImageError(true);
    
    // Try to fallback to a default image or hide the image
    e.target.style.display = 'none';
  };

  // Reset image error when switching images
  const handleImageLoad = () => {
    setImageError(false);
  };

  // Ensure currentImageIndex is within bounds
  const safeCurrentIndex = Math.max(0, Math.min(currentImageIndex, images.length - 1));
  const currentImageSrc = images[safeCurrentIndex];
  
  return (
    <motion.div 
      className="menu-card bg-white rounded-xl overflow-hidden h-full shadow-sm border border-gray-100"
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.2 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden image-carousel-container" style={{ aspectRatio: '4/3', minHeight: '200px' }}>
        {currentImageSrc && !imageError ? (
          <motion.img 
            key={`${safeCurrentIndex}-${currentImageSrc}`}
            src={currentImageSrc} 
            alt={`${item.name} - Image ${safeCurrentIndex + 1}`}
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        ) : (
          // Fallback when image fails to load
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2 text-sm">Image not available</p>
            </div>
          </div>
        )}
        
        {/* Image carousel controls - only show when there are multiple images */}
        {hasMultipleImages && images.length > 1 && (
          <>
            {/* Carousel navigation arrows */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-20"
              style={{ opacity: isHovered ? 1 : 0 }}
              aria-label="Previous image"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-20"
              style={{ opacity: isHovered ? 1 : 0 }}
              aria-label="Next image"
            >
              <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
            </button>
            
            {/* Image indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-20">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === safeCurrentIndex 
                      ? 'bg-white shadow-lg' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Multiple images indicator */}
            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
              <FontAwesomeIcon icon={faCircle} className="w-2 h-2" />
              <span>{safeCurrentIndex + 1}/{images.length}</span>
            </div>
          </>
        )}
        
        <div className="absolute top-3 right-3 bg-white rounded-lg px-2 py-1 text-sm font-medium shadow-md">
          ₹{item.price}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{item.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default DailyMenu; 