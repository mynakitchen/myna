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
import DeliveryMap from './components/DeliveryMap';
import InstagramFeed from './components/InstagramFeed';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import ErrorBoundary from './components/ErrorBoundary';
import { createScrollObserver } from './lib/utils';
import MealPlanConfig from './components/MealPlanConfig';
import CorporateOrderForm from './components/CorporateOrderForm';
import WhatsAppWidget from './components/WhatsAppWidget';
import Gallery from './components/Gallery';
import Blog from './components/Blog';
import BlogArticle from './components/BlogArticle';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [blogSlug, setBlogSlug] = useState(null);

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
    const syncRoute = (pathname) => {
      if (pathname === '/browse-plans') {
        setCurrentPage('browse-plans');
        setBlogSlug(null);
      } else if (pathname === '/corporate-orders') {
        setCurrentPage('corporate-orders');
        setBlogSlug(null);
      } else if (pathname === '/gallery') {
        setCurrentPage('gallery');
        setBlogSlug(null);
      } else if (pathname === '/blog') {
        setCurrentPage('blog');
        setBlogSlug(null);
      } else if (pathname.startsWith('/blog/')) {
        const [, , slug] = pathname.split('/');
        if (slug) {
          setCurrentPage('blog-article');
          setBlogSlug(slug);
        } else {
          setCurrentPage('blog');
          setBlogSlug(null);
        }
      } else if (pathname === '/privacy-policy') {
        setCurrentPage('privacy-policy');
        setBlogSlug(null);
      } else if (pathname === '/terms-and-conditions') {
        setCurrentPage('terms');
        setBlogSlug(null);
      } else {
        setCurrentPage('home');
        setBlogSlug(null);
      }
    };

    syncRoute(window.location.pathname);

    // Handle browser back/forward buttons
    const handlePopState = () => {
      syncRoute(window.location.pathname);
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

  // Scroll to top when visiting policy pages
  useEffect(() => {
    if (
      currentPage === 'privacy-policy' ||
      currentPage === 'terms' ||
      currentPage === 'gallery' ||
      currentPage === 'blog' ||
      currentPage === 'blog-article'
    ) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  return (
    <div className="font-sans text-gray-800 bg-white overflow-x-hidden min-h-screen">
      {(currentPage === 'home' || currentPage === 'gallery' || currentPage === 'blog' || currentPage === 'blog-article' || currentPage === 'corporate-orders' || currentPage === 'privacy-policy' || currentPage === 'terms') && (
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
      )}
      
      <main className="relative">
        {currentPage === 'home' && (
          <>
            <ErrorBoundary>
              <HeroSection />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <ProblemStatement />
            </ErrorBoundary>
            
            {/* <Features /> */}
            
            <ErrorBoundary>
              <SubscriptionPlans />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <DailyMenu />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <InstagramFeed />
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
              <CorporateOrders />
            </ErrorBoundary>
            <ErrorBoundary>
              <CorporateOrderForm showHeader={false} />
            </ErrorBoundary>
          </>
        )}
        {currentPage === 'gallery' && (
          <ErrorBoundary>
            <Gallery />
          </ErrorBoundary>
        )}
        {currentPage === 'blog' && (
          <ErrorBoundary>
            <Blog />
          </ErrorBoundary>
        )}
        {currentPage === 'blog-article' && (
          <ErrorBoundary>
            <BlogArticle slug={blogSlug} />
          </ErrorBoundary>
        )}
        {currentPage === 'privacy-policy' && (
          <ErrorBoundary>
            <PrivacyPolicy />
          </ErrorBoundary>
        )}
        {currentPage === 'terms' && (
          <ErrorBoundary>
            <TermsAndConditions />
          </ErrorBoundary>
        )}
      </main>
      
      {(currentPage === 'home' || currentPage === 'gallery' || currentPage === 'blog' || currentPage === 'blog-article' || currentPage === 'privacy-policy' || currentPage === 'terms' || currentPage === 'corporate-orders') && (
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      )}
      
      {/* WhatsApp Floating Widget - Available on all pages */}
      <ErrorBoundary>
        <WhatsAppWidget />
      </ErrorBoundary>
    </div>
  );
}

export default App; 