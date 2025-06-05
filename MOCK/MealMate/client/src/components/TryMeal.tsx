import { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function TryMeal() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.email || !formData.address) {
      toast({
        title: "Form incomplete",
        description: "Please fill out all fields",
        variant: "destructive"
      });
      return;
    }
    
    // Form submission would go here
    toast({
      title: "Request Submitted!",
      description: "We'll contact you soon about your free meal.",
    });
    
    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: ""
    });
  };

  return (
    <section id="try-a-meal" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden section-fade"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4">Try Your First Meal</h2>
              <p className="text-gray-600 mb-6">Experience the convenience of delicious, home-style meals delivered to your doorstep.</p>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">Full Name</Label>
                    <Input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1">Phone Number</Label>
                    <Input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">Email Address</Label>
                    <Input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700 mb-1">Delivery Address</Label>
                    <Textarea 
                      id="address" 
                      name="address" 
                      value={formData.address}
                      onChange={handleChange}
                      rows={3} 
                      placeholder="Your delivery address"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-orange-600 text-white font-medium px-6 py-3.5 h-auto rounded-full shadow-md transition-colors"
                  >
                    Get Your Free Meal
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">By submitting, you agree to our Terms of Service and Privacy Policy.</p>
                </div>
              </form>
            </div>
            
            <div className="md:w-1/2 relative">
              <img 
                src="https://images.unsplash.com/photo-1543353071-087092ec393a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Delicious meal" 
                className="w-full h-full object-cover" 
                style={{ minHeight: "300px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <div className="mb-3 text-xl font-semibold">First Meal Free</div>
                  <p>Try our service with no commitment. Satisfaction guaranteed or your money back.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
