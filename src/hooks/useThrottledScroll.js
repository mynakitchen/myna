import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for throttled scroll event handling
 * Prevents memory leaks and performance issues with scroll listeners
 * 
 * @param {Function} callback - Function to call on scroll
 * @param {number} delay - Throttle delay in milliseconds (default: 16ms for 60fps)
 * @param {Array} deps - Dependencies array for the callback
 */
export const useThrottledScroll = (callback, delay = 16, deps = []) => {
  const savedCallback = useRef(callback);
  const throttleTimeoutRef = useRef(null);
  const lastExecutedRef = useRef(0);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback, deps]);

  // Throttled scroll handler
  const throttledScrollHandler = useCallback(() => {
    const now = Date.now();
    const timeSinceLastExecution = now - lastExecutedRef.current;

    if (timeSinceLastExecution >= delay) {
      // Execute immediately if enough time has passed
      savedCallback.current();
      lastExecutedRef.current = now;
    } else {
      // Schedule execution for the remaining time
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
      
      throttleTimeoutRef.current = setTimeout(() => {
        savedCallback.current();
        lastExecutedRef.current = Date.now();
        throttleTimeoutRef.current = null;
      }, delay - timeSinceLastExecution);
    }
  }, [delay]);

  useEffect(() => {
    // Add scroll listener
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, [throttledScrollHandler]);
}; 