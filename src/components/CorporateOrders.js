import React from 'react';
import './CorporateOrders.css';

const CorporateOrders = () => {
  const handleCorporateOrderClick = () => {
    if (window.location.pathname === '/corporate-orders') {
      const formEl = document.getElementById('corpForm');
      if (formEl) {
        const y = formEl.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
        return;
      }
    }
    window.history.pushState(null, '', '/corporate-orders');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section id="corporate-orders" className="section-fade corporate-orders-section">
      <div className="container">
        <div className="content-wrapper">
          <div className="text-content">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brown-900 mb-6">Corporate & Bulk Orders</h2>
            <p className="section-subtitle">
              Feeding your team made simple and delicious
            </p>
            
            <div className="description">
              <p>
                Whether you're planning office meals, team events, or need regular bulk meal subscriptions, 
                we've got you covered. Our corporate meal solutions are designed to keep your team well-fed 
                and productive with freshly prepared, nutritious meals.
              </p>
              
              {/* Features grid for mobile - hidden on desktop */}
              <div className="mobile-features-grid">
                <div className="feature-item">
                  <div className="feature-icon">🍱</div>
                  <div>
                    <h3>Bulk Subscription Plans</h3>
                    <p>Regular meal deliveries for your entire team</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">🎯</div>
                  <div>
                    <h3>One-time Event Orders</h3>
                    <p>Perfect for meetings, conferences, and special events</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">⚡</div>
                  <div>
                    <h3>Flexible Partnerships</h3>
                    <p>Customized solutions that fit your company's needs</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">📍</div>
                  <div>
                    <h3>Reliable Delivery</h3>
                    <p>On-time delivery to your office or event location</p>
                  </div>
                </div>
              </div>
              
              <p className="cta-text">
                Ready to feed your team? Let us know your requirements and we'll create 
                a customized meal plan that fits your budget and preferences.
              </p>
            </div>
            
            <button 
              className="cta-button"
              onClick={handleCorporateOrderClick}
            >
              Get Corporate Quote
              <span className="arrow">→</span>
            </button>
          </div>
          
          <div className="features-content">
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">🍱</div>
                <div>
                  <h3>Bulk Subscription Plans</h3>
                  <p>Regular meal deliveries for your entire team</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">🎯</div>
                <div>
                  <h3>One-time Event Orders</h3>
                  <p>Perfect for meetings, conferences, and special events</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <div>
                  <h3>Flexible Partnerships</h3>
                  <p>Customized solutions that fit your company's needs</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">📍</div>
                <div>
                  <h3>Reliable Delivery</h3>
                  <p>On-time delivery to your office or event location</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateOrders;