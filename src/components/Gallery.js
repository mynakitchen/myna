import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Gallery.css';

const PUBLIC_URL = process.env.PUBLIC_URL || '';
const FALLBACK_IMAGE = `${PUBLIC_URL}/images/branding/myna-kitchen-meals.webp`;

const rawGalleryItems = [
  {
    slug: '1208_x_1080_photos__28_',
    fallback: 'images/gallery/seasonal-veg-spread.webp',
    title: 'Seasonal Veg Spread',
    description: 'Vibrant, locally sourced produce plated for weekday lunches.',
    category: 'Comfort Meals'
  },
  {
    slug: '70bdb087c527b5287b5836552d155406',
    fallback: 'images/gallery/comfort-meal-box.webp',
    title: 'Comfort Meal Box',
    description: 'All-time favourite dal, roti, and sabzi with chef specials.',
    category: 'Comfort Meals'
  },
  {
    slug: '7217fa5a7fd8cf607f27dd8af2dd6131',
    fallback: 'images/gallery/protein-power-bowl.webp',
    title: 'Protein Power Bowl',
    description: 'Balanced portions with high-protein mains and seasonal greens.',
    category: 'Super Meals'
  },
  {
    slug: '81c67453e037b7fff40ee260956ddd2a',
    fallback: 'images/gallery/tiffin-morning-combo.webp',
    title: 'Tiffin Morning Combo',
    description: 'South Indian classics delivered fresh with signature chutneys.',
    category: 'Day Starters'
  },
  {
    slug: 'cdf63c34f8768539fb1d30f133f585dd',
    fallback: 'images/gallery/chefs-dinner-curation.webp',
    title: 'Chef’s Dinner Curation',
    description: 'Slow-cooked mains paired with hearty sides for indulgent nights.',
    category: 'Super Meals'
  },
  {
    slug: 'jackfruit-biriyani-babychillicorn-adaprathaman',
    fallback: 'images/gallery/jackfruit-biryani-feast.webp',
    title: 'Jackfruit Biryani Feast',
    description: 'A plant-based hero served with sides inspired by Tamil kitchens.',
    category: 'Super Meals'
  },
  {
    slug: 'rice-fishcurry-keeraiporiyal-fishfry',
    fallback: 'images/gallery/coastal-catch-platter.webp',
    title: 'Coastal Catch Platter',
    description: 'Fresh fish curry with poriyal, double-fried fillets, and steamed rice.',
    category: 'Super Meals'
  },
  {
    slug: 'Mango-Milkshake',
    fallback: 'images/gallery/mango-bliss-shake.webp',
    title: 'Mango Bliss Shake',
    description: 'Sun-ripened mangoes churned into our house-favourite cooler.',
    category: 'Add-ons'
  },
  {
    slug: 'garliccurry-rice-beanspodimas-papadam',
    fallback: 'images/gallery/garlic-curry-meal.webp',
    title: 'Garlic Curry Meal',
    description: 'Hearty garlic curry, beans podimas, and crisp papad for texture.',
    category: 'Comfort Meals'
  }
];

const toPublicPath = (relativePath) =>
  `${PUBLIC_URL}/${encodeURI(relativePath).replace(/\+/g, '%2B')}`;

const galleryItems = rawGalleryItems.map(({ fallback, ...rest }) => {
  const normalizedFallback = fallback
    ? toPublicPath(fallback)
    : FALLBACK_IMAGE;

  return {
    ...rest,
    imageSrc: normalizedFallback,
    fallbackSrc: normalizedFallback
  };
});

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
              {['Day Starters', 'Super Meals', 'Comfort Meals', 'Add-ons'].map((category) => (
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
              key={item.title}
              className="gallery-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <div className="gallery-card__image-wrapper">
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

