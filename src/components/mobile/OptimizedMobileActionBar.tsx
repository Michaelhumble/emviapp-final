import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Calendar, Star, Share2, Settings, Upload } from 'lucide-react';
import { useKeyboardVisible, useScrollDirection, MOBILE_LAYOUT, MobileOverlayManager, calculateFABPosition } from '@/utils/mobileLayoutManager';
import { useIsMobile } from '@/hooks/use-mobile';

interface OptimizedMobileActionBarProps {
  onAction?: (actionId: string) => void;
  unreadNotifications?: number;
  variant?: 'artist' | 'profile' | 'salon';
}

const OptimizedMobileActionBar = ({ 
  onAction, 
  unreadNotifications = 0,
  variant = 'artist'
}: OptimizedMobileActionBarProps) => {
  const isKeyboardVisible = useKeyboardVisible();
  const scrollDirection = useScrollDirection();
  const isMobile = useIsMobile();

  // Register with overlay manager
  useEffect(() => {
    const manager = MobileOverlayManager.getInstance();
    const overlayId = `mobile-action-bar-${variant}`;
    
    manager.register(overlayId);
    return () => manager.unregister(overlayId);
  }, [variant]);

  if (!isMobile) return null;

  // Hide when keyboard visible or scrolling down
  const shouldHide = isKeyboardVisible || scrollDirection === 'down';

  const getActionsForVariant = () => {
    const baseActions = [
      { id: 'portfolio', icon: FolderOpen, label: 'Portfolio' },
      { id: 'bookings', icon: Calendar, label: 'Bookings', badge: unreadNotifications },
      { id: 'reviews', icon: Star, label: 'Reviews' },
      { id: 'share', icon: Share2, label: 'Share' },
      { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    if (variant === 'salon') {
      return [
        { id: 'gallery', icon: FolderOpen, label: 'Gallery' },
        ...baseActions.slice(1),
      ];
    }

    return baseActions;
  };

  const actions = getActionsForVariant();

  return (
    <AnimatePresence>
      {!shouldHide && (
        <>
          {/* Main Action Bar */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-xl"
            style={{ 
              bottom: `${MOBILE_LAYOUT.SAFE_AREAS.BOTTOM_NAV_HEIGHT}px`,
              zIndex: MOBILE_LAYOUT.Z_INDEX.FAB_SECONDARY,
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          >
            <div className="flex items-center justify-around p-3">
              {actions.map((action, index) => (
                <motion.button
                  key={action.id}
                  onClick={() => onAction?.(action.id)}
                  className="relative flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 touch-manipulation"
                  style={{ 
                    minWidth: MOBILE_LAYOUT.TOUCH_TARGETS.COMFORTABLE_SIZE,
                    minHeight: MOBILE_LAYOUT.TOUCH_TARGETS.COMFORTABLE_SIZE,
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={action.label}
                >
                  <action.icon className="h-5 w-5 text-gray-700 mb-1" />
                  <span className="text-xs font-medium text-gray-700">{action.label}</span>
                  
                  {/* Notification Badge */}
                  {action.badge && action.badge > 0 && (
                    <motion.div
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      {action.badge > 99 ? '99+' : action.badge}
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Upload FAB */}
          <motion.button
            onClick={() => onAction?.('upload')}
            className="fixed bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center"
            style={{
              ...calculateFABPosition({
                position: 'bottom-right',
                hasBottomNav: true,
                isKeyboardVisible,
                additionalOffset: 64, // Account for action bar
              }),
              width: MOBILE_LAYOUT.TOUCH_TARGETS.COMFORTABLE_SIZE,
              height: MOBILE_LAYOUT.TOUCH_TARGETS.COMFORTABLE_SIZE,
              zIndex: MOBILE_LAYOUT.Z_INDEX.FAB_PRIMARY,
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Upload content"
          >
            <Upload className="h-6 w-6" />
          </motion.button>
        </>
      )}
    </AnimatePresence>
  );
};

export default OptimizedMobileActionBar;