
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Search, Briefcase, Store, Users, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/auth';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { isSignedIn, signOut } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { 
      path: "/", 
      icon: Home, 
      label: t("Home") 
    },
    { 
      path: "/search", 
      icon: Search, 
      label: t("Search") 
    },
    { 
      path: "/jobs", 
      icon: Briefcase, 
      label: t("Jobs") 
    },
    { 
      path: "/salons", 
      icon: Store, 
      label: t("Salons") 
    },
    { 
      path: "/artists", 
      icon: Users, 
      label: t("Artists") 
    },
    { 
      path: "/contact", 
      icon: Phone, 
      label: t("Contact") 
    }
  ];

  return (
    <>
      {/* Hamburger Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="md:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden" onClick={closeMenu}>
          <div 
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X size={24} />
              </Button>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col p-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              
              {/* Authentication Section */}
              {isSignedIn ? (
                // Show Sign Out button when signed in
                <Button 
                  onClick={async () => {
                    await signOut();
                    closeMenu();
                  }}
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50 font-medium py-3 rounded-lg transition-colors mt-4"
                >
                  Sign Out
                </Button>
              ) : (
                // Show Sign In and Sign Up when not signed in
                <>
                  <Link
                    to="/sign-in"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <span className="font-medium">Sign In</span>
                  </Link>

                  <Link
                    to="/auth/signup"
                    onClick={closeMenu}
                    className="block mt-4"
                  >
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
