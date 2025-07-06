import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faClock, faTruck, faMapMarkerAlt, faRupeeSign } from '@fortawesome/free-solid-svg-icons';

const FAQ_ITEMS = [
  {
    id: "faq-1",
    question: "How does meal delivery work?",
    answer: "We deliver fresh, home-style meals to your doorstep daily. Choose your preferred delivery location during signup, and our team will ensure your meals arrive hot and ready to enjoy.",
    icon: faTruck,
    accent: '#825F45'
  },
  {
    id: "faq-2", 
    question: "What are your delivery timings?",
    answer: "We deliver meals during three time slots: Breakfast between 7:30 AM - 9:00 AM, Lunch between 11:30 AM - 1:00 PM, and Dinner between 7:00 PM - 8:30 PM.",
    icon: faClock,
    accent: '#D08C60'
  },
  {
    id: "faq-3",
    question: "How much are the delivery charges?",
    answer: "Delivery is free within 8 km. For distances between 8-12 km, we charge ₹10 per delivery. For 12-16 km, it's ₹15 per delivery, and for 16-20 km, it's ₹20 per delivery.",
    icon: faRupeeSign,
    accent: '#797D62'
  },
  {
    id: "faq-4",
    question: "How do I place a preorder?",
    answer: "Follow our daily menu through our WhatsApp group to stay updated on available meals. Once you see the menu, simply place your order through your personalized user link for hassle-free ordering.",
    icon: faMapMarkerAlt,
    accent: '#997B66'
  },
  {
    id: "faq-5",
    question: "What if I'm not available during delivery?",
    answer: "You can change your delivery location or cancel your order up to 4 hours before the scheduled delivery time. Alternatively, you can opt to have your food delivered in a delivery bag outside your gate for convenience.",
    icon: faClock,
    accent: '#825F45'
  },
  {
    id: "faq-6", 
    question: "Can I customize my meal preferences?",
    answer: "Absolutely! You can select vegetarian or non-vegetarian options, specify dietary restrictions, and choose from our rotating weekly menu that caters to various tastes and preferences.",
    icon: faTruck,
    accent: '#D08C60'
  },
  {
    id: "faq-7",
    question: "How do I pause or cancel my subscription?",
    answer: "You can pause or cancel your subscription anytime through your account dashboard. For pauses, we need 24 hours notice. Cancellations can be done 4 hours prior to usual delivery time.",
    icon: faMapMarkerAlt,
    accent: '#797D62'
  },
  {
    id: "faq-8",
    question: "What are your delivery areas?",
    answer: "We currently deliver across OMR, Chennai, and surrounding areas. Enter your pincode during signup to confirm if we deliver to your location.",
    icon: faMapMarkerAlt,
    accent: '#997B66'
  },
  {
    id: "faq-9",
    question: "Are the meals prepared fresh daily?",
    answer: "Yes! All our meals are prepared fresh on the day of delivery using high-quality ingredients. We don't use any preservatives and ensure maximum freshness and taste.",
    icon: faTruck,
    accent: '#825F45'
  },
  {
    id: "faq-10",
    question: "Do you offer trial packages?",
    answer: "Yes! Customers can take a 3-day trial package at the price of our monthly package. The decision to continue is completely up to the customer after experiencing our service.",
    icon: faRupeeSign,
    accent: '#D08C60'
  }
];

const FAQ = () => {
  const sectionRef = useRef(null);

  return (
    <section 
      className="py-14 md:py-20 overflow-hidden" 
      style={{ 
        backgroundColor: '#F5F1EB'
      }}
    >
      <div ref={sectionRef} className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14 relative">
          {/* Background Eyes - Large Decorative Element */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30"
            style={{ zIndex: 0 }}
          >
            <div className="w-48 h-32 md:w-80 md:h-52 lg:w-96 lg:h-60 relative">
              {/* Eyes SVG - Large Background */}
              <svg 
                viewBox="0 0 120 60" 
                className="w-full h-full opacity-30"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Left Eye */}
                <ellipse cx="25" cy="30" rx="20" ry="25" fill="white" stroke="black" strokeWidth="2"/>
                <circle cx="25" cy="30" r="8" fill="black"/>
                <circle cx="27" cy="28" r="2" fill="white"/>
                
                {/* Right Eye */}
                <ellipse cx="95" cy="30" rx="20" ry="25" fill="white" stroke="black" strokeWidth="2"/>
                <circle cx="95" cy="30" r="8" fill="black"/>
                <circle cx="97" cy="28" r="2" fill="white"/>
              </svg>
            </div>
          </div>

          {/* Mobile Layout - Stacked */}
          <div className="block md:hidden relative" style={{ zIndex: 1 }}>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
              Questions?
            </h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                Look Here.
              </h2>
            </div>
          </div>

          {/* Desktop Layout - Horizontal */}
          <div className="hidden md:flex items-center justify-center gap-4 lg:gap-6 mb-3 lg:mb-5 relative" style={{ zIndex: 1 }}>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tight">
              Questions?
            </h2>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tight">
              Look Here.
            </h2>
          </div>

          <p className="text-sm md:text-base lg:text-lg text-gray-600 font-medium max-w-2xl mx-auto relative" style={{ zIndex: 1 }}>
            Everything you need to know about our meal delivery service, clearly explained
          </p>
        </div>
        
        {/* FAQ Items - Single Column */}
        <div className="max-w-4xl mx-auto space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <div key={item.id}>
              <FAQItem 
                question={item.question} 
                answer={item.answer}
                icon={item.icon}
                accent={item.accent}
              />
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="text-center mt-10 md:mt-14">
          <div className="inline-flex items-center space-x-4 text-gray-500">
            <div className="w-10 md:w-14 h-px bg-gray-300"></div>
            <span className="text-xs md:text-sm uppercase tracking-widest font-bold">Myna Kitchen</span>
            <div className="w-10 md:w-14 h-px bg-gray-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

function FAQItem({ question, answer, icon, accent }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      {/* Main Card */}
      <div className="bg-white/95 border-2 border-black shadow-sm overflow-hidden relative hover:-translate-y-0.5 transition-transform duration-150">
        {/* Ultra-thin accent line */}
        <div 
          className="h-px w-full" 
          style={{backgroundColor: accent}}
        ></div>
        
        {/* Very light background pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{background: `radial-gradient(circle at 80% 20%, ${accent} 0%, transparent 50%)`}}
        ></div>
        
        {/* Content */}
        <div className="relative">
          <button
            className="flex w-full items-center justify-between text-left py-2 px-3 md:py-2.5 md:px-4 group-hover:bg-gray-50/20 transition-colors duration-150"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center space-x-2.5 md:space-x-3 flex-1 min-h-0">
              {/* Tiny Icon */}
              <div 
                className="w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center border border-black flex-shrink-0"
                style={{backgroundColor: `${accent}08`}}
              >
                <FontAwesomeIcon 
                  icon={icon} 
                  className="w-2.5 h-2.5 md:w-3 md:h-3"
                  style={{color: accent}}
                />
              </div>
              
              {/* Question - Minimal padding */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base font-semibold text-black group-hover:text-gray-700 transition-colors duration-150 leading-tight tracking-tight line-height-tight">
                  {question}
                </h3>
              </div>
            </div>
            
            {/* Tiny Chevron */}
            <div
              className={`flex-shrink-0 ml-2 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
            >
              <div 
                className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-150"
                style={{backgroundColor: isOpen ? accent : 'white'}}
              >
                <FontAwesomeIcon 
                  icon={faChevronDown} 
                  className="text-xs"
                  style={{color: isOpen ? 'white' : 'black'}}
                />
              </div>
            </div>
          </button>
          
          {/* Answer Section */}
          <div
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
              isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-3 md:px-4 pb-2.5 md:pb-3">
              <div className="pl-8.5 md:pl-10 border-l border-gray-200 ml-3 md:ml-3.5">
                <p className="text-gray-800 leading-snug text-xs md:text-sm pl-2.5 md:pl-3">
                  {answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Minimal floating shadow */}
      <div 
        className="absolute -bottom-0.5 -right-0.5 w-full h-full border border-gray-300 -z-10"
        style={{backgroundColor: `${accent}005`}}
      ></div>
    </div>
  );
} 