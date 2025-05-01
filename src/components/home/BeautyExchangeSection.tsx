
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Store, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MobileButton } from '@/components/ui/mobile-button';
import { useIsMobile } from '@/hooks/use-mobile';

const BeautyExchangeSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    animation: 'fade-in'
  });
  
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Enhanced animation variants for better transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      y: 10,
      transition: { 
        duration: 0.3, 
        ease: "easeIn" 
      }
    }
  };
  
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.92, x: isMobile ? 0 : -30 },
    visible: { 
      opacity: 1, 
      scale: 1,
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  };
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-14 md:py-20 overflow-hidden bg-gradient-to-r from-white to-purple-50/30"
    >
      {isLoading ? (
        <div className="container mx-auto px-4 animate-pulse">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="h-32 w-32 md:h-40 md:w-40 bg-gray-200 rounded-full"></div>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="h-8 bg-gray-200 rounded-md w-3/4 mx-auto md:mx-0"></div>
              <div className="h-6 bg-gray-200 rounded-md w-1/2 mx-auto md:mx-0"></div>
              <div className="h-4 bg-gray-200 rounded-md w-5/6 mx-auto md:mx-0"></div>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <div className="h-10 bg-gray-200 rounded-md w-40"></div>
                <div className="h-10 bg-gray-200 rounded-md w-32"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div 
            className="container mx-auto px-4"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Left side - Image/Icon with enhanced animation */}
              <motion.div 
                className="w-full md:w-1/2 flex justify-center"
                variants={imageVariants}
              >
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full bg-purple-100/80 blur-xl"></div>
                  <div className="relative bg-white p-8 rounded-full shadow-xl border border-purple-100 transition-transform duration-500 hover:scale-105">
                    <Store 
                      className="w-24 h-24 md:w-32 md:h-32 text-purple-600"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </motion.div>
              
              {/* Right side - Title, Subtitle, Supporting Line, and CTAs with staggered animations */}
              <div className="w-full md:w-1/2 text-center md:text-left space-y-3">
                <motion.h2 
                  className="text-3xl md:text-4xl font-playfair font-bold mb-2"
                  variants={itemVariants}
                >
                  The Beauty Exchange
                </motion.h2>
                
                <motion.h3 
                  className="text-xl md:text-2xl text-purple-700 mb-2"
                  variants={itemVariants}
                >
                  Turn Beauticians Into Magicians
                </motion.h3>
                
                <motion.p 
                  className="text-gray-700 mb-6 text-lg"
                  variants={itemVariants}
                >
                  Find Your Startup. Build Something Beautiful With Your New Team.
                </motion.p>
                
                {/* CTA Buttons with mobile optimization using MobileButton */}
                <motion.div 
                  className="flex flex-col sm:flex-row flex-wrap items-center gap-4 justify-center md:justify-start"
                  variants={itemVariants}
                >
                  <Link to="/salons">
                    <MobileButton 
                      className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-md min-w-[210px]"
                      size="lg"
                    >
                      <Search className="mr-2 h-5 w-5" /> Browse Beauty Listings
                    </MobileButton>
                  </Link>
                  
                  <Link to="/create-listing">
                    <MobileButton 
                      className="border-2 border-purple-600 bg-transparent text-purple-700 hover:bg-purple-50 min-w-[210px]"
                      variant="outline"
                      size="lg"
                    >
                      <Store className="mr-2 h-5 w-5" /> Post a Job or Salon
                    </MobileButton>
                  </Link>
                  
                  <Link to="/artists">
                    <MobileButton 
                      className="border-2 border-purple-600 bg-transparent text-purple-700 hover:bg-purple-50 min-w-[210px]"
                      variant="outline"
                      size="lg"
                    >
                      <Users className="mr-2 h-5 w-5" /> Find Artists & Stylists
                    </MobileButton>
                  </Link>
                </motion.div>
              </div>
            </div>
            
            {/* Optional: Subtle page indicator/scroll prompt for better UX */}
            <motion.div 
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-200"></div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
};

export default BeautyExchangeSection;
