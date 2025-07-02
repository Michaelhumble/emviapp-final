
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Search, MessageCircle, User, Users } from 'lucide-react';
import { useAuth } from '@/context/auth';

const SuperMobileBottomNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { userRole } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const mainNavItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/jobs', icon: Search, label: 'Jobs' },
    { path: '/community', icon: MessageCircle, label: 'Community' },
  ];

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/jobs', label: 'Jobs' },
    { path: '/artists', label: 'Artists' },
    { path: '/salons', label: 'Salons' },
    { path: '/community', label: 'Community' },
    { path: '/messages', label: 'Messages' },
    { path: '/profile', label: 'Profile' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 md:hidden">
        <div className="flex justify-around items-center">
          {mainNavItems.map((item) => {
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
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
          
          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              isMenuOpen
                ? 'text-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            {isMenuOpen ? <X className="h-5 w-5 mb-1" /> : <Menu className="h-5 w-5 mb-1" />}
            <span className="text-xs font-medium">Menu</span>
          </button>
        </div>
      </nav>

      {/* Hamburger Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMenu}>
          <div 
            className="fixed bottom-16 left-0 right-0 bg-white rounded-t-lg shadow-lg z-50 max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-purple-100 text-purple-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuperMobileBottomNavBar;
