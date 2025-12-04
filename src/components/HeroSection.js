import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './HeroSection.css';
import imageMapping from '../image-mapping.json';

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

const FALLBACK_HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80',
  alt: 'Assorted freshly prepared Myna Kitchen meals'
};

const HeroSection = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [useFallbackImage, setUseFallbackImage] = useState(false);

  const optimizedImages = useMemo(() => {
    return imageMapping.map((img) => {
      const altText = img.originalBaseName
        .replace(/[+_-]/g, ' ')
        .replace(/(\d{4}_x_\d{4}_photos__\d+_)/gi, 'Delicious South Indian Meal')
        .replace(/(\.webp|\.jpg|\.jpeg|\.png)/gi, '')
        .replace(/\s+/g, ' ')
        .trim();

      return {
        desktop: `${process.env.PUBLIC_URL}/images/hero-optimized/${img.baseName}-desktop.webp`,
        tablet: `${process.env.PUBLIC_URL}/images/hero-optimized/${img.baseName}-tablet.webp`,
        mobile: `${process.env.PUBLIC_URL}/images/hero-optimized/${img.baseName}-mobile.webp`,
        altText: altText || 'Fresh home cooked meal'
      };
    });
  }, []);

  const heroImageSources = optimizedImages;
  const totalImages = heroImageSources.length;

  const currentImage =
    !useFallbackImage && totalImages > 0
      ? heroImageSources[activeImageIndex % totalImages]
      : null;

  useEffect(() => {
    if (useFallbackImage || totalImages <= 1) {
      return undefined;
    }

    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, 6000);

    return () => clearInterval(interval);
  }, [useFallbackImage, totalImages]);

  const handleImageError = () => {
    setUseFallbackImage(true);
  };

  const isCarouselActive = !useFallbackImage && totalImages > 1;

  const showPreviousImage = () => {
    if (!isCarouselActive) {
      return;
    }

    setActiveImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  const showNextImage = () => {
    if (!isCarouselActive) {
      return;
    }

    setActiveImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const navigateToSubscribeNow = () => {
    window.open('https://app.mynakitchen.in/signup', '_blank');
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
              <span className="hero-badge__content">✓ Bimonthly plans</span>
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
                onClick={navigateToSubscribeNow}
              >
                Subscribe Now
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
              <AnimatePresence mode="wait">
                <motion.picture
                  key={currentImage ? currentImage.desktop : FALLBACK_HERO_IMAGE.src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {currentImage && (
                    <>
                      <source
                        media="(max-width: 480px)"
                        srcSet={currentImage.mobile}
                        type="image/webp"
                      />
                      <source
                        media="(max-width: 768px)"
                        srcSet={currentImage.tablet}
                        type="image/webp"
                      />
                      <source
                        media="(min-width: 769px)"
                        srcSet={currentImage.desktop}
                        type="image/webp"
                      />
                    </>
                  )}
                  <img
                    src={currentImage ? currentImage.desktop : FALLBACK_HERO_IMAGE.src}
                    alt={currentImage ? currentImage.altText : FALLBACK_HERO_IMAGE.alt}
                    onError={handleImageError}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="eager"
                  />
                </motion.picture>
              </AnimatePresence>
              <motion.div
                className="hero-floating-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <span className="hero-floating-card__title">Fresh to your doorstep</span>
                <span className="hero-floating-card__desc">
                  Choose from 100+ rotating recipes every week.
                </span>
              </motion.div>
            </div>
            {isCarouselActive && (
              <div className="hero-carousel-controls">
                <button
                  type="button"
                  className="hero-carousel-button hero-carousel-button--prev"
                  onClick={showPreviousImage}
                  aria-label="View previous meal"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="hero-carousel-button hero-carousel-button--next"
                  onClick={showNextImage}
                  aria-label="View next meal"
                >
                  ›
                </button>
              </div>
            )}
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