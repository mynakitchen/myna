import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="w-10 h-10 mr-2 bg-white rounded-full flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#006400" 
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
              <span className="text-xl font-bold text-white">Myna Kitchen</span>
            </div>
            <p className="text-gray-400 mb-4">Delicious home-style meals delivered to your doorstep.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#daily-menu" className="text-gray-400 hover:text-white transition-colors">Daily Menu</a></li>
              <li><a href="#subscription" className="text-gray-400 hover:text-white transition-colors">Subscriptions</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to get updates on new menu items and offers.</p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="rounded-l-lg rounded-r-none bg-gray-800 border-gray-700 text-white"
              />
              <Button 
                className="rounded-l-none rounded-r-lg bg-accent hover:bg-accent/90"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="m5 12 7 7 7-7" />
                  <path d="m5 5 7 7 7-7" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Myna Kitchen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
