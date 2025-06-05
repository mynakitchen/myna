import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center space-x-2" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              <path d="M18 3C9.716 3 3 9.716 3 18C3 26.284 9.716 33 18 33C26.284 33 33 26.284 33 18C33 9.716 26.284 3 18 3ZM24.6 19.8H19.8V24.6C19.8 25.48 19.08 26.2 18.2 26.2C17.32 26.2 16.6 25.48 16.6 24.6V19.8H11.8C10.92 19.8 10.2 19.08 10.2 18.2C10.2 17.32 10.92 16.6 11.8 16.6H16.6V11.8C16.6 10.92 17.32 10.2 18.2 10.2C19.08 10.2 19.8 10.92 19.8 11.8V16.6H24.6C25.48 16.6 26.2 17.32 26.2 18.2C26.2 19.08 25.48 19.8 24.6 19.8Z" fill="currentColor"/>
            </svg>
            <span className="text-2xl font-semibold text-primary">Myna <span className="font-normal">Kitchen</span></span>
          </a>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <a 
              href="#try-a-meal" 
              className="bg-accent text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-orange-600 transition-colors"
              onClick={(e) => { e.preventDefault(); scrollToSection('try-a-meal'); }}
            >
              Try a Meal
            </a>
            <button 
              type="button" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#home" 
              className="text-gray-800 hover:text-primary font-medium transition-colors"
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            >
              Home
            </a>
            <a 
              href="#how-it-works" 
              className="text-gray-800 hover:text-primary font-medium transition-colors"
              onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}
            >
              How It Works
            </a>
            <a 
              href="#explore-menu" 
              className="text-gray-800 hover:text-primary font-medium transition-colors"
              onClick={(e) => { e.preventDefault(); scrollToSection('explore-menu'); }}
            >
              Menu
            </a>
            <a 
              href="#pricing" 
              className="text-gray-800 hover:text-primary font-medium transition-colors"
              onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}
            >
              Pricing
            </a>
            <a 
              href="#delivery-areas" 
              className="text-gray-800 hover:text-primary font-medium transition-colors"
              onClick={(e) => { e.preventDefault(); scrollToSection('delivery-areas'); }}
            >
              Delivery Areas
            </a>
            <a 
              href="#try-a-meal"
              className="bg-accent text-white px-6 py-2.5 rounded-full font-medium shadow-sm hover:bg-orange-600 transition-colors"
              onClick={(e) => { e.preventDefault(); scrollToSection('try-a-meal'); }}
            >
              Try a Meal
            </a>
          </nav>
        </div>
        
        {/* Mobile navigation */}
        <div className={`pt-4 pb-3 border-t border-gray-200 md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="space-y-1">
            <a 
              href="#home"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            >
              Home
            </a>
            <a 
              href="#how-it-works"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
              onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}
            >
              How It Works
            </a>
            <a 
              href="#explore-menu"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
              onClick={(e) => { e.preventDefault(); scrollToSection('explore-menu'); }}
            >
              Menu
            </a>
            <a 
              href="#pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
              onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}
            >
              Pricing
            </a>
            <a 
              href="#delivery-areas"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
              onClick={(e) => { e.preventDefault(); scrollToSection('delivery-areas'); }}
            >
              Delivery Areas
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
