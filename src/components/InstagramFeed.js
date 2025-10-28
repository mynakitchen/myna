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
    <section id="instagram-feed" className="section-fade py-8 sm:py-12 md:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="instagram-main-heading">
            Check us out on Instagram
          </h2>
          <p className="instagram-description">
            Follow us for daily meal inspiration, behind-the-scenes kitchen stories, and special offers!
          </p>
          
          {/* Follow Button */}
          <a
            href="https://www.instagram.com/mynakitchn/"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-follow-button"
          >
            <FontAwesomeIcon icon={faInstagram} className="instagram-button-icon" />
            <span>Follow @mynakitchn</span>
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

