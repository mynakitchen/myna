import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToSection = (sectionId) => {
    const performScroll = () => {
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    };

    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      setTimeout(performScroll, 120);
    } else {
      performScroll();
    }
  };
  
  return (
    <footer className="modern-footer">
      <div className="footer-container">
        {/* Red Top Section */}
        <div className="footer-top">
          <div className="footer-top-content">
            <div className="founded-info">
              <span className="info-label">YEAR FOUNDED</span>
              <span className="info-value">2025</span>
            </div>
            <div className="location-info">
              <span className="info-label">LOCATION</span>
              <span className="info-value">OMR, Chennai</span>
            </div>
          </div>
        </div>
        
        {/* Black Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            {/* Contact Section */}
            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>Chennai South Chennai</p>
              <p>Phone: +91 7418688269</p>
              <p>Email: kitchenmyna@gmail.com</p>
            </div>
            
            {/* Connect Section */}
            <div className="footer-section">
              <h3>Connect</h3>
              <div className="social-links">
                <a href="https://www.instagram.com/mynakitchn/" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
                <a href="https://api.whatsapp.com/send/?phone=%2B917418688269&text=I+want+to+try+your+meal+service.&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom Credits */}
          <div className="footer-credits">
            <div className="credits-left">
              {/* Motivational Messages */}
              <div className="motivational-messages">
                <span className="message-item">
                  <span className="message-icon">👄</span>
                  <span className="message-text">LOVE @FIRST BITE</span>
                </span>
                <span className="message-item">
                  <span className="message-icon">🌵</span>
                  <span className="message-text">F*CK JUNKFOOD</span>
                </span>
                <span className="message-item">
                  <span className="message-icon">✌️</span>
                  <span className="message-text">WILD & YUMMY ENJOY!</span>
                </span>
                <span className="message-item">
                  <span className="message-icon">👄</span>
                  <span className="message-text">LOVE @FIRST BITE</span>
                </span>
              </div>
            </div>
            
            {/* Navigation Pills */}
            <div className="footer-nav">
              <button 
                onClick={() => scrollToSection('hero')}
                className="nav-pill active"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('subscription-plans')}
                className="nav-pill"
              >
                Plans
              </button>
              <button 
                onClick={() => scrollToSection('daily-menu')}
                className="nav-pill mobile-hidden"
              >
                Menu
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="nav-pill mobile-hidden"
              >
                Reviews
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Copyright */}
        <div className="footer-bottom-credits">
          <p>Made with ❤️ by Myna Team</p>
          <p>
            © {currentYear} •{' '}
            <a
              href="/privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/privacy-policy');
                window.dispatchEvent(new PopStateEvent('popstate'));
                // Force scroll-to-top for reliable behavior on deployment
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="footer-link"
              style={{ display: 'inline', padding: 0, margin: 0, cursor: 'pointer' }}
            >
              Privacy Policy
            </a>
            {' '}•{' '}
            <a
              href="/terms-and-conditions"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/terms-and-conditions');
                window.dispatchEvent(new PopStateEvent('popstate'));
                // Ensure consistent scroll-to-top behavior
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="footer-link"
              style={{ display: 'inline', padding: 0, margin: 0, cursor: 'pointer' }}
            >
              Terms and Conditions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 