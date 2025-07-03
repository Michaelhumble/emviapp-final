
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
        <div className="absolute top-16 left-0 right-0 bg-white/98 backdrop-blur-xl border border-gray-100 shadow-2xl z-50 mx-2 rounded-2xl overflow-hidden">
          {/* Compact Header */}
          <div className="px-4 py-3 border-b border-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-800">EmviApp</span>
              <span className="text-xs text-gray-400">Menu</span>
            </div>
          </div>

          <div className="p-4 space-y-3">
            {/* Primary Navigation - Compact 2x3 Grid */}
            <div className="grid grid-cols-3 gap-2">
              {primaryMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className="flex flex-col items-center justify-center p-2 rounded-xl text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-200 hover:scale-105"
                  >
                    <Icon className="h-5 w-5 mb-1" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Secondary Links & Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex gap-3">
                {secondaryMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={closeMenu}
                      className="flex items-center text-xs text-gray-500 hover:text-gray-700"
                    >
                      <Icon className="h-4 w-4 mr-1" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              
              <div className="text-xs text-gray-400 italic">Sunshine ☀️</div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-2 pt-1">
              <Link
                to="/post-job"
                onClick={closeMenu}
                className="flex-1 text-center py-2.5 px-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-md transition-all"
              >
                Post Job
              </Link>
              <Link
                to="/sell-salon"
                onClick={closeMenu}
                className="flex-1 text-center py-2.5 px-3 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all"
              >
                Sell Salon
              </Link>
            </div>

            {/* Authentication */}
            <div className="pt-1">
              {isSignedIn ? (
                <button
                  onClick={signOut}
                  className="w-full text-center py-2 px-3 rounded-xl text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 hover:border-red-300 transition-all"
                >
                  Sign Out
                </button>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/auth/signin"
                    onClick={closeMenu}
                    className="flex-1 text-center py-2 px-3 rounded-xl text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/signup"
                    onClick={closeMenu}
                    className="flex-1 text-center py-2 px-3 rounded-xl text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHamburgerMenu;
