
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
        <div className="absolute top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="px-2 py-1 space-y-1">
            {/* Primary Navigation */}
            <div className="space-y-1 mb-2">
              {primaryMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className="flex items-center px-2 py-1.5 rounded-md text-[14px] font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Secondary Navigation */}
            <div className="pt-1 border-t border-gray-100 space-y-1 mb-2">
              {secondaryMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className="flex items-center px-2 py-1.5 rounded-md text-[13px] font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Call-to-Action Buttons */}
            <div className="pt-1 border-t border-gray-200 space-y-1.5 mb-2">
              <Link
                to="/post-job"
                onClick={closeMenu}
                className="block w-full text-center px-3 py-1.5 rounded-lg text-[14px] font-semibold text-white bg-primary hover:bg-primary/90 shadow-sm"
              >
                Post a Job
              </Link>
              <Link
                to="/sell-salon"
                onClick={closeMenu}
                className="block w-full text-center px-3 py-1.5 rounded-lg text-[14px] font-semibold text-white bg-secondary hover:bg-secondary/80 shadow-sm"
              >
                Post Your Salon
              </Link>
            </div>

            {/* Authentication */}
            <div className="pt-1 border-t border-gray-200 mb-2">
              {isSignedIn ? (
                <button
                  onClick={signOut}
                  className="w-full text-left px-2 py-1.5 rounded-md text-[14px] font-medium text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200"
                >
                  Sign Out
                </button>
              ) : (
                <div className="space-y-1.5">
                  <Link
                    to="/auth/signin"
                    onClick={closeMenu}
                    className="block w-full text-center px-2 py-1.5 rounded-md text-[14px] font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 border border-gray-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/signup"
                    onClick={closeMenu}
                    className="block w-full text-center px-2 py-1.5 rounded-md text-[14px] font-medium text-white bg-primary hover:bg-primary/90"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Branding Credit */}
            <div className="pt-0.5 text-center">
              <p className="text-[11px] italic text-gray-400">Inspired by Sunshine ☀️</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHamburgerMenu;
