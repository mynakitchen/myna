import React from 'react';
import { motion } from 'framer-motion';
import './Gallery.css';

const PUBLIC_URL = process.env.PUBLIC_URL || '';
const FALLBACK_IMAGE = `${PUBLIC_URL}/images/myna-kitchen-meals.jpg`;

const rawGalleryItems = [
  {
    slug: '1208_x_1080_photos__28_',
    fallback: 'images/hero/1208_x_1080_photos__28_.jpg',
    title: 'Seasonal Veg Spread',
    description: 'Vibrant, locally sourced produce plated for weekday lunches.'
  },
  {
    slug: '70bdb087c527b5287b5836552d155406',
    fallback: 'images/hero/70bdb087c527b5287b5836552d155406.jpg',
    title: 'Comfort Meal Box',
    description: 'All-time favourite dal, roti, and sabzi with chef specials.'
  },
  {
    slug: '7217fa5a7fd8cf607f27dd8af2dd6131',
    fallback: 'images/hero/7217fa5a7fd8cf607f27dd8af2dd6131.jpg',
    title: 'Protein Power Bowl',
    description: 'Balanced portions with high-protein mains and seasonal greens.'
  },
  {
    slug: '81c67453e037b7fff40ee260956ddd2a',
    fallback: 'images/hero/81c67453e037b7fff40ee260956ddd2a.jpg',
    title: 'Tiffin Morning Combo',
    description: 'South Indian classics delivered fresh with signature chutneys.'
  },
  {
    slug: 'cdf63c34f8768539fb1d30f133f585dd',
    fallback: 'images/hero/cdf63c34f8768539fb1d30f133f585dd.jpg',
    title: 'Chef’s Dinner Curation',
    description: 'Slow-cooked mains paired with hearty sides for indulgent nights.'
  },
  {
    slug: 'jackfruit-biriyani-babychillicorn-adaprathaman',
    fallback: 'images/hero/jackfruit biriyani+babychillicorn+adaprathaman.jpg',
    title: 'Jackfruit Biryani Feast',
    description: 'A plant-based hero served with sides inspired by Tamil kitchens.'
  },
  {
    slug: 'rice-fishcurry-keeraiporiyal-fishfry',
    fallback: 'images/hero/rice+fishcurry+keeraiporiyal+fishfry.jpg',
    title: 'Coastal Catch Platter',
    description: 'Fresh fish curry with poriyal, double-fried fillets, and steamed rice.'
  },
  {
    slug: 'Mango-Milkshake',
    fallback: 'images/hero/Mango Milkshake.jpg',
    title: 'Mango Bliss Shake',
    description: 'Sun-ripened mangoes churned into our house-favourite cooler.'
  },
  {
    slug: 'garliccurry-rice-beanspodimas-papadam',
    fallback: 'images/hero/garliccurry rice+beanspodimas+papadam.jpg',
    title: 'Garlic Curry Meal',
    description: 'Hearty garlic curry, beans podimas, and crisp papad for texture.'
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
        <div className="gallery-grid">
          {galleryItems.map((item) => (
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

