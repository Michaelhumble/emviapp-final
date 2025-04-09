
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HeroImage {
  url: string;
  alt: string;
  category: string;
}

// Define our hero images with categories
const heroImages: HeroImage[] = [
  {
    url: "/lovable-uploads/1b5ea814-ad33-4a65-b01e-6c406c98ffc1.png",
    alt: "Close-up of manicurist applying nail polish with precision",
    category: "Nail Artistry"
  },
  {
    url: "/lovable-uploads/253b19a3-141f-40c7-9cce-fc10464f0615.png",
    alt: "Person getting a professional manicure with blue gloves",
    category: "Nail Artistry"
  },
  {
    url: "/lovable-uploads/e930cd80-e3b9-4783-a57c-9486ffa34cdf.png",
    alt: "Manicurist working on client's nails in a pink salon setting",
    category: "Nail Artistry"
  },
  {
    url: "/lovable-uploads/a3c08446-c1cb-492d-a361-7ec4aca18cfd.png",
    alt: "Hair stylist blow drying client's hair in a salon",
    category: "Hair Styling"
  },
  {
    url: "/lovable-uploads/5b0dc7b0-886f-4c09-93c1-33f17d236690.png",
    alt: "Barber trimming client's beard in a professional setting",
    category: "Barber Services"
  },
  {
    url: "/lovable-uploads/acf28832-50ab-40f1-8268-f15a5bbc1bd7.png",
    alt: "Professional providing facial treatment to client in spa setting",
    category: "Spa & Wellness"
  }
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState<HeroImage[]>([...heroImages]);
  const isMobile = useIsMobile();
  
  // Prioritize nail images and randomize on component mount
  useEffect(() => {
    // Sort to prioritize nail artistry images
    const nailImages = heroImages.filter(img => img.category === "Nail Artistry");
    const otherImages = heroImages.filter(img => img.category !== "Nail Artistry");
    
    // Fisher-Yates shuffle for both arrays
    const shuffle = (arr: HeroImage[]) => {
      const newArr = [...arr];
      for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
    };
    
    // Interleave the arrays, starting with a nail image
    const nailShuffled = shuffle(nailImages);
    const otherShuffled = shuffle(otherImages);
    const combined = [];
    
    // First image is always nail-related
    if (nailShuffled.length > 0) {
      combined.push(nailShuffled[0]);
    }
    
    // Alternate between nail and other images
    const maxLength = Math.max(nailShuffled.length, otherShuffled.length);
    for (let i = 0; i < maxLength; i++) {
      if (i + 1 < nailShuffled.length) {
        combined.push(nailShuffled[i + 1]);
      }
      if (i < otherShuffled.length) {
        combined.push(otherShuffled[i]);
      }
    }
    
    setImages(combined);
  }, []);
  
  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);
  
  // Preload next images
  useEffect(() => {
    const nextIndexes = [1, 2].map(i => (activeIndex + i) % images.length);
    nextIndexes.forEach(index => {
      const img = new Image();
      img.src = images[index]?.url;
    });
  }, [activeIndex, images]);

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ height: "100vh", maxHeight: "100vh" }}>
      {/* Background layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFDFD] to-[#F6F6F6] z-0"></div>

      {/* Image carousel */}
      <div className="absolute inset-0 w-full h-full z-10">
        <AnimatePresence>
          {images.map((image, index) => (
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
              
              {/* Gradient overlay for better text readability */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"
                aria-hidden="true"
              ></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-20 overflow-hidden">
        {/* Animated particles */}
        {[...Array(12)].map((_, i) => (
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
              {images[activeIndex]?.category || "Beauty Industry"}
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
            {images.map((_, index) => (
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
