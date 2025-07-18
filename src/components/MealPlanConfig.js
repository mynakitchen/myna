import React, { useState } from 'react';
import { 
  dietOptions, 
  mealOptions, 
  calculatePrice, 
  calculateDeliveryCharges, 
  isPincodeServicable,
  getPincodeInfo,
  getMealPreview,
  formatCurrency
} from '../lib/mealPlanData';
import './MealPlanConfig.css';
import LocationSearch from './LocationSearch';

// Icon components for better design
const IconRenderer = ({ iconType, size = 40, className = "" }) => {
  const icons = {
    veg: (
      <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
        <circle cx="20" cy="20" r="18" fill="#10B981" stroke="#059669" strokeWidth="2"/>
        <circle cx="20" cy="20" r="6" fill="white"/>
        <circle cx="20" cy="20" r="3" fill="#10B981"/>
      </svg>
    ),
    'non-veg': (
      <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
        <circle cx="20" cy="20" r="18" fill="#EF4444" stroke="#DC2626" strokeWidth="2"/>
        <circle cx="20" cy="20" r="6" fill="white"/>
        <circle cx="20" cy="20" r="3" fill="#EF4444"/>
      </svg>
    ),
    sunrise: (
      <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
        <circle cx="20" cy="20" r="18" fill="#F59E0B" stroke="#D97706" strokeWidth="2"/>
        <path d="M12 16 L20 8 L28 16 L24 20 L16 20 Z" fill="white"/>
        <circle cx="20" cy="28" r="2" fill="white"/>
      </svg>
    ),
    sun: (
      <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
        <circle cx="20" cy="20" r="18" fill="#F59E0B" stroke="#D97706" strokeWidth="2"/>
        <circle cx="20" cy="20" r="8" fill="white"/>
        <path d="M20 8 L24 16 L20 12 L16 16 Z" fill="#F59E0B"/>
        <path d="M8 20 L16 24 L12 20 L16 16 Z" fill="#F59E0B"/>
        <path d="M32 20 L24 16 L28 20 L24 24 Z" fill="#F59E0B"/>
        <path d="M20 32 L16 24 L20 28 L24 24 Z" fill="#F59E0B"/>
      </svg>
    ),
    moon: (
      <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
        <circle cx="20" cy="20" r="18" fill="#6B7280" stroke="#4B5563" strokeWidth="2"/>
        <circle cx="15" cy="15" r="2" fill="white"/>
        <circle cx="25" cy="15" r="1.5" fill="white"/>
        <circle cx="12" cy="25" r="1" fill="white"/>
        <path d="M20 10 C25 12, 30 18, 25 25 C20 30, 15 25, 15 20 C15 15, 18 10, 20 10" fill="white"/>
      </svg>
    )
  };
  
  return icons[iconType] || null;
};

