
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
      <div className="space-y-4">
        <motion.h1 
          className={`font-playfair font-bold tracking-tight text-white drop-shadow-lg ${isMobile ? 'text-4xl md:text-5xl' : 'text-6xl'} mb-2`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          The Beauty Industry's Missing Piece — We Just Built It.
        </motion.h1>
        
        <motion.h2 
          className={`font-playfair font-medium tracking-wide text-white/85 drop-shadow-md ${isMobile ? 'text-lg md:text-xl' : 'text-2xl'} mb-4`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Mảnh ghép còn thiếu của ngành làm đẹp — Nay đã có EmviApp.
        </motion.h2>
        
        <motion.p 
          className={`${isMobile ? 'text-lg' : 'text-xl'} max-w-4xl mx-auto text-white/90 font-inter font-light leading-relaxed drop-shadow-md mb-3`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Connecting salons, artists & customers through modern technology and a thriving community.
        </motion.p>
        
        <motion.p 
          className={`${isMobile ? 'text-base' : 'text-lg'} max-w-3xl mx-auto text-white/80 font-inter font-light leading-relaxed drop-shadow-md mb-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Kết nối tiệm, thợ, khách hàng bằng công nghệ hiện đại và cộng đồng vững mạnh.
        </motion.p>
        
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {/* Bilingual CTA Button */}
          <Link to="/auth/signup">
            <Button 
              size="lg" 
              className="font-inter font-semibold px-10 py-7 text-xl bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary shadow-2xl shadow-black/30 hover:shadow-black/40 transition-all duration-300 transform hover:scale-105"
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
