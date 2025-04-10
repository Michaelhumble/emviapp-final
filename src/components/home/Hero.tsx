
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
      className="relative overflow-hidden w-screen h-screen m-0 p-0 max-w-[100vw] max-h-[100vh]"
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        border: 'none',
        maxWidth: '100vw',
        maxHeight: '100vh',
        position: 'relative',
        touchAction: 'none',
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

      {/* Mobile app-like status bar */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-lg h-6 flex items-center justify-between px-3 text-white text-xs">
          <span>9:41 AM</span>
          <div className="flex items-center gap-1">
            <span className="block w-3 h-3 rounded-full bg-white/80"></span>
            <span className="block w-3 h-3 rounded-full bg-white/80"></span>
            <span className="block w-3 h-3 rounded-full bg-white/80"></span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
