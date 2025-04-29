
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
  
  return (
    <motion.div 
      className={`text-center text-white z-20 max-w-5xl mx-auto px-4 ${isMobile ? 'py-8' : 'py-0'}`} // Added padding for mobile
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main hero content */}
      <div className="space-y-6">
        <motion.h1 
          className={`font-serif font-bold tracking-tight text-white ${isMobile ? 'text-4xl' : 'text-6xl'}`} // Adjusted font size for mobile
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {currentSlide.title || "Beauty Industry's First AI-Powered Platform"}
        </motion.h1>
        
        <motion.p 
          className={`${isMobile ? 'text-lg' : 'text-2xl'} max-w-2xl mx-auto text-white/90`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {currentSlide.subtitle || "The meeting place for beauty professionals and salons."}
        </motion.p>
        
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {/* Main CTA - Always ensure this exists and points to a valid route */}
          <Link to={currentSlide.cta?.link || "/auth/signup"}>
            <Button 
              size="lg" 
              className="font-medium px-8 py-6 text-lg shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-all duration-300"
            >
              {currentSlide.cta?.text || "Join EmviApp Today"}
            </Button>
          </Link>
          
          {/* Secondary CTA */}
          <Link to="/explore">
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white/10 border-white/20 text-white font-medium px-8 py-6 text-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            >
              Explore First
            </Button>
          </Link>
        </motion.div>
      </div>
      
      {/* Image selection dots/indicators */}
      <div className="flex justify-center gap-2 mt-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${activeIndex === index ? 'bg-white scale-125' : 'bg-white/40'}`}
            aria-label={`View slide ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default HeroContent;
