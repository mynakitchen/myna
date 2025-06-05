import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import FoodCarousel from '../components/FoodCarousel';
import Footer from '../components/Footer';

const Home = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Myna Kitchen - Delicious Home-Style Meals Delivered';
    
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const element = document.getElementById(href.substring(1));
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />
      <main>
        <FoodCarousel />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
