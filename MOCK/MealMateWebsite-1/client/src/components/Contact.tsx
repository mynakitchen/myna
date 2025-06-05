import { Building, Phone, Mail, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const deliveryAreas = [
    "Whitefield", 
    "Marathahalli", 
    "Kadugodi", 
    "ITPL Area"
  ];

  return (
    <section id="contact" className="py-16 bg-white section-fade">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Have questions about our meal plans or delivery areas? Send us a message and we'll get back to you soon.
            </p>
            
            <form className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" placeholder="Your name" className="rounded-lg" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Your email address" className="rounded-lg" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input type="tel" id="phone" placeholder="Your phone number" className="rounded-lg" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  rows={4} 
                  placeholder="How can we help you?" 
                  className="rounded-lg resize-none" 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full sm:w-auto px-6 py-6 bg-primary text-white rounded-full font-medium hover:bg-primary/90"
              >
                Send Message
              </Button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Delivery Areas</h2>
            <p className="text-gray-600 mb-8">We currently serve the following areas in Bangalore:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {deliveryAreas.map((area, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Building className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>info@mynakitchen.in</span>
              </div>
              <div className="flex items-start space-x-3">
                <Globe className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>www.mynakitchen.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
