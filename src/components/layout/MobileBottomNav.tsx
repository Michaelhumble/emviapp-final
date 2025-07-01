
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Calendar, MessageCircle, User, Briefcase } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { motion } from 'framer-motion';

const MobileBottomNav = () => {
  const location = useLocation();
  const { user, userProfile } = useAuth();

  const navItems = [
    { 
      icon: Home, 
      label: 'Home', 
      path: '/',
      show: true 
    },
    { 
      icon: Search, 
      label: 'Jobs', 
      path: '/jobs',
      show: true 
    },
    { 
      icon: Briefcase, 
      label: 'Salons', 
      path: '/salons',
      show: true 
    },
    { 
      icon: MessageCircle, 
      label: 'Messages', 
      path: '/messages',
      show: !!user 
    },
    { 
      icon: User, 
      label: 'Profile', 
      path: user ? '/profile' : '/auth/signin',
      show: true 
    }
  ];

  const visibleItems = navItems.filter(item => item.show);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-pb lg:hidden">
      <nav className="flex justify-around items-center h-16 px-2">
        {visibleItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center flex-1 py-2 relative"
            >
              <motion.div
                className={`p-1.5 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
              </motion.div>
              <span className={`text-xs mt-1 transition-colors ${
                isActive ? 'text-purple-600 font-medium' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  className="absolute top-0 left-1/2 w-1 h-1 bg-purple-600 rounded-full"
                  layoutId="activeIndicator"
                  initial={false}
                  style={{ x: '-50%' }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileBottomNav;
