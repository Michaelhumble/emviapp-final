
import { useState, useEffect } from "react";
import HeroCarousel from "./hero/HeroCarousel";
import FloatingParticles from "./hero/FloatingParticles";
import HeroContent from "./hero/HeroContent";
import ScrollIndicator from "./hero/ScrollIndicator";
import { heroImages } from "./hero/heroData";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [randomizedImages, setRandomizedImages] = useState([...heroImages]);
  const isMobile = useIsMobile();

  // Randomize the images on component mount with intelligent categorization
  useEffect(() => {
    const categorizeAndRandomize = (array: typeof heroImages) => {
      // Clone the array to avoid mutating the original
      const images = [...array];
      
      // Group images by category
      const categories: {[key: string]: typeof heroImages} = {};
      images.forEach(img => {
        const alt = img.alt.toLowerCase();
        let category = 'other';
        
        if (alt.includes('nail')) category = 'nail';
        else if (alt.includes('hair')) category = 'hair';
        else if (alt.includes('spa') || alt.includes('massage')) category = 'spa';
        else if (alt.includes('makeup')) category = 'makeup';
        else if (alt.includes('barber')) category = 'barber';
        
        if (!categories[category]) categories[category] = [];
        categories[category].push(img);
      });
      
      // Create a balanced sequence alternating between categories
      const result: typeof heroImages = [];
      const categoryKeys = Object.keys(categories);
      let maxLength = 0;
      
      // Find the category with the most images
      categoryKeys.forEach(key => {
        if (categories[key].length > maxLength) maxLength = categories[key].length;
      });
      
      // Create a balanced sequence
      for (let i = 0; i < maxLength; i++) {
        for (const key of categoryKeys) {
          if (categories[key][i]) {
            result.push(categories[key][i]);
          }
        }
      }
      
      return result;
    };
    
    setRandomizedImages(categorizeAndRandomize(heroImages));
  }, []);

  useEffect(() => {
    // Auto-advance the carousel every 5 seconds
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % randomizedImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [randomizedImages.length]);

  return (
    <div className="relative pt-24 pb-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C] to-[#221F26] z-0"></div>
      
      {/* Enhanced glass frame effect */}
      <div className="absolute inset-0 md:m-4 backdrop-blur-[2px] bg-white/5 border border-white/40 rounded-lg shadow-lg z-10"></div>
      
      {/* Image carousel with enhanced positioning */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-20">
        <HeroCarousel images={randomizedImages} activeIndex={activeIndex} />
      </div>

      {/* Floating particles animation */}
      <FloatingParticles />

      {/* Content container with proper z-index to appear on top */}
      <HeroContent 
        activeIndex={activeIndex} 
        setActiveIndex={setActiveIndex} 
        heroImages={randomizedImages} 
        isMobile={isMobile}
      />
      
      {/* Scroll down indicator */}
      <ScrollIndicator />
    </div>
  );
};

export default Hero;
