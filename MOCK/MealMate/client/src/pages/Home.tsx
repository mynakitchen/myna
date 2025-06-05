import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import ExploreMenu from "@/components/ExploreMenu";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import DeliveryMap from "@/components/DeliveryMap";
import FAQ from "@/components/FAQ";
import TryMeal from "@/components/TryMeal";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    // Add IntersectionObserver for fade-in animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Apply to any .section-fade elements
    document.querySelectorAll('.section-fade').forEach(section => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-white overflow-x-hidden">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <ExploreMenu />
      <Pricing />
      <Testimonials />
      <DeliveryMap />
      <FAQ />
      <TryMeal />
      <Footer />
    </div>
  );
}
