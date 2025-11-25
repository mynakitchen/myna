import React from 'react';
import './ProblemStatement.css';

// Parallax Image Section Component
const ParallaxImageSection = () => {
  return (
    <div className="parallax-image-container">
      <div className="parallax-image-wrapper">
        <img 
          src={`${process.env.PUBLIC_URL}/images/myna-kitchen-meals-optimized.webp`}
          alt="Myna Kitchen meal containers showcasing various South Indian dishes"
          className="parallax-image"
          loading="eager"
          decoding="async"
          onError={(e) => {
            // Fallback to a placeholder if image not found
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div 
          className="image-placeholder" 
          style={{ display: 'none' }}
        >
          <div className="placeholder-content">
            <div className="placeholder-icon">🍱</div>
            <h3>Myna Kitchen Meals</h3>
            <p>Delicious meal containers delivered fresh to your doorstep</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop - 80,
      behavior: 'smooth'
    });
  }
};

const DailyMealsIntro = () => {
  return (
    <section id="features" className="solution-section">
      <div className="container mx-auto px-6">
        {/* Unified Header Section */}
        <div className="unified-hero-section">
          {/* Header Section - Reduced spacing */}
          <div className="text-center mb-8">
            <h2 className="hero-title">
              Myna <span className="text-primary">Kitchen</span>
            </h2>
            <h3 className="hero-subtitle">
              Daily Meals Delivered
            </h3>
            <p className="hero-description">
              With us you no longer have to run a kitchen, manage groceries or worry about your daily food.
            </p>
            
            {/* Parallax Image Section */}
            <ParallaxImageSection />
            
            {/* New text addition */}
            <p className="hero-description-sub mt-8 text-lg md:text-xl text-gray-700 font-medium">
              Fresh homely meals delivered to you day by day, meal by meal
            </p>

            {/* Pricing Text and Button - Reduced spacing */}
            <div className="hero-pricing-section mt-6 mb-12">
              <p className="pricing-text text-2xl md:text-3xl font-bold text-primary mb-6 tracking-wide"
                style={{
                  fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                }}>
                Starting at just ₹80 per day
              </p>
              <button 
              onClick={() => scrollToSection('subscription-plans')}
              className="pricing-cta-button">
                View Our Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyMealsIntro;

