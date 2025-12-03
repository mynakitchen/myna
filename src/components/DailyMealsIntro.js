import React from 'react';
import './ProblemStatement.css';

const featureContent = [
  {
    number: '1.',
    title: 'Cancel Anytime With a Full Refund',
    description:
      "Enjoy complete flexibility with Myna Kitchen's meal plans. If your schedule changes, simply cancel your meal at any time and get an instant full refund to your wallet. No extra charges, no complications, just stress-free meal management."
  },
  {
    number: '2.',
    title: 'Change Your Delivery Location Anytime',
    description:
      "Whether you're working from the office, staying at home, or on the move, Myna Kitchen makes meal delivery effortless. Update your delivery location anytime during the day, and we'll ensure your food reaches you wherever you are. Perfect for busy professionals and flexible routines."
  },
  {
    number: '3.',
    title: 'Customise Your Meals With Add-Ons',
    description:
      'Make your meal truly yours. Myna Kitchen lets you personalise your order with a variety of add-ons, extra portions, sides, and special items. Build a meal that matches your taste, diet preferences, and hunger level with just a tap.'
  },
  {
    number: '4.',
    title: 'Swap Meals With Any Available Option',
    description:
      'Craving something different today? With Myna Kitchen, you can easily swap your planned meal with any other available dish. Choose what you feel like eating and enjoy full control over your daily menu without any restrictions.'
  },
  {
    number: '5.',
    title: 'Order Single Meals Without Subscription',
    description:
      'No commitment needed. Myna Kitchen allows you to order single meals without subscriptions or minimum balance requirements. Ideal for users who want affordable, high-quality meals on demand, whenever hunger strikes.'
  },
  {
    number: '6.',
    title: 'Order meals according to your preference',
    description: 'How many ever meals you want in a day, we can allow'
  }
];

const DailyMealsIntro = () => {
  return (
    <section id="features" className="solution-section">
      <div className="container mx-auto px-6 py-16">
        <div className="feature-copy max-w-3xl mx-auto space-y-10 text-left">
          {featureContent.map(({ number, title, description }) => (
            <article key={title} className="feature-item space-y-3">
              <h3 className="feature-title flex items-baseline gap-2 text-2xl font-semibold text-gray-900">
                <span className="text-primary font-bold">{number}</span>
                <span>{title}</span>
              </h3>
              <p className="feature-description text-base md:text-lg text-gray-700 leading-relaxed">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyMealsIntro;

