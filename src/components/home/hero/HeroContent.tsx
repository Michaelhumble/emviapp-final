
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-transparent pointer-events-none z-[-1]" />
        )}
        
        <motion.h1 
          className={`font-playfair font-bold text-center tracking-tight text-white drop-shadow-lg ${
            isMobile 
              ? 'text-3xl sm:text-4xl leading-tight mb-8' 
              : 'text-6xl mb-2'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {isMobile ? (
            <>
              The Beauty Industry's<br />
              Missing Piece — We Just Built It.
            </>
          ) : (
            "The Beauty Industry's Missing Piece — We Just Built It."
          )}
        </motion.h1>
        
        <motion.p 
          className={`font-inter font-light text-center text-white/95 drop-shadow-md ${
            isMobile 
              ? 'text-lg leading-relaxed mb-6 max-w-sm mx-auto' 
              : 'text-xl max-w-4xl mx-auto mb-3'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Finally, a home for beauty talent to dream, connect, and grow.
        </motion.p>
        
        {/* Vietnamese support line */}
        <motion.p 
          className={`font-playfair italic text-center text-white/80 drop-shadow-md ${
            isMobile 
              ? 'text-sm leading-relaxed mb-8 max-w-xs mx-auto px-4' 
              : 'text-lg max-w-3xl mx-auto mb-4'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          Mảnh ghép còn thiếu của ngành làm đẹp — Nay đã có EmviApp. Cùng nhau kết nối, phát triển, và vươn xa.
        </motion.p>

        <motion.div
          className={`flex justify-center ${isMobile ? 'mt-12 mb-10' : 'mt-8'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          {/* Bilingual CTA Button */}
          <Link to="/auth/signup">
            <Button 
              size="lg" 
              className={`font-inter font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary shadow-2xl shadow-black/30 hover:shadow-black/40 transition-all duration-300 transform hover:scale-105 ${
                isMobile 
                  ? 'px-8 py-6 text-lg' 
                  : 'px-10 py-7 text-xl'
              }`}
            >
              Bắt đầu hành trình — Start Your Journey
            </Button>
          </Link>
        </motion.div>
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
            className={`w-3 h-3 rounded-full transition-all ${
              activeIndex === index 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`View slide ${index + 1}`}
          />
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
