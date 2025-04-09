
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { heroImages } from "./hero/heroData";
import HeroCarousel from "./hero/HeroCarousel";
import HeroContent from "./hero/HeroContent";
import FloatingElements from "./hero/FloatingElements";
import ScrollIndicator from "./hero/ScrollIndicator";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sortedImages, setSortedImages] = useState([...heroImages]);
  const isMobile = useIsMobile();

  // Sort and randomize images on component mount
  useEffect(() => {
    // Fisher-Yates shuffle algorithm
    const shuffle = (arr: typeof heroImages) => {
      const newArr = [...arr];
      for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
    };
    
    // Get nail-related images first
    const nailImages = heroImages.filter(img => 
      img.alt.toLowerCase().includes("nail") || 
      img.alt.toLowerCase().includes("manicure") || 
      img.alt.toLowerCase().includes("polish")
    );
    
    const otherImages = heroImages.filter(img => 
      !img.alt.toLowerCase().includes("nail") && 
      !img.alt.toLowerCase().includes("manicure") && 
      !img.alt.toLowerCase().includes("polish")
    );
    
    // Shuffle both arrays
    const shuffledNailImages = shuffle(nailImages);
    const shuffledOtherImages = shuffle(otherImages);
    
    // Combine with nail images first, then others
    setSortedImages([...shuffledNailImages, ...shuffledOtherImages]);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % sortedImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sortedImages.length]);
  
  // Preload next images for smoother transitions
  useEffect(() => {
    const nextIndex = (activeIndex + 1) % sortedImages.length;
    const nextNextIndex = (activeIndex + 2) % sortedImages.length;
    
    const preloadImage = (index: number) => {
      const img = new Image();
      img.src = sortedImages[index]?.url;
    };
    
    preloadImage(nextIndex);
    preloadImage(nextNextIndex);
  }, [activeIndex, sortedImages]);

  return (
    <section className="relative w-full h-[100vh] min-h-[100vh] overflow-hidden">
      {/* Background gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFDFD] to-[#F6F6F6] z-0"></div>
      
      {/* Image carousel - full width and height */}
      <div className="absolute inset-0 w-full h-full z-10">
        <HeroCarousel 
          images={sortedImages} 
          activeIndex={activeIndex} 
          isMobile={isMobile} 
        />
      </div>

      {/* Decorative floating elements - increased number */}
      <FloatingElements />

      {/* Content layer - using the full width */}
      <div className="relative w-full max-w-none h-full flex flex-col justify-center items-center text-center z-30">
        <HeroContent 
          activeIndex={activeIndex} 
          setActiveIndex={setActiveIndex}
          heroImages={sortedImages}
          isMobile={isMobile}
        />
      </div>
      
      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
};

export default Hero;
