import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for lazy loading images with progressive enhancement
 * @param {string} src - Image source URL
 * @param {string} lqip - Low Quality Image Placeholder (base64)
 * @param {object} options - Configuration options
 * @returns {object} - { imageSrc, isLoading, hasError, imageRef }
 */
export const useLazyImage = (src, lqip = null, options = {}) => {
  const {
    threshold = 0.01,
    rootMargin = '300px', // Load images 300px before they enter viewport
    eager = false // Load immediately without lazy loading
  } = options;

  const [imageSrc, setImageSrc] = useState(lqip || null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // If eager loading is enabled, load immediately
    if (eager) {
      loadImage();
      return;
    }

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: load image immediately if no support
      loadImage();
      return;
    }

    // Create IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage();
            // Stop observing after image starts loading
            if (observerRef.current && imageRef.current) {
              observerRef.current.unobserve(imageRef.current);
            }
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    // Start observing
    if (imageRef.current) {
      observerRef.current.observe(imageRef.current);
    }

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, eager, threshold, rootMargin]);

  const loadImage = () => {
    // Don't reload if already loaded or loading
    if (!isLoading && imageSrc === src) return;

    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
      setHasError(false);
    };

    img.onerror = () => {
      setHasError(true);
      setIsLoading(false);
    };

    img.src = src;
  };

  return {
    imageSrc,
    isLoading,
    hasError,
    imageRef
  };
};

/**
 * Helper hook for responsive images with srcset
 * @param {object} sources - Object with mobile, tablet, desktop sources
 * @param {string} lqip - Low Quality Image Placeholder
 * @param {object} options - Configuration options
 * @returns {object} - { getResponsiveSrc, imageSrc, isLoading, hasError, imageRef }
 */
export const useResponsiveImage = (sources, lqip = null, options = {}) => {
  const [deviceSize, setDeviceSize] = useState('desktop');
  
  useEffect(() => {
    const updateDeviceSize = () => {
      const width = window.innerWidth;
      if (width < 481) {
        setDeviceSize('mobile');
      } else if (width < 769) {
        setDeviceSize('tablet');
      } else {
        setDeviceSize('desktop');
      }
    };

    updateDeviceSize();
    window.addEventListener('resize', updateDeviceSize);
    
    return () => window.removeEventListener('resize', updateDeviceSize);
  }, []);

  const currentSrc = sources[deviceSize] || sources.desktop || '';
  const lazyImage = useLazyImage(currentSrc, lqip, options);

  const getResponsiveSrc = () => {
    return {
      mobile: sources.mobile || '',
      tablet: sources.tablet || '',
      desktop: sources.desktop || ''
    };
  };

  return {
    ...lazyImage,
    getResponsiveSrc,
    deviceSize
  };
};

export default useLazyImage;

