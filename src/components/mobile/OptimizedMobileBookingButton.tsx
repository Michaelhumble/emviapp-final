import React, { useState, useEffect } from 'react';
import { Calendar, ChevronUp, Star, Users, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKeyboardVisible, MOBILE_LAYOUT, MobileOverlayManager } from '@/utils/mobileLayoutManager';
import { useIsMobile } from '@/hooks/use-mobile';

interface OptimizedMobileBookingButtonProps {
  artistId?: string;
  artistName?: string;
  onBookingClick?: () => void;
  className?: string;
}

const OptimizedMobileBookingButton = ({
  artistId,
  artistName,
  onBookingClick,
  className
}: OptimizedMobileBookingButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isKeyboardVisible = useKeyboardVisible();
  const isMobile = useIsMobile();

  // Register with overlay manager
  useEffect(() => {
    const manager = MobileOverlayManager.getInstance();
    const overlayId = `mobile-booking-${artistId}`;
    
    if (isExpanded) {
      manager.register(overlayId);
    } else {
      manager.unregister(overlayId);
    }

    return () => manager.unregister(overlayId);
  }, [isExpanded, artistId]);

  // Auto-collapse when keyboard appears
  useEffect(() => {
    if (isKeyboardVisible && isExpanded) {
      setIsExpanded(false);
    }
  }, [isKeyboardVisible, isExpanded]);

  if (!isMobile) return null;

  const fomoIndicators = [
    { icon: Star, text: "4.9 rating", color: "text-yellow-500" },
    { icon: Users, text: "12 booked today", color: "text-green-500" },
    { icon: Clock, text: "Next: 2:30 PM", color: "text-blue-500" },
  ];

  return (
    <div 
      className={`fixed left-4 right-4 ${className}`}
      style={{ 
        bottom: `${MOBILE_LAYOUT.SAFE_AREAS.BOTTOM_NAV_HEIGHT + 16}px`,
        zIndex: MOBILE_LAYOUT.Z_INDEX.STICKY_CTA,
      }}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-3 bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-gray-200"
          >
            <div className="space-y-3">
              {/* FOMO Indicators */}
              <div className="flex items-center justify-between">
                {fomoIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <indicator.icon className={`h-4 w-4 ${indicator.color}`} />
                    <span className="text-sm font-medium text-gray-700">{indicator.text}</span>
                  </div>
                ))}
              </div>
              
              {/* Booking Message */}
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 mb-1">
                  Book with {artistName || 'this artist'}
                </p>
                <p className="text-sm text-gray-600">
                  Secure your spot before it's gone! ⚡
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Booking Button */}
      <motion.div
        className="relative"
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Expand/Collapse Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-gray-200"
          style={{ 
            zIndex: MOBILE_LAYOUT.Z_INDEX.STICKY_CTA + 1,
            minWidth: MOBILE_LAYOUT.TOUCH_TARGETS.MIN_SIZE,
            minHeight: MOBILE_LAYOUT.TOUCH_TARGETS.MIN_SIZE,
          }}
          whileTap={{ scale: 0.95 }}
          aria-label={isExpanded ? "Collapse booking info" : "Expand booking info"}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronUp className="h-5 w-5 text-gray-600" />
          </motion.div>
        </motion.button>

        {/* Primary Booking Button */}
        <motion.button
          onClick={() => {
            onBookingClick?.();
            // Haptic feedback for iOS
            if ('vibrate' in navigator) {
              navigator.vibrate(50);
            }
          }}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 touch-manipulation"
          style={{ 
            minHeight: MOBILE_LAYOUT.TOUCH_TARGETS.COMFORTABLE_SIZE,
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Book appointment"
        >
          <Calendar className="h-6 w-6" />
          <span className="text-lg">Book Now</span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        </motion.button>
      </motion.div>

      {/* Bottom Padding for Content */}
      <div style={{ height: `${MOBILE_LAYOUT.SAFE_AREAS.BOTTOM_SAFE_AREA}px` }} />
    </div>
  );
};

export default OptimizedMobileBookingButton;