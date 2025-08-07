import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useKeyboardVisible, useScrollDirection, MOBILE_LAYOUT, MobileOverlayManager } from '@/utils/mobileLayoutManager';
import { useIsMobile } from '@/hooks/use-mobile';

const OptimizedStickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [overlayCount, setOverlayCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const isKeyboardVisible = useKeyboardVisible();
  const scrollDirection = useScrollDirection();
  const isMobile = useIsMobile();

  // Only show on specific pages and conditions
  const showOnPages = ['/jobs', '/'];
  const shouldShowOnPage = showOnPages.includes(location.pathname);

  useEffect(() => {
    if (!isMobile || !shouldShowOnPage) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldShow = scrollY > 200 && !isKeyboardVisible && scrollDirection !== 'down';
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, shouldShowOnPage, isKeyboardVisible, scrollDirection]);

  // Monitor overlay manager
  useEffect(() => {
    const manager = MobileOverlayManager.getInstance();
    const unsubscribe = manager.addListener(() => {
      setOverlayCount(manager.getActiveCount());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Hide if keyboard visible or other overlays active
  const shouldHide = isKeyboardVisible || overlayCount > 0 || !isVisible;

  if (!isMobile || !shouldShowOnPage) return null;

  return (
    <AnimatePresence>
      {!shouldHide && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed left-4 right-4"
          style={{ 
            bottom: `${MOBILE_LAYOUT.SAFE_AREAS.FAB_OFFSET + 16}px`,
            zIndex: MOBILE_LAYOUT.Z_INDEX.STICKY_CTA,
          }}
        >
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl shadow-2xl border border-purple-500/20 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-purple-400/10"></div>
            
            <div className="relative p-4">
              <div className="flex items-center justify-between gap-3">
                <motion.button
                  onClick={() => navigate('/post-job')}
                  className="flex-1 bg-white/95 hover:bg-white text-purple-600 font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 touch-manipulation"
                  style={{ minHeight: MOBILE_LAYOUT.TOUCH_TARGETS.MIN_SIZE }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Post a job"
                >
                  <Plus className="w-5 h-5" />
                  <span>Post Job</span>
                </motion.button>

                <motion.button
                  onClick={() => {
                    const jobsSection = document.querySelector('#jobs-section');
                    if (jobsSection) {
                      jobsSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      navigate('/jobs');
                    }
                  }}
                  className="flex-1 bg-purple-800/80 hover:bg-purple-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 border border-white/20 touch-manipulation"
                  style={{ minHeight: MOBILE_LAYOUT.TOUCH_TARGETS.MIN_SIZE }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Find jobs"
                >
                  <Search className="w-5 h-5" />
                  <span>Find Jobs</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OptimizedStickyMobileCTA;