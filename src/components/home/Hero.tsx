
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { heroImages } from "./hero/heroData";
import HeroCarousel from "./hero/HeroCarousel";
import HeroContent from "./hero/HeroContent";

const Hero = () => {
  const isMobile = useIsMobile();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<number>(window.innerHeight);
  
  // Update viewport height when it changes
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Initial calculation
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
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
      className="relative overflow-hidden"
      style={{
        width: '100%',
        // Modified: Use CSS calc for height to ensure it works properly on mobile
        height: isMobile ? '100vh' : `${viewportHeight}px`,
        maxWidth: '100vw',
        maxHeight: isMobile ? '100vh' : `${viewportHeight}px`, // Adjusted for mobile
        position: 'relative',
        margin: 0,
        padding: 0,
        border: 'none'
      }}
    >
      {/* Background image carousel */}
      <HeroCarousel 
        images={heroImages} 
        activeIndex={currentImageIndex} 
        isMobile={isMobile}
      />
      
      {/* Main content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <HeroContent 
          activeIndex={currentImageIndex}
          setActiveIndex={handleDotClick}
          heroImages={heroImages}
          isMobile={isMobile}
        />
      </div>
    </section>
  );
};

export default Hero;
