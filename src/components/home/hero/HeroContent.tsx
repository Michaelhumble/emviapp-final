
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
}

const HeroContent = ({ activeIndex, setActiveIndex, heroImages }: HeroContentProps) => {
  return (
    <div className="container mx-auto px-4 relative z-30">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Badge variant="outline" className="mb-6 bg-white/30 backdrop-blur-md px-4 py-1.5 text-xs font-medium rounded-full border-white/30 text-gray-800 shadow-sm">
            Revolutionizing Beauty Hiring
          </Badge>
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight mb-6 text-white drop-shadow-lg tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ textShadow: '0px 3px 8px rgba(0,0,0,0.6)' }}
        >
          This Isn't Just an App—It's the Future of the Beauty Industry
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-white mb-10 max-w-3xl font-sans"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ textShadow: '0px 2px 6px rgba(0,0,0,0.6)' }}
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
        
        {/* Mobile carousel with improved visibility */}
        <motion.div 
          className="mt-12 w-full md:hidden relative z-40"
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
  );
};

export default HeroContent;
