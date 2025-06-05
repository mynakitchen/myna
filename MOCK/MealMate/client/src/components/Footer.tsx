import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M18 3C9.716 3 3 9.716 3 18C3 26.284 9.716 33 18 33C26.284 33 33 26.284 33 18C33 9.716 26.284 3 18 3ZM24.6 19.8H19.8V24.6C19.8 25.48 19.08 26.2 18.2 26.2C17.32 26.2 16.6 25.48 16.6 24.6V19.8H11.8C10.92 19.8 10.2 19.08 10.2 18.2C10.2 17.32 10.92 16.6 11.8 16.6H16.6V11.8C16.6 10.92 17.32 10.2 18.2 10.2C19.08 10.2 19.8 10.92 19.8 11.8V16.6H24.6C25.48 16.6 26.2 17.32 26.2 18.2C26.2 19.08 25.48 19.8 24.6 19.8Z" fill="currentColor"/>
              </svg>
              <span className="text-2xl font-semibold">Myna Kitchen</span>
            </div>
            <p className="text-gray-400 mb-6">Delicious home-style meals delivered to your doorstep. Bringing convenience to your daily meals.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#home" 
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#how-it-works" 
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}
                >
                  How It Works
                </a>
              </li>
              <li>
                <a 
                  href="#explore-menu" 
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => { e.preventDefault(); scrollToSection('explore-menu'); }}
                >
                  Menu
                </a>
              </li>
              <li>
                <a 
                  href="#pricing" 
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}
                >
                  Pricing
                </a>
              </li>
              <li>
                <a 
                  href="#delivery-areas" 
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => { e.preventDefault(); scrollToSection('delivery-areas'); }}
                >
                  Delivery Areas
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mt-1 mr-3 text-gray-400" />
                <span className="text-gray-400">123 OMR Road, Chennai, Tamil Nadu 600119</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-gray-400" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-gray-400" />
                <span className="text-gray-400">hello@mynakitchen.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to get the latest updates and offers.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none text-gray-900"
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-r-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Myna Kitchen. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
