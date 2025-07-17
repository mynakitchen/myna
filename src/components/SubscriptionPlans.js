import React, { useState } from 'react';

const SubscriptionPlans = () => {
  // New state management for individual meal selections
  const [selectedMeals, setSelectedMeals] = useState({
    'one-meal': ['lunch'], // Default: lunch only (single selection)
    'two-meals': ['lunch', 'dinner'], // Default: lunch + dinner (double selection)
    'three-meals': ['breakfast', 'lunch', 'dinner'] // Always all three (triple selection)
  });

  // Mobile-specific state for dynamic meal selection
  const [mobileSelectedMeals, setMobileSelectedMeals] = useState(['lunch', 'dinner']); // Default: 2 meals for mobile

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

  // Individual meal prices
  const mealPrices = {
    'breakfast': 80,
    'lunch': 120,
    'dinner': 120
  };

  // Function to calculate price based on selected meals
  const calculatePrice = (planId) => {
    const meals = selectedMeals[planId];
    
    if (planId === 'one-meal') {
      // Single meal plan - return price of selected meal
      return mealPrices[meals[0]];
    } else if (planId === 'two-meals') {
      // Double meal plan - special pricing for combinations
      const mealSet = new Set(meals);
      if (mealSet.has('lunch') && mealSet.has('dinner')) {
        return 220; // Lunch + Dinner
      } else if (mealSet.has('breakfast') && mealSet.has('lunch')) {
        return 200; // Breakfast + Lunch  
      } else if (mealSet.has('breakfast') && mealSet.has('dinner')) {
        return 200; // Breakfast + Dinner
      }
      return 220; // Default fallback
    } else if (planId === 'three-meals') {
      // Triple meal plan - fixed price for all meals
      return 250;
    }
    return 120; // Fallback
  };

  // Function to calculate mobile price based on selected meals
  const calculateMobilePrice = (meals) => {
    const mealCount = meals.length;
    
    if (mealCount === 1) {
      return mealPrices[meals[0]];
    } else if (mealCount === 2) {
      const mealSet = new Set(meals);
      if (mealSet.has('lunch') && mealSet.has('dinner')) {
        return 220; // Lunch + Dinner
      } else if (mealSet.has('breakfast') && mealSet.has('lunch')) {
        return 200; // Breakfast + Lunch  
      } else if (mealSet.has('breakfast') && mealSet.has('dinner')) {
        return 200; // Breakfast + Dinner
      }
      return 220; // Default fallback
    } else if (mealCount === 3) {
      return 250; // All meals
    }
    return 120; // Fallback
  };

  // Function to get meal description
  const getMealDescription = (planId) => {
    const meals = selectedMeals[planId];
    
    if (planId === 'one-meal') {
      const meal = meals[0];
      return meal.charAt(0).toUpperCase() + meal.slice(1) + ' Only';
    } else if (planId === 'two-meals') {
      const sortedMeals = ['breakfast', 'lunch', 'dinner'].filter(meal => meals.includes(meal));
      return sortedMeals.map(meal => meal.charAt(0).toUpperCase() + meal.slice(1)).join(' + ');
    } else if (planId === 'three-meals') {
      return 'All Meals';
    }
    return 'Select Meals';
  };

  // Function to get mobile meal description
  const getMobileMealDescription = (meals) => {
    const mealCount = meals.length;
    
    if (mealCount === 1) {
      const meal = meals[0];
      return meal.charAt(0).toUpperCase() + meal.slice(1) + ' Only';
    } else if (mealCount === 2) {
      const sortedMeals = ['breakfast', 'lunch', 'dinner'].filter(meal => meals.includes(meal));
      return sortedMeals.map(meal => meal.charAt(0).toUpperCase() + meal.slice(1)).join(' + ');
    } else if (mealCount === 3) {
      return 'All Meals';
    }
    return 'Select Meals';
  };

  // Function to get mobile plan title
  const getMobilePlanTitle = (meals) => {
    const mealCount = meals.length;
    
    if (mealCount === 1) {
      return 'Single';
    } else if (mealCount === 2) {
      return 'Double';
    } else if (mealCount === 3) {
      return 'Triple';
    }
    return 'Plan';
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
    // Try multiple methods to find the element
    let section = document.getElementById(sectionId);
    
    if (!section) {
      // Fallback: try querySelector
      section = document.querySelector(`#${sectionId}`);
    }
    
    if (!section) {
      // Fallback: try finding by attribute
      section = document.querySelector(`[id="${sectionId}"]`);
    }
    
    if (section) {
      const rect = section.getBoundingClientRect();
      
      // Check if element is already visible
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      
      if (!isVisible) {
        const offset = 80; // Account for any fixed headers
        const elementPosition = rect.top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    } else {
      console.warn('Element not found:', sectionId);
    }
  };

  const formatPrice = (amount) => {
    return `₹${amount}`;
  };

  // Handle meal selection based on plan type (FIXED FOR DOUBLE MEAL BUG)
  const handleMealSelection = (planId, meal) => {
    if (planId === 'one-meal') {
      // Single meal plan: Only one meal can be selected
      setSelectedMeals(prev => ({
        ...prev,
        [planId]: [meal]
      }));
    } else if (planId === 'two-meals') {
      // Double meal plan: Exactly two meals must be selected at all times
      setSelectedMeals(prev => {
        const currentMeals = prev[planId];
        
        if (currentMeals.includes(meal)) {
          // If meal is already selected, and we have more than 2 meals, remove it
          // But always maintain at least 2 meals
          if (currentMeals.length > 2) {
            const newMeals = currentMeals.filter(m => m !== meal);
            return {
              ...prev,
              [planId]: newMeals
            };
          }
          // If we have exactly 2 meals, don't allow removal
          return prev;
        } else {
          // If meal is not selected, add it
          if (currentMeals.length < 2) {
            // Can add another meal
            return {
              ...prev,
              [planId]: [...currentMeals, meal]
            };
          } else {
            // Replace the first meal with the new one (maintain exactly 2)
            return {
              ...prev,
              [planId]: [currentMeals[1], meal]
            };
          }
        }
      });
    }
    // For three-meals, no action needed as all meals are always selected
  };

  // Handle mobile meal selection
  const handleMobileMealSelection = (meal) => {
    setMobileSelectedMeals(prev => {
      if (prev.includes(meal)) {
        // If meal is already selected, remove it (but ensure at least one remains)
        const newMeals = prev.filter(m => m !== meal);
        return newMeals.length > 0 ? newMeals : prev;
      } else {
        // If meal is not selected, add it (max 3 meals)
        if (prev.length < 3) {
          return [...prev, meal];
        } else {
          // Replace the first meal with the new one
          return [prev[1], prev[2], meal];
        }
      }
    });
  };

  // Render individual meal icon
  const renderMealIcon = (planId, meal, accentColor) => {
    const isSelected = selectedMeals[planId].includes(meal);
    const isClickable = planId !== 'three-meals'; // Three meal plan icons are not clickable
    
    // Updated meal icon configurations with sunrise, full sun, and moon
    const mealConfig = {
      breakfast: { 
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.93,15.5C6.35,16.24 6.89,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.11,16.85 17.65,16.22 18.07,15.5C18.5,14.77 18.75,14 18.89,13.21L20.64,17Z" />
          </svg>
        ), 
        color: '#FF8C42', 
        name: 'Breakfast',
        bgColor: '#FFF5F0'
      },
      lunch: { 
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,12L17.8,10.8L20,9.6L18.8,7.4L20,6.2L17.8,5L20,3.8L18.8,1.6L20,0.4L17.8,0L20,0L18.8,0L20,0.4L17.8,1.6L20,3.8L17.8,5L20,6.2L18.8,7.4L20,9.6L17.8,10.8L20,12M4,12L6.2,10.8L4,9.6L5.2,7.4L4,6.2L6.2,5L4,3.8L5.2,1.6L4,0.4L6.2,0L4,0L5.2,0L4,0.4L6.2,1.6L4,3.8L6.2,5L4,6.2L5.2,7.4L4,9.6L6.2,10.8L4,12M12,2L15.09,8.26L22,9L17,14.74L18.18,21.02L12,17.77L5.82,21.02L7,14.74L2,9L8.91,8.26L12,2Z" />
          </svg>
        ), 
        color: '#FFD700', 
        name: 'Lunch',
        bgColor: '#FFFBF0'
      },
      dinner: { 
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.4 6.35,17.41C9.37,20.43 14,20.54 17.33,17.97Z" />
          </svg>
        ), 
        color: '#6B73FF', 
        name: 'Dinner',
        bgColor: '#F0F1FF'
      }
    };
    
    const config = mealConfig[meal];
    
    return (
      <button
        key={meal}
        onClick={() => isClickable && handleMealSelection(planId, meal)}
        disabled={!isClickable}
        className={`relative p-2 md:p-3 border-2 transition-all duration-200 rounded-lg ${
          isClickable ? 'hover:scale-105 active:scale-95 cursor-pointer' : 'cursor-default'
        } ${
          isSelected 
            ? 'border-gray-800 bg-gray-100 shadow-md' 
            : 'border-gray-300 bg-white hover:border-gray-500'
        }`}
        title={config.name}
      >
        {/* Individual meal icon */}
        <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
          <div className={`w-full h-full border-2 border-gray-300 rounded-lg flex items-center justify-center transition-all duration-200 ${
            isSelected ? 'border-gray-500' : 'border-gray-200'
          }`} style={{
            backgroundColor: isSelected ? config.bgColor : '#f9fafb',
            color: isSelected ? config.color : '#9CA3AF'
          }}>
            <div className="flex items-center justify-center">
              {config.icon}
            </div>
          </div>
        </div>
        
        {/* Meal label */}
        <div className="text-xs md:text-sm font-medium text-gray-700 mt-1 text-center">
          {config.name}
        </div>
      </button>
    );
  };

  // Render mobile meal icon
  const renderMobileMealIcon = (meal) => {
    const isSelected = mobileSelectedMeals.includes(meal);
    
    // Updated meal icon configurations with sunrise, full sun, and moon
    const mealConfig = {
      breakfast: { 
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.93,15.5C6.35,16.24 6.89,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.11,16.85 17.65,16.22 18.07,15.5C18.5,14.77 18.75,14 18.89,13.21L20.64,17Z" />
          </svg>
        ), 
        color: '#FF8C42', 
        name: 'Breakfast',
        bgColor: '#FFF5F0'
      },
      lunch: { 
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,12L17.8,10.8L20,9.6L18.8,7.4L20,6.2L17.8,5L20,3.8L18.8,1.6L20,0.4L17.8,0L20,0L18.8,0L20,0.4L17.8,1.6L20,3.8L17.8,5L20,6.2L18.8,7.4L20,9.6L17.8,10.8L20,12M4,12L6.2,10.8L4,9.6L5.2,7.4L4,6.2L6.2,5L4,3.8L5.2,1.6L4,0.4L6.2,0L4,0L5.2,0L4,0.4L6.2,1.6L4,3.8L6.2,5L4,6.2L5.2,7.4L4,9.6L6.2,10.8L4,12M12,2L15.09,8.26L22,9L17,14.74L18.18,21.02L12,17.77L5.82,21.02L7,14.74L2,9L8.91,8.26L12,2Z" />
          </svg>
        ), 
        color: '#FFD700', 
        name: 'Lunch',
        bgColor: '#FFFBF0'
      },
      dinner: { 
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.4 6.35,17.41C9.37,20.43 14,20.54 17.33,17.97Z" />
          </svg>
        ), 
        color: '#6B73FF', 
        name: 'Dinner',
        bgColor: '#F0F1FF'
      }
    };
    
    const config = mealConfig[meal];
    
    return (
      <button
        key={meal}
        onClick={() => handleMobileMealSelection(meal)}
        className={`relative p-2 border-2 transition-all duration-200 rounded-lg hover:scale-105 active:scale-95 cursor-pointer ${
          isSelected 
            ? 'border-gray-800 bg-gray-100 shadow-md' 
            : 'border-gray-300 bg-white hover:border-gray-500'
        }`}
        title={config.name}
      >
        {/* Individual meal icon */}
        <div className="w-12 h-12 flex items-center justify-center">
          <div className={`w-full h-full border-2 border-gray-300 rounded-lg flex items-center justify-center transition-all duration-200 ${
            isSelected ? 'border-gray-500' : 'border-gray-200'
          }`} style={{
            backgroundColor: isSelected ? config.bgColor : '#f9fafb',
            color: isSelected ? config.color : '#9CA3AF'
          }}>
            <div className="flex items-center justify-center">
              {config.icon}
            </div>
          </div>
        </div>
        
        {/* Meal label */}
        <div className="text-xs font-medium text-gray-700 mt-1 text-center">
          {config.name}
        </div>
      </button>
    );
  };

  // Render meal selectors for each plan
  const renderMealSelectors = (planId, accentColor) => {
    const mealOrder = ['breakfast', 'lunch', 'dinner'];
    
    return (
      <div className="flex justify-center items-center gap-2 lg:gap-3 mb-6">
        {mealOrder.map((meal) => renderMealIcon(planId, meal, accentColor))}
      </div>
    );
  };

  // Render mobile meal selectors
  const renderMobileMealSelectors = () => {
    const mealOrder = ['breakfast', 'lunch', 'dinner'];
    
    return (
      <div className="flex justify-center items-center gap-3 mb-6">
        {mealOrder.map((meal) => renderMobileMealIcon(meal))}
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
      <div className={`inline-flex rounded-lg p-1 ${isMobile ? 'w-auto max-w-[160px] mx-auto mb-4' : 'mb-8'}`} style={{backgroundColor: '#f8f9fa'}}>
        <button
          onClick={() => handleToggle('monthly')}
          className={`font-semibold transition-all duration-300 ease-in-out rounded-md ${
            currentPeriod === 'monthly'
              ? 'bg-gray-900 text-white shadow-sm'
              : 'bg-transparent text-gray-600 hover:text-gray-900'
          } ${isMobile ? 'px-3 py-1.5 text-xs' : 'px-6 py-2.5 text-sm'}`}
        >
          Monthly
        </button>
        <button
          onClick={() => handleToggle('weekly')}
          className={`font-semibold transition-all duration-300 ease-in-out rounded-md ${
            currentPeriod === 'weekly'
              ? 'bg-gray-900 text-white shadow-sm'
              : 'bg-transparent text-gray-600 hover:text-gray-900'
          } ${isMobile ? 'px-3 py-1.5 text-xs' : 'px-6 py-2.5 text-sm'}`}
        >
          Weekly
        </button>
      </div>
    );
  };

  // Render mobile pricing card
  const renderMobilePricingCard = () => {
    const mealCount = mobileSelectedMeals.length;
    const basePrice = calculateMobilePrice(mobileSelectedMeals);
    const displayPrice = getPrice(basePrice, pricingPeriod);
    const planTitle = getMobilePlanTitle(mobileSelectedMeals);
    const description = getMobileMealDescription(mobileSelectedMeals);
    
    // Determine accent color based on meal count
    const accentColor = mealCount === 1 ? '#825F45' : mealCount === 2 ? '#D08C60' : '#997B66';
    const isPopular = mealCount === 2;
    
    return (
      <div className="relative">
        {/* Popular badge */}
        {isPopular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
            <div className="text-white text-xs font-bold px-4 py-2 tracking-wider rounded-md" style={{backgroundColor: '#D08C60'}}>
              POPULAR
            </div>
          </div>
        )}
        
        {/* Main card */}
        <div className="bg-white border-2 border-gray-900 shadow-xl transition-shadow duration-300 relative flex flex-col rounded-lg overflow-hidden">
          {/* Accent line */}
          <div 
            className="h-1 w-full" 
            style={{backgroundColor: accentColor}}
          ></div>
          
          {/* Header */}
          <div className="p-6 text-center border-b border-gray-200 flex-shrink-0">
            <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">{planTitle}</h3>
            <p className="text-gray-600 text-sm uppercase tracking-widest mb-4">{description}</p>
            
            {/* Guidance text */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700 font-medium">
                📌 Tap single or multiple meal icons to select your plan
              </p>
            </div>
            
            {/* Mobile Pricing Toggle */}
            <div className="mb-6">
              {renderPricingToggle(null, true)}
            </div>
            
            {/* Mobile Meal selectors */}
            <div className="mb-6">
              {renderMobileMealSelectors()}
            </div>
            
            {/* Price */}
            <div className="text-center">
              <div className="text-4xl font-black text-gray-900 mb-1">
                {formatPrice(displayPrice)}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-widest">
                PER DAY
              </div>
            </div>
          </div>
          
          {/* Content area */}
          <div className="p-6 flex-grow flex flex-col">
            {/* Features */}
            <div className="space-y-3 mb-6 flex-grow">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-900 font-medium text-sm">Delivery</span>
                <span className="text-gray-600 text-sm">Free</span>
              </div>
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-900 font-medium text-sm">Quality</span>
                <span className="text-gray-600 text-sm">Premium</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-900 font-medium text-sm">Flexibility</span>
                <span className="text-gray-600 text-sm">Daily</span>
              </div>
            </div>
            
            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('easy-registration')}
              className="w-full py-3 font-bold text-sm transition-all duration-200 border-2 border-gray-900 hover:bg-gray-900 hover:text-white mt-auto rounded-md"
              style={{
                backgroundColor: isPopular ? accentColor : 'white',
                color: isPopular ? 'white' : '#1F2937'
              }}
            >
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="subscription-plans" className="py-8 md:py-12 lg:py-16 overflow-hidden" style={{backgroundColor: '#F5F1EB'}}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Built for your budget
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8">
            Choose the perfect plan that fits your lifestyle and budget. All plans include free delivery and premium quality meals.
          </p>
          
          {/* Desktop Pricing Toggle */}
          <div className="hidden md:block">
            {renderPricingToggle()}
          </div>
        </div>

        {/* Mobile View - Single Dynamic Card */}
        <div className="block md:hidden max-w-sm mx-auto px-4">
          {renderMobilePricingCard()}
        </div>

        {/* Desktop View - Three Cards Side by Side */}
        <div className="hidden md:flex md:justify-center md:items-stretch md:gap-4 lg:gap-6 xl:gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => {
            const basePrice = calculatePrice(plan.id);
            const displayPrice = getPrice(basePrice, pricingPeriod, plan.id, false); // Desktop uses global period
            const description = getMealDescription(plan.id);
            
            return (
              <div
                key={plan.id}
                className={`relative flex-1 min-w-0 max-w-sm flex flex-col h-full group`}
                style={{ minHeight: '100%' }}
              >
                {/* Popular badge - Fixed positioning */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="text-white text-xs font-bold px-4 py-2 tracking-wider rounded-md" style={{backgroundColor: '#D08C60'}}>
                      POPULAR
                    </div>
                  </div>
                )}
                
                {/* Main card */}
                <div className="bg-white border-2 border-gray-900 shadow-xl group-hover:shadow-2xl transition-all duration-300 relative h-full flex flex-col rounded-lg overflow-hidden hover:-translate-y-2" style={{ minHeight: '100%' }}>
                  {/* Accent line */}
                  <div 
                    className="h-1 w-full" 
                    style={{backgroundColor: plan.accent}}
                  ></div>
                  
                  {/* Header */}
                  <div className="p-4 lg:p-6 text-center border-b border-gray-200 flex-shrink-0">
                    <h3 className="text-xl lg:text-2xl font-black text-gray-900 mb-2 tracking-tight">{plan.title}</h3>
                    <p className="text-gray-600 text-xs lg:text-sm uppercase tracking-widest mb-4 lg:mb-6">{description}</p>
                    
                    {/* Guidance text for desktop */}
                    <div className="mb-4 lg:mb-6 p-3 lg:p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-xs lg:text-sm text-gray-700 font-medium">
                        📌 Tap single or multiple meal icons to select your plan
                      </p>
                    </div>
                    
                    {/* Meal selectors */}
                    <div className="mb-4 lg:mb-6">
                      {renderMealSelectors(plan.id, plan.accent)}
                    </div>
                    
                    {/* Price */}
                    <div className="text-center">
                      <div className="text-3xl lg:text-4xl font-black text-gray-900 mb-1">
                        {formatPrice(displayPrice)}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-500 uppercase tracking-widest">
                        PER DAY
                      </div>
                    </div>
                  </div>
                  
                  {/* Content area */}
                  <div className="p-4 lg:p-6 flex-grow flex flex-col">
                    {/* Features */}
                    <div className="space-y-3 mb-4 lg:mb-6 flex-grow">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-900 font-medium text-sm">Delivery</span>
                        <span className="text-gray-600 text-sm">Free</span>
                      </div>
                      
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-900 font-medium text-sm">Quality</span>
                        <span className="text-gray-600 text-sm">Premium</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 font-medium text-sm">Flexibility</span>
                        <span className="text-gray-600 text-sm">Daily</span>
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <button
                      onClick={() => scrollToSection('easy-registration')}
                      className="w-full py-3 lg:py-4 font-bold text-sm transition-all duration-200 border-2 border-gray-900 hover:bg-gray-900 hover:text-white mt-auto rounded-md"
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