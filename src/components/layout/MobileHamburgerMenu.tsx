
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Search, Briefcase, Store, Users, Phone, User, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

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
      path: "/freelancers", 
      icon: Users, 
      label: t("Community") 
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
        className="md:hidden hover:bg-purple-50 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} className="text-purple-700" /> : <Menu size={24} className="text-purple-700" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 md:hidden backdrop-blur-sm" onClick={closeMenu}>
          <div 
            className="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-[#FAF3F0] to-[#FFF5F2] shadow-2xl transform transition-all duration-300 ease-in-out border-l border-orange-200"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-orange-200/50">
              <h2 className="text-xl font-bold text-purple-800 font-serif">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMenu}
                className="hover:bg-purple-100 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X size={24} className="text-purple-700" />
              </Button>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col p-6 space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className="flex items-center gap-4 px-4 py-3 text-purple-700 hover:bg-purple-100/60 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-sm font-medium"
                >
                  <item.icon size={20} className="text-purple-600" />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {/* Sign In Link */}
              <Link
                to="/sign-in"
                onClick={closeMenu}
                className="flex items-center gap-4 px-4 py-3 text-purple-700 hover:bg-purple-100/60 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-sm font-medium"
              >
                <User size={20} className="text-purple-600" />
                <span>Sign In</span>
              </Link>

              {/* Post Job Button */}
              <Link
                to="/posting/job"
                onClick={closeMenu}
                className="flex items-center gap-4 px-4 py-3 text-orange-700 hover:bg-orange-100/60 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-sm font-medium border border-orange-200/50"
              >
                <Plus size={20} className="text-orange-600" />
                <span>Post a Job</span>
              </Link>

              {/* Post Salon Button */}
              <Link
                to="/posting/salon"
                onClick={closeMenu}
                className="flex items-center gap-4 px-4 py-3 text-orange-700 hover:bg-orange-100/60 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-sm font-medium border border-orange-200/50"
              >
                <Store size={20} className="text-orange-600" />
                <span>Post Your Salon</span>
              </Link>

              {/* Sign Up Button - Premium */}
              <Link
                to="/auth/signup"
                onClick={closeMenu}
                className="block mt-6"
              >
                <Button 
                  className="w-full bg-gradient-to-r from-[#7F56D9] to-[#9333EA] hover:from-[#6D48C7] hover:to-[#7C2D92] text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] border-2 border-transparent hover:border-purple-300/30"
                >
                  <span className="text-lg">Sign Up</span>
                </Button>
              </Link>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#FFA07A]/20 to-transparent pointer-events-none" />
            <div className="absolute top-1/2 -right-4 w-8 h-8 bg-purple-200/30 rounded-full blur-sm" />
            <div className="absolute top-1/3 -right-2 w-4 h-4 bg-orange-200/40 rounded-full blur-sm" />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHamburgerMenu;
