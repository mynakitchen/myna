import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

// Function to create intersection observer
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  return new IntersectionObserver(callback, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  });
}

// Add scroll-linked rotation effect to an element
export function addScrollRotationEffect(
  elementId: string,
  speed: number = 0.1
): () => void {
  let rotationDegree = 0;
  let lastScrollY = window.scrollY;
  
  const onScroll = () => {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const scrollDifference = window.scrollY - lastScrollY;
    rotationDegree = (rotationDegree + (scrollDifference * speed)) % 360;
    lastScrollY = window.scrollY;
    
    element.style.transform = `rotateY(${rotationDegree}deg)`;
  };
  
  window.addEventListener('scroll', onScroll);
  
  // Return cleanup function
  return () => window.removeEventListener('scroll', onScroll);
}
