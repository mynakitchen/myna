import React from 'react';
import './ProblemStatement.css';

// Parallax Image Section Component
const ParallaxImageSection = () => {
  return (
    <div className="parallax-image-container">
      <div className="parallax-image-wrapper">
        <img 
          src={`${process.env.PUBLIC_URL}/images/myna-kitchen-meals.jpg`}
          alt="Myna Kitchen meal containers showcasing various South Indian dishes"
          className="parallax-image"
          onError={(e) => {
            // Fallback to a placeholder if image not found
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div 
          className="image-placeholder" 
          style={{ display: 'none' }}
        >
          <div className="placeholder-content">
            <div className="placeholder-icon">🍱</div>
            <h3>Myna Kitchen Meals</h3>
            <p>Delicious meal containers delivered fresh to your doorstep</p>
          </div>
        </div>
      </div>
    </div>
  );
};

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

const ProblemStatement = () => {
  const problems = [
    {
      id: 'busy',
      title: 'Too Busy to Cook?',
      description: 'Your schedule is packed. Between work, commute, and life, who has time to plan, shop, and cook?',
      icon: '⏰',
      fact: 'Average person works 8+ hours daily'
    },
    {
      id: 'junk',
      title: 'Stuck with Junk Food?',
      description: 'Quick fixes lead to unhealthy choices. Fast food becomes the norm when convenience matters most.',
      icon: '🍔',
      fact: '70% of daily intake is processed food'
    },
    {
      id: 'expensive',
      title: 'Tired of Overspending on Food?',
      description: 'Ordering out daily burns through your budget. Groceries expire unused. Money down the drain.',
      icon: '💸',
      fact: 'Spend ₹500+ daily on food delivery'
    },
    {
      id: 'away',
      title: 'Away from Home?',
      description: 'Living away from family means no home-cooked meals. Missing that comfort and nutrition.',
      icon: '🏠',
      fact: 'Missing the comfort of home-cooked meals'
    }
  ];

  return (
    <>
      {/* Problem Statement Section */}
      <section id="problem-statement" className="problem-section">
        <div className="container mx-auto px-4 md:px-6">
          {/* Problem Section Header */}
          <div className="text-center mb-16">
            <h2 className="problem-title">
              We Know Your <span style={{color: '#D08C60'}}>Daily Struggle</span>
            </h2>
            <p className="problem-subtitle">
              Modern life shouldn't mean compromising on nutrition and taste
            </p>
          </div>

          {/* Problems List */}
          <div className="problems-list">
            {problems.map((problem, index) => (
              <div
                key={problem.id}
                className="problem-item"
              >
                <div className="problem-icon-large">
                  {problem.icon}
                </div>
                
                <div className="problem-content-text">
                  <h3 className="problem-title-large">
                    {problem.title}
                  </h3>
                  
                  <p className="problem-description-text">
                    {problem.description}
                  </p>
                  
                  <div className="problem-fact">
                    {problem.fact}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Transition to Solution - Reduced spacing */}
          <div className="problem-cta mt-12">
            <h3 className="cta-title">Ready to Break Free from These Problems?</h3>
            <p className="cta-description">Let us handle your daily meals while you focus on what matters most</p>
          </div>
        </div>
      </section>

      {/* Features Section - Unified Design */}
      <section id="features" className="solution-section">
        <div className="container mx-auto px-4 md:px-6">
          {/* Unified Header Section */}
          <div className="unified-hero-section">
            {/* Header Section - Reduced spacing */}
            <div className="text-center mb-8">
              <h2 className="hero-title">
                Myna <span className="text-primary">Kitchen</span>
              </h2>
              <h3 className="hero-subtitle">
                Daily Meals Delivered
              </h3>
              <p className="hero-description">
                With us you no longer have to run a kitchen, manage groceries or worry about your daily food.
              </p>
              
              {/* Parallax Image Section */}
              <ParallaxImageSection />
              
              {/* New text addition */}
              <p className="hero-description-sub mt-8 text-lg md:text-xl text-gray-700 font-medium">
                Fresh homely meals delivered to you day by day, meal by meal
              </p>

              {/* Pricing Text and Button - Reduced spacing */}
              <div className="hero-pricing-section mt-6 mb-12">
                <p className="pricing-text text-2xl md:text-3xl font-bold text-primary mb-6 tracking-wide"
                  style={{
                    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                  }}>
                  Starting at just ₹80 per day
                </p>
                <button 
                onClick={() => scrollToSection('subscription-plans')}
                className="pricing-cta-button">
                  View Our Plans
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProblemStatement; 