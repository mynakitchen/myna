import ThreeDCarousel from './ThreeDCarousel';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1596797038530-2c107aa7e1f3?auto=format&fit=crop&q=80",
      alt: "Homemade Indian meal with rice and curry"
    },
    {
      src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80",
      alt: "Indian thali with multiple dishes"
    },
    {
      src: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80",
      alt: "Homemade curry with naan bread"
    },
    {
      src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80",
      alt: "Traditional Indian meal being delivered"
    },
    {
      src: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?auto=format&fit=crop&q=80",
      alt: "Food delivery service package"
    }
  ];

  return (
    <section id="home" className="pt-28 md:pt-32 pb-12 md:pb-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Content */}
          <div className="w-full md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-8 section-fade">
            <div className="inline-block px-4 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium mb-6">
              FREE DELIVERY
            </div>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-3">Delicious Meals. Zero Hassle.</h2>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-5">Food Sorted. Life's Sorted.</h1>
            <p className="text-lg text-gray-600 mb-8">
              With us you no longer have to run a kitchen, manage groceries or worry about your daily food.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-6 rounded-full"
              >
                <a href="#daily-menu">Explore Combos</a>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium px-6 py-6 rounded-full"
              >
                <a href="#subscription">View Subscriptions</a>
              </Button>
            </div>
          </div>
          
          {/* Right Content - 3D Carousel */}
          <div className="w-full md:w-1/2 section-fade">
            <ThreeDCarousel images={carouselImages} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
