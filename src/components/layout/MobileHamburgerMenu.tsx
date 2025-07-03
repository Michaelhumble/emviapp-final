
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Briefcase, Store, Users, MessageSquare, LayoutDashboard, Info, Phone } from 'lucide-react';
import { useAuth } from '@/context/auth';

const MobileHamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, signOut } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const primaryMenuItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/jobs', label: 'Jobs', icon: Briefcase },
    { to: '/salons', label: 'Salons', icon: Store },
    { to: '/artists', label: 'Artists', icon: Users },
    { to: '/community', label: 'Community', icon: MessageSquare },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  const secondaryMenuItems = [
    { to: '/about', label: 'About', icon: Info },
    { to: '/contact', label: 'Contact', icon: Phone },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-xl z-50 max-h-[50vh] overflow-y-auto">
          <div className="px-3 py-2">
            {/* Primary Navigation - Compact Grid Layout */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {primaryMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className="flex flex-col items-center justify-center px-2 py-2 rounded-lg text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <Icon className="h-4 w-4 mb-1" />
                    <span className="text-center leading-tight">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Secondary Navigation - Horizontal */}
            <div className="flex justify-center gap-4 py-2 border-t border-gray-100 mb-3">
              {secondaryMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className="flex items-center px-3 py-1 rounded-md text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  >
                    <Icon className="h-3 w-3 mr-1" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Call-to-Action Buttons - Horizontal Layout */}
            <div className="flex gap-2 mb-3 border-t border-gray-100 pt-2">
              <Link
                to="/post-job"
                onClick={closeMenu}
                className="flex-1 text-center px-3 py-2 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary/90 shadow-sm"
              >
                Post Job
              </Link>
              <Link
                to="/sell-salon"
                onClick={closeMenu}
                className="flex-1 text-center px-3 py-2 rounded-lg text-xs font-semibold text-white bg-secondary hover:bg-secondary/80 shadow-sm"
              >
                Post Salon
              </Link>
            </div>

            {/* Authentication - Compact */}
            <div className="border-t border-gray-200 pt-2">
              {isSignedIn ? (
                <button
                  onClick={signOut}
                  className="w-full text-center px-3 py-2 rounded-md text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200"
                >
                  Sign Out
                </button>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/auth/signin"
                    onClick={closeMenu}
                    className="flex-1 text-center px-3 py-2 rounded-md text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 border border-gray-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/signup"
                    onClick={closeMenu}
                    className="flex-1 text-center px-3 py-2 rounded-md text-xs font-medium text-white bg-primary hover:bg-primary/90"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Branding Credit - Minimal */}
            <div className="text-center pt-2">
              <p className="text-[10px] italic text-gray-400">Inspired by Sunshine ☀️</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHamburgerMenu;
