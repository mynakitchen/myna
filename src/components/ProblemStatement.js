import React from 'react';
import './ProblemStatement.css';

// Professional SVG Icons
const ClockIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="20" stroke="#D08C60" strokeWidth="3" fill="none"/>
    <path d="M24 12V24L32 28" stroke="#D08C60" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BurgerIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 18C8 14 12 10 24 10C36 10 40 14 40 18H8Z" fill="#997B66"/>
    <rect x="6" y="20" width="36" height="4" fill="#D08C60" rx="1"/>
    <rect x="6" y="26" width="36" height="4" fill="#10b981" rx="1"/>
    <path d="M6 32H42C42 36 38 40 24 40C10 40 6 36 6 32Z" fill="#825F45"/>
  </svg>
);

const MoneyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="14" width="32" height="20" rx="3" stroke="#825F45" strokeWidth="3" fill="none"/>
    <text x="24" y="30" fontSize="18" fontWeight="bold" fill="#825F45" textAnchor="middle">₹</text>
    <circle cx="24" cy="24" r="6" stroke="#D08C60" strokeWidth="2" fill="none"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 8L8 20V40H18V28H30V40H40V20L24 8Z" fill="#997B66" stroke="#825F45" strokeWidth="2"/>
    <rect x="20" y="32" width="8" height="8" fill="#D08C60"/>
  </svg>
);

const ProblemStatement = () => {
  const problems = [
    {
      id: 'busy',
      title: 'Too Busy to Cook?',
      description: 'Your schedule is packed. Between work, commute, and life, who has time to plan, shop, and cook?',
      icon: <ClockIcon />,
      fact: 'Average person works 8+ hours daily'
    },
    {
      id: 'junk',
      title: 'Stuck with Junk Food?',
      description: 'Quick fixes lead to unhealthy choices. Fast food becomes the norm when convenience matters most.',
      icon: <BurgerIcon />,
      fact: '70% of daily intake is processed food'
    },
    {
      id: 'expensive',
      title: 'Tired of Overspending on Food?',
      description: 'Ordering out daily burns through your budget. Groceries expire unused. Money down the drain.',
      icon: <MoneyIcon />,
      fact: 'Spend ₹500+ daily on food delivery'
    },
    {
      id: 'away',
      title: 'Away from Home?',
      description: 'Living away from family means no home-cooked meals. Missing that comfort and nutrition.',
      icon: <HomeIcon />,
      fact: 'Missing the comfort of home-cooked meals'
    }
  ];

  return (
    <section id="problem-statement" className="problem-section">
      <div className="container mx-auto px-6">
        {/* Problem Section Header */}
        <div className="text-center problem-header">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brown-900 mb-6">
            We Know Your <span style={{color: '#D08C60'}}>Daily Struggle</span>
          </h2>
          <p className="problem-section-subtitle">
            Modern life shouldn't mean compromising on nutrition and taste
          </p>
        </div>

        {/* Problems Grid */}
        <div className="problems-grid">
          {problems.map((problem, index) => (
            <div
              key={problem.id}
              className="problem-card"
            >
              <div className="problem-icon">
                {problem.icon}
              </div>

              <h3 className="problem-title">
                {problem.title}
              </h3>

              <p className="problem-description">
                {problem.description}
              </p>

              <div className="problem-fact">
                {problem.fact}
              </div>
            </div>
          ))}
        </div>

        {/* Transition to Solution */}
        <div className="problem-cta">
          <h3 className="cta-title">Ready to Break Free from These Problems?</h3>
          <p className="cta-description">Let us handle your daily meals while you focus on what matters most</p>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement; 