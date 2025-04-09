
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { heroImages } from "./hero/heroData";
import HeroCarousel from "./hero/HeroCarousel";
import HeroContent from "./hero/HeroContent";
import ScrollIndicator from "./hero/ScrollIndicator";

const Hero = () => {
  const isMobile = useIsMobile();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  
  // Change background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
        );
        setIsChanging(false);
      }, 500);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsChanging(false);
    }, 300);
  };

  return (
    <section 
      className="relative flex items-center justify-center overflow-hidden mx-auto"
      style={{
        width: '100%',
        maxWidth: '100vw',
        height: 'calc(120vh)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Background image carousel */}
      <div className="absolute inset-0 z-0">
        <HeroCarousel 
          images={heroImages} 
          activeIndex={currentImageIndex} 
          isMobile={isMobile}
        />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <HeroContent 
          activeIndex={currentImageIndex}
          setActiveIndex={handleDotClick}
          heroImages={heroImages}
          isMobile={isMobile}
        />
      </div>
      
      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
};

export default Hero;
