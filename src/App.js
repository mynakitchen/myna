import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProblemStatement from './components/ProblemStatement';
// import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import SubscriptionPlans from './components/SubscriptionPlans';
import DailyMenu from './components/DailyMenu';
import Testimonials from './components/Testimonials';
import DeliveryMap from './components/DeliveryMap';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { createScrollObserver } from './lib/utils';

function App() {
  useEffect(() => {
    // Mark document as JS-enabled for CSS transitions
    document.body.classList.add('js-enabled');
  
    let intersectionObserver = null;
    let mutationObserver = null;

    const initializeScrollObserver = () => {
      // Cleanup existing observer
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }

      // Create intersection observer for fade-in animations
      intersectionObserver = createScrollObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Unobserve after activating to improve performance
            intersectionObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });

      // Apply to existing .section-fade elements
      const fadeElements = document.querySelectorAll('.section-fade');
      fadeElements.forEach(section => {
        if (section && !section.classList.contains('active')) {
          intersectionObserver.observe(section);
        }
      });
    };

    // Initialize scroll observer immediately
    initializeScrollObserver();

    // Set up MutationObserver to handle dynamically added elements
    const setupMutationObserver = () => {
      mutationObserver = new MutationObserver((mutations) => {
        let hasNewFadeElements = false;
        
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if the added node itself has the class
              if (node.classList && node.classList.contains('section-fade')) {
                if (intersectionObserver && !node.classList.contains('active')) {
                  intersectionObserver.observe(node);
                  hasNewFadeElements = true;
                }
              }
              
              // Check if any child elements have the class
              const childFadeElements = node.querySelectorAll && node.querySelectorAll('.section-fade');
              if (childFadeElements && childFadeElements.length > 0) {
                childFadeElements.forEach(element => {
                  if (intersectionObserver && !element.classList.contains('active')) {
                    intersectionObserver.observe(element);
                    hasNewFadeElements = true;
                  }
                });
              }
            }
          });
        });

        // Re-initialize if needed (fallback)
        if (hasNewFadeElements) {
          setTimeout(initializeScrollObserver, 100);
        }
      });

      // Start observing the document for changes
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false
      });
    };

    // Setup mutation observer after initial render
    setTimeout(setupMutationObserver, 0);

    // Cleanup function
    return () => {
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
    };
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-white overflow-x-hidden min-h-screen">
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      
      <main className="relative">
        <ErrorBoundary>
          <HeroSection />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <ProblemStatement />
        </ErrorBoundary>
        
        {/* <Features /> */}
        
        <ErrorBoundary>
          <DailyMenu />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <SubscriptionPlans />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <HowItWorks />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Testimonials />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <DeliveryMap />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <FAQ />
        </ErrorBoundary>
      </main>
      
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </div>
  );
}

export default App; 