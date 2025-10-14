import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show after scrolling 50% of viewport height
      const shouldShow = scrollPosition > windowHeight * 0.5;
      
      // Hide when near bottom (within 500px of final CTA)
      const distanceFromBottom = documentHeight - (scrollPosition + windowHeight);
      const nearBottom = distanceFromBottom < 500;
      
      setIsVisible(shouldShow && !nearBottom);
      setIsNearBottom(nearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && !isNearBottom && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Link
            to="/affiliate/apply"
            className="group relative flex items-center gap-3 px-6 py-4 rounded-2xl
                       bg-gradient-to-r from-violet-600 to-fuchsia-500
                       shadow-2xl shadow-fuchsia-500/30
                       hover:shadow-fuchsia-500/50
                       transition-all duration-300
                       hover:scale-105 active:scale-95"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            
            {/* Sparkle icon */}
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
            
            {/* Text */}
            <div className="relative">
              <div className="text-white font-semibold text-sm whitespace-nowrap">
                Join 1,247 affiliates earning
              </div>
              <div className="text-white/90 text-xs">
                $3,240/month average
              </div>
            </div>
            
            {/* Arrow */}
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            
            {/* Ping animation */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
