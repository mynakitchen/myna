import { Drumstick, Truck, CalendarCheck, Flame } from 'lucide-react';

const FoodPhilosophy = () => {
  const features = [
    {
      icon: <Drumstick className="w-7 h-7 text-primary" />,
      title: "For Meat Enthusiasts",
      description: "Savor premium non-vegetarian dishes 5 days a week. Enjoy a mix of North and South Indian recipes."
    },
    {
      icon: <Truck className="w-7 h-7 text-primary" />,
      title: "Free Delivery",
      description: "Your meals arrive at your place right on time, always fresh. Zero delivery charges, regardless of order size."
    },
    {
      icon: <CalendarCheck className="w-7 h-7 text-primary" />,
      title: "Flexible Subscription",
      description: "Choose daily or weekday plans. Refund your cancelled meals. Select exactly what works for your schedule and budget."
    },
    {
      icon: <Flame className="w-7 h-7 text-primary" />,
      title: "Freshly Prepared Meals",
      description: "Cooked just one hour before delivery. No added preservatives. Just like home-cooked meals you love."
    }
  ];

  return (
    <section id="about" className="py-16 bg-secondary section-fade">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Food Philosophy</h2>
          <p className="text-xl text-gray-600">Homely, fresh, at your place.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodPhilosophy;
