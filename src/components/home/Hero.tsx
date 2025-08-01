
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
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
  
  // Rotate background images every 6.5 seconds with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
        );
        setIsChanging(false);
      }, 800); // Longer fade transition for smoother experience
    }, 6500); // Slightly longer display time for each image
    
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsChanging(false);
    }, 500);
  };

  // Preload only next image for smoother transitions (reduced from 3 to 1)
  useEffect(() => {
    const preloadNextImage = () => {
      const nextIndex = (currentImageIndex + 1) % heroImages.length;
      const img = new Image();
      img.src = heroImages[nextIndex].url;
    };
    
    // Debounce preloading to avoid excessive requests
    const timeoutId = setTimeout(preloadNextImage, 500);
    
    return () => clearTimeout(timeoutId);
  }, [currentImageIndex]);

  return (
    <section 
      className="relative overflow-hidden w-full max-w-full"
      style={{
        width: '100%',
        height: '100dvh', // Dynamic viewport height for mobile browsers
        minHeight: '100svh', // Small viewport height fallback
        maxWidth: '100vw',
        maxHeight: '100dvh',
        position: 'relative',
        margin: 0,
        padding: 0,
        border: 'none',
        paddingTop: 'env(safe-area-inset-top)', // Safe area for notches
        paddingBottom: 'env(safe-area-inset-bottom)'
      }}
    >
      {/* Background image carousel with full rotation through all images */}
      <HeroCarousel 
        images={heroImages} 
        activeIndex={currentImageIndex} 
        isMobile={isMobile}
      />
      
      {/* Main hero content - locked title and subtitle */}
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
