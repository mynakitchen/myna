import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class name utilities and resolves Tailwind CSS conflicts
 * @param  {...any} inputs - CSS class names or conditional class name objects
 * @returns {string} - Merged class string with conflicts resolved
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format price with proper currency display
 * @param {number} price - Price in rupees
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  if (typeof price !== 'number' || price < 0) {
    return '₹0';
  }
  return `₹${price}`;
};

/**
 * Secure external link handler
 * Prevents tabnabbing attacks and adds proper security measures
 * @param {string} url - The URL to open
 * @param {Object} options - Additional options
 * @param {boolean} options.newTab - Whether to open in new tab (default: true)
 * @param {Function} options.onError - Error callback function
 */
export const openSecureLink = (url, options = {}) => {
  const { newTab = true, onError } = options;
  
  try {
    // Validate URL
    if (!url || typeof url !== 'string') {
      throw new Error('Invalid URL provided');
    }
    
    // Ensure HTTPS for external links
    const secureUrl = url.startsWith('http://') && !url.includes('localhost') 
      ? url.replace('http://', 'https://') 
      : url;
    
    if (newTab) {
      // Secure external link opening
      const newWindow = window.open(
        secureUrl, 
        '_blank', 
        'noopener,noreferrer,nofollow'
      );
      
      if (newWindow) {
        // Extra security measure - nullify opener reference
        newWindow.opener = null;
      } else {
        // Popup blocked or failed - fallback
        console.warn('Popup blocked, redirecting in current window');
        window.location.href = secureUrl;
      }
    } else {
      // Navigate in current window
      window.location.href = secureUrl;
    }
  } catch (error) {
    console.error('Error opening secure link:', error);
    if (onError && typeof onError === 'function') {
      onError(error);
    } else {
      // Fallback: try basic navigation
      try {
        window.location.href = url;
      } catch (fallbackError) {
        console.error('Fallback navigation failed:', fallbackError);
      }
    }
  }
};

/**
 * Enhanced scroll observer with better error handling and performance
 * @param {Function} callback - Callback function for intersection changes
 * @param {Object} options - Intersection observer options
 * @returns {IntersectionObserver|null} The observer instance or null if not supported
 */
export const createScrollObserver = (callback, options = {}) => {
  try {
    // Check for IntersectionObserver support
    if (!window.IntersectionObserver) {
      console.warn('IntersectionObserver not supported, skipping scroll animations');
      return null;
    }

    // Default options with performance optimizations
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '10px',
      ...options
    };

    // Enhanced callback with error handling
    const safeCallback = (entries, observer) => {
      try {
        callback(entries, observer);
      } catch (error) {
        console.error('Intersection observer callback error:', error);
      }
    };

    return new IntersectionObserver(safeCallback, defaultOptions);
  } catch (error) {
    console.error('Failed to create intersection observer:', error);
    return null;
  }
};

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, delay) => {
  let timeoutId;
  let lastExecTime = 0;
  
  return function (...args) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

/**
 * Safe DOM query selector with error handling
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {Element|null} Found element or null
 */
export const safeQuerySelector = (selector, context = document) => {
  try {
    return context.querySelector(selector);
  } catch (error) {
    console.error('Invalid selector:', selector, error);
    return null;
  }
};

/**
 * Safe DOM query selector all with error handling
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {NodeList|Array} Found elements or empty array
 */
export const safeQuerySelectorAll = (selector, context = document) => {
  try {
    return context.querySelectorAll(selector);
  } catch (error) {
    console.error('Invalid selector:', selector, error);
    return [];
  }
};

/**
 * Image lazy loading with error handling
 * @param {HTMLImageElement} img - Image element
 * @param {string} src - Image source
 * @param {string} fallbackSrc - Fallback image source
 */
export const loadImageSafely = (img, src, fallbackSrc = `${process.env.PUBLIC_URL}/images/placeholder.jpg`) => {
  if (!img || !src) return;
  
  // Set up error handler before changing src
  const handleError = () => {
    if (img.src !== fallbackSrc) {
      console.warn(`Image failed to load: ${src}, using fallback`);
      img.src = fallbackSrc;
    }
  };
  
  const handleLoad = () => {
    img.classList.add('loaded');
  };
  
  img.addEventListener('error', handleError, { once: true });
  img.addEventListener('load', handleLoad, { once: true });
  img.src = src;
};

/**
 * Validate and sanitize text input
 * @param {string} text - Input text
 * @param {number} maxLength - Maximum allowed length
 * @returns {string} Sanitized text
 */
export const sanitizeText = (text, maxLength = 1000) => {
  if (typeof text !== 'string') return '';
  
  return text
    .trim()
    .slice(0, maxLength)
    .replace(/[<>"'&]/g, (match) => {
      const map = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return map[match];
    });
};

/**
 * Validates and sanitizes image sources to prevent XSS
 * @param {string} imageSrc - The image source URL
 * @returns {string|null} - Sanitized URL or null if invalid
 */
export function sanitizeImageSrc(imageSrc) {
  if (!imageSrc || typeof imageSrc !== 'string') {
    return null;
  }

  // Basic whitelist for allowed protocols
  const allowedProtocols = ['http:', 'https:', 'data:'];
  
  try {
    const url = new URL(imageSrc, window.location.origin);
    
    if (allowedProtocols.includes(url.protocol)) {
      return url.href;
    } else {
      console.warn('Disallowed protocol in image URL:', imageSrc);
      return null;
    }
  } catch (error) {
    // If URL parsing fails, it might be a relative URL
    if (imageSrc.startsWith('/') || imageSrc.startsWith('./') || imageSrc.startsWith('../')) {
      return imageSrc; // Allow relative URLs
    }
    
    console.warn('Invalid image URL:', imageSrc);
    return null;
  }
} 