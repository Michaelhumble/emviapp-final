import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { UserMenu } from './navbar/UserMenu';
import PostYourSalonButton from '@/components/buttons/PostYourSalonButton';
import { useTranslation } from '@/hooks/useTranslation';
import EmviLogo from '@/components/branding/EmviLogo';
import { mainNavigationItems } from '@/components/layout/navbar/config/navigationItems';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, toggleLanguage, currentLanguage } = useTranslation();

  const handleClose = () => setIsOpen(false);

  const onPostJobClick = () => {
    if (user) {
      navigate("/post-job");
    } else {
      navigate("/sign-in");
    }
    handleClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Logo at the top */}
          <div className="flex justify-center py-6 border-b border-gray-200">
            <Link to="/" onClick={handleClose}>
              <EmviLogo size="medium" showText={true} />
            </Link>
          </div>

          {/* Auth buttons when logged out */}
          {!user && (
            <div className="px-6 py-4 space-y-3 border-b border-gray-200">
              <Link to={`/sign-in?redirect=${encodeURIComponent(location.pathname + location.search)}`} onClick={handleClose}>
                <Button variant="ghost" className="w-full justify-start">
                  Sign In
                </Button>
              </Link>
              <Link to={`/auth/signup?redirect=${encodeURIComponent(location.pathname + location.search)}`} onClick={handleClose}>
                <Button className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            <div className="px-6 py-4">
              {/* Main Navigation */}
              <nav className="space-y-2 mb-6">
                {mainNavigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleClose}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      location.pathname === item.path
                        ? "text-purple-700 bg-purple-50"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {t({
                      english: item.title,
                      vietnamese: item.vietnameseTitle || item.title
                    })}
                  </Link>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <Button 
                  onClick={onPostJobClick}
                  className="w-full bg-purple-600 text-white hover:bg-purple-700"
                >
                  {t("Post a Job for Free")}
                </Button>
                
                <PostYourSalonButton 
                  variant="outline" 
                  className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                  onClose={handleClose}
                />
              </div>

              {/* User Menu for logged in users */}
              {user && (
                <div className="mb-6">
                  <UserMenu />
                </div>
              )}
            </div>
          </div>

          {/* Language switcher and footer at bottom */}
          <div className="mt-auto p-6 border-t border-gray-200 space-y-4">
            {/* Text-only language switcher */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  toggleLanguage();
                  handleClose();
                }}
                className="text-sm font-medium"
              >
                <span className={currentLanguage === 'en' ? 'text-purple-600' : 'text-gray-600'}>
                  English
                </span>
                <span className="mx-2 text-gray-400">/</span>
                <span className={currentLanguage === 'vi' ? 'text-purple-600' : 'text-gray-600'}>
                  Tiếng Việt
                </span>
              </button>
            </div>

            {/* Footer */}
            <div className="text-center">
              <p className="text-amber-600 text-sm font-medium">
                Inspired by Sunshine ☀️
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
