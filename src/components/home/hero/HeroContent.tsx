
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HeroContentProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  isMobile?: boolean;
}

const HeroContent = ({ activeIndex, setActiveIndex, isMobile = false }: HeroContentProps) => {
  return (
    <div className="container mx-auto px-4 relative z-30">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Badge variant="outline" className="mb-4 sm:mb-6 bg-white/20 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-1.5 text-xs font-medium rounded-full border-white/30 text-white shadow-sm">
            Nail Artistry
          </Badge>
        </motion.div>
        
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight mb-4 sm:mb-6 text-white tracking-tight px-2 drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          The Beauty Industry's Missing Piece — We Just Built It.
        </motion.h1>
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-10 max-w-3xl font-sans px-2 drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Hair, Nails, Makeup, Tattoos, Brows, Barbers, Booth Rentals—All in One Powerful App. Finally.
        </motion.p>

        {/* Vietnamese text addition */}
        <motion.p 
          className="text-sm sm:text-base text-white/80 mt-2 mb-6 max-w-2xl font-sans px-2 italic drop-shadow-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Chúng tôi nói tiếng Việt — EmviApp là ngôi nhà mới cho cộng đồng làm đẹp của bạn.
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
              className="w-full sm:w-auto font-medium px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg bg-[#FF5A5F] hover:opacity-90 shadow-lg transition-all duration-300 border-0"
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
                      className="w-full sm:w-auto relative font-medium px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg overflow-hidden border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group text-white"
                    >
                      <span className="relative z-10 flex items-center">
                        🔮 Find My Next Opportunity
                        <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
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
      </div>
    </div>
  );
};

export default HeroContent;
