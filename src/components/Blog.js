import React from 'react';
import { motion } from 'framer-motion';
import './Blog.css';
import blogPosts from '../data/blogPosts';

const Blog = () => {
  const [featuredPost, ...latestPosts] = blogPosts.length > 0 ? blogPosts : [];

  if (!featuredPost) {
    return null;
  }

  const navigateToArticle = (slug) => {
    window.history.pushState({}, '', `/blog/${slug}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section className="blog-page section-fade pt-28 pb-16 bg-gradient-to-b from-orange-50 via-white to-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <header className="text-center mb-16">
          <motion.span
            className="inline-block text-xs tracking-[0.3em] uppercase text-amber-500 mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Insights from the kitchen
          </motion.span>
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            The Myna Kitchen Blog
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            Stories, tips, and behind-the-scenes notes from the team that brings your weekday
            comfort food to life. Grab a cup of chai and explore what&apos;s cooking.
          </motion.p>
        </header>

        <motion.article
          className="rounded-3xl overflow-hidden shadow-lg bg-white mb-20 blog-featured-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          onClick={() => navigateToArticle(featuredPost.slug)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              navigateToArticle(featuredPost.slug);
            }
          }}
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="blog-featured__image-wrapper">
              <img
                src={featuredPost.heroImage}
                alt={featuredPost.title}
                className="blog-featured__image loaded"
                loading="lazy"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center text-sm text-amber-600 font-medium uppercase tracking-wide mb-3">
                <span>{featuredPost.category}</span>
                <span className="mx-3 text-amber-200">•</span>
                <span>{featuredPost.date}</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 leading-snug">
                {featuredPost.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">{featuredPost.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>{featuredPost.readTime}</span>
                <span className="mx-3 text-gray-300">•</span>
                <span className="text-amber-600 font-medium">Read story</span>
              </div>
            </div>
          </div>
        </motion.article>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Latest posts</h3>
            <span className="text-sm text-gray-500">Updated every month</span>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {latestPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                className="rounded-2xl border border-orange-100 bg-white shadow-sm hover:shadow-lg transition-shadow blog-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => navigateToArticle(post.slug)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    navigateToArticle(post.slug);
                  }
                }}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    className="blog-card__image loaded"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-xs uppercase tracking-wide text-amber-600 mb-3">
                    <span>{post.category}</span>
                    <span className="mx-2 text-amber-200">•</span>
                    <span>{post.date}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{post.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.readTime}</span>
                    <span className="text-amber-600 font-medium">Read story</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <div className="blog-cta">
          <motion.div
            className="blog-cta__card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Get the blog delivered monthly</h3>
            <p>
              Sign up for Myna updates and receive new stories, menu highlights, and kitchen tips
              directly in your inbox.
            </p>
            <div className="blog-cta__subscription">
              <input
                type="email"
                placeholder="you@example.com"
                disabled
              />
              <button type="button" disabled>
                Newsletter coming soon
              </button>
            </div>
            <p className="blog-cta__note">
              We&apos;re putting the finishing touches on our newsletter experience.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Blog;

