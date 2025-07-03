
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Briefcase, Store, Users, MessageSquare, LayoutDashboard, Phone, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/auth';
import Logo from '@/components/ui/Logo';

const MobileHamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { isSignedIn, signOut, user } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { path: '/', icon: Home, label: t('nav.home', 'Home') },
    { path: '/jobs', icon: Briefcase, label: t('nav.jobs', 'Jobs') },
    { path: '/salons', icon: Store, label: t('nav.salons', 'Salons') },
    { path: '/artists', icon: Users, label: t('nav.artists', 'Artists') },
    { path: '/messages', icon: MessageSquare, label: t('nav.messages', 'Messages') },
    { path: '/dashboard', icon: LayoutDashboard, label: t('nav.dashboard', 'Dashboard') },
    { path: '/pricing', icon: Phone, label: t('nav.pricing', 'Pricing') },
    { path: '/about', icon: Info, label: t('nav.about', 'About') },
  ];

  return (
    <>
      {/* Hamburger Button - Only visible on mobile */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors z-50 relative"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={closeMenu} />
      )}

      {/* Mobile Menu Panel */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Logo size="small" showText={true} />
            <button
              onClick={closeMenu}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Menu Items */}
            <div className="flex flex-col p-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-gray-200 p-4 space-y-2">
              {/* Post Job Button */}
              <Link
                to="/post-job"
                onClick={closeMenu}
                className="block"
              >
                <Button 
                  size="sm"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-xl transition-colors"
                >
                  Post a Job
                </Button>
              </Link>

              {/* Post Salon Button */}
              <Link
                to="/sell-salon"
                onClick={closeMenu}
                className="block"
              >
                <Button 
                  size="sm"
                  variant="outline"
                  className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 font-medium py-2 rounded-xl transition-colors"
                >
                  Post Your Salon
                </Button>
              </Link>
              
              {/* Conditional Auth Buttons */}
              {isSignedIn ? (
                <button
                  onClick={signOut}
                  className="w-full text-red-600 bg-white py-2 mt-2 rounded shadow hover:bg-red-50"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  {/* Sign In Link */}
                  <Link
                    to="/auth/signin"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors mt-6 border-t border-gray-100 pt-6"
                  >
                    <span className="font-medium">Sign In</span>
                  </Link>

                  {/* Sign Up Button */}
                  <Link
                    to="/auth/signup"
                    onClick={closeMenu}
                    className="block"
                  >
                    <Button 
                      className="w-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white font-medium py-2 rounded-xl transition-all duration-200 shadow-sm"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHamburgerMenu;
