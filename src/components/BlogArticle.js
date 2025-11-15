import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import blogPosts, { getBlogPostBySlug } from '../data/blogPosts';
import './BlogArticle.css';

const BlogArticle = ({ slug }) => {
  const article = useMemo(() => {
    if (!slug) {
      return null;
    }
    return getBlogPostBySlug(slug);
  }, [slug]);

  const resolvedArticle = article || null;

  const relatedPosts = useMemo(() => {
    if (!resolvedArticle) {
      return [];
    }
    return blogPosts.filter((post) => post.slug !== resolvedArticle.slug).slice(0, 3);
  }, [resolvedArticle]);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  if (!resolvedArticle) {
    return (
      <section className="blog-article section-fade pt-28 pb-16 bg-gradient-to-b from-orange-50 via-white to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">Story not found</h1>
          <p className="text-gray-600 mb-8">
            The article you&apos;re looking for has moved or no longer exists. Explore the latest posts on
            our blog.
          </p>
          <button
            type="button"
            className="blog-article__primary-button"
            onClick={() => navigateTo('/blog')}
          >
            Back to blog
          </button>
        </div>
      </section>
    );
  }

  return (
    <article className="blog-article section-fade">
      <header className="blog-article__hero">
        <div className="blog-article__hero-image">
          <img
            src={resolvedArticle.heroImage}
            alt={resolvedArticle.title}
            loading="lazy"
            className="blog-article__hero-img loaded"
          />
        </div>
        <div className="blog-article__hero-content">
          <motion.span
            className="blog-article__hero-tag"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {resolvedArticle.category}
          </motion.span>
          <motion.h1
            className="blog-article__hero-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {resolvedArticle.title}
          </motion.h1>
          <motion.div
            className="blog-article__hero-meta"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <span>{resolvedArticle.date}</span>
            <span className="mx-3 text-gray-300">•</span>
            <span>{resolvedArticle.readTime}</span>
          </motion.div>
          <motion.p
            className="blog-article__hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            {resolvedArticle.description}
          </motion.p>
          <div className="blog-article__hero-actions">
            <button
              type="button"
              className="blog-article__primary-button"
              onClick={() => navigateTo('/blog')}
            >
              Back to blog
            </button>
            <button
              type="button"
              className="blog-article__secondary-button"
              onClick={() => window.open('https://app.mynakitchen.in/signup', '_blank')}
            >
              Subscribe to meals
            </button>
          </div>
        </div>
      </header>

      <div className="blog-article__body">
        {resolvedArticle.sections.map((section, index) => (
          <motion.section
            key={section.heading}
            className="blog-article__section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
          >
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </motion.section>
        ))}

        {resolvedArticle.takeaway && resolvedArticle.takeaway.length > 0 && (
          <motion.section
            className="blog-article__takeaways"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
          >
            <h3>Key takeaways</h3>
            <ul>
              {resolvedArticle.takeaway.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.section>
        )}
      </div>

      {relatedPosts.length > 0 && (
        <section className="blog-article__related">
          <div className="blog-article__related-header">
            <h3>More stories from the kitchen</h3>
            <button
              type="button"
              className="blog-article__link-button"
              onClick={() => navigateTo('/blog')}
            >
              View all posts
            </button>
          </div>
          <div className="blog-article__related-grid">
            {relatedPosts.map((post) => (
              <article
                key={post.slug}
                className="blog-article__related-card"
                onClick={() => navigateTo(`/blog/${post.slug}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    navigateTo(`/blog/${post.slug}`);
                  }
                }}
              >
                <div className="blog-article__related-image">
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    loading="lazy"
                    className="blog-article__related-img loaded"
                  />
                </div>
                <div className="blog-article__related-content">
                  <span className="blog-article__related-meta">
                    {post.category} • {post.date}
                  </span>
                  <h4>{post.title}</h4>
                  <p>{post.description}</p>
                  <span className="blog-article__related-read">Read story</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default BlogArticle;

