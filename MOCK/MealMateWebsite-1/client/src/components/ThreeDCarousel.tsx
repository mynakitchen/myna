import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';

interface ThreeDCarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
}

const ThreeDCarousel = ({ images }: ThreeDCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  
  useEffect(() => {
    let rotationDegree = 0;
    let lastScrollY = window.scrollY;
    let animationFrameId: number | null = null;
    
    const rotateOnScroll = () => {
      if (!carouselRef.current) return;
      
      const scrollDifference = window.scrollY - lastScrollY;
      rotationDegree = (rotationDegree + (scrollDifference * 0.2)) % 360;
      lastScrollY = window.scrollY;
      
      carouselRef.current.style.transform = `rotateY(${rotationDegree}deg)`;
      
      animationFrameId = requestAnimationFrame(rotateOnScroll);
    };
    
    // Start animation
    animationFrameId = requestAnimationFrame(rotateOnScroll);
    
    // Start auto-rotation for embla
    const autoRotateInterval = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 3000);
    
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      clearInterval(autoRotateInterval);
    };
  }, [emblaApi]);
  
  // Calculate the angle for each carousel item
  const getAngle = (index: number, total: number) => {
    return (360 / total) * index;
  };
  
  return (
    <div className="carousel-container relative">
      <div 
        className="carousel-3d-container"
        ref={carouselRef}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="carousel-item absolute"
            style={{
              transform: `rotateY(${getAngle(index, images.length)}deg) translateZ(250px)`,
              transformOrigin: 'center center -250px',
              left: 'calc(50% - 140px)',
              top: 'calc(50% - 140px)'
            }}
          >
            <img 
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
      
      {/* Optional: Mobile fallback carousel for better experience */}
      <div className="md:hidden mt-4 w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div className="flex-[0_0_100%] min-w-0 pl-4" key={`mobile-${index}`}>
                <div className="h-64 rounded-xl overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDCarousel;
