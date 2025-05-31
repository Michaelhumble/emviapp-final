
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Home, Users, Store, Briefcase, Info, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { mainNavigationItems } from '@/components/layout/navbar/config/navigationItems';
import LanguageToggle from '@/components/layout/LanguageToggle';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/');
  };

  const handlePostJob = () => {
    if (user) {
      navigate('/post-job');
    } else {
      navigate('/sign-in');
    }
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  // Get appropriate icon for each nav item
  const getNavIcon = (path: string) => {
    switch (path) {
      case '/': return Home;
      case '/artists': return Users;
      case '/salons': return Store;
      case '/jobs': return Briefcase;
      case '/freelancers': return Users;
      case '/about': return Info;
      case '/contact': return MessageSquare;
      default: return Home;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-80 flex flex-col h-full">
        <SheetHeader className="text-left mb-6">
          <SheetTitle className="text-xl font-semibold">Menu</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col flex-1">
          {/* Primary CTA Button */}
          <div className="mb-6">
            <Button 
              onClick={handlePostJob}
              className="w-full bg-purple-600 text-white hover:bg-purple-700 h-12 text-base font-medium"
            >
              {t({
                english: "Post a Job for Free",
                vietnamese: "Đăng Việc Miễn Phí"
              })}
            </Button>
          </div>

          {/* Dashboard link for signed-in users */}
          {user && (
            <div className="mb-4">
              <Link
                to="/dashboard"
                onClick={closeMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  location.pathname === "/dashboard"
                    ? "text-purple-700 bg-purple-50"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <User className="h-5 w-5" />
                {t({
                  english: "Dashboard",
                  vietnamese: "Bảng Điều Khiển"
                })}
              </Link>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1 mb-6">
            {mainNavigationItems.map((item) => {
              const IconComponent = getNavIcon(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-purple-700 bg-purple-50"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  {t({
                    english: item.title,
                    vietnamese: item.vietnameseTitle || item.title
                  })}
                </Link>
              );
            })}
          </nav>

          {/* Language Toggle */}
          <div className="mb-6 px-2">
            <LanguageToggle minimal={false} className="w-full justify-center" />
          </div>

          {/* Spacer to push auth section and footer to bottom */}
          <div className="flex-1"></div>

          {/* Auth Section */}
          <div className="mb-6 space-y-3">
            {user ? (
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="w-full justify-center text-red-600 border-red-200 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t({
                  english: "Sign Out",
                  vietnamese: "Đăng Xuất"
                })}
              </Button>
            ) : (
              <div className="space-y-2">
                <Link to="/sign-in" onClick={closeMenu}>
                  <Button variant="outline" className="w-full">
                    {t({
                      english: "Sign In",
                      vietnamese: "Đăng Nhập"
                    })}
                  </Button>
                </Link>
                <Link to="/sign-up" onClick={closeMenu}>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    {t({
                      english: "Sign Up",
                      vietnamese: "Đăng Ký"
                    })}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Sunshine Footer Credit */}
          <div className="text-center py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 font-light">
              {t({
                english: "Inspired by Sunshine ☀️",
                vietnamese: "Lấy Cảm Hứng Từ Ánh Nắng ☀️"
              })}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
