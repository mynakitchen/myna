import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Cherry } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MenuItem {
  id: string;
  title: string;
  category: 'nonveg' | 'veg';
  description: string;
  price: number;
  spicyLevel: 'Mild' | 'Medium Spicy' | 'Spicy';
  imageSrc: string;
}

const DailyMenu = () => {
  const [activeTab, setActiveTab] = useState<string>('nonveg');
  
  const menuItems: MenuItem[] = [
    {
      id: 'monday',
      title: "Monday's Special",
      category: 'nonveg',
      description: "Butter Chicken with Garlic Naan, Jeera Rice, and Garden Salad",
      price: 120,
      spicyLevel: 'Spicy',
      imageSrc: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80"
    },
    {
      id: 'tuesday',
      title: "Tuesday's Special",
      category: 'nonveg',
      description: "Chicken Biryani with Raita, Mirchi Ka Salan, and Mixed Pickle",
      price: 120,
      spicyLevel: 'Spicy',
      imageSrc: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80"
    },
    {
      id: 'wednesday',
      title: "Wednesday's Special",
      category: 'nonveg',
      description: "Mutton Rogan Josh with Laccha Paratha, Pulao, and Mint Chutney",
      price: 120,
      spicyLevel: 'Medium Spicy',
      imageSrc: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?auto=format&fit=crop&q=80"
    },
    {
      id: 'thursday',
      title: "Thursday's Special",
      category: 'veg',
      description: "Paneer Butter Masala with Naan, Jeera Rice, and Fresh Salad",
      price: 120,
      spicyLevel: 'Medium Spicy',
      imageSrc: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80"
    },
    {
      id: 'friday',
      title: "Friday's Special",
      category: 'veg',
      description: "Dal Makhani with Butter Naan, Vegetable Pulao, and Raita",
      price: 120,
      spicyLevel: 'Mild',
      imageSrc: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80"
    },
    {
      id: 'weekend',
      title: "Weekend Special",
      category: 'veg',
      description: "Veg Biryani with Salan, Raita, and Sweet Chutney",
      price: 120,
      spicyLevel: 'Medium Spicy',
      imageSrc: "https://images.unsplash.com/photo-1596797038530-2c107aa7e1f3?auto=format&fit=crop&q=80"
    }
  ];

  const filteredItems = menuItems.filter(item => item.category === activeTab);

  return (
    <section id="daily-menu" className="py-16 bg-secondary section-fade">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Daily Menu</h2>
          <p className="text-xl text-gray-600">Never repeat a meal throughout the week!</p>
        </div>
        
        {/* Menu Categories Tabs */}
        <Tabs defaultValue="nonveg" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white rounded-full p-1 shadow-md">
              <TabsTrigger 
                value="nonveg" 
                className={cn(
                  "px-6 py-2 rounded-full text-gray-800 font-medium",
                  activeTab === 'nonveg' && "bg-primary text-white"
                )}
              >
                Non-Veg
              </TabsTrigger>
              <TabsTrigger 
                value="veg" 
                className={cn(
                  "px-6 py-2 rounded-full text-gray-800 font-medium",
                  activeTab === 'veg' && "bg-primary text-white"
                )}
              >
                Vegetarian
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="nonveg" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="veg" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* View More Button */}
        <div className="text-center mt-10">
          <Button 
            variant="outline" 
            className="px-8 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full font-medium"
          >
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

const MenuCard = ({ item }: { item: MenuItem }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={item.imageSrc} 
          alt={item.title} 
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{item.title}</h3>
          <span className="px-3 py-1 bg-accent bg-opacity-10 text-accent rounded-full text-sm font-medium">
            {item.category === 'nonveg' ? 'Non-Veg' : 'Veg'}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{item.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Cherry className="h-4 w-4 text-primary mr-1" />
            <span className="text-sm text-gray-500">{item.spicyLevel}</span>
          </div>
          <div className="text-primary font-semibold">₹{item.price}</div>
        </div>
      </div>
    </div>
  );
};

export default DailyMenu;
