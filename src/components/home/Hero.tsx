
import { useState, useEffect } from "react";
import HeroCarousel from "./hero/HeroCarousel";
import FloatingParticles from "./hero/FloatingParticles";
import HeroContent from "./hero/HeroContent";
import ScrollIndicator from "./hero/ScrollIndicator";
import { heroImages } from "./hero/heroData";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Auto-advance the carousel every 4 seconds
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative pt-24 pb-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFDFD] to-[#F6F6F6] z-0"></div>
      
      {/* Glass effect frame */}
      <div className="absolute inset-0 md:m-4 backdrop-blur-sm bg-white/10 border border-white/30 rounded-lg shadow-xl z-10"></div>
      
      {/* Image carousel placed in front of glass background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-20">
        <HeroCarousel images={heroImages} activeIndex={activeIndex} />
      </div>

      {/* Floating particles animation */}
      <FloatingParticles />

      {/* Content container with proper z-index to appear on top */}
      <HeroContent 
        activeIndex={activeIndex} 
        setActiveIndex={setActiveIndex} 
        heroImages={heroImages} 
      />
      
      {/* Scroll down indicator */}
      <ScrollIndicator />
    </div>
  );
};

export default Hero;
