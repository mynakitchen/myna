import React, { useState } from 'react';

const SubscriptionPlans = () => {
  // State to track selected meal combinations for each plan
  const [selectedMeals, setSelectedMeals] = useState({
    'one-meal': 'lunch', // Default: lunch only
    'two-meals': 'lunch-dinner', // Default: lunch + dinner
    'three-meals': 'all' // Default: all meals
  });

  // State to track pricing period (monthly vs weekly)
  const [pricingPeriod, setPricingPeriod] = useState('monthly');
  
  // Individual pricing period state for mobile view
  const [mobilePricingPeriod, setMobilePricingPeriod] = useState({
    'one-meal': 'monthly',
    'two-meals': 'monthly', 
    'three-meals': 'monthly'
  });

  // Price mapping for weekly conversion
  const weeklyPriceMapping = {
    80: 90,
    120: 140,
    200: 230,
    220: 250,
    250: 280
  };

  // Function to get price based on period
  const getPrice = (basePrice, globalPeriod, planId = null, isMobile = false) => {
    // For mobile, use individual plan pricing period, for desktop use global period
    const currentPeriod = isMobile && planId ? mobilePricingPeriod[planId] : globalPeriod;
    return currentPeriod === 'weekly' ? weeklyPriceMapping[basePrice] : basePrice;
  };

  // Meal pricing configurations
  const mealPricing = {
    'one-meal': {
      'lunch': { price: 120, description: 'Lunch Only', meals: ['lunch'] },
      'dinner': { price: 120, description: 'Dinner Only', meals: ['dinner'] },
      'breakfast': { price: 80, description: 'Breakfast Only', meals: ['breakfast'] }
    },
    'two-meals': {
      'lunch-dinner': { price: 220, description: 'Lunch + Dinner', meals: ['lunch', 'dinner'] },
      'lunch-breakfast': { price: 200, description: 'Lunch + Breakfast', meals: ['breakfast', 'lunch'] },
      'dinner-breakfast': { price: 200, description: 'Dinner + Breakfast', meals: ['breakfast', 'dinner'] }
    },
    'three-meals': {
      'all': { price: 250, description: 'All Meals', meals: ['breakfast', 'lunch', 'dinner'] }
    }
  };

  const pricingPlans = [
    {
      id: 'one-meal',
      title: 'Single',
      description: 'One meal daily',
      popular: false,
      accent: '#825F45' // Brown from palette
    },
    {
      id: 'two-meals',
      title: 'Double',
      description: 'Two meals daily',
      popular: true,
      accent: '#D08C60' // Orange/peach from palette
    },
    {
      id: 'three-meals',
      title: 'Triple',
      description: 'Three meals daily',
      popular: false,
      accent: '#997B66' // Brown/taupe from palette
    }
  ];

  const scrollToSection = (sectionId) => {
    console.log('=== DEBUG: scrollToSection called ===');
    console.log('Target section ID:', sectionId);
    
    // Try multiple methods to find the element
    let section = document.getElementById(sectionId);
    
    if (!section) {
      // Fallback: try querySelector
      section = document.querySelector(`#${sectionId}`);
      console.log('Fallback querySelector result:', section);
    }
    
    if (!section) {
      // Fallback: try finding by attribute
      section = document.querySelector(`[id="${sectionId}"]`);
      console.log('Fallback attribute selector result:', section);
    }
    
    console.log('Found section element:', section);
    
    if (section) {
      const rect = section.getBoundingClientRect();
      const offsetTop = window.scrollY + rect.top;
      console.log('Section rect:', rect);
      console.log('Current scroll position:', window.scrollY);
      console.log('Section offsetTop:', offsetTop);
      console.log('Will scroll to:', offsetTop - 80);
      
      // Use multiple scroll attempts with different methods
      setTimeout(() => {
        // Method 1: Standard scrollTo
        window.scrollTo({
          top: offsetTop - 80,
          behavior: 'smooth'
        });
        console.log('Method 1: Standard scroll initiated to:', offsetTop - 80);
        
        // Method 2: scrollIntoView as backup
        setTimeout(() => {
          section.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
          console.log('Method 2: scrollIntoView initiated');
        }, 100);
        
      }, 50);
    } else {
      console.error('Section not found:', sectionId);
      console.log('Available sections with IDs:', 
        Array.from(document.querySelectorAll('[id]')).map(el => ({ id: el.id, element: el }))
      );
    }
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const renderMealIcon = (planId, mealKey, config, accentColor, isSelected) => {
    const { meals } = config;
    
    return (
      <button
        onClick={() => setSelectedMeals(prev => ({ ...prev, [planId]: mealKey }))}
        className={`relative p-1.5 md:p-2 border-2 transition-all hover:scale-105 active:scale-95 ${
          isSelected ? 'border-gray-800 bg-gray-50' : 'border-gray-300 hover:border-gray-500'
        }`}
      >
        {/* Meal grid (3 rows x 1 column) - Increased size for mobile */}
        <div className="w-14 md:w-12 h-16 md:h-16 grid grid-rows-3 gap-1">
          {/* Breakfast */}
          <div className={`w-full h-full border border-gray-400 rounded-sm ${
            meals.includes('breakfast') ? 'bg-warmOrange-500' : 'bg-gray-100'
          }`}>
            <div className="text-sm md:text-xs text-center leading-4 md:leading-4 text-gray-700">🌅</div>
          </div>
          
          {/* Lunch */}
          <div className={`w-full h-full border border-gray-400 rounded-sm ${
            meals.includes('lunch') ? 'bg-gold-500' : 'bg-gray-100'
          }`}>
            <div className="text-sm md:text-xs text-center leading-4 md:leading-4 text-gray-700">☀️</div>
          </div>
          
          {/* Dinner */}
          <div className={`w-full h-full border border-gray-400 rounded-sm ${
            meals.includes('dinner') ? 'bg-sage-500' : 'bg-gray-100'
          }`}>
            <div className="text-sm md:text-xs text-center leading-4 md:leading-4 text-gray-700">🌙</div>
          </div>
        </div>
      </button>
    );
  };

  const renderMealSelectors = (planId, accentColor) => {
    const planOptions = mealPricing[planId];
    
    return (
      <div className="flex justify-center items-center gap-2 md:gap-2 mb-6">
        {Object.entries(planOptions).map(([mealKey, config]) => (
          <div key={mealKey}>
            {renderMealIcon(
              planId, 
              mealKey, 
              config, 
              accentColor, 
              selectedMeals[planId] === mealKey
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderPricingToggle = (planId = null, isMobile = false) => {
    const currentPeriod = planId ? mobilePricingPeriod[planId] : pricingPeriod;
    const handleToggle = (period) => {
      if (planId) {
        setMobilePricingPeriod(prev => ({ ...prev, [planId]: period }));
      } else {
        setPricingPeriod(period);
      }
    };

    return (
      <div className={`inline-flex border-2 border-gray-900 bg-white shadow-lg rounded-sm ${isMobile ? 'w-auto max-w-[180px] mx-auto mb-2 h-8' : 'mb-8'}`}>
        <button
          onClick={() => handleToggle('monthly')}
          className={`font-medium uppercase transition-all duration-200 border-r border-gray-900 ${
            currentPeriod === 'monthly'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-900 hover:bg-gray-50'
          } ${isMobile ? 'px-3 py-1 text-[10px] leading-tight flex items-center justify-center' : 'px-4 py-2 text-sm tracking-wide'}`}
        >
          Monthly
        </button>
        <button
          onClick={() => handleToggle('weekly')}
          className={`font-medium uppercase transition-all duration-200 ${
            currentPeriod === 'weekly'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-900 hover:bg-gray-50'
          } ${isMobile ? 'px-3 py-1 text-[10px] leading-tight flex items-center justify-center' : 'px-4 py-2 text-sm tracking-wide'}`}
        >
          Weekly
        </button>
      </div>
    );
  };

  return (
    <section id="subscription-plans" className="pt-6 md:pt-8 pb-16 md:pb-20 lg:pb-28 overflow-hidden" style={{backgroundColor: '#F5F1EB'}}>
      <div className="container mx-auto px-4 sm:px-6 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            Built for your budget
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8">
            Choose the perfect plan that fits your lifestyle and budget. All plans include free delivery and premium quality meals.
          </p>
          
          {/* Desktop Pricing Toggle */}
          <div className="hidden md:block">
            {renderPricingToggle()}
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 sm:px-6 md:px-0">
          {pricingPlans.map((plan, index) => {
            const currentConfig = mealPricing[plan.id][selectedMeals[plan.id]];
            const displayPrice = getPrice(currentConfig.price, pricingPeriod, plan.id, false); // Desktop uses global period
            const mobileDisplayPrice = getPrice(currentConfig.price, pricingPeriod, plan.id, true); // Mobile uses individual period
            
            return (
              <div
                key={plan.id}
                className={`relative transition-transform duration-200 hover:-translate-y-2 ${
                  plan.popular ? "md:mt-0 md:mb-8" : ""
                }`}
              >
                {/* Popular badge - Fixed positioning */}
                {plan.popular && (
                  <div className="absolute -top-2 md:-top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="text-white text-xs font-bold px-3 md:px-4 py-1.5 md:py-2 tracking-wider rounded-sm" style={{backgroundColor: '#D08C60'}}>
                      POPULAR
                    </div>
                  </div>
                )}
                
                {/* Main card */}
                <div className="bg-white border-2 border-gray-900 shadow-xl hover:shadow-2xl transition-shadow duration-300 relative min-h-[500px] md:min-h-[550px] flex flex-col">
                  {/* Accent line */}
                  <div 
                    className="h-1 w-full" 
                    style={{backgroundColor: plan.accent}}
                  ></div>
                  
                  {/* Header */}
                  <div className="p-6 md:p-8 text-center border-b border-gray-200 flex-shrink-0">
                    <h3 className="text-2xl sm:text-3xl md:text-2xl font-black text-gray-900 mb-2 tracking-tight">{plan.title}</h3>
                    <p className="text-gray-600 text-sm md:text-sm uppercase tracking-widest mb-4 md:mb-6">{currentConfig.description}</p>
                    
                    {/* Mobile Pricing Toggle */}
                    <div className="md:hidden mb-4 md:mb-6 px-2">
                      {renderPricingToggle(plan.id, true)}
                    </div>
                    
                    {/* Meal selectors */}
                    <div className="mb-4 md:mb-6">
                      {renderMealSelectors(plan.id, plan.accent)}
                    </div>
                    
                    {/* Price */}
                    <div className="text-center">
                      <div className="text-6xl sm:text-4xl md:text-4xl font-black text-gray-900 mb-1">
                        <span className="md:hidden">{formatPrice(mobileDisplayPrice)}</span>
                        <span className="hidden md:inline">{formatPrice(displayPrice)}</span>
                      </div>
                      <div className="text-xs md:text-sm text-gray-500 uppercase tracking-widest">
                        PER DAY
                      </div>
                    </div>
                  </div>
                  
                  {/* Content area */}
                  <div className="p-4 md:p-8 flex-grow flex flex-col">
                    {/* Minimal features */}
                    <div className="space-y-3 mb-6 md:mb-8 flex-grow">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-900 font-medium text-sm md:text-base">Delivery</span>
                        <span className="text-gray-600 text-sm md:text-base">Free</span>
                      </div>
                      
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-900 font-medium text-sm md:text-base">Quality</span>
                        <span className="text-gray-600 text-sm md:text-base">Premium</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 font-medium text-sm md:text-base">Flexibility</span>
                        <span className="text-gray-600 text-sm md:text-base">Daily</span>
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        scrollToSection('start-food-journey');
                      }}
                      className="w-full py-3 md:py-4 font-bold text-sm md:text-base transition-all border-2 border-gray-900 hover:bg-gray-900 hover:text-white mt-auto"
                      style={{
                        backgroundColor: plan.popular ? plan.accent : 'white',
                        color: plan.popular ? 'white' : '#1F2937'
                      }}
                    >
                      Choose Plan
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans; 