
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import PostYourSalonButton from '@/components/buttons/PostYourSalonButton';
import LanguageToggle from '@/components/ui/LanguageToggle';

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/jobs', label: 'Jobs' },
    { href: '/salons', label: 'Salons' },
    { href: '/explore/artists', label: 'Artists' },
    { href: '/community', label: 'Community' },
  ];

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleMenu}
          />
          
          {/* Menu Panel */}
          <div className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-white shadow-xl z-50 md:hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={toggleMenu}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Action Buttons */}
              <div className="p-4 space-y-3 border-b border-gray-200">
                <Link
                  to="/posting/job"
                  onClick={toggleMenu}
                  className="block w-full"
                >
                  <Button className="w-full bg-primary text-white hover:bg-primary/90">
                    Post a Job for Free
                  </Button>
                </Link>
                
                <PostYourSalonButton 
                  variant="outline" 
                  className="w-full"
                  onClose={toggleMenu}
                />
              </div>

              {/* Navigation Links */}
              <nav className="p-4">
                <ul className="space-y-1">
                  {navigationItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        onClick={toggleMenu}
                        className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* User Section */}
              {user ? (
                <div className="p-4 border-t border-gray-200">
                  <div className="space-y-3">
                    <Link
                      to="/dashboard"
                      onClick={toggleMenu}
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={toggleMenu}
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 border-t border-gray-200">
                  <div className="space-y-3">
                    <Link
                      to="/auth/signin"
                      onClick={toggleMenu}
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/auth/signup"
                      onClick={toggleMenu}
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
              <LanguageToggle minimal />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;
