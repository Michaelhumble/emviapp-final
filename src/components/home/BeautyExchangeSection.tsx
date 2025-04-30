
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { Store } from 'lucide-react';
import { Container } from '@/components/ui/container';

const BeautyExchangeSection = () => {
  const iconControls = useAnimation();
  
  // Enhanced animation for the icon glow effect
  useEffect(() => {
    const animateIcon = async () => {
      while (true) {
        await iconControls.start({
          boxShadow: '0 0 40px rgba(155, 93, 229, 0.6), 0 0 80px rgba(155, 93, 229, 0.3)',
          scale: 1.05,
          transition: { duration: 2.2, ease: 'easeInOut' }
        });
        await iconControls.start({
          boxShadow: '0 0 20px rgba(155, 93, 229, 0.4), 0 0 40px rgba(155, 93, 229, 0.15)',
          scale: 1,
          transition: { duration: 2.2, ease: 'easeInOut' }
        });
      }
    };
    
    animateIcon();
  }, [iconControls]);
  
  return (
    <section className="py-32 bg-gradient-to-r from-[#FDF6FF] via-[#FCFAFF] to-[#F6F6F6] relative overflow-hidden">
      {/* Enhanced animated background effect */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(155, 93, 229, 0.6) 0%, rgba(255, 255, 255, 0) 70%)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "linear"
        }}
      />
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left side - Animated icon */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Small sparkle animations */}
              <motion.div
                className="absolute -top-6 -right-4 text-[#9B5DE5] opacity-70"
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.5, 0.9, 0.5],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-6 text-[#9B5DE5] opacity-70"
                animate={{
                  scale: [0.7, 1.1, 0.7],
                  opacity: [0.4, 0.8, 0.4],
                  rotate: [0, -90, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </motion.div>
              
              {/* Additional subtle sparkle */}
              <motion.div
                className="absolute top-10 -left-8 text-[#E493FF] opacity-50"
                animate={{
                  scale: [0.6, 1, 0.6],
                  opacity: [0.3, 0.7, 0.3],
                  rotate: [0, 45, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </motion.div>
              
              {/* Main animated store icon with enhanced glow */}
              <motion.div
                className="relative z-10 bg-white rounded-full p-8 border border-[#F5EDFF]"
                animate={iconControls}
              >
                <Store size={80} className="text-[#9B5DE5]" />
              </motion.div>
            </div>
          </div>
          
          {/* Right side - Text content */}
          <motion.div 
            className="lg:col-span-8 text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 text-[#1A1A1A] font-playfair tracking-wide">
              The Beauty Exchange
            </h2>
            
            <motion.p
              className="text-lg md:text-xl font-semibold mb-3 text-[#9C27B0] tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Turn Beauticians Into Magicians.
            </motion.p>
            
            <p className="text-base md:text-lg text-[#555] mb-10 font-inter">
              Find Your Startup. Build Something Beautiful With Your New Team.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-end mt-8 mb-16">
              <Link to="/salons">
                <Button 
                  className="relative overflow-hidden rounded-full px-8 py-6 text-white font-medium shadow-none text-base transition-all duration-300 bg-gradient-to-r from-[#9B5DE5] to-[#E493FF] hover:shadow-[0_5px_15px_-3px_rgba(155,93,229,0.4)]"
                  size="lg"
                >
                  <span className="relative z-10">Browse Beauty Listings</span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-[#A45DE8] to-[#ED9AFF] opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>
              <Link to="/create-listing">
                <Button 
                  variant="outline" 
                  className="relative overflow-hidden rounded-full px-8 py-6 border-[#D4B6FF] hover:border-[#9B5DE5] hover:text-[#9B5DE5] text-base transition-all duration-300 shadow-none bg-transparent"
                  size="lg"
                >
                  <span className="relative z-10">Post a Job or Salon for Sale</span>
                  <motion.span 
                    className="absolute inset-0 bg-[#F8F5FF] opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>
              <Link to="/artists">
                <Button 
                  variant="outline" 
                  className="relative overflow-hidden rounded-full px-8 py-6 border-[#D4B6FF] hover:border-[#9B5DE5] hover:text-[#9B5DE5] text-base transition-all duration-300 shadow-none bg-transparent"
                  size="lg"
                >
                  <span className="relative z-10">Find Artists & Stylists</span>
                  <motion.span 
                    className="absolute inset-0 bg-[#F8F5FF] opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default BeautyExchangeSection;
