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
import ProblemStatementPage from './components/pages/ProblemStatementPage';
import MenuPage from './components/pages/MenuPage';
import HowItWorksPage from './components/pages/HowItWorksPage';
import CorporatePage from './components/pages/CorporatePage';
import FAQPage from './components/pages/FAQPage';
import DailyMealsIntro from './components/DailyMealsIntro';
import SingleMealHighlight from './components/SingleMealHighlight';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

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
    } else if (path === '/privacy-policy') {
      setCurrentPage('privacy-policy');
    } else if (path === '/terms-and-conditions') {
      setCurrentPage('terms');
    } else if (path === '/why-us') {
      setCurrentPage('why-us');
    } else if (path === '/menu') {
      setCurrentPage('menu');
    } else if (path === '/how-it-works') {
      setCurrentPage('how-it-works');
    } else if (path === '/corporate') {
      setCurrentPage('corporate');
    } else if (path === '/faq') {
      setCurrentPage('faq');
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
      } else if (path === '/privacy-policy') {
        setCurrentPage('privacy-policy');
      } else if (path === '/terms-and-conditions') {
        setCurrentPage('terms');
      } else if (path === '/why-us') {
        setCurrentPage('why-us');
      } else if (path === '/menu') {
        setCurrentPage('menu');
      } else if (path === '/how-it-works') {
        setCurrentPage('how-it-works');
      } else if (path === '/corporate') {
        setCurrentPage('corporate');
      } else if (path === '/faq') {
        setCurrentPage('faq');
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

  // Scroll to top when visiting policy pages and new pages
  useEffect(() => {
    if (currentPage === 'privacy-policy' || currentPage === 'terms' || 
        currentPage === 'why-us' || currentPage === 'menu' || 
        currentPage === 'how-it-works' || currentPage === 'corporate' || 
        currentPage === 'faq') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  return (
    <div className="font-sans text-gray-800 bg-white overflow-x-hidden min-h-screen">
      {(currentPage === 'home' || currentPage === 'corporate-orders' || currentPage === 'privacy-policy' || 
        currentPage === 'terms' || currentPage === 'why-us' || currentPage === 'menu' || 
        currentPage === 'how-it-works' || currentPage === 'corporate' || currentPage === 'faq') && (
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
                  "addressRegion": "Tamil Nadu",
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "13.0827",
                  "longitude": "80.2707" 
                },
                "telephone": "+91-7418688269",
                "priceRange": "₹80 - ₹200",
                "servesCuisine": ["South Indian", "North Indian", "Indian"],
                "areaServed": {
                  "@type": "City",
                  "name": "Chennai"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Meal Plans",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Daily Meal Subscription",
                        "description": "Fresh home-cooked meals delivered daily"
                      }
                    }
                  ]
                }
              }}
              schemas={[{
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Myna Kitchen",
                "url": "https://mynakitchen.in",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://mynakitchen.in/menu",
                  "query-input": "required name=search_term_string"
                }
              }]}
            />
            <ErrorBoundary>
              <HeroSection />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <SingleMealHighlight />
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
              schema={{
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Meal Subscription",
                "name": "Meal Subscription Plans",
                "description": "Customize your daily meal plan with flexible subscription options",
                "provider": {
                  "@type": "FoodService",
                  "name": "Myna Kitchen"
                },
                "areaServed": {
                  "@type": "City",
                  "name": "Chennai"
                },
                "offers": {
                  "@type": "Offer",
                  "priceRange": "₹80 - ₹200",
                  "priceCurrency": "INR"
                }
              }}
              breadcrumbs={[
                { name: "Home", url: "/" },
                { name: "Browse Plans", url: "/browse-plans" }
              ]}
            />
            <MealPlanConfig />
          </ErrorBoundary>
        )}
        {currentPage === 'corporate-orders' && (
          <ErrorBoundary>
            <SEO 
              title="Corporate Catering Services" 
              description="Bulk food delivery and corporate catering services in Chennai by Myna Kitchen. Healthy, homely meals for your team."
              canonical="/corporate-orders"
              schema={{
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Corporate Catering",
                "name": "Corporate Catering Services",
                "description": "Bulk food delivery and corporate catering services for offices",
                "provider": {
                  "@type": "FoodService",
                  "name": "Myna Kitchen"
                },
                "areaServed": {
                  "@type": "City",
                  "name": "Chennai"
                }
              }}
              breadcrumbs={[
                { name: "Home", url: "/" },
                { name: "Corporate", url: "/corporate" },
                { name: "Corporate Orders", url: "/corporate-orders" }
              ]}
            />
            <CorporateOrderForm />
          </ErrorBoundary>
        )}
        {currentPage === 'privacy-policy' && (
          <ErrorBoundary>
            <SEO 
              title="Privacy Policy" 
              description="Privacy Policy for Myna Kitchen. How we handle your data and privacy."
              canonical="/privacy-policy"
              schema={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Privacy Policy",
                "description": "Privacy Policy for Myna Kitchen",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "Myna Kitchen",
                  "url": "https://mynakitchen.in"
                }
              }}
              breadcrumbs={[
                { name: "Home", url: "/" },
                { name: "Privacy Policy", url: "/privacy-policy" }
              ]}
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
              schema={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Terms and Conditions",
                "description": "Terms and Conditions for Myna Kitchen services",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "Myna Kitchen",
                  "url": "https://mynakitchen.in"
                }
              }}
              breadcrumbs={[
                { name: "Home", url: "/" },
                { name: "Terms and Conditions", url: "/terms-and-conditions" }
              ]}
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
              schema={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Why Choose Us",
                "description": "Why Myna Kitchen is the best choice for daily meals",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "Myna Kitchen",
                  "url": "https://mynakitchen.in"
                }
              }}
              breadcrumbs={[
                { name: "Home", url: "/" },
                { name: "Why Us", url: "/why-us" }
              ]}
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
              schema={{
                "@context": "https://schema.org",
                "@type": "Menu",
                "name": "Myna Kitchen Daily Menu",
                "description": "Daily rotating menu featuring South Indian and North Indian home-style meals",
                "hasMenuSection": [
                  {
                    "@type": "MenuSection",
                    "name": "South Indian",
                    "description": "Traditional South Indian dishes"
                  },
                  {
                    "@type": "MenuSection",
                    "name": "North Indian",
                    "description": "Classic North Indian favorites"
                  }
                ],
                "provider": {
                  "@type": "FoodService",
                  "name": "Myna Kitchen"
                }
              }}
              breadcrumbs={[
                { name: "Home", url: "/" },
                { name: "Menu", url: "/menu" }
              ]}
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
              schema={{
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Subscribe to Myna Kitchen Meals",
                "description": "Simple 3-step process to get fresh home-cooked meals delivered",
                "step": [
                  {
                    "@type": "HowToStep",
                    "name": "Select Your Plan",
                    "text": "Choose from our flexible meal subscription plans"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Customize Your Menu",
                    "text": "Customize your preferences and delivery schedule"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Enjoy Fresh Meals",
                    "text": "Receive fresh, home-cooked meals delivered to your door"
                  }
                ]
              }}
              breadcrumbs={[
                { name: "Home", url: "/" },
                { name: "How It Works", url: "/how-it-works" }
              ]}
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
              schema={{
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Corporate Food Solutions",
                "name": "Corporate Food Solutions",
                "description": "Employee meal programs and corporate catering",
                "provider": {
                  "@type": "FoodService",
                  "name": "Myna Kitchen"
                },
                "areaServed": {
                  "@type": "City",
                  "name": "Chennai"
                },
                "audience": {
                  "@type": "BusinessAudience",
                  "audienceType": "Corporate Offices"
                }
              }}
              breadcrumbs={[
                { name: "Home", url: "/" },
                { name: "Corporate", url: "/corporate" }
              ]}
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
              schema={{
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Is the food home-cooked?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, Myna Kitchen prepares meals in a hygiene-controlled home-style kitchen using fresh ingredients and no preservatives."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I customize my meal plan?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, you can choose specific preferences (Veg/Non-veg) and manage your delivery schedule via our web app."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is the delivery time?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Lunch is typically delivered between 12:30 PM - 1:30 PM, and Dinner between 7:30 PM - 8:30 PM."
                    }
                  }
                ]
              }}
              breadcrumbs={[
                { name: "Home", url: "/" },
                { name: "FAQ", url: "/faq" }
              ]}
            />
            <FAQPage />
          </ErrorBoundary>
        )}
      </main>
      
      {(currentPage === 'home' || currentPage === 'privacy-policy' || currentPage === 'terms' || 
        currentPage === 'corporate-orders' || currentPage === 'why-us' || currentPage === 'menu' || 
        currentPage === 'how-it-works' || currentPage === 'corporate' || currentPage === 'faq') && (
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