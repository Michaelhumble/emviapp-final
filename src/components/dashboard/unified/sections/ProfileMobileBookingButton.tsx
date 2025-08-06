import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Plus, X, Clock, User, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProfileThemeConfig } from '@/utils/profileThemes';
import { UserRole } from '@/context/auth/types';

interface ProfileMobileBookingButtonProps {
  theme: ProfileThemeConfig;
  userRole?: UserRole | null;
}

const ProfileMobileBookingButton: React.FC<ProfileMobileBookingButtonProps> = ({ 
  theme, 
  userRole 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getButtonConfig = () => {
    switch (userRole) {
      case 'freelancer':
        return {
          icon: Briefcase,
          label: 'New Gig',
          expandedLabel: 'Create Gig Request',
          color: 'from-orange-500 to-amber-500',
          actions: [
            { id: 'quick-gig', icon: Plus, label: 'Quick Gig' },
            { id: 'schedule-gig', icon: Clock, label: 'Schedule' },
            { id: 'client-request', icon: User, label: 'Client Request' }
          ]
        };
      default: // artist
        return {
          icon: Calendar,
          label: 'Book',
          expandedLabel: 'New Appointment',
          color: 'from-purple-500 to-pink-500',
          actions: [
            { id: 'quick-booking', icon: Plus, label: 'Quick Book' },
            { id: 'schedule-booking', icon: Clock, label: 'Schedule' },
            { id: 'client-booking', icon: User, label: 'Add Client' }
          ]
        };
    }
  };

  const config = getButtonConfig();
  const MainIcon = config.icon;

  return (
    <div className="md:hidden fixed bottom-20 right-4 z-40">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 space-y-3"
          >
            {config.actions.map((action, index) => {
              const ActionIcon = action.icon;
              return (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 ${theme.cardBackground} backdrop-blur-lg border ${theme.cardBorder} rounded-full px-4 py-3 shadow-lg ${theme.cardHover} transition-all duration-200`}
                  onClick={() => {
                    console.log(`${userRole} action:`, action.id);
                    setIsExpanded(false);
                  }}
                >
                  <div className={`p-2 rounded-full bg-gradient-to-r ${config.color} text-white`}>
                    <ActionIcon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 pr-2">{action.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-16 h-16 rounded-full bg-gradient-to-r ${config.color} text-white shadow-2xl flex items-center justify-center ${theme.buttonHover} transition-all duration-300`}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isExpanded ? 45 : 0 }}
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <MainIcon className="w-6 h-6" />
        )}
      </motion.button>

      {/* Floating Label */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className={`absolute right-20 top-1/2 transform -translate-y-1/2 ${theme.cardBackground} backdrop-blur-lg border ${theme.cardBorder} rounded-full px-3 py-2 shadow-lg`}
          >
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              {config.label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileMobileBookingButton;