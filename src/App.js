import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProblemStatement from './components/ProblemStatement';
// import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import SubscriptionPlans from './components/SubscriptionPlans';
import DailyMenu from './components/DailyMenu';
import Testimonials from './components/Testimonials';
import CorporateOrders from './components/CorporateOrders';
import CorporateOrderHeader from './components/CorporateOrderHeader';
import DeliveryMap from './components/DeliveryMap';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { createScrollObserver } from './lib/utils';
import MealPlanConfig from './components/MealPlanConfig';
import CorporateOrderForm from './components/CorporateOrderForm';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const navigateToSignUp = () => {
    window.location.href = 'https://app.mynakitchen.in/signup';
  };

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

    // Simple client-side routing
    const path = window.location.pathname;
    if (path === '/browse-plans') {
      setCurrentPage('browse-plans');
    } else if (path === '/corporate-orders') {
      setCurrentPage('corporate-orders');
    } else {
      setCurrentPage('home');
    }

    // Handle browser back/forward buttons
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/browse-plans') {
        setCurrentPage('browse-plans');
      } else if (path === '/corporate-orders') {
        setCurrentPage('corporate-orders');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Cleanup function
    return () => {
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-white overflow-x-hidden min-h-screen">
      {(currentPage === 'home' || currentPage === 'corporate-orders') && (
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
      )}
      
      <main className="relative">
        {currentPage === 'home' && (
          <>
            <section className="try-now-section section-fade" aria-labelledby="try-now-heading">
              <div className="container mx-auto">
                <div className="hero-content-wrapper try-now-content">
                  <div className="hero-text try-now-text">
                    <span className="try-now-pill">Taste the routine</span>
                    <h2 id="try-now-heading" className="hero-title try-now-heading">
                      Try Myna for 3 days
                    </h2>
                    <span className="hero-subtitle try-now-subtitle">Food sorted, without the fuss</span>
                    <p className="hero-description try-now-description">
                      Grab a 3-day Myna taste test and decide if we belong in your daily routine.
                    </p>
                    <div className="hero-buttons try-now-buttons">
                      <button
                        type="button"
                        className="try-now-button"
                        onClick={navigateToSignUp}
                        aria-label="Try Myna now"
                      >
                        Try Now
                      </button>
                    </div>
                    <p className="hero-description try-now-stat">
                      9 out of 10 folks who take the trial stick around, the other 1 is clearly lying.
                    </p>
                  </div>
                </div>
              </div>
            </section>
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
            
            {/* Corporate orders teaser removed from home; moved to dedicated page */}
            
            <ErrorBoundary>
              <DeliveryMap />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <FAQ />
            </ErrorBoundary>
          </>
        )}
        {currentPage === 'browse-plans' && (
          <ErrorBoundary>
            <MealPlanConfig />
          </ErrorBoundary>
        )}
        {currentPage === 'corporate-orders' && (
          <>
            <ErrorBoundary>
              <CorporateOrderHeader />
            </ErrorBoundary>
            <ErrorBoundary>
              <CorporateOrders />
            </ErrorBoundary>
            <ErrorBoundary>
              <CorporateOrderForm showHeader={false} />
            </ErrorBoundary>
          </>
        )}
      </main>
      
      {(currentPage === 'home') && (
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      )}
    </div>
  );
}

export default App; 