
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Users, Building2, Briefcase, MessageCircle, Info, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { useTranslation } from '@/hooks/useTranslation';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Home', href: '/', icon: Home },
    { name: 'Artists', href: '/artists', icon: Users },
    { name: 'Salons', href: '/salons', icon: Building2 },
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Community', href: '/community', icon: MessageCircle },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-gray-600" />
        ) : (
          <Menu className="h-6 w-6 text-gray-600" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={closeMenu}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 md:hidden overflow-y-auto">
            <div className="flex flex-col h-full">
              {/* Header with Close Button */}
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                {/* Action Buttons Section - Always at the top */}
                <div className="p-4 space-y-3 border-b">
                  <Button 
                    asChild 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3"
                    onClick={closeMenu}
                  >
                    <Link to="/posting/job">
                      {t({
                        english: "Post a Job for Free",
                        vietnamese: "Đăng Việc Miễn Phí"
                      })}
                    </Link>
                  </Button>

                  <Button 
                    asChild 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3"
                    onClick={closeMenu}
                  >
                    <Link to="/posting/salon">
                      {t({
                        english: "Post Your Salon",
                        vietnamese: "Đăng Bán Tiệm"
                      })}
                    </Link>
                  </Button>

                  <Button 
                    asChild 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3"
                    onClick={closeMenu}
                  >
                    <Link to="/auth?mode=signup">
                      {t({
                        english: "Sign Up",
                        vietnamese: "Đăng Ký"
                      })}
                    </Link>
                  </Button>

                  <Button 
                    asChild 
                    variant="outline"
                    className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 font-medium py-3"
                    onClick={closeMenu}
                  >
                    <Link to="/auth?mode=signin">
                      {t({
                        english: "Sign In",
                        vietnamese: "Đăng Nhập"
                      })}
                    </Link>
                  </Button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 p-4">
                  <nav className="space-y-2">
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={closeMenu}
                          className="flex items-center px-3 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                        >
                          <Icon className="h-5 w-5 mr-3" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Bottom Section - Always fixed at bottom */}
                <div className="mt-auto p-4 border-t bg-gray-50">
                  {/* Language Selector */}
                  <div className="mb-4">
                    <LanguageToggle minimal />
                  </div>

                  {/* Credit */}
                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      Inspired by Sunshine ☀️
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;
