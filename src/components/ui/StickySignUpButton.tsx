import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowUp, User, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const StickySignUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 100vh (past hero section)
      const scrolled = window.scrollY > window.innerHeight;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className={`fixed ${isMobile ? 'bottom-6 right-4' : 'bottom-8 right-8'} z-50`}
      >
        <div className="relative">
          {/* Floating Action Button */}
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={handleToggle}
              className={`
                ${isMobile ? 'w-14 h-14' : 'w-16 h-16'} 
                rounded-full bg-gradient-to-r from-primary to-purple-600 
                hover:from-purple-700 hover:to-pink-600 
                shadow-2xl hover:shadow-3xl 
                transition-all duration-300 
                border-2 border-white/20
                backdrop-blur-sm
              `}
            >
              {isExpanded ? (
                <X className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-white`} />
              ) : (
                <User className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-white`} />
              )}
            </Button>
          </motion.div>

          {/* Expanded Menu */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.2 }}
                className={`absolute ${isMobile ? 'bottom-16 right-0' : 'bottom-20 right-0'} flex flex-col gap-3`}
              >
                {/* Sign Up Button */}
                <Link to="/auth/signup">
                  <Button 
                    className={`
                      ${isMobile ? 'px-6 py-3 text-sm' : 'px-8 py-4 text-base'} 
                      bg-gradient-to-r from-green-500 to-emerald-600 
                      hover:from-green-600 hover:to-emerald-700 
                      text-white font-semibold 
                      shadow-xl hover:shadow-2xl 
                      transition-all duration-300 
                      rounded-full 
                      whitespace-nowrap
                      border-2 border-white/20
                    `}
                  >
                    ✨ Join EmviApp
                  </Button>
                </Link>

                {/* Browse Jobs */}
                <Link to="/jobs">
                  <Button 
                    variant="outline"
                    className={`
                      ${isMobile ? 'px-6 py-3 text-sm' : 'px-8 py-4 text-base'} 
                      bg-white/95 border-2 border-purple-300 
                      text-purple-700 hover:bg-purple-50 
                      font-semibold shadow-lg hover:shadow-xl 
                      transition-all duration-300 
                      rounded-full 
                      whitespace-nowrap
                      backdrop-blur-sm
                    `}
                  >
                    Browse Jobs
                  </Button>
                </Link>

                {/* Back to Top */}
                <Button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  variant="secondary"
                  className={`
                    ${isMobile ? 'px-4 py-3' : 'px-6 py-4'} 
                    bg-gray-100/95 border border-gray-300 
                    text-gray-700 hover:bg-gray-200 
                    shadow-lg hover:shadow-xl 
                    transition-all duration-300 
                    rounded-full
                    backdrop-blur-sm
                  `}
                >
                  <ArrowUp className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulsing Ring Animation */}
          {!isExpanded && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-purple-400"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StickySignUpButton;