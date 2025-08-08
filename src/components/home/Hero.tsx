
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { heroImages, lazyHeroImages } from "./hero/heroData";
import HeroCarousel from "./hero/HeroCarousel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const Hero = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
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
      
      {/* Main hero content - updated clarity messaging */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-3xl md:text-6xl font-bold tracking-tight">
              {t({
                english: "The Beauty Industry's Missing Piece — We Just Built It.",
                vietnamese: "Mảnh ghép còn thiếu của ngành làm đẹp — Nay đã có EmviApp.",
              })}
            </h1>
            <p className="mt-4 text-lg md:text-2xl/relaxed text-white/90">
              {t({
                english: "Where beauty professionals connect with jobs, salons, and clients — all in one place.",
                vietnamese: "Nơi thợ và tiệm gặp nhau để tìm việc, bán tiệm, và kết nối khách hàng.",
              })}
            </p>

            {/* Icon + label row */}
            <div className="mt-5 flex flex-col items-center gap-2 md:flex-row md:justify-center md:gap-6">
              <div className="flex items-center gap-2 text-sm md:text-base">
                <span aria-hidden="true">💅</span>
                <span>Find Work</span>
              </div>
              <div className="hidden md:block h-4 w-px bg-white/30" aria-hidden="true" />
              <div className="flex items-center gap-2 text-sm md:text-base">
                <span aria-hidden="true">🏢</span>
                <span>Hire Talent</span>
              </div>
              <div className="hidden md:block h-4 w-px bg-white/30" aria-hidden="true" />
              <div className="flex items-center gap-2 text-sm md:text-base">
                <span aria-hidden="true">💖</span>
                <span>Grow Your Salon</span>
              </div>
            </div>

            {/* CTAs: stack on mobile, horizontal on desktop */}
            <div className="mt-8 flex flex-col gap-3 items-center md:flex-row md:justify-center">
              <Link to="/jobs">
                <Button size="lg">Browse Jobs</Button>
              </Link>
              <Link to="/post-job" className="md:ml-4">
                <Button size="lg" variant="outline">Post a Job</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
