
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface HeroImage {
  url: string;
  alt: string;
}

interface HeroContentProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  heroImages: HeroImage[];
  isMobile?: boolean;
}

const HeroContent = ({ activeIndex, setActiveIndex, heroImages, isMobile = false }: HeroContentProps) => {
  // Helper function to get the appropriate badge text based on the image index/alt text
  const getImageCategory = (index: number, alt: string): string => {
    const altText = alt.toLowerCase();
    
    if (altText.includes('nail')) return 'Nail Artistry';
    if (altText.includes('makeup')) return 'Makeup Artists';
    if (altText.includes('hair')) return 'Hair Stylists';
    if (altText.includes('tattoo') || altText.includes('barber')) return 'Tattoo & Barber Artists';
    if (altText.includes('facial') || altText.includes('spa') || altText.includes('massage')) return 'Spa & Wellness';
    if (altText.includes('beauty')) return 'Beauty Professionals';
    
    // Fallback categories based on index
    switch (index % 5) {
      case 0: return 'Nail Artists';
      case 1: return 'Makeup Artists';
      case 2: return 'Hair Stylists';
      case 3: return 'Wellness Professionals';
      case 4: return 'Beauty Experts';
      default: return 'Beauty Professionals';
    }
  };

  return (
    <div className="container mx-auto px-4 relative z-30">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Badge variant="outline" className="mb-4 sm:mb-6 bg-white/30 backdrop-blur-md px-3 py-1 sm:px-4 sm:py-1.5 text-xs font-medium rounded-full border-white/30 text-gray-800 shadow-sm">
            Revolutionizing Beauty Hiring
          </Badge>
        </motion.div>
        
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight mb-4 sm:mb-6 text-white drop-shadow-lg tracking-tight px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ textShadow: '0px 3px 8px rgba(0,0,0,0.7)' }}
        >
          The Beauty Industry's Missing Piece — We Just Built It.
        </motion.h1>
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-10 max-w-3xl font-sans px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ textShadow: '0px 2px 6px rgba(0,0,0,0.7)' }}
        >
          Hair, Nails, Makeup, Tattoos, Brows, Barbers, Booth Rentals—All in One Powerful App. Finally.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 sm:mt-6 w-full sm:w-auto justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Link to="/auth/signup" className="w-full sm:w-auto">
            <Button 
              size={isMobile ? "default" : "lg"} 
              className="w-full sm:w-auto font-medium px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg bg-gradient-to-r from-[#FF5A5F] to-[#FF7E3F] hover:opacity-90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 border-0"
            >
              Join The Movement
            </Button>
          </Link>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/jobs" className="w-full sm:w-auto">
                  <motion.div
                    whileHover={{
                      scale: 1.03,
                      transition: { 
                        duration: 0.2,
                        repeat: 1,
                        repeatType: "reverse" 
                      }
                    }}
                    className="w-full sm:w-auto"
                  >
                    <Button 
                      size={isMobile ? "default" : "lg"} 
                      variant="outline" 
                      className="w-full sm:w-auto relative font-medium px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg overflow-hidden border-gray-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 group font-serif"
                    >
                      <span className="relative z-10 flex items-center">
                        🔮 Find My Next Opportunity
                        <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
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
        
        {/* Carousel indicators for all devices */}
        <motion.div 
          className="flex mt-8 sm:mt-12 gap-2 justify-center overflow-x-auto pb-2"
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
        
        {/* Mobile carousel - only visible on very small screens when needed */}
        {isMobile && (
          <motion.div 
            className="mt-8 w-full relative z-40 block sm:hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Carousel className="w-full">
              <CarouselContent>
                {heroImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative rounded-xl overflow-hidden shadow-lg h-52 sm:h-64">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                      <img 
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4 right-4 z-20">
                        <Badge className="mb-2 bg-white/20 backdrop-blur-sm text-white border-0">
                          {getImageCategory(index, image.alt)}
                        </Badge>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HeroContent;
