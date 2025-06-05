import { Check } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface PlanProps {
  title: string;
  price: number;
  subtitle: string;
  features: string[];
}

const Plan = ({ title, price, subtitle, features }: PlanProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="flex items-end mb-4">
          <span className="text-3xl font-bold text-accent">{formatCurrency(price)}</span>
          <span className="text-gray-500 ml-1">/day</span>
        </div>
        <p className="text-gray-600 mb-6">{subtitle}</p>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <p className="text-sm text-center text-gray-500 italic">Prices include delivery.</p>
      </div>
    </div>
  );
};

const SubscriptionPlans = () => {
  const plans = [
    {
      title: "One Meal a Day",
      price: 120,
      subtitle: "Lunch or Dinner",
      features: [
        "Choose your meal of the day",
        "Minimum commitment"
      ]
    },
    {
      title: "Two Meals a Day",
      price: 220,
      subtitle: "Lunch and Dinner",
      features: [
        "Intermittent fasting friendly",
        "Non-veg & veg options"
      ]
    },
    {
      title: "Three Meals a Day",
      price: 250,
      subtitle: "Breakfast, Lunch and Dinner",
      features: [
        "Complete daily nutrition",
        "Best value for money"
      ]
    }
  ];

  return (
    <section id="subscription" className="py-16 bg-white section-fade">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Choose Your Plan</h2>
          <p className="text-xl text-gray-600">Select what best fits your lifestyle and budget.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={index === 1 ? "transform hover:-translate-y-2 transition-transform duration-300" : ""}
            >
              <Plan {...plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
