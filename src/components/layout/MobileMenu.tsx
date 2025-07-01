
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { mainNavigationItems } from '@/components/layout/navbar/config/navigationItems';
import Logo from '@/components/ui/Logo';
import LanguageToggle from '@/components/layout/LanguageToggle';
import PostYourSalonButton from '@/components/buttons/PostYourSalonButton';

const MobileMenu = () => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
    navigate('/');
  };

  const handlePostJob = () => {
    setIsOpen(false);
    if (user) {
      navigate('/post-job');
    } else {
      navigate('/auth/signin');
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-gray-100"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-gray-700" />
        </Button>
      </DrawerTrigger>
      
      <DrawerContent className="h-[85vh] bg-white border-t-2 border-gray-100">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Logo size="medium" showText={true} />
            <DrawerClose asChild>
              <Button
                ref={closeButtonRef}
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 rounded-full"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-gray-500" />
              </Button>
            </DrawerClose>
          </div>

          {/* Auth Section */}
          <div className="px-6 py-4 border-b border-gray-100">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.email}</p>
                    <p className="text-sm text-gray-500">Welcome back!</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleNavigation('/dashboard')}
                    size="sm"
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    Dashboard
                  </Button>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Button
                  onClick={() => handleNavigation('/auth/signup')}
                  className="w-full bg-purple-600 hover:bg-purple-700 py-3"
                >
                  Sign Up
                </Button>
                <Button
                  onClick={() => handleNavigation('/auth/signin')}
                  variant="outline"
                  className="w-full py-3"
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-4">
            <div className="space-y-1">
              {mainNavigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-purple-50 text-purple-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                    <span>
                      {t({
                        english: item.title,
                        vietnamese: item.vietnameseTitle || item.title
                      })}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="px-6 py-4 border-t border-gray-100 space-y-3">
            <Button
              onClick={handlePostJob}
              className="w-full bg-purple-600 hover:bg-purple-700 py-3"
            >
              {t("Post a Job for Free")}
            </Button>
            
            <div className="w-full">
              <PostYourSalonButton 
                variant="outline" 
                className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 py-3"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>

          {/* Language Toggle */}
          <div className="px-6 py-3 border-t border-gray-100">
            <div className="flex justify-center">
              <LanguageToggle minimal={false} />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
