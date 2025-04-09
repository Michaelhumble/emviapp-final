
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    
    if (altText.includes('nail') || altText.includes('manicure') || altText.includes('polish')) return 'Nail Artistry';
    if (altText.includes('makeup') || altText.includes('cosmetic')) return 'Makeup Artists';
    if (altText.includes('hair') || altText.includes('salon')) return 'Hair Stylists';
    if (altText.includes('barber') || altText.includes('beard') || altText.includes('groom')) return 'Barbers';
    if (altText.includes('facial') || altText.includes('spa') || altText.includes('massage') || altText.includes('wellness') || altText.includes('yoga')) return 'Spa & Wellness';
    if (altText.includes('tattoo')) return 'Tattoo Artists';
    
    // Fallback categories
    return 'Beauty Professionals';
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-full items-center justify-center">
      <div className="flex flex-col items-center text-center max-w-5xl mx-auto w-full my-8 md:my-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Badge variant="outline" className="mb-4 sm:mb-6 bg-white/30 backdrop-blur-md px-3 py-1 sm:px-4 sm:py-1.5 text-xs font-medium rounded-full border-white/30 text-white shadow-sm">
            {getImageCategory(activeIndex, heroImages[activeIndex]?.alt || '')}
          </Badge>
        </motion.div>
        
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif leading-tight mb-6 sm:mb-8 text-white drop-shadow-lg tracking-tight px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ textShadow: '0px 3px 8px rgba(0,0,0,0.7)' }}
        >
          The Beauty Industry's Missing Piece — We Just Built It.
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl text-white mb-6 sm:mb-10 max-w-3xl font-sans px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ textShadow: '0px 2px 6px rgba(0,0,0,0.7)' }}
        >
          Hair, Nails, Makeup, Tattoos, Brows, Barbers, Booth Rentals—All in One Powerful App. Finally.
        </motion.p>

        {/* Vietnamese text addition */}
        <motion.p 
          className="text-base sm:text-lg text-gray-200 mt-2 mb-8 max-w-2xl font-sans px-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ textShadow: '0px 1px 4px rgba(0,0,0,0.6)' }}
        >
          <em>Chúng tôi nói tiếng Việt — EmviApp là ngôi nhà mới cho cộng đồng làm đẹp của bạn.</em>
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 sm:mt-8 w-full sm:w-auto justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Link to="/auth/signup" className="w-full sm:w-auto">
            <Button 
              size={isMobile ? "default" : "lg"} 
              className="w-full sm:w-auto font-medium px-8 sm:px-10 py-6 sm:py-7 text-lg sm:text-xl bg-gradient-to-r from-[#FF5A5F] to-[#FF7E3F] hover:opacity-90 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 border-0"
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
                      className="w-full sm:w-auto relative font-medium px-8 sm:px-10 py-6 sm:py-7 text-lg sm:text-xl overflow-hidden border-gray-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 group font-serif"
                    >
                      <span className="relative z-10 flex items-center">
                        🔮 Find My Next Opportunity
                        <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1" />
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
        
        {/* Carousel indicators - made larger and more visible */}
        <motion.div 
          className="flex mt-12 sm:mt-16 gap-3 justify-center overflow-x-auto pb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroContent;
