
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
          className={`font-playfair font-bold text-center tracking-tight text-white drop-shadow-2xl max-w-4xl mx-auto ${
            isMobile 
              ? 'text-4xl sm:text-5xl leading-tight mb-6' 
              : 'text-6xl xl:text-8xl mb-8 leading-tight'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))'
          }}
        >
          {isMobile ? (
            <>
              Transform Your Beauty Career — <br />
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">We Made It Possible.</span>
            </>
          ) : (
            <>Transform Your Beauty Career — <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">We Made It Possible.</span></>
          )}
        </motion.h1>
        
        <motion.p 
          className={`font-inter font-medium text-center text-white/95 drop-shadow-lg ${
            isMobile 
              ? 'text-lg leading-relaxed mb-8 max-w-md mx-auto px-2' 
              : 'text-2xl max-w-4xl mx-auto mb-8 leading-relaxed'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.01 }}
        >
          Where 50,000+ beauty professionals connect, grow, and thrive in a platform designed exclusively for our industry.
        </motion.p>

        <motion.div
          className={`flex justify-center ${isMobile ? 'mt-10 mb-8' : 'mt-12 mb-8'}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Premium Gradient CTA Button with Glow Effect */}
          <Link to="/auth/signup">
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                size="lg" 
                className={`font-inter font-bold bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 text-white shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 rounded-2xl group relative overflow-hidden ${
                  isMobile 
                    ? 'px-12 py-8 text-xl min-h-[56px]' 
                    : 'px-16 py-10 text-2xl min-h-[64px]'
                }`}
                style={{
                  boxShadow: '0 20px 40px -12px rgba(147, 51, 234, 0.4), 0 8px 16px -8px rgba(147, 51, 234, 0.3)',
                }}
              >
                <span className="relative z-10 flex items-center">
                  <span className="mr-3">🚀 Join 50,000+ Professionals</span>
                </span>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-shimmer" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
        
        {/* Trust indicator line */}
        <motion.p 
          className={`font-inter text-center text-white/80 drop-shadow-md ${
            isMobile 
              ? 'text-sm leading-relaxed max-w-xs mx-auto px-2' 
              : 'text-lg max-w-2xl mx-auto'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span className="inline-flex items-center gap-2">
            <span className="text-green-400">✓</span>
            Free to join • <span className="text-green-400">✓</span> Instant access • <span className="text-green-400">✓</span> No hidden fees
          </span>
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
