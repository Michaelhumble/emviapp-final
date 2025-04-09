
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

  // Randomize the images on component mount, but prioritize nail images
  useEffect(() => {
    const prioritizeNailImages = (array: typeof heroImages) => {
      // Separate nail-related images and other images
      const nailImages = array.filter(img => 
        img.alt.toLowerCase().includes('nail') || 
        img.alt.toLowerCase().includes('manicure') || 
        img.alt.toLowerCase().includes('polish')
      );
      
      const otherImages = array.filter(img => 
        !img.alt.toLowerCase().includes('nail') && 
        !img.alt.toLowerCase().includes('manicure') && 
        !img.alt.toLowerCase().includes('polish')
      );
      
      // Shuffle both arrays
      const shuffleArray = (arr: typeof heroImages) => {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      };
      
      const shuffledNailImages = shuffleArray(nailImages);
      const shuffledOtherImages = shuffleArray(otherImages);
      
      // Interleave the arrays, prioritizing nail images (roughly 50% of the result)
      const result = [];
      const maxLength = Math.max(shuffledNailImages.length, shuffledOtherImages.length);
      
      // First image should always be a nail image to set the right first impression
      if (shuffledNailImages.length > 0) {
        result.push(shuffledNailImages[0]);
      }
      
      for (let i = 0; i < maxLength; i++) {
        // Add a nail image (if available, starting from index 1 since we used index 0 above)
        if (i + 1 < shuffledNailImages.length) {
          result.push(shuffledNailImages[i + 1]);
        }
        
        // Add a non-nail image (if available)
        if (i < shuffledOtherImages.length) {
          result.push(shuffledOtherImages[i]);
        }
      }
      
      return result;
    };
    
    setRandomizedImages(prioritizeNailImages(heroImages));
  }, []);

  useEffect(() => {
    // Auto-advance the carousel every 7 seconds for both mobile and desktop
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % randomizedImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [randomizedImages.length]);

  return (
    <div className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden m-0 p-0">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFDFD] to-[#F6F6F6] z-0"></div>
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/70 to-transparent z-5"></div>
      
      {/* Enhanced blur glass effect */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/70 shadow-lg z-10"></div>
      
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
