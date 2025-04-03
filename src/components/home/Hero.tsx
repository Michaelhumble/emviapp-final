
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    alt: "Hairstylist working with client"
  },
  {
    url: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    alt: "Nail technician creating nail art"
  },
  {
    url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    alt: "Tattoo artist outlining a design"
  },
  {
    url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
    alt: "Beauty professional at work"
  }
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Auto-advance the carousel every 4 seconds
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-[#FDFDFD] pt-24 pb-28 overflow-hidden">
      {/* Carousel background with blur effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md z-10" aria-hidden="true" />
        
        {heroImages.map((image, index) => (
          <motion.div 
            key={index}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: activeIndex === index ? 1 : 0 
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            aria-hidden={activeIndex !== index}
          >
            <img 
              src={image.url} 
              alt={image.alt}
              className="w-full h-full object-cover scale-110"
              style={{ opacity: 0.7 }}
            />
          </motion.div>
        ))}
        
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#FAF0E6]/70 via-[#FFF5EE]/60 to-[#F8E1DE]/70 mix-blend-overlay"
          aria-hidden="true"
        />
      </div>

      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-white/20 backdrop-blur-sm"
            initial={{ 
              x: Math.random() * 100 + (i % 2 === 0 ? -50 : 50), 
              y: Math.random() * 100 + 600,
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{ 
              y: Math.random() * -600 - 100,
              x: Math.random() * 50 * (i % 2 === 0 ? -1 : 1) + (i * 30),
            }}
            transition={{ 
              duration: Math.random() * 15 + 15, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Badge variant="outline" className="mb-6 bg-white/20 backdrop-blur-md px-4 py-1.5 text-xs font-medium rounded-full border-white/20 text-gray-800">
              Revolutionizing Beauty Hiring
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight mb-6 text-gray-900 drop-shadow-sm tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            The Beauty Industry's Missing Piece — We Just Built It.
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Hair, Nails, Tattoos, Brows, Barbers, Booth Rentals—All in One Powerful App. Finally.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link to="/auth/signup">
              <Button 
                size="lg" 
                className="font-medium px-8 py-6 text-lg bg-gradient-to-r from-[#FF5A5F] to-[#FF7E3F] hover:opacity-90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 border-0"
              >
                Join The Movement
              </Button>
            </Link>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/jobs">
                    <motion.div
                      whileHover={{
                        scale: 1.03,
                        transition: { 
                          duration: 0.2,
                          repeat: 1,
                          repeatType: "reverse" 
                        }
                      }}
                    >
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="relative font-medium px-8 py-6 text-lg overflow-hidden border-gray-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 group font-serif"
                      >
                        <span className="relative z-10 flex items-center">
                          🔮 Find My Next Opportunity
                          <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-orange-300 to-red-300 blur-md transition-opacity duration-300"></span>
                      </Button>
                    </motion.div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-900/90 text-white border-none backdrop-blur-md">
                  <p className="text-sm">💬 Let's find where you truly belong.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
          
          {/* Desktop carousel indicators */}
          <motion.div 
            className="hidden md:flex mt-12 gap-2 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-white w-6' : 'bg-white/40'}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </motion.div>
          
          {/* Mobile carousel */}
          <motion.div 
            className="mt-12 w-full md:hidden relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Carousel className="w-full">
              <CarouselContent>
                {heroImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative rounded-xl overflow-hidden shadow-lg h-64">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                      <img 
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4 right-4 z-20">
                        <Badge className="mb-2 bg-white/20 backdrop-blur-sm text-white border-0">
                          {index === 0 ? "Hairstylists" : 
                           index === 1 ? "Nail Artists" : 
                           index === 2 ? "Tattoo Artists" : "Beauty Professionals"}
                        </Badge>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            
            {/* Mobile indicators */}
            <div className="flex justify-center mt-4 gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-primary w-6' : 'bg-gray-300'}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-xs mb-2">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
