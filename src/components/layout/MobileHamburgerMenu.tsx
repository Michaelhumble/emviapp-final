
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Search, Briefcase, Store, Users, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import EmviLogo from '@/components/branding/EmviLogo';

const MobileHamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

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
      path: "/community", 
      icon: MessageSquare, 
      label: t("Community") 
    },
    { 
      path: "/search", 
      icon: Search, 
      label: t("Search") 
    }
  ];

  return (
    <>
      {/* Hamburger Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="md:hidden text-gray-700 hover:bg-gray-100"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden" onClick={closeMenu}>
          <div 
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: '#FFFFFF' }}
          >
            {/* Menu Header with Logo */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <EmviLogo size="small" showText={true} />
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMenu}
                className="text-gray-600 hover:bg-gray-100 rounded-full"
                aria-label="Close menu"
              >
                <X size={20} />
              </Button>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col p-6 space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100">
                    <item.icon size={18} className="text-purple-600" />
                  </div>
                  <span className="font-medium text-gray-800">{item.label}</span>
                </Link>
              ))}
              
              {/* Divider */}
              <div className="border-t border-gray-100 my-4"></div>
              
              {/* Auth Links */}
              <Link
                to="/sign-in"
                onClick={closeMenu}
                className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200"
              >
                <span className="font-medium">Sign In</span>
              </Link>

              {/* Action Buttons */}
              <div className="space-y-3 mt-6">
                {/* Post a Job Button - Updated link */}
                <Link
                  to="/post-job"
                  onClick={closeMenu}
                  className="block"
                >
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Post a Job
                  </Button>
                </Link>

                {/* Post a Salon Button */}
                <Link
                  to="/post-salon"
                  onClick={closeMenu}
                  className="block"
                >
                  <Button 
                    variant="outline"
                    className="w-full border-2 border-purple-200 text-purple-700 hover:bg-purple-50 font-medium py-3 rounded-xl transition-all duration-200"
                  >
                    Post a Salon
                  </Button>
                </Link>

                {/* Sign Up Button */}
                <Link
                  to="/auth/signup"
                  onClick={closeMenu}
                  className="block"
                >
                  <Button 
                    className="w-full bg-gradient-to-r from-salmon-400 to-salmon-500 hover:from-salmon-500 hover:to-salmon-600 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    style={{ 
                      background: 'linear-gradient(135deg, #FFA07A 0%, #FF8C69 100%)',
                      boxShadow: '0 4px 15px rgba(255, 160, 122, 0.3)'
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHamburgerMenu;
