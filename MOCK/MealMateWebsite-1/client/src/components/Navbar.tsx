import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={cn(
      "fixed w-full z-50 bg-white transition-all duration-300",
      scrolled ? "shadow-md py-2" : "py-4"
    )}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <span className="w-10 h-10 mr-2 bg-primary rounded-full flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M7 12c-1.1 0-2-.9-2-2V5.5a2.5 2.5 0 0 1 5 0V10c0 1.1-.9 2-2 2z" />
              <path d="M17 12c-1.1 0-2-.9-2-2V5.5a2.5 2.5 0 0 1 5 0V10c0 1.1-.9 2-2 2z" />
              <path d="M2 9v3c0 4.4 3.6 8 8 8h4c4.4 0 8-3.6 8-8V9" />
              <line x1="12" y1="22" x2="12" y2="17" />
            </svg>
          </span>
          <span className="text-xl font-bold text-primary">Myna</span>
          <span className="text-xl font-medium ml-1">Kitchen</span>
        </a>
        
        {/* Mobile: Menu toggle + CTA button */}
        <div className="flex items-center md:hidden">
          <a 
            href="#subscription" 
            className="mr-4 px-4 py-2 bg-accent text-white rounded-full text-sm font-medium hover:bg-opacity-90 transition-all"
          >
            Try a Meal
          </a>
          <button 
            onClick={toggleMenu} 
            className="flex flex-col justify-center items-center w-8 h-8"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center">
          <ul className="flex space-x-6">
            <li><a href="#home" className="text-gray-800 hover:text-primary transition-colors">Home</a></li>
            <li><a href="#daily-menu" className="text-gray-800 hover:text-primary transition-colors">Daily Menu</a></li>
            <li><a href="#subscription" className="text-gray-800 hover:text-primary transition-colors">Subscriptions</a></li>
            <li><a href="#about" className="text-gray-800 hover:text-primary transition-colors">About</a></li>
            <li><a href="#contact" className="text-gray-800 hover:text-primary transition-colors">Contact</a></li>
            <li>
              <a 
                href="#subscription" 
                className="ml-2 px-6 py-2 bg-accent text-white rounded-full font-medium hover:bg-opacity-90 transition-all inline-block"
              >
                Try a Meal
              </a>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "bg-white w-full shadow-lg absolute transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <ul className="flex flex-col py-2">
          <li><a href="#home" className="block px-6 py-3 hover:bg-secondary transition-colors" onClick={toggleMenu}>Home</a></li>
          <li><a href="#daily-menu" className="block px-6 py-3 hover:bg-secondary transition-colors" onClick={toggleMenu}>Daily Menu</a></li>
          <li><a href="#subscription" className="block px-6 py-3 hover:bg-secondary transition-colors" onClick={toggleMenu}>Subscriptions</a></li>
          <li><a href="#about" className="block px-6 py-3 hover:bg-secondary transition-colors" onClick={toggleMenu}>About</a></li>
          <li><a href="#contact" className="block px-6 py-3 hover:bg-secondary transition-colors" onClick={toggleMenu}>Contact</a></li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
