import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import './InstagramFeed.css';

const InstagramFeed = () => {
  // Instagram posts and reels from @mynakitchn (cleaned URLs without query parameters)
  const instagramPosts = [
    'https://www.instagram.com/reel/DQMdGndie-V/',
    'https://www.instagram.com/reel/DQE1qjECaX6/',
    'https://www.instagram.com/reel/DOqeNFQCTN8/',
    'https://www.instagram.com/reel/DMfY0Yivl5q/',
    'https://www.instagram.com/reel/DMIR3gSpKWE/',
  ];

  useEffect(() => {
    // Remove any existing Instagram embed scripts first
    const existingScripts = document.querySelectorAll('script[src="https://www.instagram.com/embed.js"]');
    existingScripts.forEach(s => s.remove());

    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    
    // Process embeds when script loads
    script.onload = () => {
      if (window.instgrm) {
        // Process immediately
        window.instgrm.Embeds.process();
        
        // Process again after a short delay to catch any late-loading embeds
        setTimeout(() => {
          if (window.instgrm) {
            window.instgrm.Embeds.process();
          }
        }, 500);
        
        // Final attempt after longer delay
        setTimeout(() => {
          if (window.instgrm) {
            window.instgrm.Embeds.process();
          }
        }, 2000);
      }
    };

    document.body.appendChild(script);

    // Fallback: If script was already loaded, process embeds
    if (window.instgrm) {
      setTimeout(() => {
        window.instgrm.Embeds.process();
      }, 100);
    }

    return () => {
      // Cleanup on unmount
      const scripts = document.querySelectorAll('script[src="https://www.instagram.com/embed.js"]');
      scripts.forEach(s => s.remove());
    };
  }, []);

  return (
    <section id="instagram-feed" className="section-fade py-12 sm:py-16 md:py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center mb-4 sm:mb-6">
            <FontAwesomeIcon 
              icon={faInstagram} 
              className="text-4xl sm:text-5xl md:text-6xl text-transparent bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 bg-clip-text"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6 text-gray-900 tracking-tight leading-tight">
            Check us out on Instagram!
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mb-6 sm:mb-8">
            Follow us for daily meal inspiration, behind-the-scenes kitchen stories, and special offers!
          </p>
          
          {/* Follow Button */}
          <a
            href="https://www.instagram.com/mynakitchn/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faInstagram} className="text-lg sm:text-xl" />
            <span className="text-sm sm:text-base">Follow @mynakitchn</span>
          </a>
        </div>

        {/* Instagram Posts Horizontal Carousel */}
        <div className="instagram-carousel-container">
          <div className="instagram-carousel">
            {instagramPosts.map((postUrl, index) => (
              <div key={index} className="instagram-card">
                <div className="instagram-card-inner">
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={postUrl}
                    data-instgrm-version="14"
                    style={{
                      background: '#FFF',
                      border: '0',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      margin: '0',
                      maxWidth: '100%',
                      minWidth: '280px',
                      padding: '0',
                      width: 'calc(100% - 2px)'
                    }}
                  >
                    {/* Fallback content while Instagram embed loads */}
                    <div style={{ padding: '40px', textAlign: 'center' }}>
                      <div className="loading-spinner"></div>
                      <p style={{ 
                        color: '#999', 
                        fontSize: '14px', 
                        marginTop: '16px',
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        Loading Instagram post...
                      </p>
                    </div>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;

