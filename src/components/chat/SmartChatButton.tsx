import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useKeyboardVisible, useScrollDirection, MOBILE_LAYOUT, MobileOverlayManager } from '@/utils/mobileLayoutManager';

interface SmartChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
  userPreferredSide?: 'left' | 'right' | 'auto';
}

export const SmartChatButton: React.FC<SmartChatButtonProps> = ({
  onClick,
  isOpen,
  userPreferredSide = 'auto'
}) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const isKeyboardVisible = useKeyboardVisible();
  const scrollDirection = useScrollDirection();
  
  const [position, setPosition] = useState<'bottom-left' | 'bottom-right'>('bottom-right');
  const [isAvoidingNav, setIsAvoidingNav] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState(0);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const avoidanceTimerRef = useRef<NodeJS.Timeout>();

  // Detect navigation interference zones
  const getNavigationInfo = useCallback(() => {
    const isJobsPage = location.pathname.startsWith('/jobs');
    const hasBottomNav = isMobile;
    const hasCenterFAB = !isJobsPage; // Post job FAB appears on non-jobs pages
    
    return {
      isJobsPage,
      hasBottomNav,
      hasCenterFAB,
      bottomNavHeight: isJobsPage ? 80 : 64, // Jobs page has taller nav
      centerFABPosition: '50%', // Center FAB is always centered
      navItemWidth: window.innerWidth / (isJobsPage ? 5 : 4), // Width per nav item
    };
  }, [location.pathname, isMobile]);

  // Smart positioning algorithm
  const calculateOptimalPosition = useCallback(() => {
    if (!isMobile) return 'bottom-right';
    
    const navInfo = getNavigationInfo();
    const screenWidth = window.innerWidth;
    const buttonSize = MOBILE_LAYOUT.TOUCH_TARGETS.COMFORTABLE_SIZE;
    const safeMargin = MOBILE_LAYOUT.SAFE_AREAS.SIDE_PADDING;
    
    // Calculate interference zones
    const rightNavZone = {
      left: screenWidth - navInfo.navItemWidth,
      right: screenWidth,
      bottom: 0,
      top: navInfo.bottomNavHeight + MOBILE_LAYOUT.SAFE_AREAS.BOTTOM_SAFE_AREA
    };
    
    const leftNavZone = {
      left: 0,
      right: navInfo.navItemWidth,
      bottom: 0,
      top: navInfo.bottomNavHeight + MOBILE_LAYOUT.SAFE_AREAS.BOTTOM_SAFE_AREA
    };
    
    const centerFABZone = navInfo.hasCenterFAB ? {
      left: screenWidth / 2 - 40,
      right: screenWidth / 2 + 40,
      bottom: navInfo.bottomNavHeight - 24,
      top: navInfo.bottomNavHeight + 24
    } : null;

    // User preference override
    if (userPreferredSide === 'left') return 'bottom-left';
    if (userPreferredSide === 'right') return 'bottom-right';
    
    // Auto-detect based on user handedness patterns
    const touches = JSON.parse(localStorage.getItem('chat-button-touches') || '[]');
    const recentTouches = touches.slice(-10); // Last 10 touches
    
    if (recentTouches.length >= 5) {
      const rightSideTouches = recentTouches.filter((touch: any) => touch.x > screenWidth / 2).length;
      const leftHandedPattern = rightSideTouches < recentTouches.length * 0.3; // Less than 30% right side touches
      
      if (leftHandedPattern) return 'bottom-left';
    }
    
    // Default positioning logic
    return 'bottom-right';
  }, [isMobile, getNavigationInfo, userPreferredSide]);

  // Update position when conditions change
  useEffect(() => {
    const newPosition = calculateOptimalPosition();
    setPosition(newPosition);
  }, [calculateOptimalPosition, location.pathname]);

  // Register with overlay manager
  useEffect(() => {
    const manager = MobileOverlayManager.getInstance();
    const overlayId = 'smart-chat-button';
    
    if (!isOpen) {
      manager.register(overlayId);
    } else {
      manager.unregister(overlayId);
    }

    return () => manager.unregister(overlayId);
  }, [isOpen]);

  // Navigation collision detection
  const handleNavCollisionAvoidance = useCallback((event: React.TouchEvent) => {
    if (!isMobile) return;
    
    const touch = event.touches[0];
    const navInfo = getNavigationInfo();
    const buttonRect = buttonRef.current?.getBoundingClientRect();
    
    if (!buttonRect) return;
    
    const touchX = touch.clientX;
    const touchY = touch.clientY;
    
    // Check if touch is near navigation area
    const nearBottomNav = touchY > window.innerHeight - navInfo.bottomNavHeight - 40;
    const nearNavButton = touchX < navInfo.navItemWidth || touchX > window.innerWidth - navInfo.navItemWidth;
    
    if (nearBottomNav && nearNavButton) {
      setIsAvoidingNav(true);
      
      // Clear any existing timer
      if (avoidanceTimerRef.current) {
        clearTimeout(avoidanceTimerRef.current);
      }
      
      // Reset avoidance after animation
      avoidanceTimerRef.current = setTimeout(() => {
        setIsAvoidingNav(false);
      }, 1000);
    }
  }, [isMobile, getNavigationInfo]);

  // Track touch patterns for handedness detection
  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    setTouchStartTime(Date.now());
    handleNavCollisionAvoidance(event);
    
    // Record touch position for handedness analysis
    const touch = event.touches[0];
    const touches = JSON.parse(localStorage.getItem('chat-button-touches') || '[]');
    
    touches.push({
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
      screenWidth: window.innerWidth
    });
    
    // Keep only last 20 touches
    const recentTouches = touches.slice(-20);
    localStorage.setItem('chat-button-touches', JSON.stringify(recentTouches));
  }, [handleNavCollisionAvoidance]);

  const handleClick = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Haptic feedback on supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    onClick();
  }, [onClick]);

  // Calculate dynamic positioning
  const getDynamicStyles = useCallback(() => {
    const navInfo = getNavigationInfo();
    const baseBottom = navInfo.bottomNavHeight + MOBILE_LAYOUT.SAFE_AREAS.SIDE_PADDING;
    const keyboardOffset = isKeyboardVisible ? -navInfo.bottomNavHeight + 16 : 0;
    const avoidanceOffset = isAvoidingNav ? (position === 'bottom-right' ? -60 : 60) : 0;
    const scrollOffset = scrollDirection === 'down' ? 10 : 0;
    
    const bottom = baseBottom + keyboardOffset + scrollOffset;
    const horizontalPosition = position === 'bottom-right' 
      ? { right: MOBILE_LAYOUT.SAFE_AREAS.SIDE_PADDING + avoidanceOffset }
      : { left: MOBILE_LAYOUT.SAFE_AREAS.SIDE_PADDING - avoidanceOffset };
    
    return {
      bottom: `${Math.max(16, bottom)}px`,
      ...horizontalPosition,
      zIndex: MOBILE_LAYOUT.Z_INDEX.FAB_PRIMARY + 1 // Higher than other FABs
    };
  }, [getNavigationInfo, isKeyboardVisible, isAvoidingNav, position, scrollDirection]);

  // Render on all screen sizes - removed desktop restriction

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            rotate: 0,
            x: isAvoidingNav ? (position === 'bottom-right' ? -20 : 20) : 0,
            y: isAvoidingNav ? -10 : 0
          }}
          exit={{ scale: 0, opacity: 0, rotate: 180 }}
          style={getDynamicStyles()}
          className="fixed"
        >
          {/* Glowing aura - enhanced for accessibility */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 100%)',
              filter: 'blur(8px)',
              transform: 'scale(1.8)',
            }}
            animate={{
              scale: [1.8, 2.0, 1.8],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Simple sparkles - reduced for performance */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-yellow-200 rounded-full"
              style={{
                top: `${20 + i * 25}%`,
                right: `${15 + i * 10}%`,
                boxShadow: '0 0 6px rgba(251, 191, 36, 0.6)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}

          <motion.button
            ref={buttonRef}
            whileHover={{ 
              scale: 1.15, 
              y: -3,
              rotateZ: [0, -5, 5, 0]
            }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            className="relative rounded-full shadow-2xl transition-all duration-300 group overflow-hidden touch-manipulation"
            style={{
              width: MOBILE_LAYOUT.TOUCH_TARGETS.COMFORTABLE_SIZE,
              height: MOBILE_LAYOUT.TOUCH_TARGETS.COMFORTABLE_SIZE,
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 30%, #ea580c 70%, #dc2626 100%)',
              boxShadow: '0 8px 32px rgba(251, 191, 36, 0.6), inset 0 2px 8px rgba(255, 255, 255, 0.3)',
            }}
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
            aria-label="Chat with Little Sunshine - AI Assistant"
            aria-describedby="chat-button-description"
            role="button"
            tabIndex={0}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.4) 50%, transparent 70%)',
              }}
              animate={{
                x: [-100, 100],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Sun Icon with sparkle effect */}
            <div className="relative z-10 flex items-center justify-center w-full h-full">
              <motion.div
                className="text-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotateZ: [0, -5, 5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ☀️
              </motion.div>
              
              {/* Inner sparkles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    top: `${20 + i * 20}%`,
                    left: `${30 + i * 15}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>

            {/* Pulsing notification badge */}
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span className="text-white text-xs">💌</span>
            </motion.div>
            
            {/* Enhanced tooltip with dynamic positioning */}
            <motion.div 
              className={`absolute ${position === 'bottom-right' ? '-left-48' : '-right-48'} -top-16 bg-gradient-to-r from-orange-600 to-yellow-600 text-white text-sm px-4 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg pointer-events-none`}
              initial={{ y: 10, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
            >
              <div className="flex items-center space-x-2">
                <span>✨</span>
                <span className="font-medium">Meet Little Sunshine!</span>
                <span>✨</span>
              </div>
              <div 
                className={`absolute top-full ${position === 'bottom-right' ? 'right-8' : 'left-8'} w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-orange-600`} 
              />
            </motion.div>
          </motion.button>

          {/* Screen reader description */}
          <div id="chat-button-description" className="sr-only">
            Chat with Little Sunshine, your AI beauty assistant. Get help with beauty tips, salon recommendations, job searches, and more. Positioned for comfortable {position === 'bottom-right' ? 'right-handed' : 'left-handed'} use.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
