import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add IntersectionObserver for fade-in animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Apply to any .section-fade elements once DOM is loaded
  setTimeout(() => {
    document.querySelectorAll('.section-fade').forEach(section => {
      observer.observe(section);
    });
  }, 100);
});

createRoot(document.getElementById("root")!).render(<App />);
