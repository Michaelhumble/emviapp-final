
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroImage {
  url: string;
  alt: string;
  title?: string;
  subtitle?: string;
  cta?: {
    text: string;
    link: string;
  };
}

interface HeroContentProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  heroImages: HeroImage[];
  isMobile?: boolean;
}

const HeroContent = ({ 
  activeIndex, 
  setActiveIndex, 
  heroImages,
  isMobile = false
}: HeroContentProps) => {
  
  const currentSlide = heroImages[activeIndex];
  
  // Only show a maximum of 7 dots, with current one centered
  const getVisibleDots = () => {
    if (heroImages.length <= 7) return heroImages.map((_, i) => i);
    
    const halfVisible = 3;
    let startIdx = activeIndex - halfVisible;
    let endIdx = activeIndex + halfVisible;
    
    // Adjust for edge cases
    if (startIdx < 0) {
      endIdx = Math.min(endIdx - startIdx, heroImages.length - 1);
      startIdx = 0;
    }
    
    if (endIdx >= heroImages.length) {
      startIdx = Math.max(0, startIdx - (endIdx - heroImages.length + 1));
      endIdx = heroImages.length - 1;
    }
    
    return Array.from({ length: endIdx - startIdx + 1 }, (_, i) => i + startIdx);
  };
  
  const visibleDots = getVisibleDots();
  
  return (
    <motion.div 
      className={`text-center text-white z-20 max-w-5xl mx-auto px-4 ${isMobile ? 'py-8' : 'py-0'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main hero content */}
      <div className={`${isMobile ? 'space-y-8 px-6 py-12' : 'space-y-4'}`}>
        {/* Soft gradient overlay for text readability on mobile */}
        {isMobile && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/10 to-transparent pointer-events-none z-[-1]" />
        )}
        
        {/* Enhanced gradient overlay for perfect text readability on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/18 to-black/10 pointer-events-none z-[-1]" />
        
        <motion.h1 
          className={`font-playfair font-bold text-center tracking-tight text-white drop-shadow-xl max-w-[900px] mx-auto ${
            isMobile 
              ? 'text-4xl sm:text-5xl leading-tight mb-6' 
              : 'text-5xl xl:text-6xl mb-6 leading-tight'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          The Beauty Industry's Missing Piece — We Just Built It.
        </motion.h1>
        
        <motion.p 
          className={`font-inter font-light text-center text-white/95 drop-shadow-lg ${
            isMobile 
              ? 'text-lg leading-relaxed mb-8 max-w-md mx-auto px-2' 
              : 'text-xl max-w-[900px] mx-auto mb-6 leading-relaxed'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          A community where talent, dreams, and opportunity meet—for every beauty professional, everywhere.
        </motion.p>

        <motion.div
          className={`flex justify-center ${isMobile ? 'mt-10 mb-8' : 'mt-10 mb-6'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {/* Simple Browse Jobs CTA */}
          <Link 
            to="/jobs"
            onClick={() => {
              // Analytics tracking
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'hero_cta_click', {
                  event_category: 'engagement',
                  event_label: 'Browse Jobs',
                  cta_location: 'hero'
                });
              }
            }}
          >
            <Button 
              variant="outline"
              size="lg"
              className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30 hover:text-white font-inter font-semibold transition-all duration-300 px-12 py-6 text-lg rounded-2xl"
            >
              Browse Jobs
            </Button>
          </Link>
        </motion.div>
        
        {/* Press release link */}
        <motion.div 
          className="text-center mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <a
            href="https://www.benzinga.com/content/47334199/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-white/80 hover:text-white transition-colors font-medium ${
              isMobile ? 'text-sm' : 'text-base'
            }`}
            onClick={() => {
              // Analytics tracking
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'press_release_click', {
                  event_category: 'engagement',
                  event_label: 'Benzinga',
                  link_location: 'hero'
                });
              }
            }}
          >
            Read our launch press release →
          </a>
        </motion.div>
        
        {/* Subtle Vietnamese line */}
        <motion.p 
          className={`font-inter text-center text-white/70 drop-shadow-md mt-4 ${
            isMobile 
              ? 'text-sm leading-relaxed max-w-xs mx-auto px-2' 
              : 'text-base max-w-2xl mx-auto'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          Mảnh ghép còn thiếu của ngành làm đẹp — Nay đã có EmviApp.
        </motion.p>
      </div>
      
      {/* Image selection dots/indicators - keeping the image slider functionality */}
      <div className="flex justify-center items-center gap-2 mt-10">
        {heroImages.length > 7 && activeIndex > 3 && (
          <button
            onClick={() => setActiveIndex(Math.max(0, activeIndex - 5))}
            className="w-6 h-6 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label="Previous images"
          >
            ⟨
          </button>
        )}
        
        {visibleDots.map(index => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-11 h-11 rounded-full transition-all flex items-center justify-center ${
              activeIndex === index 
                ? 'bg-white/90 scale-110' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`View slide ${index + 1}`}
          >
            <div className={`w-3 h-3 rounded-full ${
              activeIndex === index ? 'bg-primary' : 'bg-white/80'
            }`} />
          </button>
        ))}
        
        {heroImages.length > 7 && activeIndex < heroImages.length - 4 && (
          <button
            onClick={() => setActiveIndex(Math.min(heroImages.length - 1, activeIndex + 5))}
            className="w-6 h-6 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label="Next images"
          >
            ⟩
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default HeroContent;
