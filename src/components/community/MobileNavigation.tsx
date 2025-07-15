import React from 'react';
import { motion } from 'framer-motion';
import { Home, Search, PlusCircle, Heart, User, Compass, Video } from 'lucide-react';
import { useAuth } from '@/context/auth';

interface MobileNavigationProps {
  onCreatePost: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ onCreatePost }) => {
  const { user } = useAuth();

  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Search, label: 'Search', active: false },
    { icon: Video, label: 'Reels', active: false },
    { icon: Heart, label: 'Activity', active: false, badge: 12 },
    { icon: User, label: 'Profile', active: false },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-gray-800">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item, index) => (
          <motion.button
            key={item.label}
            whileTap={{ scale: 0.9 }}
            className={`relative flex flex-col items-center justify-center p-2 rounded-xl ${
              item.active ? 'text-white' : 'text-gray-400'
            }`}
          >
            <div className="relative">
              <item.icon 
                size={24} 
                className={item.active ? 'fill-current' : ''} 
              />
              {item.badge && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {item.badge}
                </motion.div>
              )}
            </div>
            <span className="text-xs mt-1">{item.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Floating Create Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={onCreatePost}
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
      >
        <PlusCircle className="w-8 h-8 text-white" />
      </motion.button>
    </div>
  );
};