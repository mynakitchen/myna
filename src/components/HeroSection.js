import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';

const heroStats = [
  {
    value: '91%',
    label: 'feel healthier with Myna Kitchen'
  },
  {
    value: '93%',
    label: 'feel less stressed at dinner time'
  },
  {
    value: '98%',
    label: 'save time on meals every week'
  }
];

const heroHighlights = [
  {
    title: 'Chef-crafted menus',
    description: 'Seasonal, home-styled recipes curated by our culinary team.'
  },
  {
    title: 'Flexible subscriptions',
    description: 'Skip, pause, or cancel anytime directly from your dashboard.'
  },
  {
    title: 'Doorstep delivery',
    description: 'Fresh ingredients and ready-to-eat meals delivered daily.'
  }
];

const HeroSection = () => {
  const [imageError, setImageError] = useState(false);

  const heroImage = imageError
    ? 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80'
    : `${process.env.PUBLIC_URL}/images/myna-kitchen-meals.jpg`;

  const handleImageError = () => {
    setImageError(true);
  };

  const navigateToBrowsePlans = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/browse-plans');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

      return (
    <section id="hero" className="hero-section">
      <div className="hero-bg hero-bg--primary" />
      <div className="hero-bg hero-bg--accent" />
      <div className="hero-container">
        <div className="hero-grid">
        <motion.div
            className="hero-column hero-column--content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
        <motion.div 
              className="hero-badge"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="hero-badge__label">NEW</span>
              <span className="hero-badge__content">✓ 2x Healthier Recipes</span>
        </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              FOOD SORTED LIFE SORTED
            </motion.h1>

            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
            >
              Flexible plans. Free Home and Office Delivery.
            </motion.p>

        <motion.div 
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
                <button
                type="button"
                className="hero-cta"
                onClick={navigateToBrowsePlans}
                >
                  See Pricing & Plans
                </button>
              <span className="hero-guarantee">No hidden fees • Pause anytime</span>
            </motion.div>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              {heroStats.map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <span className="hero-stat__value">{stat.value}</span>
                  <span className="hero-stat__label">{stat.label}</span>
          </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-column hero-column--media"
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          >
            <div className="hero-image">
              <div className="hero-image__glow" />
              <img
                src={heroImage}
                alt="Assorted freshly prepared Myna Kitchen meals"
                onError={handleImageError}
              />
              <motion.div
                className="hero-floating-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <span className="hero-floating-card__title">Fresh to your doorstep</span>
                <span className="hero-floating-card__desc">Choose from 100+ rotating recipes every week.</span>
              </motion.div>
              </div>
          </motion.div>
              </div>

        <motion.div
          className="hero-highlights"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          {heroHighlights.map((feature) => (
            <div key={feature.title} className="hero-highlight-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              </div>
                ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 