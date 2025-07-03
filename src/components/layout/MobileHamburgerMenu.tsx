
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Briefcase, Store, Users, MessageSquare, LayoutDashboard, Phone, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import Logo from '@/components/ui/Logo';

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
      path: "/freelancers", 
      icon: MessageSquare, 
      label: t("Community") 
    },
    { 
      path: "/dashboard", 
      icon: LayoutDashboard, 
      label: t("Dashboard") 
    },
    { 
      path: "/about", 
      icon: Info, 
      label: t("About") 
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
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out backdrop-blur-sm border-l border-gray-100"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: '#FFFFFF' }}
          >
            {/* Menu Header with Logo */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <Logo size="small" showText={true} />
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMenu}
                aria-label="Close menu"
                className="text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-full"
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
                  className="flex items-center gap-4 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 group"
                >
                  <item.icon size={18} className="text-gray-500 group-hover:text-purple-600 transition-colors" />
                  <span className="font-medium group-hover:text-gray-900">{item.label}</span>
                </Link>
              ))}
              
              {/* Post a Job Button */}
              <Link
                to="/post-job"
                onClick={closeMenu}
                className="block mt-4"
              >
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-xl transition-colors shadow-sm"
                >
                  Post a Job
                </Button>
              </Link>

              {/* Post Your Salon Button */}
              <Link
                to="/post-salon"
                onClick={closeMenu}
                className="block"
              >
                <Button 
                  variant="outline"
                  className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 font-medium py-2 rounded-xl transition-colors"
                >
                  Post Your Salon
                </Button>
              </Link>
              
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHamburgerMenu;
