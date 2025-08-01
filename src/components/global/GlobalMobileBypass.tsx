import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/auth';

interface GlobalMobileBypassProps {
  onBypass: () => void;
  isActive: boolean;
}

/**
 * Global Mobile Bypass Component
 * Shows a floating bypass button that allows users to skip FOMO on mobile
 * Only visible when FOMO is active and user is not signed in
 */
const GlobalMobileBypass: React.FC<GlobalMobileBypassProps> = ({ onBypass, isActive }) => {
  const { isSignedIn } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBypass, setShowBypass] = useState(false);

  // Only show bypass on mobile when FOMO is active and user not signed in
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setShowBypass(isMobile && isActive && !isSignedIn);
  }, [isActive, isSignedIn]);

  // Auto-collapse after 3 seconds if expanded
  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => setIsExpanded(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  if (!showBypass) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-2"
      >
        {/* Expanded Bypass Option */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 mb-2 max-w-xs"
            >
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Skip to Main App</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Access EmviApp without signing up (you'll see this page again next visit)
                </p>
                <Button
                  onClick={() => {
                    console.log('🚀 Global mobile bypass activated');
                    onBypass();
                    setIsExpanded(false);
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Continue to App
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Toggle Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors touch-manipulation"
          aria-label={isExpanded ? "Close bypass menu" : "Open bypass menu"}
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default GlobalMobileBypass;