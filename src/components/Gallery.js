import React, { useState } from 'react';
import { motion } from 'framer-motion';
import menuData from '../data/generatedMenuGallery.json';
import './Gallery.css';

const PUBLIC_URL = process.env.PUBLIC_URL || '';
const FALLBACK_IMAGE = `${PUBLIC_URL}/images/branding/myna-kitchen-meals.webp`;

const toPublicPath = (relativePath) => {
  if (!relativePath) {
    return FALLBACK_IMAGE;
  }

  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  return `${PUBLIC_URL}/${encodeURI(cleanPath).replace(/\+/g, '%2B')}`;
};

const galleryItems = (menuData.items || [])
  .filter((item) => item.showInGallery)
  .map((item, index) => {
    const imagePath = item.gallery?.image || (item.images && item.images[0]) || null;
    const imageSrc = imagePath ? toPublicPath(imagePath) : FALLBACK_IMAGE;

    return {
      id: item.id,
      slug: item.slug,
      title: item.gallery?.title || item.name,
      description: item.gallery?.description || item.description,
      category: item.category,
      imageSrc,
      fallbackSrc: FALLBACK_IMAGE,
      isNew: Boolean(item.isNew),
      order: index
    };
  })
  .sort((a, b) => {
    if (a.isNew !== b.isNew) {
      return a.isNew ? -1 : 1;
    }
    return a.order - b.order;
  })
  .map(({ order, ...rest }) => rest);

const GALLERY_CATEGORIES = (menuData.categories && menuData.categories.length > 0)
  ? menuData.categories
  : ['Day Starters', 'Super Meals', 'Comfort Meals', 'Add-ons'];

const handleImageLoad = (event) => {
  const target = event?.target;

  if (!target) {
    return;
  }

  target.classList.add('loaded');
};

const handleImageError = (event, fallbackSrc = FALLBACK_IMAGE) => {
  const target = event?.target;

  if (!target || target.dataset.fallbackApplied === 'true') {
    return;
  }

  target.dataset.fallbackApplied = 'true';
  target.removeAttribute('srcset');
  target.removeAttribute('sizes');
  target.src = fallbackSrc;
};

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter gallery items based on selected category
  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section className="gallery-section section-fade" id="gallery">
      <div className="gallery-hero">
        <motion.div
          className="gallery-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="gallery-tag">Inside Our Kitchen</span>
          <h1 className="gallery-title">A taste of Myna&apos;s everyday plates</h1>
          <p className="gallery-subtitle">
            From wholesome weekday favourites to celebratory weekend specials, every dish is crafted
            fresh each morning. Explore some of the meals customers can’t stop talking about.
          </p>
        </motion.div>
      </div>

      <div className="gallery-container">
        {/* Gallery Category Toolbar */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1.5 rounded-full shadow-sm flex flex-col md:flex-row gap-1.5 md:gap-0">
            {/* All button - full width on mobile, inline on desktop */}
            <div className="flex justify-center w-full md:w-auto md:flex-shrink-0">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-6 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-200 ${
                  selectedCategory === 'All'
                    ? 'bg-white shadow-md text-gray-900 transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                All
              </button>
            </div>

            {/* Other category buttons */}
            <div className="flex flex-wrap justify-center gap-1.5 md:gap-0 md:flex-1">
              {GALLERY_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-white shadow-md text-gray-900 transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="gallery-grid">
          {filteredItems.map((item) => (
            <motion.figure
              key={item.id || item.slug || item.title}
              className="gallery-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <div className="gallery-card__image-wrapper">
                {item.isNew && (
                  <span className="gallery-card__badge">New</span>
                )}
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  loading="lazy"
                  onLoad={handleImageLoad}
                  onError={(event) => handleImageError(event, FALLBACK_IMAGE)}
                />
              </div>
              <figcaption className="gallery-card__content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="gallery-cta">
          <motion.div
            className="gallery-cta__card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <h2>Want these on your weekly menu?</h2>
            <p>
              Customise your plan, switch meals anytime, and count on timely delivery right to your
              doorstep.
            </p>
            <div className="gallery-cta__actions">
              <button
                type="button"
                onClick={() => window.open('https://app.mynakitchen.in/signup', '_blank')}
              >
                Subscribe Now
              </button>
              <button
                type="button"
                onClick={() => window.open('https://app.mynakitchen.in', '_blank')}
                className="gallery-cta__secondary"
              >
                Explore Plans
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

