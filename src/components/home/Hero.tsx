
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { heroImages, lazyHeroImages } from "./hero/heroData";
import HeroCarousel from "./hero/HeroCarousel";
import HeroContent from "./hero/HeroContent";

const Hero = () => {
  const isMobile = useIsMobile();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<number>(window.innerHeight);
  const [allImages, setAllImages] = useState(heroImages); // Start with just 1 image
  
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
  
  // Load additional images after 2 seconds for performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setAllImages([...heroImages, ...lazyHeroImages]);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Rotate background images every 6.5 seconds with smooth transitions
  useEffect(() => {
    if (allImages.length <= 1) return; // Don't rotate if only 1 image
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);
    
    return () => clearInterval(interval);
  }, [allImages.length]);

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Preload next images only after carousel is loaded
  useEffect(() => {
    if (allImages.length <= 1) return;
    
    const timer = setTimeout(() => {
      const nextIndex = (currentImageIndex + 1) % allImages.length;
      const img = new Image();
      img.src = allImages[nextIndex].url;
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [currentImageIndex, allImages]);

  return (
    <section 
      className="relative overflow-hidden w-full max-w-full"
      style={{
        width: '100%',
        height: isMobile ? '85vh' : '90vh', // Reduced height for better above-fold CTA visibility
        minHeight: isMobile ? '600px' : '700px', // Ensure minimum usable height
        maxWidth: '100vw',
        maxHeight: isMobile ? '85vh' : '90vh',
        position: 'relative',
        margin: 0,
        padding: 0,
        border: 'none',
        paddingTop: 'env(safe-area-inset-top)', // Safe area for notches
        paddingBottom: 'env(safe-area-inset-bottom)'
      }}
    >
      {/* Background image carousel - starts with 1 image, loads more after 2s */}
      <HeroCarousel 
        images={allImages} 
        activeIndex={currentImageIndex} 
        isMobile={isMobile}
      />
      
      {/* Main hero content - locked title and subtitle */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <HeroContent 
          activeIndex={currentImageIndex}
          setActiveIndex={handleDotClick}
          heroImages={allImages}
          isMobile={isMobile}
        />
      </div>
    </section>
  );
};

export default Hero;
