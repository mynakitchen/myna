import React from "react";
import './HowItWorks.css';

export default function HowItWorks() {
  const handleWhatsAppContact = () => {
    window.open('https://wa.me/918754467770?text=Hi%20there!%20I%20am%20interested%20in%20your%20meal%20plans.%20Could%20you%20please%20provide%20more%20details%3F', '_blank');
  };

  const handleButtonClick = (step) => {
    if (step.buttonLink) {
      window.open(step.buttonLink, '_blank');
    } else {
      // Fallback to WhatsApp contact for backward compatibility
      handleWhatsAppContact();
    }
  };


  
  // Helper function to get correct image path for deployment
  const getImagePath = (imagePath) => {
    // Remove leading slash if present
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    // Use PUBLIC_URL environment variable for GitHub Pages deployment
    return `${process.env.PUBLIC_URL}/${cleanPath}`;
  };

  const steps = [
    {
      number: "01",
      title: "Browse Plans",
      description: "Explore our delicious meal plans and find the perfect fit for your lifestyle and dietary needs.",
      accent: "#825F45", // Primary brown
      image: getImagePath("images/how-it-works/1.png"),
      imageAlt: "Browse meal plans interface showing various food options"
    },
    {
      number: "02",
      title: "Easy Registration",
      description: "Complete your registration using our simple form and receive your personalized user dashboard via email. Sign up takes just a few minutes and you'll get instant access to your account.",
      accent: "#D08C60", // Warm orange
      image: getImagePath("images/how-it-works/3.png"),
      imageAlt: "User registration form and dashboard preview",
      hasButton: true,
      buttonText: "Sign Up Now",
      buttonLink: "https://mynakitchen.in/SignUp"
    },
    {
      number: "03",
      title: "Manage Everything",
      description: "Use your personalized dashboard to manage everything - add or cancel subscriptions, change delivery addresses, order delicious add-ons, and customize your meal preferences all in one place.",
      accent: "#797D62", // Sage green
      image: getImagePath("images/how-it-works/4.png"),
      imageAlt: "User dashboard showing subscription management features"
    },
    {
      number: "04",
      title: "Stay Up to Date",
      description: "Stay up to date with our daily menu by joining the WhatsApp group. See fresh meal options every day and never miss out on your favorites.",
      accent: "#997B66", // Muted brown
      image: getImagePath("images/how-it-works/2.png"),
      imageAlt: "WhatsApp group interface showing daily menu updates",
      hasButton: true,
      buttonText: "Join WhatsApp Group",
      buttonLink: "https://chat.whatsapp.com/HURHax6vtqm0yuCno9ktOE"
    }
  ];

  // Individual step component
  const StepItem = ({ step, index, isLast }) => {
    return (
      <div className="relative flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
        {/* Step Number Circle - Reduced size */}
        <div className="relative flex-shrink-0 z-10">
          <div className="relative">
            <div 
              className="w-16 h-16 md:w-18 md:h-18 border-3 border-white bg-white shadow-xl flex items-center justify-center relative z-20 transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: step.accent }}
            >
              <span className="text-white font-black text-xl md:text-2xl tracking-tight">{step.number}</span>
            </div>
            
            {/* Modern glow effect */}
            <div 
              className="absolute inset-0 blur-lg opacity-15 -z-10"
              style={{ backgroundColor: step.accent }}
            />
          </div>
        </div>

        {/* Content Area - Reduced spacing */}
        <div className="flex-1 grid md:grid-cols-2 gap-6 md:gap-8 items-center w-full">
          {/* Image - Reduced size */}
          <div className="flex justify-center order-2 md:order-1">
            <div className="relative w-full max-w-xs">
              <div className="relative bg-white shadow-lg border border-gray-200 overflow-hidden group">
                {/* Modern corner accent */}
                <div 
                  className="absolute top-0 right-0 w-8 h-8 z-10 transition-all duration-300 group-hover:w-10 group-hover:h-10"
                  style={{ backgroundColor: step.accent }}
                />
                
                <img
                  src={step.image}
                  alt={step.imageAlt}
                  className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    console.error(`Failed to load image: ${step.image}`);
                    e.target.style.backgroundColor = '#f3f4f6';
                    e.target.style.display = 'flex';
                    e.target.style.alignItems = 'center';
                    e.target.style.justifyContent = 'center';
                    e.target.innerHTML = '📷 Image Loading...';
                  }}
                />
                
                {/* Modern overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>

          {/* Text Content - Reduced typography */}
          <div className="order-1 md:order-2 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
              {step.title}
            </h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 font-light">
              {step.description}
            </p>
            
            {/* Action Button - Reduced size */}
            {step.hasButton && (
              <button
                onClick={() => handleButtonClick(step)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-orange-600 text-white font-bold text-base border-2 border-gray-900 hover:border-orange-600 transition-all duration-300 shadow-lg hover:shadow-orange-500/25 uppercase tracking-wide mb-6 hover:scale-103 active:scale-97"
              >
                <span className="text-lg">
                  {step.buttonText === 'Sign Up Now' ? '📝' : '💬'}
                </span>
                <span>{step.buttonText || 'Contact on WhatsApp'}</span>
              </button>
            )}
            
            {/* Feature highlight - Reduced size */}
            <div className="flex items-center justify-center md:justify-start">
              <div 
                className="w-3 h-3 rotate-45 mr-3 shadow-sm" 
                style={{backgroundColor: step.accent}}
              />
              <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wide font-bold">
                {index === 0 && "Multiple Plans Available"}
                {index === 1 && "Instant Support Available"}
                {index === 2 && "Quick & Easy Process"}
                {index === 3 && "Complete Control & Flexibility"}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="how-it-works" className="relative bg-gray-50 overflow-hidden py-16">
      {/* Food emoji background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 left-16 text-4xl">🍛</div>
        <div className="absolute bottom-32 right-16 text-5xl">🍲</div>
        <div className="absolute top-1/2 left-1/3 text-3xl">🥘</div>
        <div className="absolute top-20 right-1/4 text-3xl">🍚</div>
        <div className="absolute bottom-20 left-1/4 text-4xl">🥗</div>
        <div className="absolute top-3/4 right-1/3 text-3xl">🍜</div>
      </div>
      
      {/* Header Section */}
      <div className="container mx-auto px-4 sm:px-6 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight leading-none">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            From browsing to enjoying delicious meals at your doorstep — we've made it incredibly simple in just 4 easy steps.
          </p>
        </div>
      </div>

      {/* Main Steps Container with modern square design */}
      <div className="container mx-auto px-4 sm:px-6 md:px-6 relative z-10">
        <div className="relative">
          {/* Modern square background with artistic elements */}
          <div className="relative bg-white shadow-2xl border border-gray-200 overflow-hidden">
            {/* Artistic corner accents */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-500 opacity-10"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-brown-400 to-brown-500 opacity-10"></div>
            <div className="absolute top-1/4 right-0 w-16 h-48 bg-gradient-to-l from-yellow-300 to-yellow-400 opacity-5"></div>
            
            {/* Tokyo-style geometric pattern overlay */}
            <div className="absolute inset-0 opacity-[0.02]">
              <div className="grid grid-cols-12 h-full">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="border-r border-gray-900 last:border-r-0"></div>
                ))}
              </div>
            </div>
            
            {/* Modern accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-gray-900 via-orange-500 to-brown-600"></div>
            
            <div className="p-6 md:p-8 lg:p-10">
              <div className="space-y-16 md:space-y-20">
                {steps.map((step, index) => (
                  <StepItem 
                    key={index}
                    step={step} 
                    index={index}
                    isLast={index === steps.length - 1}
                  />
                ))}
              </div>
            </div>
            
            {/* Bottom accent */}
            <div className="h-1 w-full bg-gradient-to-r from-brown-600 via-orange-500 to-gray-900"></div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div id="start-food-journey" className="container mx-auto px-4 sm:px-6 md:px-6 pt-16 relative z-10">
        <div className="text-center">
          <div className="bg-white shadow-2xl max-w-3xl mx-auto overflow-hidden relative border border-gray-200">
            {/* Modern accent design */}
            <div className="h-2 w-full bg-gradient-to-r from-gray-900 via-orange-500 to-brown-600"></div>
            
            {/* Tokyo-style artistic background elements */}
            <div className="absolute inset-0 opacity-15">
              {/* Origami-inspired triangular shapes */}
              <div className="absolute top-8 left-8 w-0 h-0 border-l-[16px] border-r-[16px] border-b-[28px] border-l-transparent border-r-transparent border-b-orange-500 rotate-12"></div>
              <div className="absolute bottom-8 right-8 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[35px] border-l-transparent border-r-transparent border-t-brown-500 -rotate-12"></div>
              
              {/* Tokyo geometric patterns */}
              <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2">
                <div className="relative w-12 h-12">
                  <div className="absolute w-full h-full bg-gray-900 rotate-45"></div>
                  <div className="absolute w-6 h-6 bg-orange-400 rotate-45 top-3 left-3"></div>
                </div>
              </div>
              
              {/* Artistic line patterns */}
              <div className="absolute top-6 right-1/3 w-16 h-1 bg-brown-400 rotate-45"></div>
              <div className="absolute top-8 right-1/3 w-12 h-1 bg-orange-400 rotate-45"></div>
              <div className="absolute bottom-6 left-1/3 w-20 h-1 bg-gray-900 -rotate-45"></div>
              
              {/* Dot matrix pattern */}
              <div className="absolute bottom-1/4 right-1/4 grid grid-cols-3 gap-1">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <div className="w-2 h-2 bg-brown-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                <div className="w-2 h-2 bg-brown-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              </div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-2xl">🎧</span>
                <span className="text-sm font-medium bg-primary/20 text-primary px-4 py-1.5 rounded-full">
                  Customer Care Support
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Need Help or Have Queries?</h3>
              <p className="text-gray-600 mb-8">
                Connect with us on WhatsApp for any queries, personalized requirements, and enquiries. Our team is here to help you with all your meal planning needs.
              </p>
              
              <button
                onClick={handleWhatsAppContact}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 hover:scale-103 active:scale-97"
              >
                <span className="text-xl">💬</span>
                <span>Contact Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 