import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Calendar, Star, Settings, Upload, MessageSquare } from 'lucide-react';
import { ProfileThemeConfig } from '@/utils/profileThemes';

interface ProfileMobileActionBarProps {
  theme: ProfileThemeConfig;
  onAction: (action: string) => void;
  unreadNotifications?: number;
}

const ProfileMobileActionBar: React.FC<ProfileMobileActionBarProps> = ({ 
  theme, 
  onAction, 
  unreadNotifications = 0 
}) => {
  const actions = [
    { id: 'portfolio', icon: Camera, label: 'Portfolio' },
    { id: 'upload', icon: Upload, label: 'Upload' },
    { id: 'bookings', icon: Calendar, label: 'Calendar' },
    { id: 'reviews', icon: Star, label: 'Reviews' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <motion.div 
        className={`${theme.cardBackground} backdrop-blur-lg border-t ${theme.cardBorder} shadow-2xl`}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center justify-around px-4 py-3">
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <motion.button
                key={action.id}
                onClick={() => onAction(action.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 relative ${theme.cardHover}`}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`p-2 rounded-lg ${theme.secondaryButton} transition-colors`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-gray-600">{action.label}</span>
                
                {/* Notification Badge */}
                {action.id === 'reviews' && unreadNotifications > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileMobileActionBar;