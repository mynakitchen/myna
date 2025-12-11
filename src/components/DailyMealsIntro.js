import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoneyBillWave,
  faLocationDot,
  faUtensils,
  faArrowsRotate,
  faBoxOpen,
  faCalendarCheck,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import './ProblemStatement.css';

const featureContent = [
  {
    number: '01',
    title: 'Cancel Anytime With a Full Refund',
    description:
      "Enjoy complete flexibility with Myna Kitchen's meal plans. If your schedule changes, simply cancel your meal at any time and get an instant full refund to your wallet. No extra charges, no complications, just stress-free meal management.",
    icon: faMoneyBillWave,
    iconLabel: 'Instant refund icon',
    accentClass: 'accent-refund'
  },
  {
    number: '02',
    title: 'Change Your Delivery Location Anytime',
    description:
      "Whether you're working from the office, staying at home, or on the move, Myna Kitchen makes meal delivery effortless. Update your delivery location anytime during the day, and we'll ensure your food reaches you wherever you are. Perfect for busy professionals and flexible routines.",
    icon: faLocationDot,
    iconLabel: 'Location pin icon',
    accentClass: 'accent-location'
  },
  {
    number: '03',
    title: 'Customise Your Meals With Add-Ons',
    description:
      'Make your meal truly yours. Myna Kitchen lets you personalise your order with a variety of add-ons, extra portions, sides, and special items. Build a meal that matches your taste, diet preferences, and hunger level with just a tap.',
    icon: faUtensils,
    iconLabel: 'Plated meal icon',
    accentClass: 'accent-customise'
  },
  {
    number: '04',
    title: 'Swap Meals With Any Available Option',
    description:
      'Craving something different today? With Myna Kitchen, you can easily swap your planned meal with any other available dish. Choose what you feel like eating and enjoy full control over your daily menu without any restrictions.',
    icon: faArrowsRotate,
    iconLabel: 'Swap arrows icon',
    accentClass: 'accent-swap'
  },
  {
    number: '05',
    title: 'Order Single Meals Without Subscription',
    description:
      'No commitment needed. Myna Kitchen allows you to order single meals without subscriptions or minimum balance requirements. Ideal for users who want affordable, high-quality meals on demand, whenever hunger strikes.',
    icon: faBoxOpen,
    iconLabel: 'Takeaway meal icon',
    accentClass: 'accent-single'
  },
  {
    number: '06',
    title: 'Add Extra Meals When Guests Drop By',
    description:
      "Friends joining you for lunch or dinner? Quickly add extra chef-made meals to your order so everyone's covered—no advance planning needed.",
    icon: faUsers,
    iconLabel: 'Group dining icon',
    accentClass: 'accent-guests'
  },
  {
    number: '07',
    title: 'Order meals according to your preference',
    description:
      'Plan your day your way. Whether you crave one hearty lunch, a trio of balanced meals, or a steady stream of mini bites, based on your preferences, Myna Kitchen lets you select any meal or combo of meals for the day.',
    icon: faCalendarCheck,
    iconLabel: 'Flexible schedule icon',
    accentClass: 'accent-flexible'
  }
];

const scrollToPlans = () => {
  const section = document.getElementById('subscription-plans');
  if (section) {
    window.scrollTo({
      top: section.offsetTop - 80,
      behavior: 'smooth'
    });
  }
};

const DailyMealsIntro = () => {
  return (
    <section id="features" className="solution-section feature-showcase-section">
      <div className="container mx-auto px-6 py-16">
        <div className="feature-showcase-inner">
          <header className="feature-showcase-header text-center">
            <span className="feature-showcase-kicker">Power up your daily meals</span>
            <h2 className="feature-showcase-title">
              Freedom-first plans that move with your day
            </h2>
            <p className="feature-showcase-description">
              Lean into homely cooking without the hassle. Every Myna Kitchen plan is
              designed to be as flexible and comforting as your favourite home-cooked meal,
              so you can focus on what matters most.
            </p>
          </header>

          <div className="feature-showcase-grid">
            {featureContent.map(
              ({ number, title, description, icon, iconLabel, accentClass }) => (
                <article key={title} className="feature-showcase-card">
                  <div className={`feature-card-accent ${accentClass}`} aria-hidden="true" />
                  <div className="feature-card-header">
                    <span className="feature-number">{number}</span>
                    <span className="feature-icon-wrapper" role="img" aria-label={iconLabel}>
                      <FontAwesomeIcon icon={icon} size="2x" title={iconLabel} />
                    </span>
                  </div>
                  <div className="feature-card-body">
                    <h3 className="feature-showcase-card-title">{title}</h3>
                    <p className="feature-showcase-card-description">{description}</p>
                  </div>
                </article>
              )
            )}
          </div>

          <div className="feature-showcase-cta">
            <button
              type="button"
              className="pricing-cta-button"
              onClick={scrollToPlans}
            >
              See Pricing & Plans
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyMealsIntro;