import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  ChefHat, 
  CalendarCheck, 
  Truck, 
  Utensils,
  MessageCircle,
  ThumbsUp
} from "lucide-react";

export default function HowItWorks() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  
  const steps = [
    {
      number: 1,
      title: "Browse & Select",
      description: "Explore our diverse menu of delicious meals curated by expert chefs. Choose meals that match your taste and dietary preferences.",
      icon: <ChefHat className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
    },
    {
      number: 2,
      title: "Schedule Your Delivery",
      description: "Select your preferred delivery times and locations. We deliver to homes and offices throughout the IT corridor.",
      icon: <CalendarCheck className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
    },
    {
      number: 3,
      title: "Doorstep Delivery",
      description: "Receive your freshly prepared meals right at your doorstep. Our delivery team ensures your food arrives in perfect condition.",
      icon: <Truck className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1529565214304-a882ebc5a8e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
    },
    {
      number: 4,
      title: "Enjoy Your Meal",
      description: "Simply unpack and enjoy your delicious, home-style meal. No preparation or cleanup required - just pure enjoyment.",
      icon: <Utensils className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-gradient-to-b from-secondary/50 to-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Experience a seamless journey from selection to satisfaction with our simple process.
            </p>
          </motion.div>
        </div>

        <div ref={containerRef} className="relative">
          {/* Interactive timeline */}
          <div className="absolute top-24 md:top-36 left-4 md:left-1/2 h-[calc(100%-8rem)] md:h-auto md:w-[calc(100%-8rem)] border-l-2 md:border-l-0 md:border-t-2 border-primary/30 md:transform md:-translate-x-1/2 z-0"></div>
          
          <div className="space-y-24 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Step number with pulse effect */}
                <div className="absolute top-0 left-0 md:left-1/2 md:top-0 transform translate-x-3 md:-translate-x-1/2 md:-translate-y-8 z-10">
                  <div className="relative">
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                      {step.number}
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/30"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 0.3, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    ></motion.div>
                  </div>
                </div>

                <div className="pt-6 pl-12 md:pl-0 md:pt-12 md:px-4">
                  {/* Step image */}
                  <div className="mb-6 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-48 md:h-56 object-cover"
                    />
                  </div>
                  
                  {/* Step content */}
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <div className="text-primary mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Try our 3-day trial */}
        <motion.div 
          className="mt-24 md:mt-32 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="md:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <ThumbsUp className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium bg-primary/20 text-primary px-3 py-1 rounded-full">
                No commitment needed
              </span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Try Our 3-Day Trial</h3>
            <p className="text-gray-600 mb-6">
              Experience our service with our 3-day trial period at the same price as a regular subscription. 
              No strings attached - if you're not completely satisfied, simply cancel with no questions asked.
            </p>
            
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-gray-500" />
              <span className="text-gray-500 text-sm">
                Over 90% of trial customers continue their subscription
              </span>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <motion.div 
              className="bg-white rounded-xl overflow-hidden shadow-xl max-w-md"
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" 
                alt="Try our meal service" 
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h4 className="font-semibold text-lg mb-2">What you'll get:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary rounded-full p-1 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>3 days of delicious meals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary rounded-full p-1 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Regular pricing with no markup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary rounded-full p-1 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Full access to all menu options</span>
                  </li>
                </ul>
                
                <button 
                  className="mt-6 w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Start Your Trial
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
