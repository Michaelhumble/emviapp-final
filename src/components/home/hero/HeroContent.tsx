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
      {/* Premium Hero Title & Subheadline Block */}
      <motion.div 
        className="relative backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-8 border border-white/20 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,248,220,0.15) 0%, rgba(255,215,0,0.1) 30%, rgba(255,255,255,0.1) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(255, 215, 0, 0.1)',
        }}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Animated gold mist background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-200/20 via-amber-200/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-gold-200/20 via-yellow-100/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-yellow-100/5 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Floating sparkles */}
        <div className="absolute top-6 left-6 text-yellow-300 text-2xl animate-pulse opacity-70">✨</div>
        <div className="absolute top-8 right-8 text-amber-300 text-lg animate-pulse opacity-50" style={{ animationDelay: '0.5s' }}>✨</div>
        <div className="absolute bottom-8 left-1/4 text-yellow-200 text-xl animate-pulse opacity-60" style={{ animationDelay: '1.5s' }}>✨</div>

        <div className="relative z-10 space-y-6">
          {/* 
            ⚠️ PERMANENT LOCKED TITLE - DO NOT MODIFY ⚠️
            This title must remain exactly as written - core to EmviApp identity
          */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl md:text-5xl animate-pulse">✨</span>
              <h1 
                className={`font-playfair font-bold tracking-tight ${isMobile ? 'text-4xl md:text-5xl' : 'text-6xl'} relative group cursor-default`}
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FFEF94 50%, #DAA520 75%, #FFD700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 200%',
                  animation: 'shimmer 3s ease-in-out infinite',
                  textShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
                }}
              >
                The Beauty Industry's Missing Piece — We Just Built It.
                {/* Animated gold underline */}
                <div 
                  className="absolute -bottom-2 left-0 right-0 h-1 rounded-full transform origin-center"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, #FFD700 20%, #FFA500 50%, #FFD700 80%, transparent 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'wave 2s ease-in-out infinite',
                  }}
                ></div>
              </h1>
            </div>
          </motion.div>
          
          {/* 
            ⚠️ PERMANENT SUBHEADLINE - DO NOT MODIFY WITHOUT PERMISSION ⚠️
          */}
          <motion.p 
            className={`${isMobile ? 'text-lg' : 'text-2xl'} max-w-2xl mx-auto leading-relaxed font-light`}
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8DC 30%, #F5F5DC 70%, #FFFFFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(255, 248, 220, 0.2)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Connecting salons, artists & customers through intelligent AI-powered technology.
          </motion.p>
        </div>
      </motion.div>
      
      {/* CTA Button - keeping existing functionality */}
      <motion.div
        className="flex justify-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        <Link to="/auth/signup">
          <Button 
            size="lg" 
            className="font-medium px-8 py-6 text-lg shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-all duration-300"
          >
            Join EmviApp Today
          </Button>
        </Link>
      </motion.div>
      
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
