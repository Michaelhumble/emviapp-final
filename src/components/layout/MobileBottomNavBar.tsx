
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, MessageCircle, User, Briefcase } from 'lucide-react';
import { useAuth } from '@/context/auth';

const MobileBottomNavBar = () => {
  const location = useLocation();
  const { userRole } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/jobs', icon: Search, label: 'Jobs' },
    { path: '/community', icon: MessageCircle, label: 'Community' },
    { path: '/messages', icon: MessageCircle, label: 'Messages' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 md:hidden">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNavBar;
