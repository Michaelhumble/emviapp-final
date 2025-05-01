
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import FloatingElements from "./FloatingElements";
import ScrollIndicator from "./ScrollIndicator";

interface HeroImage {
  url: string;
  alt: string;
}

interface HeroContentProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  heroImages: HeroImage[];
  isMobile: boolean;
}

const HeroContent: React.FC<HeroContentProps> = ({ 
  activeIndex, 
  setActiveIndex,
  heroImages,
  isMobile 
}) => {
  return (
    <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center relative">
      <FloatingElements />
      
      <motion.div
        className="text-center relative z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 font-playfair"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Beauty Industry's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">First AI Platform</span>
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Connecting salons, artists & customers through intelligent technology.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Link to="/auth/signup">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-lg text-lg shadow-xl hover:shadow-2xl transition-all duration-300 border-none"
            >
              Join EmviApp Now
              <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/tour">
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white/50 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Take a Tour
            </Button>
          </Link>
        </motion.div>
        
        {/* Indicators */}
        <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.slice(0, 5).map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === activeIndex % 5 ? "bg-white" : "bg-white/40"
              }`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Scroll indicator at the bottom */}
      <ScrollIndicator />
    </div>
  );
};

export default HeroContent;
