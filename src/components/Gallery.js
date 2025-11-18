import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
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
    const imageList = Array.isArray(item.images) ? item.images : [];
    const galleryImage = item.gallery?.image ? toPublicPath(item.gallery.image) : null;
    const processedImages = imageList
      .map((image) => toPublicPath(image))
      .filter(Boolean);

    const dedupedImages = Array.from(new Set([galleryImage, ...processedImages].filter(Boolean)));
    const primaryImage = dedupedImages[0] || FALLBACK_IMAGE;

    const imagePath = item.gallery?.image || (item.images && item.images[0]) || null;
    const imageSrc = imagePath ? toPublicPath(imagePath) : primaryImage;

    return {
      id: item.id,
      slug: item.slug,
      title: item.gallery?.title || item.name,
      description: item.gallery?.description || item.description,
      category: item.category,
      imageSrc,
      fallbackSrc: FALLBACK_IMAGE,
      isNew: Boolean(item.isNew),
      order: index,
      images: dedupedImages.length > 0 ? dedupedImages : [primaryImage]
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
            <GalleryItemCard key={item.id || item.slug || item.title} item={item} />
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


function GalleryItemCard({ item }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const images = useMemo(() => {
    if (Array.isArray(item.images) && item.images.length > 0) {
      return item.images;
    }

    return item.imageSrc ? [item.imageSrc] : [FALLBACK_IMAGE];
  }, [item.images, item.imageSrc]);

  const hasMultipleImages = images.length > 1;
  const safeIndex = Math.max(0, Math.min(currentImageIndex, images.length - 1));
  const currentImageSrc = images[safeIndex];

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [images]);

  useEffect(() => {
    setImageLoading(true);
  }, [safeIndex, images]);

  useEffect(() => {
    if (!hasMultipleImages) return;
    const preloadImage = (index) => {
      if (index < 0 || index >= images.length) return;
      const img = new Image();
      img.src = images[index];
    };

    const nextIndex = (safeIndex + 1) % images.length;
    const prevIndex = safeIndex - 1 < 0 ? images.length - 1 : safeIndex - 1;

    preloadImage(nextIndex);
    preloadImage(prevIndex);
  }, [hasMultipleImages, images, safeIndex]);

  const nextImage = () => {
    if (!hasMultipleImages) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (!hasMultipleImages) return;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    if (!hasMultipleImages || index < 0 || index >= images.length) return;
    setCurrentImageIndex(index);
  };

  const handleTouchStart = (event) => {
    if (!hasMultipleImages) return;
    const touch = event.touches[0];
    setStartX(touch.clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (event) => {
    if (!isDragging) return;
    event.preventDefault();
  };

  const handleTouchEnd = (event) => {
    if (!isDragging) return;

    const touch = event.changedTouches[0];
    const diffX = startX - touch.clientX;
    const minSwipeDistance = 40;

    if (Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }

    setIsDragging(false);
  };

  const handleImageLoadInternal = (event) => {
    handleImageLoad(event);
    setImageLoading(false);
  };

  const handleImageErrorInternal = (event) => {
    const target = event?.target;
    const alreadyApplied = target?.dataset?.fallbackApplied === 'true';
    handleImageError(event, FALLBACK_IMAGE);
    if (alreadyApplied) {
      setImageLoading(false);
    }
  };

  return (
    <motion.figure
      className="gallery-card"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div
        className="gallery-card__image-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {item.isNew && (
          <span className="gallery-card__badge">New</span>
        )}

        {hasMultipleImages && (
          <span className="gallery-card__count">
            {safeIndex + 1}/{images.length}
          </span>
        )}

        {imageLoading && (
          <div className="gallery-card__spinner">
            <span className="gallery-card__spinner-dot" />
          </div>
        )}

        <img
          key={`${item.id}-${safeIndex}`}
          src={currentImageSrc}
          alt={`${item.title} - ${safeIndex + 1}`}
          loading="lazy"
          onLoad={handleImageLoadInternal}
          onError={handleImageErrorInternal}
          className={`gallery-card__image ${imageLoading ? '' : 'loaded'}`}
        />

        {hasMultipleImages && (
          <>
            <button
              type="button"
              className={`gallery-card__nav-button gallery-card__nav-button--prev ${isHovered ? 'is-visible' : ''}`}
              onClick={prevImage}
              aria-label="Previous image"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              type="button"
              className={`gallery-card__nav-button gallery-card__nav-button--next ${isHovered ? 'is-visible' : ''}`}
              onClick={nextImage}
              aria-label="Next image"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
            <div className="gallery-card__dots">
              {images.map((_, index) => (
                <button
                  key={`${item.id}-${index}`}
                  type="button"
                  className={`gallery-card__dot ${index === safeIndex ? 'gallery-card__dot--active' : ''}`}
                  onClick={() => goToImage(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <figcaption className="gallery-card__content">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </figcaption>
    </motion.figure>
  );
}
