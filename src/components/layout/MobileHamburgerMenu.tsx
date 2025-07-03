
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Users, Briefcase, MessageCircle, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';

const MobileHamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, signOut } = useAuth();
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
  };

  const navItems = [
    { 
      icon: <Home className="h-5 w-5" />, 
      label: t({ english: "Home", vietnamese: "Trang Chủ" }), 
      href: "/" 
    },
    { 
      icon: <Users className="h-5 w-5" />, 
      label: t({ english: "Artists", vietnamese: "Thợ Làm Móng" }), 
      href: "/artists" 
    },
    { 
      icon: <Briefcase className="h-5 w-5" />, 
      label: t({ english: "Jobs", vietnamese: "Việc Làm" }), 
      href: "/jobs" 
    },
    { 
      icon: <MessageCircle className="h-5 w-5" />, 
      label: t({ english: "Salons", vietnamese: "Tiệm Móng" }), 
      href: "/salons" 
    },
    { 
      icon: <User className="h-5 w-5" />, 
      label: t({ english: "Profile", vietnamese: "Hồ Sơ" }), 
      href: "/profile" 
    },
    { 
      icon: <Phone className="h-5 w-5" />, 
      label: t({ english: "Contact", vietnamese: "Liên Hệ" }), 
      href: "/contact" 
    }
  ];

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="h-9 w-9"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu */}
      <div className={`
        fixed top-16 right-4 left-4 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl z-50 p-6
        transform transition-all duration-300 ease-out
        ${isOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95 pointer-events-none'}
        max-h-[50vh] overflow-y-auto
      `}>
        {/* Navigation Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              onClick={closeMenu}
              className="flex flex-col items-center p-3 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition-colors"
            >
              <div className="text-gray-600 mb-2">{item.icon}</div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Secondary Navigation */}
        <div className="flex space-x-2 mb-4">
          <Link 
            to="/post-job" 
            onClick={closeMenu}
            className="flex-1"
          >
            <Button 
              size="sm" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs"
            >
              {t({ english: "Post Job", vietnamese: "Đăng Việc" })}
            </Button>
          </Link>
          <Link 
            to="/sell-salon" 
            onClick={closeMenu}
            className="flex-1"
          >
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 text-xs"
            >
              {t({ english: "Sell Salon", vietnamese: "Bán Tiệm" })}
            </Button>
          </Link>
        </div>

        {/* Auth Section */}
        <div className="border-t border-gray-200 pt-4">
          {isSignedIn ? (
            <div className="space-y-2">
              <Link to="/dashboard" onClick={closeMenu}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm"
                >
                  {t({ english: "Dashboard", vietnamese: "Bảng Điều Khiển" })}
                </Button>
              </Link>
              <Button 
                onClick={handleSignOut}
                className="w-full h-10 bg-white border border-red-200 text-red-600 font-semibold rounded-2xl mt-3 mb-1 hover:bg-rose-50 transition"
              >
                {t({ english: "Sign Out", vietnamese: "Đăng Xuất" })}
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link to="/auth" onClick={closeMenu}>
                <Button className="w-full text-sm">
                  {t({ english: "Sign In", vietnamese: "Đăng Nhập" })}
                </Button>
              </Link>
              <Link to="/auth" onClick={closeMenu}>
                <Button variant="ghost" className="w-full text-sm">
                  {t({ english: "Sign Up", vietnamese: "Đăng Ký" })}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileHamburgerMenu;
