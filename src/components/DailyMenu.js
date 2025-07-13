import React, { useState, useRef, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronLeft, 
  faChevronRight, 
  faCircle
} from '@fortawesome/free-solid-svg-icons';
import './DailyMenu.css';

// Helper function to get correct image path for deployment
const getImagePath = (imagePath) => {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Split path into segments and encode each segment properly
  const pathSegments = cleanPath.split('/');
  const encodedSegments = pathSegments.map(segment => {
    // Only encode the filename part, not the path separators
    return encodeURIComponent(segment);
  });
  const encodedPath = encodedSegments.join('/');
  
  // Use PUBLIC_URL environment variable for GitHub Pages deployment
  const finalPath = `${process.env.PUBLIC_URL}/${encodedPath}`;
  
  return finalPath;
};

// Dynamic menu items based on actual folder structure - UPDATED with multiple images
const MENU_ITEMS = [
  // Add-ons (meals with images)
  {
    id: "addon-1",
    name: "Cold Coffee",
    description: "Refreshing cold coffee perfect for any time",
    images: [
      getImagePath("menu/Add-ons/Cold Coffee/cold coffee ad.jpg"),
      getImagePath("menu/Add-ons/Cold Coffee/coldcoffee.jpg"),
      getImagePath("menu/Add-ons/Cold Coffee/coldocffee top.jpg")
    ],
    price: 45,
    category: "Add-ons"
  },
  {
    id: "addon-2", 
    name: "Mango Milkshake",
    description: "Creamy mango milkshake made with fresh mangoes",
    images: [
      getImagePath("menu/Add-ons/Mango Milkshake/Mango Milkshake.jpg"),
      getImagePath("menu/Add-ons/Mango Milkshake/Akka mangoshake.jpg")
    ],
    price: 70,
    category: "Add-ons"
  },
  
  // Super Meals (meals with images, sorted alphabetically by number)
  {
    id: "super-1",
    name: "Sambhar Rice, Avial and Fish 65",
    description: "Traditional South Indian comfort meal with authentic flavors",
    images: [getImagePath("menu/Super Meals/1. Sambhar Rice, Avial and Fish 65/samabar rice + avial+ fish fry.jpg")],
    price: 150,
    category: "Super Meals"
  },
  {
    id: "super-2",
    name: "Idiyappam and Chicken Stew",
    description: "Kerala-style string hoppers with aromatic chicken stew",
    images: [getImagePath("menu/Super Meals/2. Idiyappam and Chicken Stew/idiyappam stew.jpg")],
    price: 150,
    category: "Super Meals"
  },
  {
    id: "super-3",
    name: "Rice, Keerai, Fish Fry and Fish Curry",
    description: "Complete meal with rice, greens, fish fry and curry",
    images: [
      getImagePath("menu/Super Meals/3. Rice, Keerai, Fish Fry and Fish Curry/rice+fishcurry+keeraiporiyal+fishfry.jpg"),
      getImagePath("menu/Super Meals/3. Rice, Keerai, Fish Fry and Fish Curry/Mangomeenkulambu&Fishfry(1).JPG")
    ],
    price: 150,
    category: "Super Meals"
  },
  {
    id: "super-4",
    name: "Jackfruit Briyani with Chicken Varuthakari",
    description: "Unique jackfruit briyani served with spicy chicken varuthakari",
    images: [getImagePath("menu/Super Meals/4. Jackfruit Briyani with Chicken Varuthakari/jackfruit biriyani+chicken varuthakari+adaprathaman.jpg")],
    price: 150,
    category: "Super Meals"
  },
  {
    id: "super-5",
    name: "Chicken Kothu Parotta",
    description: "Popular street food with shredded parotta and chicken",
    images: [
      getImagePath("menu/Super Meals/5. Chicken Kothu Parotta/Parota.jpg"),
      getImagePath("menu/Super Meals/5. Chicken Kothu Parotta/ChickenKothu&Salna.JPG")
    ],
    price: 150,
    category: "Super Meals"
  },
  {
    id: "super-6",
    name: "Ghee Rice, Chettinad Chicken and Omelette",
    description: "Aromatic ghee rice with spicy Chettinad chicken and fluffy omelette",
    images: [getImagePath("menu/Super Meals/6. Ghee Rice, Chettinad Chicken and Omelette/Gheerice&PepperChicken&Omellete.JPG")],
    price: 150,
    category: "Super Meals"
  },
  {
    id: "super-7",
    name: "Rice, Dal Fry and Nethili Fry",
    description: "Comfort meal with steamed rice, dal fry and crispy anchovies",
    images: [getImagePath("menu/Super Meals/7. Rice, Dal Fry and Nethili Fry/Rice&Dalfry&nethilifry.JPG")],
    price: 150,
    category: "Super Meals"
  },
  {
    id: "super-8",
    name: "Chicken Rice Bowls",
    description: "Protein-packed chicken rice bowls with aromatic spices",
    images: [
      getImagePath("menu/Super Meals/8. Chicken Rice Bowls/aPeriperichickenRicebowl.JPG"),
      getImagePath("menu/Super Meals/8. Chicken Rice Bowls/Bloodchicken&jeera ricebowl.JPG")
    ],
    price: 150,
    category: "Super Meals"
  },
  {
    id: "super-9",
    name: "Chicken Briyani, Bread Halwa and Raita",
    description: "Classic chicken briyani with sweet bread halwa and cooling raita",
    images: [
      getImagePath("menu/Super Meals/9. Chicken Briyani, Bread Halwa and Raita/MushroomBriyani&Bindi(1).jpg"),
      getImagePath("menu/Super Meals/9. Chicken Briyani, Bread Halwa and Raita/BhaiVeeduChickenBriyani&BreadAlwa.JPG"),
      getImagePath("menu/Super Meals/9. Chicken Briyani, Bread Halwa and Raita/DonnechickenBriyani&chickenroast.JPG")
    ],
    price: 150,
    category: "Super Meals"
  },
  {
    id: "super-10",
    name: "Rice, Malabar Chicken, Gobi 65 and Rasam",
    description: "Traditional South Indian meal with spicy Malabar chicken and tangy rasam",
    images: [getImagePath("menu/Super Meals/10. Rice, Malabar Chicken, Gobi 65 and Rasam/ChinthamaniChickenkolambu&chickenfry&MilaguRasam.JPG")],
    price: 150,
    category: "Super Meals"
  },
  
  // Comfort Meals (meals with images, sorted alphabetically by number)
  {
    id: "comfort-1",
    name: "Spinach Rice, Stuffed Kathirikai, Peanut Ladies Finger Fry",
    description: "Nutritious spinach rice with stuffed brinjal and crispy ladies finger",
    images: [getImagePath("menu/Comfort Meals/1. Spinach Rice, Stuffed Kathirikai, Peanut Ladies Finger Fry/spinachrice stuffed kathirika fry ladies finger.jpg")],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-2",
    name: "Vegetarian Rice Bowl and Mango Milkshake",
    description: "Healthy vegetarian rice bowl served with refreshing mango milkshake",
    images: [getImagePath("menu/Comfort Meals/1. Vegetarian Rice Bowl and Mango Milkshake/vegetarian rice bowl and mangoshake.jpg")],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-3",
    name: "Chole Bhature",
    description: "North Indian favorite - spiced chickpeas with fluffy bhature",
    images: [
      getImagePath("menu/Comfort Meals/2. Chole Bhature/chole batura.jpg"),
      getImagePath("menu/Comfort Meals/2. Chole Bhature/chole.jpg")
    ],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-4",
    name: "Jackfruit Briyani, Chilli Babycorn and Adaprathaman",
    description: "Aromatic jackfruit briyani with spicy baby corn and traditional dessert",
    images: [getImagePath("menu/Comfort Meals/3. Jackfruit Briyani, Chilli Babycorn and Adaprathaman/jackfruit biriyani+babychillicorn+adaprathaman.jpg")],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-5",
    name: "Rice, Ennai Kathirikai Pulikolambu, Keerai and Double Egg Omelette",
    description: "Traditional Tamil meal with brinjal curry, greens and double omelette",
    images: [getImagePath("menu/Comfort Meals/4. Rice, Ennai Kathirikai Pulikolambu, Keerai and Double Egg Omelette/rice+ennai kathirikapulikolambu+keeraiporiyal+double omelette.jpg")],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-6",
    name: "Poondukolambu Saadham, Carrot Cabbage Poriyal and Papadam",
    description: "Garlic curry rice with mixed vegetable stir-fry and crispy papadam",
    images: [
      getImagePath("menu/Comfort Meals/5. Poondukolambu Saadham, Carrot Cabbage Poriyal and Papadam/garliccurry rice+beanspodimas+papadam.jpg"),
      getImagePath("menu/Comfort Meals/5. Poondukolambu Saadham, Carrot Cabbage Poriyal and Papadam/garliccurryrice+beanspodimas+papadam.jpg")
    ],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-7",
    name: "Sphagetti Napoli",
    description: "Classic Italian spaghetti with fresh tomato and basil sauce",
    images: [getImagePath("menu/Comfort Meals/6. Sphagetti Napoli/pasta.jpg")],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-8",
    name: "Rice, Dal Keerai, Aloo Curry, Boiled Egg and Watermelon Juice",
    description: "Healthy combination of rice, dal spinach, potato curry and fresh juice",
    images: [
      getImagePath("menu/Comfort Meals/7. Rice, Dal Keerai, Aloo Curry, Boiled Egg and Watermelon Juice/Popeye'sspinach&aloocurry&watermelon.JPG"),
      getImagePath("menu/Comfort Meals/7. Rice, Dal Keerai, Aloo Curry, Boiled Egg and Watermelon Juice/Popeye'sspinach&aloocurry&watermelon.(1).JPG")
    ],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-9",
    name: "Brocolli White Sauce Pasta",
    description: "Creamy white sauce pasta with fresh broccoli",
    images: [getImagePath("menu/Comfort Meals/8. Brocolli White Sauce Pasta/CreamywhiteSaucepasta.JPG")],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-10",
    name: "Lemon Rice, Tamarind Rice and Ladies Finger Fry",
    description: "Tangy variety rice with crispy ladies finger fry",
    images: [
      getImagePath("menu/Comfort Meals/8. Lemon Rice, Tamarind Rice and Ladies Finger Fry/Varietyrice&Ladiesfinger(2).JPG"),
      getImagePath("menu/Comfort Meals/8. Lemon Rice, Tamarind Rice and Ladies Finger Fry/Varietyrice&Ladiesfinger(3).JPG")
    ],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-11",
    name: "Wheat Parotta, Dahi Paneer, Bhindi Fry and Curd Rice",
    description: "Healthy wheat parotta with creamy paneer, okra fry and cooling curd rice",
    images: [
      getImagePath("menu/Comfort Meals/9. Wheat Parotta, Dahi Paneer, Bhindi Fry and Curd Rice/Wheatparota&Bindi&Kadaipaneer(1).JPG"),
      getImagePath("menu/Comfort Meals/9. Wheat Parotta, Dahi Paneer, Bhindi Fry and Curd Rice/Wheatparota&Bindi&Kadaipaneer(4).JPG")
    ],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-12",
    name: "Aloo Paratha and Dal Makhani",
    description: "North Indian stuffed potato paratha with rich dal makhani",
    images: [getImagePath("menu/Comfort Meals/10. Aloo Paratha and Dal Makhani/AlooParatha&Dalmakhani.JPG")],
    price: 130,
    category: "Comfort Meals"
  },
  {
    id: "comfort-13",
    name: "Chapathi and Channa Masala",
    description: "Soft chapathi with spicy chickpea curry",
    images: [
      getImagePath("menu/Comfort Meals/11. Chapathi and Channa Masala/Chapati&channamasala.JPEG"),
      getImagePath("menu/Comfort Meals/11. Chapathi and Channa Masala/Chapati&channamasala(1).JPEG")
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
      getImagePath("menu/Day Starters/Bread Toast, Omelette and Sundal/Roastedbread&sundal&omellete.JPG"),
      getImagePath("menu/Day Starters/Bread Toast, Omelette and Sundal/ClubSandwich&Sundal(1).JPG")
    ],
    price: 80,
    category: "Day Starters"
  },
  {
    id: "starter-2",
    name: "Idiyappam and Kadala Curry",
    description: "Traditional Kerala breakfast with soft string hoppers and spicy black chickpea curry",
    images: [getImagePath("menu/Day Starters/Idiyappam and Kadala Curry/Idiyapam&KadalaCurry.JPG")],
    price: 80,
    category: "Day Starters"
  },
  {
    id: "starter-3",
    name: "Uthapam, Peanut Chutney and Sakkarai Pongal",
    description: "South Indian breakfast special with thick pancake, crunchy chutney and sweet pongal",
    images: [
      getImagePath("menu/Day Starters/Uthapam, Peanut Chutney and Sakkarai Pongal/Uthapam&sakaraipongal&peanutchutnney.JPG"),
      getImagePath("menu/Day Starters/Uthapam, Peanut Chutney and Sakkarai Pongal/Uthappam&chutney.JPEG")
    ],
    price: 80,
    category: "Day Starters"
  }
];

const DailyMenu = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Day Starters');
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef(null);

  const filteredItems = MENU_ITEMS.filter(item => item.category === selectedCategory);
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
  }, [selectedCategory]);
  
  // Smooth scroll to next/previous page
  const navigatePage = (direction) => {
    if (direction === "next" && currentPage < pageCount - 1) {
      setCurrentPage(prev => prev + 1);
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  // Touch/swipe handlers for mobile
  const handleTouchStart = (e) => {
    if (window.innerWidth > 768) return; // Only on mobile/tablet
    
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setIsDragging(true);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging || window.innerWidth > 768) return;
    e.preventDefault();
  };
  
  const handleTouchEnd = (e) => {
    if (!isDragging || window.innerWidth > 768) return;
    
    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const diffX = startX - endX;
    
    // Minimum swipe distance
    const minSwipeDistance = 50;
    
    if (Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        // Swipe left - go to next page
        navigatePage("next");
      } else {
        // Swipe right - go to previous page
        navigatePage("prev");
      }
    }
    
    setIsDragging(false);
  };

  return (
    <div className="daily-menu bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Explore Menu</h2>
          <p className="text-lg text-gray-600 mb-6">
            Discover a curated selection from our menu of over 175 unique dishes. The options below are just a glimpse of what we offer. To explore our complete menu and stay updated with daily specials, join our WhatsApp group!
          </p>
          <button
            onClick={() => window.open('https://chat.whatsapp.com/HURHax6vtqm0yuCno9ktOE', '_blank')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="text-lg">💬</span>
            <span>Join WhatsApp Group</span>
          </button>
        </div>

        {/* Centered category toolbar */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-full inline-flex">
            {['Day Starters', 'Super Meals', 'Comfort Meals', 'Add-ons'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-white shadow-md text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div 
          className="relative mb-8" 
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {visibleItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No menu items found for this category.</p>
            </div>
          )}

          {/* Navigation arrows */}
          {filteredItems.length > itemsPerPage && (
            <>
              <button
                onClick={() => navigatePage('prev')}
                className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg transition-all duration-200 z-10 ${
                  currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
                }`}
                disabled={currentPage === 0}
              >
                <FontAwesomeIcon icon={faChevronLeft} className="text-gray-600" />
              </button>
              <button
                onClick={() => navigatePage('next')}
                className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg transition-all duration-200 z-10 ${
                  currentPage >= pageCount - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
                }`}
                disabled={currentPage >= pageCount - 1}
              >
                <FontAwesomeIcon icon={faChevronRight} className="text-gray-600" />
              </button>
            </>
          )}
        </div>

        {/* Page dots */}
        {pageCount > 1 && (
          <div className="flex justify-center items-center space-x-2">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`pagination-dot ${
                  index === currentPage ? 'active' : ''
                }`}
              >
                <FontAwesomeIcon 
                  icon={faCircle} 
                  className={`w-2 h-2 ${
                    index === currentPage ? 'text-gray-800' : 'text-gray-400'
                  }`} 
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function MenuItemCard({ item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  
  // Memoize images to prevent unnecessary re-renders
  const images = useMemo(() => item.images || [item.image], [item.images, item.image]);
  const hasMultipleImages = images.length > 1;
  
  // Reset image loading state when images change
  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
  }, [images, currentImageIndex]);
  
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
    setImageLoading(false);
  };

  // Reset image error when switching images and handle load success
  const handleImageLoad = () => {
    setImageError(false);
    setImageLoading(false);
  };

  // Touch/swipe handlers for image carousel
  const handleTouchStart = (e) => {
    if (!hasMultipleImages) return;
    
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setIsDragging(true);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging || !hasMultipleImages) return;
    e.preventDefault();
  };
  
  const handleTouchEnd = (e) => {
    if (!isDragging || !hasMultipleImages) return;
    
    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const diffX = startX - endX;
    
    // Minimum swipe distance
    const minSwipeDistance = 30;
    
    if (Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        // Swipe left - go to next image
        nextImage();
      } else {
        // Swipe right - go to previous image
        prevImage();
      }
    }
    
    setIsDragging(false);
  };

  // Ensure currentImageIndex is within bounds
  const safeCurrentIndex = Math.max(0, Math.min(currentImageIndex, images.length - 1));
  const currentImageSrc = images[safeCurrentIndex];
  
  return (
    <div 
      className="menu-card bg-white rounded-xl overflow-hidden h-full shadow-sm border border-gray-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative overflow-hidden image-carousel-container" 
        style={{ aspectRatio: '4/3', minHeight: '200px' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Loading state */}
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
          </div>
        )}
        
        {currentImageSrc && !imageError ? (
          <img 
            key={`${item.id}-${safeCurrentIndex}`}
            src={currentImageSrc} 
            alt={`${item.name} - ${safeCurrentIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            style={{ objectPosition: 'center' }}
            onError={handleImageError}
            onLoad={handleImageLoad}
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
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 z-20 ${
                isHovered || window.innerWidth <= 768 ? 'opacity-100' : 'opacity-0'
              }`}
              aria-label="Previous image"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
            </button>
            
            <button
              onClick={nextImage}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 z-20 ${
                isHovered || window.innerWidth <= 768 ? 'opacity-100' : 'opacity-0'
              }`}
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
    </div>
  );
}

export default DailyMenu; 