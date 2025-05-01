
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Store, Sun, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  
  const sunshineTextVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.5,
        duration: 0.5,
        repeat: 0,
        repeatType: "mirror" as const,
      }
    }
  };
  
  // Routes for the dropdown menu
  const exchangeRoutes = [
    { title: "Post a Job", path: "/jobs/create" },
    { title: "List a Salon for Sale", path: "/salons/create" },
    { title: "Find Artists & Stylists", path: "/artists" },
  ];
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-10 md:py-16 overflow-hidden bg-gradient-to-r from-white to-purple-50/30"
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
                className="w-full md:w-1/2 flex justify-center flex-col items-center"
                variants={imageVariants}
              >
                <div className="relative mb-2">
                  <div className="absolute -inset-4 rounded-full bg-purple-100/80 blur-xl"></div>
                  <div className="relative bg-white p-8 rounded-full shadow-xl border border-purple-100 transition-transform duration-500 hover:scale-105">
                    <Store 
                      className="w-24 h-24 md:w-32 md:h-32 text-purple-600"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
                
                {/* Added little Sunshine text with bouncing animation */}
                <motion.div
                  variants={sunshineTextVariants}
                  className="mt-2 text-center"
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  <span className="text-sm font-medium text-[#B57CF3]">
                    little Sunshine ☀️
                  </span>
                </motion.div>
              </motion.div>
              
              {/* Right side - Title, Subtitle, Supporting Line, and CTA with staggered animations */}
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
                
                {/* New CTA button with dropdown */}
                <motion.div 
                  className="flex flex-wrap items-center gap-4 justify-center md:justify-start"
                  variants={itemVariants}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-md min-w-[240px]" 
                        size="lg"
                      >
                        Browse Beauty Exchange
                        <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-[240px] p-2">
                      {exchangeRoutes.map((route) => (
                        <DropdownMenuItem key={route.path} asChild className="cursor-pointer">
                          <Link to={route.path} className="w-full px-2 py-2 hover:bg-purple-50">
                            {route.title}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              </div>
            </div>
            
            {/* Optional: Subtle page indicator/scroll prompt for better UX */}
            <motion.div 
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-2"
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
