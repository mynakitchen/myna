import React from 'react';
import { motion } from 'framer-motion';
import './Blog.css';

const PUBLIC_URL = process.env.PUBLIC_URL || '';

const blogPosts = [
  {
    slug: 'seasonal-menu-planning',
    title: 'How We Plan Seasonal Menus',
    description:
      'Explore how our chefs collaborate with local farmers to design balanced menus that celebrate seasonal produce while keeping weekday cooking effortless.',
    date: 'October 2025',
    readTime: '4 min read',
    category: 'Behind the Scenes',
    image: `${PUBLIC_URL}/images/hero/1208_x_1080_photos__28_.jpg`
  },
  {
    slug: 'customer-favorites',
    title: '5 Customer Favourites for Busy Workweeks',
    description:
      'From hearty dals to protein-packed bowls, discover the dishes Myna subscribers reorder the most—and the tweaks we offer to suit every palate.',
    date: 'September 2025',
    readTime: '3 min read',
    category: 'Top Picks',
    image: `${PUBLIC_URL}/images/hero/70bdb087c527b5287b5836552d155406.jpg`
  },
  {
    slug: 'sustainability-at-myna',
    title: 'Sustainability at Myna Kitchen',
    description:
      'A look at the packaging swaps, delivery optimisations, and sourcing choices that help us serve great food with a lighter footprint.',
    date: 'August 2025',
    readTime: '5 min read',
    category: 'Sustainability',
    image: `${PUBLIC_URL}/images/hero/cdf63c34f8768539fb1d30f133f585dd.jpg`
  },
  {
    slug: 'nutrition-philosophy',
    title: 'Our Nutrition Philosophy',
    description:
      'Learn how we balance comfort, nostalgia, and nutrition so weekday meals feel indulgent yet energising—and why we believe in mindful portions.',
    date: 'July 2025',
    readTime: '6 min read',
    category: 'Wellness',
    image: `${PUBLIC_URL}/images/hero/7217fa5a7fd8cf607f27dd8af2dd6131.jpg`
  }
];

const Blog = () => {
  const [featuredPost, ...latestPosts] = blogPosts;

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
          className="rounded-3xl overflow-hidden shadow-lg bg-white mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="blog-featured__image-wrapper">
              <img
                src={featuredPost.image}
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
                className="rounded-2xl border border-orange-100 bg-white shadow-sm hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
                  <img
                    src={post.image}
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
                    <button
                      type="button"
                      className="text-amber-600 font-medium hover:text-amber-700 transition-colors"
                    >
                      Coming soon
                    </button>
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