const MealPlanConfig = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [planData, setPlanData] = useState({
    diet: '',
    meals: [],
    days: [],
    planType: '',
    homeAddress: '',
    homeArea: '',
    homePincode: '',
    officeAddress: '',
    officeArea: '',
    officePincode: ''
  });

  const totalSteps = 8;
  const progress = (currentStep / totalSteps) * 100;

  const updatePlanData = (updates) => {
    setPlanData(prev => ({ ...prev, ...updates }));
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1: return !!planData.diet;
      case 2: return planData.meals.length > 0;
      case 3: return planData.days.length === 5 || planData.days.length === 7;
      case 4: return true; // Preview step
      case 5: return !!planData.planType;
      case 6: return !!planData.homePincode;
      case 7: return true;
      case 8: return true;
      default: return false;
    }
  };

  const nextStep = () => {
    if (validateStep() && currentStep < totalSteps) {
      // Special handling for step 6 (location) - if pincode is not serviceable, skip to step 8 (summary)
      if (currentStep === 6 && planData.homePincode && !isPincodeServicable(planData.homePincode)) {
        setCurrentStep(8);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const nextStepForNonServiceable = () => {
    // Direct jump to summary page for non-serviceable areas
    setCurrentStep(8);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Save plan data to localStorage for future reference
    localStorage.setItem('mealPlanData', JSON.stringify(planData));
    
    // Redirect to signup page
    window.location.href = 'https://mynakitchen.in/SignUp';
  };

  const handleDecline = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const renderProgressBar = () => {
    const stepNames = ['Diet', 'Meals', 'Days', 'Preview', 'Plan', 'Location', 'Delivery', 'Summary'];
    
    return (
      <div className="progress-container">
        <div className="progress-header">
          <h1>Myna Kitchen</h1>
          <p>Build Your Perfect Meal Plan</p>
        </div>
        
        <div className="step-progress">
          <div className="steps-row">
            {stepNames.map((name, index) => (
              <div key={index} className={`step-item ${index + 1 <= currentStep ? 'active' : ''} ${index + 1 === currentStep ? 'current' : ''}`}>
                <div className="step-number">{index + 1}</div>
                <div className="step-name">{name}</div>
              </div>
            ))}
          </div>
          
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>What's Your Diet Preference?</h2>
            <p>Choose your preferred diet type to get meals that suit your lifestyle</p>
            
            <div className="diet-options-simplified">
              {dietOptions.map(option => (
                <div 
                  key={option.id}
                  className={`diet-card-simplified ${planData.diet === option.id ? 'selected' : ''}`}
                  onClick={() => updatePlanData({ diet: option.id })}
                >
                  <div className="diet-icon-simplified">
                    <IconRenderer iconType={option.icon} size={40} />
                  </div>
                  <div className="diet-content-simplified">
                    <h3>{option.name}</h3>
                    <p>{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h2>How Many Meals Per Day?</h2>
            <p>Select the meals you want delivered daily</p>
            
            <div className="meal-options-simplified">
              {mealOptions.map(option => (
                <div 
                  key={option.id}
                  className={`meal-card-simplified ${option.type === 'super' ? 'super-meal-simplified' : 'regular-meal-simplified'} ${planData.meals.includes(option.id) ? 'selected' : ''}`}
                  onClick={() => {
                    const newMeals = planData.meals.includes(option.id)
                      ? planData.meals.filter(m => m !== option.id)
                      : [...planData.meals, option.id];
                    updatePlanData({ meals: newMeals });
                  }}
                >
                  <div className="meal-icon-simplified">
                    <IconRenderer iconType={option.icon} size={32} />
                    {option.type === 'super' && (
                      <div className="super-badge-simplified">
                        <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                          <path d="M10 1L12.09 6.26L18 7L13 11.74L14.18 17.48L10 15.16L5.82 17.48L7 11.74L2 7L7.91 6.26L10 1Z" fill="#FFD700"/>
                        </svg>
                        SUPER
                      </div>
                    )}
                  </div>
                  <div className="meal-content-simplified">
                    <h3>{option.name}</h3>
                    <p className="meal-time">{option.time}</p>
                    <p className="meal-description">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="selection-summary">
              <h4>Your Selection:</h4>
              <div className="selected-meals">
                {planData.meals.map(mealId => {
                  const meal = mealOptions.find(m => m.id === mealId);
                  return <span key={mealId} className="meal-tag">{meal?.name}</span>;
                })}
              </div>
              {planData.meals.length > 0 && (
                <div className="pricing-preview">
                  <div className="price-info">
                    <span>Monthly: <strong>{formatCurrency(calculatePrice(planData.meals, 'monthly'))}/day</strong></span>
                    <span>Weekly: <strong>{formatCurrency(calculatePrice(planData.meals, 'weekly'))}/day</strong></span>
                  </div>
                </div>
              )}
              <p className="note">✅ You can select 1, 2, or 3 meals per day based on your needs</p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h2>Choose Your Plan Type</h2>
            <p>Select the plan that best fits your schedule</p>
            
            <div className="plan-options">
              <div 
                className={`plan-option ${planData.days.length === 5 && planData.days.includes('monday') && planData.days.includes('tuesday') && planData.days.includes('wednesday') && planData.days.includes('thursday') && planData.days.includes('friday') ? 'selected' : ''}`}
                onClick={() => {
                  updatePlanData({ days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] });
                }}
              >
                <div className="plan-header">
                  <h3>Executive Plan</h3>
                  <span className="plan-days">Monday - Friday</span>
                </div>
                <div className="plan-description">
                  <p>Perfect for working professionals</p>
                  <ul>
                    <li>5 days a week</li>
                    <li>Weekdays only</li>
                    <li>Ideal for office schedule</li>
                  </ul>
                </div>
              </div>

              <div 
                className={`plan-option ${planData.days.length === 7 ? 'selected' : ''}`}
                onClick={() => {
                  updatePlanData({ days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] });
                }}
              >
                <div className="plan-header">
                  <h3>Daily Plan</h3>
                  <span className="plan-days">Monday - Sunday</span>
                </div>
                <div className="plan-description">
                  <p>Complete meal solution</p>
                  <ul>
                    <li>7 days a week</li>
                    <li>Includes weekends</li>
                    <li>Full coverage</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="selection-summary">
              <h4>Selected Plan: {planData.days.length === 5 ? 'Executive Plan (Mon-Fri)' : planData.days.length === 7 ? 'Daily Plan (Mon-Sun)' : 'None selected'}</h4>
            </div>
          </div>
        );

      case 4:
        const mealPreview = getMealPreview(planData.diet, planData.meals, planData.days);
        return (
          <div className="step-content">
            <h2>Your Weekly Meal Calendar</h2>
            <p>Here's your personalized meal schedule based on your selections</p>
            
            <div className="meal-preview">
              {mealPreview.map((dayPreview, index) => (
                <div key={index} className="day-preview">
                  <h3>{dayPreview.day}</h3>
                  <div className="day-meals">
                    {dayPreview.meals.map((meal, mealIndex) => (
                      <div key={mealIndex} className="meal-preview-card">
                        <div className="meal-header">
                          <IconRenderer iconType={mealOptions.find(m => m.id === meal.type.toLowerCase())?.icon} size={18} />
                          <span className="meal-type">{meal.type}</span>
                        </div>
                        <h4>{meal.name}</h4>
                        <div className={`meal-type-badge ${meal.type === 'Veg Meal' ? 'veg-badge' : meal.type === 'Premium Meal' ? 'premium-badge' : 'mixed-badge'}`}>
                          {meal.type === 'Veg Meal' && <IconRenderer iconType="veg" size={14} />}
                          {meal.type === 'Premium Meal' && (
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                              <path d="M10 1L12.09 6.26L18 7L13 11.74L14.18 17.48L10 15.16L5.82 17.48L7 11.74L2 7L7.91 6.26L10 1Z" fill="#FFD700"/>
                            </svg>
                          )}
                          {meal.type.includes('Non-Veg') && <IconRenderer iconType="non-veg" size={14} />}
                          <span>{meal.type}</span>
                        </div>
                        <p className="meal-desc">{meal.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="preview-summary">
              <div className="summary-stats">
                <div className="stat-item">
                  <span className="stat-label">Selected Days:</span>
                  <span className="stat-value">{planData.days.length} days</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Meals per Day:</span>
                  <span className="stat-value">{planData.meals.length} meals</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Total Meals:</span>
                  <span className="stat-value">{planData.days.length * planData.meals.length} meals/week</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        const dailyPrice = calculatePrice(planData.meals, planData.planType || 'monthly');
        return (
          <div className="step-content">
            <h2>Choose Your Plan Type</h2>
            <p>Select between weekly or monthly pricing</p>
            
            <div className="plan-options">
              <div 
                className={`plan-card ${planData.planType === 'monthly' ? 'selected' : ''}`}
                onClick={() => updatePlanData({ planType: 'monthly' })}
              >
                <h3>Monthly Plan</h3>
                <div className="plan-price">{formatCurrency(calculatePrice(planData.meals, 'monthly'))}<span>/day</span></div>
                <ul>
                  <li>Better value for money</li>
                  <li>Consistent daily pricing</li>
                  <li>Monthly commitment</li>
                </ul>
              </div>
              
              <div 
                className={`plan-card ${planData.planType === 'weekly' ? 'selected' : ''}`}
                onClick={() => updatePlanData({ planType: 'weekly' })}
              >
                <h3>Weekly Plan</h3>
                <div className="plan-price">{formatCurrency(calculatePrice(planData.meals, 'weekly'))}<span>/day</span></div>
                <ul>
                  <li>More flexibility</li>
                  <li>Short-term commitment</li>
                  <li>Easy to adjust</li>
                </ul>
              </div>
            </div>
            
            {planData.planType && (
              <div className="price-summary">
                <h4>Your Plan Summary:</h4>
                <p>Daily Price: {formatCurrency(dailyPrice)}</p>
                <p>Weekly Cost: {formatCurrency(dailyPrice * planData.days.length)}</p>
              </div>
            )}
          </div>
        );

      case 6:
        // Only validate pincodes that are exactly 6 digits
        const homePincodeInfo = planData.homePincode && planData.homePincode.length === 6 ? getPincodeInfo(planData.homePincode) : null;
        const officePincodeInfo = planData.officePincode && planData.officePincode.length === 6 ? getPincodeInfo(planData.officePincode) : null;
        
        const handleHomeLocationSelect = (locationData) => {
          if (locationData) {
            const updates = {
              homeAddress: locationData.formattedAddress,
              homeArea: locationData.description,
              homePincode: locationData.pincode || ''
            };
            updatePlanData(updates);
          } else {
            updatePlanData({
              homeAddress: '',
              homeArea: '',
              homePincode: ''
            });
          }
        };

        const handleOfficeLocationSelect = (locationData) => {
          if (locationData) {
            updatePlanData({
              officeAddress: locationData.formattedAddress,
              officeArea: locationData.description,
              officePincode: locationData.pincode || ''
            });
          } else {
            updatePlanData({
              officeAddress: '',
              officeArea: '',
              officePincode: ''
            });
          }
        };

        return (
          <div className="step-content">
            <h2>Enter Your Location</h2>
            <p>Search for your locality to check delivery availability</p>
            

            
            <div className="location-form">
              <div className="address-section">
                <h3>🏠 Home Location</h3>
                <LocationSearch
                  onLocationSelect={handleHomeLocationSelect}
                  placeholder="Search for your home locality..."
                  className="location-search-home"
                  initialValue={planData.homeArea}
                  id="home-location-search"
                />
                
                {/* Manual pincode input if no pincode detected */}
                {planData.homeArea && (!planData.homePincode || planData.homePincode.length < 6) && (
                  <div className="manual-pincode-section">
                    <p className="pincode-note">📍 Pincode not detected automatically. Please enter your 6-digit pincode:</p>
                    <input
                      type="text"
                      placeholder="Enter 6-digit pincode"
                      value={planData.homePincode || ''}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        updatePlanData({ homePincode: value });
                      }}
                      className={`manual-pincode-input ${planData.homePincode && planData.homePincode.length === 6 ? 'complete' : ''}`}
                      maxLength="6"
                    />
                    {planData.homePincode && planData.homePincode.length < 6 && (
                      <p className="pincode-hint">Please enter all 6 digits to check delivery availability</p>
                    )}
                  </div>
                )}
                
                {homePincodeInfo && (
                  <div className={`pincode-feedback ${homePincodeInfo.isServiceable ? 'success' : 'error'}`}>
                    <div className="feedback-message">
                      {homePincodeInfo.message}
                    </div>
                    {homePincodeInfo.isServiceable && (
                      <div className="delivery-info">
                        <span className={`zone-badge zone-${homePincodeInfo.zone.toLowerCase().replace(/\s+/g, '-')}`}>{homePincodeInfo.zone}</span>
                        <span className="charge-info">Delivery: {homePincodeInfo.deliveryCharge === 0 ? 'FREE' : `₹${homePincodeInfo.deliveryCharge}/meal`}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="address-section">
                <h3>🏢 Office Location (Optional)</h3>
                <LocationSearch
                  onLocationSelect={handleOfficeLocationSelect}
                  placeholder="Search for your office locality..."
                  className="location-search-office"
                  initialValue={planData.officeArea}
                  id="office-location-search"
                />
                
                {/* Manual pincode input if no pincode detected */}
                {planData.officeArea && (!planData.officePincode || planData.officePincode.length < 6) && (
                  <div className="manual-pincode-section">
                    <p className="pincode-note">📍 Pincode not detected automatically. Please enter your 6-digit pincode:</p>
                    <input
                      type="text"
                      placeholder="Enter 6-digit pincode (Optional)"
                      value={planData.officePincode || ''}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        updatePlanData({ officePincode: value });
                      }}
                      className={`manual-pincode-input ${planData.officePincode && planData.officePincode.length === 6 ? 'complete' : ''}`}
                      maxLength="6"
                    />
                    {planData.officePincode && planData.officePincode.length < 6 && (
                      <p className="pincode-hint">Please enter all 6 digits to check delivery availability</p>
                    )}
                  </div>
                )}
                
                {officePincodeInfo && (
                  <div className={`pincode-feedback ${officePincodeInfo.isServiceable ? 'success' : 'error'}`}>
                    <div className="feedback-message">
                      {officePincodeInfo.message}
                    </div>
                    {officePincodeInfo.isServiceable && (
                      <div className="delivery-info">
                        <span className={`zone-badge zone-${officePincodeInfo.zone.toLowerCase().replace(/\s+/g, '-')}`}>{officePincodeInfo.zone}</span>
                        <span className="charge-info">Delivery: {officePincodeInfo.deliveryCharge === 0 ? 'FREE' : `₹${officePincodeInfo.deliveryCharge}/meal`}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 7:
        const isServicable = isPincodeServicable(planData.homePincode);
        const deliveryInfo = calculateDeliveryCharges(planData.homePincode);
        return (
          <div className="step-content">
            <h2>Delivery Information</h2>
            
            <div className="delivery-status">
              {isServicable ? (
                <div className="servicable">
                  <div className="status-icon">✅</div>
                  <h3>Great! We deliver to your area</h3>
                  <p>Pincode {planData.homePincode} is in our delivery zone</p>
                </div>
              ) : (
                <div className="not-servicable">
                  <div className="status-icon">❌</div>
                  <h3>Sorry, we don't deliver to your area yet</h3>
                  <p>We're working to expand our delivery zones</p>
                </div>
              )}
            </div>
            
            {isServicable && (
              <div className="delivery-charges">
                <h3>Delivery Charges</h3>
                <div className="charge-info">
                  <span className="range">Distance: {deliveryInfo.range} km</span>
                  <span className="charge">{deliveryInfo.label}</span>
                </div>
              </div>
            )}
          </div>
        );

      case 8:
        const finalPrice = calculatePrice(planData.meals, planData.planType);
        const weeklyTotal = finalPrice * planData.days.length;
        const deliveryCharges = calculateDeliveryCharges(planData.homePincode);
        const officeDeliveryCharges = planData.officePincode ? calculateDeliveryCharges(planData.officePincode) : null;
        const weeklyDeliveryCharges = deliveryCharges.charge * planData.days.length * planData.meals.length;
        const isServicableFinal = isPincodeServicable(planData.homePincode);
        
        return (
          <div className="step-content">
            <h2>Thank You for Your Interest!</h2>
            <p>We appreciate you taking the time to build your perfect meal plan</p>
            
            <div className="final-summary">
              <div className="summary-section">
                <h3>Your Plan Summary</h3>
                <p><strong>Diet:</strong> {dietOptions.find(d => d.id === planData.diet)?.name}</p>
                <p><strong>Meals:</strong> {planData.meals.join(', ')}</p>
                <p><strong>Plan Type:</strong> {planData.days.length === 5 ? 'Executive Plan (Mon-Fri)' : 'Daily Plan (Mon-Sun)'}</p>
                <p><strong>Billing:</strong> {planData.planType} Plan</p>
              </div>
              
              <div className="summary-section">
                <h3>🏠 Home Delivery Location</h3>
                <p>{planData.homeAddress}, {planData.homeArea}</p>
                <p>Pincode: {planData.homePincode}</p>
                {deliveryCharges && (
                  <p><strong>Delivery Zone:</strong> {deliveryCharges.zone}</p>
                )}
              </div>
              
              {planData.officeAddress && (
                <div className="summary-section">
                  <h3>🏢 Office Delivery Location</h3>
                  <p>{planData.officeAddress}, {planData.officeArea}</p>
                  <p>Pincode: {planData.officePincode}</p>
                  {officeDeliveryCharges && (
                    <p><strong>Delivery Zone:</strong> {officeDeliveryCharges.zone}</p>
                  )}
                </div>
              )}
              
              <div className="summary-section pricing-summary">
                <h3>💰 Complete Pricing Breakdown</h3>
                <div className="price-row">
                  <span>Daily Meal Cost ({planData.meals.length} meals)</span>
                  <span><strong>{formatCurrency(finalPrice)}</strong></span>
                </div>
                <div className="price-row">
                  <span>Weekly Meal Cost ({planData.days.length} days)</span>
                  <span><strong>{formatCurrency(weeklyTotal)}</strong></span>
                </div>
                {deliveryCharges && (
                  <>
                    <div className="price-row">
                      <span>Weekly Delivery Charges</span>
                      <span><strong>{weeklyDeliveryCharges === 0 ? 'FREE' : formatCurrency(weeklyDeliveryCharges)}</strong></span>
                    </div>
                    <div className="price-row total">
                      <span>Total Weekly Cost</span>
                      <span><strong>{formatCurrency(weeklyTotal + weeklyDeliveryCharges)}</strong></span>
                    </div>
                  </>
                )}
              </div>
              
              {deliveryCharges && (
                <div className="summary-section">
                  <h3>🚚 Delivery Information</h3>
                  <div className="delivery-breakdown">
                    <div className="location-charges">
                      <h4>🏠 Home Delivery</h4>
                      <p><strong>Per Meal:</strong> {deliveryCharges.charge === 0 ? 'FREE' : `₹${deliveryCharges.charge}`}</p>
                      <p><strong>Weekly Total:</strong> {weeklyDeliveryCharges === 0 ? 'FREE' : `₹${weeklyDeliveryCharges}`}</p>
                      <p className="delivery-note">({planData.meals.length} meals × {planData.days.length} days × {deliveryCharges.charge === 0 ? '₹0' : `₹${deliveryCharges.charge}`})</p>
                    </div>
                    
                    {officeDeliveryCharges && (
                      <div className="location-charges">
                        <h4>🏢 Office Delivery</h4>
                        <p><strong>Per Meal:</strong> {officeDeliveryCharges.charge === 0 ? 'FREE' : `₹${officeDeliveryCharges.charge}`}</p>
                        <p><strong>Weekly Total:</strong> {(officeDeliveryCharges.charge * planData.days.length * planData.meals.length) === 0 ? 'FREE' : `₹${officeDeliveryCharges.charge * planData.days.length * planData.meals.length}`}</p>
                        <p className="delivery-note">({planData.meals.length} meals × {planData.days.length} days × {officeDeliveryCharges.charge === 0 ? '₹0' : `₹${officeDeliveryCharges.charge}`})</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Conditional rendering for serviceable/non-serviceable */}
              {isServicableFinal ? (
                <div className="contact-message happy-message">
                  <div className="contact-icon">🎉</div>
                  <h3>Want to take a 3 day trial?? Sign up.</h3>
                  <div className="final-actions">
                    <button className="btn-primary" onClick={handleComplete}>
                      I'm happy, Sign Up!
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="contact-message">
                    <div className="contact-icon">📞</div>
                    <h3>Contact me when you expand to my area</h3>
                    <p>We're working hard to bring Myna Kitchen to your location. We'll notify you as soon as we start serving your area!</p>
                  </div>
                  <div className="final-actions">
                    <button className="btn-primary" onClick={handleComplete}>
                      Sign Up for Updates
                    </button>
                    <button className="btn-secondary" onClick={handleDecline}>
                      Maybe Later
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        );

      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="browse-plans">
      {renderProgressBar()}
      
      <div className="step-container">
        {renderStep()}
        
        <div className="step-navigation">
          {currentStep > 1 && (
            <button className="btn-secondary" onClick={prevStep}>
              ← Previous
            </button>
          )}
          
          {currentStep < totalSteps && (
            <>
              {/* Special handling for step 6 with non-serviceable pincode */}
              {currentStep === 6 && planData.homePincode && !isPincodeServicable(planData.homePincode) ? (
                <button 
                  className={`btn-primary ${!validateStep() ? 'disabled' : ''}`} 
                  onClick={nextStepForNonServiceable}
                  disabled={!validateStep()}
                >
                  View My Summary →
                </button>
              ) : (
                <button 
                  className={`btn-primary ${!validateStep() ? 'disabled' : ''}`} 
                  onClick={nextStep}
                  disabled={!validateStep()}
                >
                  Next →
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPlanConfig; 