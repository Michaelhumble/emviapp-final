
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

  // Randomize the images on component mount
  useEffect(() => {
    const shuffleArray = (array: typeof heroImages) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    
    setRandomizedImages(shuffleArray(heroImages));
  }, []);

  useEffect(() => {
    // Auto-advance the carousel every 5 seconds for both mobile and desktop
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % randomizedImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [randomizedImages.length]);

  return (
    <div className="relative pt-24 pb-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFDFD] to-[#F6F6F6] z-0"></div>
      
      {/* Lighter glass frame effect - only as a subtle border */}
      <div className="absolute inset-0 md:m-4 backdrop-blur-[2px] bg-white/5 border border-white/40 rounded-lg shadow-lg z-10"></div>
      
      {/* Image carousel placed in front of glass background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-20">
        <HeroCarousel images={randomizedImages} activeIndex={activeIndex} isMobile={isMobile} />
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
