import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRICING_PLANS } from "@/lib/constants";

export default function Pricing() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="pricing" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 section-fade"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Your Budget</h2>
          <p className="text-xl text-gray-600">Transparent pricing with no hidden fees.</p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden relative transition-transform hover:scale-105 ${
                plan.popular ? "md:-mt-4 md:mb-4" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-accent text-white text-xs font-semibold px-4 py-1 uppercase rounded-bl-lg">
                  Popular
                </div>
              )}
              <div className="p-8 text-center border-b border-gray-100">
                <h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
                <div className="text-primary text-4xl font-bold">
                  ₹{plan.price}<span className="text-gray-400 text-lg font-normal">/day</span>
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="text-primary mr-3 h-5 w-5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 text-center">
                  <Button
                    onClick={() => scrollToSection('try-a-meal')}
                    className={`w-full ${
                      plan.popular 
                        ? "bg-accent hover:bg-orange-600" 
                        : "bg-primary hover:bg-primary/90"
                    } text-white font-medium py-6 h-auto rounded-full shadow-md transition-colors`}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
