import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FloatingJoinButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-8 right-8 z-50 hidden md:block"
        >
          <Link
            to="/affiliate/apply"
            className="group relative flex items-center gap-2 px-6 py-4 rounded-2xl font-semibold text-white
                       bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600 bg-size-200 bg-pos-0
                       shadow-2xl shadow-violet-500/30
                       hover:bg-pos-100 hover:shadow-violet-500/40 hover:scale-105
                       active:scale-95
                       transition-all duration-300 ease-out
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
          >
            <span className="relative z-10">Join Now</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            
            {/* Animated glow border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 
                            blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
            
            {/* Inner shine effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingJoinButton;
