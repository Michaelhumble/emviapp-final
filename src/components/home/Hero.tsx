
import { useState, useEffect } from "react";
import FloatingParticles from "./hero/FloatingParticles";
import HeroContent from "./hero/HeroContent";
import ScrollIndicator from "./hero/ScrollIndicator";
import { useIsMobile } from "@/hooks/use-mobile";
import { heroImages } from "./hero/heroData";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  return (
    <div className="relative pt-24 pb-28 overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 z-0 bg-black"
        style={{
          backgroundImage: `url(${heroImages[0].url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.65)',
        }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Content container with proper z-index to appear on top */}
      <HeroContent 
        activeIndex={activeIndex} 
        setActiveIndex={setActiveIndex} 
        isMobile={isMobile}
      />
      
      {/* Scroll down indicator */}
      <ScrollIndicator />
    </div>
  );
};

export default Hero;
