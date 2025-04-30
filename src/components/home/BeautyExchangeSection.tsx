
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Store, Search, Users, Sparkles, Stars } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const BeautyExchangeSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    animation: 'fade-in'
  });
  
  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-20 bg-gradient-to-r from-white to-purple-50/30"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left side - Enhanced Premium Icon with magical elements */}
          <motion.div 
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative">
              {/* Enhanced glow effect with multiple layers */}
              <div className="absolute -inset-6 rounded-full bg-purple-200/50 blur-2xl"></div>
              <div className="absolute -inset-4 rounded-full bg-purple-100/80 blur-xl"></div>
              
              {/* Premium icon container with subtle gradient */}
              <div className="relative bg-gradient-to-br from-white to-purple-50 p-8 rounded-full shadow-xl border border-purple-100">
                {/* Main icon */}
                <div className="relative flex items-center justify-center">
                  <Store 
                    className="w-20 h-20 md:w-24 md:h-24 text-purple-600"
                    strokeWidth={1.5}
                  />
                  
                  {/* Overlapping sparkle elements for magic/transformation */}
                  <Stars 
                    className="absolute -top-4 -right-2 w-12 h-12 text-purple-500/80"
                    strokeWidth={1.25}
                  />
                  <Sparkles 
                    className="absolute -bottom-2 -left-2 w-10 h-10 text-purple-400/90"
                    strokeWidth={1.25}
                  />
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right side - Title, Subtitle, Supporting Line, and CTAs */}
          <motion.div 
            className="w-full md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-playfair font-bold mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
            >
              The Beauty Exchange
            </motion.h2>
            
            <motion.h3 
              className="text-xl md:text-2xl text-purple-700 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
            >
              Turn Beauticians Into Magicians.
            </motion.h3>
            
            <motion.p 
              className="text-gray-700 mb-6 text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
            >
              Find Your Startup. Build Something Beautiful With Your New Team.
            </motion.p>
            
            {/* CTA Buttons - 3 buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
              >
                <Link to="/salons">
                  <Button 
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-md"
                    size="lg"
                  >
                    <Search className="mr-2 h-5 w-5" /> Browse Beauty Listings
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.9 }}
              >
                <Link to="/create-listing">
                  <Button 
                    className="w-full sm:w-auto border-2 border-purple-600 bg-transparent text-purple-700 hover:bg-purple-50"
                    variant="outline"
                    size="lg"
                  >
                    <Store className="mr-2 h-5 w-5" /> Post a Job or Salon for Sale
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 1.0 }}
              >
                <Link to="/artists">
                  <Button 
                    className="w-full sm:w-auto border-2 border-purple-600 bg-transparent text-purple-700 hover:bg-purple-50"
                    variant="outline"
                    size="lg"
                  >
                    <Users className="mr-2 h-5 w-5" /> Find Artists & Stylists
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BeautyExchangeSection;
