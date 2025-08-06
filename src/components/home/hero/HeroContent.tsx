
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
        
        {/* Enhanced gradient overlay for perfect text readability on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20 pointer-events-none z-[-1]" />
        
        <motion.h1 
          className={`font-playfair font-bold text-center tracking-tight text-white drop-shadow-xl max-w-4xl mx-auto ${
            isMobile 
              ? 'text-4xl sm:text-5xl leading-tight mb-6' 
              : 'text-6xl xl:text-7xl mb-6 leading-tight'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {isMobile ? (
            <>
              The Beauty Industry's Missing Piece — <br />
              We Just Built It.
            </>
          ) : (
            "The Beauty Industry's Missing Piece — We Just Built It."
          )}
        </motion.h1>
        
        <motion.p 
          className={`font-inter font-light text-center text-white/95 drop-shadow-lg ${
            isMobile 
              ? 'text-lg leading-relaxed mb-8 max-w-md mx-auto px-2' 
              : 'text-2xl max-w-4xl mx-auto mb-6 leading-relaxed'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          A community where talent, dreams, and opportunity meet—for every beauty professional, everywhere.
        </motion.p>

        <motion.div
          className={`flex flex-col items-center gap-4 ${isMobile ? 'mt-10 mb-8' : 'mt-10 mb-6'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {/* Primary Action Buttons */}
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center gap-4`}>
            {/* Post a Job Button - Primary CTA */}
            <Link to="/post-job">
              <Button 
                size="lg" 
                className={`font-inter font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-2xl ${
                  isMobile 
                    ? 'px-12 py-7 text-lg' 
                    : 'px-16 py-10 text-2xl'
                }`}
              >
                💼 Post a Job
              </Button>
            </Link>
            
            {/* Create Account Button - Secondary CTA */}
            <Link to="/auth/signup?redirect=%2F">
              <Button 
                size="lg" 
                className={`font-inter font-bold bg-gradient-to-r from-primary to-purple-600 hover:from-purple-700 hover:to-pink-600 shadow-2xl shadow-black/40 hover:shadow-black/50 transition-all duration-300 transform hover:scale-105 rounded-2xl ${
                  isMobile 
                    ? 'px-10 py-7 text-lg' 
                    : 'px-14 py-10 text-2xl'
                }`}
              >
                ✨ Create Your Free Account
              </Button>
            </Link>
          </div>
          
          {/* Secondary CTAs */}
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center gap-4`}>
            <Link to="/auth/signin?redirect=%2F">
              <Button 
                variant="outline"
                size={isMobile ? "default" : "lg"}
                className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30 hover:text-white font-inter font-semibold transition-all duration-300"
              >
                Welcome Back! Sign In
              </Button>
            </Link>
            
            <Link to="/jobs">
              <Button 
                variant="ghost"
                size={isMobile ? "default" : "lg"}
                className="text-white/90 hover:text-white hover:bg-white/10 font-inter font-medium underline-offset-4 hover:underline"
              >
                See All Jobs – No Account Needed
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Subtle Vietnamese line */}
        <motion.p 
          className={`font-inter text-center text-white/70 drop-shadow-md ${
            isMobile 
              ? 'text-sm leading-relaxed max-w-xs mx-auto px-2' 
              : 'text-base max-w-2xl mx-auto'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
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
