import React, { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProblemStatement from './components/ProblemStatement';
// import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import SubscriptionPlans from './components/SubscriptionPlans';
import TrialCallToAction from './components/TrialCallToAction';
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
import ProblemStatementPage from './components/pages/ProblemStatementPage';
import MenuPage from './components/pages/MenuPage';
import HowItWorksPage from './components/pages/HowItWorksPage';
import CorporatePage from './components/pages/CorporatePage';
import FAQPage from './components/pages/FAQPage';
import DailyMealsIntro from './components/DailyMealsIntro';
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
      } else if (pathname === '/why-us') {
          setCurrentPage('why-us');
          setBlogSlug(null);
      } else if (pathname === '/menu') {
          setCurrentPage('menu');
          setBlogSlug(null);
      } else if (pathname === '/how-it-works') {
          setCurrentPage('how-it-works');
          setBlogSlug(null);
      } else if (pathname === '/corporate') {
          setCurrentPage('corporate');
          setBlogSlug(null);
      } else if (pathname === '/faq') {
          setCurrentPage('faq');
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

  // Scroll to top when visiting policy pages and new pages
  useEffect(() => {
    if (currentPage === 'privacy-policy' || currentPage === 'terms' ||
        currentPage === 'why-us' || currentPage === 'menu' ||
        currentPage === 'how-it-works' || currentPage === 'corporate' ||
        currentPage === 'faq' || currentPage === 'gallery' || currentPage === 'blog' || currentPage === 'blog-article') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  return (
    <div className="font-sans text-gray-800 bg-white overflow-x-hidden min-h-screen">
      {(currentPage === 'home' || currentPage === 'corporate-orders' || currentPage === 'privacy-policy' ||
        currentPage === 'terms' || currentPage === 'why-us' || currentPage === 'menu' ||
        currentPage === 'how-it-works' || currentPage === 'corporate' || currentPage === 'faq'
        || currentPage === 'gallery' || currentPage === 'blog' || currentPage === 'blog-article') && (
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
      )}
      
      <main className="relative">
        {currentPage === 'home' && (
          <>
            <SEO
              title="Home - Fresh Homely Meals Delivered Daily"
              description="Myna Kitchen delivers fresh, home-cooked meals (South & North Indian) to your doorstep in Chennai. Daily meal plans starting at ₹80."
              canonical="/"
              schema={{
                "@context": "https://schema.org",
                "@type": "FoodService",
                "name": "Myna Kitchen",
                "url": "https://mynakitchen.in",
                "image": "https://mynakitchen.in/images/myna-logo.jpg",
                "description": "Fresh, home-cooked meals delivered daily to your doorstep.",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Chennai",
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "13.0827",
                  "longitude": "80.2707"
                },
                "telephone": "+91-7418688269",
                "priceRange": "₹80 - ₹200",
                "servesCuisine": ["South Indian", "North Indian", "Indian"]
              }}
            />
            <ErrorBoundary>
              <HeroSection />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <DailyMealsIntro />
            </ErrorBoundary>

            <ErrorBoundary>
              <SubscriptionPlans />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <TrialCallToAction />
            </ErrorBoundary>

            <ErrorBoundary>
              <Testimonials />
            </ErrorBoundary>

            <ErrorBoundary>
              <InstagramFeed />
            </ErrorBoundary>
            <ErrorBoundary>
              <DeliveryMap />
            </ErrorBoundary>
          </>
        )}
        {currentPage === 'browse-plans' && (
          <ErrorBoundary>
            <SEO
              title="Meal Subscription Plans"
              description="Customize your daily meal plan. Choose from South Indian, North Indian, and specialized diet options. Flexible subscriptions."
              canonical="/browse-plans"
            />
            <MealPlanConfig />
          </ErrorBoundary>
        )}
        {currentPage === 'corporate-orders' && (
        <>
          <ErrorBoundary>
            <CorporateOrders />
          </ErrorBoundary>
          <ErrorBoundary>
          <SEO
            title="Corporate Catering Services"
            description="Bulk food delivery and corporate catering services in Chennai by Myna Kitchen. Healthy, homely meals for your team."
            canonical="/corporate-orders"
          />
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
            <SEO
              title="Privacy Policy"
              description="Privacy Policy for Myna Kitchen. How we handle your data and privacy."
              canonical="/privacy-policy"
            />
            <PrivacyPolicy />
          </ErrorBoundary>
        )}
        {currentPage === 'terms' && (
          <ErrorBoundary>
            <SEO
              title="Terms and Conditions"
              description="Terms and Conditions for Myna Kitchen services and subscriptions."
              canonical="/terms-and-conditions"
            />
            <TermsAndConditions />
          </ErrorBoundary>
        )}
        {currentPage === 'why-us' && (
          <ErrorBoundary>
            <SEO
              title="Why Choose Us - Healthy Daily Meals"
              description="Why Myna Kitchen? We solve your daily food struggle with healthy, affordable, and timely home-cooked meals."
              canonical="/why-us"
            />
            <ProblemStatementPage />
          </ErrorBoundary>
        )}
        {currentPage === 'menu' && (
          <ErrorBoundary>
            <SEO
              title="Our Daily Menu - South & North Indian Meals"
              description="Explore our daily rotating menu of South Indian and North Indian home-style meals. Over 175 dishes including diverse comfort foods."
              canonical="/menu"
            />
            <MenuPage />
          </ErrorBoundary>
        )}
        {currentPage === 'how-it-works' && (
          <ErrorBoundary>
            <SEO
              title="How It Works - Meal Subscription"
              description="Simple 3-step process to get fresh home-cooked meals delivered to your door. Select your plan, customize your menu, and enjoy."
              canonical="/how-it-works"
            />
            <HowItWorksPage />
          </ErrorBoundary>
        )}
        {currentPage === 'corporate' && (
          <ErrorBoundary>
            <SEO
              title="Corporate Food Solutions"
              description="Employee meal programs and corporate food solutions in Chennai. Boost productivity with healthy team lunches."
              canonical="/corporate"
            />
            <CorporatePage />
          </ErrorBoundary>
        )}
        {currentPage === 'faq' && (
          <ErrorBoundary>
            <SEO
              title="Frequently Asked Questions"
              description="Common questions about Myna Kitchen's delivery, pricing, subscription plans, and cancellation policies."
              canonical="/faq"
            />
            <FAQPage />
          </ErrorBoundary>
        )}
      </main>
      
      {(currentPage === 'home' || currentPage === 'privacy-policy' || currentPage === 'terms' ||
        currentPage === 'corporate-orders' || currentPage === 'why-us' || currentPage === 'menu' ||
        currentPage === 'how-it-works' || currentPage === 'corporate' || currentPage === 'faq'
        || currentPage === 'gallery' || currentPage === 'blog' || currentPage === 'blog-article') && (
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