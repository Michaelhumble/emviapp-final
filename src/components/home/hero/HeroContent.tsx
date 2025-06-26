
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
    <div className="relative z-20 w-full h-full flex items-center justify-center">
      {/* Animated gold mist background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-amber-300/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-amber-200/15 to-yellow-100/10 rounded-full blur-3xl animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-100/10 to-amber-200/10 rounded-full blur-2xl animate-pulse-gentle"></div>
      </div>

      {/* Premium glassmorphism hero card */}
      <motion.div
        className={`relative backdrop-blur-md bg-gradient-to-br from-white/90 via-yellow-50/80 to-amber-50/70 
          border border-white/30 shadow-2xl shadow-amber-500/20 rounded-3xl p-12 mx-4 max-w-6xl w-full
          ${isMobile ? 'p-8' : 'p-16'}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Floating sparkles */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <div className="absolute top-8 left-8 text-yellow-400/60 animate-sparkle-1">✨</div>
          <div className="absolute top-16 right-12 text-amber-400/50 animate-sparkle-2">✨</div>
          <div className="absolute bottom-12 left-16 text-yellow-500/40 animate-sparkle-3">✨</div>
          <div className="absolute bottom-8 right-8 text-amber-300/60 animate-sparkle-4">✨</div>
        </div>

        <div className="text-center space-y-8 relative z-10">
          {/* Premium title with gold gradient and effects */}
          <div className="relative">
            <motion.h2
              className={`font-playfair font-bold tracking-tight relative z-10
                bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent
                hover:from-yellow-500 hover:via-amber-400 hover:to-yellow-600 transition-all duration-700
                drop-shadow-lg ${isMobile ? 'text-4xl md:text-5xl' : 'text-6xl lg:text-7xl'}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{
                filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.3))',
                textShadow: '0 0 30px rgba(251, 191, 36, 0.2)'
              }}
            >
              ✨ The Platform You've Been Waiting For
            </motion.h2>
            
            {/* Animated gold underline */}
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: isMobile ? "280px" : "400px", 
                opacity: 1,
                background: [
                  "linear-gradient(90deg, transparent, #fbbf24, transparent)",
                  "linear-gradient(90deg, transparent, #f59e0b, transparent)",
                  "linear-gradient(90deg, transparent, #fbbf24, transparent)"
                ]
              }}
              transition={{ 
                width: { duration: 1.2, delay: 0.8 },
                opacity: { duration: 0.8, delay: 0.8 },
                background: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </div>

          {/* Refined subheadline */}
          <motion.p
            className={`${isMobile ? 'text-lg leading-relaxed' : 'text-xl leading-relaxed'} 
              max-w-4xl mx-auto font-medium
              bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-clip-text text-transparent
              tracking-wide`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          >
            Connecting beauty professionals with the right opportunities across salons, booth rentals, and established businesses for sale.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <Link to="/auth/signup">
              <Button 
                size="lg" 
                className="font-medium px-10 py-6 text-lg shadow-xl shadow-amber-500/25 
                  hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300
                  bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-yellow-500 hover:to-amber-400
                  border-0 text-white font-semibold tracking-wide"
              >
                Join EmviApp Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Image selection dots/indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-2">
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
                ? 'bg-white scale-125 shadow-lg shadow-white/50' 
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
    </div>
  );
};

export default HeroContent;
