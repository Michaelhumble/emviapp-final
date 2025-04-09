
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { heroImages } from "./hero/heroData";

const Hero = () => {
  const isMobile = useIsMobile();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  
  // Change background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
        );
        setIsChanging(false);
      }, 500);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsChanging(false);
    }, 300);
  };

  return (
    <section className="h-screen w-full flex items-center justify-center overflow-hidden relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroImages[currentImageIndex].url})`,
            opacity: isChanging ? 0 : 0.35, 
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isChanging ? 0 : 0.35 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-20 text-center">
        {/* Optional badge - can be dynamic based on image */}
        <div className="mb-8 flex justify-center">
          <div className="px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-sm">
            {currentImageIndex % 2 === 0 ? "Hair Stylists" : "Nail Artistry"}
          </div>
        </div>
        
        <h1 className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-8 max-w-5xl mx-auto">
          The Beauty Industry's Missing Piece — We Just Built It.
        </h1>
        
        <p className="text-white text-lg md:text-xl mb-6 max-w-3xl mx-auto">
          Hair, Nails, Makeup, Tattoos, Brows, Barbers, Booth Rentals—All in One Powerful App. Finally.
        </p>
        
        <p className="text-pink-200 italic text-base md:text-lg mb-10 max-w-2xl mx-auto">
          Chúng tôi nói tiếng Việt — EmviApp là ngôi nhà mới cho cộng đồng làm đẹp của bạn.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center">
          <Link to="/auth/signup">
            <Button 
              size={isMobile ? "default" : "lg"} 
              className="w-full md:w-auto bg-[#ff5757] hover:bg-[#ff4545] text-white font-medium px-8 py-6 rounded-lg"
            >
              Join The Movement
            </Button>
          </Link>
          
          <Link to="/jobs">
            <Button 
              size={isMobile ? "default" : "lg"} 
              variant="outline" 
              className="w-full md:w-auto bg-transparent border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-medium px-8 py-6 rounded-lg"
            >
              <span>Find My Next Opportunity</span>
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Carousel dots */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-30">
        {heroImages.slice(0, 25).map((_, index) => (
          <button 
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? "bg-white w-6" 
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm z-30">
        Scroll to explore
      </div>
    </section>
  );
};

export default Hero;
