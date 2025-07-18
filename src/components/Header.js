import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useThrottledScroll } from '../hooks/useThrottledScroll';
// import { openSecureLink } from '../lib/utils';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  // Fixed scroll handler using useRef to prevent memory leaks
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const lastScrollY = lastScrollYRef.current;
    
    // Determine if we've scrolled enough to show shadow
    setScrolled(currentScrollY > 10);
    
    // Determine scroll direction and visibility
    if (currentScrollY < 10) {
      // Always show header at the top of the page
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down & past 100px - hide header
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up - show header
      setIsVisible(true);
    }
    
    // Update the ref with current scroll position
    lastScrollYRef.current = currentScrollY;
  };

  // Use throttled scroll hook to prevent performance issues
  useThrottledScroll(handleScroll, 16); // 60fps throttling

  const scrollToSection = (sectionId) => {
    try {
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 60,
          behavior: 'smooth'
        });
        setIsMenuOpen(false);
      }
    } catch (error) {
      console.error('Error scrolling to section:', error);
      // Fallback: try simple scroll
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle external link with security measures
  const handleExternalLink = (url) => {
    var win = window.open(url, '_blank');
    win.focus();
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-500 ease-in-out ${
      scrolled ? 'shadow-lg backdrop-blur-sm' : 'shadow-sm'
    } ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto px-4 md:px-6 py-2 md:py-3">
        <div className="flex items-center justify-between min-h-[50px]">
          <button 
            onClick={() => {
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }} 
            className="flex items-center flex-shrink-0"
            aria-label="Go to home section"
          >
            <img 
              src={`${process.env.PUBLIC_URL}/images/myna-logo.jpg`} 
              alt="Myna Kitchen Logo" 
              className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 xl:h-18 object-contain transition-all duration-200"
              style={{ maxWidth: '250px' }}
              onError={(e) => {
                console.error('Logo image failed to load');
                e.target.style.display = 'none';
              }}
            />
          </button>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-3">
            <button 
              onClick={() => window.open('signin','_blank')}
              className="text-black hover:text-primary font-medium transition-colors text-sm"
              aria-label="Sign in to Myna Kitchen"
            >
              Sign In
            </button>
            <button 
              onClick={() => window.open('SignUp','_blank')}
              className="bg-accent text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-sm hover:bg-warmOrange-600 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Sign up for Myna Kitchen"
            >
              Sign Up
            </button>
            <button 
              type="button" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center p-2 rounded-md text-tertiary hover:text-primary hover:bg-sage-50 focus:outline-none min-h-[44px] min-w-[44px]"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FontAwesomeIcon icon={faTimes} className="block h-5 w-5" />
              ) : (
                <FontAwesomeIcon icon={faBars} className="block h-5 w-5" />
              )}
            </button>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button 
              onClick={() => {
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="text-black hover:text-primary font-medium transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => {
                window.history.pushState({}, '', '/browse-plans');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="text-black hover:text-primary font-medium transition-colors"
            >
              Browse Plans
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-black hover:text-primary font-medium transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('daily-menu')}
              className="text-black hover:text-primary font-medium transition-colors"
            >
              Menu
            </button>
            <button 
              onClick={() => scrollToSection('subscription-plans')}
              className="text-black hover:text-primary font-medium transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('delivery-map')}
              className="text-black hover:text-primary font-medium transition-colors"
            >
              Delivery Areas
            </button>
            <button 
              onClick={() => handleExternalLink('signin')}
              className="text-black hover:text-primary font-medium transition-colors"
              aria-label="Sign in to Myna Kitchen"
            >
              Sign In
            </button>
            <button 
              onClick={() => handleExternalLink('SignUp')}
              className="bg-accent text-white px-6 py-2.5 rounded-full font-medium shadow-sm hover:bg-warmOrange-600 transition-colors"
              aria-label="Sign up for Myna Kitchen"
            >
              Sign Up
            </button>
          </nav>
        </div>
        
        {/* Mobile navigation */}
        <div className={`pt-4 pb-3 border-t border-tertiary/20 md:hidden transition-all duration-300 ${isMenuOpen ? 'block opacity-100' : 'hidden opacity-0'}`}>
          <div className="space-y-1">
            <button 
              onClick={() => {
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-black hover:bg-sage-50 transition-colors min-h-[44px]"
            >
              Home
            </button>
            <button 
              onClick={() => {
                window.history.pushState({}, '', '/browse-plans');
                window.dispatchEvent(new PopStateEvent('popstate'));
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-black hover:bg-sage-50 transition-colors min-h-[44px]"
            >
              Browse Plans
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-black hover:bg-sage-50 transition-colors min-h-[44px]"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('daily-menu')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-black hover:bg-sage-50 transition-colors min-h-[44px]"
            >
              Menu
            </button>
            <button 
              onClick={() => scrollToSection('subscription-plans')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-black hover:bg-sage-50 transition-colors min-h-[44px]"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('delivery-map')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-black hover:bg-sage-50 transition-colors min-h-[44px]"
            >
              Delivery Areas
            </button>
            <button 
              onClick={() => window.location.href = 'signin'}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-black hover:bg-sage-50 transition-colors min-h-[44px]"
              aria-label="Sign in to Myna Kitchen"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 