import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Utensils, 
  Truck, 
  CalendarCheck, 
  Timer,
  BadgePlus,
  Heart
} from "lucide-react";

export default function Features() {
  // Create refs for each feature section
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  
  // Track if sections are in view
  const isInView1 = useInView(ref1, { once: true, amount: 0.3 });
  const isInView2 = useInView(ref2, { once: true, amount: 0.3 });
  const isInView3 = useInView(ref3, { once: true, amount: 0.3 });
  const isInView4 = useInView(ref4, { once: true, amount: 0.3 });

  return (
    <section id="food-philosophy" className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              Our Food Philosophy
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Homely, fresh, delivered to your doorstep with passion and care.
            </p>
          </motion.div>
        </div>

        {/* Apple-style feature scrolling sections */}
        <div className="space-y-32 md:space-y-64">
          {/* Feature 1 */}
          <div ref={ref1} className="relative">
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-between gap-12"
              initial={{ opacity: 0 }}
              animate={isInView1 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <motion.div 
                className="w-full md:w-1/2 order-2 md:order-1"
                initial={{ x: -100 }}
                animate={isInView1 ? { x: 0 } : { x: -100 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="text-primary mb-4">
                  <Utensils className="w-10 h-10" />
                </div>
                <h3 className="font-semibold text-2xl md:text-3xl mb-4">Meals and Supermeals</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Enjoy a perfectly balanced selection of meals throughout the day. From nutritionally dense Supermeals to satisfying Easy Meals, we have your day covered with delicious options that keep you energized and focused.
                </p>
                <div className="mt-6 flex items-center">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                    Optimized nutrition
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full mx-2"></span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                    Balanced for energy
                  </span>
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full md:w-1/2 order-1 md:order-2 relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView1 ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
                  <img 
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" 
                    alt="Balanced meals throughout the day"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay with lifestyle information */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent flex flex-col justify-end p-6">
                    <div className="text-white text-sm md:text-base">
                      <div className="flex items-center mb-2">
                        <Heart className="w-4 h-4 mr-2" />
                        <span className="font-medium">Save time, reduce stress</span>
                      </div>
                      <p className="text-white/90 text-xs md:text-sm">
                        Focus on your life and work while we take care of your meals
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Floating accent */}
                <motion.div 
                  className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-xl -z-10"
                  animate={{ 
                    scale: [1, 1.2, 1], 
                    opacity: [0.3, 0.5, 0.3] 
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                ></motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Feature 2 */}
          <div ref={ref2} className="relative">
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-between gap-12"
              initial={{ opacity: 0 }}
              animate={isInView2 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <motion.div 
                className="w-full md:w-1/2 relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView2 ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
                  <img 
                    src="https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" 
                    alt="Delivery person serving food to customer"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay with time-saving information */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent flex flex-col justify-end p-6">
                    <div className="text-white text-sm md:text-base">
                      <div className="flex items-center mb-2">
                        <BadgePlus className="w-4 h-4 mr-2" />
                        <span className="font-medium">On-time delivery guarantee</span>
                      </div>
                      <p className="text-white/90 text-xs md:text-sm">
                        Meals arrive right when you need them
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Floating accent */}
                <motion.div 
                  className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-xl -z-10"
                  animate={{ 
                    scale: [1, 1.3, 1], 
                    opacity: [0.2, 0.4, 0.2] 
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                ></motion.div>
              </motion.div>
              
              <motion.div 
                className="w-full md:w-1/2"
                initial={{ x: 100 }}
                animate={isInView2 ? { x: 0 } : { x: 100 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="text-primary mb-4">
                  <Truck className="w-10 h-10" />
                </div>
                <h3 className="font-semibold text-2xl md:text-3xl mb-4">Punctual Free Delivery</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Your meals arrive at your place right on time, always fresh and ready to enjoy. We've eliminated delivery charges completely, regardless of your order size. Our dedicated delivery team ensures your food arrives in perfect condition.
                </p>
                <div className="mt-6 flex items-center">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                    Zero delivery fees
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full mx-2"></span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                    On-time guarantee
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Feature 3 */}
          <div ref={ref3} className="relative">
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-between gap-12"
              initial={{ opacity: 0 }}
              animate={isInView3 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <motion.div 
                className="w-full md:w-1/2 order-2 md:order-1"
                initial={{ x: -100 }}
                animate={isInView3 ? { x: 0 } : { x: -100 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="text-primary mb-4">
                  <CalendarCheck className="w-10 h-10" />
                </div>
                <h3 className="font-semibold text-2xl md:text-3xl mb-4">Flexible Subscription</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Choose the days of the week you need food - weekdays, everyday, or specific days. You can also change your delivery location between home and office as needed. Our subscription is designed to adapt to your lifestyle, providing ultimate <span className="font-semibold text-primary">CONVENIENCE</span>.
                </p>
                <div className="mt-6 flex items-center">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                    Cancel anytime
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full mx-2"></span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                    Full refunds
                  </span>
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full md:w-1/2 order-1 md:order-2 relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView3 ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
                  <img 
                    src="https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" 
                    alt="Calendar with selected dates"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay with subscription flexibility info */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent flex flex-col justify-end p-6">
                    <div className="text-white text-sm md:text-base">
                      <div className="flex items-center mb-2">
                        <CalendarCheck className="w-4 h-4 mr-2" />
                        <span className="font-medium">Choose your delivery days</span>
                      </div>
                      <p className="text-white/90 text-xs md:text-sm">
                        Weekdays, everyday, or specific days - it's up to you
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Floating accent */}
                <motion.div 
                  className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-xl -z-10"
                  animate={{ 
                    scale: [1, 1.2, 1], 
                    opacity: [0.3, 0.5, 0.3] 
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                ></motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Feature 4 */}
          <div ref={ref4} className="relative">
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-between gap-12"
              initial={{ opacity: 0 }}
              animate={isInView4 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <motion.div 
                className="w-full md:w-1/2 relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView4 ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
                  <img 
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" 
                    alt="Fresh ingredients for healthy meals"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay with freshness information */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent flex flex-col justify-end p-6">
                    <div className="text-white text-sm md:text-base">
                      <div className="flex items-center mb-2">
                        <Heart className="w-4 h-4 mr-2" />
                        <span className="font-medium">No additives or preservatives</span>
                      </div>
                      <p className="text-white/90 text-xs md:text-sm">
                        Prepared by passionate chefs with food engineering
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Floating accent */}
                <motion.div 
                  className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-xl -z-10"
                  animate={{ 
                    scale: [1, 1.3, 1], 
                    opacity: [0.2, 0.4, 0.2] 
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                ></motion.div>
              </motion.div>
              
              <motion.div 
                className="w-full md:w-1/2"
                initial={{ x: 100 }}
                animate={isInView4 ? { x: 0 } : { x: 100 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="text-primary mb-4">
                  <Timer className="w-10 h-10" />
                </div>
                <h3 className="font-semibold text-2xl md:text-3xl mb-4">Freshly Prepared Meals</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Every meal is prepared with healthy, fresh ingredients by our passionate chefs who understand food engineering. No artificial additives, just wholesome nutrition that supports your lifestyle by reducing meal prep time, eliminating kitchen cleanup, and providing the ultimate <span className="font-semibold text-primary">CONVENIENCE</span> you deserve.
                </p>
                <div className="mt-6 flex items-center">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                    Fresh ingredients
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full mx-2"></span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                    No preservatives
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
