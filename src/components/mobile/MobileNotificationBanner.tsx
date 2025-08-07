import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { MOBILE_LAYOUT } from '@/utils/mobileLayoutManager';
import { useIsMobile } from '@/hooks/use-mobile';
import { Notification } from '@/types/notification';

interface MobileNotificationBannerProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
  position?: 'top' | 'bottom';
}

const MobileNotificationBanner = ({ 
  notifications, 
  onDismiss, 
  position = 'top' 
}: MobileNotificationBannerProps) => {
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const isMobile = useIsMobile();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDragConstraints({ left: -window.innerWidth / 2, right: window.innerWidth / 2 });
    }
  }, []);

  if (!isMobile || notifications.length === 0) return null;

  const getIcon = (type: Notification['type']) => {
    const iconMap = {
      success: CheckCircle,
      error: AlertCircle,
      warning: AlertTriangle,
      info: Info,
    };
    return iconMap[type] || Info;
  };

  const getColors = (type: Notification['type']) => {
    const colorMap = {
      success: 'bg-green-50 border-green-200 text-green-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800',
    };
    return colorMap[type] || colorMap.info;
  };

  const handleDragEnd = (event: any, info: PanInfo, notificationId: string) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold) {
      onDismiss(notificationId);
    }
  };

  const positionStyles = position === 'top' 
    ? { 
        top: `${MOBILE_LAYOUT.SAFE_AREAS.TOP_SAFE_AREA}px`,
        bottom: 'auto'
      }
    : { 
        bottom: `${MOBILE_LAYOUT.SAFE_AREAS.BOTTOM_NAV_HEIGHT + 16}px`,
        top: 'auto'
      };

  return (
    <div 
      className="fixed left-4 right-4 pointer-events-none"
      style={{ 
        ...positionStyles,
        zIndex: MOBILE_LAYOUT.Z_INDEX.TOAST_NOTIFICATIONS,
      }}
    >
      <AnimatePresence mode="popLayout">
        {notifications.slice(0, 3).map((notification, index) => {
          const Icon = getIcon(notification.type);
          const colors = getColors(notification.type);
          
          return (
            <motion.div
              key={notification.id}
              className={`mb-2 ${colors} border rounded-2xl shadow-lg backdrop-blur-sm pointer-events-auto`}
              initial={{ 
                opacity: 0, 
                y: position === 'top' ? -100 : 100,
                scale: 0.95
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: 1
              }}
              exit={{ 
                opacity: 0, 
                x: 300,
                scale: 0.8,
                transition: { duration: 0.2 }
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                delay: index * 0.1
              }}
              drag="x"
              dragConstraints={dragConstraints}
              dragElastic={0.1}
              onDragEnd={(event, info) => handleDragEnd(event, info, notification.id)}
              whileDrag={{ 
                scale: 1.05,
                opacity: 0.8
              }}
              layout
            >
              <div className="flex items-start gap-3 p-4">
                <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-relaxed">
                    {notification.message}
                  </p>
                  
                  {notification.link && (
                    <motion.button
                      onClick={() => {/* Handle link click */}}
                      className="mt-2 text-xs font-semibold underline opacity-80 hover:opacity-100"
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details
                    </motion.button>
                  )}
                </div>

                <motion.button
                  onClick={() => onDismiss(notification.id)}
                  className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors touch-manipulation"
                  style={{ 
                    minWidth: MOBILE_LAYOUT.TOUCH_TARGETS.MIN_SIZE,
                    minHeight: MOBILE_LAYOUT.TOUCH_TARGETS.MIN_SIZE,
                  }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Dismiss notification"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>

              {/* Swipe Indicator */}
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-current opacity-20 rounded-full"></div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Stack Indicator */}
      {notifications.length > 3 && (
        <motion.div
          className="text-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-block bg-gray-800/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
            +{notifications.length - 3} more
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MobileNotificationBanner;