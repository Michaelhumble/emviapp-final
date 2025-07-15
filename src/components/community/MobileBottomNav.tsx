import React from 'react';
import { Home, Search, Plus, Heart, User, Video, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth';

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCreatePost: () => void;
  hasNotifications?: boolean;
  hasMessages?: boolean;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onTabChange,
  onCreatePost,
  hasNotifications = false,
  hasMessages = false
}) => {
  const { user } = useAuth();

  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discover', icon: Search, label: 'Discover' },
    { id: 'create', icon: Plus, label: 'Create', isCreate: true },
    { id: 'activity', icon: Heart, label: 'Activity', hasNotification: hasNotifications },
    { id: 'profile', icon: User, label: 'Profile', isProfile: true },
  ];

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-100"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          
          if (tab.isCreate) {
            return (
              <motion.button
                key={tab.id}
                onClick={onCreatePost}
                className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent className="w-6 h-6 text-white" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/20"
                  initial={{ scale: 0 }}
                  animate={{ scale: isActive ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            );
          }

          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center p-2 min-w-[60px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.isProfile ? (
                <div className="relative">
                  <Avatar className={`w-7 h-7 ${isActive ? 'ring-2 ring-purple-500 ring-offset-2' : ''}`}>
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                      {user?.user_metadata?.full_name?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full"
                      layoutId="activeIndicator"
                    />
                  )}
                </div>
              ) : (
                <>
                  <div className="relative">
                    <IconComponent 
                      className={`w-6 h-6 ${isActive ? 'text-purple-500' : 'text-gray-600'}`} 
                    />
                    {tab.hasNotification && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                    )}
                  </div>
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 w-1 h-1 bg-purple-500 rounded-full"
                      layoutId="activeIndicator"
                    />
                  )}
                </>
              )}
            </motion.button>
          );
        })}
      </div>
      
      {/* Messages floating button */}
      {hasMessages && (
        <motion.button
          className="absolute bottom-20 right-4 w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">3</span>
          </div>
        </motion.button>
      )}
    </motion.div>
  );
};

export default MobileBottomNav;