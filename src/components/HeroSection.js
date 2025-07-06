import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './HeroSection.css';

const HeroSection = () => {
  const heroRef = useRef(null);
  const [imageErrors, setImageErrors] = useState({});
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Create transform values for sliding tiles
  const leftSlide = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rightSlide = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Local food images for the grid (28 images)
  // You can add your own images to public/images/hero/ folder
  // Name them as hero-1.jpg, hero-2.jpg, etc.
  const localFoodImages = Array.from({ length: 28 }, (_, i) => 
    `/images/hero/hero-${i + 1}.jpg`
  );

  // Fallback Unsplash images (original ones)
  const fallbackImages = [
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1534939561126-855b8675edd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1539136788836-5699e78bfc75?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1515697320591-f3eb3566bc3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
  ];

  // Function to get the appropriate image source
  const getImageSource = (index) => {
    if (imageErrors[index]) {
      return fallbackImages[index];
    }
    return localFoodImages[index];
  };

  // Handle image load errors
  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  // Function to determine if a tile should slide left, right, or stay fixed
  const getTileTransform = (rowIndex, columnIndex) => {
    // Text tile positions: (0,2)=Food, (1,4)=Sorted, (2,2)=Life, (3,4)=Sorted
    const textPositions = [
      { row: 0, col: 2 }, // Food
      { row: 1, col: 4 }, // Sorted
      { row: 2, col: 2 }, // Life
      { row: 3, col: 4 }  // Sorted
    ];
    
    // Check if this is a text tile
    const isTextTile = textPositions.some(pos => pos.row === rowIndex && pos.col === columnIndex);
    if (isTextTile) return 'none'; // Text tiles don't slide horizontally
    
    // For image tiles, determine if they're left or right of text tiles in their row
    const textColInRow = textPositions.find(pos => pos.row === rowIndex)?.col;
    if (textColInRow !== undefined) {
      return columnIndex < textColInRow ? 'left' : 'right';
    }
    
    // For rows without text, use middle column as reference (column 3)
    return columnIndex < 3 ? 'left' : 'right';
  };

  // Function to render either image or text tile
  const renderTile = (rowIndex, columnIndex, image, imageIndex) => {
    const tileTransform = getTileTransform(rowIndex, columnIndex);
    // First row, 3rd tile: "Food"
    if (rowIndex === 0 && columnIndex === 2) {
      return (
        <motion.div 
          key={`row${rowIndex+1}-text-food`}
          className="image-item text-tile food-tile"
          whileHover={{ scale: 1.05 }}
          style={{ x: 0 }} // Text tiles stay horizontally fixed
        >
          <div className="text-content">
            <span>Food</span>
          </div>
        </motion.div>
      );
    }
    // Second row, 5th tile: "Sorted"
    else if (rowIndex === 1 && columnIndex === 4) {
      return (
        <motion.div 
          key={`row${rowIndex+1}-text-sorted1`}
          className="image-item text-tile sorted-tile"
          whileHover={{ scale: 1.05 }}
          style={{ x: 0 }} // Text tiles stay horizontally fixed
        >
          <div className="text-content">
            <span>Sorted</span>
          </div>
        </motion.div>
      );
    }
    // Third row, 3rd tile: "Life"
    else if (rowIndex === 2 && columnIndex === 2) {
      return (
        <motion.div 
          key={`row${rowIndex+1}-text-life`}
          className="image-item text-tile life-tile"
          whileHover={{ scale: 1.05 }}
          style={{ x: 0 }} // Text tiles stay horizontally fixed
        >
          <div className="text-content">
            <span>Life</span>
          </div>
        </motion.div>
      );
    }
    // Last row, 5th tile: "Sorted"
    else if (rowIndex === 3 && columnIndex === 4) {
      return (
        <motion.div 
          key={`row${rowIndex+1}-text-sorted2`}
          className="image-item text-tile sorted-tile"
          whileHover={{ scale: 1.05 }}
          style={{ x: 0 }} // Text tiles stay horizontally fixed
        >
          <div className="text-content">
            <span>Sorted</span>
          </div>
        </motion.div>
      );
    }
    // Normal image tile
    else {
      const slideTransform = tileTransform === 'left' ? leftSlide : 
                           tileTransform === 'right' ? rightSlide : 0;
      
      return (
        <motion.div 
          key={`row${rowIndex+1}-${columnIndex}`}
          className="image-item"
          style={{ x: slideTransform }}
        >
          <img 
            src={getImageSource(imageIndex)} 
            alt={`Food ${imageIndex + 1}`}
            onError={() => handleImageError(imageIndex)}
          />
        </motion.div>
      );
    }
  };

  return (
    <section id="hero" className="hero-section" ref={heroRef}>
      <div className="container mx-auto">
        <div className="hero-content-wrapper">
          {/* Image Carousel at the top */}
          <div className="hero-gallery">
            {/* Image grid */}
            <div className="image-grid">
              {/* First row */}
              <div className="grid-row">
                {localFoodImages.slice(0, 7).map((image, index) => (
                  renderTile(0, index, image, index)
                ))}
              </div>
              
              {/* Second row */}
              <div className="grid-row">
                {localFoodImages.slice(7, 14).map((image, index) => (
                  renderTile(1, index, image, index + 7)
                ))}
              </div>
              
              {/* Third row */}
              <div className="grid-row">
                {localFoodImages.slice(14, 21).map((image, index) => (
                  renderTile(2, index, image, index + 14)
                ))}
              </div>
              
              {/* Fourth row */}
              <div className="grid-row">
                {localFoodImages.slice(21, 28).map((image, index) => (
                  renderTile(3, index, image, index + 21)
                ))}
              </div>
            </div>
          </div>
          
          {/* Text content below the carousel - REMOVED */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 