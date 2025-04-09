
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { heroImages } from "./hero/heroData";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sortedImages, setSortedImages] = useState([...heroImages]);
  const isMobile = useIsMobile();

  // Sort and randomize images on component mount
  useEffect(() => {
    // Fisher-Yates shuffle algorithm
    const shuffle = (arr) => {
      const newArr = [...arr];
      for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
    };
    
    // Get nail-related images first (approximately first half of the array)
    const nailImages = heroImages.filter(img => 
      img.alt.toLowerCase().includes("nail") || 
      img.alt.toLowerCase().includes("manicure") || 
      img.alt.toLowerCase().includes("polish")
    );
    
    const otherImages = heroImages.filter(img => 
      !img.alt.toLowerCase().includes("nail") && 
      !img.alt.toLowerCase().includes("manicure") && 
      !img.alt.toLowerCase().includes("polish")
    );
    
    // Shuffle both arrays
    const shuffledNailImages = shuffle(nailImages);
    const shuffledOtherImages = shuffle(otherImages);
    
    // Combine with nail images first, then others
    setSortedImages([...shuffledNailImages, ...shuffledOtherImages]);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % sortedImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sortedImages.length]);
  
  // Preload next images for smoother transitions
  useEffect(() => {
    const nextIndex = (activeIndex + 1) % sortedImages.length;
    const nextNextIndex = (activeIndex + 2) % sortedImages.length;
    
    const preloadImage = (index) => {
      const img = new Image();
      img.src = sortedImages[index]?.url;
    };
    
    preloadImage(nextIndex);
    preloadImage(nextNextIndex);
  }, [activeIndex, sortedImages]);

  // Extract category from image alt text
  const getCategory = (alt) => {
    if (alt.toLowerCase().includes("nail") || alt.toLowerCase().includes("manicure")) {
      return "Nail Artistry";
    } else if (alt.toLowerCase().includes("hair") || alt.toLowerCase().includes("salon")) {
      return "Hair Styling";
    } else if (alt.toLowerCase().includes("barber") || alt.toLowerCase().includes("beard")) {
      return "Barber Services";
    } else if (alt.toLowerCase().includes("spa") || alt.toLowerCase().includes("facial")) {
      return "Spa & Wellness";
    } else if (alt.toLowerCase().includes("makeup")) {
      return "Makeup & Beauty";
    } else {
      return "Beauty Industry";
    }
  };

  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      {/* Background gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFDFD] to-[#F6F6F6] z-0"></div>
      
      {/* Image carousel */}
      <div className="absolute inset-0 w-full h-full z-10">
        <AnimatePresence>
          {sortedImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: index === activeIndex ? 1 : 0,
                scale: index === activeIndex ? 1 : 1.05,
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 7, ease: "easeInOut" }
              }}
              style={{ zIndex: index === activeIndex ? 11 : 10 }}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient overlay for better text visibility */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"
                aria-hidden="true"
              ></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute inset-0 z-20 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/30 backdrop-blur-sm"
            style={{
              width: Math.random() * 10 + 5 + "px",
              height: Math.random() * 10 + 5 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            initial={{ 
              y: Math.random() * 100 + 500,
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{ 
              y: -100,
              x: Math.random() * 100 - 50,
            }}
            transition={{ 
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Content layer */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-30">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Category badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Badge 
              variant="outline" 
              className="mb-4 px-3 py-1 text-sm bg-white/20 backdrop-blur-sm text-white/90 border-white/30"
            >
              {sortedImages[activeIndex] ? getCategory(sortedImages[activeIndex].alt) : "Beauty Industry"}
            </Badge>
          </motion.div>

          {/* Main heading */}
          <motion.h1 
            className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-white font-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
          >
            The Beauty Industry's Missing Piece — We Just Built It.
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            className="text-base sm:text-xl text-white/90 mb-6 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
          >
            Hair, Nails, Makeup, Tattoos, Brows, Barbers, Booth Rentals—All in One Powerful App. Finally.
          </motion.p>

          {/* Vietnamese text */}
          <motion.p 
            className="text-sm text-white/80 italic mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Chúng tôi nói tiếng Việt — EmviApp là ngôi nhà mới cho cộng đồng làm đẹp của bạn.
          </motion.p>

          {/* CTA buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Link to="/auth/signup">
              <Button 
                size={isMobile ? "default" : "lg"} 
                className="w-full sm:w-auto font-medium px-8 py-6 text-lg bg-gradient-to-r from-[#FF5A5F] to-[#FF7E3F] hover:opacity-90 shadow-lg border-0"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Join The Movement
              </Button>
            </Link>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/jobs">
                    <Button 
                      size={isMobile ? "default" : "lg"} 
                      variant="outline" 
                      className="w-full sm:w-auto font-medium px-8 py-6 text-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/20 text-white group"
                    >
                      🔮 Find My Next Opportunity
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-900/90 text-white border-none backdrop-blur-md">
                  <p className="text-sm">💬 Let's find where you truly belong</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        </motion.div>
        
        {/* Carousel indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <motion.div 
            className="flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            {sortedImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-white w-6' : 'bg-white/40'}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="text-xs mb-1">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown size={16} className="text-white/70" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
